'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, FileText, CheckCircle2, Clock, AlertTriangle, Home, User, MessageSquare } from 'lucide-react';
import BuyerPageShell from '../../../../../components/organisms/BuyerPageShell';
import { buyerProperties } from '../../../../../lib/buyer-data';

export default function RentalDetailPage() {
  const params = useParams();

  // Mock rental application
  const application = {
    id: 'rental-1',
    propertyId: 'prop-2',
    propertyAddress: '741 Pine Avenue',
    status: 'Approved',
    appliedDate: 'Sep 01, 2026',
    moveInDate: 'Oct 1, 2026',
    monthlyRent: 2400,
    leaseTerm: '12 months',
    deposit: 4800,
  };

  const property = buyerProperties.find(p => p.id === application.propertyId);

  if (!property) {
    return (
      <BuyerPageShell>
        <div className="text-center py-12">
          <h1 className="font-display text-2xl">Application not found</h1>
          <Link href="/user/rentals" className="mt-4 inline-block text-[#173D2B]">
            Back to rentals
          </Link>
        </div>
      </BuyerPageShell>
    );
  }

  const getStatusInfo = () => {
    switch (application.status) {
      case 'Approved':
        return {
          icon: <CheckCircle2 size={24} className="text-[#31551C]" />,
          color: 'bg-[#E8F5D3]',
          textColor: 'text-[#31551C]',
          message: 'Your application has been approved'
        };
      case 'Applied':
        return {
          icon: <Clock size={24} className="text-[#B8860B]" />,
          color: 'bg-[#FFF8E6]',
          textColor: 'text-[#B8860B]',
          message: 'Your application is under review'
        };
      case 'Rejected':
        return {
          icon: <AlertTriangle size={24} className="text-[#C41E3A]" />,
          color: 'bg-[#FDE8E8]',
          textColor: 'text-[#C41E3A]',
          message: 'Your application was not approved'
        };
      default:
        return {
          icon: <Clock size={24} className="text-[#66706A]" />,
          color: 'bg-[#F0F2F0]',
          textColor: 'text-[#66706A]',
          message: 'Application pending'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <BuyerPageShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/user/rentals" className="flex items-center gap-2 text-sm text-[#66706A] hover:text-[#172019]">
            <ArrowLeft size={16} />
            Back to rentals
          </Link>
        </div>

        {/* Status Banner */}
        <div className={`rounded-lg p-4 ${statusInfo.color}`}>
          <div className="flex items-center gap-3">
            {statusInfo.icon}
            <div>
              <p className={`font-semibold ${statusInfo.textColor}`}>{statusInfo.message}</p>
              <p className="text-sm text-[#66706A]">
                {application.status === 'Approved' && 'Please review the lease agreement and complete the move-in process.'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Main Content */}
          <div className="space-y-6">
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

            {/* Application Details */}
            <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Application details</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Monthly rent</span>
                  <span className="font-display text-lg font-semibold">${application.monthlyRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Lease term</span>
                  <span className="font-medium">{application.leaseTerm}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Security deposit</span>
                  <span className="font-medium">${application.deposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Move-in date</span>
                  <span className="font-medium">{application.moveInDate}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-[#66706A]">Applied</span>
                  <span className="font-medium">{application.appliedDate}</span>
                </div>
              </div>
            </div>

            {/* Documents */}
            {application.status === 'Approved' && (
              <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
                <h3 className="font-display text-lg mb-4">Documents</h3>
                <div className="space-y-3">
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                  >
                    <FileText size={18} />
                    Lease agreement
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                  >
                    <FileText size={18} />
                    Move-in checklist
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Contact landlord</h3>
              <div className="space-y-2">
                <Link
                  href="/user/messages"
                  className="flex items-center gap-2 w-full rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                >
                  <MessageSquare size={18} />
                  Send message
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Quick actions</h3>
              <div className="space-y-2">
                <Link
                  href={`/user/property/${property.slug}`}
                  className="flex items-center gap-2 w-full rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                >
                  <Home size={18} />
                  View property
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BuyerPageShell>
  );
}
