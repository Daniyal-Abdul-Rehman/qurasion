// Shared Domain Types for Real Estate Platform

export enum PropertyType {
  SINGLE_FAMILY = 'single_family',
  MULTI_FAMILY = 'multi_family',
  CONDO = 'condo',
  TOWNHOUSE = 'townhouse',
  LAND = 'land',
  COMMERCIAL = 'commercial',
}

export enum InvestmentStrategy {
  FIX_AND_FLIP = 'fix_and_flip',
  BUY_AND_HOLD = 'buy_and_hold',
  RENTAL = 'rental',
  WHOLESALE = 'wholesale',
  DEVELOPMENT = 'development',
}

export enum OfferStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  COUNTERED = 'countered',
  EXPIRED = 'expired',
}

export enum DealStatus {
  INITIATED = 'initiated',
  DUE_DILIGENCE = 'due_diligence',
  CONTRACTED = 'contracted',
  FINANCING = 'financing',
  CLOSING = 'closing',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

export enum UserRole {
  INVESTOR = 'investor',
  ANALYST = 'analyst',
  ACQUISITIONS_OPERATOR = 'acquisitions_operator',
  TRANSACTION_COORDINATOR = 'transaction_coordinator',
  ADMINISTRATOR = 'administrator',
  DATA_OPERATOR = 'data_operator',
}

export enum RiskTolerance {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum RenovationAppetite {
  NONE = 'none',
  LIGHT = 'light',
  MODERATE = 'moderate',
  HEAVY = 'heavy',
}

export interface Property {
  id: string;
  canonicalAddress: string;
  city?: string;
  stateCode?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  location?: string; // PostGIS geography
  parcelId?: string;
  propertyType?: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  buildingSqft?: number;
  lotSqft?: number;
  yearBuilt?: number;
  estimatedValue?: number;
  investmentScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Owner {
  id: string;
  displayName: string;
  createdAt: Date;
}

export interface PropertyOwner {
  propertyId: string;
  ownerId: string;
  ownershipPercent?: number;
  validFrom: Date;
  validTo?: Date;
}

export interface Sale {
  id: string;
  propertyId: string;
  salePrice?: number;
  saleDate?: Date;
  sourceObservationId?: string;
  createdAt: Date;
}

export interface SourceObservation {
  id: string;
  provider: string;
  dataset?: string;
  externalRecordId?: string;
  propertyId?: string;
  rawObjectUri: string;
  observedAt: Date;
  normalizationVersion?: string;
  resolutionVersion?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvestorProfile {
  id: string;
  userId: string;
  displayName: string;
  capitalMin?: number;
  capitalMax?: number;
  strategy: InvestmentStrategy;
  targetReturn?: number;
  riskTolerance: RiskTolerance;
  renovationAppetite: RenovationAppetite;
  propertyTypes: PropertyType[];
  preferredStates: string[];
  preferredCities: string[];
  preferredZipCodes: string[];
  notificationEmail: boolean;
  notificationSms: boolean;
  notificationPush: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyAnalysis {
  id: string;
  propertyId: string;
  userId?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  estimatedValue?: number;
  confidence?: number;
  modelName?: string;
  modelVersion?: string;
  comparableCount?: number;
  comparableCriteria?: Record<string, any>;
  assumptions?: Record<string, any>;
  results?: Record<string, any>;
  jobId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyMatch {
  id: string;
  investorId: string;
  propertyId: string;
  score: number;
  reasons: string[];
  ruleVersion?: string;
  isViewed: boolean;
  isSaved: boolean;
  createdAt: Date;
}

export interface Offer {
  id: string;
  propertyId: string;
  investorId: string;
  status: OfferStatus;
  offeredPrice: number;
  terms?: Record<string, any>;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deal {
  id: string;
  propertyId: string;
  offerId: string;
  status: DealStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface DealMilestone {
  id: string;
  dealId: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
}

export interface DealParticipant {
  id: string;
  dealId: string;
  userId: string;
  role: 'buyer' | 'seller' | 'agent' | 'coordinator' | 'lender' | 'attorney';
  createdAt: Date;
}

export interface Document {
  id: string;
  propertyId?: string;
  dealId?: string;
  uploaderId: string;
  documentType: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  s3Key: string;
  s3Bucket: string;
  checksum?: string;
  isPublic: boolean;
  expiresAt?: Date;
  createdAt: Date;
}

export interface Job {
  id: string;
  jobType: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  inputData?: Record<string, any>;
  resultData?: Record<string, any>;
  errorMessage?: string;
  progress: number;
  attemptCount: number;
  maxAttempts: number;
  requestedBy?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface PropertySearchFilters {
  address?: string;
  city?: string;
  stateCode?: string;
  postalCode?: string;
  propertyType?: PropertyType[];
  bedrooms?: { min?: number; max?: number };
  bathrooms?: { min?: number; max?: number };
  buildingSqft?: { min?: number; max?: number };
  lotSqft?: { min?: number; max?: number };
  yearBuilt?: { min?: number; max?: number };
  priceRange?: { min?: number; max?: number };
  geography?: {
    bounds?: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
    radius?: number;
    center?: { lat: number; lng: number };
  };
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  requestId: string;
}

export interface ApiError {
  code: string;
  message: string;
  requestId: string;
  details?: Record<string, any>;
}
