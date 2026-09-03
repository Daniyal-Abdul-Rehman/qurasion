import Link from 'next/link';

const tabs = [
  ['Overview', '/investor/analyses/elm-street'],
  ['Valuation', '/investor/analyses/elm-street/valuation'],
  ['Comparables', '/investor/analyses/elm-street/comparables'],
  ['Financing', '/investor/analyses/elm-street/financing'],
  ['Risk', '/investor/analyses/elm-street/risk'],
  ['Sensitivity', '/investor/analyses/elm-street/sensitivity'],
  ['AI explanation', '/investor/analyses/elm-street/explanation'],
];

export default function AnalysisNav({ active }: { active: string }) {
  return <nav className="flex gap-2 overflow-x-auto border-b border-[#DDE2DD] pb-3">{tabs.map(([label, href]) => <Link key={label} href={href} className={`whitespace-nowrap px-3 py-2 text-sm ${active === label ? 'border-b-2 border-[#173D2B] font-semibold text-[#173D2B]' : 'text-[#66706A] hover:text-[#172019]'}`}>{label}</Link>)}</nav>;
}
