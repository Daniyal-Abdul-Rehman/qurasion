import Link from 'next/link';
import { CheckCircle, AlertTriangle, RefreshCw, Filter, TrendingUp, Shield, AlertOctagon, FileText, Clock } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';
import { dataQualityChecks } from '../../../lib/data-operator-data';

export default function DataQualityPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Data quality"
      title="Quality monitoring"
      description="Monitor data quality checks, identify issues, and ensure data integrity across the platform."
      action={
        <div className="flex gap-3">
          <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <RefreshCw size={16} /> Run Checks
          </button>
          <button className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Filter size={16} /> Filter
          </button>
        </div>
      }
    >
      {/* Quality Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Overall Score</p>
          <p className="mt-2 font-display text-2xl">98.5%</p>
          <p className="mt-1 text-xs text-[#66706A]">+0.3% this week</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Checks Passed</p>
          <p className="mt-2 font-display text-2xl">{dataQualityChecks.filter(c => c.status === 'Passed').length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Out of {dataQualityChecks.length} total</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Warnings</p>
          <p className="mt-2 font-display text-2xl">{dataQualityChecks.filter(c => c.status === 'Warning').length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Requires attention</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Failed</p>
          <p className="mt-2 font-display text-2xl">{dataQualityChecks.filter(c => c.status === 'Failed').length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Critical issues</p>
        </div>
      </section>

      {/* Quality Checks */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Data quality checks</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          {dataQualityChecks.map((check) => (
            <div key={check.id} className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
              <div className="flex shrink-0 items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-md ${check.status === 'Passed' ? 'bg-[#E8F5D3]' : check.status === 'Warning' ? 'bg-[#FFF8E6]' : 'bg-[#FEE2E2]'}`}>
                  {check.status === 'Passed' ? <CheckCircle size={20} className="text-[#31551C]" /> : check.status === 'Warning' ? <AlertTriangle size={20} className="text-[#B8860B]" /> : <AlertOctagon size={20} className="text-[#DC2626]" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{check.checkType}</p>
                  <p className="text-xs text-[#66706A]">{check.category}</p>
                </div>
              </div>
              
              <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Records Checked</p>
                  <p className="text-sm">{check.recordsChecked.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Records Failed</p>
                  <p className={`text-sm ${check.recordsFailed > 0 ? 'text-[#DC2626]' : ''}`}>{check.recordsFailed.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Failure Rate</p>
                  <p className={`text-sm ${check.recordsFailed > 0 ? 'text-[#DC2626]' : ''}`}>{check.failureRate}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Last Run</p>
                  <p className="text-sm">{check.lastRun}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge tone={check.status === 'Passed' ? 'positive' : check.status === 'Warning' ? 'warning' : 'negative'}>
                  {check.status}
                </StatusBadge>
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <FileText size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Trends */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Quality trends (last 30 days)</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#31551C]" />
              <p className="text-xs font-semibold text-[#31551C]">Completeness</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">99.2%</p>
            <p className="mt-1 text-xs text-[#66706A]">+0.8% improvement</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-[#315A6B]" />
              <p className="text-xs font-semibold text-[#315A6B]">Validity</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">97.8%</p>
            <p className="mt-1 text-xs text-[#66706A]">+0.5% improvement</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#745F35]" />
              <p className="text-xs font-semibold text-[#745F35]">Freshness</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">94.5%</p>
            <p className="mt-1 text-xs text-[#66706A]">-1.2% decline</p>
          </div>
          <div className="rounded-md bg-[#E8EBE8] p-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#66706A]" />
              <p className="text-xs font-semibold text-[#66706A]">Uniqueness</p>
            </div>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">100%</p>
            <p className="mt-1 text-xs text-[#66706A]">No change</p>
          </div>
        </div>
      </section>

      {/* Quality Issues Alert */}
      {dataQualityChecks.filter(c => c.status !== 'Passed').length > 0 && (
        <section className="mt-6 rounded-lg border border-[#FFF8E6] bg-[#FFFCF5] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="mt-0.5 text-[#B8860B]" />
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-[#745F35]">Quality issues detected</h3>
              <p className="mt-2 text-sm text-[#66706A]">
                {dataQualityChecks.filter(c => c.status !== 'Passed').length} quality checks require attention. Geographic plausibility and provider freshness checks have detected anomalies that may need investigation.
              </p>
              <div className="mt-4 flex gap-3">
                <button className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
                  <RefreshCw size={14} /> Re-run Failed Checks
                </button>
                <button className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm">
                  <FileText size={14} /> View Details
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quality Check Categories */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Check categories</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold uppercase text-[#9AA8A0]">Completeness</p>
            <p className="mt-2 text-sm text-[#66706A]">Ensures required fields are present and populated</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#31551C]" style={{ width: '99%' }} />
              </div>
              <span className="text-xs font-semibold">99%</span>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold uppercase text-[#9AA8A0]">Validity</p>
            <p className="mt-2 text-sm text-[#66706A]">Validates data types, ranges, and formats</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#31551C]" style={{ width: '98%' }} />
              </div>
              <span className="text-xs font-semibold">98%</span>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold uppercase text-[#9AA8A0]">Consistency</p>
            <p className="mt-2 text-sm text-[#66706A]">Checks for logical consistency across fields</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#31551C]" style={{ width: '97%' }} />
              </div>
              <span className="text-xs font-semibold">97%</span>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold uppercase text-[#9AA8A0]">Uniqueness</p>
            <p className="mt-2 text-sm text-[#66706A]">Identifies duplicate records and IDs</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#31551C]" style={{ width: '100%' }} />
              </div>
              <span className="text-xs font-semibold">100%</span>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold uppercase text-[#9AA8A0]">Freshness</p>
            <p className="mt-2 text-sm text-[#66706A]">Monitors data recency and delivery schedules</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#B8860B]" style={{ width: '92%' }} />
              </div>
              <span className="text-xs font-semibold">92%</span>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold uppercase text-[#9AA8A0]">Geographic</p>
            <p className="mt-2 text-sm text-[#66706A]">Validates coordinates and spatial data</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#B8860B]" style={{ width: '95%' }} />
              </div>
              <span className="text-xs font-semibold">95%</span>
            </div>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
