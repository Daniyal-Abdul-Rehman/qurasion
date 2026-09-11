'use client';

import { ArrowLeft, RefreshCw, Play, Pause, Trash2, FileText, Clock, CheckCircle, AlertTriangle, Activity, MoreVertical, Zap, BarChart3, Cpu, HardDrive } from 'lucide-react';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton, StatusBadge } from '../../../../components/atoms';
import DataOperatorPageShell from '../../../../components/organisms/DataOperatorPageShell';

export default function JobDetailPage() {
  // Mock job data - in production this would come from API
  const job = {
    id: 'job-1',
    jobType: 'Valuation Calculation',
    status: 'Completed',
    priority: 'High',
    startedAt: 'Sep 11, 2026 07:00 AM',
    completedAt: 'Sep 11, 2026 07:45 AM',
    duration: '45 min',
    recordsProcessed: 5230,
    recordsTotal: 5230,
    error: null,
    workerId: 'worker-01',
    queue: 'valuation',
    retryCount: 0,
    maxRetries: 3
  };

  const jobSteps = [
    { name: 'Job queued', status: 'completed', timestamp: 'Sep 11, 2026 07:00 AM', duration: '0s' },
    { name: 'Data loading', status: 'completed', timestamp: 'Sep 11, 2026 07:05 AM', duration: '5 min' },
    { name: 'Valuation calculation', status: 'completed', timestamp: 'Sep 11, 2026 07:35 AM', duration: '30 min' },
    { name: 'Comparable analysis', status: 'completed', timestamp: 'Sep 11, 2026 07:40 AM', duration: '5 min' },
    { name: 'Result storage', status: 'completed', timestamp: 'Sep 11, 2026 07:45 AM', duration: '5 min' },
  ];

  const performanceMetrics = {
    cpuUsage: '45%',
    memoryUsage: '2.1 GB',
    diskIO: '125 MB/s',
    networkIO: '45 Mbps'
  };

  return (
    <DataOperatorPageShell
      eyebrow="Background jobs"
      title={`Job ${job.id}`}
      description="View detailed job information, execution progress, and performance metrics."
      action={
        <div className="flex gap-3">
          <Link href="/data-operator/jobs" className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <ArrowLeft size={16} /> Back to Jobs
          </Link>
          {job.status === 'Failed' && (
            <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
              <RefreshCw size={16} /> Retry Job
            </button>
          )}
          {job.status === 'In Progress' && (
            <button className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
              <Pause size={16} /> Pause Job
            </button>
          )}
          {job.status === 'Queued' && (
            <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
              <Play size={16} /> Start Job
            </button>
          )}
        </div>
      }
    >
      {/* Job Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Status</p>
          <div className="mt-2">
            <StatusBadge tone={job.status === 'Completed' ? 'positive' : job.status === 'In Progress' ? 'neutral' : job.status === 'Failed' ? 'negative' : 'muted'}>
              {job.status}
            </StatusBadge>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">Current job state</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Priority</p>
          <p className="mt-2 font-display text-2xl">{job.priority}</p>
          <p className="mt-1 text-xs text-[#66706A]">Queue priority</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Progress</p>
          <p className="mt-2 font-display text-2xl">{((job.recordsProcessed / job.recordsTotal) * 100).toFixed(0)}%</p>
          <p className="mt-1 text-xs text-[#66706A]">{job.recordsProcessed.toLocaleString()} / {job.recordsTotal.toLocaleString()} records</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Duration</p>
          <p className="mt-2 font-display text-2xl">{job.duration || 'In progress'}</p>
          <p className="mt-1 text-xs text-[#66706A]">Execution time</p>
        </div>
      </section>

      {/* Job Details */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Activity size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Job details</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Job Type</p>
            <p className="mt-1 text-sm font-semibold">{job.jobType}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Queue</p>
            <p className="mt-1 text-sm font-semibold">{job.queue}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Worker ID</p>
            <p className="mt-1 text-sm font-semibold">{job.workerId}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Started At</p>
            <p className="mt-1 text-sm font-semibold">{job.startedAt}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Completed At</p>
            <p className="mt-1 text-sm font-semibold">{job.completedAt || 'Not completed'}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Retry Count</p>
            <p className="mt-1 text-sm font-semibold">{job.retryCount} / {job.maxRetries}</p>
          </div>
        </div>
        {job.error && (
          <div className="mt-4 rounded-md border border-[#FEE2E2] bg-[#FEF2F2] p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-[#DC2626]" />
              <p className="text-sm font-semibold text-[#DC2626]">Error</p>
            </div>
            <p className="mt-2 text-sm text-[#66706A]">{job.error}</p>
          </div>
        )}
      </section>

      {/* Execution Progress */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Clock size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Execution progress</h2>
        </div>
        <div className="mt-5 space-y-4">
          {jobSteps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${step.status === 'completed' ? 'bg-[#E8F5D3]' : step.status === 'in_progress' ? 'bg-[#E7F0F4]' : 'bg-[#E8EBE8]'}`}>
                {step.status === 'completed' ? <CheckCircle size={16} className="text-[#31551C]" /> : step.status === 'in_progress' ? <Activity size={16} className="text-[#315A6B]" /> : <Clock size={16} className="text-[#66706A]" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{step.name}</p>
                  <p className="text-xs text-[#9AA8A0]">{step.timestamp}</p>
                </div>
                <p className="text-xs text-[#66706A]">Duration: {step.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <BarChart3 size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Performance metrics</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-[#31551C]" />
              <p className="text-xs font-semibold text-[#9AA8A0]">CPU Usage</p>
            </div>
            <p className="mt-2 font-display text-2xl">{performanceMetrics.cpuUsage}</p>
            <p className="mt-1 text-xs text-[#66706A]">Peak during execution</p>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <HardDrive size={16} className="text-[#315A6B]" />
              <p className="text-xs font-semibold text-[#9AA8A0]">Memory Usage</p>
            </div>
            <p className="mt-2 font-display text-2xl">{performanceMetrics.memoryUsage}</p>
            <p className="mt-1 text-xs text-[#66706A]">Peak allocation</p>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[#745F35]" />
              <p className="text-xs font-semibold text-[#9AA8A0]">Disk I/O</p>
            </div>
            <p className="mt-2 font-display text-2xl">{performanceMetrics.diskIO}</p>
            <p className="mt-1 text-xs text-[#66706A]">Average throughput</p>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#66706A]" />
              <p className="text-xs font-semibold text-[#9AA8A0]">Network I/O</p>
            </div>
            <p className="mt-2 font-display text-2xl">{performanceMetrics.networkIO}</p>
            <p className="mt-1 text-xs text-[#66706A]">Data transfer rate</p>
          </div>
        </div>
      </section>

      {/* Processing Statistics */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Processing statistics</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Records per Second</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">1.94</p>
            <p className="mt-1 text-xs text-[#66706A]">Processing throughput</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <p className="text-xs font-semibold text-[#315A6B]">Avg Record Size</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">2.4 KB</p>
            <p className="mt-1 text-xs text-[#66706A]">Data per record</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <p className="text-xs font-semibold text-[#745F35]">Total Data Processed</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">12.5 MB</p>
            <p className="mt-1 text-xs text-[#66706A]">Total volume</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Quick actions</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <FileText size={18} className="text-[#31551C]" />
            <div>
              <p className="text-sm font-semibold">View Logs</p>
              <p className="text-xs text-[#66706A]">Access execution logs</p>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <BarChart3 size={18} className="text-[#315A6B]" />
            <div>
              <p className="text-sm font-semibold">View Metrics</p>
              <p className="text-xs text-[#66706A]">Detailed performance data</p>
            </div>
          </button>
          {job.status === 'Completed' && (
            <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
              <RefreshCw size={18} className="text-[#745F35]" />
              <div>
                <p className="text-sm font-semibold">Rerun Job</p>
                <p className="text-xs text-[#66706A]">Execute with same parameters</p>
              </div>
            </button>
          )}
          <button className="flex items-center gap-3 rounded-md border border-[#FEE2E2] p-4 text-left hover:bg-[#FEF2F2]">
            <Trash2 size={18} className="text-[#DC2626]" />
            <div>
              <p className="text-sm font-semibold text-[#DC2626]">Delete Job</p>
              <p className="text-xs text-[#66706A]">Remove from history</p>
            </div>
          </button>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}