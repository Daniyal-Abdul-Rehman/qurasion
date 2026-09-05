'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Heart, Home, Calendar, Settings, Edit, Camera, Check } from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';
import { buyerProfile, savedProperties, buyerViewings, buyerBookings, buyerOffers } from '../../../lib/buyer-data';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(buyerProfile);

  const handleSave = () => {
    // In a real app, this would make an API call
    setIsEditing(false);
  };

  return (
    <BuyerPageShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl">Profile</h1>
            <p className="mt-1 text-[#66706A]">Manage your personal information</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 rounded-md border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
          >
            {isEditing ? <Check size={18} /> : <Edit size={18} />}
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* Profile Card */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#173D2B] text-3xl font-semibold text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#173D2B] text-white hover:bg-[#123022]">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              {isEditing && (
                <button className="text-sm text-[#173D2B] hover:underline">
                  Change photo
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                  />
                ) : (
                  <p className="font-medium">{profile.name}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#9AA8A0]" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                      />
                    ) : (
                      <p className="text-sm">{profile.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[#9AA8A0]" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                      />
                    ) : (
                      <p className="text-sm">{profile.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Preferred locations</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.preferredLocations.join(', ')}
                    onChange={(e) => setProfile({ ...profile, preferredLocations: e.target.value.split(', ') })}
                    className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredLocations.map((location) => (
                      <span key={location} className="rounded-full bg-[#F0F2F0] px-3 py-1 text-sm">
                        {location}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h2 className="font-display text-lg mb-4">Property preferences</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Budget (Buy)</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.budget.buy}
                  onChange={(e) => setProfile({ ...profile, budget: { ...profile.budget, buy: e.target.value } })}
                  className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                />
              ) : (
                <p className="text-sm">{profile.budget.buy}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Budget (Rent)</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.budget.rent}
                  onChange={(e) => setProfile({ ...profile, budget: { ...profile.budget, rent: e.target.value } })}
                  className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                />
              ) : (
                <p className="text-sm">{profile.budget.rent}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Budget (Stay)</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.budget.stay}
                  onChange={(e) => setProfile({ ...profile, budget: { ...profile.budget, stay: e.target.value } })}
                  className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                />
              ) : (
                <p className="text-sm">{profile.budget.stay}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Bedrooms</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.preferences.bedrooms}
                  onChange={(e) => setProfile({ ...profile, preferences: { ...profile.preferences, bedrooms: e.target.value } })}
                  className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                />
              ) : (
                <p className="text-sm">{profile.preferences.bedrooms}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Bathrooms</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.preferences.bathrooms}
                  onChange={(e) => setProfile({ ...profile, preferences: { ...profile.preferences, bathrooms: e.target.value } })}
                  className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                />
              ) : (
                <p className="text-sm">{profile.preferences.bathrooms}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Property types</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.preferredPropertyTypes.join(', ')}
                  onChange={(e) => setProfile({ ...profile, preferredPropertyTypes: e.target.value.split(', ') })}
                  className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.preferredPropertyTypes.map((type) => (
                    <span key={type} className="rounded-full bg-[#F0F2F0] px-3 py-1 text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Must-haves</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.preferences.mustHaves.join(', ')}
                onChange={(e) => setProfile({ ...profile, preferences: { ...profile.preferences, mustHaves: e.target.value.split(', ') } })}
                className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.preferences.mustHaves.map((feature) => (
                  <span key={feature} className="rounded-full bg-[#E8F5D3] px-3 py-1 text-sm text-[#31551C]">
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Activity Summary */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h2 className="font-display text-lg mb-4">Your activity</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/user/saved"
              className="flex items-center gap-3 rounded-lg border border-[#DDE2DD] p-4 hover:border-[#173D2B] transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5D3]">
                <Heart size={18} className="text-[#31551C]" />
              </div>
              <div>
                <p className="font-display text-lg">{savedProperties.length}</p>
                <p className="text-xs text-[#66706A]">Saved properties</p>
              </div>
            </Link>

            <Link
              href="/user/viewings"
              className="flex items-center gap-3 rounded-lg border border-[#DDE2DD] p-4 hover:border-[#173D2B] transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F0F4]">
                <Calendar size={18} className="text-[#315A6B]" />
              </div>
              <div>
                <p className="font-display text-lg">{buyerViewings.length}</p>
                <p className="text-xs text-[#66706A]">Viewings</p>
              </div>
            </Link>

            <Link
              href="/user/offers"
              className="flex items-center gap-3 rounded-lg border border-[#DDE2DD] p-4 hover:border-[#173D2B] transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FFF8E6]">
                <Home size={18} className="text-[#B8860B]" />
              </div>
              <div>
                <p className="font-display text-lg">{buyerOffers.length}</p>
                <p className="text-xs text-[#66706A]">Offers</p>
              </div>
            </Link>

            <Link
              href="/user/trips"
              className="flex items-center gap-3 rounded-lg border border-[#DDE2DD] p-4 hover:border-[#173D2B] transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EBDD]">
                <Calendar size={18} className="text-[#745F35]" />
              </div>
              <div>
                <p className="font-display text-lg">{buyerBookings.length}</p>
                <p className="text-xs text-[#66706A]">Trips</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h2 className="font-display text-lg mb-4">Account settings</h2>
          <div className="space-y-2">
            <Link
              href="/user/settings"
              className="flex items-center justify-between rounded-lg p-4 hover:bg-[#F0F2F0] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-[#66706A]" />
                <span className="font-medium">Settings</span>
              </div>
              <span className="text-[#9AA8A0]">→</span>
            </Link>
          </div>
        </div>
      </div>
    </BuyerPageShell>
  );
}
