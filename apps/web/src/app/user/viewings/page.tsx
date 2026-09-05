'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, Plus, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { buyerViewings, buyerProperties } from '../../../lib/buyer-data';

export default function ViewingsPage() {
  const [filter, setFilter] = useState<'All' | 'Upcoming' | 'Past' | 'Cancelled'>('All');

  const upcomingViewings = buyerViewings.filter(v => v.status === 'Confirmed' || v.status === 'Pending');
  const pastViewings = buyerViewings.filter(v => v.status === 'Completed');
  const cancelledViewings = buyerViewings.filter(v => v.status === 'Cancelled');

  const filteredViewings = filter === 'All' 
    ? buyerViewings 
    : filter === 'Upcoming' 
    ? upcomingViewings 
    : filter === 'Past' 
    ? pastViewings 
    : cancelledViewings;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle2 size={16} className="text-[#31551C]" />;
      case 'Pending':
        return <Clock size={16} className="text-[#B8860B]" />;
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
      case 'Pending':
        return 'bg-[#FFF8E6] text-[#B8860B]';
      case 'Completed':
        return 'bg-[#F0F2F0] text-[#66706A]';
      case 'Cancelled':
        return 'bg-[#FDE8E8] text-[#C41E3A]';
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
            <h1 className="font-display text-3xl">Viewings</h1>
            <p className="mt-1 text-[#66706A]">Schedule and manage property viewings</p>
          </div>
          <Link
            href="/user/explore"
            className="flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
          >
            <Plus size={18} />
            <span>Schedule viewing</span>
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
        {filteredViewings.length === 0 ? (
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-12 text-center">
            <Calendar size={48} className="mx-auto text-[#DDE2DD]" />
            <h3 className="mt-4 font-display text-xl">
              {filter === 'Upcoming' ? 'No upcoming viewings' : 'No viewings yet'}
            </h3>
            <p className="mt-2 text-[#66706A]">
              {filter === 'Upcoming' 
                ? 'Your upcoming viewings will appear here.'
                : 'Schedule your first property viewing to get started.'}
            </p>
            <Link
              href="/user/explore"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
            >
              Explore properties
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredViewings.map((viewing) => {
              const property = buyerProperties.find(p => p.id === viewing.propertyId);
              return (
                <Link
                  key={viewing.id}
                  href={`/user/viewings/${viewing.id}`}
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
                          <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(viewing.status)}`}>
                            {getStatusIcon(viewing.status)}
                            {viewing.status}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-semibold">{viewing.propertyAddress}</h3>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {viewing.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {viewing.time}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-sm text-[#66706A]">
                          <User size={14} />
                          <span>{viewing.contact}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {property && (
                        <Link
                          href={`/user/property/${property.slug}`}
                          className="text-sm font-medium text-[#173D2B] hover:underline"
                        >
                          View property
                        </Link>
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
