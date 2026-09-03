# Data Model

## Core Entities

### Property
The central entity representing a real estate property.

**Fields:**
- `id` (UUID): Primary key
- `canonicalAddress` (text): Normalized address
- `city` (text): City name
- `stateCode` (char(2)): Two-letter state code
- `postalCode` (text): ZIP/postal code
- `latitude` (numeric): Geographic latitude
- `longitude` (numeric): Geographic longitude
- `location` (geography): PostGIS point for spatial queries
- `parcelId` (text): Tax parcel identifier
- `propertyType` (enum): single_family, multi_family, condo, townhouse, land, commercial
- `bedrooms` (numeric): Number of bedrooms
- `bathrooms` (numeric): Number of bathrooms
- `buildingSqft` (integer): Building square footage
- `lotSqft` (integer): Lot square footage
- `yearBuilt` (integer): Year built
- `estimatedValue` (numeric): Current estimated value
- `investmentScore` (numeric): Investment attractiveness score
- `createdAt` (timestamptz): Record creation timestamp
- `updatedAt` (timestamptz): Last update timestamp

**Indexes:**
- Spatial index on location
- Composite index on city and state
- Indexes on property type, bedrooms, bathrooms, building size, year built, estimated value

### Owner
Represents a property owner.

**Fields:**
- `id` (UUID): Primary key
- `displayName` (text): Owner's display name
- `createdAt` (timestamptz): Record creation timestamp

### PropertyOwner
Junction table linking properties to owners with ownership details.

**Fields:**
- `propertyId` (UUID): Foreign key to Property
- `ownerId` (UUID): Foreign key to Owner
- `ownershipPercent` (numeric): Ownership percentage
- `validFrom` (date): Ownership start date
- `validTo` (date): Ownership end date (nullable)

**Primary Key:** (propertyId, ownerId, validFrom)

### Sale
Historical sale transactions for properties.

**Fields:**
- `id` (UUID): Primary key
- `propertyId` (UUID): Foreign key to Property
- `salePrice` (numeric): Sale price
- `saleDate` (date): Sale date
- `sourceObservationId` (UUID): Reference to source data
- `createdAt` (timestamptz): Record creation timestamp

**Indexes:**
- Index on propertyId
- Index on saleDate

### SourceObservation
Records data received from external providers for provenance.

**Fields:**
- `id` (UUID): Primary key
- `provider` (text): Data provider name
- `dataset` (text): Dataset identifier
- `externalRecordId` (text): Provider's record ID
- `propertyId` (UUID): Resolved property ID (nullable)
- `rawObjectUri` (text): S3 URI to raw data
- `observedAt` (timestamptz): When data was received
- `normalizationVersion` (text): Normalization algorithm version
- `resolutionVersion` (text): Entity resolution version
- `createdAt` (timestamptz): Record creation timestamp

**Indexes:**
- Index on provider
- Index on propertyId
- Index on observedAt

### User
Platform user accounts.

**Fields:**
- `id` (UUID): Primary key
- `email` (text): Email address (unique)
- `passwordHash` (text): Bcrypt hashed password
- `firstName` (text): First name
- `lastName` (text): Last name
- `role` (enum): investor, analyst, acquisitions_operator, transaction_coordinator, administrator, data_operator
- `isActive` (boolean): Account active status
- `createdAt` (timestamptz): Record creation timestamp
- `updatedAt` (timestamptz): Last update timestamp

**Indexes:**
- Unique index on email
- Index on role

### InvestorProfile
Investor preferences and criteria.

**Fields:**
- `id` (UUID): Primary key
- `userId` (UUID): Foreign key to User
- `displayName` (text): Profile display name
- `capitalMin` (numeric): Minimum investment capital
- `capitalMax` (numeric): Maximum investment capital
- `strategy` (enum): fix_and_flip, buy_and_hold, rental, wholesale, development
- `targetReturn` (numeric): Target return percentage
- `riskTolerance` (enum): low, medium, high
- `renovationAppetite` (enum): none, light, moderate, heavy
- `propertyTypes` (array): Preferred property types
- `preferredStates` (array): Preferred states
- `preferredCities` (array): Preferred cities
- `preferredZipCodes` (array): Preferred ZIP codes
- `notificationEmail` (boolean): Email notification preference
- `notificationSms` (boolean): SMS notification preference
- `notificationPush` (boolean): Push notification preference
- `createdAt` (timestamptz): Record creation timestamp
- `updatedAt` (timestamptz): Last update timestamp

**Indexes:**
- Index on userId
- Index on strategy

### PropertyAnalysis
Property analysis and valuation results.

**Fields:**
- `id` (UUID): Primary key
- `propertyId` (UUID): Foreign key to Property
- `userId` (UUID): Foreign key to User (nullable)
- `status` (enum): pending, processing, completed, failed
- `estimatedValue` (numeric): Calculated estimated value
- `confidence` (numeric): Valuation confidence score
- `modelName` (text): Valuation model name
- `modelVersion` (text): Valuation model version
- `comparableCount` (integer): Number of comparables used
- `comparableCriteria` (jsonb): Comparable selection criteria
- `assumptions` (jsonb): Analysis assumptions
- `results` (jsonb): Analysis results
- `jobId` (text): Background job ID
- `createdAt` (timestamptz): Record creation timestamp
- `updatedAt` (timestamptz): Last update timestamp

**Indexes:**
- Index on propertyId
- Index on userId
- Index on status

### PropertyMatch
Matching properties to investor criteria.

**Fields:**
- `id` (UUID): Primary key
- `investorId` (UUID): Foreign key to InvestorProfile
- `propertyId` (UUID): Foreign key to Property
- `score` (numeric): Match score (0-100)
- `reasons` (array): Reasons for match score
- `ruleVersion` (text): Matching rule version
- `isViewed` (boolean): Whether investor has viewed
- `isSaved` (boolean): Whether investor has saved
- `createdAt` (timestamptz): Record creation timestamp

**Indexes:**
- Index on investorId
- Index on propertyId
- Index on score
- Unique index on (investorId, propertyId)

### Offer
Investor offers on properties.

**Fields:**
- `id` (UUID): Primary key
- `propertyId` (UUID): Foreign key to Property
- `investorId` (UUID): Foreign key to InvestorProfile
- `status` (enum): draft, submitted, under_review, accepted, rejected, countered, expired
- `offeredPrice` (numeric): Offered price
- `terms` (jsonb): Offer terms and conditions
- `expiresAt` (timestamptz): Offer expiration
- `createdAt` (timestamptz): Record creation timestamp
- `updatedAt` (timestamptz): Last update timestamp

**Indexes:**
- Index on propertyId
- Index on investorId
- Index on status

### Deal
Active deals from accepted offers.

**Fields:**
- `id` (UUID): Primary key
- `propertyId` (UUID): Foreign key to Property
- `offerId` (UUID): Foreign key to Offer
- `status` (enum): initiated, due_diligence, contracted, financing, closing, closed, cancelled
- `createdAt` (timestamptz): Record creation timestamp
- `updatedAt` (timestamptz): Last update timestamp

**Indexes:**
- Index on propertyId
- Index on offerId
- Index on status

### DealMilestone
Milestones within a deal.

**Fields:**
- `id` (UUID): Primary key
- `dealId` (UUID): Foreign key to Deal
- `name` (text): Milestone name
- `status` (enum): pending, in_progress, completed, blocked
- `dueDate` (timestamptz): Due date
- `completedAt` (timestamptz): Completion timestamp
- `createdAt` (timestamptz): Record creation timestamp

**Indexes:**
- Index on dealId
- Index on status

### DealParticipant
Participants in a deal.

**Fields:**
- `id` (UUID): Primary key
- `dealId` (UUID): Foreign key to Deal
- `userId` (UUID): Foreign key to User
- `role` (enum): buyer, seller, agent, coordinator, lender, attorney
- `createdAt` (timestamptz): Record creation timestamp

**Indexes:**
- Index on dealId
- Index on userId

### Document
Document storage and metadata.

**Fields:**
- `id` (UUID): Primary key
- `propertyId` (UUID): Foreign key to Property (nullable)
- `dealId` (UUID): Foreign key to Deal (nullable)
- `uploaderId` (UUID): Foreign key to User
- `documentType` (text): Document type
- `fileName` (text): Original file name
- `fileSize` (integer): File size in bytes
- `contentType` (text): MIME content type
- `s3Key` (text): S3 object key
- `s3Bucket` (text): S3 bucket name
- `checksum` (text): File checksum
- `isPublic` (boolean): Public access flag
- `expiresAt` (timestamptz): Access expiration
- `createdAt` (timestamptz): Record creation timestamp

**Indexes:**
- Index on propertyId
- Index on dealId
- Index on uploaderId
- Index on documentType

### Job
Background job tracking.

**Fields:**
- `id` (text): Job ID
- `jobType` (text): Type of job
- `status` (enum): pending, processing, completed, failed
- `inputData` (jsonb): Job input parameters
- `resultData` (jsonb): Job result data
- `errorMessage` (text): Error message if failed
- `progress` (integer): Progress percentage (0-100)
- `attemptCount` (integer): Number of attempts
- `maxAttempts` (integer): Maximum allowed attempts
- `requestedBy` (UUID): Foreign key to User (nullable)
- `createdAt` (timestamptz): Record creation timestamp
- `startedAt` (timestamptz): Job start timestamp
- `completedAt` (timestamptz): Job completion timestamp

**Indexes:**
- Index on status
- Index on jobType
- Index on requestedBy

### AuditLog
Audit trail for sensitive operations.

**Fields:**
- `id` (UUID): Primary key
- `userId` (UUID): Foreign key to User (nullable)
- `action` (text): Action performed
- `entityType` (text): Type of entity affected
- `entityId` (UUID): ID of affected entity
- `changes` (jsonb): Changes made
- `ipAddress` (text): Request IP address
- `userAgent` (text): Request user agent
- `createdAt` (timestamptz): Record creation timestamp

**Indexes:**
- Index on userId
- Composite index on (entityType, entityId)
- Index on createdAt

## Data Relationships

### Property Relationships
- Property → Owner (many-to-many via PropertyOwner)
- Property → Sale (one-to-many)
- Property → SourceObservation (one-to-many)
- Property → PropertyAnalysis (one-to-many)
- Property → PropertyMatch (one-to-many)
- Property → Offer (one-to-many)
- Property → Deal (one-to-many)
- Property → Document (one-to-many)

### User Relationships
- User → InvestorProfile (one-to-one)
- User → PropertyAnalysis (one-to-many)
- User → Document (one-to-many as uploader)
- User → Job (one-to-many as requester)
- User → AuditLog (one-to-many)

### Investor Relationships
- InvestorProfile → PropertyMatch (one-to-many)
- InvestorProfile → Offer (one-to-many)

### Deal Relationships
- Deal → DealMilestone (one-to-many)
- Deal → DealParticipant (one-to-many)
- Deal → Document (one-to-many)

## Data Integrity

### Constraints
- Foreign key constraints with appropriate CASCADE rules
- Unique constraints on email, property-investor matches
- Check constraints on numeric ranges
- Enum constraints on status fields

### Triggers
- Automatic updated_at timestamp updates
- Future: triggers for audit logging
- Future: triggers for data validation

### Soft Deletes
- Critical records use soft deletes via isActive flags
- Historical records preserved (sales, audit logs)
- GDPR-compliant deletion workflows

## Data Lifecycle

### Creation
- All records have createdAt timestamps
- IDs are UUIDs for distributed compatibility
- Source observations record provenance

### Updates
- updatedAt timestamps track modifications
- Audit logs record sensitive changes
- Version fields track algorithm evolution

### Deletion
- Soft deletes for user data
- Cascade deletes for dependent records
- Retention policies for audit data

### Archival
- Old data can be archived to cold storage
- Search indexes can be rebuilt from canonical data
- Raw source data preserved indefinitely
