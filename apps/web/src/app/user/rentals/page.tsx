'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileText, Clock, CheckCircle2, XCircle, AlertCircle, Plus } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { buyerProperties } from '../../../lib/buyer-data';

export default function RentalsPage() {
  const [filter, setFilter] = useState<'All' | 'Applied' | 'Approved' | 'Rejected'>('All');

  // Mock rental applications
  const rentalApplications = [
    {
      id: 'rental-1',
      propertyId: 'prop-2',
      propertyAddress: '741 Pine Avenue',
      status: 'Approved',
      appliedDate: 'Sep 01, 2026',
      moveInDate: 'Oct 1, 2026',
      monthlyRent: 2400,
    },
  ];

  const filteredApplications = filter === 'All' 
    ? rentalApplications 
    : rentalApplications.filter(a => a.status.toLowerCase() === filter.toLowerCase());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle2 size={16} className="text-[#31551C]" />;
      case 'Applied':
        return <Clock size={16} className="text-[#B8860B]" />;
      case 'Rejected':
        return <XCircle size={16} className="text-[#C41E3A]" />;
      default:
        return <AlertCircle size={16} className="text-[#B8860B]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-[#E8F5D3] text-[#31551C]';
      case 'Applied':
        return 'bg-[#FFF8E6] text-[#B8860B]';
      case 'Rejected':
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
            <h1 className="font-display text-3xl">Rental Applications</h1>
            <p className="mt-1 text-[#66706A]">Track your rental applications</p>
          </div>
          <Link
            href="/user/explore?intent=Rent"
            className="flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
          >
            <Plus size={18} />
            <span>Apply for rental</span>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-[#DDE2DD]">
          {(['All', 'Applied', 'Approved', 'Rejected'] as const).map((option) => (
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
        {filteredApplications.length === 0 ? (
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-12 text-center">
            <Home size={48} className="mx-auto text-[#DDE2DD]" />
            <h3 className="mt-4 font-display text-xl">No rental applications yet</h3>
            <p className="mt-2 text-[#66706A]">
              When you apply for rentals, your applications will appear here.
            </p>
            <Link
              href="/user/explore?intent=Rent"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
            >
              Explore rentals
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => {
              const property = buyerProperties.find(p => p.id === application.propertyId);
              return (
                <Link
                  key={application.id}
                  href={`/user/rentals/${application.id}`}
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
                          <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(application.status)}`}>
                            {getStatusIcon(application.status)}
                            {application.status}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-semibold">{application.propertyAddress}</h3>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="font-semibold text-[#173D2B]">${application.monthlyRent.toLocaleString()}/month</span>
                          <span className="text-[#66706A]">Move-in: {application.moveInDate}</span>
                        </div>
                        <p className="mt-1 text-xs text-[#9AA8A0]">Applied {application.appliedDate}</p>
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
