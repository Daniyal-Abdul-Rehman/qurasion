import Link from 'next/link';
import { ArrowRight, Bell, CheckCircle2, Eye, FileText, HandCoins, Plus, Users, Target, AlertTriangle, Home, Building2, Star, Calendar, DollarSign } from 'lucide-react';
import MetricCard from '../../../components/molecules/MetricCard';
import { StatusBadge } from '../../../components/atoms';
import HostPageShell from '../../../components/organisms/HostPageShell';
import { hostProperties, hostBookings, hostReviews, hostAnalytics } from '../../../lib/host-data';

export default function HostDashboardPage() {
  return (
    <HostPageShell
      eyebrow="Host workspace"
      title="Good morning, Sarah."
      description="Here's what's happening with your listings today."
      action={
        <div className="flex gap-3">
          <Link href="/host/listings/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Plus size={16} /> Create Listing
          </Link>
        </div>
      }
    >
      {/* Primary KPIs */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-5 lg:p-6">
        <MetricCard label="Total Listings" value={hostAnalytics.overview.totalProperties.toString()} detail={`${hostAnalytics.overview.activeListings} active`} icon={Home} />
        <MetricCard label="Upcoming Bookings" value={hostAnalytics.overview.upcomingBookings.toString()} detail="Next 30 days" icon={Calendar} accent="sand" />
        <MetricCard label="Avg. Rating" value={hostAnalytics.overview.avgRating.toString()} detail={`${hostAnalytics.overview.totalReviews} reviews`} icon={Star} accent="blue" />
        <MetricCard label="Occupancy Rate" value={hostAnalytics.overview.occupancyRate} detail="This month" icon={CheckCircle2} />
        <MetricCard label="Total Revenue" value={hostAnalytics.overview.totalRevenue} detail="Last 3 months" icon={DollarSign} />
      </section>

      {/* Additional Metrics */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Listing Views</p>
          <p className="mt-2 font-display text-2xl">14,697</p>
          <p className="mt-1 text-xs text-[#66706A]">+18% this week</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Booking Inquiries</p>
          <p className="mt-2 font-display text-2xl">110</p>
          <p className="mt-1 text-xs text-[#66706A]">+15% this week</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Avg. Nightly Rate</p>
          <p className="mt-2 font-display text-2xl">{hostAnalytics.overview.avgNightlyRate}</p>
          <p className="mt-1 text-xs text-[#66706A]">Across all listings</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Response Rate</p>
          <p className="mt-2 font-display text-2xl">98%</p>
          <p className="mt-1 text-xs text-[#66706A]">Within 1 hour</p>
        </div>
      </section>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        {/* Listing Performance */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Your listings</p>
              <h2 className="mt-2 font-display text-2xl">Listing performance</h2>
            </div>
            <Link href="/host/listings" className="text-sm font-semibold text-[#173D2B]">
              Manage all <ArrowRight className="ml-1 inline" size={15} />
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[#E8EBE8]">
            {hostProperties.slice(0, 3).map((property) => (
              <div key={property.id} className="flex items-center gap-3 py-4 first:pt-0">
                <div className="h-10 w-10 shrink-0 rounded-md bg-[#E7F0E5]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{property.name}</p>
                  <p className="mt-1 text-xs text-[#66706A]">{property.city}, {property.state}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg">${property.nightlyRate}/night</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="text-[#B7D83D]" />
                    <span className="text-xs font-semibold">{property.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Center */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Needs attention</p>
              <h2 className="mt-2 font-display text-2xl">Action center</h2>
            </div>
            <Link href="/host/tasks" className="text-sm font-semibold text-[#173D2B]">
              View all <ArrowRight className="ml-1 inline" size={15} />
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-3 rounded-md bg-[#FFF8E6] p-3">
              <AlertTriangle size={16} className="mt-0.5 text-[#B8860B]" />
              <div className="flex-1">
                <p className="text-sm font-semibold">3 booking inquiries</p>
                <p className="mt-1 text-xs text-[#66706A]">Awaiting your response</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md bg-[#E8F5D3] p-3">
              <Calendar size={16} className="mt-0.5 text-[#31551C]" />
              <div className="flex-1">
                <p className="text-sm font-semibold">2 check-ins tomorrow</p>
                <p className="mt-1 text-xs text-[#66706A]">Prepare for guest arrivals</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md bg-[#E7F0F4] p-3">
              <Star size={16} className="mt-0.5 text-[#315A6B]" />
              <div className="flex-1">
                <p className="text-sm font-semibold">1 new review received</p>
                <p className="mt-1 text-xs text-[#66706A]">5-star rating on Downtown Loft</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md bg-[#F3EBDD] p-3">
              <Target size={16} className="mt-0.5 text-[#745F35]" />
              <div className="flex-1">
                <p className="text-sm font-semibold">2 cleaning schedules due</p>
                <p className="mt-1 text-xs text-[#66706A]">Post-arrival cleanings needed</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Activity Feed */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Recent activity</p>
            <h2 className="mt-2 font-display text-2xl">Activity feed</h2>
          </div>
          <Link href="/host/notifications" className="text-sm font-semibold text-[#173D2B]">
            View all <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
              <Calendar size={15} className="text-[#31551C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">New booking confirmed</p>
              <p className="mt-1 text-xs text-[#66706A]">Downtown Loft • Michael Roberts</p>
              <p className="mt-1 text-xs font-semibold text-[#173D2B]">Sep 10-15, 2026</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">2 hours ago</p>
          </div>
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
              <Star size={15} className="text-[#315A6B]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">5-star review received</p>
              <p className="mt-1 text-xs text-[#66706A]">Downtown Loft • Emily Chen</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">4 hours ago</p>
          </div>
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
              <Eye size={15} className="text-[#745F35]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Listing viewed</p>
              <p className="mt-1 text-xs text-[#66706A]">Luxury Villa</p>
              <p className="mt-1 text-xs text-[#66706A]">245 views this week</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">Yesterday</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
              <DollarSign size={15} className="text-[#31551C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Payment received</p>
              <p className="mt-1 text-xs text-[#66706A]">Downtown Loft • $450</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">Yesterday</p>
          </div>
        </div>
      </section>
    </HostPageShell>
  );
}
