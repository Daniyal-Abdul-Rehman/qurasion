import Link from 'next/link';
import { ArrowRight, Scale, MessageSquare, CheckCircle2, Clock, AlertTriangle, DollarSign, Send, FileText, Users } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../../components/atoms';
import BrokerPageShell from '../../../../components/organisms/BrokerPageShell';

const negotiationHistory = [
  { action: 'Investor initial offer', price: '$485,000', from: 'Michael Roberts', timestamp: 'Sep 04, 2:30 PM' },
  { action: 'Broker counter offer', price: '$505,000', from: 'Broker', timestamp: 'Sep 04, 4:15 PM' },
  { action: 'Investor counter offer', price: '$495,000', from: 'Michael Roberts', timestamp: 'Sep 05, 10:00 AM' },
  { action: 'Broker counter offer', price: '$500,000', from: 'Broker', timestamp: 'Sep 05, 2:30 PM' },
];

export default function BrokerNegotiationDetailPage({ params }: { params: { id: string } }) {
  return (
    <BrokerPageShell
      eyebrow="Negotiation workspace"
      title="1824 Oak Street"
      description="Michael Roberts • In Progress"
      action={
        <div className="flex gap-3">
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm">
            <MessageSquare size={16} /> Send Message
          </PrimaryButton>
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm bg-white border border-[#DDE2DD] text-[#172019]">
            <Scale size={16} /> Compare Terms
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Negotiation Overview */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Negotiation Overview</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-md bg-[#E8F5D3] p-4">
                <p className="text-xs text-[#66706A]">Seller Position</p>
                <p className="mt-2 font-display text-2xl">$510K</p>
              </div>
              <div className="rounded-md bg-[#E7F0F4] p-4">
                <p className="text-xs text-[#66706A]">Investor Offer</p>
                <p className="mt-2 font-display text-2xl">$485K</p>
              </div>
              <div className="rounded-md bg-[#F3EBDD] p-4">
                <p className="text-xs text-[#66706A]">Current Counter</p>
                <p className="mt-2 font-display text-2xl">$500K</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <p className="text-xs text-[#9AA8A0]">Gap:</p>
              <p className="text-sm font-semibold">$10K from investor offer</p>
              <p className="text-xs text-[#66706A]">(2% difference)</p>
            </div>
          </section>

          {/* Negotiation History */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Negotiation History</h2>
            <div className="mt-4 space-y-4">
              {negotiationHistory.map((item, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-[#E8EBE8] last:border-0 last:pb-0">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.from === 'Broker' ? 'bg-[#173D2B]' : 'bg-[#E7F0E5]'}`}>
                    {item.from === 'Broker' ? (
                      <Scale size={18} className="text-white" />
                    ) : (
                      <Users size={18} className="text-[#31551C]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{item.action}</p>
                      <p className="text-xs text-[#9AA8A0]">{item.timestamp}</p>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <DollarSign size={14} className="text-[#66706A]" />
                      <span className="font-display text-lg">{item.price}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#66706A]">from {item.from}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Counter Offer Form */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Submit Counter Offer</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs text-[#9AA8A0]">Counter Price</label>
                <div className="mt-1 flex items-center gap-2">
                  <DollarSign size={16} className="text-[#66706A]" />
                  <input
                    type="text"
                    defaultValue="500,000"
                    className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm font-display text-lg"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-[#9AA8A0]">Inspection Period</label>
                  <select className="mt-1 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm">
                    <option>7 days</option>
                    <option>10 days</option>
                    <option>14 days</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#9AA8A0]">Closing Timeline</label>
                  <select className="mt-1 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm">
                    <option>21 days</option>
                    <option>30 days</option>
                    <option>45 days</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-[#9AA8A0]">Additional Terms</label>
                <textarea
                  className="mt-1 w-full rounded-md border border-[#DDE2DD] p-3 text-sm"
                  rows={3}
                  placeholder="Any additional terms or conditions..."
                />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="seller-approval" className="rounded" />
                <label htmlFor="seller-approval" className="text-xs text-[#66706A]">
                  Require seller approval before sending to investor
                </label>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#122E20]">
                  <Send size={14} className="mr-2" /> Submit Counter
                </button>
                <button className="flex-1 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                  Accept Current Offer
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Participants */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Participants</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#173D2B] text-xs font-semibold text-white">DR</div>
                <div>
                  <p className="text-sm font-semibold">Daniyal Rehman</p>
                  <p className="text-xs text-[#66706A]">Broker</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F0E5] text-xs font-semibold text-[#31551C]">JS</div>
                <div>
                  <Link href="/broker/sellers/seller-1" className="text-sm font-semibold text-[#173D2B]">John Smith</Link>
                  <p className="text-xs text-[#66706A]">Seller</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F0F4] text-xs font-semibold text-[#315A6B]">MR</div>
                <div>
                  <Link href="/broker/investors/investor-1" className="text-sm font-semibold text-[#173D2B]">Michael Roberts</Link>
                  <p className="text-xs text-[#66706A]">Investor</p>
                </div>
              </div>
            </div>
          </section>

          {/* Seller Approval Status */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Seller Approval</h3>
            <div className="mt-4">
              <div className="flex items-center gap-2 rounded-md bg-[#FFF8E6] p-3">
                <AlertTriangle size={16} className="text-[#B8860B]" />
                <span className="text-xs font-semibold">Approval Required</span>
              </div>
              <p className="mt-2 text-xs text-[#66706A]">Seller must approve counter offer before it can be sent to investor</p>
              <button className="mt-3 w-full rounded-md border border-[#DDE2DD] px-4 py-2 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                Request Seller Approval
              </button>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <MessageSquare size={14} /> Message Investor
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <FileText size={14} /> Message Seller
              </button>
              <Link href="/broker/offers/offer-1" className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Scale size={14} /> View Original Offer
              </Link>
            </div>
          </section>

          {/* Notes */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Notes</h3>
            <div className="mt-4">
              <textarea
                className="w-full rounded-md border border-[#DDE2DD] p-3 text-sm"
                rows={4}
                placeholder="Add notes about this negotiation..."
              />
              <button className="mt-2 w-full rounded-md bg-[#173D2B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#122E20]">
                Save Note
              </button>
            </div>
          </section>
        </div>
      </div>
    </BrokerPageShell>
  );
}