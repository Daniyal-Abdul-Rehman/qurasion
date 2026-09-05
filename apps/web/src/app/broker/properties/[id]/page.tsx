import Link from 'next/link';
import { ArrowRight, Building2, Eye, Users, HandCoins, FileText, Target, TrendingUp, MapPin, Calendar, AlertTriangle, CheckCircle2, Plus, Edit } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../../components/atoms';
import BrokerPageShell from '../../../../components/organisms/BrokerPageShell';
import { brokerProperties } from '../../../../lib/broker-data';

export default function BrokerPropertyDetailPage({ params }: { params: { id: string } }) {
  const property = brokerProperties.find(p => p.id === params.id) || brokerProperties[0];

  return (
    <BrokerPageShell
      eyebrow="Property workspace"
      title={property.address}
      description={`${property.seller} • ${property.status}`}
      action={
        <div className="flex gap-3">
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm">
            <Plus size={16} /> Create Listing
          </PrimaryButton>
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm bg-white border border-[#DDE2DD] text-[#172019]">
            <Edit size={16} /> Edit Property
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Property Overview */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Property Overview</h2>
              <StatusBadge tone={property.status === 'Active' ? 'positive' : property.status === 'Pending' ? 'warning' : 'neutral'}>
                {property.status}
              </StatusBadge>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Address</p>
                  <p className="text-sm">{property.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Seller</p>
                  <Link href={`/broker/sellers/seller-1`} className="text-sm font-semibold text-[#173D2B]">
                    {property.seller}
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Listing Status</p>
                  <StatusBadge tone={property.listingStatus === 'Published' ? 'positive' : property.listingStatus === 'Under Offer' ? 'warning' : 'neutral'}>
                    {property.listingStatus}
                  </StatusBadge>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HandCoins size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Price</p>
                  <p className="text-sm font-display text-lg">{property.price}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Market Intelligence */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Market Intelligence</h2>
              <Link href="#" className="text-sm font-semibold text-[#173D2B]">
                Full analysis <ArrowRight className="ml-1 inline" size={14} />
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md bg-[#E8F5D3] p-4">
                <p className="text-xs text-[#66706A]">Estimated Market Value</p>
                <p className="mt-2 font-display text-2xl">$510,000</p>
                <p className="mt-1 text-xs text-[#31551C]">87% confidence</p>
              </div>
              <div className="rounded-md bg-[#E7F0F4] p-4">
                <p className="text-xs text-[#66706A]">Estimated Rent</p>
                <p className="mt-2 font-display text-2xl">$3,450/mo</p>
                <p className="mt-1 text-xs text-[#315A6B]">8.2% rental yield</p>
              </div>
              <div className="rounded-md bg-[#F3EBDD] p-4">
                <p className="text-xs text-[#66706A]">Comparable Sales</p>
                <p className="mt-2 font-display text-2xl">14</p>
                <p className="mt-1 text-xs text-[#745F35]">Within 0.5 miles</p>
              </div>
              <div className="rounded-md bg-[#E8F5D3] p-4">
                <p className="text-xs text-[#66706A]">Market Trend</p>
                <p className="mt-2 font-display text-2xl">+4.8%</p>
                <p className="mt-1 text-xs text-[#31551C]">Last 12 months</p>
              </div>
            </div>
          </section>

          {/* Investor Demand */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Investor Demand</h2>
              <Link href="/broker/investor-demand" className="text-sm font-semibold text-[#173D2B]">
                View details <ArrowRight className="ml-1 inline" size={14} />
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="rounded-full bg-[#E8F5D3] px-4 py-2">
                <span className="font-display text-2xl text-[#31551C]">HIGH</span>
              </div>
              <div>
                <p className="text-sm text-[#66706A]">127 investors potentially interested</p>
                <p className="text-xs text-[#9AA8A0]">32 highly matched • 18 recently active</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-[#9AA8A0]">Investment Strategy</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Fix & Flip</span>
                    <span className="font-semibold">42%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E8EBE8]">
                    <div className="h-1.5 rounded-full bg-[#B7D83D]" style={{ width: '42%' }} />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Buy & Hold</span>
                    <span className="font-semibold">31%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E8EBE8]">
                    <div className="h-1.5 rounded-full bg-[#B7D83D]" style={{ width: '31%' }} />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#9AA8A0]">Target Price</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>$400K-$500K</span>
                    <span className="font-semibold">36%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E8EBE8]">
                    <div className="h-1.5 rounded-full bg-[#B7D83D]" style={{ width: '36%' }} />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>$500K-$600K</span>
                    <span className="font-semibold">38%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E8EBE8]">
                    <div className="h-1.5 rounded-full bg-[#B7D83D]" style={{ width: '38%' }} />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#9AA8A0]">Preferred Returns</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>15%+</span>
                    <span className="font-semibold">46%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E8EBE8]">
                    <div className="h-1.5 rounded-full bg-[#B7D83D]" style={{ width: '46%' }} />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>20%+</span>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E8EBE8]">
                    <div className="h-1.5 rounded-full bg-[#B7D83D]" style={{ width: '28%' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Listing Performance */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Listing Performance</h2>
              <Link href={`/broker/listings/${property.id}`} className="text-sm font-semibold text-[#173D2B]">
                Manage listing <ArrowRight className="ml-1 inline" size={14} />
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5D3]">
                  <Eye size={18} className="text-[#31551C]" />
                </div>
                <div>
                  <p className="text-xs text-[#66706A]">Views</p>
                  <p className="font-display text-lg">{property.views}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F0F4]">
                  <Users size={18} className="text-[#315A6B]" />
                </div>
                <div>
                  <p className="text-xs text-[#66706A]">Investors</p>
                  <p className="font-display text-lg">{property.investors}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EBDD]">
                  <HandCoins size={18} className="text-[#745F35]" />
                </div>
                <div>
                  <p className="text-xs text-[#66706A]">Offers</p>
                  <p className="font-display text-lg">{property.offers}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5D3]">
                  <TrendingUp size={18} className="text-[#31551C]" />
                </div>
                <div>
                  <p className="text-xs text-[#66706A]">Engagement</p>
                  <p className="font-display text-lg">High</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <Link href={`/broker/listings/${property.id}`} className="flex w-full items-center justify-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#122E20]">
                <FileText size={14} /> Create Listing
              </Link>
              <Link href="/broker/matches" className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Target size={14} /> View Matches
              </Link>
              <Link href="/broker/offers" className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <HandCoins size={14} /> View Offers
              </Link>
              <Link href={`/broker/sellers/seller-1`} className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Building2 size={14} /> Contact Seller
              </Link>
            </div>
          </section>

          {/* Matched Investors */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg">Top Matches</h3>
              <Link href="/broker/matches" className="text-xs font-semibold text-[#173D2B]">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-md border border-[#E8EBE8] p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                  <Users size={14} className="text-[#31551C]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Michael Roberts</p>
                  <p className="text-xs text-[#66706A]">96% match</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-[#E8EBE8] p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F0F4]">
                  <Users size={14} className="text-[#315A6B]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Sarah Kim</p>
                  <p className="text-xs text-[#66706A]">93% match</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-[#E8EBE8] p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3EBDD]">
                  <Users size={14} className="text-[#745F35]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">David Martinez</p>
                  <p className="text-xs text-[#66706A]">89% match</p>
                </div>
              </div>
            </div>
          </section>

          {/* Activity Timeline */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Recent Activity</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                  <Eye size={12} className="text-[#31551C]" />
                </div>
                <div>
                  <p className="font-semibold">Property viewed</p>
                  <p className="text-[#66706A]">12 views today</p>
                  <p className="text-[#9AA8A0]">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
                  <HandCoins size={12} className="text-[#315A6B]" />
                </div>
                <div>
                  <p className="font-semibold">New offer received</p>
                  <p className="text-[#66706A]">$485,000 from Michael R.</p>
                  <p className="text-[#9AA8A0]">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
                  <Users size={12} className="text-[#745F35]" />
                </div>
                <div>
                  <p className="font-semibold">New investor matched</p>
                  <p className="text-[#66706A]">Sarah Kim - 93% match</p>
                  <p className="text-[#9AA8A0]">1 day ago</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </BrokerPageShell>
  );
}