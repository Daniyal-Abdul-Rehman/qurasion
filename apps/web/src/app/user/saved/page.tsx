'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, FolderPlus, Plus, Grid3x3, List, Search, MoreVertical } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { savedProperties, buyerProperties } from '../../../lib/buyer-data';

export default function SavedPage() {
  const [filter, setFilter] = useState<'All' | 'Buy' | 'Rent' | 'Stay'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showNewCollection, setShowNewCollection] = useState(false);

  const collections = Array.from(new Set(savedProperties.map(s => s.collection)));
  
  const savedPropertyIds = savedProperties.map(s => s.propertyId);
  const savedPropertyData = buyerProperties.filter(p => savedPropertyIds.includes(p.id));

  const filteredProperties = filter === 'All' 
    ? savedPropertyData 
    : savedPropertyData.filter(p => {
        if (filter === 'Buy') return p.status === 'For Sale';
        if (filter === 'Rent') return p.status === 'For Rent';
        if (filter === 'Stay') return p.status === 'Short-term Stay';
        return true;
      });

  return (
    <BuyerPageShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl">Saved properties</h1>
            <p className="mt-1 text-[#66706A]">{savedProperties.length} properties saved</p>
          </div>
          <button className="flex items-center gap-2 rounded-md border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]">
            <FolderPlus size={18} />
            <span>New collection</span>
          </button>
        </div>

        {/* Collections */}
        <section>
          <h2 className="font-display text-lg mb-3">Collections</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('All')}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === 'All' ? 'bg-[#173D2B] text-white' : 'bg-white border border-[#DDE2DD] text-[#66706A] hover:bg-[#F0F2F0]'
              }`}
            >
              <Heart size={16} />
              All ({savedProperties.length})
            </button>
            {collections.map((collection) => (
              <button
                key={collection}
                onClick={() => setFilter('All')}
                className="flex shrink-0 items-center gap-2 rounded-full bg-white border border-[#DDE2DD] px-4 py-2 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
              >
                <Heart size={16} />
                {collection} ({savedProperties.filter(s => s.collection === collection).length})
              </button>
            ))}
            <button className="flex shrink-0 items-center gap-2 rounded-full border border-dashed border-[#DDE2DD] px-4 py-2 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]">
              <Plus size={16} />
              Create collection
            </button>
          </div>
        </section>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-[#DDE2DD]">
          {(['All', 'Buy', 'Rent', 'Stay'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                filter === option
                  ? 'border-b-2 border-[#173D2B] text-[#173D2B]'
                  : 'text-[#66706A] hover:text-[#172019]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
            <input
              type="text"
              placeholder="Search saved properties..."
              className="w-64 rounded-md border border-[#DDE2DD] pl-10 pr-4 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
            />
          </div>
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

        {/* Empty State */}
        {filteredProperties.length === 0 ? (
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-12 text-center">
            <Heart size={48} className="mx-auto text-[#DDE2DD]" />
            <h3 className="mt-4 font-display text-xl">No saved properties yet</h3>
            <p className="mt-2 text-[#66706A]">Start exploring and save properties you're interested in.</p>
            <Link
              href="/user/explore"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
            >
              Explore properties
            </Link>
          </div>
        ) : (
          <>
            {/* Property Grid */}
            {viewMode === 'grid' ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProperties.map((property) => {
                  const savedInfo = savedProperties.find(s => s.propertyId === property.id);
                  return (
                    <div
                      key={property.id}
                      className="group rounded-lg border border-[#DDE2DD] bg-white overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative aspect-[4/3] bg-[#E7F0E5]">
                        <Link href={`/user/property/${property.slug}`}>
                          <img
                            src={property.images[0]}
                            alt={property.address}
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
                          <Heart size={16} fill="currentColor" />
                        </button>
                        <button className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#66706A] hover:text-[#172019]">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="font-display text-lg font-semibold">
                          {property.price ? `$${property.price.toLocaleString()}` : property.monthlyRent ? `$${property.monthlyRent.toLocaleString()}/month` : `$${property.nightlyRate}/night`}
                        </p>
                        <p className="mt-1 text-sm text-[#66706A]">
                          {property.bedrooms} beds • {property.bathrooms} baths • {property.size.toLocaleString()} sq ft
                        </p>
                        <p className="mt-1 text-sm font-medium text-[#172019]">{property.address}</p>
                        <p className="mt-1 text-xs text-[#9AA8A0]">{property.city}, {property.state}</p>
                        {savedInfo && (
                          <p className="mt-2 text-xs text-[#66706A]">Saved in {savedInfo.collection}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProperties.map((property) => {
                  const savedInfo = savedProperties.find(s => s.propertyId === property.id);
                  return (
                    <div
                      key={property.id}
                      className="flex gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
                    >
                      <div className="h-32 w-32 shrink-0 rounded-md bg-[#E7F0E5] overflow-hidden">
                        <Link href={`/user/property/${property.slug}`}>
                          <img
                            src={property.images[0]}
                            alt={property.address}
                            className="h-full w-full object-cover"
                          />
                        </Link>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-display text-xl font-semibold">
                            {property.price ? `$${property.price.toLocaleString()}` : property.monthlyRent ? `$${property.monthlyRent.toLocaleString()}/month` : `$${property.nightlyRate}/night`}
                          </p>
                          <p className="mt-1 text-sm font-medium text-[#172019]">{property.address}</p>
                          <p className="mt-1 text-xs text-[#9AA8A0]">{property.city}, {property.state}</p>
                          <div className="mt-2 flex items-center gap-3 text-sm text-[#66706A]">
                            <span>{property.bedrooms} beds</span>
                            <span>•</span>
                            <span>{property.bathrooms} baths</span>
                            <span>•</span>
                            <span>{property.size.toLocaleString()} sq ft</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-[#E8F5D3] px-3 py-1 text-xs font-medium text-[#31551C]">
                              {savedInfo?.collection}
                            </span>
                            <span className="text-xs text-[#9AA8A0]">Saved {savedInfo?.savedAt}</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DDE2DD] text-[#66706A] hover:border-red-500 hover:text-red-500 transition-colors">
                              <Heart size={16} fill="currentColor" />
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DDE2DD] text-[#66706A] hover:text-[#172019] transition-colors">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </BuyerPageShell>
  );
}
