import Link from 'next/link';
import { Bell, RefreshCw, Filter, CheckCircle, AlertTriangle, Info, XCircle, Clock, ArrowRight, Settings, Trash2, Check, Eye } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';
import { notificationData } from '../../../lib/data-operator-data';

export default function DataOperatorNotificationsPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Notifications"
      title="System alerts & notifications"
      description="View and manage system notifications, alerts, and operational messages."
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
      {/* Notifications Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Unread</p>
          <p className="mt-2 font-display text-2xl">{notificationData.unread}</p>
          <p className="mt-1 text-xs text-[#66706A]">Requires attention</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Critical</p>
          <p className="mt-2 font-display text-2xl">{notificationData.critical}</p>
          <p className="mt-1 text-xs text-[#66706A]">High priority</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Warnings</p>
          <p className="mt-2 font-display text-2xl">{notificationData.warnings}</p>
          <p className="mt-1 text-xs text-[#66706A]">Medium priority</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Today</p>
          <p className="mt-2 font-display text-2xl">{notificationData.totalToday}</p>
          <p className="mt-1 text-xs text-[#66706A]">All notifications</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 flex gap-3">
        <button className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
          <Check size={14} /> Mark All as Read
        </button>
        <button className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm">
          <Settings size={14} /> Notification Settings
        </button>
      </section>

      {/* Critical Notifications */}
      <section className="mt-6 rounded-lg border border-[#FEE2E2] bg-[#FEF2F2] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <XCircle size={20} className="text-[#DC2626]" />
          <h2 className="font-display text-xl text-[#DC2626]">Critical alerts</h2>
        </div>
        <div className="mt-5 space-y-4">
          {notificationData.criticalAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 rounded-md border border-[#FECACA] bg-white p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2]">
                <XCircle size={16} className="text-[#DC2626]" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold">{alert.title}</p>
                    <p className="mt-1 text-xs text-[#66706A]">{alert.message}</p>
                  </div>
                  <span className="text-xs text-[#9AA8A0]">{alert.timestamp}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  {alert.actions.map((action) => (
                    <button key={action} className="btn-primary px-3 py-1.5 text-xs">{action}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Warning Notifications */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <AlertTriangle size={20} className="text-[#B8860B]" />
          <h2 className="font-display text-xl">Warnings</h2>
        </div>
        <div className="mt-5 space-y-4">
          {notificationData.warningsList.map((warning) => (
            <div key={warning.id} className="flex items-start gap-3 rounded-md border border-[#DDE2DD] p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF8E6]">
                <AlertTriangle size={16} className="text-[#B8860B]" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold">{warning.title}</p>
                    <p className="mt-1 text-xs text-[#66706A]">{warning.message}</p>
                  </div>
                  <span className="text-xs text-[#9AA8A0]">{warning.timestamp}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  {warning.actions.map((action) => (
                    <button key={action} className="btn-secondary px-3 py-1.5 text-xs">{action}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Informational Notifications */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Info size={20} className="text-[#315A6B]" />
          <h2 className="font-display text-xl">Informational</h2>
        </div>
        <div className="mt-5 space-y-4">
          {notificationData.informational.map((info) => (
            <div key={info.id} className="flex items-start gap-3 rounded-md border border-[#DDE2DD] p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
                <CheckCircle size={16} className="text-[#315A6B]" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold">{info.title}</p>
                    <p className="mt-1 text-xs text-[#66706A]">{info.message}</p>
                  </div>
                  <span className="text-xs text-[#9AA8A0]">{info.timestamp}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  {info.actions.map((action) => (
                    <button key={action} className="btn-secondary px-3 py-1.5 text-xs">{action}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notification History */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">History</p>
            <h2 className="mt-2 font-display text-2xl">Earlier notifications</h2>
          </div>
          <Link href="/data-operator/notifications/history" className="text-sm font-semibold text-[#173D2B]">
            View all <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="mt-5 space-y-3">
          {notificationData.earlier.map((notification) => (
            <div key={notification.id} className="flex items-center gap-3 rounded-md p-3">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${notification.type === 'success' ? 'bg-[#E8F5D3]' : notification.type === 'info' ? 'bg-[#E7F0F4]' : 'bg-[#E8EBE8]'}`}>
                {notification.type === 'success' ? <CheckCircle size={16} className="text-[#31551C]" /> : notification.type === 'info' ? <Info size={16} className="text-[#315A6B]" /> : <CheckCircle size={16} className="text-[#66706A]" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{notification.title}</p>
                <p className="text-xs text-[#66706A]">{notification.message}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#9AA8A0]">{notification.timestamp}</span>
                <button className="rounded-md p-1 text-[#66706A] hover:bg-[#F0F2F0]">
                  <Eye size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notification Management */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl">Notification management</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Trash2 size={18} className="text-[#DC2626]" />
              <p className="text-sm font-semibold">Clear Old Notifications</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Remove notifications older than 30 days</p>
            <button className="mt-3 btn-secondary border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] px-4 py-2 text-sm">
              Clear History
            </button>
          </div>
          <div className="rounded-md border border-[#DDE2DD] p-4">
            <div className="flex items-center gap-2">
              <Settings size={18} className="text-[#31551C]" />
              <p className="text-sm font-semibold">Notification Preferences</p>
            </div>
            <p className="mt-2 text-xs text-[#66706A]">Configure alert thresholds and delivery methods</p>
            <button className="mt-3 btn-primary px-4 py-2 text-sm">
              Configure Settings
            </button>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
