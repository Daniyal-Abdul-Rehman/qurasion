import Link from 'next/link';
import { Activity, RefreshCw, Filter, CheckCircle, AlertTriangle, Play, Pause, Zap, ArrowRight, GitBranch, Workflow, Clock, Database, Layers } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';

export default function DataPipelinesPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Data pipelines"
      title="Workflow orchestration"
      description="Monitor and manage data processing pipelines, workflows, and dependency chains."
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
      {/* Pipeline Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Active Pipelines</p>
          <p className="mt-2 font-display text-2xl">8</p>
          <p className="mt-1 text-xs text-[#66706A]">Currently running</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Workflows</p>
          <p className="mt-2 font-display text-2xl">24</p>
          <p className="mt-1 text-xs text-[#66706A]">Configured pipelines</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Success Rate</p>
          <p className="mt-2 font-display text-2xl">97.8%</p>
          <p className="mt-1 text-xs text-[#66706A]">Last 24 hours</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Avg Duration</p>
          <p className="mt-2 font-display text-2xl">18 min</p>
          <p className="mt-1 text-xs text-[#66706A]">Pipeline runtime</p>
        </div>
      </section>

      {/* Active Pipelines */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Active pipelines</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          <div className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E7F0F4]">
                <Activity size={20} className="text-[#315A6B]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Daily Property Ingestion</p>
                <p className="text-xs text-[#66706A]">Provider data → Normalization → Resolution</p>
              </div>
            </div>
            
            <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Progress</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 w-24 rounded-full bg-[#E8EBE8]">
                    <div className="h-2 rounded-full bg-[#31551C]" style={{ width: '78%' }} />
                  </div>
                  <span className="text-sm font-semibold">78%</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Duration</p>
                <p className="text-sm">14 min / 18 min est</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Started</p>
                <p className="text-sm">14 min ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge tone="neutral">Running</StatusBadge>
              <div className="flex gap-1">
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <Pause size={16} />
                </button>
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <GitBranch size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E7F0F4]">
                <Activity size={20} className="text-[#315A6B]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Valuation Batch Processing</p>
                <p className="text-xs text-[#66706A]">Property selection → Valuation → Indexing</p>
              </div>
            </div>
            
            <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Progress</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 w-24 rounded-full bg-[#E8EBE8]">
                    <div className="h-2 rounded-full bg-[#31551C]" style={{ width: '45%' }} />
                  </div>
                  <span className="text-sm font-semibold">45%</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Duration</p>
                <p className="text-sm">22 min / 45 min est</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Started</p>
                <p className="text-sm">22 min ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge tone="neutral">Running</StatusBadge>
              <div className="flex gap-1">
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <Pause size={16} />
                </button>
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <GitBranch size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E8F5D3]">
                <CheckCircle size={20} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Search Index Sync</p>
                <p className="text-xs text-[#66706A]">PostgreSQL → OpenSearch synchronization</p>
              </div>
            </div>
            
            <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Records</p>
                <p className="text-sm">8,234 synced</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Duration</p>
                <p className="text-sm">3 min 45 sec</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Completed</p>
                <p className="text-sm">5 min ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge tone="positive">Completed</StatusBadge>
              <div className="flex gap-1">
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <Play size={16} />
                </button>
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <GitBranch size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Definitions */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Workflow definitions</p>
            <h2 className="mt-2 font-display text-2xl">Configured pipelines</h2>
          </div>
          <Link href="/data-operator/pipelines/definitions" className="text-sm font-semibold text-[#173D2B]">
            Manage all <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Database size={18} className="text-[#31551C]" />
              <p className="text-sm font-semibold">Data Ingestion Pipeline</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Provider → Raw Storage → Normalization</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">5 stages</span>
              <StatusBadge tone="positive">Active</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-[#315A6B]" />
              <p className="text-sm font-semibold">Entity Resolution Pipeline</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Normalization → Matching → Resolution</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">4 stages</span>
              <StatusBadge tone="positive">Active</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#745F35]" />
              <p className="text-sm font-semibold">Valuation Pipeline</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Properties → Valuation → Scoring</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">6 stages</span>
              <StatusBadge tone="positive">Active</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Workflow size={18} className="text-[#66706A]" />
              <p className="text-sm font-semibold">Search Index Pipeline</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Canonical → Index → Sync</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">3 stages</span>
              <StatusBadge tone="positive">Active</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <GitBranch size={18} className="text-[#66706A]" />
              <p className="text-sm font-semibold">Matching Pipeline</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Valuations → Investors → Matches</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">4 stages</span>
              <StatusBadge tone="positive">Active</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#66706A]" />
              <p className="text-sm font-semibold">Data Quality Pipeline</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Sampling → Validation → Reporting</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">3 stages</span>
              <StatusBadge tone="positive">Active</StatusBadge>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Schedule */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Pipeline schedule</h2>
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <Clock size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Daily Property Ingestion</p>
                <p className="text-xs text-[#66706A]">Runs every 6 hours</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">Next run: 2:00 AM</p>
              <p className="text-xs text-[#66706A]">UTC</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F0F4]">
                <Clock size={16} className="text-[#315A6B]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Valuation Batch Processing</p>
                <p className="text-xs text-[#66706A]">Runs every 4 hours</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">Next run: 4:00 AM</p>
              <p className="text-xs text-[#66706A]">UTC</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3EBDD]">
                <Clock size={16} className="text-[#745F35]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Data Quality Checks</p>
                <p className="text-xs text-[#66706A]">Runs daily at 6:00 AM</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">Next run: 6:00 AM</p>
              <p className="text-xs text-[#66706A]">UTC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Performance */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Pipeline performance (last 7 days)</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Total Runs</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">168</p>
            <p className="mt-1 text-xs text-[#66706A]">24 pipelines × 7 days</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <p className="text-xs font-semibold text-[#315A6B]">Success Rate</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">97.8%</p>
            <p className="mt-1 text-xs text-[#66706A]">+1.2% improvement</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <p className="text-xs font-semibold text-[#745F35]">Avg Runtime</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">18 min</p>
            <p className="mt-1 text-xs text-[#66706A]">-3 min faster</p>
          </div>
          <div className="rounded-md bg-[#E8EBE8] p-4">
            <p className="text-xs font-semibold text-[#66706A]">On-Time Rate</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">99.2%</p>
            <p className="mt-1 text-xs text-[#66706A]">Schedule adherence</p>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
