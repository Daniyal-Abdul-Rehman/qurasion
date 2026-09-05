'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, DollarSign, Percent, Calendar, FileText, Send } from 'lucide-react';
import BuyerPageShell from '../../../../components/organisms/BuyerPageShell';
import { buyerProperties } from '../../../../lib/buyer-data';

function NewOfferContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('property');
  
  const property = propertyId ? buyerProperties.find(p => p.id === propertyId) : null;

  const [formData, setFormData] = useState({
    offerPrice: property?.price ? property.price * 0.95 : '',
    financing: 'Mortgage',
    downPayment: '20',
    closingPreference: '30-45 days',
    inspectionPeriod: '10 days',
    earnestMoney: property?.price ? (property.price * 0.02).toString() : '',
    contingencies: '',
    additionalTerms: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    router.push('/user/offers');
  };

  if (!property) {
    return (
      <BuyerPageShell>
        <div className="text-center py-12">
          <h1 className="font-display text-2xl">Property not found</h1>
          <Link href="/user/explore" className="mt-4 inline-block text-[#173D2B]">
            Back to explore
          </Link>
        </div>
      </BuyerPageShell>
    );
  }

  return (
    <BuyerPageShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href={`/user/property/${property.slug}`} className="flex items-center gap-2 text-sm text-[#66706A] hover:text-[#172019]">
            <ArrowLeft size={16} />
            Back to property
          </Link>
        </div>

        <div>
          <h1 className="font-display text-3xl">Make an offer</h1>
          <p className="mt-1 text-[#66706A]">Submit your offer for {property.address}</p>
        </div>

        {/* Property Summary */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-4">
          <div className="flex gap-4">
            <div className="h-20 w-20 shrink-0 rounded-md bg-[#E7F0E5] overflow-hidden">
              <img
                src={property.images[0]}
                alt={property.address}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg">{property.address}</h3>
              <p className="mt-1 text-sm text-[#66706A]">{property.city}, {property.state}</p>
              <p className="mt-2 font-display text-xl font-semibold text-[#173D2B]">
                Listed: ${property.price?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Offer Form */}
        <form onSubmit={handleSubmit} className="rounded-lg border border-[#DDE2DD] bg-white p-6 space-y-6">
          {/* Offer Price */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Offer price *</label>
            <div className="relative">
              <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
              <input
                type="text"
                value={formData.offerPrice}
                onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value })}
                placeholder="450,000"
                className="w-full rounded-md border border-[#DDE2DD] pl-10 pr-4 py-3 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
              />
            </div>
            <p className="mt-1 text-xs text-[#66706A]">
              {property.price && (
                <>
                  This is {((Number(formData.offerPrice) / property.price) * 100).toFixed(1)}% of listing price
                </>
              )}
            </p>
          </div>

          {/* Financing */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Financing method *</label>
            <select
              value={formData.financing}
              onChange={(e) => setFormData({ ...formData, financing: e.target.value })}
              className="w-full rounded-md border border-[#DDE2DD] px-3 py-3 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
            >
              <option value="Mortgage">Mortgage</option>
              <option value="Cash">Cash</option>
              <option value="FHA Loan">FHA Loan</option>
              <option value="VA Loan">VA Loan</option>
            </select>
          </div>

          {/* Down Payment */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Down payment *</label>
            <div className="relative">
              <Percent size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
              <input
                type="text"
                value={formData.downPayment}
                onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
                placeholder="20"
                className="w-full rounded-md border border-[#DDE2DD] pl-10 pr-4 py-3 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
              />
            </div>
            {property.price && (
              <p className="mt-1 text-xs text-[#66706A]">
                ${(property.price * (Number(formData.downPayment) / 100)).toLocaleString()} down payment
              </p>
            )}
          </div>

          {/* Closing Preference */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Closing preference *</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
              <select
                value={formData.closingPreference}
                onChange={(e) => setFormData({ ...formData, closingPreference: e.target.value })}
                className="w-full rounded-md border border-[#DDE2DD] pl-10 pr-4 py-3 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
              >
                <option value="30-45 days">30-45 days</option>
                <option value="45-60 days">45-60 days</option>
                <option value="60-90 days">60-90 days</option>
                <option value="90+ days">90+ days</option>
              </select>
            </div>
          </div>

          {/* Inspection Period */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Inspection period</label>
            <select
              value={formData.inspectionPeriod}
              onChange={(e) => setFormData({ ...formData, inspectionPeriod: e.target.value })}
              className="w-full rounded-md border border-[#DDE2DD] px-3 py-3 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
            >
              <option value="7 days">7 days</option>
              <option value="10 days">10 days</option>
              <option value="14 days">14 days</option>
              <option value="No inspection">No inspection</option>
            </select>
          </div>

          {/* Earnest Money */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Earnest money deposit</label>
            <div className="relative">
              <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
              <input
                type="text"
                value={formData.earnestMoney}
                onChange={(e) => setFormData({ ...formData, earnestMoney: e.target.value })}
                placeholder="10,000"
                className="w-full rounded-md border border-[#DDE2DD] pl-10 pr-4 py-3 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
              />
            </div>
            <p className="mt-1 text-xs text-[#66706A]">
              {property.price && (
                <>
                  This is {((Number(formData.earnestMoney) / property.price) * 100).toFixed(2)}% of offer price
                </>
              )}
            </p>
          </div>

          {/* Contingencies */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Contingencies</label>
            <textarea
              value={formData.contingencies}
              onChange={(e) => setFormData({ ...formData, contingencies: e.target.value })}
              rows={3}
              placeholder="e.g., Contingent on sale of current property, financing approval, etc."
              className="w-full rounded-md border border-[#DDE2DD] px-3 py-3 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
            />
          </div>

          {/* Additional Terms */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Additional terms</label>
            <textarea
              value={formData.additionalTerms}
              onChange={(e) => setFormData({ ...formData, additionalTerms: e.target.value })}
              rows={3}
              placeholder="Any other terms or conditions you'd like to include..."
              className="w-full rounded-md border border-[#DDE2DD] px-3 py-3 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4 border-t border-[#E8EBE8]">
            <Link
              href={`/user/property/${property.slug}`}
              className="flex-1 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0] text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
            >
              <Send size={18} />
              Submit offer
            </button>
          </div>
        </form>

        {/* Disclaimer */}
        <div className="rounded-lg bg-[#F3EBDD] p-4">
          <p className="text-xs text-[#66706A]">
            <strong>Disclaimer:</strong> Submitting an offer creates a legally binding document. 
            Please consult with a real estate professional or attorney before submitting. 
            earnest money deposits are typically held in escrow and may be forfeited if you back out without valid contingencies.
          </p>
        </div>
      </div>
    </BuyerPageShell>
  );
}

export default function NewOfferPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewOfferContent />
    </Suspense>
  );
}
