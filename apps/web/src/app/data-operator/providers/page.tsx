import Link from 'next/link';
import { Plus, Database, MoreVertical, ExternalLink, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';
import { dataProviders } from '../../../lib/data-operator-data';

export default function DataProvidersPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Data providers"
      title="Data sources"
      description="Manage and monitor external data providers that supply property information to the platform."
      action={
        <Link href="/data-operator/providers/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Add Provider
        </Link>
      }
    >
      {/* Provider Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Providers</p>
          <p className="mt-2 font-display text-2xl">{dataProviders.length}</p>
          <p className="mt-1 text-xs text-[#66706A]">All configured sources</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Active Providers</p>
          <p className="mt-2 font-display text-2xl">{dataProviders.filter(p => p.status === 'Active').length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Currently delivering data</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Records</p>
          <p className="mt-2 font-display text-2xl">3.2M</p>
          <p className="mt-1 text-xs text-[#66706A]">Canonical properties</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">System Health</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#31551C]" />
            <p className="font-display text-2xl">Healthy</p>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">1 provider degraded</p>
        </div>
      </section>

      {/* Providers List */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">All providers</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          {dataProviders.map((provider) => (
            <div key={provider.id} className="flex items-center gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#E7F0E5]">
                <Database size={22} className="text-[#31551C]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{provider.name}</p>
                  <StatusBadge tone={provider.health === 'healthy' ? 'positive' : 'warning'}>
                    {provider.health}
                  </StatusBadge>
                </div>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#66706A]">
                  <span>{provider.type}</span>
                  <span>•</span>
                  <span>{provider.deliveryFrequency}</span>
                  <span>•</span>
                  <span>{provider.recordCount} records</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-[#66706A]">
                  <Clock size={12} />
                  <span>Last delivery: {provider.lastDelivery}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={provider.apiEndpoint} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <ExternalLink size={16} />
                </Link>
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Provider Types Distribution */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Provider types</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Government</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">2</p>
            <p className="mt-1 text-xs text-[#66706A]">Tax records, permits</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <p className="text-xs font-semibold text-[#315A6B]">Licensed</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">2</p>
            <p className="mt-1 text-xs text-[#66706A]">MLS, mortgage data</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <p className="text-xs font-semibold text-[#745F35]">Geographic</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">1</p>
            <p className="mt-1 text-xs text-[#66706A]">Spatial data</p>
          </div>
          <div className="rounded-md bg-[#E8EBE8] p-4">
            <p className="text-xs font-semibold text-[#66706A]">Other</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">0</p>
            <p className="mt-1 text-xs text-[#66706A]">Additional sources</p>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
