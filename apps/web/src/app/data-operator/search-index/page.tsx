import Link from 'next/link';
import { Server, RefreshCw, Search, Filter, TrendingUp, Clock, CheckCircle, AlertTriangle, Activity, Database, Zap, ArrowRight, BarChart3 } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';
import { searchIndexData } from '../../../lib/data-operator-data';

export default function SearchIndexPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Search index"
      title="OpenSearch monitoring"
      description="Monitor search index health, sync status, and query performance for property search."
      action={
        <div className="flex gap-3">
          <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <RefreshCw size={16} /> Rebuild Index
          </button>
          <button className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Filter size={16} /> Filter
          </button>
        </div>
      }
    >
      {/* Index Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Index Health</p>
          <div className="mt-2 flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${searchIndexData.indexHealth === 'healthy' ? 'bg-[#31551C]' : 'bg-[#B8860B]'}`} />
            <p className="font-display text-2xl capitalize">{searchIndexData.indexHealth}</p>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">All shards operational</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Indexed Properties</p>
          <p className="mt-2 font-display text-2xl">{searchIndexData.indexedProperties}</p>
          <p className="mt-1 text-xs text-[#66706A]">Searchable records</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Sync Status</p>
          <p className="mt-2 font-display text-2xl capitalize">{searchIndexData.syncStatus}</p>
          <p className="mt-1 text-xs text-[#66706A]">Last sync: {searchIndexData.lastSync}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Index Version</p>
          <p className="mt-2 font-display text-2xl">{searchIndexData.indexVersion}</p>
          <p className="mt-1 text-xs text-[#66706A]">Active mapping</p>
        </div>
      </section>

      {/* Index Performance */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Index performance (last 24 hours)</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[#31551C]" />
              <p className="text-xs font-semibold text-[#31551C]">Query Latency</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">45ms</p>
            <p className="mt-1 text-xs text-[#66706A]">Average response time</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#315A6B]" />
              <p className="text-xs font-semibold text-[#315A6B]">Queries/sec</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">1,245</p>
            <p className="mt-1 text-xs text-[#66706A]">Peak: 2,890</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-[#745F35]" />
              <p className="text-xs font-semibold text-[#745F35]">Index Size</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">842 GB</p>
            <p className="mt-1 text-xs text-[#66706A]">+12 GB this week</p>
          </div>
          <div className="rounded-md bg-[#E8EBE8] p-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#66706A]" />
              <p className="text-xs font-semibold text-[#66706A]">Cache Hit Rate</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">94.2%</p>
            <p className="mt-1 text-xs text-[#66706A]">Query cache efficiency</p>
          </div>
        </div>
      </section>

      {/* Cluster Status */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Cluster status</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          <div className="flex items-center gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E8F5D3]">
              <Server size={20} className="text-[#31551C]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Primary Node</p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#66706A]">
                <span>es-primary-01</span>
                <span>•</span>
                <span>16 cores, 64GB RAM</span>
                <span>•</span>
                <span>2.1TB SSD</span>
              </div>
            </div>
            <div className="text-right">
              <StatusBadge tone="positive">Healthy</StatusBadge>
              <p className="mt-1 text-xs text-[#66706A]">42% CPU, 67% MEM</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E8F5D3]">
              <Server size={20} className="text-[#31551C]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Data Node 1</p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#66706A]">
                <span>es-data-01</span>
                <span>•</span>
                <span>8 cores, 32GB RAM</span>
                <span>•</span>
                <span>1.5TB SSD</span>
              </div>
            </div>
            <div className="text-right">
              <StatusBadge tone="positive">Healthy</StatusBadge>
              <p className="mt-1 text-xs text-[#66706A]">38% CPU, 71% MEM</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E8F5D3]">
              <Server size={20} className="text-[#31551C]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Data Node 2</p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#66706A]">
                <span>es-data-02</span>
                <span>•</span>
                <span>8 cores, 32GB RAM</span>
                <span>•</span>
                <span>1.5TB SSD</span>
              </div>
            </div>
            <div className="text-right">
              <StatusBadge tone="positive">Healthy</StatusBadge>
              <p className="mt-1 text-xs text-[#66706A]">35% CPU, 69% MEM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Index Sync Status */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Index synchronization</h2>
        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <CheckCircle size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Property Index</p>
                <p className="text-xs text-[#66706A]">3.2M documents indexed</p>
              </div>
            </div>
            <div className="text-right">
              <StatusBadge tone="positive">Synced</StatusBadge>
              <p className="mt-1 text-xs text-[#66706A]">15 min ago</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <CheckCircle size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Investor Index</p>
                <p className="text-xs text-[#66706A]">12.4K documents indexed</p>
              </div>
            </div>
            <div className="text-right">
              <StatusBadge tone="positive">Synced</StatusBadge>
              <p className="mt-1 text-xs text-[#66706A]">12 min ago</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F0F4]">
                <RefreshCw size={16} className="text-[#315A6B]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Deal Index</p>
                <p className="text-xs text-[#66706A]">847 documents indexing</p>
              </div>
            </div>
            <div className="text-right">
              <StatusBadge tone="neutral">Syncing</StatusBadge>
              <p className="mt-1 text-xs text-[#66706A]">In progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Analytics */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Search analytics</p>
            <h2 className="mt-2 font-display text-2xl">Query patterns</h2>
          </div>
          <Link href="/data-operator/search-index/analytics" className="text-sm font-semibold text-[#173D2B]">
            View details <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold uppercase text-[#9AA8A0]">Top Search</p>
            <p className="mt-2 text-sm font-semibold">Dallas single family</p>
            <p className="mt-1 text-xs text-[#66706A]">12,450 queries</p>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold uppercase text-[#9AA8A0]">Zero Results Rate</p>
            <p className="mt-2 text-sm font-semibold">2.3%</p>
            <p className="mt-1 text-xs text-[#66706A]">Below target (5%)</p>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold uppercase text-[#9AA8A0]">Avg Results per Query</p>
            <p className="mt-2 text-sm font-semibold">47</p>
            <p className="mt-1 text-xs text-[#66706A]">Optimal range</p>
          </div>
        </div>
      </section>

      {/* Index Management */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Index management</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <RefreshCw size={18} className="text-[#31551C]" />
              <p className="text-sm font-semibold">Force Reindex</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Rebuild entire search index from PostgreSQL</p>
            <button className="mt-3 btn-primary px-4 py-2 text-sm">
              Start Reindex
            </button>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-[#315A6B]" />
              <p className="text-sm font-semibold">Update Mapping</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Apply new index mapping without full reindex</p>
            <button className="mt-3 btn-secondary px-4 py-2 text-sm">
              Update Mapping
            </button>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
