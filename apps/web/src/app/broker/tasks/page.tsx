import Link from 'next/link';
import { ArrowRight, ListTodo, Plus, Search, Filter, Calendar, Clock, CheckCircle, AlertTriangle, Phone, Mail, FileText, User } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';
import { brokerTasks } from '../../../lib/broker-data';

const taskCategories = [
  { name: 'All Tasks', count: brokerTasks.length, icon: ListTodo },
  { name: 'Today', count: brokerTasks.filter((t) => t.date === 'Today').length, icon: Calendar },
  { name: 'Overdue', count: 0, icon: AlertTriangle },
  { name: 'Upcoming', count: 0, icon: Clock },
];

const taskTypes = [
  { name: 'Call', count: brokerTasks.filter((t) => t.type === 'Call').length, icon: Phone },
  { name: 'Email', count: brokerTasks.filter((t) => t.type === 'Email').length, icon: Mail },
  { name: 'Document', count: brokerTasks.filter((t) => t.type === 'Document').length, icon: FileText },
  { name: 'Review', count: brokerTasks.filter((t) => t.type === 'Review').length, icon: CheckCircle },
];

export default function TasksPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Tasks"
      description="Manage your follow-ups, deadlines, and action items."
      action={
        <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Add Task
        </button>
      }
    >
      {/* Task Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {taskCategories.map((category) => {
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
            </div>
          );
        })}
      </section>

      {/* Task Type Breakdown */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {taskTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div key={type.name} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7F0E5]">
                <Icon size={18} className="text-[#173D2B]" />
              </div>
              <div>
                <p className="text-sm text-[#66706A]">{type.name}</p>
                <p className="font-display text-lg">{type.count}</p>
              </div>
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
            placeholder="Search tasks by title or related item..."
            className="w-full rounded-lg border border-[#DDE2DD] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#173D2B] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
          <Filter size={16} />
          Filters
        </button>
      </section>

      {/* Today's Tasks */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Today</p>
            <h2 className="mt-2 font-display text-2xl">Today's tasks</h2>
          </div>
          <p className="text-sm text-[#66706A]">{brokerTasks.filter((t) => t.date === 'Today').length} tasks</p>
        </div>
        <div className="space-y-3">
          {brokerTasks.filter((t) => t.date === 'Today').map((task) => {
            const TaskIcon = task.type === 'Call' ? Phone : task.type === 'Email' ? Mail : task.type === 'Document' ? FileText : CheckCircle;
            return (
              <div key={task.id} className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
                <div className="flex shrink-0 items-center justify-center">
                  <input type="checkbox" className="h-5 w-5 rounded border-[#DDE2DD] text-[#173D2B] focus:ring-[#173D2B]" />
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                  <TaskIcon size={18} className="text-[#31551C]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{task.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#66706A]">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{task.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{task.relatedTo}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#9AA8A0]">{task.type}</p>
                  <button className="mt-1 text-xs text-[#66706A] hover:text-[#173D2B]">Complete</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* All Tasks Table */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">All tasks</p>
            <h2 className="mt-2 font-display text-2xl">Task list</h2>
          </div>
          <p className="text-sm text-[#66706A]">{brokerTasks.length} total tasks</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Task</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Type</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Related To</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Date</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Time</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brokerTasks.map((task) => {
                const TaskIcon = task.type === 'Call' ? Phone : task.type === 'Email' ? Mail : task.type === 'Document' ? FileText : CheckCircle;
                return (
                  <tr key={task.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="h-4 w-4 rounded border-[#DDE2DD] text-[#173D2B] focus:ring-[#173D2B]" />
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                          <TaskIcon size={14} className="text-[#31551C]" />
                        </div>
                        <span className="font-semibold text-sm">{task.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{task.type}</td>
                    <td className="py-3 px-4 text-sm text-[#66706A]">{task.relatedTo}</td>
                    <td className="py-3 px-4 text-sm text-[#66706A]">{task.date}</td>
                    <td className="py-3 px-4 text-sm text-[#66706A]">{task.time}</td>
                    <td className="py-3 px-4">
                      <StatusBadge tone="warning">Pending</StatusBadge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="text-sm text-[#173D2B] hover:underline">
                          Complete
                        </button>
                        <button className="text-sm text-[#66706A] hover:text-[#173D2B]">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <button className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <Plus size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="font-semibold">Add task</p>
            <p className="text-sm text-[#66706A]">Create new task</p>
          </div>
        </button>
        <Link href="/broker/calendar" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <Calendar size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="font-semibold">View calendar</p>
            <p className="text-sm text-[#66706A]">See scheduled tasks</p>
          </div>
        </Link>
        <Link href="/broker/messages" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <Mail size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="font-semibold">Send follow-up</p>
            <p className="text-sm text-[#66706A]">Contact clients</p>
          </div>
        </Link>
      </section>
    </BrokerPageShell>
  );
}