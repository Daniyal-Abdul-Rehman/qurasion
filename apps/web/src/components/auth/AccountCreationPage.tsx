'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Eye, EyeOff, Landmark, LineChart, Search, ShieldCheck, Users } from 'lucide-react';
import { useState } from 'react';
import Scene3D from '../3d/Scene3D';
import { FormField } from '../molecules';

export type AccountRole = 'investor' | 'acquisitions' | 'analyst' | 'data-operations' | 'administrator';

type RoleConfig = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  icon: typeof Landmark;
  fields: { label: string; name: string; placeholder: string; type?: string }[];
};

const roleConfigs: Record<AccountRole, RoleConfig> = {
  investor: {
    label: 'Investor',
    eyebrow: 'Investor workspace',
    title: 'Build a sharper investment pipeline.',
    description: 'Create an investor workspace for discovering, underwriting, and matching with opportunities that fit your strategy.',
    detail: 'Personalized opportunities, explainable underwriting, and deal workflows in one place.',
    icon: Landmark,
    fields: [
      { label: 'Investment company', name: 'company', placeholder: 'Company or fund name' },
      { label: 'Primary strategy', name: 'strategy', placeholder: 'e.g. Buy and hold' },
      { label: 'Target market', name: 'market', placeholder: 'City, state, or region' },
    ],
  },
  acquisitions: {
    label: 'Acquisitions team',
    eyebrow: 'Acquisitions workspace',
    title: 'Move qualified deals forward.',
    description: 'Give your acquisitions team a shared command center for sourcing, valuation, diligence, and transaction handoffs.',
    detail: 'Curate inventory, review analysis, and coordinate every step from lead to close.',
    icon: Search,
    fields: [
      { label: 'Company', name: 'company', placeholder: 'Brokerage or acquisitions company' },
      { label: 'Team size', name: 'teamSize', placeholder: 'e.g. 6 people' },
      { label: 'Primary market', name: 'market', placeholder: 'City, state, or region' },
    ],
  },
  analyst: {
    label: 'Analyst',
    eyebrow: 'Analyst workspace',
    title: 'Turn property data into conviction.',
    description: 'Create an analyst workspace for comparable research, market intelligence, repeatable underwriting, and reporting.',
    detail: 'Trace every insight back to the facts, assumptions, and model version behind it.',
    icon: LineChart,
    fields: [
      { label: 'Organization', name: 'company', placeholder: 'Company, fund, or institution' },
      { label: 'Research focus', name: 'focus', placeholder: 'e.g. Multifamily markets' },
      { label: 'Primary market', name: 'market', placeholder: 'City, state, or region' },
    ],
  },
  'data-operations': {
    label: 'Data operations',
    eyebrow: 'Data operations workspace',
    title: 'Keep the property record trustworthy.',
    description: 'Create an operations workspace for provider ingestion, entity resolution, data quality review, and replayable pipelines.',
    detail: 'Monitor source deliveries, resolve data issues, and preserve provenance at every stage.',
    icon: Users,
    fields: [
      { label: 'Organization', name: 'company', placeholder: 'Company or data team' },
      { label: 'Data sources', name: 'sources', placeholder: 'e.g. MLS, tax, permits' },
      { label: 'Operational region', name: 'market', placeholder: 'City, state, or region' },
    ],
  },
  administrator: {
    label: 'Administrator',
    eyebrow: 'Administrator workspace',
    title: 'Set the system up for confident action.',
    description: 'Create an administrator workspace for permissions, providers, financial assumptions, alerts, and platform governance.',
    detail: 'Bring configuration, access control, and operational visibility under one roof.',
    icon: ShieldCheck,
    fields: [
      { label: 'Organization', name: 'company', placeholder: 'Company or institution' },
      { label: 'Role or title', name: 'title', placeholder: 'e.g. Platform administrator' },
      { label: 'Team size', name: 'teamSize', placeholder: 'e.g. 25 people' },
    ],
  },
};

const roles = Object.entries(roleConfigs) as [AccountRole, RoleConfig][];

export function AccountCreationPage({ role }: { role: AccountRole }) {
  const config = roleConfigs[role];
  const Icon = config.icon;
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({ name: '', email: '', password: '' });

  const updateField = (name: string, value: string) => {
    setFormData((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className="relative min-h-screen bg-[#F7F8F6] blueprint-overlay flex flex-col">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.42]"><Scene3D variant="graph">{null}</Scene3D></div>
      <header className="relative z-10 px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#173D2B]">
              <span className="text-lg font-bold text-white">Q</span>
            </div>
            <span className="font-display text-xl font-semibold text-[#172019]">Qurasion</span>
          </Link>
          <Link href="/login" className="text-sm font-medium text-[#66706A] transition-colors hover:text-[#172019]">Sign in</Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 px-6 py-10 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pt-3">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#173D2B] text-[#B7D83D]"><Icon className="h-6 w-6" /></div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#66706A]">{config.eyebrow}</p>
            <h1 className="max-w-xl font-display text-4xl font-light leading-tight text-[#172019] md:text-5xl">{config.title}</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#66706A]">{config.description}</p>
            <div className="mt-8 border-l-2 border-[#B7D83D] pl-4 text-sm leading-6 text-[#172019]">{config.detail}</div>
            <div className="mt-10 hidden space-y-3 text-sm text-[#66706A] lg:block">
              {['14-day free trial', 'No credit card required', 'Role-specific workspace'].map((item) => (
                <div key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#173D2B]" />{item}</div>
              ))}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="card bg-white">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9AA8A0]">Create your account</p><h2 className="mt-2 font-display text-2xl text-[#172019]">{config.label} access</h2></div>
              <span className="rounded-full bg-[#F0F2F0] px-3 py-1 text-xs font-medium text-[#66706A]">Step 1 of 1</span>
            </div>
            {submitted ? (
              <div className="rounded-lg border border-[#DDE2DD] bg-[#F7F8F6] p-8 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#B7D83D]"><Check className="h-6 w-6 text-[#172019]" /></div><h3 className="mt-5 font-display text-2xl text-[#172019]">You&apos;re on your way.</h3><p className="mt-2 text-sm leading-6 text-[#66706A]">Your {config.label.toLowerCase()} workspace request is ready. Connect the account API to complete registration.</p><Link href="/" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#173D2B]">Back to Qurasion <ArrowRight className="h-4 w-4" /></Link></div>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField className="sm:col-span-2" label="Full name" value={formData.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Your full name" required />
                  <FormField className="sm:col-span-2" label="Work email" type="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@company.com" required />
                  {config.fields.map((field) => <FormField key={field.name} label={field.label} type={field.type ?? 'text'} value={formData[field.name] ?? ''} onChange={(event) => updateField(field.name, event.target.value)} placeholder={field.placeholder} required />)}
                  <FormField className="sm:col-span-2" label="Password"><div className="relative"><input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(event) => updateField('password', event.target.value)} className="input w-full pr-12" placeholder="At least 8 characters" minLength={8} required /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((current) => !current)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#66706A] hover:text-[#172019]">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></FormField>
                </div>
                <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2">Create {config.label.toLowerCase()} account <ArrowRight className="h-4 w-4" /></button>
                <p className="text-center text-xs leading-5 text-[#66706A]">By creating an account, you agree to Qurasion&apos;s <Link href="/terms" className="text-[#173D2B] hover:underline">Terms</Link> and <Link href="/privacy" className="text-[#173D2B] hover:underline">Privacy Policy</Link>.</p>
              </form>
            )}
          </motion.section>
        </div>

        <div className="mx-auto mt-12 max-w-6xl border-t border-[#DDE2DD] pt-6"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#9AA8A0]">Choose another workspace</p><div className="flex flex-wrap gap-2">{roles.map(([roleId, roleConfig]) => <Link key={roleId} href={`/signup/${roleId}`} className={`rounded-full border px-4 py-2 text-sm transition-colors ${roleId === role ? 'border-[#173D2B] bg-[#173D2B] text-white' : 'border-[#DDE2DD] text-[#66706A] hover:border-[#173D2B] hover:text-[#172019]'}`}>{roleConfig.label}</Link>)}</div></div>
      </main>

      <footer className="border-t border-[#DDE2DD] px-6 py-6 text-center text-sm text-[#66706A]">© 2026 Qurasion. All rights reserved.</footer>
    </div>
  );
}

export { roleConfigs };
