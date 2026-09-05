'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, HandCoins, Clock, CheckCircle2, XCircle, AlertCircle, 
  Send, FileText, Calendar, DollarSign, Home, MessageSquare 
} from 'lucide-react';
import BuyerPageShell from '../../../../components/organisms/BuyerPageShell';
import { buyerOffers, buyerProperties } from '../../../../lib/buyer-data';

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showCounterForm, setShowCounterForm] = useState(false);
  const [counterAmount, setCounterAmount] = useState('');
  
  const offer = buyerOffers.find(o => o.id === params.id);
  const property = offer ? buyerProperties.find(p => p.id === offer.propertyId) : null;

  if (!offer || !property) {
    return (
      <BuyerPageShell>
        <div className="text-center py-12">
          <h1 className="font-display text-2xl">Offer not found</h1>
          <Link href="/user/offers" className="mt-4 inline-block text-[#173D2B]">
            Back to offers
          </Link>
        </div>
      </BuyerPageShell>
    );
  }

  const handleAcceptCounter = () => {
    // In a real app, this would make an API call
    router.push('/user/offers');
  };

  const handleRejectCounter = () => {
    // In a real app, this would make an API call
    router.push('/user/offers');
  };

  const handleSubmitCounter = () => {
    // In a real app, this would make an API call
    router.push('/user/offers');
  };

  const getStatusIcon = () => {
    switch (offer.status) {
      case 'Under Review':
      case 'Submitted':
        return <Clock size={24} className="text-[#B8860B]" />;
      case 'Countered':
        return <AlertCircle size={24} className="text-[#B8860B]" />;
      case 'Accepted':
        return <CheckCircle2 size={24} className="text-[#31551C]" />;
      case 'Rejected':
        return <XCircle size={24} className="text-[#C41E3A]" />;
      default:
        return <Clock size={24} className="text-[#66706A]" />;
    }
  };

  return (
    <BuyerPageShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/user/offers" className="flex items-center gap-2 text-sm text-[#66706A] hover:text-[#172019]">
            <ArrowLeft size={16} />
            Back to offers
          </Link>
        </div>

        {/* Status Banner */}
        <div className={`rounded-lg p-4 ${
          offer.status === 'Accepted' ? 'bg-[#E8F5D3]' : 
          offer.status === 'Rejected' ? 'bg-[#FDE8E8]' : 
          'bg-[#FFF8E6]'
        }`}>
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <p className="font-semibold">
                {offer.status === 'Countered' ? 'Counter offer received' : `Offer ${offer.status.toLowerCase()}`}
              </p>
              <p className="text-sm text-[#66706A]">
                {offer.status === 'Countered' 
                  ? 'The seller has responded with a counter offer. You can accept, reject, or submit another counter.'
                  : 'Your offer is being reviewed by the seller.'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Property Info */}
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <div className="flex gap-4">
                <div className="h-32 w-32 shrink-0 rounded-md bg-[#E7F0E5] overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.address}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl">{property.address}</h2>
                  <p className="mt-1 text-sm text-[#66706A]">{property.city}, {property.state}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1">
                      <Home size={14} />
                      {property.bedrooms} beds • {property.bathrooms} baths
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={14} />
                      {property.size.toLocaleString()} sq ft
                    </span>
                  </div>
                  <Link
                    href={`/user/property/${property.slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#173D2B] hover:underline"
                  >
                    View property details
                  </Link>
                </div>
              </div>
            </section>

            {/* Offer Details */}
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Your offer</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Offer price</span>
                  <span className="font-display text-lg font-semibold">${offer.offerPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Financing</span>
                  <span className="font-medium">{offer.financing}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Down payment</span>
                  <span className="font-medium">{offer.downPayment}%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Closing preference</span>
                  <span className="font-medium">{offer.closingPreference}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-[#66706A]">Submitted</span>
                  <span className="font-medium">{offer.submittedAt}</span>
                </div>
              </div>
            </section>

            {/* Counter Offer */}
            {offer.counterOffer && (
              <section className="rounded-lg border border-[#B8860B] bg-[#FFF8E6] p-6">
                <h3 className="font-display text-lg mb-4 flex items-center gap-2">
                  <AlertCircle size={20} className="text-[#B8860B]" />
                  Counter offer
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                    <span className="text-[#66706A]">Counter price</span>
                    <span className="font-display text-lg font-semibold text-[#B8860B]">${offer.counterOffer.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-[#66706A]">Closing preference</span>
                    <span className="font-medium">{offer.counterOffer.closingPreference}</span>
                  </div>
                </div>

                {/* Counter Actions */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleAcceptCounter}
                    className="flex-1 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
                  >
                    Accept counter
                  </button>
                  <button
                    onClick={() => setShowCounterForm(!showCounterForm)}
                    className="flex-1 rounded-md border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                  >
                    Submit another counter
                  </button>
                  <button
                    onClick={handleRejectCounter}
                    className="flex-1 rounded-md border border-[#C41E3A] bg-white px-4 py-2.5 text-sm font-medium text-[#C41E3A] hover:bg-[#FDE8E8]"
                  >
                    Reject
                  </button>
                </div>

                {/* Counter Form */}
                {showCounterForm && (
                  <div className="mt-4 rounded-lg border border-[#DDE2DD] bg-white p-4">
                    <h4 className="font-medium mb-3">Your counter offer</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="mb-2 block text-sm font-medium">Counter price</label>
                        <input
                          type="text"
                          value={counterAmount}
                          onChange={(e) => setCounterAmount(e.target.value)}
                          placeholder="$500,000"
                          className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">Closing preference</label>
                        <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                          <option>30-45 days</option>
                          <option>45-60 days</option>
                          <option>60-90 days</option>
                        </select>
                      </div>
                      <button
                        onClick={handleSubmitCounter}
                        className="w-full rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
                      >
                        Submit counter offer
                      </button>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Timeline */}
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Offer timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                    <Send size={16} className="text-[#31551C]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Offer submitted</p>
                    <p className="text-sm text-[#66706A]">{offer.submittedAt}</p>
                  </div>
                </div>
                {offer.status !== 'Submitted' && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF8E6]">
                      <Clock size={16} className="text-[#B8860B]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Under review</p>
                      <p className="text-sm text-[#66706A]">Seller is reviewing your offer</p>
                    </div>
                  </div>
                )}
                {offer.counterOffer && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF8E6]">
                      <AlertCircle size={16} className="text-[#B8860B]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Counter offer received</p>
                      <p className="text-sm text-[#66706A]">Seller countered at ${offer.counterOffer.price.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Quick actions</h3>
              <div className="space-y-3">
                <Link
                  href={`/user/property/${property.slug}`}
                  className="flex items-center gap-3 rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                >
                  <Home size={18} />
                  View property
                </Link>
                <Link
                  href="/user/messages"
                  className="flex items-center gap-3 rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                >
                  <MessageSquare size={18} />
                  Message broker
                </Link>
                <Link
                  href="/user/transactions"
                  className="flex items-center gap-3 rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                >
                  <FileText size={18} />
                  View transaction
                </Link>
              </div>
            </section>

            {/* Need Help */}
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Need help?</h3>
              <p className="text-sm text-[#66706A] mb-4">
                Have questions about your offer? Contact support for assistance.
              </p>
              <button className="w-full rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]">
                Contact support
              </button>
            </section>
          </div>
        </div>
      </div>
    </BuyerPageShell>
  );
}
