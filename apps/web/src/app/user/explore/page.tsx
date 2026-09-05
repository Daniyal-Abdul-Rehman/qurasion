'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, MapPin, DollarSign, Home, Users, Bath, Maximize2, Grid3x3, List, Heart } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { buyerProperties } from '../../../lib/buyer-data';

export default function ExplorePage() {
  const [intent, setIntent] = useState<'Buy' | 'Rent' | 'Stay'>('Buy');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = buyerProperties.filter(p => {
    if (intent === 'Buy') return p.status === 'For Sale';
    if (intent === 'Rent') return p.status === 'For Rent';
    if (intent === 'Stay') return p.status === 'Short-term Stay';
    return true;
  });

  return (
    <BuyerPageShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl">Explore properties</h1>
            <p className="mt-1 text-[#66706A]">Find your perfect place</p>
          </div>
          <div className="flex gap-2">
            {(['Buy', 'Rent', 'Stay'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setIntent(option)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  intent === option
                    ? 'bg-[#173D2B] text-white'
                    : 'bg-white border border-[#DDE2DD] text-[#66706A] hover:bg-[#F0F2F0]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
              <input
                type="text"
                placeholder="Search by location, neighborhood, or address..."
                className="w-full rounded-md border border-[#DDE2DD] pl-10 pr-4 py-2.5 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-md border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 grid gap-4 border-t border-[#DDE2DD] pt-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Property Type</label>
                <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                  <option>All types</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                </select>
              </div>

              {intent === 'Buy' && (
                <>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Price Range</label>
                    <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                      <option>Any price</option>
                      <option>$100k - $300k</option>
                      <option>$300k - $500k</option>
                      <option>$500k - $750k</option>
                      <option>$750k+</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Bedrooms</label>
                    <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                      <option>Any</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                      <option>4+</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Bathrooms</label>
                    <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                      <option>Any</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                    </select>
                  </div>
                </>
              )}

              {intent === 'Rent' && (
                <>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Monthly Rent</label>
                    <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                      <option>Any price</option>
                      <option>$1k - $2k</option>
                      <option>$2k - $3k</option>
                      <option>$3k - $5k</option>
                      <option>$5k+</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Bedrooms</label>
                    <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                      <option>Any</option>
                      <option>Studio</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Furnished</label>
                    <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                      <option>Any</option>
                      <option>Furnished</option>
                      <option>Unfurnished</option>
                    </select>
                  </div>
                </>
              )}

              {intent === 'Stay' && (
                <>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Price per night</label>
                    <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                      <option>Any price</option>
                      <option>$50 - $100</option>
                      <option>$100 - $200</option>
                      <option>$200 - $300</option>
                      <option>$300+</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Bedrooms</label>
                    <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                      <option>Any</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3+</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Rating</label>
                    <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                      <option>Any</option>
                      <option>4.5+</option>
                      <option>4.0+</option>
                      <option>3.5+</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#66706A]">{filteredProperties.length} properties found</p>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-[#173D2B] text-white' : 'bg-white border border-[#DDE2DD] text-[#66706A]'}`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-[#173D2B] text-white' : 'bg-white border border-[#DDE2DD] text-[#66706A]'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Property Grid */}
        {viewMode === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/user/property/${property.slug}`}
                className="group rounded-lg border border-[#DDE2DD] bg-white overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] bg-[#E7F0E5]">
                  <img
                    src={property.images[0]}
                    alt={property.address}
                    className="h-full w-full object-cover"
                  />
                  <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#66706A] hover:text-red-500 transition-colors">
                    <Heart size={16} />
                  </button>
                  {property.rating && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium">
                      <span>★</span>
                      <span>{property.rating}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-display text-lg font-semibold">
                    {property.price ? `$${property.price.toLocaleString()}` : property.monthlyRent ? `$${property.monthlyRent.toLocaleString()}/month` : `$${property.nightlyRate}/night`}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-sm text-[#66706A]">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {property.bedrooms} beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={14} />
                      {property.bathrooms} baths
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize2 size={14} />
                      {property.size.toLocaleString()} sq ft
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-[#172019]">{property.address}</p>
                  <p className="mt-1 text-xs text-[#9AA8A0]">{property.city}, {property.state}</p>
                  {property.estimatedValue && (
                    <div className="mt-3 rounded-md bg-[#E8F5D3] px-3 py-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#31551C]">Estimated value</p>
                      <p className="text-sm font-medium text-[#31551C]">
                        ${property.estimatedValue.min.toLocaleString()}–${property.estimatedValue.max.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/user/property/${property.slug}`}
                className="flex gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
              >
                <div className="h-32 w-32 shrink-0 rounded-md bg-[#E7F0E5] overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.address}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="font-display text-xl font-semibold">
                      {property.price ? `$${property.price.toLocaleString()}` : property.monthlyRent ? `$${property.monthlyRent.toLocaleString()}/month` : `$${property.nightlyRate}/night`}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#172019]">{property.address}</p>
                    <p className="mt-1 text-xs text-[#9AA8A0]">{property.city}, {property.state}</p>
                    <div className="mt-2 flex items-center gap-3 text-sm text-[#66706A]">
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {property.bedrooms} beds
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath size={14} />
                        {property.bathrooms} baths
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize2 size={14} />
                        {property.size.toLocaleString()} sq ft
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      {property.features.slice(0, 3).map((feature) => (
                        <span key={feature} className="rounded-full bg-[#F0F2F0] px-2 py-1 text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DDE2DD] text-[#66706A] hover:border-red-500 hover:text-red-500 transition-colors">
                      <Heart size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </BuyerPageShell>
  );
}
