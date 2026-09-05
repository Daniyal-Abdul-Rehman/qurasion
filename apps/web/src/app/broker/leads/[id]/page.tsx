import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin, Target, TrendingUp, DollarSign, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../../components/atoms';
import BrokerPageShell from '../../../../components/organisms/BrokerPageShell';
import { brokerLeads } from '../../../../lib/broker-data';

export default function BrokerLeadDetailPage({ params }: { params: { id: string } }) {
  const lead = brokerLeads.find(l => l.id === params.id) || brokerLeads[0];

  return (
    <BrokerPageShell
      eyebrow="Lead details"
      title={lead.name}
      description={`${lead.type} • ${lead.status}`}
      action={
        <div className="flex gap-3">
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm">
            <Mail size={16} /> Send Message
          </PrimaryButton>
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm bg-white border border-[#DDE2DD] text-[#172019]">
            <Phone size={16} /> Call
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Lead Information */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Lead Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Email</p>
                  <p className="text-sm">{lead.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Phone</p>
                  <p className="text-sm">{lead.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Source</p>
                  <p className="text-sm">{lead.source}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Created</p>
                  <p className="text-sm">{lead.created}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <p className="text-xs text-[#9AA8A0]">Status</p>
              <StatusBadge tone={lead.status === 'Qualified' ? 'positive' : lead.status === 'New' ? 'neutral' : 'warning'}>
                {lead.status}
              </StatusBadge>
            </div>
          </section>

          {/* Lead Score */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Lead Score</h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-display text-4xl">{lead.score}</span>
                <span className="text-lg text-[#9AA8A0]">/100</span>
              </div>
              {lead.score >= 90 && (
                <div className="flex items-center gap-2 rounded-full bg-[#E8F5D3] px-3 py-1.5">
                  <CheckCircle2 size={16} className="text-[#31551C]" />
                  <span className="text-sm font-semibold text-[#31551C]">High Priority</span>
                </div>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#66706A]">Investment fit</span>
                <span className="font-semibold">+25</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#66706A]">Capital availability</span>
                <span className="font-semibold">+20</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#66706A]">Property interest</span>
                <span className="font-semibold">+20</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#66706A]">Market fit</span>
                <span className="font-semibold">+15</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#66706A]">Engagement</span>
                <span className="font-semibold">+7</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#66706A]">Response history</span>
                <span className="font-semibold">+5</span>
              </div>
            </div>
          </section>

          {/* Investor/Seller Specific Information */}
          {lead.type === 'Investor' && (
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
              <h2 className="font-display text-xl">Investment Profile</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <DollarSign size={16} className="mt-1 text-[#66706A]" />
                  <div>
                    <p className="text-xs text-[#9AA8A0]">Investment Capital</p>
                    <p className="text-sm font-semibold">{lead.capital}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target size={16} className="mt-1 text-[#66706A]" />
                  <div>
                    <p className="text-xs text-[#9AA8A0]">Strategy</p>
                    <p className="text-sm font-semibold">{lead.strategy}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-[#9AA8A0]">Interested Property</p>
                <Link href={`/broker/properties/${lead.property}`} className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#173D2B]">
                  {lead.property} <ArrowRight size={14} />
                </Link>
              </div>
            </section>
          )}

          {lead.type === 'Seller' && (
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
              <h2 className="font-display text-xl">Seller Information</h2>
              <div className="mt-4">
                <p className="text-xs text-[#9AA8A0]">Property</p>
                <p className="mt-1 text-sm font-semibold">{lead.property}</p>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <Link href={`/broker/leads/${lead.id}/convert`} className="block w-full rounded-md bg-[#173D2B] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#122E20]">
                Convert to Contact
              </Link>
              <Link href={`/broker/leads/${lead.id}/schedule`} className="block w-full rounded-md border border-[#DDE2DD] px-4 py-2.5 text-center text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                Schedule Viewing
              </Link>
              <Link href={`/broker/leads/${lead.id}/property`} className="block w-full rounded-md border border-[#DDE2DD] px-4 py-2.5 text-center text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                Assign Property
              </Link>
            </div>
          </section>

          {/* Activity Timeline */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Activity</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                  <CheckCircle2 size={12} className="text-[#31551C]" />
                </div>
                <div>
                  <p className="font-semibold">Lead qualified</p>
                  <p className="text-[#66706A]">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
                  <Mail size={12} className="text-[#315A6B]" />
                </div>
                <div>
                  <p className="font-semibold">Email opened</p>
                  <p className="text-[#66706A]">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
                  <Target size={12} className="text-[#745F35]" />
                </div>
                <div>
                  <p className="font-semibold">Property viewed</p>
                  <p className="text-[#66706A]">1 day ago</p>
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
                placeholder="Add notes about this lead..."
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