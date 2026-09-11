'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Save, X, Database, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton, StatusBadge } from '../../../../components/atoms';
import DataOperatorPageShell from '../../../../components/organisms/DataOperatorPageShell';

export default function NewProviderPage() {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Government',
    apiEndpoint: '',
    deliveryFrequency: 'Daily',
    authenticationType: 'API Key',
    requiresCompression: false,
    retentionPeriod: '7 years',
    status: 'Active'
  });

  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');

  const handleTestConnection = () => {
    setTestStatus('testing');
    // Simulate API test
    setTimeout(() => {
      setTestStatus('success');
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitting provider:', formData);
  };

  return (
    <DataOperatorPageShell
      eyebrow="Data providers"
      title="Add new provider"
      description="Configure a new data provider to ingest property information into the platform."
      action={
        <Link href="/data-operator/providers" className="btn-secondary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <ArrowLeft size={16} /> Back to Providers
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
        {/* Basic Information */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h2 className="font-display text-xl">Basic information</h2>
          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold">Provider name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., County Tax Records"
                className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold">Provider type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
                >
                  <option value="Government">Government</option>
                  <option value="Licensed">Licensed</option>
                  <option value="Geographic">Geographic</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold">Delivery frequency</label>
                <select
                  value={formData.deliveryFrequency}
                  onChange={(e) => setFormData({ ...formData, deliveryFrequency: e.target.value })}
                  className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
                >
                  <option value="Real-time">Real-time</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="On-demand">On-demand</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* API Configuration */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h2 className="font-display text-xl">API configuration</h2>
          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold">API endpoint</label>
              <input
                type="url"
                value={formData.apiEndpoint}
                onChange={(e) => setFormData({ ...formData, apiEndpoint: e.target.value })}
                placeholder="https://api.provider.com/v1/data"
                className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold">Authentication type</label>
                <select
                  value={formData.authenticationType}
                  onChange={(e) => setFormData({ ...formData, authenticationType: e.target.value })}
                  className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
                >
                  <option value="API Key">API Key</option>
                  <option value="OAuth 2.0">OAuth 2.0</option>
                  <option value="Basic Auth">Basic Auth</option>
                  <option value="None">None</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold">Retention period</label>
                <select
                  value={formData.retentionPeriod}
                  onChange={(e) => setFormData({ ...formData, retentionPeriod: e.target.value })}
                  className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
                >
                  <option value="1 year">1 year</option>
                  <option value="3 years">3 years</option>
                  <option value="7 years">7 years</option>
                  <option value="10 years">10 years</option>
                  <option value="Permanent">Permanent</option>
                </select>
              </div>
            </div>

            {/* Connection Test */}
            <div className="rounded-md border border-[#DDE2DD] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Test connection</p>
                  <p className="mt-1 text-xs text-[#66706A]">Verify API endpoint accessibility and authentication</p>
                </div>
                <div className="flex items-center gap-3">
                  {testStatus === 'success' && (
                    <div className="flex items-center gap-2 text-sm text-[#31551C]">
                      <CheckCircle size={16} />
                      <span>Connection successful</span>
                    </div>
                  )}
                  {testStatus === 'failed' && (
                    <div className="flex items-center gap-2 text-sm text-[#DC2626]">
                      <AlertTriangle size={16} />
                      <span>Connection failed</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testStatus === 'testing' || !formData.apiEndpoint}
                    className="btn-secondary px-4 py-2 text-sm"
                  >
                    {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Configuration */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h2 className="font-display text-xl">Data configuration</h2>
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between rounded-md border border-[#DDE2DD] p-4">
              <div>
                <p className="text-sm font-semibold">Enable data compression</p>
                <p className="mt-1 text-xs text-[#66706A]">Compress incoming data to reduce storage costs</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, requiresCompression: !formData.requiresCompression })}
                className={`relative h-6 w-11 rounded-full transition-colors ${formData.requiresCompression ? 'bg-[#31551C]' : 'bg-[#E8EBE8]'}`}
              >
                <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${formData.requiresCompression ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold">Expected data format</label>
              <select className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none">
                <option>JSON</option>
                <option>XML</option>
                <option>CSV</option>
                <option>Parquet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">Schema version</label>
              <input
                type="text"
                placeholder="e.g., v1.0.0"
                className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Advanced Settings */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h2 className="font-display text-xl">Advanced settings</h2>
          <div className="mt-6 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold">Max retry attempts</label>
                <input
                  type="number"
                  defaultValue="3"
                  min="0"
                  max="10"
                  className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">Timeout (seconds)</label>
                <input
                  type="number"
                  defaultValue="30"
                  min="5"
                  max="300"
                  className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold">Rate limit (requests per minute)</label>
              <input
                type="number"
                defaultValue="60"
                min="1"
                max="1000"
                className="mt-2 w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Link href="/data-operator/providers" className="btn-secondary flex w-fit items-center gap-2 px-6 py-2.5 text-sm">
            <X size={16} /> Cancel
          </Link>
          <button type="submit" className="btn-primary flex w-fit items-center gap-2 px-6 py-2.5 text-sm">
            <Save size={16} /> Add Provider
          </button>
        </div>
      </form>
    </DataOperatorPageShell>
  );
}