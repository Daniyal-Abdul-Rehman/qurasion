'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, Star, Clock, CheckCircle2, XCircle, AlertCircle, Plus } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { buyerBookings, buyerProperties } from '../../../lib/buyer-data';

export default function TripsPage() {
  const [filter, setFilter] = useState<'All' | 'Upcoming' | 'Past' | 'Cancelled'>('All');

  const upcomingBookings = buyerBookings.filter(b => b.status === 'Confirmed');
  const pastBookings = buyerBookings.filter(b => b.status === 'Completed');
  const cancelledBookings = buyerBookings.filter(b => b.status === 'Cancelled');

  const filteredBookings = filter === 'All' 
    ? buyerBookings 
    : filter === 'Upcoming' 
    ? upcomingBookings 
    : filter === 'Past' 
    ? pastBookings 
    : cancelledBookings;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle2 size={16} className="text-[#31551C]" />;
      case 'Completed':
        return <CheckCircle2 size={16} className="text-[#66706A]" />;
      case 'Cancelled':
        return <XCircle size={16} className="text-[#C41E3A]" />;
      default:
        return <AlertCircle size={16} className="text-[#B8860B]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-[#E8F5D3] text-[#31551C]';
      case 'Completed':
        return 'bg-[#F0F2F0] text-[#66706A]';
      case 'Cancelled':
        return 'bg-[#FDE8E8] text-[#C41E3A]';
      default:
        return 'bg-[#FFF8E6] text-[#B8860B]';
    }
  };

  return (
    <BuyerPageShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl">Trips</h1>
            <p className="mt-1 text-[#66706A]">Manage your short-term stays</p>
          </div>
          <Link
            href="/user/explore?intent=Stay"
            className="flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
          >
            <Plus size={18} />
            <span>Book a stay</span>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-[#DDE2DD]">
          {(['All', 'Upcoming', 'Past', 'Cancelled'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
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
        {filteredBookings.length === 0 ? (
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-12 text-center">
            <Calendar size={48} className="mx-auto text-[#DDE2DD]" />
            <h3 className="mt-4 font-display text-xl">
              {filter === 'Upcoming' ? 'No upcoming trips' : 'No trips yet'}
            </h3>
            <p className="mt-2 text-[#66706A]">
              {filter === 'Upcoming' 
                ? 'Your upcoming trips will appear here.'
                : 'Book your first short-term stay to get started.'}
            </p>
            <Link
              href="/user/explore?intent=Stay"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
            >
              Explore stays
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const property = buyerProperties.find(p => p.id === booking.propertyId);
              return (
                <Link
                  key={booking.id}
                  href={`/user/trips/${booking.id}`}
                  className="block rounded-lg border border-[#DDE2DD] bg-white p-5 hover:border-[#173D2B] transition-colors"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      {property && (
                        <div className="h-24 w-24 shrink-0 rounded-md bg-[#E7F0E5] overflow-hidden">
                          <img
                            src={property.images[0]}
                            alt={property.address}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-semibold">{booking.city}</h3>
                        <p className="mt-1 text-sm text-[#66706A]">{property?.address}</p>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {booking.checkIn} - {booking.checkOut}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {booking.guests} guests
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <span className="font-semibold text-[#173D2B]">${booking.finalTotal.toLocaleString()}</span>
                          <span className="text-[#66706A]">total</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#9AA8A0]">Hosted by</p>
                      <p className="text-sm font-medium">{booking.host}</p>
                      {property?.rating && (
                        <div className="mt-1 flex items-center gap-1 text-sm">
                          <Star size={14} className="fill-[#B8860B] text-[#B8860B]" />
                          <span>{property.rating}</span>
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
