import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, Database, Activity, Layers, Clock, HardDrive, Server, RefreshCw } from 'lucide-react';
import { MetricCard } from '../../../components/molecules';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';
import { dataOperatorMetrics, dataProviders, dataIngestions, entityResolutions, backgroundJobs } from '../../../lib/data-operator-data';

export default function DataOperatorDashboardPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Data operations workspace"
      title="Good morning, Data Operator."
      description="Monitor data ingestion, provider health, and system performance."
      action={
        <div className="flex gap-3">
          <Link href="/data-operator/ingestion" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Activity size={16} /> View Ingestions
          </Link>
          <Link href="/data-operator/jobs" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Clock size={16} /> Background Jobs
          </Link>
        </div>
      }
    >
      {/* Primary KPIs */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-5 lg:p-6">
        <MetricCard label="Active Providers" value={dataOperatorMetrics.activeProviders.toString()} detail={`${dataOperatorMetrics.totalProviders} total`} icon={Database} />
        <MetricCard label="Today's Ingestions" value={dataOperatorMetrics.todayIngestions.toString()} detail={`${dataOperatorMetrics.successfulIngestions} successful`} icon={Activity} accent="blue" />
        <MetricCard label="Pending Reviews" value={dataOperatorMetrics.pendingReviews.toString()} detail="Entity resolution" icon={Layers} accent="warning" />
        <MetricCard label="Active Jobs" value={dataOperatorMetrics.runningJobs.toString()} detail={`${dataOperatorMetrics.queuedJobs} queued`} icon={Clock} accent="blue" />
        <MetricCard label="Total Records" value={dataOperatorMetrics.totalRecords} detail="Canonical properties" icon={HardDrive} />
      </section>

      {/* System Health & Quality */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">System Health</p>
          <div className="mt-2 flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${dataOperatorMetrics.systemHealth === 'healthy' ? 'bg-[#31551C]' : 'bg-[#B8860B]'}`} />
            <p className="font-display text-2xl capitalize">{dataOperatorMetrics.systemHealth}</p>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">All systems operational</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Data Quality Score</p>
          <p className="mt-2 font-display text-2xl">{dataOperatorMetrics.dataQualityScore}%</p>
          <p className="mt-1 text-xs text-[#66706A]">+0.3% this week</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Failed Jobs</p>
          <p className="mt-2 font-display text-2xl">{dataOperatorMetrics.failedJobs}</p>
          <p className="mt-1 text-xs text-[#66706A]">Requires attention</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Search Index</p>
          <p className="mt-2 font-display text-2xl">Current</p>
          <p className="mt-1 text-xs text-[#66706A]">Last sync: 15 min ago</p>
        </div>
      </section>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        {/* Data Providers Status */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Data sources</p>
              <h2 className="mt-2 font-display text-2xl">Provider status</h2>
            </div>
            <Link href="/data-operator/providers" className="text-sm font-semibold text-[#173D2B]">
              Manage all <ArrowRight className="ml-1 inline" size={15} />
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[#E8EBE8]">
            {dataProviders.slice(0, 4).map((provider) => (
              <div key={provider.id} className="flex items-center gap-3 py-4 first:pt-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E7F0E5]">
                  <Database size={18} className="text-[#31551C]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{provider.name}</p>
                  <p className="mt-1 text-xs text-[#66706A]">{provider.type} • {provider.deliveryFrequency}</p>
                </div>
                <div className="text-right">
                  <StatusBadge tone={provider.health === 'healthy' ? 'positive' : 'warning'}>
                    {provider.health}
                  </StatusBadge>
                  <p className="mt-1 text-xs text-[#66706A]">{provider.lastDelivery}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Ingestions */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Data pipeline</p>
              <h2 className="mt-2 font-display text-2xl">Recent ingestions</h2>
            </div>
            <Link href="/data-operator/ingestion" className="text-sm font-semibold text-[#173D2B]">
              View all <ArrowRight className="ml-1 inline" size={15} />
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {dataIngestions.slice(0, 4).map((ingestion) => (
              <div key={ingestion.id} className="flex items-start gap-3 rounded-md bg-[#F0F2F0] p-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${ingestion.status === 'Completed' ? 'bg-[#E8F5D3]' : ingestion.status === 'Failed' ? 'bg-[#FEE2E2]' : 'bg-[#E7F0F4]'}`}>
                  {ingestion.status === 'Completed' ? <CheckCircle size={15} className="text-[#31551C]" /> : ingestion.status === 'Failed' ? <AlertTriangle size={15} className="text-[#DC2626]" /> : <RefreshCw size={15} className="text-[#315A6B]" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{ingestion.provider}</p>
                  <p className="mt-1 text-xs text-[#66706A]">{ingestion.dataset}</p>
                </div>
                <div className="text-right">
                  <StatusBadge tone={ingestion.status === 'Completed' ? 'positive' : ingestion.status === 'Failed' ? 'negative' : 'neutral'}>
                    {ingestion.status}
                  </StatusBadge>
                  <p className="mt-1 text-xs text-[#66706A]">{ingestion.recordsProcessed.toLocaleString()} records</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Entity Resolution & Background Jobs */}
      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {/* Entity Resolution Queue */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Entity resolution</p>
              <h2 className="mt-2 font-display text-2xl">Review queue</h2>
            </div>
            <Link href="/data-operator/entity-resolution" className="text-sm font-semibold text-[#173D2B]">
              Review all <ArrowRight className="ml-1 inline" size={15} />
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[#E8EBE8]">
            {entityResolutions.filter(r => r.requiresReview).slice(0, 3).map((resolution) => (
              <div key={resolution.id} className="flex items-center gap-3 py-4 first:pt-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#FFF8E6]">
                  <Layers size={18} className="text-[#B8860B]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{resolution.address}</p>
                  <p className="mt-1 text-xs text-[#66706A]">Confidence: {(resolution.confidence * 100).toFixed(0)}% • {resolution.sourceRecords} sources</p>
                </div>
                <div className="text-right">
                  <StatusBadge tone="warning">
                    {resolution.status}
                  </StatusBadge>
                  <p className="mt-1 text-xs text-[#66706A]">{resolution.lastUpdated}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Background Jobs */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Background processing</p>
              <h2 className="mt-2 font-display text-2xl">Active jobs</h2>
            </div>
            <Link href="/data-operator/jobs" className="text-sm font-semibold text-[#173D2B]">
              Monitor all <ArrowRight className="ml-1 inline" size={15} />
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {backgroundJobs.filter(j => j.status !== 'Completed').slice(0, 4).map((job) => (
              <div key={job.id} className="flex items-start gap-3 rounded-md bg-[#F0F2F0] p-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${job.status === 'In Progress' ? 'bg-[#E7F0F4]' : job.status === 'Failed' ? 'bg-[#FEE2E2]' : 'bg-[#E8EBE8]'}`}>
                  {job.status === 'In Progress' ? <RefreshCw size={15} className="text-[#315A6B]" /> : job.status === 'Failed' ? <AlertTriangle size={15} className="text-[#DC2626]" /> : <Clock size={15} className="text-[#66706A]" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{job.jobType}</p>
                  <p className="mt-1 text-xs text-[#66706A]">{job.priority} priority</p>
                </div>
                <div className="text-right">
                  <StatusBadge tone={job.status === 'In Progress' ? 'neutral' : job.status === 'Failed' ? 'negative' : 'muted'}>
                    {job.status}
                  </StatusBadge>
                  <p className="mt-1 text-xs text-[#66706A]">{job.recordsProcessed.toLocaleString()} processed</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DataOperatorPageShell>
  );
}
