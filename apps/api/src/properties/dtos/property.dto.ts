import { IsOptional, IsString, IsEnum, IsNumber, Min, Max, IsObject } from 'class-validator';
import { PropertyType } from '../entities/property.entity';

export class PropertySearchFiltersDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  stateCode?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsEnum(PropertyType, { each: true })
  propertyType?: PropertyType[];

  @IsOptional()
  @IsObject()
  bedrooms?: { min?: number; max?: number };

  @IsOptional()
  @IsObject()
  bathrooms?: { min?: number; max?: number };

  @IsOptional()
  @IsObject()
  buildingSqft?: { min?: number; max?: number };

  @IsOptional()
  @IsObject()
  lotSqft?: { min?: number; max?: number };

  @IsOptional()
  @IsObject()
  yearBuilt?: { min?: number; max?: number };

  @IsOptional()
  @IsObject()
  priceRange?: { min?: number; max?: number };

  @IsOptional()
  @IsObject()
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

export class CreatePropertyAnalysisDto {
  @IsOptional()
  @IsObject()
  assumptions?: Record<string, any>;
}
