import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  accent?: 'lime' | 'blue' | 'sand';
}

const accents = {
  lime: 'bg-[#E8F5D3] text-[#31551C]',
  blue: 'bg-[#E7F0F4] text-[#315A6B]',
  sand: 'bg-[#F3EBDD] text-[#745F35]',
};

export default function MetricCard({ label, value, detail, icon: Icon, accent = 'lime' }: MetricCardProps) {
  return (
    <article className="border-b border-[#DDE2DD] pb-5 sm:border-b-0 sm:border-r sm:pr-5 last:border-0 last:pr-0">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">{label}</p>
        <span className={`flex h-8 w-8 items-center justify-center rounded-full ${accents[accent]}`}>
          <Icon size={15} strokeWidth={1.8} />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl text-[#172019]">{value}</p>
      <p className="mt-1 text-xs text-[#66706A]">{detail}</p>
    </article>
  );
}
