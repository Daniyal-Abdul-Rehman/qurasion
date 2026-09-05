import Link from 'next/link';
import { ArrowRight, Mail, Phone, MessageSquare, DollarSign, Target, MapPin, Building2, TrendingUp, CheckCircle2, AlertTriangle, PieChart, Briefcase } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../../components/atoms';
import BrokerPageShell from '../../../../components/organisms/BrokerPageShell';
import { brokerInvestors } from '../../../../lib/broker-data';

export default function BrokerInvestorDetailPage({ params }: { params: { id: string } }) {
  const investor = brokerInvestors.find(i => i.id === params.id) || brokerInvestors[0];

  return (
    <BrokerPageShell
      eyebrow="Investor profile"
      title={investor.name}
      description={`Investor • ${investor.status}`}
      action={
        <div className="flex gap-3">
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm">
            <MessageSquare size={16} /> Send Message
          </PrimaryButton>
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm bg-white border border-[#DDE2DD] text-[#172019]">
            <Mail size={16} /> Send Property
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Investment Profile */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Investment Profile</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <DollarSign size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Investment Capital</p>
                  <p className="text-sm font-semibold">{investor.capital}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Target Return</p>
                  <p className="text-sm font-semibold">{investor.targetReturn}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Deals Completed</p>
                  <p className="text-sm font-semibold">{investor.dealsCompleted}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Status</p>
                  <StatusBadge tone="positive">{investor.status}</StatusBadge>
                </div>
              </div>
            </div>
          </section>

          {/* Investment Strategies */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Investment Strategies</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {investor.strategies.map((strategy) => (
                <span key={strategy} className="rounded-full bg-[#E8F5D3] px-4 py-2 text-sm font-semibold text-[#31551C]">
                  {strategy}
                </span>
              ))}
            </div>
          </section>

          {/* Target Markets */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Target Markets</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {investor.markets.map((market) => (
                <span key={market} className="flex items-center gap-2 rounded-full bg-[#E7F0F4] px-4 py-2 text-sm font-semibold text-[#315A6B]">
                  <MapPin size={14} />
                  {market}
                </span>
              ))}
            </div>
          </section>

          {/* Property Types */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Property Types</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {investor.propertyTypes.map((type) => (
                <span key={type} className="flex items-center gap-2 rounded-full bg-[#F3EBDD] px-4 py-2 text-sm font-semibold text-[#745F35]">
                  <Building2 size={14} />
                  {type}
                </span>
              ))}
            </div>
          </section>

          {/* Properties Viewed */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Recent Properties Viewed</h2>
              <Link href="/broker/properties" className="text-sm font-semibold text-[#173D2B]">
                View all <ArrowRight className="ml-1 inline" size={14} />
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-md border border-[#E8EBE8] p-3">
                <div className="h-12 w-12 shrink-0 rounded-md bg-[#E7F0E5]" />
                <div className="flex-1">
                  <Link href="/broker/properties/prop-1" className="font-semibold text-[#173D2B]">
                    1824 Oak Street
                  </Link>
                  <p className="mt-1 text-xs text-[#66706A]">Dallas, TX • $509,000</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#9AA8A0]">Viewed</p>
                  <p className="text-xs text-[#66706A]">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-[#E8EBE8] p-3">
                <div className="h-12 w-12 shrink-0 rounded-md bg-[#E7F0E5]" />
                <div className="flex-1">
                  <Link href="/broker/properties/prop-2" className="font-semibold text-[#173D2B]">
                    741 Pine Avenue
                  </Link>
                  <p className="mt-1 text-xs text-[#66706A]">Austin, TX • $475,000</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#9AA8A0]">Viewed</p>
                  <p className="text-xs text-[#66706A]">1 day ago</p>
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
              <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#122E20]">
                <MessageSquare size={14} /> Send Message
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Mail size={14} /> Send Property
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Target size={14} /> Find Matches
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Briefcase size={14} /> Add to Campaign
              </button>
            </div>
          </section>

          {/* Match Score */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Match Analysis</h3>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#66706A]">Overall Match</span>
                <span className="font-display text-xl">94%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#B7D83D]" style={{ width: '94%' }} />
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#66706A]">Capital fit</span>
                  <span className="font-semibold">Excellent</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#66706A]">Market alignment</span>
                  <span className="font-semibold">Strong</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#66706A]">Strategy match</span>
                  <span className="font-semibold">Excellent</span>
                </div>
              </div>
            </div>
          </section>

          {/* Communication Preferences */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Communication</h3>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#66706A]">Email alerts</span>
                <span className="text-[#31551C]">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#66706A]">SMS alerts</span>
                <span className="text-[#9AA8A0]">Disabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#66706A]">Push notifications</span>
                <span className="text-[#31551C]">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#66706A]">Marketing emails</span>
                <span className="text-[#31551C]">Enabled</span>
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
                placeholder="Add notes about this investor..."
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