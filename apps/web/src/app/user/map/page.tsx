'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Filter, List, Grid3x3, SlidersHorizontal, Layers } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { buyerProperties } from '../../../lib/buyer-data';

export default function MapPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'map-only' | 'list-only'>('split');

  return (
    <BuyerPageShell>
      <div className="h-[calc(100vh-200px)] min-h-[600px]">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl">Map search</h1>
            <p className="mt-1 text-[#66706A]">Explore properties on the map</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                viewMode === 'split' ? 'bg-[#173D2B] text-white' : 'bg-white border border-[#DDE2DD] text-[#66706A]'
              }`}
            >
              <Layers size={16} />
              Split
            </button>
            <button
              onClick={() => setViewMode('map-only')}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                viewMode === 'map-only' ? 'bg-[#173D2B] text-white' : 'bg-white border border-[#DDE2DD] text-[#66706A]'
              }`}
            >
              <MapPin size={16} />
              Map only
            </button>
            <button
              onClick={() => setViewMode('list-only')}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                viewMode === 'list-only' ? 'bg-[#173D2B] text-white' : 'bg-white border border-[#DDE2DD] text-[#66706A]'
              }`}
            >
              <List size={16} />
              List only
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4 rounded-lg border border-[#DDE2DD] bg-white p-3">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
              <input
                type="text"
                placeholder="Search by location, neighborhood, or address..."
                className="w-full rounded-md border border-[#DDE2DD] pl-10 pr-4 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-md border border-[#DDE2DD] bg-white px-4 py-2 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`grid gap-4 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : viewMode === 'map-only' ? 'grid-cols-1' : 'grid-cols-1'}`}>
          {/* Map Section */}
          {(viewMode === 'split' || viewMode === 'map-only') && (
            <div className={`rounded-lg border border-[#DDE2DD] bg-[#E7F0E5] ${viewMode === 'map-only' ? 'aspect-video' : 'h-[500px]'} flex items-center justify-center`}>
              <div className="text-center">
                <MapPin size={48} className="mx-auto text-[#9AA8A0]" />
                <p className="mt-2 text-sm text-[#66706A]">Interactive map</p>
                <p className="text-xs text-[#9AA8A0]">{buyerProperties.length} properties in this area</p>
              </div>
            </div>
          )}

          {/* Property List */}
          {(viewMode === 'split' || viewMode === 'list-only') && (
            <div className={`space-y-3 overflow-y-auto ${viewMode === 'list-only' ? 'aspect-video' : 'h-[500px]'}`}>
              {buyerProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/user/property/${property.slug}`}
                  className="flex gap-3 rounded-lg border border-[#DDE2DD] bg-white p-3 hover:border-[#173D2B] transition-colors"
                >
                  <div className="h-20 w-20 shrink-0 rounded-md bg-[#E7F0E5] overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.address}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-base font-semibold">
                      {property.price ? `$${property.price.toLocaleString()}` : property.monthlyRent ? `$${property.monthlyRent.toLocaleString()}/month` : `$${property.nightlyRate}/night`}
                    </p>
                    <p className="mt-1 text-sm text-[#66706A]">
                      {property.bedrooms} beds • {property.bathrooms} baths • {property.size.toLocaleString()} sq ft
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#172019] truncate">{property.address}</p>
                    <p className="mt-1 text-xs text-[#9AA8A0]">{property.city}, {property.state}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </BuyerPageShell>
  );
}
