'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Calendar, MapPin, Users, Star, MessageSquare, 
  Phone, FileText, Download, Share2, ExternalLink, XCircle,
  CheckCircle2, Clock, AlertTriangle
} from 'lucide-react';
import BuyerPageShell from '../../../../../components/organisms/BuyerPageShell';
import { buyerBookings, buyerProperties } from '../../../../../lib/buyer-data';

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  const booking = buyerBookings.find(b => b.id === params.id);
  const property = booking ? buyerProperties.find(p => p.id === booking.propertyId) : null;

  if (!booking || !property) {
    return (
      <BuyerPageShell>
        <div className="text-center py-12">
          <h1 className="font-display text-2xl">Booking not found</h1>
          <Link href="/user/trips" className="mt-4 inline-block text-[#173D2B]">
            Back to trips
          </Link>
        </div>
      </BuyerPageShell>
    );
  }

  const handleCancelBooking = () => {
    // In a real app, this would make an API call
    router.push('/user/trips');
  };

  const getStatusInfo = () => {
    switch (booking.status) {
      case 'Confirmed':
        return {
          icon: <CheckCircle2 size={24} className="text-[#31551C]" />,
          color: 'bg-[#E8F5D3]',
          textColor: 'text-[#31551C]',
          message: 'Your booking is confirmed'
        };
      case 'Completed':
        return {
          icon: <CheckCircle2 size={24} className="text-[#66706A]" />,
          color: 'bg-[#F0F2F0]',
          textColor: 'text-[#66706A]',
          message: 'Your stay has been completed'
        };
      case 'Cancelled':
        return {
          icon: <XCircle size={24} className="text-[#C41E3A]" />,
          color: 'bg-[#FDE8E8]',
          textColor: 'text-[#C41E3A]',
          message: 'This booking has been cancelled'
        };
      default:
        return {
          icon: <Clock size={24} className="text-[#B8860B]" />,
          color: 'bg-[#FFF8E6]',
          textColor: 'text-[#B8860B]',
          message: 'Booking pending'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <BuyerPageShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/user/trips" className="flex items-center gap-2 text-sm text-[#66706A] hover:text-[#172019]">
            <ArrowLeft size={16} />
            Back to trips
          </Link>
        </div>

        {/* Status Banner */}
        <div className={`rounded-lg p-4 ${statusInfo.color}`}>
          <div className="flex items-center gap-3">
            {statusInfo.icon}
            <div>
              <p className={`font-semibold ${statusInfo.textColor}`}>{statusInfo.message}</p>
              <p className="text-sm text-[#66706A]">
                {booking.status === 'Confirmed' && 'Check-in instructions will be sent 24 hours before arrival.'}
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
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {property.bedrooms} beds • {property.bathrooms} baths
                    </span>
                    {property.rating && (
                      <span className="flex items-center gap-1">
                        <Star size={14} className="fill-[#B8860B] text-[#B8860B]" />
                        {property.rating} ({property.reviews} reviews)
                      </span>
                    )}
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

            {/* Booking Details */}
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Booking details</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Check-in</span>
                  <span className="font-medium">{booking.checkIn}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Check-out</span>
                  <span className="font-medium">{booking.checkOut}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Guests</span>
                  <span className="font-medium">{booking.guests}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Nightly rate</span>
                  <span className="font-medium">${booking.nightlyRate}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Cleaning fee</span>
                  <span className="font-medium">${booking.cleaningFee}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Platform fee</span>
                  <span className="font-medium">${booking.platformFee}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Taxes</span>
                  <span className="font-medium">${booking.taxes}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-semibold">Total</span>
                  <span className="font-display text-lg font-semibold text-[#173D2B]">${booking.finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </section>

            {/* Check-in Instructions (for confirmed bookings) */}
            {booking.status === 'Confirmed' && (
              <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
                <h3 className="font-display text-lg mb-4">Check-in instructions</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                      <Calendar size={16} className="text-[#31551C]" />
                    </div>
                    <div>
                      <p className="font-medium">Check-in time</p>
                      <p className="text-sm text-[#66706A]">3:00 PM on {booking.checkIn}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                      <MapPin size={16} className="text-[#31551C]" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-[#66706A]">{property.address}</p>
                      <p className="text-sm text-[#66706A]">{property.city}, {property.state} {property.zip}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                      <Phone size={16} className="text-[#31551C]" />
                    </div>
                    <div>
                      <p className="font-medium">Contact host</p>
                      <p className="text-sm text-[#66706A]">{booking.host}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Review (for completed bookings) */}
            {booking.status === 'Completed' && (
              <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
                <h3 className="font-display text-lg mb-4">Leave a review</h3>
                <p className="text-sm text-[#66706A] mb-4">
                  How was your stay? Share your experience with other travelers.
                </p>
                <button className="rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]">
                  Write a review
                </button>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Host Info */}
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Your host</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#173D2B] text-sm font-semibold text-white">
                  {booking.host.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium">{booking.host}</p>
                  {property?.rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star size={14} className="fill-[#B8860B] text-[#B8860B]" />
                      <span>{property.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  href="/user/messages"
                  className="flex items-center gap-2 w-full rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                >
                  <MessageSquare size={18} />
                  Message host
                </Link>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Quick actions</h3>
              <div className="space-y-2">
                <button className="flex items-center gap-2 w-full rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]">
                  <FileText size={18} />
                  View receipt
                </button>
                <button className="flex items-center gap-2 w-full rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]">
                  <Download size={18} />
                  Download details
                </button>
                <button className="flex items-center gap-2 w-full rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]">
                  <Share2 size={18} />
                  Share booking
                </button>
                {booking.status === 'Confirmed' && (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="flex items-center gap-2 w-full rounded-md p-3 text-sm font-medium text-[#C41E3A] hover:bg-[#FDE8E8]"
                  >
                    <XCircle size={18} />
                    Cancel booking
                  </button>
                )}
              </div>
            </section>

            {/* Need Help */}
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Need help?</h3>
              <p className="text-sm text-[#66706A] mb-4">
                Having issues with your booking? Contact support for assistance.
              </p>
              <button className="w-full rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]">
                Contact support
              </button>
            </section>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={24} className="text-[#B8860B]" />
              <h3 className="font-display text-xl">Cancel booking?</h3>
            </div>
            <p className="text-sm text-[#66706A] mb-4">
              Are you sure you want to cancel this booking? Cancellation policies and fees may apply.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
              >
                Keep booking
              </button>
              <button
                onClick={handleCancelBooking}
                className="flex-1 rounded-md bg-[#C41E3A] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#A01828]"
              >
                Cancel booking
              </button>
            </div>
          </div>
        </div>
      )}
    </BuyerPageShell>
  );
}
