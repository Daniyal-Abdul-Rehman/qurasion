import type { ReactNode } from 'react';

interface WorkspaceTableProps { headers: string[]; children: ReactNode; }
export default function WorkspaceTable({ headers, children }: WorkspaceTableProps) {
  return <div className="overflow-x-auto rounded-lg border border-[#DDE2DD] bg-white"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-[#F7F8F6] text-[10px] uppercase tracking-[0.12em] text-[#9AA8A0]"><tr>{headers.map((header) => <th key={header} className="px-5 py-3 font-semibold">{header}</th>)}</tr></thead><tbody className="divide-y divide-[#E8EBE8]">{children}</tbody></table></div>;
}
