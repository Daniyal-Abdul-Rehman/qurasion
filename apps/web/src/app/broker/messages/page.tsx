import Link from 'next/link';
import { ArrowRight, MessageSquare, Plus, Search, Filter, Send, Clock, CheckCircle, User, FileText, Building2 } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';

const conversations = [
  {
    id: 'conv-1',
    name: 'Michael Roberts',
    type: 'Investor',
    property: '1824 Oak Street',
    lastMessage: 'Can the seller consider $485K?',
    lastMessageTime: '4 min ago',
    unread: 2,
    status: 'Active',
  },
  {
    id: 'conv-2',
    name: 'John Smith',
    type: 'Seller',
    property: '1824 Oak Street',
    lastMessage: 'Thanks for the update on the offer.',
    lastMessageTime: '20 min ago',
    unread: 0,
    status: 'Active',
  },
  {
    id: 'conv-3',
    name: 'Sarah Kim',
    type: 'Investor',
    property: '741 Pine Avenue',
    lastMessage: 'Can I schedule a viewing for next week?',
    lastMessageTime: 'Yesterday',
    unread: 1,
    status: 'Active',
  },
  {
    id: 'conv-4',
    name: 'David Martinez',
    type: 'Investor',
    property: '92 Market Street',
    lastMessage: 'What are the renovation estimates?',
    lastMessageTime: '2 days ago',
    unread: 0,
    status: 'Active',
  },
];

const messageCategories = [
  { name: 'All Messages', count: conversations.length, icon: MessageSquare },
  { name: 'Investors', count: conversations.filter((c) => c.type === 'Investor').length, icon: User },
  { name: 'Sellers', count: conversations.filter((c) => c.type === 'Seller').length, icon: Building2 },
  { name: 'Unread', count: conversations.filter((c) => c.unread > 0).length, icon: CheckCircle },
];

export default function MessagesPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Messages"
      description="Centralized communication with sellers, investors, and parties."
      action={
        <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> New Message
        </button>
      }
    >
      {/* Message Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {messageCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7F0E5]">
                  <Icon size={18} className="text-[#173D2B]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">{category.name}</p>
                  <p className="mt-1 font-display text-xl">{category.count}</p>
                </div>
              </div>
              {category.name === 'Unread' && category.count > 0 && (
                <div className="h-2 w-2 rounded-full bg-[#B7D83D]" />
              )}
            </div>
          );
        })}
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search conversations by name or property..."
            className="w-full rounded-lg border border-[#DDE2DD] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#173D2B] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
          <Filter size={16} />
          Filters
        </button>
      </section>

      {/* Filter Tags */}
      <section className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-full bg-[#E8F5D3] px-3 py-1.5 text-xs font-semibold text-[#31551C]">All</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Investors</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Sellers</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Unread</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Has Property</button>
      </section>

      {/* Conversations List */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Inbox</p>
            <h2 className="mt-2 font-display text-2xl">Conversations</h2>
          </div>
          <p className="text-sm text-[#66706A]">{conversations.length} conversations</p>
        </div>
        <div className="space-y-3">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/broker/messages/${conversation.id}`}
              className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
            >
              <div className="relative">
                <div className="h-12 w-12 shrink-0 rounded-full bg-[#E7F0E5] flex items-center justify-center text-sm font-semibold text-[#173D2B]">
                  {conversation.name.split(' ').map((n) => n[0]).join('')}
                </div>
                {conversation.unread > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#B7D83D] flex items-center justify-center text-xs font-semibold text-[#31551C]">
                    {conversation.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-semibold text-sm">{conversation.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#66706A]">{conversation.type}</span>
                      {conversation.property && (
                        <>
                          <span className="text-[#DDE2DD]">•</span>
                          <span className="text-xs text-[#66706A]">{conversation.property}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#66706A]">{conversation.lastMessageTime}</p>
                    <div className="mt-1">
                      <StatusBadge tone="positive">Active</StatusBadge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#66706A] truncate">{conversation.lastMessage}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Messages Preview */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Activity</p>
            <h2 className="mt-2 font-display text-2xl">Recent activity</h2>
          </div>
        </div>
        <div className="space-y-4">
          {conversations.slice(0, 3).map((conversation) => (
            <div key={conversation.id} className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8] last:border-0 last:pb-0">
              <div className="h-8 w-8 shrink-0 rounded-full bg-[#E7F0E5] flex items-center justify-center text-xs font-semibold text-[#173D2B]">
                {conversation.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{conversation.name}</p>
                  <p className="text-xs text-[#66706A]">{conversation.lastMessageTime}</p>
                </div>
                <p className="text-sm text-[#66706A] mt-1">{conversation.lastMessage}</p>
                {conversation.property && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-[#66706A]">
                    <Building2 size={12} />
                    <span>{conversation.property}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <button className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <Plus size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="font-semibold">New message</p>
            <p className="text-sm text-[#66706A]">Start conversation</p>
          </div>
        </button>
        <Link href="/broker/contacts" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <User size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="font-semibold">Browse contacts</p>
            <p className="text-sm text-[#66706A]">Find people to message</p>
          </div>
        </Link>
        <Link href="/broker/investors" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <Building2 size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="font-semibold">Contact investors</p>
            <p className="text-sm text-[#66706A]">Reach potential buyers</p>
          </div>
        </Link>
      </section>
    </BrokerPageShell>
  );
}