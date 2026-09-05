import Link from 'next/link';
import { ArrowRight, HandCoins, Scale, FileText, CheckCircle2, XCircle, Clock, Calendar, DollarSign, AlertTriangle, MessageSquare, Send } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../../components/atoms';
import BrokerPageShell from '../../../../components/organisms/BrokerPageShell';
import { brokerOffers } from '../../../../lib/broker-data';

export default function BrokerOfferDetailPage({ params }: { params: { id: string } }) {
  const offer = brokerOffers.find(o => o.id === params.id) || brokerOffers[0];

  return (
    <BrokerPageShell
      eyebrow="Offer details"
      title={`Offer #${offer.id.slice(-5)}`}
      description={`${offer.property} • ${offer.status}`}
      action={
        <div className="flex gap-3">
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm">
            <Scale size={16} /> Compare Offers
          </PrimaryButton>
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm bg-white border border-[#DDE2DD] text-[#172019]">
            <MessageSquare size={16} /> Contact Investor
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Offer Details */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Offer Details</h2>
              <StatusBadge tone={offer.status === 'Accepted' ? 'positive' : offer.status === 'Countered' ? 'warning' : 'neutral'}>
                {offer.status}
              </StatusBadge>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <FileText size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Property</p>
                  <Link href={`/broker/properties/${offer.property}`} className="text-sm font-semibold text-[#173D2B]">
                    {offer.property}
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Offer Price</p>
                  <p className="text-sm font-display text-lg">{offer.price}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Submitted</p>
                  <p className="text-sm">{offer.submitted}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Earnest Money</p>
                  <p className="text-sm font-semibold">{offer.earnestMoney}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Terms and Conditions */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Terms and Conditions</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md bg-[#E8F5D3] p-4">
                <p className="text-xs text-[#66706A]">Financing</p>
                <p className="mt-2 text-sm font-semibold">{offer.financing}</p>
              </div>
              <div className="rounded-md bg-[#E7F0F4] p-4">
                <p className="text-xs text-[#66706A]">Inspection Period</p>
                <p className="mt-2 text-sm font-semibold">{offer.inspection}</p>
              </div>
              <div className="rounded-md bg-[#F3EBDD] p-4">
                <p className="text-xs text-[#66706A]">Closing Timeline</p>
                <p className="mt-2 text-sm font-semibold">{offer.closing}</p>
              </div>
              <div className="rounded-md bg-[#E8F5D3] p-4">
                <p className="text-xs text-[#66706A]">Contingencies</p>
                <p className="mt-2 text-sm font-semibold">Standard</p>
              </div>
            </div>
          </section>

          {/* Offer Comparison */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Offer Comparison</h2>
              <Link href="/broker/offers" className="text-sm font-semibold text-[#173D2B]">
                View all offers <ArrowRight className="ml-1 inline" size={14} />
              </Link>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-[#F7F8F6] text-[10px] uppercase tracking-[0.12em] text-[#9AA8A0]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Term</th>
                    <th className="px-4 py-3 font-semibold">This Offer</th>
                    <th className="px-4 py-3 font-semibold">Competing Offer</th>
                    <th className="px-4 py-3 font-semibold">Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EBE8]">
                  <tr>
                    <td className="px-4 py-3 text-[#66706A]">Price</td>
                    <td className="px-4 py-3 font-display text-lg">{offer.price}</td>
                    <td className="px-4 py-3 font-display text-lg">$495,000</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs text-[#B8860B]">
                        <AlertTriangle size={12} /> $10K below
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#66706A]">Financing</td>
                    <td className="px-4 py-3">{offer.financing}</td>
                    <td className="px-4 py-3">Loan</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs text-[#31551C]">
                        <CheckCircle2 size={12} /> Stronger
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#66706A]">Inspection</td>
                    <td className="px-4 py-3">{offer.inspection}</td>
                    <td className="px-4 py-3">15 days</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs text-[#31551C]">
                        <CheckCircle2 size={12} /> Faster
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#66706A]">Closing</td>
                    <td className="px-4 py-3">{offer.closing}</td>
                    <td className="px-4 py-3">45 days</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs text-[#31551C]">
                        <CheckCircle2 size={12} /> Faster
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#66706A]">Earnest Money</td>
                    <td className="px-4 py-3">{offer.earnestMoney}</td>
                    <td className="px-4 py-3">$8,000</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs text-[#31551C]">
                        <CheckCircle2 size={12} /> Higher
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Actions</h3>
            <div className="mt-4 space-y-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#122E20]">
                <CheckCircle2 size={14} /> Accept Offer
              </button>
              <Link href={`/broker/offers/${offer.id}/counter`} className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Scale size={14} /> Counter Offer
              </Link>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <XCircle size={14} /> Reject Offer
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <MessageSquare size={14} /> Request Info
              </button>
            </div>
          </section>

          {/* Investor Information */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Investor</h3>
            <div className="mt-4">
              <Link href={`/broker/investors/${offer.investor}`} className="font-semibold text-[#173D2B]">
                {offer.investor}
              </Link>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#66706A]">Offer History</span>
                  <span className="font-semibold">3 offers</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#66706A]">Deal Success</span>
                  <span className="font-semibold">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#66706A]">Response Time</span>
                  <span className="font-semibold">&lt;24 hrs</span>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Timeline</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                  <Clock size={12} className="text-[#31551C]" />
                </div>
                <div>
                  <p className="font-semibold">Offer submitted</p>
                  <p className="text-[#66706A]">{offer.submitted}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
                  <FileText size={12} className="text-[#315A6B]" />
                </div>
                <div>
                  <p className="font-semibold">Broker review</p>
                  <p className="text-[#66706A]">In progress</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
                  <CheckCircle2 size={12} className="text-[#745F35]" />
                </div>
                <div>
                  <p className="font-semibold">Seller response</p>
                  <p className="text-[#9AA8A0]">Pending</p>
                </div>
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
                placeholder="Add notes about this offer..."
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