import Link from 'next/link';
import { ArrowRight, Mail, Phone, MessageSquare, Building2, FileText, HandCoins, Calendar, Users, Briefcase, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../../components/atoms';
import BrokerPageShell from '../../../../components/organisms/BrokerPageShell';
import { brokerSellers, brokerProperties } from '../../../../lib/broker-data';

export default function BrokerSellerDetailPage({ params }: { params: { id: string } }) {
  const seller = brokerSellers.find(s => s.id === params.id) || brokerSellers[0];
  const sellerProperties = brokerProperties.filter(p => p.seller === seller.name);

  return (
    <BrokerPageShell
      eyebrow="Seller profile"
      title={seller.name}
      description={`Property owner • ${seller.status}`}
      action={
        <div className="flex gap-3">
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm">
            <MessageSquare size={16} /> Send Message
          </PrimaryButton>
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm bg-white border border-[#DDE2DD] text-[#172019]">
            <Calendar size={16} /> Schedule Meeting
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Seller Information */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Seller Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Email</p>
                  <p className="text-sm">john.smith@email.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Phone</p>
                  <p className="text-sm">(469) 555-0145</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <p className="text-xs text-[#9AA8A0]">Status</p>
              <StatusBadge tone={seller.status === 'Active' ? 'positive' : 'neutral'}>{seller.status}</StatusBadge>
            </div>
          </section>

          {/* Properties */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Properties</h2>
              <Link href="/broker/properties/new" className="text-sm font-semibold text-[#173D2B]">
                Add property <ArrowRight className="ml-1 inline" size={14} />
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {sellerProperties.map((property) => (
                <div key={property.id} className="flex items-center gap-3 rounded-md border border-[#E8EBE8] p-3">
                  <div className="h-12 w-12 shrink-0 rounded-md bg-[#E7F0E5]" />
                  <div className="flex-1">
                    <Link href={`/broker/properties/${property.id}`} className="font-semibold text-[#173D2B]">
                      {property.address}
                    </Link>
                    <p className="mt-1 text-xs text-[#66706A]">{property.price}</p>
                  </div>
                  <StatusBadge tone={property.status === 'Active' ? 'positive' : property.status === 'Pending' ? 'warning' : 'neutral'}>
                    {property.status}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </section>

          {/* Listings */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Listings</h2>
              <Link href="/broker/listings/new" className="text-sm font-semibold text-[#173D2B]">
                Create listing <ArrowRight className="ml-1 inline" size={14} />
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {sellerProperties.filter(p => p.listingStatus !== 'Draft').map((property) => (
                <div key={property.id} className="flex items-center gap-3 rounded-md border border-[#E8EBE8] p-3">
                  <div className="flex-1">
                    <Link href={`/broker/listings/${property.id}`} className="font-semibold text-[#173D2B]">
                      {property.address}
                    </Link>
                    <p className="mt-1 text-xs text-[#66706A]">{property.listingStatus}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{property.views}</p>
                    <p className="text-xs text-[#9AA8A0]">views</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Deals */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Deals</h2>
              <Link href="/broker/deals" className="text-sm font-semibold text-[#173D2B]">
                View all <ArrowRight className="ml-1 inline" size={14} />
              </Link>
            </div>
            <div className="mt-4">
              {seller.deals > 0 ? (
                <div className="rounded-md bg-[#E8F5D3] p-4">
                  <p className="text-sm font-semibold">Active Deal</p>
                  <p className="mt-1 text-xs text-[#66706A]">1824 Oak Street • $500,000</p>
                  <p className="mt-1 text-xs text-[#31551C]">Closing October 4, 2026</p>
                </div>
              ) : (
                <p className="text-sm text-[#66706A]">No active deals</p>
              )}
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
                <MessageSquare size={14} /> Send Message
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Building2 size={14} /> Add Property
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <FileText size={14} /> Create Listing
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Calendar size={14} /> Schedule Meeting
              </button>
            </div>
          </section>

          {/* Tasks */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg">Tasks</h3>
              <Link href="/broker/tasks" className="text-xs font-semibold text-[#173D2B]">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-1" />
                <span>Send seller update on 1824 Oak</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-1" />
                <span>Discuss new property listing</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-1" checked />
                <span className="line-through text-[#9AA8A0]">Review offer terms</span>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Notes</h3>
            <div className="mt-4">
              <textarea
                className="w-full rounded-md border border-[#DDE2DD] p-3 text-sm"
                rows={4}
                placeholder="Add notes about this seller..."
              />
              <button className="mt-2 w-full rounded-md bg-[#173D2B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#122E20]">
                Save Note
              </button>
            </div>
          </section>

          {/* Activity Timeline */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Recent Activity</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                  <CheckCircle2 size={12} className="text-[#31551C]" />
                </div>
                <div>
                  <p className="font-semibold">Offer accepted</p>
                  <p className="text-[#66706A]">1824 Oak Street</p>
                  <p className="text-[#9AA8A0]">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
                  <MessageSquare size={12} className="text-[#315A6B]" />
                </div>
                <div>
                  <p className="font-semibold">Message sent</p>
                  <p className="text-[#66706A]">Market update</p>
                  <p className="text-[#9AA8A0]">5 days ago</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </BrokerPageShell>
  );
}