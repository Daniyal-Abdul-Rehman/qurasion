import Link from 'next/link';
import { ArrowRight, Plus, Target, Mail, Phone, MapPin, DollarSign, TrendingUp } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';
import { brokerLeads } from '../../../lib/broker-data';

const pipelineStages = [
  { name: 'NEW', count: 1 },
  { name: 'CONTACTED', count: 1 },
  { name: 'QUALIFIED', count: 1 },
  { name: 'PROPERTY MATCHED', count: 0 },
  { name: 'VIEWING / DISCUSSION', count: 1 },
  { name: 'OFFER', count: 0 },
  { name: 'NEGOTIATION', count: 0 },
  { name: 'CONVERTED', count: 0 },
];

export default function LeadsPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Leads"
      description="Manage your lead pipeline from initial contact to conversion."
      action={
        <Link href="/broker/leads/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Add Lead
        </Link>
      }
    >
      {/* Pipeline Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {pipelineStages.map((stage) => (
          <div key={stage.name} className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">{stage.name}</p>
              <p className="mt-2 font-display text-2xl">{stage.count}</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-[#B7D83D]" />
          </div>
        ))}
      </section>

      {/* Kanban Pipeline */}
      <section className="mt-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {pipelineStages.map((stage) => (
            <div key={stage.name} className="w-80 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg">{stage.name}</h3>
                <span className="text-sm text-[#9AA8A0]">{stage.count}</span>
              </div>
              <div className="space-y-3">
                {brokerLeads
                  .filter((lead) => lead.status.toUpperCase().replace(/ /g, ' ') === stage.name)
                  .map((lead) => (
                    <Link
                      key={lead.id}
                      href={`/broker/leads/${lead.id}`}
                      className="block rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#E7F0E5] flex items-center justify-center text-xs font-semibold text-[#173D2B]">
                            {lead.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{lead.name}</p>
                            <p className="text-xs text-[#66706A]">{lead.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-[#E8F5D3] px-2 py-1 rounded-full">
                          <TrendingUp size={12} className="text-[#31551C]" />
                          <span className="text-xs font-semibold text-[#31551C]">{lead.score}</span>
                        </div>
                      </div>
                      {lead.property !== 'Unknown' && (
                        <div className="flex items-center gap-2 text-xs text-[#66706A] mb-2">
                          <MapPin size={12} />
                          <span>{lead.property}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-xs text-[#66706A]">
                        <div className="flex items-center gap-1">
                          <Mail size={12} />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone size={12} />
                          <span>{lead.phone}</span>
                        </div>
                      </div>
                      {lead.capital !== 'N/A' && (
                        <div className="flex items-center gap-1 text-xs text-[#66706A] mt-2">
                          <DollarSign size={12} />
                          <span>{lead.capital} · {lead.strategy}</span>
                        </div>
                      )}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Leads Table */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">All leads</p>
            <h2 className="mt-2 font-display text-2xl">Recent leads</h2>
          </div>
          <Link href="/broker/leads" className="text-sm font-semibold text-[#173D2B]">
            View all <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Lead</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Type</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Source</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Score</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Created</th>
              </tr>
            </thead>
            <tbody>
              {brokerLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4">
                    <Link href={`/broker/leads/${lead.id}`} className="font-semibold text-sm">
                      {lead.name}
                    </Link>
                    {lead.property !== 'Unknown' && (
                      <p className="text-xs text-[#66706A] mt-1">{lead.property}</p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm">{lead.type}</td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{lead.source}</td>
                  <td className="py-3 px-4">
                    <StatusBadge tone={lead.status === 'Qualified' ? 'positive' : lead.status === 'New' ? 'neutral' : 'warning'}>
                      {lead.status}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Target size={14} className="text-[#B7D83D]" />
                      <span className="text-sm font-semibold">{lead.score}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{lead.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </BrokerPageShell>
  );
}