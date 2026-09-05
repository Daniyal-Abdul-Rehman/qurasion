'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, MessageSquare, XCircle, AlertTriangle } from 'lucide-react';
import BuyerPageShell from '../../../../../components/organisms/BuyerPageShell';
import { buyerViewings, buyerProperties } from '../../../../../lib/buyer-data';

export default function ViewingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  const viewing = buyerViewings.find(v => v.id === params.id);
  const property = viewing ? buyerProperties.find(p => p.id === viewing.propertyId) : null;

  if (!viewing || !property) {
    return (
      <BuyerPageShell>
        <div className="text-center py-12">
          <h1 className="font-display text-2xl">Viewing not found</h1>
          <Link href="/user/viewings" className="mt-4 inline-block text-[#173D2B]">
            Back to viewings
          </Link>
        </div>
      </BuyerPageShell>
    );
  }

  const handleCancelViewing = () => {
    // In a real app, this would make an API call
    router.push('/user/viewings');
  };

  return (
    <BuyerPageShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/user/viewings" className="flex items-center gap-2 text-sm text-[#66706A] hover:text-[#172019]">
            <ArrowLeft size={16} />
            Back to viewings
          </Link>
        </div>

        {/* Property Info */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
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
              <Link
                href={`/user/property/${property.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#173D2B] hover:underline"
              >
                View property details
              </Link>
            </div>
          </div>
        </div>

        {/* Viewing Details */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h3 className="font-display text-lg mb-4">Viewing details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5D3]">
                <Calendar size={18} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm text-[#9AA8A0]">Date</p>
                <p className="font-medium">{viewing.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5D3]">
                <Clock size={18} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm text-[#9AA8A0]">Time</p>
                <p className="font-medium">{viewing.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5D3]">
                <User size={18} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm text-[#9AA8A0]">Contact</p>
                <p className="font-medium">{viewing.contact}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5D3]">
                <MapPin size={18} className="text-[#31551C]" />
              </div>
              <div>
                <p className="text-sm text-[#9AA8A0]">Location</p>
                <p className="font-medium">{property.address}</p>
                <p className="text-sm text-[#66706A]">{property.city}, {property.state} {property.zip}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h3 className="font-display text-lg mb-4">Contact broker</h3>
          <div className="space-y-3">
            <Link
              href="/user/messages"
              className="flex items-center gap-3 w-full rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
            >
              <MessageSquare size={18} />
              Send message
            </Link>
            <button className="flex items-center gap-3 w-full rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]">
              <Phone size={18} />
              Call broker
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h3 className="font-display text-lg mb-4">Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex items-center gap-2 w-full rounded-md border border-[#C41E3A] px-4 py-2.5 text-sm font-medium text-[#C41E3A] hover:bg-[#FDE8E8]"
            >
              <XCircle size={18} />
              Cancel viewing
            </button>
          </div>
        </div>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={24} className="text-[#B8860B]" />
                <h3 className="font-display text-xl">Cancel viewing?</h3>
              </div>
              <p className="text-sm text-[#66706A] mb-4">
                Are you sure you want to cancel this viewing? The broker will be notified.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                >
                  Keep viewing
                </button>
                <button
                  onClick={handleCancelViewing}
                  className="flex-1 rounded-md bg-[#C41E3A] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#A01828]"
                >
                  Cancel viewing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BuyerPageShell>
  );
}
