// Domain Types for Real Estate Platform

export interface Property {
  id: string;
  canonicalAddress: string;
  city: string;
  stateCode: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  buildingSqft: number;
  lotSqft: number;
  yearBuilt: number;
  estimatedValue?: number;
  investmentScore?: number;
  createdAt: string;
  updatedAt: string;
}

export type PropertyType = 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'land' | 'commercial';

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

export interface PropertySearchResult {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface PropertyAnalysis {
  id: string;
  propertyId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  estimatedValue: number;
  confidence: number;
  modelName: string;
  modelVersion: string;
  comparableCount: number;
  comparableCriteria: {
    radiusMiles: number;
    propertyType: PropertyType;
    saleRecencyDays: number;
  };
  calculatedAt: string;
  jobId?: string;
}

export interface InvestorProfile {
  id: string;
  displayName: string;
  geographicPreferences: {
    states: string[];
    cities: string[];
    zipCodes: string[];
  };
  capitalRange: {
    min: number;
    max: number;
  };
  strategy: InvestmentStrategy;
  targetReturn: number;
  riskTolerance: 'low' | 'medium' | 'high';
  renovationAppetite: 'none' | 'light' | 'moderate' | 'heavy';
  propertyTypes: PropertyType[];
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export type InvestmentStrategy = 'fix_and_flip' | 'buy_and_hold' | 'rental' | 'wholesale' | 'development';

export interface PropertyMatch {
  investorId: string;
  propertyId: string;
  score: number;
  reasons: string[];
  ruleVersion: string;
  createdAt: string;
}

export interface Offer {
  id: string;
  propertyId: string;
  investorId: string;
  status: OfferStatus;
  offeredPrice: number;
  terms: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export type OfferStatus = 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'countered' | 'expired';

export interface Deal {
  id: string;
  propertyId: string;
  offerId: string;
  status: DealStatus;
  milestones: DealMilestone[];
  participants: DealParticipant[];
  createdAt: string;
  updatedAt: string;
}

export type DealStatus = 'initiated' | 'due_diligence' | 'contracted' | 'financing' | 'closing' | 'closed' | 'cancelled';

export interface DealMilestone {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  dueDate?: string;
  completedAt?: string;
}

export interface DealParticipant {
  userId: string;
  role: 'buyer' | 'seller' | 'agent' | 'coordinator' | 'lender' | 'attorney';
}

export interface ApiError {
  code: string;
  message: string;
  requestId: string;
  details?: Record<string, any>;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  requestId: string;
}
