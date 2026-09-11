'use client';

import { ArrowLeft, RefreshCw, Download, Eye, Database, CheckCircle, AlertTriangle, Activity, Clock, FileText, ExternalLink, MapPin, HardDrive } from 'lucide-react';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton, StatusBadge } from '../../../../components/atoms';
import DataOperatorPageShell from '../../../../components/organisms/DataOperatorPageShell';

export default function IngestionDetailPage() {
  // Mock ingestion data - in production this would come from API
  const ingestion = {
    id: 'ingestion-1',
    provider: 'County Tax Records',
    dataset: 'Property Tax Assessments',
    deliveryId: 'DEL-2026-09-11-001',
    status: 'Completed',
    recordsProcessed: 45230,
    recordsRejected: 12,
    startedAt: 'Sep 11, 2026 02:00 AM',
    completedAt: 'Sep 11, 2026 02:15 AM',
    duration: '15 min',
    rawDataSize: '2.4 GB',
    processedDataSize: '1.8 GB',
    s3Location: 's3://platform-data-lake/raw/county-tax/2026/09/11/DEL-2026-09-11-001/',
    processingVersion: 'v2.1.0',
    normalizationVersion: 'v1.3.0',
    error: null
  };

  const processingStages = [
    { name: 'Data Retrieval', status: 'completed', duration: '2 min', records: 45242 },
    { name: 'Schema Validation', status: 'completed', duration: '1 min', records: 45230 },
    { name: 'Data Normalization', status: 'completed', duration: '8 min', records: 45230 },
    { name: 'Entity Resolution', status: 'completed', duration: '3 min', records: 45230 },
    { name: 'Quality Checks', status: 'completed', duration: '1 min', records: 45230 },
  ];

  const rejectedRecords = [
    { id: 'REC-001', reason: 'Missing required field: parcel_id', record: '{ "address": "123 Main St", "owner": "John Doe" }', severity: 'high' },
    { id: 'REC-002', reason: 'Invalid ZIP code format', record: '{ "address": "456 Oak Ave", "zip": "ABC123" }', severity: 'medium' },
    { id: 'REC-003', reason: 'Duplicate record detected', record: '{ "external_id": "TX-12345", "address": "789 Pine Rd" }', severity: 'low' },
  ];

  const dataQualityMetrics = {
    completeness: '99.97%',
    validity: '99.98%',
    consistency: '99.95%',
    accuracy: '99.96%'
  };

  return (
    <DataOperatorPageShell
      eyebrow="Data ingestion"
      title={`Ingestion ${ingestion.id}`}
      description="View detailed ingestion information, processing stages, and data quality metrics."
      action={
        <div className="flex gap-3">
          <Link href="/data-operator/ingestion" className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <ArrowLeft size={16} /> Back to Ingestions
          </Link>
          {ingestion.status === 'Failed' && (
            <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
              <RefreshCw size={16} /> Retry Ingestion
            </button>
          )}
        </div>
      }
    >
      {/* Ingestion Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Status</p>
          <div className="mt-2">
            <StatusBadge tone={ingestion.status === 'Completed' ? 'positive' : ingestion.status === 'Failed' ? 'negative' : 'neutral'}>
              {ingestion.status}
            </StatusBadge>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">Ingestion state</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Records Processed</p>
          <p className="mt-2 font-display text-2xl">{ingestion.recordsProcessed.toLocaleString()}</p>
          <p className="mt-1 text-xs text-[#66706A]">Successfully processed</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Records Rejected</p>
          <p className="mt-2 font-display text-2xl text-[#DC2626]">{ingestion.recordsRejected.toLocaleString()}</p>
          <p className="mt-1 text-xs text-[#66706A]">Failed validation</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Duration</p>
          <p className="mt-2 font-display text-2xl">{ingestion.duration}</p>
          <p className="mt-1 text-xs text-[#66706A]">Processing time</p>
        </div>
      </section>

      {/* Ingestion Details */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Database size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Ingestion details</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Provider</p>
            <p className="mt-1 text-sm font-semibold">{ingestion.provider}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Dataset</p>
            <p className="mt-1 text-sm font-semibold">{ingestion.dataset}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Delivery ID</p>
            <p className="mt-1 text-sm font-mono text-xs">{ingestion.deliveryId}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Started At</p>
            <p className="mt-1 text-sm font-semibold">{ingestion.startedAt}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Completed At</p>
            <p className="mt-1 text-sm font-semibold">{ingestion.completedAt || 'In progress'}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Processing Version</p>
            <p className="mt-1 text-sm font-semibold">{ingestion.processingVersion}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[10px] uppercase text-[#9AA8A0]">S3 Location</p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm font-mono text-xs">{ingestion.s3Location}</p>
            <a href={ingestion.s3Location} target="_blank" rel="noopener noreferrer" className="text-[#66706A] hover:text-[#173D2B]">
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Processing Stages */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Activity size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Processing stages</h2>
        </div>
        <div className="mt-5 space-y-4">
          {processingStages.map((stage, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${stage.status === 'completed' ? 'bg-[#E8F5D3]' : stage.status === 'in_progress' ? 'bg-[#E7F0F4]' : 'bg-[#E8EBE8]'}`}>
                {stage.status === 'completed' ? <CheckCircle size={16} className="text-[#31551C]" /> : stage.status === 'in_progress' ? <Activity size={16} className="text-[#315A6B]" /> : <Clock size={16} className="text-[#66706A]" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{stage.name}</p>
                  <p className="text-xs text-[#9AA8A0]">{stage.duration}</p>
                </div>
                <p className="text-xs text-[#66706A]">{stage.records.toLocaleString()} records processed</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Quality Metrics */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <CheckCircle size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Data quality metrics</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Completeness</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">{dataQualityMetrics.completeness}</p>
            <p className="mt-1 text-xs text-[#66706A]">Required fields present</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <p className="text-xs font-semibold text-[#315A6B]">Validity</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">{dataQualityMetrics.validity}</p>
            <p className="mt-1 text-xs text-[#66706A]">Valid data formats</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <p className="text-xs font-semibold text-[#745F35]">Consistency</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">{dataQualityMetrics.consistency}</p>
            <p className="mt-1 text-xs text-[#66706A]">Logical consistency</p>
          </div>
          <div className="rounded-md bg-[#E8EBE8] p-4">
            <p className="text-xs font-semibold text-[#66706A]">Accuracy</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">{dataQualityMetrics.accuracy}</p>
            <p className="mt-1 text-xs text-[#66706A]">Data accuracy</p>
          </div>
        </div>
      </section>

      {/* Storage Information */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <HardDrive size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Storage information</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold text-[#9AA8A0]">Raw Data Size</p>
            <p className="mt-2 font-display text-2xl">{ingestion.rawDataSize}</p>
            <p className="mt-1 text-xs text-[#66706A]">Original data volume</p>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <p className="text-xs font-semibold text-[#9AA8A0]">Processed Data Size</p>
            <p className="mt-2 font-display text-2xl">{ingestion.processedDataSize}</p>
            <p className="mt-1 text-xs text-[#66706A]">After normalization</p>
          </div>
        </div>
      </section>

      {/* Rejected Records */}
      {ingestion.recordsRejected > 0 && (
        <section className="mt-6 rounded-lg border border-[#FEE2E2] bg-[#FEF2F2]">
          <div className="border-b border-[#FECACA] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="text-[#DC2626]" />
              <h2 className="font-display text-xl text-[#DC2626]">Rejected records</h2>
            </div>
          </div>
          <div className="divide-y divide-[#FECACA]">
            {rejectedRecords.map((record) => (
              <div key={record.id} className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#FEF2F2] sm:flex-row sm:items-center sm:gap-6">
                <div className="flex shrink-0 items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-md ${record.severity === 'high' ? 'bg-[#FEE2E2]' : record.severity === 'medium' ? 'bg-[#FFF8E6]' : 'bg-[#E8EBE8]'}`}>
                    <AlertTriangle size={20} className={record.severity === 'high' ? 'text-[#DC2626]' : record.severity === 'medium' ? 'text-[#B8860B]' : 'text-[#66706A]'} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{record.id}</p>
                    <p className="text-xs text-[#66706A] capitalize">{record.severity} severity</p>
                  </div>
                </div>
                
                <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
                  <div>
                    <p className="text-[10px] uppercase text-[#9AA8A0]">Reason</p>
                    <p className="text-sm text-[#DC2626]">{record.reason}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase text-[#9AA8A0]">Record</p>
                    <p className="text-sm font-mono text-xs truncate">{record.record}</p>
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

      {/* Quick Actions */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Quick actions</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <Download size={18} className="text-[#31551C]" />
            <div>
              <p className="text-sm font-semibold">Download Raw Data</p>
              <p className="text-xs text-[#66706A]">Export original data</p>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <FileText size={18} className="text-[#315A6B]" />
            <div>
              <p className="text-sm font-semibold">View Processing Log</p>
              <p className="text-xs text-[#66706A]">Access detailed logs</p>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <MapPin size={18} className="text-[#745F35]" />
            <div>
              <p className="text-sm font-semibold">View in Data Lake</p>
              <p className="text-xs text-[#66706A]">Open S3 location</p>
            </div>
          </button>
          {ingestion.status === 'Failed' && (
            <button className="flex items-center gap-3 rounded-md border border-[#FEE2E2] p-4 text-left hover:bg-[#FEF2F2]">
              <RefreshCw size={18} className="text-[#DC2626]" />
              <div>
                <p className="text-sm font-semibold text-[#DC2626]">Retry Ingestion</p>
                <p className="text-xs text-[#66706A]">Reprocess data</p>
              </div>
            </button>
          )}
        </div>
      </section>
    </DataOperatorPageShell>
  );
}