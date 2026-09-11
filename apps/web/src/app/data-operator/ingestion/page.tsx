import Link from 'next/link';
import { Activity, CheckCircle, AlertTriangle, RefreshCw, Clock, Database, Filter, Download, Eye } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';
import { dataIngestions } from '../../../lib/data-operator-data';

export default function DataIngestionPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Data ingestion"
      title="Ingestion monitoring"
      description="Track data deliveries from providers, monitor processing status, and handle ingestion failures."
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
      {/* Ingestion Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Today's Ingestions</p>
          <p className="mt-2 font-display text-2xl">{dataIngestions.length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Data deliveries processed</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Successful</p>
          <p className="mt-2 font-display text-2xl">{dataIngestions.filter(i => i.status === 'Completed').length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Completed without errors</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Failed</p>
          <p className="mt-2 font-display text-2xl">{dataIngestions.filter(i => i.status === 'Failed').length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Requires investigation</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">In Progress</p>
          <p className="mt-2 font-display text-2xl">{dataIngestions.filter(i => i.status === 'In Progress').length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Currently processing</p>
        </div>
      </section>

      {/* Recent Ingestions */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Recent ingestions</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          {dataIngestions.map((ingestion) => (
            <div key={ingestion.id} className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
              <div className="flex shrink-0 items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-md ${ingestion.status === 'Completed' ? 'bg-[#E8F5D3]' : ingestion.status === 'Failed' ? 'bg-[#FEE2E2]' : 'bg-[#E7F0F4]'}`}>
                  {ingestion.status === 'Completed' ? <CheckCircle size={20} className="text-[#31551C]" /> : ingestion.status === 'Failed' ? <AlertTriangle size={20} className="text-[#DC2626]" /> : <RefreshCw size={20} className="text-[#315A6B]" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{ingestion.provider}</p>
                  <p className="text-xs text-[#66706A]">{ingestion.dataset}</p>
                </div>
              </div>
              
              <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Delivery ID</p>
                  <p className="text-sm font-mono text-xs">{ingestion.deliveryId}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Records</p>
                  <p className="text-sm">{ingestion.recordsProcessed.toLocaleString()} processed</p>
                  {ingestion.recordsRejected > 0 && (
                    <p className="text-xs text-[#DC2626]">{ingestion.recordsRejected} rejected</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Started</p>
                  <p className="text-sm">{ingestion.startedAt}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Duration</p>
                  <p className="text-sm">{ingestion.duration || 'In progress'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge tone={ingestion.status === 'Completed' ? 'positive' : ingestion.status === 'Failed' ? 'negative' : 'neutral'}>
                  {ingestion.status}
                </StatusBadge>
                <div className="flex gap-1">
                  <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                    <Eye size={16} />
                  </button>
                  <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Failed Ingestion Details */}
      {dataIngestions.filter(i => i.status === 'Failed').length > 0 && (
        <section className="mt-6 rounded-lg border border-[#FEE2E2] bg-[#FEF2F2] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="mt-0.5 text-[#DC2626]" />
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-[#DC2626]">Failed ingestion detected</h3>
              <p className="mt-2 text-sm text-[#66706A]">
                Mortgage Records ingestion failed due to API rate limit exceeded. The system will automatically retry in 15 minutes.
              </p>
              <div className="mt-4 flex gap-3">
                <button className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
                  <RefreshCw size={14} /> Retry Now
                </button>
                <button className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm">
                  <Database size={14} /> View Logs
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ingestion Statistics */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Ingestion statistics (last 7 days)</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Total Records</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">156K</p>
            <p className="mt-1 text-xs text-[#66706A]">+12% vs last week</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <p className="text-xs font-semibold text-[#315A6B]">Success Rate</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">98.2%</p>
            <p className="mt-1 text-xs text-[#66706A]">+0.5% improvement</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <p className="text-xs font-semibold text-[#745F35]">Avg Duration</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">12 min</p>
            <p className="mt-1 text-xs text-[#66706A]">-2 min faster</p>
          </div>
          <div className="rounded-md bg-[#E8EBE8] p-4">
            <p className="text-xs font-semibold text-[#66706A]">Data Freshness</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">2.4 hrs</p>
            <p className="mt-1 text-xs text-[#66706A]">Average lag time</p>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
