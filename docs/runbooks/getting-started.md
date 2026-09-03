# Getting Started Guide

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL with PostGIS extension
- Redis
- Docker (optional, for containerized development)
- AWS account (for S3 and other cloud services)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd platform
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install app dependencies
cd apps/web && npm install
cd ../api && npm install

# Install package dependencies
cd ../../packages/domain-types && npm install
cd ../financial-engine && npm install
```

### 3. Set Up Environment Variables

```bash
# Copy example environment files
cp .env.example .env
cp apps/api/.env.local.example apps/api/.env.local
cp apps/web/.env.local.example apps/web/.env.local
```

Edit the environment files with your local configuration:

```bash
# .env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=real_estate_platform
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key
```

### 4. Set Up PostgreSQL with PostGIS

#### Option A: Using Docker (Recommended)

```bash
cd infra/docker
docker-compose up postgres redis
```

#### Option B: Local Installation

Install PostgreSQL with PostGIS extension:
- macOS: `brew install postgresql postgis`
- Ubuntu: `sudo apt-get install postgresql postgis`

Create database:
```sql
CREATE DATABASE real_estate_platform;
\c real_estate_platform
CREATE EXTENSION postgis;
```

### 5. Run Database Migrations

```bash
cd apps/api
npm run migration:run
```

### 6. Load Sample Data (Optional)

```bash
psql -U postgres -d real_estate_platform -f ../../db/seeds/001_sample_data.sql
```

### 7. Start Development Servers

#### Terminal 1 - API Server
```bash
cd apps/api
npm run start:dev
```

#### Terminal 2 - Web Server
```bash
cd apps/web
npm run dev
```

The API will be available at `http://localhost:3001`
The web application will be available at `http://localhost:3000`

### 8. Access API Documentation

Open `http://localhost:3001/api/docs` in your browser to access the Swagger API documentation.

## Docker Development

### Using Docker Compose

```bash
cd infra/docker
docker-compose up
```

This will start:
- PostgreSQL with PostGIS
- Redis
- API server
- Web server

### Building Individual Services

```bash
# Build API
cd apps/api
docker build -t real-estate-api .

# Build Web
cd apps/web
docker build -t real-estate-web .
```

## Testing

### Run Unit Tests

```bash
cd apps/api
npm test
```

### Run Integration Tests

```bash
cd apps/api
npm run test:e2e
```

### Run Tests with Coverage

```bash
cd apps/api
npm run test:cov
```

## Code Quality

### Linting

```bash
# Lint API
cd apps/api
npm run lint

# Lint Web
cd apps/web
npm run lint
```

### Formatting

```bash
# Format API
cd apps/api
npm run format

# Format Web
cd apps/web
npm run format
```

### Type Checking

```bash
# Type check API
cd apps/api
npx tsc --noEmit

# Type check Web
cd apps/web
npx tsc --noEmit
```

## Database Operations

### Check Migration Status

```bash
cd apps/api
npm run migration:status
```

### Rollback Last Migration

```bash
cd apps/api
npm run migration:rollback
```

### Rollback Specific Migration

```bash
cd apps/api
npm run migration:rollback 001_initial_schema.sql
```

## Package Development

### Build Shared Packages

```bash
# Build domain types
cd packages/domain-types
npm run build

# Build financial engine
cd packages/financial-engine
npm run build
```

### Test Financial Engine

```bash
cd packages/financial-engine
npm test
```

## Troubleshooting

### Database Connection Issues

1. Check PostgreSQL is running:
```bash
# macOS
brew services list
brew services start postgresql

# Linux
sudo systemctl status postgresql
sudo systemctl start postgresql
```

2. Verify connection:
```bash
psql -U postgres -h localhost -p 5432 -d real_estate_platform
```

3. Check environment variables in `.env` file

### Redis Connection Issues

1. Check Redis is running:
```bash
redis-cli ping
```

2. Start Redis if needed:
```bash
# macOS
brew services start redis

# Linux
sudo systemctl start redis
```

### Port Conflicts

If ports 3000 or 3001 are already in use:

1. Change ports in `.env` files:
```bash
# apps/api/.env.local
PORT=3002

# apps/web/.env.local
# No port change needed for Next.js
```

2. Or stop the conflicting services

### Migration Failures

1. Check database connection
2. Verify PostGIS extension is installed:
```sql
SELECT * FROM pg_extension WHERE extname = 'postgis';
```
3. Check migration file permissions
4. Review migration logs for specific errors

### Build Errors

1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Clear Next.js cache:
```bash
cd apps/web
rm -rf .next
```

3. Clear NestJS build:
```bash
cd apps/api
rm -rf dist
```

## Production Deployment

### Environment Setup

1. Set production environment variables
2. Configure production database
3. Set up production Redis
4. Configure AWS S3 buckets
5. Set up SSL certificates

### Build for Production

```bash
# Build API
cd apps/api
npm run build

# Build Web
cd apps/web
npm run build
```

### Deploy with Docker

```bash
# Build and push images
docker build -t real-estate-api:latest apps/api
docker build -t real-estate-web:latest apps/web

# Push to registry
docker push your-registry/real-estate-api:latest
docker push your-registry/real-estate-web:latest
```

### Run Production Services

```bash
# API
cd apps/api
npm run start:prod

# Web
cd apps/web
npm run start
```

## Next Steps

1. Review the [Architecture Overview](../architecture/overview.md)
2. Explore the [Data Model](../architecture/data-model.md)
3. Read the [API Documentation](http://localhost:3001/api/docs)
4. Set up your development environment
5. Start building features!

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [PostGIS Documentation](https://postgis.net/documentation)
