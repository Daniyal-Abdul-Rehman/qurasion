# Real Estate Intelligence and Investor Marketplace Platform

A comprehensive platform for property intelligence, investment analysis, and investor matching.

## Architecture Overview

This platform is designed as a modular monolith that can evolve into distributed services as needed. The architecture follows a layered approach:

- **Experience Layer**: Next.js web application for user interfaces
- **Application Layer**: NestJS API for business logic and workflows
- **Operational Memory**: PostgreSQL with PostGIS for authoritative data
- **Intelligence Layer**: Search, valuation, underwriting, and matching services
- **Communication Layer**: Events and asynchronous task processing
- **Data Platform**: Historical analytics and infrastructure

## Repository Structure

```
platform/
├── apps/
│   ├── web/          # Next.js frontend application
│   ├── api/          # NestJS backend API
│   ├── worker/       # BullMQ background job workers
│   └── data-jobs/    # Python/Dagster data processing jobs
├── packages/
│   ├── api-contracts/      # OpenAPI specs and generated types
│   ├── event-contracts/    # Versioned Kafka event schemas
│   ├── domain-types/       # Shared domain types
│   └── financial-engine/   # Deterministic underwriting library
├── db/
│   ├── migrations/   # Database migration files
│   └── seeds/        # Database seed data
├── search/
│   ├── mappings/     # OpenSearch index mappings
│   └── templates/    # Search query templates
├── data/
│   ├── dbt/          # dbt transformation models
│   └── quality-checks/ # Data quality validation rules
├── infra/
│   ├── terraform/    # Infrastructure as code
│   ├── docker/       # Docker configurations
│   └── kubernetes/   # Kubernetes manifests
└── docs/
    ├── architecture/ # Architecture documentation
    ├── runbooks/     # Operational runbooks
    └── decisions/    # Architectural decision records
```

## Technology Stack

### Core Technologies (Phase 1)
- **Frontend**: Next.js, React, TypeScript
- **Backend**: NestJS, TypeScript
- **Database**: PostgreSQL with PostGIS extension
- **Cache**: Redis
- **Storage**: Amazon S3
- **Job Queue**: BullMQ
- **CI/CD**: GitHub Actions

### Future Technologies (Progressive Introduction)
- **Search**: OpenSearch (when PostgreSQL search becomes limiting)
- **Events**: Apache Kafka (when multiple consumers require decoupling)
- **Analytics**: Snowflake + dbt (for historical business intelligence)
- **Orchestration**: Dagster (for complex data pipelines)
- **ML/Data**: Python services (for advanced analytics)
- **Infrastructure**: Kubernetes (when service complexity requires it)
- **IaC**: Terraform (for multi-environment infrastructure)

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL with PostGIS extension
- Redis
- AWS account (for S3 and other services)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run db:migrate

# Start development servers
npm run dev
```

## Development

```bash
# Run all services in development mode
npm run dev

# Run specific service
cd apps/web && npm run dev
cd apps/api && npm run dev

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format
```

## Architecture Principles

1. **Separate authoritative facts from derived intelligence**: PostgreSQL stores canonical facts; search documents and valuations are derived artifacts
2. **Preserve original data**: Every provider delivery is retained in S3 before transformation
3. **Use deterministic engines for financial conclusions**: Valuation and returns use deterministic calculations
4. **Use asynchronous processing for expensive work**: Long-running operations are handled via job queues
5. **Treat events as contracts**: Domain events have stable schemas and version identifiers
6. **Introduce infrastructure progressively**: Start with a modular monolith, evolve to distributed services when needed
7. **Make provenance first-class**: All derived data records source, timestamp, and assumptions

## API Documentation

API documentation is available through OpenAPI specifications in the `packages/api-contracts` directory.

## Contributing

This project follows a phased implementation approach:

- **Phase 1**: Operational foundation (Next.js, NestJS, PostgreSQL/PostGIS, Redis, S3)
- **Phase 2**: Search and workflow maturity (OpenSearch, async analysis, offers/deals)
- **Phase 3**: Data platform (Raw data ingestion, entity resolution, ML models)
- **Phase 4**: Analytics and optimization (Snowflake, dbt, business intelligence)
- **Phase 5**: Scale and enterprise capabilities (Kubernetes, multi-region, enterprise features)

## License

Proprietary - All rights reserved
