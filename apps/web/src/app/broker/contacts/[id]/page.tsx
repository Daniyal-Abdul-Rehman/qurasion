import Link from 'next/link';
import { ArrowRight, Mail, Phone, MessageSquare, Building2, Briefcase, HandCoins, FileText, Calendar, Users, CheckCircle2 } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../../components/atoms';
import BrokerPageShell from '../../../../components/organisms/BrokerPageShell';
import { brokerContacts } from '../../../../lib/broker-data';

export default function BrokerContactDetailPage({ params }: { params: { id: string } }) {
  const contact = brokerContacts.find(c => c.id === params.id) || brokerContacts[0];

  return (
    <BrokerPageShell
      eyebrow="Contact profile"
      title={contact.name}
      description={contact.type}
      action={
        <div className="flex gap-3">
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm">
            <Mail size={16} /> Send Message
          </PrimaryButton>
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm bg-white border border-[#DDE2DD] text-[#172019]">
            <Phone size={16} /> Call
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Contact Information */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Contact Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Email</p>
                  <p className="text-sm">{contact.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Phone</p>
                  <p className="text-sm">{contact.phone}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Type-specific Information */}
          {contact.type === 'Investor' && (
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
              <h2 className="font-display text-xl">Investment Profile</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Building2 size={16} className="mt-1 text-[#66706A]" />
                  <div>
                    <p className="text-xs text-[#9AA8A0]">Properties Viewed</p>
                    <p className="text-sm font-semibold">{contact.propertiesViewed}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="mt-1 text-[#66706A]" />
                  <div>
                    <p className="text-xs text-[#9AA8A0]">Saved Properties</p>
                    <p className="text-sm font-semibold">{contact.savedProperties}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HandCoins size={16} className="mt-1 text-[#66706A]" />
                  <div>
                    <p className="text-xs text-[#9AA8A0]">Offers Made</p>
                    <p className="text-sm font-semibold">{contact.offers}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText size={16} className="mt-1 text-[#66706A]" />
                  <div>
                    <p className="text-xs text-[#9AA8A0]">Deals Completed</p>
                    <p className="text-sm font-semibold">{contact.deals}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contact.type === 'Seller' && (
            <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
              <h2 className="font-display text-xl">Seller Profile</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Building2 size={16} className="mt-1 text-[#66706A]" />
                  <div>
                    <p className="text-xs text-[#9AA8A0]">Properties Owned</p>
                    <p className="text-sm font-semibold">{contact.properties}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText size={16} className="mt-1 text-[#66706A]" />
                  <div>
                    <p className="text-xs text-[#9AA8A0]">Active Listings</p>
                    <p className="text-sm font-semibold">{contact.activeListings}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HandCoins size={16} className="mt-1 text-[#66706A]" />
                  <div>
                    <p className="text-xs text-[#9AA8A0]">Deals Completed</p>
                    <p className="text-sm font-semibold">{contact.deals}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Recent Activity */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Recent Activity</h2>
              <Link href="#" className="text-sm font-semibold text-[#173D2B]">
                View all <ArrowRight className="ml-1 inline" size={14} />
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 pb-3 border-b border-[#E8EBE8]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                  <Building2 size={15} className="text-[#31551C]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Viewed property</p>
                  <p className="mt-1 text-xs text-[#66706A]">1824 Oak Street</p>
                </div>
                <p className="text-xs text-[#9AA8A0]">2 hours ago</p>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-[#E8EBE8]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
                  <Mail size={15} className="text-[#315A6B]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Email opened</p>
                  <p className="mt-1 text-xs text-[#66706A]">Property inquiry response</p>
                </div>
                <p className="text-xs text-[#9AA8A0]">1 day ago</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
                  <MessageSquare size={15} className="text-[#745F35]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Message sent</p>
                  <p className="mt-1 text-xs text-[#66706A]">Requesting viewing</p>
                </div>
                <p className="text-xs text-[#9AA8A0]">3 days ago</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#122E20]">
                <MessageSquare size={14} /> Send Message
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Phone size={14} /> Make Call
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Calendar size={14} /> Schedule Meeting
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <FileText size={14} /> Create Task
              </button>
            </div>
          </section>

          {/* Tasks */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg">Tasks</h3>
              <Link href="/broker/tasks" className="text-xs font-semibold text-[#173D2B]">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-1" />
                <span>Follow up on property viewing</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-1" />
                <span>Send market analysis report</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-1" checked />
                <span className="line-through text-[#9AA8A0]">Review investment criteria</span>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Notes</h3>
            <div className="mt-4">
              <textarea
                className="w-full rounded-md border border-[#DDE2DD] p-3 text-sm"
                rows={4}
                placeholder="Add notes about this contact..."
              />
              <button className="mt-2 w-full rounded-md bg-[#173D2B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#122E20]">
                Save Note
              </button>
            </div>
          </section>
        </div>
      </div>
    </BrokerPageShell>
  );
}