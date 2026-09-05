'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HandCoins, Clock, CheckCircle2, XCircle, AlertCircle, Plus, Filter } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { buyerOffers, buyerProperties } from '../../../lib/buyer-data';

export default function OffersPage() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Countered' | 'Accepted' | 'Rejected' | 'Expired'>('All');

  const filteredOffers = filter === 'All' 
    ? buyerOffers 
    : buyerOffers.filter(o => {
        if (filter === 'Active') return ['Under Review', 'Submitted'].includes(o.status);
        if (filter === 'Countered') return o.status === 'Countered';
        if (filter === 'Accepted') return o.status === 'Accepted';
        if (filter === 'Rejected') return o.status === 'Rejected';
        if (filter === 'Expired') return o.status === 'Expired';
        return true;
      });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Under Review':
      case 'Submitted':
        return <Clock size={16} className="text-[#B8860B]" />;
      case 'Countered':
        return <AlertCircle size={16} className="text-[#B8860B]" />;
      case 'Accepted':
        return <CheckCircle2 size={16} className="text-[#31551C]" />;
      case 'Rejected':
        return <XCircle size={16} className="text-[#C41E3A]" />;
      case 'Expired':
        return <Clock size={16} className="text-[#66706A]" />;
      default:
        return <Clock size={16} className="text-[#66706A]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review':
      case 'Submitted':
        return 'bg-[#FFF8E6] text-[#B8860B]';
      case 'Countered':
        return 'bg-[#FFF8E6] text-[#B8860B]';
      case 'Accepted':
        return 'bg-[#E8F5D3] text-[#31551C]';
      case 'Rejected':
        return 'bg-[#FDE8E8] text-[#C41E3A]';
      case 'Expired':
        return 'bg-[#F0F2F0] text-[#66706A]';
      default:
        return 'bg-[#F0F2F0] text-[#66706A]';
    }
  };

  return (
    <BuyerPageShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl">Offers</h1>
            <p className="mt-1 text-[#66706A]">Manage your property offers</p>
          </div>
          <Link
            href="/user/explore"
            className="flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
          >
            <Plus size={18} />
            <span>New offer</span>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-[#DDE2DD] overflow-x-auto">
          {(['All', 'Active', 'Countered', 'Accepted', 'Rejected', 'Expired'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                filter === option
                  ? 'border-b-2 border-[#173D2B] text-[#173D2B]'
                  : 'text-[#66706A] hover:text-[#172019]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredOffers.length === 0 ? (
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-12 text-center">
            <HandCoins size={48} className="mx-auto text-[#DDE2DD]" />
            <h3 className="mt-4 font-display text-xl">No offers yet</h3>
            <p className="mt-2 text-[#66706A]">When you make offers on properties, they'll appear here.</p>
            <Link
              href="/user/explore"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
            >
              Explore properties
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOffers.map((offer) => {
              const property = buyerProperties.find(p => p.id === offer.propertyId);
              return (
                <Link
                  key={offer.id}
                  href={`/user/offers/${offer.id}`}
                  className="block rounded-lg border border-[#DDE2DD] bg-white p-5 hover:border-[#173D2B] transition-colors"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      {property && (
                        <div className="h-20 w-20 shrink-0 rounded-md bg-[#E7F0E5] overflow-hidden">
                          <img
                            src={property.images[0]}
                            alt={property.address}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(offer.status)}`}>
                            {getStatusIcon(offer.status)}
                            {offer.status}
                          </span>
                          {offer.counterOffer && (
                            <span className="rounded-full bg-[#FFF8E6] px-2 py-1 text-xs font-medium text-[#B8860B]">
                              Counter offer
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-lg font-semibold">{offer.propertyAddress}</h3>
                        <p className="mt-1 font-display text-2xl font-semibold text-[#173D2B]">
                          ${offer.offerPrice.toLocaleString()}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-3 text-sm text-[#66706A]">
                          <span>{offer.financing}</span>
                          <span>•</span>
                          <span>{offer.downPayment}% down</span>
                          <span>•</span>
                          <span>{offer.closingPreference} closing</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#9AA8A0]">Submitted</p>
                      <p className="text-sm font-medium">{offer.submittedAt}</p>
                      {offer.counterOffer && (
                        <div className="mt-2 rounded-md bg-[#FFF8E6] p-2">
                          <p className="text-xs font-semibold text-[#B8860B]">Counter: ${offer.counterOffer.price.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </BuyerPageShell>
  );
}
