import Link from 'next/link';
import { ArrowRight, Calendar, Search, Filter, CheckCircle, Clock, DollarSign, Users, Star, AlertTriangle, XCircle } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import HostPageShell from '../../../components/organisms/HostPageShell';
import { hostBookings } from '../../../lib/host-data';

const bookingStatuses = [
  { name: 'All', count: hostBookings.length },
  { name: 'Confirmed', count: hostBookings.filter((b) => b.status === 'Confirmed').length },
  { name: 'Pending', count: hostBookings.filter((b) => b.status === 'Pending').length },
  { name: 'Completed', count: 0 },
];

export default function HostBookingsPage() {
  return (
    <HostPageShell
      eyebrow="Host workspace"
      title="Bookings"
      description="Manage guest reservations and check-ins."
      action={null}
    >
      {/* Booking Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {bookingStatuses.map((status) => (
          <div key={status.name} className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">{status.name}</p>
              <p className="mt-2 font-display text-2xl">{status.count}</p>
            </div>
            <div className={`h-2 w-2 rounded-full ${status.name === 'Confirmed' ? 'bg-[#B7D83D]' : status.name === 'Pending' ? 'bg-[#E8A838]' : 'bg-[#E8EBE8]'}`} />
          </div>
        ))}
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search bookings by guest or property..."
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
        <button className="rounded-full bg-[#E8F5D3] px-3 py-1.5 text-xs font-semibold text-[#31551C]">All Status</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Confirmed</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Pending</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Completed</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Cancelled</button>
      </section>

      {/* Bookings Table */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Booking management</p>
            <h2 className="mt-2 font-display text-2xl">All bookings</h2>
          </div>
          <p className="text-sm text-[#66706A]">{hostBookings.length} bookings</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Property</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Guest</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Check-in</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Check-out</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Guests</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Total</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hostBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4">
                    <Link href={`/host/bookings/${booking.id}`} className="font-semibold text-sm">
                      {booking.property}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">{booking.guest}</td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{booking.checkIn}</td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{booking.checkOut}</td>
                  <td className="py-3 px-4 text-sm">{booking.guests}</td>
                  <td className="py-3 px-4 font-display text-sm font-semibold text-[#173D2B]">{booking.total}</td>
                  <td className="py-3 px-4">
                    <StatusBadge 
                      tone={booking.status === 'Confirmed' ? 'positive' : booking.status === 'Pending' ? 'warning' : 'neutral'}
                    >
                      {booking.status}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/host/bookings/${booking.id}`} className="text-sm text-[#173D2B] hover:underline">
                        View
                      </Link>
                      {booking.status === 'Pending' && (
                        <button className="text-sm text-[#66706A] hover:text-[#B7D83D]">
                          Accept
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Upcoming Check-ins */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Schedule</p>
            <h2 className="mt-2 font-display text-2xl">Upcoming check-ins</h2>
          </div>
        </div>
        <div className="space-y-4">
          {hostBookings.filter((b) => b.status === 'Confirmed').slice(0, 3).map((booking) => (
            <div key={booking.id} className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4">
              <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-[#E8F5D3] p-3">
                <Calendar size={20} className="text-[#31551C]" />
                <p className="mt-1 text-xs font-semibold text-[#31551C]">{booking.checkIn.split(',')[0]}</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold">{booking.property}</p>
                <p className="text-sm text-[#66706A]">{booking.guest} • {booking.guests} guests</p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg font-semibold">{booking.total}</p>
                <div className="mt-1">
                  <StatusBadge tone="positive">
                    {booking.status}
                  </StatusBadge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Insights */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <DollarSign size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Avg. booking value</p>
            <p className="font-display text-lg">$1,200</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <CheckCircle size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Confirmation rate</p>
            <p className="font-display text-lg">87%</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <Clock size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Avg. response time</p>
            <p className="font-display text-lg">45 mins</p>
          </div>
        </div>
      </section>
    </HostPageShell>
  );
}
