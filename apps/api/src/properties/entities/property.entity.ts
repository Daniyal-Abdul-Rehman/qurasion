import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum PropertyType {
  SINGLE_FAMILY = 'single_family',
  MULTI_FAMILY = 'multi_family',
  CONDO = 'condo',
  TOWNHOUSE = 'townhouse',
  LAND = 'land',
  COMMERCIAL = 'commercial',
}

@Entity('properties')
@Index(['city', 'stateCode'])
@Index(['propertyType'])
@Index(['bedrooms'])
@Index(['bathrooms'])
@Index(['buildingSqft'])
@Index(['yearBuilt'])
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  canonicalAddress: string;

  @Column({ type: 'text', nullable: true })
  city: string;

  @Column({ type: 'char', length: 2, nullable: true })
  stateCode: string;

  @Column({ type: 'text', nullable: true })
  postalCode: string;

  @Column({ type: 'numeric', precision: 9, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'numeric', precision: 9, scale: 6, nullable: true })
  longitude: number;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  location: any;

  @Column({ type: 'text', nullable: true })
  parcelId: string;

  @Column({
    type: 'enum',
    enum: PropertyType,
    nullable: true,
  })
  propertyType: PropertyType;

  @Column({ type: 'numeric', nullable: true })
  bedrooms: number;

  @Column({ type: 'numeric', nullable: true })
  bathrooms: number;

  @Column({ type: 'integer', nullable: true })
  buildingSqft: number;

  @Column({ type: 'integer', nullable: true })
  lotSqft: number;

  @Column({ type: 'integer', nullable: true })
  yearBuilt: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, nullable: true })
  estimatedValue: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  investmentScore: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
