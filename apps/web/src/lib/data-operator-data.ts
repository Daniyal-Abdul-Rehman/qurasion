export const dataProviders = [
  { id: 'provider-1', name: 'County Tax Records', type: 'Government', status: 'Active', lastDelivery: 'Sep 11, 2026', deliveryFrequency: 'Daily', recordCount: '1.2M', health: 'healthy', apiEndpoint: 'https://api.county-tx.gov/records' },
  { id: 'provider-2', name: 'MLS Listings', type: 'Licensed', status: 'Active', lastDelivery: 'Sep 11, 2026', deliveryFrequency: 'Real-time', recordCount: '850K', health: 'healthy', apiEndpoint: 'https://api.mls.com/v2/listings' },
  { id: 'provider-3', name: 'Building Permits', type: 'Government', status: 'Active', lastDelivery: 'Sep 10, 2026', deliveryFrequency: 'Weekly', recordCount: '340K', health: 'healthy', apiEndpoint: 'https://api.permits.gov/data' },
  { id: 'provider-4', name: 'Geographic Data', type: 'Geographic', status: 'Active', lastDelivery: 'Sep 11, 2026', deliveryFrequency: 'Daily', recordCount: '2.1M', health: 'healthy', apiEndpoint: 'https://api.geo-spatial.com/features' },
  { id: 'provider-5', name: 'Mortgage Records', type: 'Licensed', status: 'Degraded', lastDelivery: 'Sep 09, 2026', deliveryFrequency: 'Daily', recordCount: '680K', health: 'degraded', apiEndpoint: 'https://api.mortgage-data.com/records' },
];

export const dataIngestions = [
  { id: 'ingestion-1', provider: 'County Tax Records', dataset: 'Property Tax Assessments', deliveryId: 'DEL-2026-09-11-001', status: 'Completed', recordsProcessed: 45230, recordsRejected: 12, startedAt: 'Sep 11, 2026 02:00 AM', completedAt: 'Sep 11, 2026 02:15 AM', duration: '15 min' },
  { id: 'ingestion-2', provider: 'MLS Listings', dataset: 'Active Listings', deliveryId: 'DEL-2026-09-11-002', status: 'Completed', recordsProcessed: 8934, recordsRejected: 3, startedAt: 'Sep 11, 2026 03:00 AM', completedAt: 'Sep 11, 2026 03:05 AM', duration: '5 min' },
  { id: 'ingestion-3', provider: 'Building Permits', dataset: 'Construction Permits', deliveryId: 'DEL-2026-09-10-001', status: 'Completed', recordsProcessed: 1256, recordsRejected: 45, startedAt: 'Sep 10, 2026 08:00 AM', completedAt: 'Sep 10, 2026 08:12 AM', duration: '12 min' },
  { id: 'ingestion-4', provider: 'Mortgage Records', dataset: 'Active Mortgages', deliveryId: 'DEL-2026-09-09-001', status: 'Failed', recordsProcessed: 0, recordsRejected: 0, startedAt: 'Sep 09, 2026 02:00 AM', completedAt: 'Sep 09, 2026 02:15 AM', duration: '15 min', error: 'API rate limit exceeded' },
  { id: 'ingestion-5', provider: 'Geographic Data', dataset: 'Parcel Boundaries', deliveryId: 'DEL-2026-09-11-003', status: 'In Progress', recordsProcessed: 15000, recordsRejected: 0, startedAt: 'Sep 11, 2026 04:00 AM', completedAt: null, duration: null },
];

export const entityResolutions = [
  { id: 'resolution-1', propertyId: 'P123456', address: '1824 Oak Street, Dallas, TX 75201', confidence: 0.98, sourceRecords: 3, status: 'Auto-Resolved', lastUpdated: 'Sep 11, 2026', requiresReview: false },
  { id: 'resolution-2', propertyId: 'P234567', address: '741 Pine Avenue, Austin, TX 78701', confidence: 0.85, sourceRecords: 2, status: 'Auto-Resolved', lastUpdated: 'Sep 10, 2026', requiresReview: false },
  { id: 'resolution-3', propertyId: 'P345678', address: '92 Market Street, Houston, TX 77002', confidence: 0.72, sourceRecords: 4, status: 'Pending Review', lastUpdated: 'Sep 11, 2026', requiresReview: true },
  { id: 'resolution-4', propertyId: 'P456789', address: '310 Lake Drive, Dallas, TX 75201', confidence: 0.45, sourceRecords: 2, status: 'Manual Review', lastUpdated: 'Sep 10, 2026', requiresReview: true },
  { id: 'resolution-5', propertyId: 'P567890', address: '555 River Road, Austin, TX 78701', confidence: 0.91, sourceRecords: 3, status: 'Auto-Resolved', lastUpdated: 'Sep 09, 2026', requiresReview: false },
];

export const dataQualityChecks = [
  { id: 'quality-1', checkType: 'Completeness', category: 'Property Records', status: 'Passed', lastRun: 'Sep 11, 2026 06:00 AM', recordsChecked: 150000, recordsFailed: 23, failureRate: '0.015%' },
  { id: 'quality-2', checkType: 'Validity', category: 'Sale Prices', status: 'Passed', lastRun: 'Sep 11, 2026 06:00 AM', recordsChecked: 45000, recordsFailed: 12, failureRate: '0.027%' },
  { id: 'quality-3', checkType: 'Geographic Plausibility', category: 'Coordinates', status: 'Warning', lastRun: 'Sep 11, 2026 06:00 AM', recordsChecked: 120000, recordsFailed: 156, failureRate: '0.13%' },
  { id: 'quality-4', checkType: 'Uniqueness', category: 'Provider IDs', status: 'Passed', lastRun: 'Sep 11, 2026 06:00 AM', recordsChecked: 89000, recordsFailed: 0, failureRate: '0%' },
  { id: 'quality-5', checkType: 'Freshness', category: 'Provider Deliveries', status: 'Failed', lastRun: 'Sep 11, 2026 06:00 AM', recordsChecked: 12, recordsFailed: 1, failureRate: '8.33%' },
];

export const backgroundJobs = [
  { id: 'job-1', jobType: 'Valuation Calculation', status: 'Completed', priority: 'High', startedAt: 'Sep 11, 2026 07:00 AM', completedAt: 'Sep 11, 2026 07:45 AM', duration: '45 min', recordsProcessed: 5230, error: null },
  { id: 'job-2', jobType: 'Search Index Update', status: 'Completed', priority: 'Medium', startedAt: 'Sep 11, 2026 08:00 AM', completedAt: 'Sep 11, 2026 08:15 AM', duration: '15 min', recordsProcessed: 8934, error: null },
  { id: 'job-3', jobType: 'Investor Matching', status: 'In Progress', priority: 'High', startedAt: 'Sep 11, 2026 09:00 AM', completedAt: null, duration: null, recordsProcessed: 2340, error: null },
  { id: 'job-4', jobType: 'Report Generation', status: 'Queued', priority: 'Low', startedAt: null, completedAt: null, duration: null, recordsProcessed: 0, error: null },
  { id: 'job-5', jobType: 'Entity Resolution', status: 'Failed', priority: 'High', startedAt: 'Sep 10, 2026 11:00 PM', completedAt: 'Sep 10, 2026 11:30 PM', duration: '30 min', recordsProcessed: 450, error: 'Memory limit exceeded' },
];

export const rawDataStorage = [
  { id: 'storage-1', provider: 'County Tax Records', date: '2026-09-11', location: 's3://platform-data-lake/raw/county-tax/2026/09/11/', size: '2.4 GB', recordCount: 45230, retention: '7 years' },
  { id: 'storage-2', provider: 'MLS Listings', date: '2026-09-11', location: 's3://platform-data-lake/raw/mls/2026/09/11/', size: '890 MB', recordCount: 8934, retention: '7 years' },
  { id: 'storage-3', provider: 'Building Permits', date: '2026-09-10', location: 's3://platform-data-lake/raw/permits/2026/09/10/', size: '450 MB', recordCount: 1256, retention: '7 years' },
  { id: 'storage-4', provider: 'Geographic Data', date: '2026-09-11', location: 's3://platform-data-lake/raw/geo/2026/09/11/', size: '1.2 GB', recordCount: 15000, retention: '7 years' },
  { id: 'storage-5', provider: 'Mortgage Records', date: '2026-09-09', location: 's3://platform-data-lake/raw/mortgage/2026/09/09/', size: '680 MB', recordCount: 0, retention: '7 years' },
];

export const dataOperatorMetrics = {
  totalProviders: 5,
  activeProviders: 4,
  todayIngestions: 4,
  successfulIngestions: 3,
  failedIngestions: 1,
  pendingReviews: 2,
  queuedJobs: 1,
  runningJobs: 1,
  failedJobs: 1,
  totalRecords: '3.2M',
  dataQualityScore: 98.5,
  systemHealth: 'healthy',
  searchIndexStatus: 'current',
  lastSearchSync: '15 min ago',
  avgConfidence: 84.2,
  activeValuationJobs: 3,
  modelVersion: 'v2026.08.1',
};

// Pipeline definitions for data operator
export const pipelineDefinitions = [
  {
    id: 'pipeline-1',
    name: 'Data Ingestion Pipeline',
    description: 'Provider → Raw Storage → Normalization',
    stages: 5,
    status: 'active',
    lastRun: 'Sep 11, 2026 02:00 AM',
    nextRun: 'Sep 12, 2026 02:00 AM',
    successRate: 98.5
  },
  {
    id: 'pipeline-2',
    name: 'Entity Resolution Pipeline',
    description: 'Normalization → Matching → Resolution',
    stages: 4,
    status: 'active',
    lastRun: 'Sep 11, 2026 03:00 AM',
    nextRun: 'Sep 11, 2026 09:00 AM',
    successRate: 92.3
  },
  {
    id: 'pipeline-3',
    name: 'Valuation Pipeline',
    description: 'Properties → Valuation → Scoring',
    stages: 6,
    status: 'active',
    lastRun: 'Sep 11, 2026 07:00 AM',
    nextRun: 'Sep 11, 2026 11:00 AM',
    successRate: 99.1
  },
  {
    id: 'pipeline-4',
    name: 'Search Index Pipeline',
    description: 'Canonical → Index → Sync',
    stages: 3,
    status: 'active',
    lastRun: 'Sep 11, 2026 08:00 AM',
    nextRun: 'Sep 11, 2026 12:00 PM',
    successRate: 99.8
  },
  {
    id: 'pipeline-5',
    name: 'Matching Pipeline',
    description: 'Valuations → Investors → Matches',
    stages: 4,
    status: 'active',
    lastRun: 'Sep 11, 2026 09:00 AM',
    nextRun: 'Sep 11, 2026 01:00 PM',
    successRate: 97.2
  },
  {
    id: 'pipeline-6',
    name: 'Data Quality Pipeline',
    description: 'Sampling → Validation → Reporting',
    stages: 3,
    status: 'active',
    lastRun: 'Sep 11, 2026 06:00 AM',
    nextRun: 'Sep 12, 2026 06:00 AM',
    successRate: 99.5
  },
];

// Search index data
export const searchIndexData = {
  indexHealth: 'healthy',
  indexedProperties: '3.2M',
  syncStatus: 'current',
  lastSync: '15 min ago',
  indexVersion: 'v4.2',
  queryLatency: '45ms',
  queriesPerSecond: 1245,
  indexSize: '842 GB',
  cacheHitRate: '94.2%',
  zeroResultsRate: '2.3%',
  avgResultsPerQuery: 47,
  clusterNodes: [
    { name: 'es-primary-01', status: 'healthy', cpu: '42%', memory: '67%', role: 'primary' },
    { name: 'es-data-01', status: 'healthy', cpu: '38%', memory: '71%', role: 'data' },
    { name: 'es-data-02', status: 'healthy', cpu: '35%', memory: '69%', role: 'data' },
  ],
  indexes: [
    { name: 'Property Index', documents: '3.2M', status: 'synced', lastSync: '15 min ago' },
    { name: 'Investor Index', documents: '12.4K', status: 'synced', lastSync: '12 min ago' },
    { name: 'Deal Index', documents: '847', status: 'syncing', lastSync: 'In progress' },
  ],
};

// Valuation model data
export const valuationModelData = {
  modelName: 'residential-value-model',
  version: 'v2026.08.1',
  releaseDate: 'Aug 15, 2026',
  trainingData: '2.4M sales records',
  trainingPeriod: 'Last 5 years',
  accuracy: 92.4,
  mae: '$8,420',
  processingTime: '1.2s',
  successRate: 99.1,
  activeJobs: 3,
  todayValuations: 5234,
  avgConfidence: 84.2,
  comparableCriteria: {
    radiusMiles: 1.0,
    propertyType: 'single_family',
    saleRecencyDays: 365
  }
};

// System health data
export const systemHealthData = {
  overallStatus: 'healthy',
  uptime: '99.9%',
  components: {
    database: { status: 'healthy', name: 'PostgreSQL + PostGIS', connections: '45/100', queryLatency: '12ms', storage: '67%', replicationLag: '0ms' },
    cache: { status: 'healthy', name: 'Redis + BullMQ', memory: '45%', hitRate: '94.2%' },
    search: { status: 'healthy', name: 'OpenSearch Cluster', nodes: 3, shards: 'healthy' },
    storage: { status: 'healthy', name: 'S3 Data Lake', totalStorage: '5.6 TB', usedStorage: '4.2 TB' }
  },
  infrastructure: [
    { name: 'Application Server', status: 'healthy', cpu: '32%', memory: '54%', network: '125 Mbps' },
    { name: 'Worker Nodes (3)', status: 'healthy', cpu: '28%', memory: '48%', activeJobs: 12 },
    { name: 'Load Balancer', status: 'degraded', cpu: '45%', memory: '62%', network: '890 req/sec' },
    { name: 'CDN Edge', status: 'healthy', locations: 12, cacheHit: '95%', transferred: '2.4 TB' },
  ],
  services: [
    { name: 'API Gateway', status: 'healthy', type: 'REST + GraphQL' },
    { name: 'Authentication', status: 'healthy', type: 'OAuth + JWT' },
    { name: 'Notification Service', status: 'healthy', type: 'Email + Push + SMS' },
    { name: 'File Storage', status: 'healthy', type: 'S3 + CDN' },
    { name: 'Provider Adapters', status: 'degraded', type: 'External API connections' },
    { name: 'Background Workers', status: 'healthy', type: 'BullMQ processing' },
  ],
  recentIncidents: [
    { title: 'Database connection spike', severity: 'low', duration: '4 min', impact: 'Low', timestamp: '2 hours ago', status: 'resolved' },
    { title: 'Mortgage provider rate limiting', severity: 'medium', duration: '15 min', impact: 'Medium', timestamp: 'Yesterday', status: 'resolved' },
    { title: 'Scheduled maintenance', severity: 'none', duration: '25 min', impact: 'None', timestamp: '3 days ago', status: 'resolved' },
  ],
  uptimeStatistics: {
    last24Hours: '100%',
    last7Days: '99.98%',
    last30Days: '99.92%',
    last90Days: '99.85%'
  }
};

// Notification data
export const notificationData = {
  unread: 7,
  critical: 2,
  warnings: 3,
  totalToday: 24,
  criticalAlerts: [
    { id: 'notif-1', title: 'Entity resolution job failed', message: 'Memory limit exceeded during batch processing. Job ID: job-5', timestamp: '5 min ago', actions: ['Retry Job', 'View Logs'] },
    { id: 'notif-2', title: 'Mortgage provider API unavailable', message: 'Provider endpoint returning 503 errors for 15 minutes', timestamp: '15 min ago', actions: ['Check Status', 'View Provider'] },
  ],
  warningsList: [
    { id: 'notif-3', title: 'Data quality check degraded', message: 'Geographic plausibility check failure rate increased to 0.13%', timestamp: '1 hour ago', actions: ['View Details', 'Dismiss'] },
    { id: 'notif-4', title: 'Storage capacity warning', message: 'S3 data lake storage at 82% capacity. Consider archival or cleanup', timestamp: '2 hours ago', actions: ['Manage Storage', 'Dismiss'] },
    { id: 'notif-5', title: 'Entity resolution queue growing', message: '12 properties pending manual review, above threshold of 10', timestamp: '3 hours ago', actions: ['Review Queue', 'Dismiss'] },
  ],
  informational: [
    { id: 'notif-6', title: 'Daily ingestion completed successfully', message: 'All 5 providers delivered data on schedule. 156K records processed', timestamp: '4 hours ago', actions: ['View Report', 'Dismiss'] },
    { id: 'notif-7', title: 'Search index sync completed', message: '8,234 property documents synced to OpenSearch', timestamp: '5 hours ago', actions: ['View Details', 'Dismiss'] },
    { id: 'notif-8', title: 'Scheduled maintenance reminder', message: 'PostgreSQL maintenance window tomorrow 2:00-4:00 AM UTC', timestamp: '6 hours ago', actions: ['View Schedule', 'Dismiss'] },
  ],
  earlier: [
    { id: 'notif-9', title: 'Valuation batch completed', message: '5,234 properties valued successfully', timestamp: 'Yesterday', type: 'success' },
    { id: 'notif-10', title: 'New provider added', message: 'Geographic Data provider configured successfully', timestamp: '2 days ago', type: 'info' },
    { id: 'notif-11', title: 'Data quality checks passed', message: 'All 5 quality checks completed with 99.2% success rate', timestamp: '3 days ago', type: 'success' },
  ]
};
