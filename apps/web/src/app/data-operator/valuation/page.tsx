import Link from 'next/link';
import { BarChart3, RefreshCw, Filter, TrendingUp, Clock, CheckCircle, AlertTriangle, Activity, DollarSign, Target, Zap, ArrowRight, Brain, FileText } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';

export default function ValuationJobsPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Valuation jobs"
      title="Property valuation monitoring"
      description="Monitor property valuation calculations, model performance, and comparable analysis jobs."
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
      {/* Valuation Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Valuations Today</p>
          <p className="mt-2 font-display text-2xl">5,234</p>
          <p className="mt-1 text-xs text-[#66706A]">Properties valued</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Avg Confidence</p>
          <p className="mt-2 font-display text-2xl">84.2%</p>
          <p className="mt-1 text-xs text-[#66706A]">Model confidence score</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Active Jobs</p>
          <p className="mt-2 font-display text-2xl">3</p>
          <p className="mt-1 text-xs text-[#66706A]">Currently processing</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Model Version</p>
          <p className="mt-2 font-display text-2xl">v2026.08.1</p>
          <p className="mt-1 text-xs text-[#66706A]">Active model</p>
        </div>
      </section>

      {/* Model Performance */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Model performance (last 30 days)</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-[#31551C]" />
              <p className="text-xs font-semibold text-[#31551C]">Accuracy</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">92.4%</p>
            <p className="mt-1 text-xs text-[#66706A]">+1.2% improvement</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#315A6B]" />
              <p className="text-xs font-semibold text-[#315A6B]">MAE</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">$8,420</p>
            <p className="mt-1 text-xs text-[#66706A]">Mean absolute error</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[#745F35]" />
              <p className="text-xs font-semibold text-[#745F35]">Processing Time</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">1.2s</p>
            <p className="mt-1 text-xs text-[#66706A]">Avg per property</p>
          </div>
          <div className="rounded-md bg-[#E8EBE8] p-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#66706A]" />
              <p className="text-xs font-semibold text-[#66706A]">Success Rate</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">99.1%</p>
            <p className="mt-1 text-xs text-[#66706A]">Successful valuations</p>
          </div>
        </div>
      </section>

      {/* Active Valuation Jobs */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Active valuation jobs</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          <div className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E7F0F4]">
                <RefreshCw size={20} className="text-[#315A6B]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Batch Valuation - Dallas Market</p>
                <p className="text-xs text-[#66706A]">High priority</p>
              </div>
            </div>
            
            <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Progress</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 w-24 rounded-full bg-[#E8EBE8]">
                    <div className="h-2 rounded-full bg-[#31551C]" style={{ width: '67%' }} />
                  </div>
                  <span className="text-sm font-semibold">67%</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Processed</p>
                <p className="text-sm">2,340 / 3,500</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Started</p>
                <p className="text-sm">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge tone="neutral">In Progress</StatusBadge>
              <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                <Activity size={16} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E7F0F4]">
                <RefreshCw size={20} className="text-[#315A6B]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Comparable Analysis - Austin</p>
                <p className="text-xs text-[#66706A]">Medium priority</p>
              </div>
            </div>
            
            <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Progress</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 w-24 rounded-full bg-[#E8EBE8]">
                    <div className="h-2 rounded-full bg-[#31551C]" style={{ width: '34%' }} />
                  </div>
                  <span className="text-sm font-semibold">34%</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Processed</p>
                <p className="text-sm">456 / 1,340</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Started</p>
                <p className="text-sm">45 min ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge tone="neutral">In Progress</StatusBadge>
              <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                <Activity size={16} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E8EBE8]">
                <Clock size={20} className="text-[#66706A]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Market Update - Houston</p>
                <p className="text-xs text-[#66706A]">Low priority</p>
              </div>
            </div>
            
            <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Status</p>
                <p className="text-sm">Queued</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Queue Position</p>
                <p className="text-sm">3rd in queue</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Estimated Start</p>
                <p className="text-sm">~15 min</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge tone="muted">Queued</StatusBadge>
              <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                <Activity size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Model Information */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Active model information</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-[#31551C]" />
              <p className="text-sm font-semibold">Model Name</p>
            </div>
            <p className="mt-2 text-sm">residential-value-model</p>
            <p className="mt-1 text-xs text-[#66706A]">Primary valuation model</p>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-[#315A6B]" />
              <p className="text-sm font-semibold">Version</p>
            </div>
            <p className="mt-2 text-sm">v2026.08.1</p>
            <p className="mt-1 text-xs text-[#66706A]">Released Aug 15, 2026</p>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-[#745F35]" />
              <p className="text-sm font-semibold">Training Data</p>
            </div>
            <p className="mt-2 text-sm">2.4M sales records</p>
            <p className="mt-1 text-xs text-[#66706A]">Last 5 years of data</p>
          </div>
        </div>
      </section>

      {/* Recent Valuations */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Recent activity</p>
            <h2 className="mt-2 font-display text-2xl">Latest valuations</h2>
          </div>
          <Link href="/data-operator/valuation/history" className="text-sm font-semibold text-[#173D2B]">
            View all <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
              <DollarSign size={15} className="text-[#31551C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">1824 Oak Street</p>
              <p className="mt-1 text-xs text-[#66706A]">Valued at $509,000 • 92% confidence</p>
              <p className="mt-1 text-xs text-[#66706A]">17 comparables used</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">5 min ago</p>
          </div>
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
              <DollarSign size={15} className="text-[#31551C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">741 Pine Avenue</p>
              <p className="mt-1 text-xs text-[#66706A]">Valued at $475,000 • 88% confidence</p>
              <p className="mt-1 text-xs text-[#66706A]">12 comparables used</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">12 min ago</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
              <DollarSign size={15} className="text-[#315A6B]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">92 Market Street</p>
              <p className="mt-1 text-xs text-[#66706A]">Valued at $620,000 • 76% confidence</p>
              <p className="mt-1 text-xs text-[#66706A]">8 comparables used</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">25 min ago</p>
          </div>
        </div>
      </section>

      {/* Valuation Management */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Valuation management</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <RefreshCw size={18} className="text-[#31551C]" />
              <p className="text-sm font-semibold">Revalue Properties</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Trigger revaluation for specific properties or markets</p>
            <button className="mt-3 btn-primary px-4 py-2 text-sm">
              Start Revaluation
            </button>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-[#315A6B]" />
              <p className="text-sm font-semibold">Model Retraining</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Initiate model retraining with latest data</p>
            <button className="mt-3 btn-secondary px-4 py-2 text-sm">
              Schedule Retraining
            </button>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
