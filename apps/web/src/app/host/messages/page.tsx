import Link from 'next/link';
import { ArrowRight, MessageSquare, Search, Filter, Send, Plus, Clock, CheckCircle, User, Phone, Mail } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import HostPageShell from '../../../components/organisms/HostPageShell';
import { hostBookings, hostProperties } from '../../../lib/host-data';

const conversations = [
  { id: 'conv-1', guest: 'Michael Roberts', property: 'Downtown Loft', lastMessage: 'Thank you for the quick response! We are very excited about our stay.', time: '2 hours ago', unread: 2, status: 'Active' },
  { id: 'conv-2', guest: 'Sarah Kim', property: 'Luxury Villa', lastMessage: 'Is early check-in possible? We are arriving at 10 AM.', time: '5 hours ago', unread: 1, status: 'Active' },
  { id: 'conv-3', guest: 'David Martinez', property: 'Downtown Loft', lastMessage: 'Perfect, thank you for confirming the details.', time: 'Yesterday', unread: 0, status: 'Active' },
  { id: 'conv-4', guest: 'Emily Chen', property: 'Luxury Villa', lastMessage: 'The villa was amazing! Would love to book again.', time: '2 days ago', unread: 0, status: 'Archived' },
];

export default function HostMessagesPage() {
  return (
    <HostPageShell
      eyebrow="Host workspace"
      title="Messages"
      description="Communicate with guests and manage inquiries."
      action={
        <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> New Message
        </button>
      }
    >
      {/* Messages Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Conversations</p>
          <p className="mt-2 font-display text-2xl">{conversations.length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Unread Messages</p>
          <p className="mt-2 font-display text-2xl">{conversations.reduce((sum, c) => sum + c.unread, 0)}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Response Rate</p>
          <p className="mt-2 font-display text-2xl">98%</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Avg. Response Time</p>
          <p className="mt-2 font-display text-2xl">45 mins</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search messages by guest or property..."
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
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Unread</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Active</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Archived</button>
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
              href={`/host/messages/${conversation.id}`}
              className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0E5]">
                <User size={20} className="text-[#173D2B]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm">{conversation.guest}</p>
                  <div className="flex items-center gap-2">
                    {conversation.unread > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#173D2B] text-xs font-semibold text-white">
                        {conversation.unread}
                      </span>
                    )}
                    <span className="text-xs text-[#9AA8A0]">{conversation.time}</span>
                  </div>
                </div>
                <p className="text-xs text-[#66706A] mb-1">{conversation.property}</p>
                <p className="text-sm text-[#66706A] truncate">{conversation.lastMessage}</p>
              </div>
              <div className="text-right">
                <StatusBadge tone={conversation.status === 'Active' ? 'positive' : 'neutral'}>
                  {conversation.status}
                </StatusBadge>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <button className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <Send size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="font-semibold">Send message</p>
            <p className="text-sm text-[#66706A]">Quick reply to guest</p>
          </div>
        </button>
        <Link href="/host/bookings" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <CheckCircle size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="font-semibold">View bookings</p>
            <p className="text-sm text-[#66706A]">Check reservation details</p>
          </div>
        </Link>
        <Link href="/host/reviews" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <MessageSquare size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="font-semibold">View reviews</p>
            <p className="text-sm text-[#66706A]">Guest feedback</p>
          </div>
        </Link>
      </section>

      {/* Response Tips */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Tips</p>
            <h2 className="mt-2 font-display text-2xl">Response best practices</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-3 rounded-lg bg-[#E8F5D3] p-4">
            <Clock size={20} className="text-[#31551C] shrink-0" />
            <div>
              <p className="font-semibold text-sm">Respond within 1 hour</p>
              <p className="mt-1 text-xs text-[#66706A]">Faster responses lead to more bookings.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-[#E7F0F4] p-4">
            <Mail size={20} className="text-[#315A6B] shrink-0" />
            <div>
              <p className="font-semibold text-sm">Be detailed and helpful</p>
              <p className="mt-1 text-xs text-[#66706A]">Provide clear information about amenities.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-[#F3EBDD] p-4">
            <Phone size={20} className="text-[#745F35] shrink-0" />
            <div>
              <p className="font-semibold text-sm">Use templates wisely</p>
              <p className="mt-1 text-xs text-[#66706A]">Personalize messages for better guest experience.</p>
            </div>
          </div>
        </div>
      </section>
    </HostPageShell>
  );
}
