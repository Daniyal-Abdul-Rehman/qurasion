import Link from 'next/link';
import { ArrowRight, Plus, Building2, Eye, Users, HandCoins, Search, Filter, MapPin, DollarSign, Bed, Bath, Maximize, Star, Calendar } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import HostPageShell from '../../../components/organisms/HostPageShell';
import { hostProperties } from '../../../lib/host-data';

export default function HostPropertiesPage() {
  return (
    <HostPageShell
      eyebrow="Host workspace"
      title="Properties"
      description="Manage your rental properties and create new listings."
      action={
        <Link href="/host/listings/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Create Listing
        </Link>
      }
    >
      {/* Property Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Properties</p>
          <p className="mt-2 font-display text-2xl">{hostProperties.length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Active</p>
          <p className="mt-2 font-display text-2xl">{hostProperties.filter((p) => p.status === 'Active').length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Published Listings</p>
          <p className="mt-2 font-display text-2xl">{hostProperties.filter((p) => p.listingStatus === 'Published').length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Bookings</p>
          <p className="mt-2 font-display text-2xl">
            {hostProperties.reduce((sum, p) => sum + p.bookings, 0)}
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search properties by address, city, or status..."
            className="w-full rounded-lg border border-[#DDE2DD] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#173D2B] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
          <Filter size={16} />
          Filters
        </button>
      </section>

      {/* Filter Tags */}
      <section className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-full bg-[#E8F5D3] px-3 py-1.5 text-xs font-semibold text-[#31551C]">All Status</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Active</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Pending</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Off-market</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Published</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Draft</button>
      </section>

      {/* Properties Grid */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Property management</p>
            <h2 className="mt-2 font-display text-2xl">Your properties</h2>
          </div>
          <p className="text-sm text-[#66706A]">{hostProperties.length} properties</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hostProperties.map((property) => (
            <Link
              key={property.id}
              href={`/host/properties/${property.id}`}
              className="rounded-lg border border-[#DDE2DD] bg-white overflow-hidden hover:border-[#173D2B] transition-colors"
            >
              <div className="aspect-video bg-[#E7F0E5] relative">
                <img 
                  src={property.image} 
                  alt={property.address}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <StatusBadge 
                    tone={property.status === 'Active' ? 'positive' : property.status === 'Pending' ? 'warning' : 'neutral'}
                  >
                    {property.status}
                  </StatusBadge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{property.name}</p>
                    <p className="text-xs text-[#66706A] mt-1">{property.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-semibold">${property.nightlyRate}/night</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-[#B7D83D]" />
                      <span className="text-xs font-semibold">{property.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-xs text-[#66706A] mb-3">
                  <div className="flex items-center gap-1">
                    <Bed size={14} />
                    <span>{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath size={14} />
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{property.guests} guests</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#66706A] mb-3">
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{property.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{property.bookings} bookings</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} />
                    <span>{property.reviews} reviews</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-[#E8EBE8]">
                  <StatusBadge 
                    tone={property.listingStatus === 'Published' ? 'positive' : property.listingStatus === 'Draft' ? 'neutral' : 'warning'}
                  >
                    {property.listingStatus}
                  </StatusBadge>
                  <div className="flex items-center gap-1 text-xs text-[#66706A]">
                    <MapPin size={12} />
                    <span>View details</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <Link href="/host/listings/new" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <Plus size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="font-semibold">Create listing</p>
            <p className="text-sm text-[#66706A]">Publish a new property</p>
          </div>
        </Link>
        <Link href="/host/calendar" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <Calendar size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="font-semibold">Manage calendar</p>
            <p className="text-sm text-[#66706A]">Set availability</p>
          </div>
        </Link>
        <Link href="/host/analytics" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <DollarSign size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="font-semibold">View analytics</p>
            <p className="text-sm text-[#66706A]">Track performance</p>
          </div>
        </Link>
      </section>
    </HostPageShell>
  );
}
