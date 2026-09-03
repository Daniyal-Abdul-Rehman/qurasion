# Architecture Overview

## System Architecture

The Real Estate Intelligence and Investor Marketplace Platform is designed as a modular monolith that can evolve into distributed services as needed. The architecture follows a layered approach:

## Technology Layers

### 1. Experience Layer
- **Next.js**: User-facing web application
- **React**: Component library
- **TypeScript**: Type-safe development
- **Responsibilities**: 
  - Public property pages
  - Authenticated dashboards
  - Search interfaces
  - Analysis visualization
  - Deal management UI

### 2. Application Layer
- **NestJS**: Backend API framework
- **TypeScript**: Type-safe development
- **Responsibilities**:
  - Authentication and authorization
  - API endpoints and business logic
  - Workflow orchestration
  - Request validation
  - Response formatting

### 3. Operational Memory Layer
- **PostgreSQL**: Primary database
- **PostGIS**: Spatial data extension
- **Responsibilities**:
  - Canonical property facts
  - User and investor data
  - Transaction records
  - Workflow state
  - Audit logs

### 4. Intelligence Layer
- **Financial Engine**: Deterministic calculations
- **Valuation Service**: Property valuation
- **Matching Service**: Investor-property matching
- **Responsibilities**:
  - Property valuation
  - Investment analysis
  - Comparable selection
  - Investor scoring
  - Underwriting calculations

### 5. Communication Layer
- **Redis**: Caching and job queues
- **BullMQ**: Background job processing
- **Responsibilities**:
  - Response caching
  - Session management
  - Rate limiting
  - Asynchronous task processing
  - Distributed locks

### 6. Data Platform Layer
- **Cloudinary**: File storage and media management
- **Responsibilities**:
  - Raw data preservation
  - Document storage
  - Report generation
  - Model artifacts

## Domain Modules

The API is organized around domain modules rather than technical modules:

### Core Modules
- **auth**: Authentication and authorization
- **users**: User management
- **properties**: Property data and search
- **investors**: Investor profiles and preferences
- **valuations**: Property valuation and analysis
- **underwriting**: Financial underwriting calculations
- **matching**: Investor-property matching
- **offers**: Offer management
- **deals**: Deal workflow and milestones
- **documents**: Document management
- **jobs**: Background job tracking

### Cross-Cutting Modules
- **common**: Shared utilities and decorators
- **database**: Database configuration and migrations
- **events**: Domain event handling (future)

## Data Flow

### Property Search Flow
1. User enters search criteria in Next.js frontend
2. Frontend calls API with filters
3. API queries PostgreSQL with filters
4. Results are paginated and returned
5. Frontend displays results to user

### Property Analysis Flow
1. User requests analysis for a property
2. API creates analysis job record
3. Job is enqueued in BullMQ
4. Worker processes job asynchronously
5. Financial engine performs calculations
6. Results are stored and user is notified
7. User can retrieve completed analysis

### Investor Matching Flow
1. Property is added or updated
2. Matching service evaluates against investor profiles
3. Match scores are calculated
4. High-scoring matches are created
5. Investors are notified via preferences
6. Investors can view and act on matches

## Architectural Principles

1. **Separate authoritative facts from derived intelligence**
   - PostgreSQL stores canonical facts
   - Derived artifacts (valuations, matches) are reproducible

2. **Preserve original data**
   - All provider data is retained in Cloudinary
   - Raw data is the recovery source

3. **Use deterministic engines for financial conclusions**
   - Valuation and returns use deterministic calculations
   - LLMs explain results but don't replace calculation engines

4. **Use asynchronous processing for expensive work**
   - Long-running operations use job queues
   - API acknowledges request and provides job status

5. **Treat events as contracts**
   - Domain events have stable schemas
   - Events include versioning and correlation IDs

6. **Introduce infrastructure progressively**
   - Start with modular monolith
   - Add distributed services when scale requires it

7. **Make provenance first-class**
   - All derived data records source and assumptions
   - Users can distinguish facts from estimates

## Scalability Considerations

### Current Scale (Phase 1)
- Single API instance
- Managed PostgreSQL with PostGIS
- Managed Redis
- S3 for file storage
- Modular monolith architecture

### Future Scale (Phase 2+)
- OpenSearch for advanced search
- Kafka for event streaming
- Python services for ML/data processing
- Snowflake for analytics
- Kubernetes for orchestration
- Multi-region deployment

## Security Architecture

### Authentication
- JWT-based authentication
- Role-based access control
- Token expiration and refresh

### Authorization
- Module-level permissions
- Resource-level access control
- Audit logging for sensitive actions

### Data Protection
- Encryption at rest and in transit
- Least-privilege IAM policies
- Tenant isolation for multi-tenancy
- PII handling compliance

### API Security
- Rate limiting
- Request validation
- SQL injection prevention
- XSS protection
- CSRF protection

## Monitoring and Observability

### Logging
- Structured logging with request IDs
- Centralized log aggregation
- Log levels and retention policies

### Metrics
- API response times
- Error rates
- Database query performance
- Cache hit rates
- Queue depths

### Tracing
- Distributed tracing with OpenTelemetry
- Request correlation across services
- Performance bottleneck identification

### Alerting
- Error rate thresholds
- Performance degradation alerts
- Resource utilization alerts
- Failed job notifications
