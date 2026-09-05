'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users, DollarSign, ArrowRight, Heart, Clock } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { buyerProperties, savedProperties, buyerViewings, buyerBookings, buyerOffers } from '../../../lib/buyer-data';

export default function BuyerHomePage() {
  const [intent, setIntent] = useState<'Buy' | 'Rent' | 'Stay'>('Buy');
  const [location, setLocation] = useState('');

  return (
    <BuyerPageShell>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="font-display text-3xl sm:text-4xl">Good morning, Alex</h1>
          <p className="mt-2 text-[#66706A]">What are you looking for today?</p>
        </div>

        {/* Main Search */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-4 sm:p-6">
          {/* Intent Selector */}
          <div className="flex gap-2 mb-4">
            {(['Buy', 'Rent', 'Stay'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setIntent(option)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  intent === option
                    ? 'bg-[#173D2B] text-white'
                    : 'bg-[#F0F2F0] text-[#66706A] hover:bg-[#E8EBE8]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
              <input
                type="text"
                placeholder="Where?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-md border border-[#DDE2DD] pl-10 pr-4 py-2.5 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
              />
            </div>

            {intent === 'Buy' && (
              <>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
                  <select className="w-full appearance-none rounded-md border border-[#DDE2DD] pl-10 pr-4 py-2.5 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                    <option>Price range</option>
                    <option>$100k - $300k</option>
                    <option>$300k - $500k</option>
                    <option>$500k - $750k</option>
                    <option>$750k+</option>
                  </select>
                </div>
                <div className="relative">
                  <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
                  <select className="w-full appearance-none rounded-md border border-[#DDE2DD] pl-10 pr-4 py-2.5 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                    <option>Bedrooms</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                  </select>
                </div>
              </>
            )}

            {intent === 'Rent' && (
              <>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
                  <select className="w-full appearance-none rounded-md border border-[#DDE2DD] pl-10 pr-4 py-2.5 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                    <option>Monthly budget</option>
                    <option>$1k - $2k</option>
                    <option>$2k - $3k</option>
                    <option>$3k - $5k</option>
                    <option>$5k+</option>
                  </select>
                </div>
                <div className="relative">
                  <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
                  <select className="w-full appearance-none rounded-md border border-[#DDE2DD] pl-10 pr-4 py-2.5 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                    <option>Bedrooms</option>
                    <option>Studio</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                  </select>
                </div>
              </>
            )}

            {intent === 'Stay' && (
              <>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
                  <input
                    type="text"
                    placeholder="Check-in - Check-out"
                    className="w-full rounded-md border border-[#DDE2DD] pl-10 pr-4 py-2.5 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                  />
                </div>
                <div className="relative">
                  <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
                  <select className="w-full appearance-none rounded-md border border-[#DDE2DD] pl-10 pr-4 py-2.5 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                    <option>Guests</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
              </>
            )}

            <Link
              href={`/user/explore/${intent.toLowerCase()}`}
              className="flex items-center justify-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022] transition-colors"
            >
              <Search size={18} />
              <span>Search</span>
            </Link>
          </div>
        </div>

        {/* Continue Where You Left Off */}
        {(buyerViewings.length > 0 || buyerOffers.length > 0 || buyerBookings.length > 0) && (
          <section>
            <h2 className="font-display text-xl mb-4">Continue where you left off</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {buyerViewings.map((viewing) => (
                <Link
                  key={viewing.id}
                  href={`/user/viewings/${viewing.id}`}
                  className="flex items-center gap-3 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5D3]">
                    <Calendar size={18} className="text-[#31551C]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Viewing scheduled</p>
                    <p className="mt-1 text-xs text-[#66706A]">{viewing.propertyAddress}</p>
                    <p className="text-xs text-[#66706A]">{viewing.date} at {viewing.time}</p>
                  </div>
                  <ArrowRight size={16} className="text-[#9AA8A0]" />
                </Link>
              ))}

              {buyerOffers.filter(o => o.status === 'Countered').map((offer) => (
                <Link
                  key={offer.id}
                  href={`/user/offers/${offer.id}`}
                  className="flex items-center gap-3 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8E6]">
                    <DollarSign size={18} className="text-[#B8860B]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Counter offer received</p>
                    <p className="mt-1 text-xs text-[#66706A]">{offer.propertyAddress}</p>
                    <p className="text-xs text-[#66706A]">${offer.counterOffer?.price.toLocaleString()}</p>
                  </div>
                  <ArrowRight size={16} className="text-[#9AA8A0]" />
                </Link>
              ))}

              {buyerBookings.map((booking) => (
                <Link
                  key={booking.id}
                  href={`/user/trips/${booking.id}`}
                  className="flex items-center gap-3 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F0F4]">
                    <Calendar size={18} className="text-[#315A6B]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Upcoming trip</p>
                    <p className="mt-1 text-xs text-[#66706A]">{booking.city}</p>
                    <p className="text-xs text-[#66706A]">{booking.checkIn} - {booking.checkOut}</p>
                  </div>
                  <ArrowRight size={16} className="text-[#9AA8A0]" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recommended Properties */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Properties you may like</h2>
            <Link href="/user/explore" className="text-sm font-semibold text-[#173D2B]">
              See all <ArrowRight className="ml-1 inline" size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {buyerProperties.slice(0, 4).map((property) => (
              <Link
                key={property.id}
                href={`/user/property/${property.slug}`}
                className="group rounded-lg border border-[#DDE2DD] bg-white overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] bg-[#E7F0E5]">
                  <img
                    src={property.images[0]}
                    alt={property.address}
                    className="h-full w-full object-cover"
                  />
                  <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#66706A] hover:text-red-500 transition-colors">
                    <Heart size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <p className="font-display text-lg font-semibold">
                    {property.price ? `$${property.price.toLocaleString()}` : property.monthlyRent ? `$${property.monthlyRent.toLocaleString()}/month` : `$${property.nightlyRate}/night`}
                  </p>
                  <p className="mt-1 text-sm text-[#66706A]">
                    {property.bedrooms} beds • {property.bathrooms} baths • {property.size.toLocaleString()} sq ft
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#172019]">{property.address}</p>
                  <p className="mt-1 text-xs text-[#9AA8A0]">{property.city}, {property.state}</p>
                  {property.estimatedValue && (
                    <div className="mt-3 rounded-md bg-[#E8F5D3] px-3 py-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#31551C]">Estimated value</p>
                      <p className="text-sm font-medium text-[#31551C]">
                        ${property.estimatedValue.min.toLocaleString()}–${property.estimatedValue.max.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recently Viewed */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Recently viewed</h2>
            <Link href="/user/explore" className="text-sm font-semibold text-[#173D2B]">
              See all <ArrowRight className="ml-1 inline" size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {buyerProperties.slice(0, 3).map((property) => (
              <Link
                key={property.id}
                href={`/user/property/${property.slug}`}
                className="flex items-center gap-3 rounded-lg border border-[#DDE2DD] bg-white p-3 hover:border-[#173D2B] transition-colors"
              >
                <div className="h-16 w-16 shrink-0 rounded-md bg-[#E7F0E5] overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.address}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{property.address}</p>
                  <p className="mt-1 text-xs text-[#66706A]">{property.city}, {property.state}</p>
                  <p className="mt-1 text-sm font-medium">
                    {property.price ? `$${property.price.toLocaleString()}` : property.monthlyRent ? `$${property.monthlyRent.toLocaleString()}/month` : `$${property.nightlyRate}/night`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </BuyerPageShell>
  );
}
