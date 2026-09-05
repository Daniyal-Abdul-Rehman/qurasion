import Link from 'next/link';
import { ArrowRight, Calendar, Plus, Search, Filter, Clock, MapPin, Users, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';

const calendarEvents = [
  {
    id: 'event-1',
    title: 'Property Viewing - 1824 Oak Street',
    type: 'Viewing',
    date: 'Sep 10, 2026',
    time: '2:00 PM',
    location: '1824 Oak Street, Dallas',
    attendees: ['Michael Roberts', 'John Smith'],
    status: 'Confirmed',
  },
  {
    id: 'event-2',
    title: 'Offer Review Meeting',
    type: 'Meeting',
    date: 'Sep 10, 2026',
    time: '4:00 PM',
    location: 'Office',
    attendees: ['Sarah Williams'],
    status: 'Confirmed',
  },
  {
    id: 'event-3',
    title: 'Closing - 310 Lake Drive',
    type: 'Closing',
    date: 'Sep 28, 2026',
    time: '10:00 AM',
    location: 'Title Company',
    attendees: ['Sarah Kim', 'John Smith', 'Lender'],
    status: 'Scheduled',
  },
  {
    id: 'event-4',
    title: 'Seller Consultation',
    type: 'Meeting',
    date: 'Sep 12, 2026',
    time: '11:00 AM',
    location: 'Office',
    attendees: ['Robert Davis'],
    status: 'Pending',
  },
];

const upcomingDays = [
  { day: 'Mon', date: '7', events: 0 },
  { day: 'Tue', date: '8', events: 0 },
  { day: 'Wed', date: '9', events: 0 },
  { day: 'Thu', date: '10', events: 2 },
  { day: 'Fri', date: '11', events: 0 },
  { day: 'Sat', date: '12', events: 1 },
  { day: 'Sun', date: '13', events: 0 },
];

export default function CalendarPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Calendar"
      description="Schedule viewings, meetings, and track important dates."
      action={
        <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Add Event
        </button>
      }
    >
      {/* Calendar Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Today's Events</p>
          <p className="mt-2 font-display text-2xl">0</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">This Week</p>
          <p className="mt-2 font-display text-2xl">3</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Viewings Scheduled</p>
          <p className="mt-2 font-display text-2xl">1</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Upcoming Closings</p>
          <p className="mt-2 font-display text-2xl">1</p>
        </div>
      </section>

      {/* Calendar Navigation */}
      <section className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 rounded-lg border border-[#DDE2DD] bg-white px-3 py-2 text-sm hover:border-[#173D2B]">
            <ChevronLeft size={16} />
            Previous
          </button>
          <h2 className="font-display text-xl">September 2026</h2>
          <button className="flex items-center gap-1 rounded-lg border border-[#DDE2DD] bg-white px-3 py-2 text-sm hover:border-[#173D2B]">
            Next
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-[#DDE2DD] bg-white px-3 py-2 text-sm hover:border-[#173D2B]">Month</button>
          <button className="rounded-lg border border-[#DDE2DD] bg-white px-3 py-2 text-sm hover:border-[#173D2B]">Week</button>
          <button className="rounded-lg border border-[#DDE2DD] bg-white px-3 py-2 text-sm hover:border-[#173D2B]">Day</button>
        </div>
      </section>

      {/* Mini Calendar */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <p key={day} className="text-xs font-semibold text-[#9AA8A0]">{day}</p>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => {
            const dayNum = i - 2; // Offset for September starting on Wednesday
            const dayData = upcomingDays.find((d) => d.date === dayNum.toString());
            const isCurrentMonth = dayNum > 0 && dayNum <= 30;
            const isToday = dayNum === 4; // Sep 4 is today
            
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg border p-2 ${
                  isToday 
                    ? 'border-[#173D2B] bg-[#E8F5D3]' 
                    : isCurrentMonth 
                      ? 'border-[#DDE2DD] bg-white hover:border-[#173D2B]' 
                      : 'border-transparent bg-[#F7F8F6]'
                }`}
              >
                {isCurrentMonth && (
                  <>
                    <p className={`text-sm ${isToday ? 'font-bold text-[#173D2B]' : ''}`}>{dayNum}</p>
                    {dayData && dayData.events > 0 && (
                      <div className="mt-1 flex gap-1">
                        {Array.from({ length: Math.min(dayData.events, 3) }).map((_, j) => (
                          <div key={j} className="h-1.5 w-1.5 rounded-full bg-[#B7D83D]" />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Today's Schedule */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Schedule</p>
            <h2 className="mt-2 font-display text-2xl">Today's schedule</h2>
          </div>
          <p className="text-sm text-[#66706A]">No events today</p>
        </div>
        <div className="text-center py-8 border-2 border-dashed border-[#DDE2DD] rounded-lg">
          <Calendar size={32} className="mx-auto text-[#9AA8A0] mb-3" />
          <p className="text-sm text-[#66706A]">No events scheduled for today</p>
          <button className="mt-3 text-sm font-semibold text-[#173D2B] hover:underline">
            Schedule an event
          </button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Upcoming</p>
            <h2 className="mt-2 font-display text-2xl">Upcoming events</h2>
          </div>
          <p className="text-sm text-[#66706A]">{calendarEvents.length} events</p>
        </div>
        <div className="space-y-4">
          {calendarEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
              <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-[#E8F5D3] p-3">
                <p className="text-xs font-semibold text-[#31551C]">{event.date.split(',')[0]}</p>
                <p className="text-lg font-display text-[#31551C]">{event.date.split(' ')[1].replace(',', '')}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-[#66706A]">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge 
                    tone={event.status === 'Confirmed' ? 'positive' : event.status === 'Scheduled' ? 'warning' : 'neutral'}
                  >
                    {event.status}
                  </StatusBadge>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#66706A]" />
                  <p className="text-xs text-[#66706A]">{event.attendees.join(', ')}</p>
                </div>
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
            <p className="font-semibold">Schedule viewing</p>
            <p className="text-sm text-[#66706A]">Book property tour</p>
          </div>
        </button>
        <button className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <Calendar size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="font-semibold">Add meeting</p>
            <p className="text-sm text-[#66706A]">Schedule consultation</p>
          </div>
        </button>
        <Link href="/broker/tasks" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <CheckCircle size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="font-semibold">View tasks</p>
            <p className="text-sm text-[#66706A]">See action items</p>
          </div>
        </Link>
      </section>
    </BrokerPageShell>
  );
}