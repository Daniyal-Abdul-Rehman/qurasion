import Link from 'next/link';
import { ArrowRight, Bell, CheckCircle, Clock, MessageSquare, HandCoins, FileText, AlertTriangle, Calendar, Users, Search, Filter, Check } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';

const notifications = [
  {
    id: 'notif-1',
    type: 'offer',
    title: 'New offer received',
    message: 'Michael Roberts submitted an offer of $485,000 for 1824 Oak Street',
    property: '1824 Oak Street',
    time: '2 hours ago',
    read: false,
    priority: 'high',
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'New message from investor',
    message: 'Sarah Kim sent you a message regarding 741 Pine Avenue',
    property: '741 Pine Avenue',
    time: '4 hours ago',
    read: false,
    priority: 'medium',
  },
  {
    id: 'notif-3',
    type: 'counter',
    title: 'Offer countered',
    message: 'Seller countered the offer from David Martinez for 92 Market Street',
    property: '92 Market Street',
    time: '5 hours ago',
    read: true,
    priority: 'high',
  },
  {
    id: 'notif-4',
    type: 'document',
    title: 'Document uploaded',
    message: 'Inspection report uploaded for 1824 Oak Street',
    property: '1824 Oak Street',
    time: '1 day ago',
    read: true,
    priority: 'low',
  },
  {
    id: 'notif-5',
    type: 'deadline',
    title: 'Closing deadline approaching',
    message: 'Closing for 310 Lake Drive is in 5 days',
    property: '310 Lake Drive',
    time: '1 day ago',
    read: false,
    priority: 'high',
  },
  {
    id: 'notif-6',
    type: 'viewing',
    title: 'Viewing scheduled',
    message: 'Property viewing scheduled for 1824 Oak Street on Sep 10',
    property: '1824 Oak Street',
    time: '2 days ago',
    read: true,
    priority: 'medium',
  },
  {
    id: 'notif-7',
    type: 'approval',
    title: 'Seller approval required',
    message: 'John Smith needs to approve counter offer for 1824 Oak Street',
    property: '1824 Oak Street',
    time: '2 days ago',
    read: true,
    priority: 'high',
  },
  {
    id: 'notif-8',
    type: 'inquiry',
    title: 'New investor inquiry',
    message: 'James Wilson is interested in 92 Market Street',
    property: '92 Market Street',
    time: '3 days ago',
    read: true,
    priority: 'medium',
  },
];

const notificationTypes = [
  { name: 'All', count: notifications.length, icon: Bell },
  { name: 'Unread', count: notifications.filter((n) => !n.read).length, icon: Bell },
  { name: 'Offers', count: notifications.filter((n) => n.type === 'offer' || n.type === 'counter').length, icon: HandCoins },
  { name: 'Messages', count: notifications.filter((n) => n.type === 'message').length, icon: MessageSquare },
  { name: 'Documents', count: notifications.filter((n) => n.type === 'document').length, icon: FileText },
  { name: 'Deadlines', count: notifications.filter((n) => n.type === 'deadline').length, icon: AlertTriangle },
];

export default function NotificationsPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Notifications"
      description="Stay updated with important alerts, messages, and activity."
      action={
        <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
          <Check size={16} />
          Mark all as read
        </button>
      }
    >
      {/* Notification Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {notificationTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div key={type.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7F0E5]">
                  <Icon size={18} className="text-[#173D2B]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">{type.name}</p>
                  <p className="mt-1 font-display text-xl">{type.count}</p>
                </div>
              </div>
              {type.name === 'Unread' && type.count > 0 && (
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
            placeholder="Search notifications..."
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
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">High Priority</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Offers</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Messages</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Documents</button>
      </section>

      {/* Notifications List */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Activity</p>
            <h2 className="mt-2 font-display text-2xl">All notifications</h2>
          </div>
          <p className="text-sm text-[#66706A]">{notifications.length} notifications</p>
        </div>
        <div className="space-y-3">
          {notifications.map((notification) => {
            const NotificationIcon = notification.type === 'offer' || notification.type === 'counter' ? HandCoins : 
              notification.type === 'message' ? MessageSquare : 
              notification.type === 'document' ? FileText : 
              notification.type === 'deadline' ? AlertTriangle : 
              notification.type === 'viewing' ? Calendar : 
              notification.type === 'approval' ? CheckCircle : Bell;
            
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-4 rounded-lg border p-4 transition-colors ${
                  !notification.read ? 'border-[#B7D83D] bg-[#F8FCF5]' : 'border-[#DDE2DD] bg-white hover:border-[#173D2B]'
                }`}
              >
                <div className="flex shrink-0">
                  <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${
                    notification.priority === 'high' ? 'bg-[#FFF8E6]' : 'bg-[#E7F0E5]'
                  }`}>
                    <NotificationIcon size={18} className={notification.priority === 'high' ? 'text-[#B8860B]' : 'text-[#173D2B]'} />
                  </div>
                  {!notification.read && (
                    <div className="ml-2 h-2 w-2 rounded-full bg-[#B7D83D]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className={`font-semibold text-sm ${!notification.read ? 'text-[#172019]' : 'text-[#66706A]'}`}>
                        {notification.title}
                      </p>
                      <p className="text-sm text-[#66706A] mt-1">{notification.message}</p>
                      {notification.property && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-[#66706A]">
                          <FileText size={12} />
                          <span>{notification.property}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="text-xs text-[#9AA8A0]">{notification.time}</p>
                      {notification.priority === 'high' && (
                        <div className="mt-1">
                          <StatusBadge tone="warning">High Priority</StatusBadge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Notification Settings */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Preferences</p>
            <h2 className="mt-2 font-display text-2xl">Notification settings</h2>
          </div>
          <Link href="/broker/settings" className="text-sm font-semibold text-[#173D2B]">
            Manage settings <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="space-y-3">
          {[
            'New investor inquiries',
            'New offers received',
            'Offer countered',
            'Seller approval required',
            'Document uploaded',
            'Deal deadline approaching',
            'Viewing scheduled',
            'New messages',
          ].map((setting) => (
            <div key={setting} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full bg-[#E7F0E5] flex items-center justify-center">
                  <Bell size={14} className="text-[#173D2B]" />
                </div>
                <span className="text-sm">{setting}</span>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-[#66706A]">
                  <input type="checkbox" defaultChecked className="rounded border-[#DDE2DD] text-[#173D2B] focus:ring-[#173D2B]" />
                  Email
                </label>
                <label className="flex items-center gap-2 text-sm text-[#66706A]">
                  <input type="checkbox" defaultChecked className="rounded border-[#DDE2DD] text-[#173D2B] focus:ring-[#173D2B]" />
                  Push
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <Link href="/broker/offers" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <HandCoins size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="font-semibold">Review offers</p>
            <p className="text-sm text-[#66706A]">Check pending offers</p>
          </div>
        </Link>
        <Link href="/broker/messages" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <MessageSquare size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="font-semibold">Check messages</p>
            <p className="text-sm text-[#66706A]">Reply to inquiries</p>
          </div>
        </Link>
        <Link href="/broker/tasks" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <CheckCircle size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="font-semibold">View tasks</p>
            <p className="text-sm text-[#66706A]">Complete action items</p>
          </div>
        </Link>
      </section>
    </BrokerPageShell>
  );
}