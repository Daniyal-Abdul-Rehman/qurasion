import type { ReactNode } from 'react';

interface StatusBadgeProps {
  children: ReactNode;
  tone?: 'positive' | 'neutral' | 'warning';
}

const toneStyles = {
  positive: 'bg-[#E8F5D3] text-[#31551C]',
  neutral: 'bg-[#F0F2F0] text-[#66706A]',
  warning: 'bg-[#FFF3D7] text-[#8A5C08]',
};

export default function StatusBadge({ children, tone = 'neutral' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] ${toneStyles[tone]}`}>
      {children}
    </span>
  );
}
