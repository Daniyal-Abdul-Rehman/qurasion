import Link from 'next/link';
import { AlertTriangle, RefreshCw, CheckCircle, XCircle, Server, Database, HardDrive, Activity, Zap, ArrowRight, Cpu, Network, Thermometer, Clock } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';

export default function SystemHealthPage() {
  return (
    <DataOperatorPageShell
      eyebrow="System health"
      title="Platform monitoring"
      description="Monitor system health, infrastructure status, and service availability across all components."
      action={
        <div className="flex gap-3">
          <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <RefreshCw size={16} /> Refresh
          </button>
          <button className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <AlertTriangle size={16} /> Run Diagnostics
          </button>
        </div>
      }
    >
      {/* Overall Health Status */}
      <section className="rounded-lg border border-[#E8F5D3] bg-[#F0F9F0] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5D3]">
            <CheckCircle size={24} className="text-[#31551C]" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold text-[#173D2B]">All Systems Operational</h2>
            <p className="mt-1 text-sm text-[#66706A]">Platform is running normally. No critical issues detected.</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-[#173D2B]">99.9% Uptime</p>
            <p className="text-xs text-[#66706A]">Last 30 days</p>
          </div>
        </div>
      </section>

      {/* Component Health Overview */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Database</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#31551C]" />
            <p className="font-display text-2xl">Healthy</p>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">PostgreSQL + PostGIS</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Cache</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#31551C]" />
            <p className="font-display text-2xl">Healthy</p>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">Redis + BullMQ</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Search</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#31551C]" />
            <p className="font-display text-2xl">Healthy</p>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">OpenSearch Cluster</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Storage</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#31551C]" />
            <p className="font-display text-2xl">Healthy</p>
          </div>
          <p className="mt-1 text-xs text-[#66706A]">S3 Data Lake</p>
        </div>
      </section>

      {/* Database Health */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Database size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Database health</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#31551C]" />
              <p className="text-xs font-semibold text-[#9AA8A0]">Connections</p>
            </div>
            <p className="mt-2 font-display text-2xl">45/100</p>
            <p className="mt-1 text-xs text-[#66706A]">Active connections</p>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[#315A6B]" />
              <p className="text-xs font-semibold text-[#9AA8A0]">Query Latency</p>
            </div>
            <p className="mt-2 font-display text-2xl">12ms</p>
            <p className="mt-1 text-xs text-[#66706A]">Average response</p>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <HardDrive size={16} className="text-[#745F35]" />
              <p className="text-xs font-semibold text-[#9AA8A0]">Storage</p>
            </div>
            <p className="mt-2 font-display text-2xl">67%</p>
            <p className="mt-1 text-xs text-[#66706A]">Disk usage</p>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Thermometer size={16} className="text-[#66706A]" />
              <p className="text-xs font-semibold text-[#9AA8A0]">Replication Lag</p>
            </div>
            <p className="mt-2 font-display text-2xl">0ms</p>
            <p className="mt-1 text-xs text-[#66706A]">Primary-standby</p>
          </div>
        </div>
      </section>

      {/* Infrastructure Health */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Server size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Infrastructure health</h2>
        </div>
        <div className="mt-5 divide-y divide-[#E8EBE8]">
          <div className="flex items-center gap-4 py-4 first:pt-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E8F5D3]">
              <CheckCircle size={20} className="text-[#31551C]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Application Server</p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#66706A]">
                <span className="flex items-center gap-1"><Cpu size={12} /> 32% CPU</span>
                <span className="flex items-center gap-1"><HardDrive size={12} /> 54% MEM</span>
                <span className="flex items-center gap-1"><Network size={12} /> 125 Mbps</span>
              </div>
            </div>
            <StatusBadge tone="positive">Healthy</StatusBadge>
          </div>
          <div className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E8F5D3]">
              <CheckCircle size={20} className="text-[#31551C]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Worker Nodes (3)</p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#66706A]">
                <span className="flex items-center gap-1"><Cpu size={12} /> Avg 28% CPU</span>
                <span className="flex items-center gap-1"><HardDrive size={12} /> Avg 48% MEM</span>
                <span className="flex items-center gap-1"><Activity size={12} /> 12 active jobs</span>
              </div>
            </div>
            <StatusBadge tone="positive">Healthy</StatusBadge>
          </div>
          <div className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#FFF8E6]">
              <AlertTriangle size={20} className="text-[#B8860B]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Load Balancer</p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#66706A]">
                <span className="flex items-center gap-1"><Network size={12} /> 890 req/sec</span>
                <span className="flex items-center gap-1"><Zap size={12} /> 2ms latency</span>
                <span className="flex items-center gap-1"><AlertTriangle size={12} /> 1 node degraded</span>
              </div>
            </div>
            <StatusBadge tone="warning">Degraded</StatusBadge>
          </div>
          <div className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E8F5D3]">
              <CheckCircle size={20} className="text-[#31551C]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">CDN Edge</p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#66706A]">
                <span className="flex items-center gap-1"><Network size={12} /> 12 edge locations</span>
                <span className="flex items-center gap-1"><Zap size={12} /> 95% cache hit</span>
                <span className="flex items-center gap-1"><Activity size={12} /> 2.4 TB transferred</span>
              </div>
            </div>
            <StatusBadge tone="positive">Healthy</StatusBadge>
          </div>
        </div>
      </section>

      {/* Service Health */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Activity size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Service health</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <CheckCircle size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">API Gateway</p>
                <p className="text-xs text-[#66706A]">REST + GraphQL</p>
              </div>
            </div>
            <StatusBadge tone="positive">Healthy</StatusBadge>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <CheckCircle size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Authentication</p>
                <p className="text-xs text-[#66706A]">OAuth + JWT</p>
              </div>
            </div>
            <StatusBadge tone="positive">Healthy</StatusBadge>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <CheckCircle size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Notification Service</p>
                <p className="text-xs text-[#66706A]">Email + Push + SMS</p>
              </div>
            </div>
            <StatusBadge tone="positive">Healthy</StatusBadge>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <CheckCircle size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">File Storage</p>
                <p className="text-xs text-[#66706A]">S3 + CDN</p>
              </div>
            </div>
            <StatusBadge tone="positive">Healthy</StatusBadge>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF8E6]">
                <AlertTriangle size={16} className="text-[#B8860B]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Provider Adapters</p>
                <p className="text-xs text-[#66706A]">External API connections</p>
              </div>
            </div>
            <StatusBadge tone="warning">1 Degraded</StatusBadge>
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                <CheckCircle size={16} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Background Workers</p>
                <p className="text-xs text-[#66706A]">BullMQ processing</p>
              </div>
            </div>
            <StatusBadge tone="positive">Healthy</StatusBadge>
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Incident history</p>
            <h2 className="mt-2 font-display text-2xl">Recent incidents</h2>
          </div>
          <Link href="/data-operator/health/incidents" className="text-sm font-semibold text-[#173D2B]">
            View all <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
              <CheckCircle size={15} className="text-[#31551C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Database connection spike</p>
              <p className="mt-1 text-xs text-[#66706A]">Transient connection pool exhaustion - auto-resolved</p>
              <p className="mt-1 text-xs text-[#66706A]">Duration: 4 min • Impact: Low</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">2 hours ago</p>
          </div>
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF8E6]">
              <AlertTriangle size={15} className="text-[#B8860B]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Mortgage provider rate limiting</p>
              <p className="mt-1 text-xs text-[#66706A]">API rate limit exceeded - implemented backoff strategy</p>
              <p className="mt-1 text-xs text-[#66706A]">Duration: 15 min • Impact: Medium</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">Yesterday</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
              <CheckCircle size={15} className="text-[#31551C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Scheduled maintenance</p>
              <p className="mt-1 text-xs text-[#66706A]">PostgreSQL minor version upgrade - completed successfully</p>
              <p className="mt-1 text-xs text-[#66706A]">Duration: 25 min • Impact: None</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">3 days ago</p>
          </div>
        </div>
      </section>

      {/* Uptime Statistics */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Uptime statistics</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Last 24 Hours</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">100%</p>
            <p className="mt-1 text-xs text-[#66706A]">No downtime</p>
          </div>
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Last 7 Days</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">99.98%</p>
            <p className="mt-1 text-xs text-[#66706A]">2 min downtime</p>
          </div>
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Last 30 Days</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">99.92%</p>
            <p className="mt-1 text-xs text-[#66706A]">18 min downtime</p>
          </div>
          <div className="rounded-md bg-[#E7F0E5] p-4">
            <p className="text-xs font-semibold text-[#31551C]">Last 90 Days</p>
            <p className="mt-2 font-display text-2xl text-[#173D2B]">99.85%</p>
            <p className="mt-1 text-xs text-[#66706A]">65 min downtime</p>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
