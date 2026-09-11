import Link from 'next/link';
import { FileText, RefreshCw, Filter, CheckCircle, AlertTriangle, Activity, Layers, ArrowRight, Settings, Zap, Database, TrendingUp } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';

export default function NormalizationPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Data normalization"
      title="Address and field normalization"
      description="Monitor data normalization processes, address standardization, and field mapping rules."
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
      {/* Normalization Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Records Normalized</p>
          <p className="mt-2 font-display text-2xl">1.8M</p>
          <p className="mt-1 text-xs text-[#66706A]">Today's processing</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Success Rate</p>
          <p className="mt-2 font-display text-2xl">99.4%</p>
          <p className="mt-1 text-xs text-[#66706A]">Normalization success</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Active Rules</p>
          <p className="mt-2 font-display text-2xl">47</p>
          <p className="mt-1 text-xs text-[#66706A]">Normalization rules</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Processing Time</p>
          <p className="mt-2 font-display text-2xl">2.3s</p>
          <p className="mt-1 text-xs text-[#66706A]">Avg per 1K records</p>
        </div>
      </section>

      {/* Normalization Categories */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Normalization categories</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-[#31551C]" />
              <p className="text-sm font-semibold">Address Normalization</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Standardize addresses, abbreviations, and formatting</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">12 rules active</span>
              <StatusBadge tone="positive">Healthy</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Database size={18} className="text-[#315A6B]" />
              <p className="text-sm font-semibold">Field Mapping</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Map provider fields to canonical schema</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">23 mappings active</span>
              <StatusBadge tone="positive">Healthy</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Settings size={18} className="text-[#745F35]" />
              <p className="text-sm font-semibold">Data Type Conversion</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Convert data types and units</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">8 rules active</span>
              <StatusBadge tone="positive">Healthy</StatusBadge>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-[#66706A]" />
              <p className="text-sm font-semibold">Geographic Normalization</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Standardize coordinates and geographic data</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#66706A]">4 rules active</span>
              <StatusBadge tone="positive">Healthy</StatusBadge>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Normalization Jobs */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Recent normalization jobs</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          <div className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E8F5D3]">
                <CheckCircle size={20} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">County Tax Records - Batch Normalization</p>
                <p className="text-xs text-[#66706A]">Address standardization</p>
              </div>
            </div>
            
            <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Records</p>
                <p className="text-sm">45,230 processed</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Success Rate</p>
                <p className="text-sm">99.8%</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Duration</p>
                <p className="text-sm">2 min 15 sec</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Completed</p>
                <p className="text-sm">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge tone="positive">Completed</StatusBadge>
              <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                <FileText size={16} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E8F5D3]">
                <CheckCircle size={20} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">MLS Listings - Field Mapping</p>
                <p className="text-xs text-[#66706A]">Schema alignment</p>
              </div>
            </div>
            
            <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Records</p>
                <p className="text-sm">8,934 processed</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Success Rate</p>
                <p className="text-sm">99.2%</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Duration</p>
                <p className="text-sm">45 sec</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Completed</p>
                <p className="text-sm">3 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge tone="positive">Completed</StatusBadge>
              <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                <FileText size={16} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E7F0F4]">
                <Activity size={20} className="text-[#315A6B]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Geographic Data - Coordinate Normalization</p>
                <p className="text-xs text-[#66706A]">Spatial data standardization</p>
              </div>
            </div>
            
            <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Records</p>
                <p className="text-sm">15,000 processing</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Progress</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 w-16 rounded-full bg-[#E8EBE8]">
                    <div className="h-2 rounded-full bg-[#31551C]" style={{ width: '56%' }} />
                  </div>
                  <span className="text-sm font-semibold">56%</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#9AA8A0]">Started</p>
                <p className="text-sm">25 min ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge tone="neutral">In Progress</StatusBadge>
              <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                <Activity size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Normalization Rules */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Configuration</p>
            <h2 className="mt-2 font-display text-2xl">Active normalization rules</h2>
          </div>
          <Link href="/data-operator/normalization/rules" className="text-sm font-semibold text-[#173D2B]">
            Manage rules <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <CheckCircle size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Street Abbreviation Expansion</p>
                <p className="text-xs text-[#66706A]">St → Street, Ave → Avenue, Blvd → Boulevard</p>
              </div>
            </div>
            <StatusBadge tone="positive">Active</StatusBadge>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <CheckCircle size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">State Code Standardization</p>
                <p className="text-xs text-[#66706A]">Texas → TX, California → CA</p>
              </div>
            </div>
            <StatusBadge tone="positive">Active</StatusBadge>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <CheckCircle size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">ZIP Code Formatting</p>
                <p className="text-xs text-[#66706A]">5-digit and 9-digit ZIP standardization</p>
              </div>
            </div>
            <StatusBadge tone="positive">Active</StatusBadge>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <CheckCircle size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Numeric Field Validation</p>
                <p className="text-xs text-[#66706A]">Price, square footage, year validation</p>
              </div>
            </div>
            <StatusBadge tone="positive">Active</StatusBadge>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Performance metrics (last 24 hours)</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Throughput</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">45.2K/hr</p>
            <p className="mt-1 text-xs text-[#66706A]">Records per hour</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <p className="text-xs font-semibold text-[#315A6B]">Avg Latency</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">120ms</p>
            <p className="mt-1 text-xs text-[#66706A]">Per record</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <p className="text-xs font-semibold text-[#745F35]">Error Rate</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">0.6%</p>
            <p className="mt-1 text-xs text-[#66706A]">Normalization failures</p>
          </div>
          <div className="rounded-md bg-[#E8EBE8] p-4">
            <p className="text-xs font-semibold text-[#66706A]">Queue Depth</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">2</p>
            <p className="mt-1 text-xs text-[#66706A]">Pending jobs</p>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
