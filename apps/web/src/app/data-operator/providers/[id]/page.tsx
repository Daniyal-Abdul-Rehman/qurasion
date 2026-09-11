'use client';

import { ArrowLeft, Edit, Trash2, Play, Pause, RefreshCw, MoreVertical, Database, Clock, CheckCircle, AlertTriangle, ExternalLink, BarChart3, FileText, Activity } from 'lucide-react';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton, StatusBadge } from '../../../../components/atoms';
import DataOperatorPageShell from '../../../../components/organisms/DataOperatorPageShell';

export default function ProviderDetailPage() {
  // Mock provider data - in production this would come from API
  const provider = {
    id: 'provider-1',
    name: 'County Tax Records',
    type: 'Government',
    status: 'Active',
    health: 'healthy',
    apiEndpoint: 'https://api.county-tx.gov/records',
    deliveryFrequency: 'Daily',
    recordCount: '1.2M',
    lastDelivery: 'Sep 11, 2026 02:00 AM',
    nextDelivery: 'Sep 12, 2026 02:00 AM',
    retentionPeriod: '7 years',
    authenticationType: 'API Key',
    dataFormat: 'JSON',
    schemaVersion: 'v1.2.0',
    compressionEnabled: true,
    maxRetries: 3,
    timeout: 30,
    rateLimit: 60
  };

  const recentDeliveries = [
    { id: 'DEL-2026-09-11-001', status: 'Completed', records: 45230, rejected: 12, duration: '15 min', timestamp: 'Sep 11, 2026 02:00 AM' },
    { id: 'DEL-2026-09-10-001', status: 'Completed', records: 44890, rejected: 8, duration: '14 min', timestamp: 'Sep 10, 2026 02:00 AM' },
    { id: 'DEL-2026-09-09-001', status: 'Completed', records: 45100, rejected: 15, duration: '16 min', timestamp: 'Sep 9, 2026 02:00 AM' },
    { id: 'DEL-2026-09-08-001', status: 'Failed', records: 0, rejected: 0, duration: '5 min', timestamp: 'Sep 8, 2026 02:00 AM', error: 'API timeout' },
  ];

  return (
    <DataOperatorPageShell
      eyebrow="Data providers"
      title={provider.name}
      description="View and manage provider configuration, ingestion history, and performance metrics."
      action={
        <div className="flex gap-3">
          <Link href="/data-operator/providers" className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <ArrowLeft size={16} /> Back to Providers
          </Link>
          <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Edit size={16} /> Edit Provider
          </button>
        </div>
      }
    >
      {/* Provider Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Status</p>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge tone={provider.status === 'Active' ? 'positive' : 'warning'}>
              {provider.status}
            </StatusBadge>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">Currently {provider.status.toLowerCase()}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Health</p>
          <div className="mt-2 flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${provider.health === 'healthy' ? 'bg-[#31551C]' : 'bg-[#B8860B]'}`} />
            <p className="font-display text-2xl capitalize">{provider.health}</p>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">All systems operational</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Records</p>
          <p className="mt-2 font-display text-2xl">{provider.recordCount}</p>
          <p className="mt-1 text-xs text-[#66706A]">Records ingested</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Delivery Frequency</p>
          <p className="mt-2 font-display text-2xl">{provider.deliveryFrequency}</p>
          <p className="mt-1 text-xs text-[#66706A]">Scheduled updates</p>
        </div>
      </section>

      {/* Provider Details */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Database size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Provider configuration</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Provider Type</p>
            <p className="mt-1 text-sm font-semibold">{provider.type}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">API Endpoint</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-sm font-mono text-xs">{provider.apiEndpoint}</p>
              <a href={provider.apiEndpoint} target="_blank" rel="noopener noreferrer" className="text-[#66706A] hover:text-[#173D2B]">
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Authentication</p>
            <p className="mt-1 text-sm font-semibold">{provider.authenticationType}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Data Format</p>
            <p className="mt-1 text-sm font-semibold">{provider.dataFormat}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Schema Version</p>
            <p className="mt-1 text-sm font-semibold">{provider.schemaVersion}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Retention Period</p>
            <p className="mt-1 text-sm font-semibold">{provider.retentionPeriod}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Compression</p>
            <p className="mt-1 text-sm font-semibold">{provider.compressionEnabled ? 'Enabled' : 'Disabled'}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Max Retries</p>
            <p className="mt-1 text-sm font-semibold">{provider.maxRetries}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9AA8A0]">Timeout</p>
            <p className="mt-1 text-sm font-semibold">{provider.timeout}s</p>
          </div>
        </div>
      </section>

      {/* Delivery Schedule */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Clock size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Delivery schedule</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-[#E8F5D3] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Last Delivery</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">{provider.lastDelivery}</p>
            <p className="mt-1 text-xs text-[#66706A]">Completed successfully</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <p className="text-xs font-semibold text-[#315A6B]">Next Delivery</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">{provider.nextDelivery}</p>
            <p className="mt-1 text-xs text-[#66706A]">Scheduled</p>
          </div>
        </div>
      </section>

      {/* Recent Deliveries */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white">
        <div className="border-b border-[#E8EBE8] p-5 sm:p-6">
          <h2 className="font-display text-xl">Recent deliveries</h2>
        </div>
        <div className="divide-y divide-[#E8EBE8]">
          {recentDeliveries.map((delivery) => (
            <div key={delivery.id} className="flex flex-col gap-4 p-5 sm:p-6 hover:bg-[#F8F9F8] sm:flex-row sm:items-center sm:gap-6">
              <div className="flex shrink-0 items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-md ${delivery.status === 'Completed' ? 'bg-[#E8F5D3]' : 'bg-[#FEE2E2]'}`}>
                  {delivery.status === 'Completed' ? <CheckCircle size={20} className="text-[#31551C]" /> : <AlertTriangle size={20} className="text-[#DC2626]" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{delivery.id}</p>
                  <p className="text-xs text-[#66706A]">{delivery.timestamp}</p>
                </div>
              </div>
              
              <div className="flex flex-1 flex-wrap gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Records</p>
                  <p className="text-sm">{delivery.records.toLocaleString()} processed</p>
                  {delivery.rejected > 0 && (
                    <p className="text-xs text-[#DC2626]">{delivery.rejected} rejected</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9AA8A0]">Duration</p>
                  <p className="text-sm">{delivery.duration}</p>
                </div>
                {delivery.error && (
                  <div>
                    <p className="text-[10px] uppercase text-[#DC2626]">Error</p>
                    <p className="text-sm text-[#DC2626]">{delivery.error}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge tone={delivery.status === 'Completed' ? 'positive' : 'negative'}>
                  {delivery.status}
                </StatusBadge>
                <button className="rounded-md p-2 text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#173D2B]">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <BarChart3 size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Performance metrics (last 30 days)</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Success Rate</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">98.5%</p>
            <p className="mt-1 text-xs text-[#66706A]">+0.5% improvement</p>
          </div>
          <div className="rounded-md bg-[#E7F0F4] p-4">
            <p className="text-xs font-semibold text-[#315A6B]">Avg Latency</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">1.2s</p>
            <p className="mt-1 text-xs text-[#66706A]">API response time</p>
          </div>
          <div className="rounded-md bg-[#F3EBDD] p-4">
            <p className="text-xs font-semibold text-[#745F35]">Data Freshness</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">2.1 hrs</p>
            <p className="mt-1 text-xs text-[#66706A]">Average lag time</p>
          </div>
          <div className="rounded-md bg-[#E8EBE8] p-4">
            <p className="text-xs font-semibold text-[#66706A]">Error Rate</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">1.5%</p>
            <p className="mt-1 text-xs text-[#66706A]">Failed deliveries</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Quick actions</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <RefreshCw size={18} className="text-[#31551C]" />
            <div>
              <p className="text-sm font-semibold">Trigger Ingestion</p>
              <p className="text-xs text-[#66706A]">Manually start data delivery</p>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <Activity size={18} className="text-[#315A6B]" />
            <div>
              <p className="text-sm font-semibold">Test Connection</p>
              <p className="text-xs text-[#66706A]">Verify API accessibility</p>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-md border border-[#DDE2DD] p-4 text-left hover:bg-[#F0F2F0]">
            <FileText size={18} className="text-[#745F35]" />
            <div>
              <p className="text-sm font-semibold">View Logs</p>
              <p className="text-xs text-[#66706A]">Access delivery logs</p>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-md border border-[#FEE2E2] p-4 text-left hover:bg-[#FEF2F2]">
            <Trash2 size={18} className="text-[#DC2626]" />
            <div>
              <p className="text-sm font-semibold text-[#DC2626]">Disable Provider</p>
              <p className="text-xs text-[#66706A]">Pause data deliveries</p>
            </div>
          </button>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}