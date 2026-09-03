import Link from 'next/link';
import BrandMark from '../atoms/BrandMark';

export default function BrandLink() {
  return <Link href="/" className="flex items-center space-x-2"><BrandMark /><span className="font-display text-xl font-semibold text-[#172019]">Qurasion</span></Link>;
}
