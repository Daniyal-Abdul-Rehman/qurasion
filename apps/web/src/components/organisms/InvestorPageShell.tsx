import type { ReactNode } from 'react';
import Link from 'next/link';
import InvestorSidebar from './InvestorSidebar';
import { IconButton } from '../atoms';
import { Bell, Menu } from 'lucide-react';

interface InvestorPageShellProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function InvestorPageShell({ eyebrow, title, description, action, children }: InvestorPageShellProps) {
  return <div className="flex min-h-screen bg-[#F7F8F6] text-[#172019]"><InvestorSidebar /><main className="min-w-0 flex-1"><header className="flex h-[76px] items-center justify-between border-b border-[#DDE2DD] bg-[#FBFCFA] px-5 sm:px-8 lg:px-10"><div className="flex items-center gap-3"><button type="button" aria-label="Open navigation" className="rounded-md p-2 text-[#66706A] lg:hidden"><Menu size={20} /></button><div className="hidden items-center gap-2 text-xs text-[#9AA8A0] sm:flex"><Link href="/investor/dashboard" className="hover:text-[#172019]">Workspace</Link><span>/</span><span className="text-[#172019]">{title}</span></div></div><div className="flex items-center gap-3"><IconButton label="Notifications" className="relative"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#B7D83D]" /></IconButton><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173D2B] text-xs font-semibold text-white">KM</div></div></header><div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9AA8A0]">{eyebrow}</p><h1 className="mt-2 font-display text-4xl text-[#172019] sm:text-5xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm text-[#66706A]">{description}</p>}</div>{action}</div><div className="mt-8">{children}</div></div></main></div>;
}
