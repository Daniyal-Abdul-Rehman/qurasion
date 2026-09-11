import Link from 'next/link';
import { Settings, Database, Shield, Bell, Clock, HardDrive, Key, Users, AlertTriangle, Save, RotateCcw } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../../../components/atoms';
import DataOperatorPageShell from '../../../components/organisms/DataOperatorPageShell';

export default function DataOperatorSettingsPage() {
  return (
    <DataOperatorPageShell
      eyebrow="Settings"
      title="Data operations settings"
      description="Configure data providers, ingestion schedules, quality thresholds, and system preferences."
      action={
        <div className="flex gap-3">
          <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Save size={16} /> Save Changes
          </button>
          <button className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      }
    >
      {/* Settings Navigation */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-[#DDE2DD] pb-4">
        <button className="rounded-md bg-[#E8F5D3] px-4 py-2 text-sm font-semibold text-[#173D2B]">General</button>
        <button className="rounded-md px-4 py-2 text-sm text-[#66706A] hover:bg-[#F0F2F0]">Providers</button>
        <button className="rounded-md px-4 py-2 text-sm text-[#66706A] hover:bg-[#F0F2F0]">Ingestion</button>
        <button className="rounded-md px-4 py-2 text-sm text-[#66706A] hover:bg-[#F0F2F0]">Quality</button>
        <button className="rounded-md px-4 py-2 text-sm text-[#66706A] hover:bg-[#F0F2F0]">Notifications</button>
        <button className="rounded-md px-4 py-2 text-sm text-[#66706A] hover:bg-[#F0F2F0]">Storage</button>
        <button className="rounded-md px-4 py-2 text-sm text-[#66706A] hover:bg-[#F0F2F0]">API Keys</button>
        <button className="rounded-md px-4 py-2 text-sm text-[#66706A] hover:bg-[#F0F2F0]">Users</button>
      </div>

      {/* General Settings */}
      <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Settings size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">General settings</h2>
        </div>
        
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold">System name</label>
              <input 
                type="text" 
                defaultValue="Qurasion Data Platform"
                className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Timezone</label>
              <select className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none">
                <option>UTC</option>
                <option>America/New_York</option>
                <option>America/Chicago</option>
                <option selected>America/Dallas</option>
                <option>America/Los_Angeles</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold">Default data retention period</label>
            <select className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none">
              <option>1 year</option>
              <option>3 years</option>
              <option selected>7 years</option>
              <option>10 years</option>
              <option>Permanent</option>
            </select>
          </div>

          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div>
              <p className="text-sm font-semibold">Enable automatic data validation</p>
              <p className="mt-1 text-xs text-[#66706A]">Automatically run quality checks after each ingestion</p>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-[#31551C] transition-colors">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div>
              <p className="text-sm font-semibold">Enable audit logging</p>
              <p className="mt-1 text-xs text-[#66706A]">Log all data operations for compliance and debugging</p>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-[#31551C] transition-colors">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Provider Settings */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Database size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Provider configuration</h2>
        </div>
        
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold">Default retry policy</label>
            <select className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none">
              <option>Immediate retry</option>
              <option selected>Exponential backoff</option>
              <option>Fixed interval</option>
              <option>No retry</option>
            </select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold">Max retry attempts</label>
              <input 
                type="number" 
                defaultValue="3"
                className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Retry delay (seconds)</label>
              <input 
                type="number" 
                defaultValue="60"
                className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div>
              <p className="text-sm font-semibold">Enable provider health monitoring</p>
              <p className="mt-1 text-xs text-[#66706A]">Monitor provider availability and response times</p>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-[#31551C] transition-colors">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Quality Thresholds */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Quality thresholds</h2>
        </div>
        
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold">Auto-accept confidence threshold</label>
              <div className="mt-2 flex items-center gap-3">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="90"
                  className="flex-1"
                />
                <span className="text-sm font-semibold">90%</span>
              </div>
              <p className="mt-1 text-xs text-[#66706A]">Entity resolution confidence above this is auto-approved</p>
            </div>
            <div>
              <label className="block text-sm font-semibold">Manual review confidence threshold</label>
              <div className="mt-2 flex items-center gap-3">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="70"
                  className="flex-1"
                />
                <span className="text-sm font-semibold">70%</span>
              </div>
              <p className="mt-1 text-xs text-[#66706A]">Entity resolution below this requires manual review</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold">Max allowed failure rate</label>
              <input 
                type="number" 
                defaultValue="5"
                className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
              />
              <p className="mt-1 text-xs text-[#66706A]">Percentage threshold for quality check failures</p>
            </div>
            <div>
              <label className="block text-sm font-semibold">Data freshness threshold (hours)</label>
              <input 
                type="number" 
                defaultValue="24"
                className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
              />
              <p className="mt-1 text-xs text-[#66706A]">Maximum acceptable data age before alert</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Notification preferences</h2>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div>
              <p className="text-sm font-semibold">Failed ingestion alerts</p>
              <p className="mt-1 text-xs text-[#66706A]">Notify when data ingestion fails</p>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-[#31551C] transition-colors">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div>
              <p className="text-sm font-semibold">Quality check failures</p>
              <p className="mt-1 text-xs text-[#66706A]">Notify when quality checks fail</p>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-[#31551C] transition-colors">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div>
              <p className="text-sm font-semibold">Entity resolution queue</p>
              <p className="mt-1 text-xs text-[#66706A]">Notify when manual review is needed</p>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-[#31551C] transition-colors">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div>
              <p className="text-sm font-semibold">Job failures</p>
              <p className="mt-1 text-xs text-[#66706A]">Notify when background jobs fail</p>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-[#31551C] transition-colors">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div>
              <p className="text-sm font-semibold">Provider health issues</p>
              <p className="mt-1 text-xs text-[#66706A]">Notify when provider health degrades</p>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-[#E8EBE8] transition-colors">
              <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Storage Settings */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <HardDrive size={20} className="text-[#173D2B]" />
          <h2 className="font-display text-xl">Storage configuration</h2>
        </div>
        
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold">Raw data storage location</label>
            <input 
              type="text" 
              defaultValue="s3://platform-data-lake/raw/"
              className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Processed data storage location</label>
            <input 
              type="text" 
              defaultValue="s3://platform-data-lake/processed/"
              className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
            <div>
              <p className="text-sm font-semibold">Enable data compression</p>
              <p className="mt-1 text-xs text-[#66706A]">Compress raw data to reduce storage costs</p>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-[#31551C] transition-colors">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="mt-6 rounded-lg border border-[#FEE2E2] bg-[#FEF2F2] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <AlertTriangle size={20} className="text-[#DC2626]" />
          <h2 className="font-display text-xl text-[#DC2626]">Danger zone</h2>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-3 rounded-md border border-[#FECACA] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold">Purge raw data</p>
              <p className="mt-1 text-xs text-[#66706A]">Permanently delete raw data older than retention period</p>
            </div>
            <button className="btn-secondary border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] px-4 py-2 text-sm">
              Purge Data
            </button>
          </div>

          <div className="flex flex-col gap-3 rounded-md border border-[#FECACA] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold">Reset quality scores</p>
              <p className="mt-1 text-xs text-[#66706A]">Reset all quality check scores and re-run checks</p>
            </div>
            <button className="btn-secondary border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] px-4 py-2 text-sm">
              Reset Scores
            </button>
          </div>
        </div>
      </section>
    </DataOperatorPageShell>
  );
}
