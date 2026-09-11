import Link from 'next/link';
import { ArrowRight, Plus, FileText, Eye, Heart, MessageSquare, HandCoins, Search, Filter, TrendingUp, Calendar, Building2, Star, Users } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import HostPageShell from '../../../components/organisms/HostPageShell';
import { hostListings } from '../../../lib/host-data';

const listingStatuses = [
  { name: 'All', count: hostListings.length },
  { name: 'Active', count: hostListings.filter((l) => l.status === 'Active').length },
  { name: 'Draft', count: hostListings.filter((l) => l.status === 'Draft').length },
  { name: 'Under Offer', count: hostListings.filter((l) => l.status === 'Under Offer').length },
];

export default function HostListingsPage() {
  return (
    <HostPageShell
      eyebrow="Host workspace"
      title="Listings"
      description="Create, manage, and analyze your rental listings."
      action={
        <Link href="/host/listings/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Create Listing
        </Link>
      }
    >
      {/* Listing Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {listingStatuses.map((status) => (
          <div key={status.name} className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">{status.name}</p>
              <p className="mt-2 font-display text-2xl">{status.count}</p>
            </div>
            <div className={`h-2 w-2 rounded-full ${status.name === 'Active' ? 'bg-[#B7D83D]' : status.name === 'Draft' ? 'bg-[#9AA8A0]' : 'bg-[#E8EBE8]'}`} />
          </div>
        ))}
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search listings by property or address..."
            className="w-full rounded-lg border border-[#DDE2DD] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#173D2B] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
          <Filter size={16} />
          Filters
        </button>
      </section>

      {/* Listings Table */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Listing management</p>
            <h2 className="mt-2 font-display text-2xl">Your listings</h2>
          </div>
          <p className="text-sm text-[#66706A]">{hostListings.length} listings</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Property</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Nightly Rate</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Views</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Saves</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Bookings</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Reviews</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Published</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hostListings.map((listing) => (
                <tr key={listing.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4">
                    <Link href={`/host/listings/${listing.id}`} className="font-semibold text-sm">
                      {listing.property}
                    </Link>
                  </td>
                  <td className="py-3 px-4 font-display text-sm font-semibold">${listing.nightlyRate}/night</td>
                  <td className="py-3 px-4">
                    <StatusBadge 
                      tone={listing.status === 'Active' ? 'positive' : 'neutral'}
                    >
                      {listing.status}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-[#66706A]">
                      <Eye size={14} />
                      <span>{listing.views}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-[#66706A]">
                      <Heart size={14} />
                      <span>{listing.saves}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-[#66706A]">
                      <Users size={14} />
                      <span>{listing.bookings}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-[#66706A]">
                      <Star size={14} />
                      <span>{listing.reviews}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{listing.published}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/host/listings/${listing.id}`} className="text-sm text-[#173D2B] hover:underline">
                        View
                      </Link>
                      <Link href={`/host/listings/${listing.id}/edit`} className="text-sm text-[#66706A] hover:text-[#173D2B]">
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Listing Performance Insights */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <TrendingUp size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Avg. views per listing</p>
            <p className="font-display text-lg">3,623</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <Heart size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Avg. saves per listing</p>
            <p className="font-display text-lg">139</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <Users size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Avg. bookings per listing</p>
            <p className="font-display text-lg">57</p>
          </div>
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
            <TrendingUp size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="font-semibold">View analytics</p>
            <p className="text-sm text-[#66706A]">Listing performance data</p>
          </div>
        </Link>
      </section>
    </HostPageShell>
  );
}
