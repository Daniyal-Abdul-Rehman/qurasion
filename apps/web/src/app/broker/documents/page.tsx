import Link from 'next/link';
import { ArrowRight, FileText, Plus, Search, Filter, Upload, Download, Clock, CheckCircle, AlertTriangle, FolderOpen, File } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';

const documentCategories = [
  { name: 'All Documents', count: 45, icon: FileText },
  { name: 'Property Documents', count: 12, icon: FolderOpen },
  { name: 'Listing Documents', count: 8, icon: File },
  { name: 'Offer Documents', count: 6, icon: File },
  { name: 'Contract Documents', count: 5, icon: File },
  { name: 'Inspection', count: 4, icon: File },
  { name: 'Title', count: 3, icon: File },
  { name: 'Financing', count: 4, icon: File },
  { name: 'Closing', count: 3, icon: File },
];

const recentDocuments = [
  {
    id: 'doc-1',
    name: 'Inspection Report - 1824 Oak Street',
    type: 'Inspection',
    property: '1824 Oak Street',
    uploaded: '2 hours ago',
    size: '2.4 MB',
    status: 'Approved',
  },
  {
    id: 'doc-2',
    name: 'Purchase Agreement - 741 Pine Avenue',
    type: 'Contract',
    property: '741 Pine Avenue',
    uploaded: '5 hours ago',
    size: '1.8 MB',
    status: 'Under Review',
  },
  {
    id: 'doc-3',
    name: 'Title Search - 310 Lake Drive',
    type: 'Title',
    property: '310 Lake Drive',
    uploaded: '1 day ago',
    size: '3.1 MB',
    status: 'Approved',
  },
  {
    id: 'doc-4',
    name: 'Pre-approval Letter - Michael Roberts',
    type: 'Financing',
    property: '1824 Oak Street',
    uploaded: '2 days ago',
    size: '0.5 MB',
    status: 'Approved',
  },
];

const documentRequests = [
  {
    id: 'req-1',
    document: 'Property Tax Statement',
    from: 'John Smith',
    property: '1824 Oak Street',
    deadline: 'Sep 12, 2026',
    status: 'Requested',
  },
  {
    id: 'req-2',
    document: 'HOA Documents',
    from: 'Sarah Williams',
    property: '741 Pine Avenue',
    deadline: 'Sep 15, 2026',
    status: 'Uploaded',
  },
];

export default function DocumentsPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Documents"
      description="Manage property, transaction, and client documents."
      action={
        <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Upload size={16} /> Upload Document
        </button>
      }
    >
      {/* Document Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Documents</p>
          <p className="mt-2 font-display text-2xl">{documentCategories[0].count}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Pending Review</p>
          <p className="mt-2 font-display text-2xl">3</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Document Requests</p>
          <p className="mt-2 font-display text-2xl">{documentRequests.length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Storage Used</p>
          <p className="mt-2 font-display text-2xl">2.4 GB</p>
        </div>
      </section>

      {/* Document Categories */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        {documentCategories.slice(0, 6).map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              href={`/broker/documents?category=${category.name.toLowerCase().replace(' ', '-')}`}
              className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0E5]">
                <Icon size={20} className="text-[#173D2B]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{category.name}</p>
                <p className="text-sm text-[#66706A]">{category.count} documents</p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search documents by name or property..."
            className="w-full rounded-lg border border-[#DDE2DD] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#173D2B] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
          <Filter size={16} />
          Filters
        </button>
      </section>

      {/* Recent Documents */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Recent uploads</p>
            <h2 className="mt-2 font-display text-2xl">Recent documents</h2>
          </div>
          <Link href="/broker/documents/all" className="text-sm font-semibold text-[#173D2B]">
            View all <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Document</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Type</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Property</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Uploaded</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Size</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#E7F0E5]">
                        <FileText size={16} className="text-[#173D2B]" />
                      </div>
                      <span className="font-semibold text-sm">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{doc.type}</td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{doc.property}</td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{doc.uploaded}</td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{doc.size}</td>
                  <td className="py-3 px-4">
                    <StatusBadge 
                      tone={doc.status === 'Approved' ? 'positive' : doc.status === 'Under Review' ? 'warning' : 'neutral'}
                    >
                      {doc.status}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-sm text-[#173D2B] hover:underline">
                        <Download size={14} />
                      </button>
                      <button className="text-sm text-[#66706A] hover:text-[#173D2B]">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Document Requests */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Requests</p>
            <h2 className="mt-2 font-display text-2xl">Document requests</h2>
          </div>
          <button className="text-sm font-semibold text-[#173D2B]">
            Request document
          </button>
        </div>
        <div className="space-y-3">
          {documentRequests.map((request) => (
            <div key={request.id} className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                <FileText size={18} className="text-[#31551C]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{request.document}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#66706A]">
                  <span>From: {request.from}</span>
                  <span>•</span>
                  <span>{request.property}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-[#66706A]">
                  <Clock size={12} />
                  <span>Due: {request.deadline}</span>
                </div>
                <div className="mt-1">
                  <StatusBadge 
                    tone={request.status === 'Uploaded' ? 'positive' : 'warning'}
                  >
                    {request.status}
                  </StatusBadge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Document Alerts */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Alerts</p>
            <h2 className="mt-2 font-display text-2xl">Action required</h2>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg bg-[#FFF8E6] p-4">
            <AlertTriangle size={16} className="mt-0.5 text-[#B8860B]" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Document approval pending</p>
              <p className="mt-1 text-xs text-[#66706A]">Purchase Agreement for 741 Pine Avenue requires your review and approval.</p>
              <div className="mt-2">
                <Link href="/broker/documents/doc-2" className="text-xs font-semibold text-[#173D2B] hover:underline">
                  Review document
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <button className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <Upload size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="font-semibold">Upload document</p>
            <p className="text-sm text-[#66706A]">Add new file</p>
          </div>
        </button>
        <button className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <FileText size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="font-semibold">Request document</p>
            <p className="text-sm text-[#66706A]">Request from client</p>
          </div>
        </button>
        <Link href="/broker/deals" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <FolderOpen size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="font-semibold">View by deal</p>
            <p className="text-sm text-[#66706A]">Organize by transaction</p>
          </div>
        </Link>
      </section>
    </BrokerPageShell>
  );
}