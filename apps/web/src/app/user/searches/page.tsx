'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, BellOff, Plus, Trash2, MoreVertical } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { savedSearches } from '../../../lib/buyer-data';

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState(savedSearches);

  const toggleAlert = (id: string) => {
    setSearches(searches.map(s => 
      s.id === id ? { ...s, alertsEnabled: !s.alertsEnabled } : s
    ));
  };

  const deleteSearch = (id: string) => {
    setSearches(searches.filter(s => s.id !== id));
  };

  return (
    <BuyerPageShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl">Saved searches</h1>
            <p className="mt-1 text-[#66706A]">Manage your saved property searches</p>
          </div>
          <Link
            href="/user/explore"
            className="flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
          >
            <Plus size={18} />
            <span>New search</span>
          </Link>
        </div>

        {/* Empty State */}
        {searches.length === 0 ? (
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-12 text-center">
            <Search size={48} className="mx-auto text-[#DDE2DD]" />
            <h3 className="mt-4 font-display text-xl">No saved searches yet</h3>
            <p className="mt-2 text-[#66706A]">
              Save your search criteria to get notified about new properties.
            </p>
            <Link
              href="/user/explore"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
            >
              Explore properties
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {searches.map((search) => (
              <div
                key={search.id}
                className="rounded-lg border border-[#DDE2DD] bg-white p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold">{search.name}</h3>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="rounded-full bg-[#173D2B] px-3 py-1 text-xs font-medium text-white">
                            {search.intent}
                          </span>
                        </div>
                      </div>
                      <button className="text-[#66706A] hover:text-[#172019]">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                    
                    <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {Object.entries(search.criteria).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="text-[#9AA8A0] capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-xs text-[#9AA8A0]">
                      <span>Created {search.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:border-l sm:border-[#E8EBE8] sm:pl-4">
                    <button
                      onClick={() => toggleAlert(search.id)}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        search.alertsEnabled 
                          ? 'bg-[#E8F5D3] text-[#31551C]' 
                          : 'bg-[#F0F2F0] text-[#66706A]'
                      }`}
                    >
                      {search.alertsEnabled ? <Bell size={16} /> : <BellOff size={16} />}
                      {search.alertsEnabled ? 'Alerts on' : 'Alerts off'}
                    </button>
                    <Link
                      href={`/user/explore?intent=${search.intent.toLowerCase()}`}
                      className="flex items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-3 py-2 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                    >
                      <Search size={16} />
                      Run search
                    </Link>
                    <button
                      onClick={() => deleteSearch(search.id)}
                      className="flex items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-3 py-2 text-sm font-medium text-[#C41E3A] hover:bg-[#FDE8E8]"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BuyerPageShell>
  );
}
