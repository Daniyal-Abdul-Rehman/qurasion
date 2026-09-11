import type { ReactNode } from 'react';

interface StatusBadgeProps {
  children: ReactNode;
  tone?: 'positive' | 'neutral' | 'warning' | 'negative' | 'muted';
}

const toneStyles = {
  positive: 'bg-[#E8F5D3] text-[#31551C]',
  neutral: 'bg-[#F0F2F0] text-[#66706A]',
  warning: 'bg-[#FFF3D7] text-[#8A5C08]',
  negative: 'bg-[#FEE2E2] text-[#DC2626]',
  muted: 'bg-[#E8EBE8] text-[#66706A]',
};

export default function StatusBadge({ children, tone = 'neutral' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] ${toneStyles[tone]}`}>
      {children}
    </span>
  );
}
