'use client';

import { useState } from 'react';
import { ArrowLeft, Check, X, Eye, Layers, MapPin, Building2, DollarSign, AlertTriangle, CheckCircle, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton, StatusBadge } from '../../../../components/atoms';
import DataOperatorPageShell from '../../../../components/organisms/DataOperatorPageShell';

export default function EntityResolutionDetailPage() {
  const [resolutionDecision, setResolutionDecision] = useState<'approve' | 'reject' | 'quarantine' | null>(null);

  // Mock resolution data - in production this would come from API
  const resolution = {
    id: 'resolution-3',
    propertyId: 'P345678',
    address: '92 Market Street, Houston, TX 77002',
    confidence: 0.72,
    sourceRecords: 4,
    status: 'Pending Review',
    lastUpdated: 'Sep 11, 2026',
    requiresReview: true,
    resolutionVersion: 'v2.1.0',
    algorithmSignals: {
      addressMatch: 0.85,
      coordinateMatch: 0.45,
      parcelMatch: 0.78,
      attributeMatch: 0.82
    }
  };

  const sourceRecords = [
    {
      provider: 'County Tax Records',
      externalId: 'TX-HOU-2023-45678',
      address: '92 Market St, Houston, TX 77002',
      confidence: 0.92,
      lastSeen: 'Sep 10, 2026',
      fields: ['address', 'owner', 'tax_value', 'parcel_id']
    },
    {
      provider: 'MLS Listings',
      externalId: 'MLS-789456',
      address: '92 Market Street, Houston, TX 77002',
      confidence: 0.88,
      lastSeen: 'Sep 9, 2026',
      fields: ['address', 'listing_price', 'bedrooms', 'bathrooms', 'sqft']
    },
    {
      provider: 'Geographic Data',
      externalId: 'GEO-HOU-77002-92',
      address: '92 Market St, Houston, TX',
      confidence: 0.65,
      lastSeen: 'Sep 8, 2026',
      fields: ['coordinates', 'parcel_boundary', 'zoning']
    },
    {
      provider: 'Building Permits',
      externalId: 'PERMIT-HOU-2023-123',
      address: '92 Market Street',
      confidence: 0.45,
      lastSeen: 'Sep 5, 2026',
      fields: ['address', 'permit_type', 'issue_date', 'value']
    }
  ];

  const candidateProperties = [
    {
      propertyId: 'P345678',
      address: '92 Market Street, Houston, TX 77002',
      matchScore: 0.72,
      existingRecords: 2,
      lastUpdated: 'Sep 10, 2026'
    },
    {
      propertyId: 'P234567',
      address: '92 Market Street, Houston, TX 77002',
      matchScore: 0.65,
      existingRecords: 1,
      lastUpdated: 'Sep 8, 2026'
    },
    {
      propertyId: 'P123456',
      address: '94 Market Street, Houston, TX 77002',
      matchScore: 0.45,
      existingRecords: 3,
      lastUpdated: 'Sep 1, 2026'
    }
  ];

  const handleResolution = (decision: 'approve' | 'reject' | 'quarantine') => {
    setResolutionDecision(decision);
    // Handle resolution logic
    console.log('Resolution decision:', decision);
  };

  return (
    <DataOperatorPageShell
      eyebrow="Entity resolution"
      title={`Property Resolution ${resolution.id}`}
      description="Review and approve entity resolution decisions for property matching."
      action={
        <div className="flex gap-3">
          <Link href="/data-operator/entity-resolution" className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <ArrowLeft size={16} /> Back to Queue
          </Link>
        </div>
      }
    >
      {/* Resolution Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Confidence Score</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-16 rounded-full bg-[#E8EBE8]">
              <div className="h-2 rounded-full bg-[#B8860B]" style={{ width: `${resolution.confidence * 100}%` }} />
            </div>
            <span className="font-display text-2xl">{(resolution.confidence * 100).toFixed(0)}%</span>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">Medium confidence</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Source Records</p>
          <p className="mt-2 font-display text-2xl">{resolution.sourceRecords}</p>
          <p className="mt-1 text-xs text-[#66706A]">External providers</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Status</p>
          <div className="mt-2">
            <StatusBadge tone="warning">
              {resolution.status}
            </StatusBadge>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">Requires manual review</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Algorithm Version</p>
          <p className="mt-2 font-display text-2xl">{resolution.resolutionVersion}</p>
          <p className="mt-1 text-xs text-[#66706A]">Matching algorithm</p>
        </div>
      </section>

      {/* Address Information */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <MapPin size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Address information</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Property ID</p>
            <p className="mt-1 text-sm font-semibold">{resolution.propertyId}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Canonical Address</p>
            <p className="mt-1 text-sm font-semibold">{resolution.address}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Last Updated</p>
            <p className="mt-1 text-sm font-semibold">{resolution.lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Algorithm Signals */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Layers size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Algorithm signals</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold text-[#9AA8A0]">Address Match</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#31551C]" style={{ width: `${resolution.algorithmSignals.addressMatch * 100}%` }} />
              </div>
              <span className="text-sm font-semibold">{(resolution.algorithmSignals.addressMatch * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold text-[#9AA8A0]">Coordinate Match</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#B8860B]" style={{ width: `${resolution.algorithmSignals.coordinateMatch * 100}%` }} />
              </div>
              <span className="text-sm font-semibold">{(resolution.algorithmSignals.coordinateMatch * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold text-[#9AA8A0]">Parcel Match</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#31551C]" style={{ width: `${resolution.algorithmSignals.parcelMatch * 100}%` }} />
              </div>
              <span className="text-sm font-semibold">{(resolution.algorithmSignals.parcelMatch * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold text-[#9AA8A0]">Attribute Match</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#31551C]" style={{ width: `${resolution.algorithmSignals.attributeMatch * 100}%` }} />
              </div>
              <span className="text-sm font-semibold">{(resolution.algorithmSignals.attributeMatch * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Source Records */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Source records</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          {sourceRecords.map((record, index) => (
            <div key={index} className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
              <div className="flex shrink-0 items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-md ${record.confidence > 0.8 ? 'bg-[#E8F5D3]' : record.confidence > 0.6 ? 'bg-[#FFF8E6]' : 'bg-[#FEE2E2]'}`}>
                  <Building2 size={20} className={record.confidence > 0.8 ? 'text-[#31551C]' : record.confidence > 0.6 ? 'text-[#B8860B]' : 'text-[#DC2626]'} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{record.provider}</p>
                  <p className="text-xs text-[#66706A]">{record.externalId}</p>
                </div>
              </div>
              
              <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Address</p>
                  <p className="text-sm">{record.address}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Confidence</p>
                  <p className="text-sm">{(record.confidence * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Last Seen</p>
                  <p className="text-sm">{record.lastSeen}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Fields</p>
                  <p className="text-sm">{record.fields.join(', ')}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <Eye size={16} />
                </button>
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Candidate Properties */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Candidate properties</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          {candidateProperties.map((candidate, index) => (
            <div key={index} className="flex items-center gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8]">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${candidate.matchScore > 0.7 ? 'bg-[#E8F5D3]' : candidate.matchScore > 0.5 ? 'bg-[#FFF8E6]' : 'bg-[#E8EBE8]'}`}>
                <Building2 size={20} className={candidate.matchScore > 0.7 ? 'text-[#31551C]' : candidate.matchScore > 0.5 ? 'text-[#B8860B]' : 'text-[#66706A]'} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{candidate.address}</p>
                  <StatusBadge tone={candidate.matchScore > 0.7 ? 'positive' : candidate.matchScore > 0.5 ? 'warning' : 'muted'}>
                    {(candidate.matchScore * 100).toFixed(0)}% match
                  </StatusBadge>
                </div>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#66706A]">
                  <span>{candidate.propertyId}</span>
                  <span>•</span>
                  <span>{candidate.existingRecords} existing records</span>
                  <span>•</span>
                  <span>Updated {candidate.lastUpdated}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <Eye size={16} />
                </button>
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resolution Decision */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <CheckCircle size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Resolution decision</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <button
            onClick={() => handleResolution('approve')}
            className={`flex items-center justify-center gap-3 rounded-md border p-4 text-left transition-colors ${resolutionDecision === 'approve' ? 'border-[#31551C] bg-[#E8F5D3]' : 'border-[#DDE2DD] hover:bg-[#F0F2F0]'}`}
          >
            <Check size={20} className={resolutionDecision === 'approve' ? 'text-[#31551C]' : 'text-[#66706A]'} />
            <div>
              <p className="text-sm font-semibold">Approve Match</p>
              <p className="text-xs text-[#66706A]">Link to existing property</p>
            </div>
          </button>
          <button
            onClick={() => handleResolution('reject')}
            className={`flex items-center justify-center gap-3 rounded-md border p-4 text-left transition-colors ${resolutionDecision === 'reject' ? 'border-[#DC2626] bg-[#FEE2E2]' : 'border-[#DDE2DD] hover:bg-[#F0F2F0]'}`}
          >
            <X size={20} className={resolutionDecision === 'reject' ? 'text-[#DC2626]' : 'text-[#66706A]'} />
            <div>
              <p className="text-sm font-semibold">Reject Match</p>
              <p className="text-xs text-[#66706A]">Create new property</p>
            </div>
          </button>
          <button
            onClick={() => handleResolution('quarantine')}
            className={`flex items-center justify-center gap-3 rounded-md border p-4 text-left transition-colors ${resolutionDecision === 'quarantine' ? 'border-[#B8860B] bg-[#FFF8E6]' : 'border-[#DDE2DD] hover:bg-[#F0F2F0]'}`}
          >
            <AlertTriangle size={20} className={resolutionDecision === 'quarantine' ? 'text-[#B8860B]' : 'text-[#66706A]'} />
            <div>
              <p className="text-sm font-semibold">Quarantine</p>
              <p className="text-xs text-[#66706A]">Flag for later review</p>
            </div>
          </button>
        </div>

        {resolutionDecision && (
          <div className="mt-4 rounded-md border border-[#DDE2DD] p-4">
            <label className="block text-sm font-semibold">Resolution notes</label>
            <textarea
              placeholder="Add notes explaining your resolution decision..."
              className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
              rows={3}
            />
            <div className="mt-3 flex justify-end gap-3">
              <button
                onClick={() => setResolutionDecision(null)}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button className="btn-primary px-4 py-2 text-sm">
                Confirm Resolution
              </button>
            </div>
          </div>
        )}
      </section>
    </DataOperatorPageShell>
  );
}