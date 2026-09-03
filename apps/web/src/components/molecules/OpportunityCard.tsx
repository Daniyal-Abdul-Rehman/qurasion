import Link from 'next/link';
import { ArrowUpRight, BedDouble, Bath, Ruler, Bookmark } from 'lucide-react';
import { StatusBadge } from '../atoms';

export interface Opportunity {
  address: string;
  location: string;
  price: string;
  image: string;
  score: number;
  match: number;
  profit: string;
  roi: string;
  beds: number;
  baths: number;
  sqft: string;
  tag: string;
}

interface OpportunityCardProps {
  property: Opportunity;
  saved?: boolean;
  onSave?: () => void;
}

export default function OpportunityCard({ property, saved = false, onSave }: OpportunityCardProps) {
  return (
    <article className="group min-w-[280px] overflow-hidden rounded-lg border border-[#DDE2DD] bg-white transition hover:-translate-y-1 hover:border-[#173D2B] hover:shadow-[0_12px_30px_rgba(23,61,43,0.08)]">
      <div className="relative h-40 overflow-hidden bg-[#E8EAE8]">
        <div aria-hidden="true" className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${property.image})` }} />
        <div className="absolute left-3 top-3"><StatusBadge tone="positive">{property.tag}</StatusBadge></div>
        <button type="button" onClick={onSave} aria-label={saved ? 'Remove from saved properties' : 'Save property'} className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 ${saved ? 'text-[#173D2B]' : 'text-[#66706A]'}`}>
          <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div><h3 className="font-semibold text-[#172019]">{property.address}</h3><p className="mt-1 text-xs text-[#66706A]">{property.location}</p></div>
          <p className="font-display text-xl text-[#172019]">{property.price}</p>
        </div>
        <div className="mt-4 flex gap-3 border-y border-[#E8EBE8] py-3 text-xs text-[#66706A]">
          <span className="flex items-center gap-1"><BedDouble size={14} /> {property.beds}</span>
          <span className="flex items-center gap-1"><Bath size={14} /> {property.baths}</span>
          <span className="flex items-center gap-1"><Ruler size={14} /> {property.sqft}</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div><p className="text-[#9AA8A0]">Score</p><p className="mt-1 font-semibold text-[#173D2B]">{property.score}/100</p></div>
          <div><p className="text-[#9AA8A0]">Your match</p><p className="mt-1 font-semibold text-[#173D2B]">{property.match}%</p></div>
          <div><p className="text-[#9AA8A0]">Est. ROI</p><p className="mt-1 font-semibold text-[#173D2B]">{property.roi}</p></div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-[#66706A]"><span className="font-semibold text-[#172019]">{property.profit}</span> potential profit</p>
          <Link href="/investor/property/elm-street" aria-label={`View ${property.address}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173D2B] text-white transition hover:bg-[#0F2B1D]"><ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </article>
  );
}
