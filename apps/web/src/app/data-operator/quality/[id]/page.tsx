'use client';

import { ArrowLeft, RefreshCw, Play, AlertTriangle, CheckCircle, FileText, TrendingUp, Shield, Clock, Filter, Download, Eye, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton, StatusBadge } from '../../../../components/atoms';
import DataOperatorPageShell from '../../../../components/organisms/DataOperatorPageShell';

export default function QualityCheckDetailPage() {
  // Mock quality check data - in production this would come from API
  const qualityCheck = {
    id: 'quality-3',
    checkType: 'Geographic Plausibility',
    category: 'Coordinates',
    status: 'Warning',
    lastRun: 'Sep 11, 2026 06:00 AM',
    recordsChecked: 120000,
    recordsFailed: 156,
    failureRate: '0.13%',
    threshold: '0.10%',
    description: 'Validates that geographic coordinates fall within expected geographic boundaries for the given state and service territory.',
    severity: 'medium',
    autoRemediation: false
  };

  const recentRuns = [
    { id: 'run-1', timestamp: 'Sep 11, 2026 06:00 AM', status: 'Warning', recordsChecked: 120000, recordsFailed: 156, failureRate: '0.13%', duration: '8 min' },
    { id: 'run-2', timestamp: 'Sep 10, 2026 06:00 AM', status: 'Passed', recordsChecked: 118500, recordsFailed: 98, failureRate: '0.08%', duration: '7 min' },
    { id: 'run-3', timestamp: 'Sep 9, 2026 06:00 AM', status: 'Passed', recordsChecked: 119200, recordsFailed: 112, failureRate: '0.09%', duration: '8 min' },
    { id: 'run-4', timestamp: 'Sep 8, 2026 06:00 AM', status: 'Passed', recordsChecked: 117800, recordsFailed: 89, failureRate: '0.08%', duration: '7 min' },
  ];

  const failedRecords = [
    { id: 'P123456', address: '1234 Main St, Dallas, TX 75201', issue: 'Coordinates outside Texas boundary', latitude: 32.7767, longitude: -96.7970, severity: 'high' },
    { id: 'P234567', address: '5678 Oak Ave, Austin, TX 78701', issue: 'Invalid ZIP code for coordinates', latitude: 30.2672, longitude: -97.7431, severity: 'medium' },
    { id: 'P345678', address: '910 Pine Rd, Houston, TX 77002', issue: 'Coordinates in ocean area', latitude: 29.7604, longitude: -95.3698, severity: 'high' },
  ];

  const trends = {
    last7Days: { passed: 6, warning: 1, failed: 0, avgFailureRate: '0.09%' },
    last30Days: { passed: 28, warning: 2, failed: 0, avgFailureRate: '0.11%' },
    last90Days: { passed: 85, warning: 5, failed: 0, avgFailureRate: '0.12%' }
  };

  return (
    <DataOperatorPageShell
      eyebrow="Data quality"
      title={`Quality Check ${qualityCheck.id}`}
      description="View detailed quality check results, failed records, and historical performance."
      action={
        <div className="flex gap-3">
          <Link href="/data-operator/quality" className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <ArrowLeft size={16} /> Back to Quality
          </Link>
          <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <RefreshCw size={16} /> Run Check Now
          </button>
        </div>
      }
    >
      {/* Check Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Status</p>
          <div className="mt-2">
            <StatusBadge tone={qualityCheck.status === 'Passed' ? 'positive' : qualityCheck.status === 'Warning' ? 'warning' : 'negative'}>
              {qualityCheck.status}
            </StatusBadge>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">Last run result</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Failure Rate</p>
          <p className="mt-2 font-display text-2xl">{qualityCheck.failureRate}</p>
          <p className="mt-1 text-xs text-[#DC2626]">Threshold: {qualityCheck.threshold}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Records Checked</p>
          <p className="mt-2 font-display text-2xl">{qualityCheck.recordsChecked.toLocaleString()}</p>
          <p className="mt-1 text-xs text-[#66706A]">Total records</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Records Failed</p>
          <p className="mt-2 font-display text-2xl text-[#DC2626]">{qualityCheck.recordsFailed.toLocaleString()}</p>
          <p className="mt-1 text-xs text-[#66706A]">Requires attention</p>
        </div>
      </section>

      {/* Check Details */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Check details</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Check Type</p>
            <p className="mt-1 text-sm font-semibold">{qualityCheck.checkType}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Category</p>
            <p className="mt-1 text-sm font-semibold">{qualityCheck.category}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Severity</p>
            <p className="mt-1 text-sm font-semibold capitalize">{qualityCheck.severity}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Last Run</p>
            <p className="mt-1 text-sm font-semibold">{qualityCheck.lastRun}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Auto-Remediation</p>
            <p className="mt-1 text-sm font-semibold">{qualityCheck.autoRemediation ? 'Enabled' : 'Disabled'}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Threshold</p>
            <p className="mt-1 text-sm font-semibold">{qualityCheck.threshold}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[10px] uppercase text-[#9AA8A0]">Description</p>
          <p className="mt-1 text-sm text-[#66706A]">{qualityCheck.description}</p>
        </div>
      </section>

      {/* Recent Runs */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Recent runs</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          {recentRuns.map((run) => (
            <div key={run.id} className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
              <div className="flex shrink-0 items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-md ${run.status === 'Passed' ? 'bg-[#E8F5D3]' : run.status === 'Warning' ? 'bg-[#FFF8E6]' : 'bg-[#FEE2E2]'}`}>
                  {run.status === 'Passed' ? <CheckCircle size={20} className="text-[#31551C]" /> : <AlertTriangle size={20} className="text-[#B8860B]" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{run.timestamp}</p>
                  <p className="text-xs text-[#66706A]">Duration: {run.duration}</p>
                </div>
              </div>
              
              <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Records Checked</p>
                  <p className="text-sm">{run.recordsChecked.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Records Failed</p>
                  <p className={`text-sm ${run.recordsFailed > 0 ? 'text-[#DC2626]' : ''}`}>{run.recordsFailed.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Failure Rate</p>
                  <p className={`text-sm ${run.status !== 'Passed' ? 'text-[#DC2626]' : ''}`}>{run.failureRate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge tone={run.status === 'Passed' ? 'positive' : 'warning'}>
                  {run.status}
                </StatusBadge>
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Failed Records */}
      {qualityCheck.recordsFailed > 0 && (
        <section className="mt-6 rounded-lg border border-[#FEE2E2] bg-[#FEF2F2]">
          <div className="border-b border-[#FECACA] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="text-[#DC2626]" />
              <h2 className="font-display text-xl text-[#DC2626]">Failed records</h2>
            </div>
          </div>
          <div className="divide-y divide-[#FECACA]">
            {failedRecords.map((record) => (
              <div key={record.id} className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#FEF2F2] sm:flex-row sm:items-center sm:gap-6">
                <div className="flex shrink-0 items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-md ${record.severity === 'high' ? 'bg-[#FEE2E2]' : 'bg-[#FFF8E6]'}`}>
                    <AlertTriangle size={20} className={record.severity === 'high' ? 'text-[#DC2626]' : 'text-[#B8860B]'} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{record.address}</p>
                    <p className="text-xs text-[#66706A]">{record.id}</p>
                  </div>
                </div>
                
                <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
                  <div>
                    <p className="text-[10px] uppercase text-[#9AA8A0]">Issue</p>
                    <p className="text-sm text-[#DC2626]">{record.issue}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-[#9AA8A0]">Coordinates</p>
                    <p className="text-sm font-mono text-xs">{record.latitude}, {record.longitude}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-[#9AA8A0]">Severity</p>
                    <p className="text-sm capitalize">{record.severity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                    <Eye size={16} />
                  </button>
                  <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Performance Trends */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <TrendingUp size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Performance trends</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold text-[#9AA8A0]">Last 7 Days</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="font-display text-xl">{trends.last7Days.avgFailureRate}</p>
                <p className="text-xs text-[#66706A]">Avg failure rate</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#31551C]">{trends.last7Days.passed} passed</p>
                <p className="text-xs text-[#B8860B]">{trends.last7Days.warning} warning</p>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold text-[#9AA8A0]">Last 30 Days</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="font-display text-xl">{trends.last30Days.avgFailureRate}</p>
                <p className="text-xs text-[#66706A]">Avg failure rate</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#31551C]">{trends.last30Days.passed} passed</p>
                <p className="text-xs text-[#B8860B]">{trends.last30Days.warning} warning</p>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold text-[#9AA8A0]">Last 90 Days</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="font-display text-xl">{trends.last90Days.avgFailureRate}</p>
                <p className="text-xs text-[#66706A]">Avg failure rate</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#31551C]">{trends.last90Days.passed} passed</p>
                <p className="text-xs text-[#B8860B]">{trends.last90Days.warning} warning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Quick actions</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <Play size={18} className="text-[#31551C]" />
            <div>
              <p className="text-sm font-semibold">Run Check Now</p>
              <p className="text-xs text-[#66706A]">Execute immediately</p>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <FileText size={18} className="text-[#315A6B]" />
            <div>
              <p className="text-sm font-semibold">Export Results</p>
              <p className="text-xs text-[#66706A]">Download CSV report</p>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <Filter size={18} className="text-[#745F35]" />
            <div>
              <p className="text-sm font-semibold">Filter Records</p>
              <p className="text-xs text-[#66706A]">Apply custom filters</p>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <BarChart3 size={18} className="text-[#66706A]" />
            <div>
              <p className="text-sm font-semibold">View Analytics</p>
              <p className="text-xs text-[#66706A]">Detailed metrics</p>
            </div>
          </button>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}