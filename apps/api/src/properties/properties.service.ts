import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { PropertySearchFiltersDto } from './dtos/property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async searchProperties(
    filters: PropertySearchFiltersDto,
    page: number = 1,
    pageSize: number = 20,
  ) {
    const queryBuilder = this.propertyRepository.createQueryBuilder('property');

    // Apply filters
    if (filters.address) {
      queryBuilder.andWhere('property.canonicalAddress ILIKE :address', {
        address: `%${filters.address}%`,
      });
    }

    if (filters.city) {
      queryBuilder.andWhere('property.city ILIKE :city', {
        city: `%${filters.city}%`,
      });
    }

    if (filters.stateCode) {
      queryBuilder.andWhere('property.stateCode = :stateCode', {
        stateCode: filters.stateCode,
      });
    }

    if (filters.postalCode) {
      queryBuilder.andWhere('property.postalCode = :postalCode', {
        postalCode: filters.postalCode,
      });
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      queryBuilder.andWhere('property.propertyType IN (:...propertyTypes)', {
        propertyTypes: filters.propertyType,
      });
    }

    if (filters.bedrooms?.min !== undefined) {
      queryBuilder.andWhere('property.bedrooms >= :minBedrooms', {
        minBedrooms: filters.bedrooms.min,
      });
    }

    if (filters.bedrooms?.max !== undefined) {
      queryBuilder.andWhere('property.bedrooms <= :maxBedrooms', {
        maxBedrooms: filters.bedrooms.max,
      });
    }

    if (filters.bathrooms?.min !== undefined) {
      queryBuilder.andWhere('property.bathrooms >= :minBathrooms', {
        minBathrooms: filters.bathrooms.min,
      });
    }

    if (filters.bathrooms?.max !== undefined) {
      queryBuilder.andWhere('property.bathrooms <= :maxBathrooms', {
        maxBathrooms: filters.bathrooms.max,
      });
    }

    if (filters.buildingSqft?.min !== undefined) {
      queryBuilder.andWhere('property.buildingSqft >= :minBuildingSqft', {
        minBuildingSqft: filters.buildingSqft.min,
      });
    }

    if (filters.buildingSqft?.max !== undefined) {
      queryBuilder.andWhere('property.buildingSqft <= :maxBuildingSqft', {
        maxBuildingSqft: filters.buildingSqft.max,
      });
    }

    if (filters.yearBuilt?.min !== undefined) {
      queryBuilder.andWhere('property.yearBuilt >= :minYearBuilt', {
        minYearBuilt: filters.yearBuilt.min,
      });
    }

    if (filters.yearBuilt?.max !== undefined) {
      queryBuilder.andWhere('property.yearBuilt <= :maxYearBuilt', {
        maxYearBuilt: filters.yearBuilt.max,
      });
    }

    // Get total count
    const total = await queryBuilder.getCount();

    // Apply pagination
    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    // Execute query
    const properties = await queryBuilder.getMany();

    return {
      properties,
      pagination: {
        page,
        pageSize,
        total,
        hasMore: page * pageSize < total,
      },
    };
  }

  async getProperty(id: string) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  async createPropertyAnalysis(propertyId: string, assumptions?: Record<string, any>) {
    // This will be implemented when we add the job queue and analysis services
    const property = await this.getProperty(propertyId);
    
    return {
      id: `analysis_${Date.now()}`,
      propertyId,
      status: 'pending',
      jobId: `job_${Date.now()}`,
      assumptions,
      createdAt: new Date().toISOString(),
    };
  }
}
