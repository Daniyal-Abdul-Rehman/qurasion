'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Clock, FileText, Home, User, MessageSquare, AlertTriangle } from 'lucide-react';
import BuyerPageShell from '../../../../../components/organisms/BuyerPageShell';
import { buyerTransactions, buyerProperties } from '../../../../../lib/buyer-data';

export default function TransactionDetailPage() {
  const params = useParams();

  const transaction = buyerTransactions.find(t => t.id === params.id);
  const property = transaction ? buyerProperties.find(p => p.id === transaction.propertyId) : null;

  if (!transaction || !property) {
    return (
      <BuyerPageShell>
        <div className="text-center py-12">
          <h1 className="font-display text-2xl">Transaction not found</h1>
          <Link href="/user/transactions" className="mt-4 inline-block text-[#173D2B]">
            Back to transactions
          </Link>
        </div>
      </BuyerPageShell>
    );
  }

  const getStatusInfo = () => {
    switch (transaction.status) {
      case 'Closed':
        return {
          icon: <CheckCircle2 size={24} className="text-[#31551C]" />,
          color: 'bg-[#E8F5D3]',
          textColor: 'text-[#31551C]',
          message: 'Transaction closed successfully'
        };
      case 'Contract':
        return {
          icon: <FileText size={24} className="text-[#B8860B]" />,
          color: 'bg-[#FFF8E6]',
          textColor: 'text-[#B8860B]',
          message: 'Contract phase in progress'
        };
      case 'Due Diligence':
        return {
          icon: <Clock size={24} className="text-[#B8860B]" />,
          color: 'bg-[#FFF8E6]',
          textColor: 'text-[#B8860B]',
          message: 'Due diligence in progress'
        };
      case 'Financing':
        return {
          icon: <Clock size={24} className="text-[#B8860B]" />,
          color: 'bg-[#FFF8E6]',
          textColor: 'text-[#B8860B]',
          message: 'Financing in progress'
        };
      case 'Closing':
        return {
          icon: <Clock size={24} className="text-[#B8860B]" />,
          color: 'bg-[#FFF8E6]',
          textColor: 'text-[#B8860B]',
          message: 'Closing in progress'
        };
      default:
        return {
          icon: <AlertTriangle size={24} className="text-[#66706A]" />,
          color: 'bg-[#F0F2F0]',
          textColor: 'text-[#66706A]',
          message: 'Transaction pending'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <BuyerPageShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/user/transactions" className="flex items-center gap-2 text-sm text-[#66706A] hover:text-[#172019]">
            <ArrowLeft size={16} />
            Back to transactions
          </Link>
        </div>

        {/* Status Banner */}
        <div className={`rounded-lg p-4 ${statusInfo.color}`}>
          <div className="flex items-center gap-3">
            {statusInfo.icon}
            <div>
              <p className={`font-semibold ${statusInfo.textColor}`}>{statusInfo.message}</p>
              <p className="text-sm text-[#66706A]">
                Expected closing: {transaction.expectedClosing}
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

            {/* Transaction Details */}
            <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Transaction details</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Purchase price</span>
                  <span className="font-display text-lg font-semibold">${transaction.purchasePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Status</span>
                  <span className="font-medium">{transaction.status}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8EBE8]">
                  <span className="text-[#66706A]">Start date</span>
                  <span className="font-medium">{transaction.startDate}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-[#66706A]">Expected closing</span>
                  <span className="font-medium">{transaction.expectedClosing}</span>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Progress</h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall progress</span>
                  <span className="text-sm font-semibold">{transaction.progress}%</span>
                </div>
                <div className="h-3 rounded-full bg-[#E8EBE8]">
                  <div 
                    className="h-full rounded-full bg-[#173D2B] transition-all" 
                    style={{ width: `${transaction.progress}%` }}
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                {['INITIATED', 'DUE_DILIGENCE', 'CONTRACTED', 'FINANCING', 'CLOSING', 'CLOSED'].map((stage, index) => {
                  const stageLabels: Record<string, string> = {
                    'INITIATED': 'Offer Accepted',
                    'DUE_DILIGENCE': 'Due Diligence',
                    'CONTRACTED': 'Contract Signed',
                    'FINANCING': 'Financing',
                    'CLOSING': 'Closing',
                    'CLOSED': 'Closed',
                  };
                  
                  const currentStageIndex = ['INITIATED', 'DUE_DILIGENCE', 'CONTRACTED', 'FINANCING', 'CLOSING', 'CLOSED'].indexOf(transaction.status);
                  const isCompleted = index <= currentStageIndex;
                  const isCurrent = index === currentStageIndex;

                  return (
                    <div key={stage} className="flex items-center gap-3">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        isCompleted ? 'bg-[#173D2B] text-white' : 'bg-[#E8EBE8] text-[#66706A]'
                      }`}>
                        {isCompleted ? <CheckCircle2 size={14} /> : <div className="h-2 w-2 rounded-full bg-[#66706A]" />}
                      </div>
                      <span className={`text-sm ${isCurrent ? 'font-semibold' : ''}`}>{stageLabels[stage]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tasks */}
            <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Your tasks</h3>
              <div className="space-y-3">
                {transaction.tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 rounded-md p-3 bg-[#F0F2F0]">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      task.status === 'Completed' ? 'bg-[#173D2B] text-white' : 'bg-white border border-[#DDE2DD]'
                    }`}>
                      {task.status === 'Completed' && <CheckCircle2 size={12} />}
                    </div>
                    <span className={`text-sm ${task.status === 'Completed' ? 'line-through text-[#66706A]' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Documents</h3>
              <div className="space-y-3">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                >
                  <FileText size={18} />
                  Purchase agreement
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                >
                  <FileText size={18} />
                  Closing disclosure
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
              <h3 className="font-display text-lg mb-4">Contact broker</h3>
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
                <Link
                  href="/user/offers"
                  className="flex items-center gap-2 w-full rounded-md p-3 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                >
                  <FileText size={18} />
                  View offer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BuyerPageShell>
  );
}
