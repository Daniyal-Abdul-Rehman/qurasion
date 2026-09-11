import Link from 'next/link';
import { Layers, CheckCircle, AlertTriangle, Search, Filter, Eye, Check, X, Building2, ArrowRight } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';
import { entityResolutions } from '../../../lib/data-operator-data';

export default function EntityResolutionPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Entity resolution"
      title="Property resolution review"
      description="Review and approve entity resolution decisions where automated matching requires manual intervention."
      action={
        <div className="flex gap-3">
          <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Search size={16} /> Search
          </button>
          <button className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Filter size={16} /> Filter
          </button>
        </div>
      }
    >
      {/* Resolution Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Pending Review</p>
          <p className="mt-2 font-display text-2xl">{entityResolutions.filter(r => r.requiresReview).length}</p>
          <p className="mt-1 text-xs text-[#66706A]">Requires manual review</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Auto-Resolved</p>
          <p className="mt-2 font-display text-2xl">{entityResolutions.filter(r => r.status === 'Auto-Resolved').length}</p>
          <p className="mt-1 text-xs text-[#66706A]">High confidence matches</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Avg Confidence</p>
          <p className="mt-2 font-display text-2xl">{(entityResolutions.reduce((acc, r) => acc + r.confidence, 0) / entityResolutions.length * 100).toFixed(0)}%</p>
          <p className="mt-1 text-xs text-[#66706A]">Across all resolutions</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Properties</p>
          <p className="mt-2 font-display text-2xl">{entityResolutions.length}</p>
          <p className="mt-1 text-xs text-[#66706A]">In resolution queue</p>
        </div>
      </section>

      {/* Pending Reviews */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Pending manual review</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          {entityResolutions.filter(r => r.requiresReview).map((resolution) => (
            <div key={resolution.id} className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
              <div className="flex shrink-0 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FFF8E6]">
                  <Layers size={20} className="text-[#B8860B]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{resolution.address}</p>
                  <p className="text-xs text-[#66706A]">{resolution.propertyId}</p>
                </div>
              </div>
              
              <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Confidence</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-[#E8EBE8]">
                      <div 
                        className="h-2 rounded-full bg-[#B8860B]" 
                        style={{ width: `${resolution.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{(resolution.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Source Records</p>
                  <p className="text-sm">{resolution.sourceRecords} providers</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Status</p>
                  <StatusBadge tone="warning">
                    {resolution.status}
                  </StatusBadge>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Last Updated</p>
                  <p className="text-sm">{resolution.lastUpdated}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="btn-primary flex items-center gap-2 px-3 py-2 text-sm">
                  <Eye size={14} /> Review
                </button>
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Auto-Resolved */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Recently auto-resolved</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          {entityResolutions.filter(r => !r.requiresReview).slice(0, 3).map((resolution) => (
            <div key={resolution.id} className="flex items-center gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E8F5D3]">
                <CheckCircle size={20} className="text-[#31551C]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{resolution.address}</p>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#66706A]">
                  <span>{resolution.propertyId}</span>
                  <span>•</span>
                  <span>{resolution.sourceRecords} sources</span>
                  <span>•</span>
                  <span>{(resolution.confidence * 100).toFixed(0)}% confidence</span>
                </div>
              </div>
              <div className="text-right">
                <StatusBadge tone="positive">
                  {resolution.status}
                </StatusBadge>
                <p className="mt-1 text-xs text-[#66706A]">{resolution.lastUpdated}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#E8EBE8] p-4 text-center">
          <Link href="/data-operator/entity-resolution/history" className="text-sm font-semibold text-[#173D2B]">
            View all auto-resolved <ArrowRight className="ml-1 inline" size={14} />
          </Link>
        </div>
      </section>

      {/* Resolution Guidelines */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Resolution guidelines</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md bg-[#E8F5D3] p-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-[#31551C]" />
              <p className="text-sm font-semibold text-[#173D2B]">High Confidence (90%+)</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Auto-approve when multiple sources agree with high confidence scores</p>
          </div>
          <div className="rounded-md bg-[#FFF8E6] p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-[#B8860B]" />
              <p className="text-sm font-semibold text-[#745F35]">Medium Confidence (70-89%)</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Manual review required when confidence is moderate</p>
          </div>
          <div className="rounded-md bg-[#FEE2E2] p-4">
            <div className="flex items-center gap-2">
              <X size={18} className="text-[#DC2626]" />
              <p className="text-sm font-semibold text-[#DC2626]">Low Confidence (&lt;70%)</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Always require manual review and possibly quarantine</p>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
