"""
Data Quality Monitoring System
Monitors data quality metrics and alerts on anomalies
"""

from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import logging
from dataclasses import dataclass
from enum import Enum
import json
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

class QualityMetric(Enum):
    """Types of quality metrics to monitor"""
    MISSING_CRITICAL_FIELDS = "missing_critical_fields"
    INVALID_COORDINATES = "invalid_coordinates"
    DATE_ANOMALIES = "date_anomalies"
    PRICE_ANOMALIES = "price_anomalies"
    DUPLICATE_RECORDS = "duplicate_records"
    DATA_FRESHNESS = "data_freshness"
    COMPLETENESS = "completeness"
    CONSISTENCY = "consistency"

class AlertSeverity(Enum):
    """Severity levels for alerts"""
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"
    CRITICAL = "critical"

@dataclass
class QualityAlert:
    """Represents a data quality alert"""
    metric: QualityMetric
    severity: AlertSeverity
    source: str
    message: str
    value: float
    threshold: float
    timestamp: datetime
    metadata: Optional[Dict[str, Any]] = None

class DataQualityMonitor:
    """
    Data Quality Monitoring System
    
    Monitors:
    - Field completeness
    - Data validity
    - Data consistency
    - Freshness
    - Anomalies and outliers
    """
    
    def __init__(self, database_url: str, config: Dict[str, Any] = None):
        """
        Initialize the data quality monitor.
        
        Args:
            database_url: Database connection string
            config: Configuration dictionary with thresholds
        """
        self.database_url = database_url
        self.engine = create_engine(database_url)
        self.Session = sessionmaker(bind=self.engine)
        self.logger = self._setup_logger()
        
        # Default thresholds
        self.thresholds = config or {
            'missing_critical_fields_max': 0.05,  # 5% max missing
            'invalid_coordinates_max': 0.02,  # 2% max invalid
            'date_anomalies_max': 0.01,  # 1% max date anomalies
            'price_anomalies_max': 0.01,  # 1% max price anomalies
            'duplicate_records_max': 0.01,  # 1% max duplicates
            'data_freshness_days': 30,  # Max data age in days
            'completeness_min': 0.90,  # 90% min completeness
        }
        
        self.alerts = []
    
    def _setup_logger(self) -> logging.Logger:
        """Setup logging for the monitor."""
        logger = logging.getLogger('DataQualityMonitor')
        logger.setLevel(logging.INFO)
        
        if not logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            handler.setFormatter(formatter)
            logger.addHandler(handler)
        
        return logger
    
    def run_quality_check(self, source: str, table_name: str) -> Dict[str, Any]:
        """
        Run comprehensive quality check on a data source.
        
        Args:
            source: Data source name
            table_name: Database table to check
            
        Returns:
            Quality metrics and alerts
        """
        self.logger.info(f"Running quality check for {source} on {table_name}")
        
        metrics = {}
        alerts = []
        
        # Check completeness
        completeness_result = self._check_completeness(table_name)
        metrics['completeness'] = completeness_result
        alerts.extend(self._generate_completeness_alerts(source, completeness_result))
        
        # Check data validity
        validity_result = self._check_data_validity(table_name)
        metrics['validity'] = validity_result
        alerts.extend(self._generate_validity_alerts(source, validity_result))
        
        # Check for duplicates
        duplicate_result = self._check_duplicates(table_name)
        metrics['duplicates'] = duplicate_result
        alerts.extend(self._generate_duplicate_alerts(source, duplicate_result))
        
        # Check data freshness
        freshness_result = self._check_data_freshness(table_name)
        metrics['freshness'] = freshness_result
        alerts.extend(self._generate_freshness_alerts(source, freshness_result))
        
        # Calculate overall quality score
        quality_score = self._calculate_quality_score(metrics)
        metrics['overall_quality_score'] = quality_score
        
        # Store alerts
        self.alerts.extend(alerts)
        
        # Log results
        self._log_quality_results(source, metrics, alerts)
        
        # Save to database
        self._save_quality_metrics(source, metrics)
        
        return {
            'source': source,
            'table_name': table_name,
            'metrics': metrics,
            'alerts': alerts,
            'quality_score': quality_score,
            'timestamp': datetime.now().isoformat()
        }
    
    def _check_completeness(self, table_name: str) -> Dict[str, Any]:
        """Check field completeness."""
        session = self.Session()
        try:
            # Get total count
            total_count = session.execute(
                text(f"SELECT COUNT(*) FROM {table_name}")
            ).scalar()
            
            if total_count == 0:
                return {'total_records': 0, 'field_completeness': {}}
            
            # Check critical fields
            critical_fields = ['address', 'city', 'state_code', 'property_id']
            field_completeness = {}
            
            for field in critical_fields:
                count = session.execute(
                    text(f"SELECT COUNT(*) FROM {table_name} WHERE {field} IS NOT NULL")
                ).scalar()
                completeness = count / total_count if total_count > 0 else 0
                field_completeness[field] = completeness
            
            return {
                'total_records': total_count,
                'field_completeness': field_completeness,
                'overall_completeness': sum(field_completeness.values()) / len(field_completeness)
            }
            
        except Exception as e:
            self.logger.error(f"Completeness check failed: {str(e)}")
            return {'error': str(e)}
        finally:
            session.close()
    
    def _check_data_validity(self, table_name: str) -> Dict[str, Any]:
        """Check data validity (coordinates, dates, prices)."""
        session = self.Session()
        try:
            total_count = session.execute(
                text(f"SELECT COUNT(*) FROM {table_name}")
            ).scalar()
            
            if total_count == 0:
                return {'total_records': 0, 'invalid_counts': {}}
            
            invalid_counts = {}
            
            # Check invalid coordinates
            invalid_coords = session.execute(
                text(f"""
                    SELECT COUNT(*) FROM {table_name}
                    WHERE (latitude IS NOT NULL AND (ABS(latitude) > 90 OR latitude IS NULL))
                    OR (longitude IS NOT NULL AND (ABS(longitude) > 180 OR longitude IS NULL))
                """)
            ).scalar()
            invalid_counts['invalid_coordinates'] = invalid_coords / total_count if total_count > 0 else 0
            
            # Check invalid years
            invalid_years = session.execute(
                text(f"""
                    SELECT COUNT(*) FROM {table_name}
                    WHERE year_built IS NOT NULL AND (year_built < 1800 OR year_built > EXTRACT(YEAR FROM CURRENT_DATE) + 1)
                """)
            ).scalar()
            invalid_counts['invalid_years'] = invalid_years / total_count if total_count > 0 else 0
            
            # Check invalid prices
            invalid_prices = session.execute(
                text(f"""
                    SELECT COUNT(*) FROM {table_name}
                    WHERE last_sale_price IS NOT NULL AND (last_sale_price < 1000 OR last_sale_price > 100000000)
                """)
            ).scalar()
            invalid_counts['invalid_prices'] = invalid_prices / total_count if total_count > 0 else 0
            
            return {
                'total_records': total_count,
                'invalid_counts': invalid_counts,
                'overall_validity': 1.0 - sum(invalid_counts.values())
            }
            
        except Exception as e:
            self.logger.error(f"Validity check failed: {str(e)}")
            return {'error': str(e)}
        finally:
            session.close()
    
    def _check_duplicates(self, table_name: str) -> Dict[str, Any]:
        """Check for duplicate records."""
        session = self.Session()
        try:
            # Check duplicate property IDs
            duplicate_props = session.execute(
                text(f"""
                    SELECT COUNT(*) - COUNT(DISTINCT property_id) as duplicates
                    FROM {table_name}
                """)
            ).scalar()
            
            total_count = session.execute(
                text(f"SELECT COUNT(*) FROM {table_name}")
            ).scalar()
            
            duplicate_rate = duplicate_props / total_count if total_count > 0 else 0
            
            return {
                'total_records': total_count,
                'duplicate_count': duplicate_props,
                'duplicate_rate': duplicate_rate
            }
            
        except Exception as e:
            self.logger.error(f"Duplicate check failed: {str(e)}")
            return {'error': str(e)}
        finally:
            session.close()
    
    def _check_data_freshness(self, table_name: str) -> Dict[str, Any]:
        """Check data freshness."""
        session = self.Session()
        try:
            # Get most recent and oldest records
            result = session.execute(
                text(f"""
                    SELECT 
                        MAX(ingested_at) as most_recent,
                        MIN(ingested_at) as oldest,
                        COUNT(*) as total_records
                    FROM {table_name}
                """)
            ).fetchone()
            
            if not result or result.total_records == 0:
                return {'total_records': 0, 'freshness_status': 'no_data'}
            
            most_recent = result.most_recent
            oldest = result.oldest
            total_records = result.total_records
            
            # Calculate age in days
            now = datetime.now()
            if most_recent:
                days_since_update = (now - most_recent).days
            else:
                days_since_update = float('inf')
            
            # Determine freshness status
            if days_since_update <= 1:
                freshness_status = 'fresh'
            elif days_since_update <= 7:
                freshness_status = 'recent'
            elif days_since_update <= 30:
                freshness_status = 'stale'
            else:
                freshness_status = 'outdated'
            
            return {
                'total_records': total_records,
                'most_recent_ingestion': most_recent.isoformat() if most_recent else None,
                'oldest_ingestion': oldest.isoformat() if oldest else None,
                'days_since_update': days_since_update,
                'freshness_status': freshness_status
            }
            
        except Exception as e:
            self.logger.error(f"Freshness check failed: {str(e)}")
            return {'error': str(e)}
        finally:
            session.close()
    
    def _generate_completeness_alerts(self, source: str, result: Dict[str, Any]) -> List[QualityAlert]:
        """Generate alerts based on completeness results."""
        alerts = []
        
        if 'error' in result:
            return alerts
        
        field_completeness = result.get('field_completeness', {})
        overall_completeness = result.get('overall_completeness', 1.0)
        
        # Check overall completeness
        if overall_completeness < self.thresholds['completeness_min']:
            alerts.append(QualityAlert(
                metric=QualityMetric.COMPLETENESS,
                severity=AlertSeverity.ERROR,
                source=source,
                message=f"Overall completeness {overall_completeness:.2%} below threshold {self.thresholds['completeness_min']:.2%}",
                value=overall_completeness,
                threshold=self.thresholds['completeness_min'],
                timestamp=datetime.now()
            ))
        
        # Check individual fields
        for field, completeness in field_completeness.items():
            if completeness < 0.90:  # 90% threshold for individual fields
                alerts.append(QualityAlert(
                    metric=QualityMetric.MISSING_CRITICAL_FIELDS,
                    severity=AlertSeverity.WARNING,
                    source=source,
                    message=f"Field {field} completeness {completeness:.2%} below 90%",
                    value=completeness,
                    threshold=0.90,
                    timestamp=datetime.now(),
                    metadata={'field': field}
                ))
        
        return alerts
    
    def _generate_validity_alerts(self, source: str, result: Dict[str, Any]) -> List[QualityAlert]:
        """Generate alerts based on validity results."""
        alerts = []
        
        if 'error' in result:
            return alerts
        
        invalid_counts = result.get('invalid_counts', {})
        
        # Check invalid coordinates
        invalid_coords_rate = invalid_counts.get('invalid_coordinates', 0)
        if invalid_coords_rate > self.thresholds['invalid_coordinates_max']:
            alerts.append(QualityAlert(
                metric=QualityMetric.INVALID_COORDINATES,
                severity=AlertSeverity.ERROR,
                source=source,
                message=f"Invalid coordinates rate {invalid_coords_rate:.2%} exceeds threshold",
                value=invalid_coords_rate,
                threshold=self.thresholds['invalid_coordinates_max'],
                timestamp=datetime.now()
            ))
        
        # Check invalid prices
        invalid_prices_rate = invalid_counts.get('invalid_prices', 0)
        if invalid_prices_rate > self.thresholds['price_anomalies_max']:
            alerts.append(QualityAlert(
                metric=QualityMetric.PRICE_ANOMALIES,
                severity=AlertSeverity.ERROR,
                source=source,
                message=f"Invalid prices rate {invalid_prices_rate:.2%} exceeds threshold",
                value=invalid_prices_rate,
                threshold=self.thresholds['price_anomalies_max'],
                timestamp=datetime.now()
            ))
        
        return alerts
    
    def _generate_duplicate_alerts(self, source: str, result: Dict[str, Any]) -> List[QualityAlert]:
        """Generate alerts based on duplicate results."""
        alerts = []
        
        if 'error' in result:
            return alerts
        
        duplicate_rate = result.get('duplicate_rate', 0)
        
        if duplicate_rate > self.thresholds['duplicate_records_max']:
            alerts.append(QualityAlert(
                metric=QualityMetric.DUPLICATE_RECORDS,
                severity=AlertSeverity.WARNING,
                source=source,
                message=f"Duplicate rate {duplicate_rate:.2%} exceeds threshold",
                value=duplicate_rate,
                threshold=self.thresholds['duplicate_records_max'],
                timestamp=datetime.now()
            ))
        
        return alerts
    
    def _generate_freshness_alerts(self, source: str, result: Dict[str, Any]) -> List[QualityAlert]:
        """Generate alerts based on freshness results."""
        alerts = []
        
        if 'error' in result:
            return alerts
        
        days_since_update = result.get('days_since_update', 0)
        freshness_status = result.get('freshness_status', 'unknown')
        
        if days_since_update > self.thresholds['data_freshness_days']:
            alerts.append(QualityAlert(
                metric=QualityMetric.DATA_FRESHNESS,
                severity=AlertSeverity.WARNING,
                source=source,
                message=f"Data is {days_since_update} days old (status: {freshness_status})",
                value=days_since_update,
                threshold=self.thresholds['data_freshness_days'],
                timestamp=datetime.now()
            ))
        
        return alerts
    
    def _calculate_quality_score(self, metrics: Dict[str, Any]) -> float:
        """Calculate overall quality score from metrics."""
        if 'error' in metrics:
            return 0.0
        
        score = 1.0
        
        # Deduct for completeness issues
        completeness = metrics.get('completeness', {}).get('overall_completeness', 1.0)
        score *= completeness
        
        # Deduct for validity issues
        validity = metrics.get('validity', {}).get('overall_validity', 1.0)
        score *= validity
        
        # Deduct for duplicates
        duplicate_rate = metrics.get('duplicates', {}).get('duplicate_rate', 0)
        score *= (1.0 - duplicate_rate)
        
        # Deduct for stale data
        freshness_status = metrics.get('freshness', {}).get('freshness_status', 'fresh')
        if freshness_status == 'stale':
            score *= 0.9
        elif freshness_status == 'outdated':
            score *= 0.7
        
        return round(score, 2)
    
    def _log_quality_results(self, source: str, metrics: Dict[str, Any], alerts: List[QualityAlert]) -> None:
        """Log quality results."""
        self.logger.info(f"Quality check results for {source}:")
        self.logger.info(f"  Overall Quality Score: {metrics.get('overall_quality_score', 0):.2f}")
        self.logger.info(f"  Completeness: {metrics.get('completeness', {}).get('overall_completeness', 0):.2%}")
        self.logger.info(f"  Validity: {metrics.get('validity', {}).get('overall_validity', 0):.2%}")
        self.logger.info(f"  Duplicate Rate: {metrics.get('duplicates', {}).get('duplicate_rate', 0):.2%}")
        self.logger.info(f"  Freshness Status: {metrics.get('freshness', {}).get('freshness_status', 'unknown')}")
        self.logger.info(f"  Alerts Generated: {len(alerts)}")
        
        for alert in alerts:
            self.logger.warning(f"  [{alert.severity.value.upper()}] {alert.message}")
    
    def _save_quality_metrics(self, source: str, metrics: Dict[str, Any]) -> None:
        """Save quality metrics to database."""
        session = self.Session()
        try:
            metric_data = {
                'source': source,
                'metric_date': datetime.now().date(),
                'total_records': metrics.get('completeness', {}).get('total_records', 0),
                'missing_critical_fields': int(metrics.get('completeness', {}).get('total_records', 0) * (1 - metrics.get('completeness', {}).get('overall_completeness', 1))),
                'invalid_coordinates': int(metrics.get('validity', {}).get('total_records', 0) * metrics.get('validity', {}).get('invalid_counts', {}).get('invalid_coordinates', 0)),
                'date_anomalies': 0,  # Would need specific date validation
                'price_anomalies': int(metrics.get('validity', {}).get('total_records', 0) * metrics.get('validity', {}).get('invalid_counts', {}).get('invalid_prices', 0)),
                'duplicate_records': metrics.get('duplicates', {}).get('duplicate_count', 0),
                'quality_score': metrics.get('overall_quality_score', 0),
                'metadata': json.dumps(metrics)
            }
            
            session.execute(
                text("""
                    INSERT INTO data_quality_metrics 
                    (source, metric_date, total_records, missing_critical_fields, 
                     invalid_coordinates, date_anomalies, price_anomalies, 
                     duplicate_records, quality_score, metadata)
                    VALUES 
                    (:source, :metric_date, :total_records, :missing_critical_fields,
                     :invalid_coordinates, :date_anomalies, :price_anomalies,
                     :duplicate_records, :quality_score, :metadata)
                    ON CONFLICT (source, metric_date) DO UPDATE SET
                        total_records = EXCLUDED.total_records,
                        missing_critical_fields = EXCLUDED.missing_critical_fields,
                        invalid_coordinates = EXCLUDED.invalid_coordinates,
                        date_anomalies = EXCLUDED.date_anomalies,
                        price_anomalies = EXCLUDED.price_anomalies,
                        duplicate_records = EXCLUDED.duplicate_records,
                        quality_score = EXCLUDED.quality_score,
                        metadata = EXCLUDED.metadata
                """),
                metric_data
            )
            session.commit()
            
        except Exception as e:
            session.rollback()
            self.logger.error(f"Failed to save quality metrics: {str(e)}")
        finally:
            session.close()
    
    def get_active_alerts(self, severity: AlertSeverity = None) -> List[QualityAlert]:
        """Get active alerts, optionally filtered by severity."""
        if severity:
            return [alert for alert in self.alerts if alert.severity == severity]
        return self.alerts
    
    def clear_alerts(self) -> None:
        """Clear all alerts."""
        self.alerts = []