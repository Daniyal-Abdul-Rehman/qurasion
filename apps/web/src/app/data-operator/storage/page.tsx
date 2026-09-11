import Link from 'next/link';
import { HardDrive, Download, Search, Filter, MoreVertical, FolderOpen, FileText, Calendar, ArrowRight, Database, Trash2, RefreshCw } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';
import { rawDataStorage } from '../../../lib/data-operator-data';

export default function RawDataStoragePage() {
  return (
    <DataOperatorPageShell
      eyebrow="Raw data storage"
      title="Data lake management"
      description="Monitor and manage raw data storage in S3, including provider deliveries and archival data."
      action={
        <div className="flex gap-3">
          <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <RefreshCw size={16} /> Refresh
          </button>
          <button className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Filter size={16} /> Filter
          </button>
        </div>
      }
    >
      {/* Storage Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Storage</p>
          <p className="mt-2 font-display text-2xl">5.6 TB</p>
          <p className="mt-1 text-xs text-[#66706A]">Raw data retained</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Providers</p>
          <p className="mt-2 font-display text-2xl">{rawDataStorage.length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Active data sources</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Records</p>
          <p className="mt-2 font-display text-2xl">3.2M</p>
          <p className="mt-1 text-xs text-[#66706A]">Raw records stored</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Retention</p>
          <p className="mt-2 font-display text-2xl">7 years</p>
          <p className="mt-1 text-xs text-[#66706A]">Default policy</p>
        </div>
      </section>

      {/* Storage Locations */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Storage locations</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          {rawDataStorage.map((storage) => (
            <div key={storage.id} className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
              <div className="flex shrink-0 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E7F0E5]">
                  <FolderOpen size={20} className="text-[#31551C]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{storage.provider}</p>
                  <p className="text-xs text-[#66706A]">{storage.date}</p>
                </div>
              </div>
              
              <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Location</p>
                  <p className="text-sm font-mono text-xs">{storage.location}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Size</p>
                  <p className="text-sm">{storage.size}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Records</p>
                  <p className="text-sm">{storage.recordCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Retention</p>
                  <p className="text-sm">{storage.retention}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <Download size={16} />
                </button>
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Storage Categories */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Storage categories</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Database size={18} className="text-[#31551C]" />
              <p className="text-sm font-semibold">Raw Provider Data</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Immutable raw data from providers</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">4.2 TB</span>
              <StatusBadge tone="positive">Active</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-[#315A6B]" />
              <p className="text-sm font-semibold">Processed Data</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Normalized and enriched data</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">1.1 TB</span>
              <StatusBadge tone="positive">Active</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#745F35]" />
              <p className="text-sm font-semibold">Archive Data</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Historical data and backups</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">0.3 TB</span>
              <StatusBadge tone="muted">Archived</StatusBadge>
            </div>
          </div>
        </div>
      </section>

      {/* Storage Trends */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Storage trends (last 30 days)</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Storage Growth</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">+124 GB</p>
            <p className="mt-1 text-xs text-[#66706A]">+2.8% increase</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <p className="text-xs font-semibold text-[#315A6B]">Daily Ingestion</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">4.2 GB</p>
            <p className="mt-1 text-xs text-[#66706A]">Average per day</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <p className="text-xs font-semibold text-[#745F35]">Compression Ratio</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">3.2x</p>
            <p className="mt-1 text-xs text-[#66706A]">Data compression savings</p>
          </div>
          <div className="rounded-md bg-[#E8EBE8] p-4">
            <p className="text-xs font-semibold text-[#66706A]">Cost Efficiency</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">94%</p>
            <p className="mt-1 text-xs text-[#66706A]">Optimal tier usage</p>
          </div>
        </div>
      </section>

      {/* Storage Management */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Storage management</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Trash2 size={18} className="text-[#DC2626]" />
              <p className="text-sm font-semibold">Data Purge</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Remove raw data older than retention period</p>
            <button className="mt-3 btn-secondary border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] px-4 py-2 text-sm">
              Run Purge
            </button>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <RefreshCw size={18} className="text-[#31551C]" />
              <p className="text-sm font-semibold">Storage Optimization</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Compress and reorganize data for cost efficiency</p>
            <button className="mt-3 btn-primary px-4 py-2 text-sm">
              Optimize Storage
            </button>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Storage activity</p>
            <h2 className="mt-2 font-display text-2xl">Recent operations</h2>
          </div>
          <Link href="/data-operator/storage/activity" className="text-sm font-semibold text-[#173D2B]">
            View all <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
              <Download size={15} className="text-[#31551C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Raw data ingested</p>
              <p className="mt-1 text-xs text-[#66706A]">Provider: County Tax Records</p>
              <p className="mt-1 text-xs text-[#66706A]">2.4 GB • 45,230 records</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">2 hours ago</p>
          </div>
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
              <RefreshCw size={15} className="text-[#315A6B]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Storage optimized</p>
              <p className="mt-1 text-xs text-[#66706A]">Compressed 156 GB of historical data</p>
              <p className="mt-1 text-xs text-[#66706A]">3.2x compression ratio achieved</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">Yesterday</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
              <Trash2 size={15} className="text-[#745F35]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Data purged</p>
              <p className="mt-1 text-xs text-[#66706A]">Removed data older than 7 years</p>
              <p className="mt-1 text-xs text-[#66706A]">12 GB freed</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">2 days ago</p>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
