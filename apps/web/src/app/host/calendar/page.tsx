import Link from 'next/link';
import { ArrowRight, Calendar, Plus, Search, Filter, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, DollarSign, Users, Star } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import HostPageShell from '../../../components/organisms/HostPageShell';
import { hostProperties, hostBookings } from '../../../lib/host-data';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function HostCalendarPage() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return (
    <HostPageShell
      eyebrow="Host workspace"
      title="Calendar"
      description="Manage availability and scheduling for your properties."
      action={
        <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Block Dates
        </button>
      }
    >
      {/* Property Selector */}
      <section className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <select className="w-full rounded-lg border border-[#DDE2DD] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#173D2B] focus:outline-none appearance-none">
            <option>All Properties</option>
            {hostProperties.filter((p) => p.status === 'Active').map((property) => (
              <option key={property.id} value={property.id}>{property.name}</option>
            ))}
          </select>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
          <Filter size={16} />
          Filters
        </button>
      </section>

      {/* Calendar Navigation */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
              <ChevronLeft size={16} />
              Previous
            </button>
            <h2 className="font-display text-2xl">{months[currentMonth]} {currentYear}</h2>
            <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
              Next
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">Month</button>
            <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">Week</button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0] py-2">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {Array.from({ length: 35 }).map((_, i) => {
            const dayNumber = i - 3;
            const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
            const isBooked = [10, 11, 12, 15, 16, 17, 20, 21, 22].includes(dayNumber);
            const isToday = dayNumber === new Date().getDate();

            return (
              <div
                key={i}
                className={`
                  min-h-[100px] rounded-lg border p-2 transition-colors
                  ${!isCurrentMonth ? 'border-transparent bg-transparent' : 'border-[#DDE2DD] bg-white hover:border-[#173D2B]'}
                  ${isBooked ? 'bg-[#E8F5D3] border-[#B7D83D]' : ''}
                  ${isToday ? 'ring-2 ring-[#173D2B]' : ''}
                `}
              >
                {isCurrentMonth && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-semibold ${isToday ? 'text-[#173D2B]' : ''}`}>{dayNumber}</span>
                      {isBooked && <div className="h-2 w-2 rounded-full bg-[#31551C]" />}
                    </div>
                    {isBooked && (
                      <div className="space-y-1">
                        <div className="rounded bg-[#31551C] px-2 py-1 text-xs text-white">
                          <p className="font-semibold truncate">M. Roberts</p>
                          <p className="text-[10px] opacity-80">$150/night</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Bookings */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Reservations</p>
            <h2 className="mt-2 font-display text-2xl">Upcoming bookings</h2>
          </div>
          <Link href="/host/bookings" className="text-sm font-semibold text-[#173D2B]">
            View all <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="space-y-3">
          {hostBookings.filter((b) => b.status === 'Confirmed').map((booking) => (
            <div key={booking.id} className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4">
              <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-[#E8F5D3] p-3">
                <Calendar size={20} className="text-[#31551C]" />
                <p className="mt-1 text-xs font-semibold text-[#31551C]">{booking.checkIn.split(',')[0]}</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold">{booking.property}</p>
                <p className="text-sm text-[#66706A]">{booking.guest} • {booking.checkIn} - {booking.checkOut}</p>
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

      {/* Availability Settings */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <CheckCircle size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Available nights</p>
            <p className="font-display text-lg">24</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <XCircle size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Blocked nights</p>
            <p className="font-display text-lg">3</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <Clock size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Min. stay</p>
            <p className="font-display text-lg">2 nights</p>
          </div>
        </div>
      </section>
    </HostPageShell>
  );
}
