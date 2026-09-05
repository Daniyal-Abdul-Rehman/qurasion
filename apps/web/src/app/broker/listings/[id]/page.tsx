import Link from 'next/link';
import { ArrowRight, Edit, Eye, Users, HandCoins, FileText, Target, Share2, MoreVertical, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../../components/atoms';
import BrokerPageShell from '../../../../components/organisms/BrokerPageShell';
import { brokerListings } from '../../../../lib/broker-data';

export default function BrokerListingDetailPage({ params }: { params: { id: string } }) {
  const listing = brokerListings.find(l => l.id === params.id) || brokerListings[0];

  return (
    <BrokerPageShell
      eyebrow="Listing workspace"
      title={listing.property}
      description={`${listing.status} • ${listing.price}`}
      action={
        <div className="flex gap-3">
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm">
            <Share2 size={16} /> Share
          </PrimaryButton>
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm bg-white border border-[#DDE2DD] text-[#172019]">
            <Edit size={16} /> Edit Listing
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Listing Overview */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Listing Overview</h2>
              <StatusBadge tone={listing.status === 'Active' ? 'positive' : listing.status === 'Under Offer' ? 'warning' : 'neutral'}>
                {listing.status}
              </StatusBadge>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <FileText size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Property</p>
                  <p className="text-sm font-semibold">{listing.property}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HandCoins size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Price</p>
                  <p className="text-sm font-display text-lg">{listing.price}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Published</p>
                  <p className="text-sm">{listing.published}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Listing Health</p>
                  <p className="text-sm font-semibold">84/100</p>
                </div>
              </div>
            </div>
          </section>

          {/* Listing Analytics */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Listing Analytics</h2>
              <Link href="/broker/analytics" className="text-sm font-semibold text-[#173D2B]">
                Full analytics <ArrowRight className="ml-1 inline" size={14} />
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md bg-[#E8F5D3] p-4">
                <p className="text-xs text-[#66706A]">Total Views</p>
                <p className="mt-2 font-display text-2xl">{listing.views}</p>
                <p className="mt-1 text-xs text-[#31551C]">+24% this week</p>
              </div>
              <div className="rounded-md bg-[#E7F0F4] p-4">
                <p className="text-xs text-[#66706A]">Unique Investors</p>
                <p className="mt-2 font-display text-2xl">2,931</p>
                <p className="mt-1 text-xs text-[#315A6B]">High engagement</p>
              </div>
              <div className="rounded-md bg-[#F3EBDD] p-4">
                <p className="text-xs text-[#66706A]">Saves</p>
                <p className="mt-2 font-display text-2xl">{listing.saves}</p>
                <p className="mt-1 text-xs text-[#745F35]">+18% this week</p>
              </div>
              <div className="rounded-md bg-[#E8F5D3] p-4">
                <p className="text-xs text-[#66706A]">Inquiries</p>
                <p className="mt-2 font-display text-2xl">{listing.inquiries}</p>
                <p className="mt-1 text-xs text-[#31551C]">+31% this week</p>
              </div>
            </div>
          </section>

          {/* Conversion Funnel */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Conversion Funnel</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-24 text-xs text-[#9AA8A0]">Views</div>
                <div className="flex-1 h-8 rounded-l-md bg-[#E8F5D3] flex items-center px-3">
                  <span className="text-sm font-semibold text-[#31551C]">{listing.views}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-xs text-[#9AA8A0]">Property Opens</div>
                <div className="flex-1 h-8 bg-[#E7F0F4] flex items-center px-3">
                  <span className="text-sm font-semibold text-[#315A6B]">3,842</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-xs text-[#9AA8A0]">Analysis</div>
                <div className="flex-1 h-8 bg-[#F3EBDD] flex items-center px-3">
                  <span className="text-sm font-semibold text-[#745F35]">1,245</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-xs text-[#9AA8A0]">Save</div>
                <div className="flex-1 h-8 bg-[#E8F5D3] flex items-center px-3">
                  <span className="text-sm font-semibold text-[#31551C]">{listing.saves}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-xs text-[#9AA8A0]">Inquiry</div>
                <div className="flex-1 h-8 bg-[#E7F0F4] flex items-center px-3">
                  <span className="text-sm font-semibold text-[#315A6B]">{listing.inquiries}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-xs text-[#9AA8A0]">Offer</div>
                <div className="flex-1 h-8 rounded-r-md bg-[#F3EBDD] flex items-center px-3">
                  <span className="text-sm font-semibold text-[#745F35]">{listing.offers}</span>
                </div>
              </div>
            </div>
          </section>

          {/* AI Listing Assistant */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">AI Listing Assistant</h2>
              <Sparkles size={20} className="text-[#B7D83D]" />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button className="flex items-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-3 text-sm text-left hover:bg-[#F7F8F6]">
                <Sparkles size={14} className="text-[#B7D83D]" />
                Improve Listing
              </button>
              <button className="flex items-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-3 text-sm text-left hover:bg-[#F7F8F6]">
                <Sparkles size={14} className="text-[#B7D83D]" />
                Generate Description
              </button>
              <button className="flex items-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-3 text-sm text-left hover:bg-[#F7F8F6]">
                <Sparkles size={14} className="text-[#B7D83D]" />
                Generate Investor Summary
              </button>
              <button className="flex items-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-3 text-sm text-left hover:bg-[#F7F8F6]">
                <Sparkles size={14} className="text-[#B7D83D]" />
                Suggest Highlights
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#122E20]">
                <Edit size={14} /> Edit Listing
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Share2 size={14} /> Share Listing
              </button>
              <Link href="/broker/investor-demand" className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Target size={14} /> View Demand
              </Link>
              <Link href="/broker/matches" className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Users size={14} /> View Matches
              </Link>
            </div>
          </section>

          {/* Listing Health */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Listing Health</h3>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">84/100</span>
                <span className="text-xs text-[#31551C]">Good</span>
              </div>
              <div className="h-2 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#B7D83D]" style={{ width: '84%' }} />
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-[#31551C]" />
                  <span>Complete property information</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-[#31551C]" />
                  <span>Strong investor demand</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-[#31551C]" />
                  <span>Good engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={12} className="text-[#B8860B]" />
                  <span>Price slightly above comparable range</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={12} className="text-[#B8860B]" />
                  <span>Low offer conversion</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Inquiries */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg">Recent Inquiries</h3>
              <Link href="/broker/investor-inquiries" className="text-xs font-semibold text-[#173D2B]">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                  <Users size={14} className="text-[#31551C]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Michael Roberts</p>
                  <p className="text-[#66706A]">"Can the seller consider $485K?"</p>
                  <p className="text-[#9AA8A0]">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
                  <Users size={14} className="text-[#315A6B]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Sarah Kim</p>
                  <p className="text-[#66706A]">"Can I schedule a viewing?"</p>
                  <p className="text-[#9AA8A0]">5 hours ago</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </BrokerPageShell>
  );
}