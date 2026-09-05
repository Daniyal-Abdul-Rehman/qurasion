import Link from 'next/link';
import { ArrowRight, Plus, Briefcase, Building2, FileText, HandCoins, MessageSquare, Clock } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';
import { brokerSellers } from '../../../lib/broker-data';

export default function SellersPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Sellers"
      description="Manage your seller relationships and their property portfolios."
      action={
        <Link href="/broker/sellers/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Add Seller
        </Link>
      }
    >
      {/* Seller Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Sellers</p>
          <p className="mt-2 font-display text-2xl">{brokerSellers.length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Active Sellers</p>
          <p className="mt-2 font-display text-2xl">{brokerSellers.filter((s) => s.status === 'Active').length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Properties</p>
          <p className="mt-2 font-display text-2xl">{brokerSellers.reduce((sum, s) => sum + s.properties, 0)}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Active Listings</p>
          <p className="mt-2 font-display text-2xl">{brokerSellers.reduce((sum, s) => sum + s.activeListings, 0)}</p>
        </div>
      </section>

      {/* Sellers Table */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Seller management</p>
            <h2 className="mt-2 font-display text-2xl">Your sellers</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Seller</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Properties</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Active Listings</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Deals</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Last Contact</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brokerSellers.map((seller) => (
                <tr key={seller.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4">
                    <Link href={`/broker/sellers/${seller.id}`} className="flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-full bg-[#E7F0E5] flex items-center justify-center text-xs font-semibold text-[#173D2B]">
                        {seller.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <p className="font-semibold text-sm">{seller.name}</p>
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">{seller.properties}</td>
                  <td className="py-3 px-4 text-sm">{seller.activeListings}</td>
                  <td className="py-3 px-4 text-sm">{seller.deals}</td>
                  <td className="py-3 px-4">
                    <StatusBadge tone={seller.status === 'Active' ? 'positive' : 'neutral'}>
                      {seller.status}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{seller.lastContact}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/broker/sellers/${seller.id}`} className="text-sm text-[#173D2B] hover:underline">
                        View
                      </Link>
                      <Link href={`/broker/messages?contact=${seller.id}`} className="flex items-center gap-1 text-sm text-[#66706A] hover:text-[#173D2B]">
                        <MessageSquare size={14} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <Link href="/broker/sellers/new" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <Plus size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="font-semibold">Add new seller</p>
            <p className="text-sm text-[#66706A]">Onboard a new client</p>
          </div>
        </Link>
        <Link href="/broker/properties/new" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <Building2 size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="font-semibold">Add property</p>
            <p className="text-sm text-[#66706A]">Register a new property</p>
          </div>
        </Link>
        <Link href="/broker/listings/new" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <FileText size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="font-semibold">Create listing</p>
            <p className="text-sm text-[#66706A]">Publish a new listing</p>
          </div>
        </Link>
      </section>
    </BrokerPageShell>
  );
}