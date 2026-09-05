import type { ReactNode } from 'react';
import Link from 'next/link';
import { Bell, Menu, Search, Heart, MapPin, Calendar, MessageSquare, Home, User, Settings } from 'lucide-react';
import { IconButton } from '../atoms';

export default function BuyerPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#172019]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#DDE2DD] bg-[#FBFCFA]">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/user/home" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173D2B]">
                <span className="font-display text-sm font-semibold text-white">Q</span>
              </div>
              <span className="font-display text-xl hidden sm:block">qurasion</span>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/user/home" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019]">
                <Home size={16} />
                <span>Home</span>
              </Link>
              <Link href="/user/explore" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019]">
                <Search size={16} />
                <span>Explore</span>
              </Link>
              <Link href="/user/map" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019]">
                <MapPin size={16} />
                <span>Map</span>
              </Link>
              <Link href="/user/saved" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019]">
                <Heart size={16} />
                <span>Saved</span>
              </Link>
              <Link href="/user/trips" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019]">
                <Calendar size={16} />
                <span>Trips</span>
              </Link>
              <Link href="/user/messages" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019]">
                <MessageSquare size={16} />
                <span>Messages</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <IconButton label="Notifications" className="relative">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#B7D83D]" />
            </IconButton>
            <Link href="/user/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173D2B] text-xs font-semibold text-white">
              AT
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#DDE2DD] bg-[#FBFCFA] md:hidden">
        <div className="flex items-center justify-around py-2">
          <Link href="/user/home" className="flex flex-col items-center gap-1 p-2 text-[#66706A]">
            <Home size={20} />
            <span className="text-[10px]">Home</span>
          </Link>
          <Link href="/user/explore" className="flex flex-col items-center gap-1 p-2 text-[#66706A]">
            <Search size={20} />
            <span className="text-[10px]">Explore</span>
          </Link>
          <Link href="/user/saved" className="flex flex-col items-center gap-1 p-2 text-[#66706A]">
            <Heart size={20} />
            <span className="text-[10px]">Saved</span>
          </Link>
          <Link href="/user/trips" className="flex flex-col items-center gap-1 p-2 text-[#66706A]">
            <Calendar size={20} />
            <span className="text-[10px]">Trips</span>
          </Link>
          <Link href="/user/profile" className="flex flex-col items-center gap-1 p-2 text-[#66706A]">
            <User size={20} />
            <span className="text-[10px]">Profile</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-[1440px] px-4 py-6 pb-24 md:pb-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
