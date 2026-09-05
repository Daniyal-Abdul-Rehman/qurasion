'use client';

import Link from 'next/link';
import { FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { buyerTransactions, buyerProperties } from '../../../lib/buyer-data';

export default function TransactionsPage() {
  return (
    <BuyerPageShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl">Transactions</h1>
          <p className="mt-1 text-[#66706A]">Track your property purchases</p>
        </div>

        {/* Empty State */}
        {buyerTransactions.length === 0 ? (
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-12 text-center">
            <FileText size={48} className="mx-auto text-[#DDE2DD]" />
            <h3 className="mt-4 font-display text-xl">No active transactions</h3>
            <p className="mt-2 text-[#66706A]">
              When you have an accepted offer, your transaction details will appear here.
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
            {buyerTransactions.map((transaction) => {
              const property = buyerProperties.find(p => p.id === transaction.propertyId);
              return (
                <Link
                  key={transaction.id}
                  href={`/user/transactions/${transaction.id}`}
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
                        <h3 className="font-display text-lg font-semibold">{transaction.propertyAddress}</h3>
                        <p className="mt-1 font-display text-xl font-semibold text-[#173D2B]">
                          ${transaction.purchasePrice.toLocaleString()}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                            transaction.status === 'Closed' ? 'bg-[#E8F5D3] text-[#31551C]' : 'bg-[#FFF8E6] text-[#B8860B]'
                          }`}>
                            {transaction.status === 'Closed' ? <CheckCircle2 size={14} className="text-[#31551C]" /> : <Clock size={14} className="text-[#B8860B]" />}
                            {transaction.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-[#66706A]">Expected closing: {transaction.expectedClosing}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">
                        <p className="text-xs text-[#9AA8A0]">Progress</p>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-[#E8EBE8]">
                            <div 
                              className="h-full rounded-full bg-[#173D2B]" 
                              style={{ width: `${transaction.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{transaction.progress}%</span>
                        </div>
                      </div>
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
