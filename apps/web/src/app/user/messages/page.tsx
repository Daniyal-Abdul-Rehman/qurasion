'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Search, MoreVertical, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { buyerMessages, buyerProperties } from '../../../lib/buyer-data';

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'Unread' | 'Properties' | 'Bookings'>('All');

  const filteredMessages = buyerMessages.filter(m => {
    const matchesSearch = m.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         m.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'Unread') return matchesSearch && m.unread;
    if (filter === 'Properties') return matchesSearch && m.contactRole === 'Broker';
    if (filter === 'Bookings') return matchesSearch && m.contactRole === 'Host';
    return matchesSearch;
  });

  return (
    <BuyerPageShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl">Messages</h1>
          <p className="mt-1 text-[#66706A]">Communicate with brokers, hosts, and sellers</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-[#DDE2DD] pl-10 pr-4 py-2.5 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-[#DDE2DD]">
          {(['All', 'Unread', 'Properties', 'Bookings'] as const).map((option) => (
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
              {option === 'Unread' && (
                <span className="ml-2 rounded-full bg-[#C41E3A] px-2 py-0.5 text-xs text-white">
                  {buyerMessages.filter(m => m.unread).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredMessages.length === 0 ? (
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-12 text-center">
            <MessageSquare size={48} className="mx-auto text-[#DDE2DD]" />
            <h3 className="mt-4 font-display text-xl">No messages yet</h3>
            <p className="mt-2 text-[#66706A]">
              {searchQuery ? 'No messages match your search.' : 'Start a conversation by contacting a broker or host.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMessages.map((message) => {
              const property = buyerProperties.find(p => p.id === message.propertyId);
              return (
                <Link
                  key={message.id}
                  href={`/user/messages/${message.id}`}
                  className={`block rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors ${
                    message.unread ? 'bg-[#F7F8F6]' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#173D2B] text-sm font-semibold text-white">
                      {message.contactName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">{message.contactName}</h3>
                            {message.unread && (
                              <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#B7D83D]" />
                            )}
                          </div>
                          <p className="text-xs text-[#66706A]">{message.contactRole}</p>
                        </div>
                        <span className="text-xs text-[#9AA8A0] whitespace-nowrap">{message.lastMessageTime}</span>
                      </div>
                      <p className="mt-1 text-sm text-[#66706A] truncate">{message.lastMessage}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-full bg-[#F0F2F0] px-2 py-1 text-xs">
                          {property?.address}
                        </span>
                      </div>
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
