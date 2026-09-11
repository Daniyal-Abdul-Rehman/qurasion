import Link from 'next/link';
import { ArrowRight, Star, Search, Filter, MessageSquare, Calendar, Users, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import HostPageShell from '../../../components/organisms/HostPageShell';
import { hostReviews, hostProperties } from '../../../lib/host-data';

export default function HostReviewsPage() {
  const avgRating = hostReviews.reduce((sum, r) => sum + r.rating, 0) / hostReviews.length;

  return (
    <HostPageShell
      eyebrow="Host workspace"
      title="Reviews"
      description="Manage guest feedback and respond to reviews."
      action={null}
    >
      {/* Reviews Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Reviews</p>
          <p className="mt-2 font-display text-2xl">{hostReviews.length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Average Rating</p>
          <div className="flex items-center gap-2 mt-2">
            <p className="font-display text-2xl">{avgRating.toFixed(1)}</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={star <= Math.round(avgRating) ? 'text-[#B7D83D]' : 'text-[#DDE2DD]'}
                  fill={star <= Math.round(avgRating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">5-Star Reviews</p>
          <p className="mt-2 font-display text-2xl">{hostReviews.filter((r) => r.rating === 5).length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Response Rate</p>
          <p className="mt-2 font-display text-2xl">100%</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search reviews by guest or property..."
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
        <button className="rounded-full bg-[#E8F5D3] px-3 py-1.5 text-xs font-semibold text-[#31551C]">All Ratings</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">5 Stars</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">4 Stars</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">3 Stars</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">With Response</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Needs Response</button>
      </section>

      {/* Reviews List */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Reviews</p>
            <h2 className="mt-2 font-display text-2xl">Recent reviews</h2>
          </div>
          <p className="text-sm text-[#66706A]">{hostReviews.length} reviews</p>
        </div>
        <div className="space-y-4">
          {hostReviews.map((review) => (
            <div key={review.id} className="rounded-lg border border-[#DDE2DD] bg-white p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0E5]">
                    <Users size={20} className="text-[#173D2B]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{review.guest}</p>
                    <p className="text-xs text-[#66706A]">{review.property}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= review.rating ? 'text-[#B7D83D]' : 'text-[#DDE2DD]'}
                        fill={star <= review.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[#9AA8A0]">{review.date}</p>
                </div>
              </div>
              <p className="text-sm text-[#66706A] mb-4">{review.comment}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[#E8EBE8]">
                <button className="text-sm text-[#173D2B] hover:underline flex items-center gap-1">
                  <MessageSquare size={14} />
                  Respond
                </button>
                <Link href={`/host/bookings`} className="text-sm text-[#66706A] hover:text-[#173D2B]">
                  View booking
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Review Performance */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <Star size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Superhost eligible</p>
            <p className="font-display text-lg">Yes</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <TrendingUp size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Rating trend</p>
            <p className="font-display text-lg">+0.2</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <CheckCircle size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Response time</p>
            <p className="font-display text-lg">2 days</p>
          </div>
        </div>
      </section>

      {/* Property Ratings */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Performance</p>
            <h2 className="mt-2 font-display text-2xl">Property ratings</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hostProperties.filter((p) => p.rating > 0).map((property) => (
            <div key={property.id} className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                <Star size={20} className="text-[#31551C]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{property.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= Math.round(property.rating) ? 'text-[#B7D83D]' : 'text-[#DDE2DD]'}
                      fill={star <= Math.round(property.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="text-sm font-semibold ml-1">{property.rating}</span>
                </div>
                <p className="text-xs text-[#66706A]">{property.reviews} reviews</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </HostPageShell>
  );
}
