import Link from 'next/link';
import { ArrowRight, Plus, Mail, Phone, Building2, Briefcase, Users, Search } from 'lucide-react';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';
import { brokerContacts } from '../../../lib/broker-data';

const contactCategories = [
  { name: 'All Contacts', count: 4, icon: Users },
  { name: 'Sellers', count: 2, icon: Briefcase },
  { name: 'Investors', count: 2, icon: Building2 },
  { name: 'Buyers', count: 0, icon: Users },
  { name: 'Agents', count: 0, icon: Users },
  { name: 'Lenders', count: 0, icon: Building2 },
];

export default function ContactsPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Contacts"
      description="Central CRM for managing all your professional relationships."
      action={
        <Link href="/broker/contacts/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Add Contact
        </Link>
      }
    >
      {/* Contact Categories */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        {contactCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              href={`/broker/contacts?category=${category.name.toLowerCase().replace(' ', '-')}`}
              className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0E5]">
                <Icon size={20} className="text-[#173D2B]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{category.name}</p>
                <p className="text-sm text-[#66706A]">{category.count} contacts</p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Search and Filter */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full rounded-lg border border-[#DDE2DD] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#173D2B] focus:outline-none"
          />
        </div>
      </section>

      {/* Contacts Table */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">CRM</p>
            <h2 className="mt-2 font-display text-2xl">All contacts</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Contact</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Type</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Email</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Phone</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Activity</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Last Contact</th>
              </tr>
            </thead>
            <tbody>
              {brokerContacts.map((contact) => (
                <tr key={contact.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4">
                    <Link href={`/broker/contacts/${contact.id}`} className="flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-full bg-[#E7F0E5] flex items-center justify-center text-xs font-semibold text-[#173D2B]">
                        {contact.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{contact.name}</p>
                        <p className="text-xs text-[#66706A]">{contact.type}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">{contact.type}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm text-[#66706A]">
                      <Mail size={14} />
                      <span>{contact.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm text-[#66706A]">
                      <Phone size={14} />
                      <span>{contact.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">
                    {contact.type === 'Investor' ? (
                      <div className="space-y-1">
                        <p>{contact.propertiesViewed} properties viewed</p>
                        <p>{contact.savedProperties} saved</p>
                        <p>{contact.offers} offers</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p>{contact.properties} properties</p>
                        <p>{contact.activeListings} listings</p>
                        <p>{contact.deals} deals</p>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{contact.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </BrokerPageShell>
  );
}