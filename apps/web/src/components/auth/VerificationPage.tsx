'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, KeyRound, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Scene3D from '../3d/Scene3D';
import { PrimaryButton } from '../atoms';
import { FormField } from '../molecules';
import { AuthShell } from '../organisms';

type VerificationMode = 'authenticator' | 'backup';

export default function VerificationPage({ mode = 'authenticator' }: { mode?: VerificationMode }) {
  const isBackup = mode === 'backup';
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVerified(true);
  };

  return (
    <AuthShell action={<Link href="/login" className="text-sm font-medium text-[#66706A] transition-colors hover:text-[#172019]">Back to sign in</Link>}>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.42]"><Scene3D variant="network">{null}</Scene3D></div>
      <div className="relative z-10 flex w-full items-center justify-center">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#173D2B] text-[#B7D83D]">{isBackup ? <KeyRound className="h-7 w-7" /> : <ShieldCheck className="h-7 w-7" />}</div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#66706A]">Account security</p>
            <h1 className="font-display text-4xl font-light text-[#172019]">{isBackup ? 'Use a backup code' : 'Verify your identity'}</h1>
            <p className="mt-4 leading-6 text-[#66706A]">{isBackup ? 'Enter one of the recovery codes you saved when two-step verification was enabled.' : 'Open your authenticator app and enter the six-digit code for your Qurasion account.'}</p>
          </div>

          <div className="card bg-white">
            {verified ? (
              <div className="py-5 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#B7D83D]"><Check className="h-6 w-6 text-[#172019]" /></div><h2 className="mt-5 font-display text-2xl text-[#172019]">Identity verified</h2><p className="mt-2 text-sm leading-6 text-[#66706A]">The verification step is complete. Connect your auth service to continue to the dashboard.</p><Link href="/" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#173D2B]">Continue to Qurasion <ArrowRight className="h-4 w-4" /></Link></div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label={isBackup ? 'Recovery code' : '6-digit verification code'}><input autoFocus inputMode={isBackup ? 'text' : 'numeric'} pattern={isBackup ? undefined : '[0-9]{6}'} maxLength={isBackup ? 12 : 6} value={code} onChange={(event) => setCode(event.target.value)} className="input w-full text-center font-mono text-xl tracking-[0.3em]" placeholder={isBackup ? 'XXXX-XXXX' : '000000'} required /></FormField>
                <PrimaryButton type="submit">Verify and continue <ArrowRight className="h-4 w-4" /></PrimaryButton>
              </form>
            )}
          </div>

          {!verified && <div className="mt-8 text-center text-sm text-[#66706A]">{isBackup ? <Link href="/verify" className="inline-flex items-center gap-2 font-medium text-[#173D2B] hover:underline"><ArrowLeft className="h-4 w-4" /> Use authenticator code</Link> : <Link href="/verify/backup" className="font-medium text-[#173D2B] hover:underline">Can&apos;t access your authenticator?</Link>}</div>}
        </motion.section>
      </div>
    </AuthShell>
  );
}
