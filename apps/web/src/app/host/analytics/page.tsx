import Link from 'next/link';
import { ArrowRight, PieChart, TrendingUp, DollarSign, Users, Target, HandCoins, Calendar, FileText, Activity, Building2, Eye, Star, Home } from 'lucide-react';
import HostPageShell from '../../../components/organisms/HostPageShell';
import { hostAnalytics } from '../../../lib/host-data';

export default function HostAnalyticsPage() {
  return (
    <HostPageShell
      eyebrow="Host workspace"
      title="Analytics"
      description="Track your hosting performance, metrics, and business insights."
      action={null}
    >
      {/* Period Selector */}
      <section className="flex items-center gap-2">
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">7 Days</button>
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">30 Days</button>
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">90 Days</button>
        <button className="rounded-lg bg-[#E8F5D3] px-4 py-2 text-sm font-semibold text-[#31551C]">This Year</button>
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">All Time</button>
      </section>

      {/* Revenue Overview */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Revenue performance</p>
            <h2 className="mt-2 font-display text-2xl">Revenue overview</h2>
          </div>
          <Link href="/host/earnings" className="text-sm font-semibold text-[#173D2B]">
            View earnings <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-[#E8F5D3] p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-[#31551C]" />
              <p className="text-xs text-[#9AA8A0]">Total Revenue</p>
            </div>
            <p className="font-display text-2xl text-[#31551C]">{hostAnalytics.overview.totalRevenue}</p>
            <p className="mt-1 text-xs text-[#31551C]">+15% vs last year</p>
          </div>
          <div className="rounded-lg bg-[#E7F0F4] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Home size={16} className="text-[#315A6B]" />
              <p className="text-xs text-[#9AA8A0]">Occupancy Rate</p>
            </div>
            <p className="font-display text-2xl text-[#315A6B]">{hostAnalytics.overview.occupancyRate}</p>
            <p className="mt-1 text-xs text-[#315A6B]">+5% vs last year</p>
          </div>
          <div className="rounded-lg bg-[#F3EBDD] p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-[#745F35]" />
              <p className="text-xs text-[#9AA8A0]">Avg. Nightly Rate</p>
            </div>
            <p className="font-display text-2xl text-[#745F35]">{hostAnalytics.overview.avgNightlyRate}</p>
            <p className="mt-1 text-xs text-[#745F35]">+8% vs last year</p>
          </div>
          <div className="rounded-lg bg-[#F7F8F6] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-[#66706A]" />
              <p className="text-xs text-[#9AA8A0]">Avg. Rating</p>
            </div>
            <p className="font-display text-2xl text-[#66706A]">{hostAnalytics.overview.avgRating}</p>
            <p className="mt-1 text-xs text-[#66706A]">Superhost status</p>
          </div>
        </div>
      </section>

      {/* Listings Performance */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Listing metrics</p>
            <h2 className="mt-2 font-display text-2xl">Listings performance</h2>
          </div>
          <Link href="/host/listings" className="text-sm font-semibold text-[#173D2B]">
            View listings <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Total Properties</p>
            <p className="font-display text-2xl">{hostAnalytics.overview.totalProperties}</p>
            <p className="mt-1 text-xs text-[#B7D83D]">+1 this quarter</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Active Listings</p>
            <p className="font-display text-2xl">{hostAnalytics.overview.activeListings}</p>
            <p className="mt-1 text-xs text-[#B7D83D]">2 published</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Upcoming Bookings</p>
            <p className="font-display text-2xl">{hostAnalytics.overview.upcomingBookings}</p>
            <p className="mt-1 text-xs text-[#B7D83D]">Next 30 days</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Total Views</p>
            <p className="font-display text-2xl">14.7K</p>
            <p className="mt-1 text-xs text-[#B7D83D]">+18% this quarter</p>
          </div>
        </div>
      </section>

      {/* Property Performance */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Property metrics</p>
            <h2 className="mt-2 font-display text-2xl">Property performance</h2>
          </div>
          <Link href="/host/listings" className="text-sm font-semibold text-[#173D2B]">
            View listings <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Property</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Views</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Bookings</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Revenue</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Rating</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Occupancy</th>
              </tr>
            </thead>
            <tbody>
              {hostAnalytics.propertyPerformance.map((property) => (
                <tr key={property.property} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4 font-semibold text-sm">{property.property}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-[#66706A]">
                      <Eye size={14} />
                      <span>{property.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{property.bookings}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-[#173D2B]">{property.revenue}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-[#B7D83D]" />
                      <span className="text-sm font-semibold">{property.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-[#B7D83D]">{property.occupancy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Booking Analytics */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Booking metrics</p>
            <h2 className="mt-2 font-display text-2xl">Booking performance</h2>
          </div>
          <Link href="/host/bookings" className="text-sm font-semibold text-[#173D2B]">
            View bookings <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Total Bookings</p>
            <p className="font-display text-2xl">239</p>
            <p className="mt-1 text-xs text-[#B7D83D]">+18% this quarter</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Confirmed</p>
            <p className="font-display text-2xl">172</p>
            <p className="mt-1 text-xs text-[#66706A]">72% confirmation rate</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Avg. Stay Length</p>
            <p className="font-display text-2xl">3.2 nights</p>
            <p className="mt-1 text-xs text-[#B7D83D]">+0.5 nights vs avg</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Avg. Response Time</p>
            <p className="font-display text-2xl">45 mins</p>
            <p className="mt-1 text-xs text-[#B7D83D]">Superhost response</p>
          </div>
        </div>
      </section>

      {/* Top Guests */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Guests</p>
            <h2 className="mt-2 font-display text-2xl">Top guests</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hostAnalytics.topGuests.map((guest) => (
            <div key={guest.name} className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                <Users size={20} className="text-[#31551C]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{guest.name}</p>
                <p className="text-xs text-[#66706A]">{guest.stays} stays • {guest.totalSpent} spent</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Trends */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Trends</p>
            <h2 className="mt-2 font-display text-2xl">Performance trends</h2>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Monthly Revenue</p>
              <div className="flex items-center gap-1 text-xs text-[#B7D83D]">
                <TrendingUp size={12} />
                <span>+15%</span>
              </div>
            </div>
            <div className="flex items-end gap-1 h-24">
              {hostAnalytics.monthlyRevenue.map((month, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#E8F5D3] rounded-t"
                  style={{ height: `${month.revenue === '$0' ? 5 : 30 + Math.random() * 60}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-[#9AA8A0]">
              <span>May</span>
              <span>Sep</span>
            </div>
          </div>
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Property Views</p>
              <div className="flex items-center gap-1 text-xs text-[#B7D83D]">
                <TrendingUp size={12} />
                <span>+22%</span>
              </div>
            </div>
            <div className="flex items-end gap-1 h-24">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#E7F0F4] rounded-t"
                  style={{ height: `${20 + Math.random() * 60}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-[#9AA8A0]">
              <span>May</span>
              <span>Sep</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Insights</p>
            <h2 className="mt-2 font-display text-2xl">Key insights</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-3 rounded-lg bg-[#E8F5D3] p-4">
            <Activity size={20} className="text-[#31551C] shrink-0" />
            <div>
              <p className="font-semibold text-sm">Strong booking performance</p>
              <p className="mt-1 text-xs text-[#66706A]">Your Downtown Loft has 82% occupancy, well above market average.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-[#E7F0F4] p-4">
            <Star size={20} className="text-[#315A6B] shrink-0" />
            <div>
              <p className="font-semibold text-sm">Excellent guest ratings</p>
              <p className="mt-1 text-xs text-[#66706A]">Your average rating of 4.8 qualifies you for Superhost status.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-[#F3EBDD] p-4">
            <DollarSign size={20} className="text-[#745F35] shrink-0" />
            <div>
              <p className="font-semibold text-sm">Revenue growth trend</p>
              <p className="mt-1 text-xs text-[#66706A]">On track for 15% revenue growth vs last year.</p>
            </div>
          </div>
        </div>
      </section>
    </HostPageShell>
  );
}
