import Link from 'next/link';
import { Clock, CheckCircle, AlertTriangle, RefreshCw, Filter, Play, Pause, RotateCcw, MoreVertical, BarChart3, Activity, FileText, Search } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';
import { backgroundJobs } from '../../../lib/data-operator-data';

export default function BackgroundJobsPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Background jobs"
      title="Job monitoring"
      description="Monitor and manage background jobs for data processing, valuation, indexing, and other async tasks."
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
      {/* Jobs Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Jobs</p>
          <p className="mt-2 font-display text-2xl">{backgroundJobs.length}</p>
          <p className="mt-1 text-xs text-[#66706A]">In monitoring period</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Running</p>
          <p className="mt-2 font-display text-2xl">{backgroundJobs.filter(j => j.status === 'In Progress').length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Currently processing</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Queued</p>
          <p className="mt-2 font-display text-2xl">{backgroundJobs.filter(j => j.status === 'Queued').length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Awaiting execution</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Failed</p>
          <p className="mt-2 font-display text-2xl">{backgroundJobs.filter(j => j.status === 'Failed').length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Requires attention</p>
        </div>
      </section>

      {/* Active Jobs */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Job queue</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          {backgroundJobs.map((job) => (
            <div key={job.id} className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
              <div className="flex shrink-0 items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-md ${job.status === 'Completed' ? 'bg-[#E8F5D3]' : job.status === 'In Progress' ? 'bg-[#E7F0F4]' : job.status === 'Failed' ? 'bg-[#FEE2E2]' : 'bg-[#E8EBE8]'}`}>
                  {job.status === 'Completed' ? <CheckCircle size={20} className="text-[#31551C]" /> : job.status === 'In Progress' ? <RefreshCw size={20} className="text-[#315A6B]" /> : job.status === 'Failed' ? <AlertTriangle size={20} className="text-[#DC2626]" /> : <Clock size={20} className="text-[#66706A]" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{job.jobType}</p>
                  <p className="text-xs text-[#66706A]">{job.priority} priority</p>
                </div>
              </div>
              
              <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Started</p>
                  <p className="text-sm">{job.startedAt || 'Not started'}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Duration</p>
                  <p className="text-sm">{job.duration || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Processed</p>
                  <p className="text-sm">{job.recordsProcessed.toLocaleString()} records</p>
                </div>
                {job.error && (
                  <div>
                    <p className="text-[10px] uppercase text-[#DC2626]">Error</p>
                    <p className="text-sm text-[#DC2626]">{job.error}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge tone={job.status === 'Completed' ? 'positive' : job.status === 'In Progress' ? 'neutral' : job.status === 'Failed' ? 'negative' : 'muted'}>
                  {job.status}
                </StatusBadge>
                <div className="flex gap-1">
                  {job.status === 'Failed' && (
                    <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]" title="Retry">
                      <RotateCcw size={16} />
                    </button>
                  )}
                  {job.status === 'In Progress' && (
                    <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]" title="Pause">
                      <Pause size={16} />
                    </button>
                  )}
                  {job.status === 'Queued' && (
                    <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]" title="Start now">
                      <Play size={16} />
                    </button>
                  )}
                  <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Failed Job Alert */}
      {backgroundJobs.filter(j => j.status === 'Failed').length > 0 && (
        <section className="mt-6 rounded-lg border border-[#FEE2E2] bg-[#FEF2F2] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="mt-0.5 text-[#DC2626]" />
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-[#DC2626]">Failed job detected</h3>
              <p className="mt-2 text-sm text-[#66706A]">
                Entity Resolution job failed due to memory limit exceeded. The system will automatically retry with reduced batch size.
              </p>
              <div className="mt-4 flex gap-3">
                <button className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
                  <RotateCcw size={14} /> Retry Job
                </button>
                <button className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm">
                  <FileText size={14} /> View Logs
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Job Categories */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Job categories</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-[#31551C]" />
              <p className="text-sm font-semibold">Valuation Jobs</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Property valuation and comparable analysis</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">1 active</span>
              <StatusBadge tone="positive">Healthy</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Search size={18} className="text-[#315A6B]" />
              <p className="text-sm font-semibold">Search Index Jobs</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">OpenSearch index updates and sync</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">0 active</span>
              <StatusBadge tone="positive">Healthy</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-[#745F35]" />
              <p className="text-sm font-semibold">Matching Jobs</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Investor-property matching algorithms</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">1 active</span>
              <StatusBadge tone="neutral">Running</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-[#66706A]" />
              <p className="text-sm font-semibold">Report Generation</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">PDF reports and document generation</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">1 queued</span>
              <StatusBadge tone="muted">Queued</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <RefreshCw size={18} className="text-[#66706A]" />
              <p className="text-sm font-semibold">Entity Resolution</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Property entity resolution and matching</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">1 failed</span>
              <StatusBadge tone="negative">Failed</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#66706A]" />
              <p className="text-sm font-semibold">Data Ingestion</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Provider data ingestion and normalization</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">0 active</span>
              <StatusBadge tone="positive">Healthy</StatusBadge>
            </div>
          </div>
        </div>
      </section>

      {/* Job Performance */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Job performance (last 24 hours)</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Total Jobs</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">127</p>
            <p className="mt-1 text-xs text-[#66706A]">+15% vs yesterday</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <p className="text-xs font-semibold text-[#315A6B]">Success Rate</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">96.5%</p>
            <p className="mt-1 text-xs text-[#66706A]">+2.1% improvement</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <p className="text-xs font-semibold text-[#745F35]">Avg Duration</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">8 min</p>
            <p className="mt-1 text-xs text-[#66706A]">-1 min faster</p>
          </div>
          <div className="rounded-md bg-[#E8EBE8] p-4">
            <p className="text-xs font-semibold text-[#66706A]">Queue Depth</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">3</p>
            <p className="mt-1 text-xs text-[#66706A]">Normal load</p>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
