'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Heart, Share2, MapPin, Users, Bath, Maximize2, Calendar, 
  ChevronLeft, ChevronRight, Star, Wifi, Car, Wind, 
  Utensils, Waves, TreePine, Dumbbell, Building2, 
  Phone, Mail, MessageSquare, Calculator, ArrowRight 
} from 'lucide-react';
import BuyerPageShell from '../../../../components/organisms/BuyerPageShell';
import { buyerProperties } from '../../../../lib/buyer-data';

export default function PropertyDetailPage() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAffordability, setShowAffordability] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  const property = buyerProperties.find(p => p.slug === params.slug);
  
  if (!property) {
    return (
      <BuyerPageShell>
        <div className="text-center py-12">
          <h1 className="font-display text-2xl">Property not found</h1>
          <Link href="/user/explore" className="mt-4 inline-block text-[#173D2B]">
            Back to explore
          </Link>
        </div>
      </BuyerPageShell>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const isSale = property.status === 'For Sale';
  const isRent = property.status === 'For Rent';
  const isStay = property.status === 'Short-term Stay';

  return (
    <BuyerPageShell>
      <div className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#66706A]">
          <Link href="/user/explore" className="hover:text-[#172019]">Explore</Link>
          <span>/</span>
          <Link href={`/user/explore/${isSale ? 'buy' : isRent ? 'rent' : 'stay'}`} className="hover:text-[#172019] capitalize">
            {isSale ? 'Buy' : isRent ? 'Rent' : 'Stay'}
          </Link>
          <span>/</span>
          <span className="text-[#172019]">{property.address}</span>
        </div>

        {/* Photo Gallery */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-[#E7F0E5]">
          <img
            src={property.images[currentImageIndex]}
            alt={`${property.address} - Image ${currentImageIndex + 1}`}
            className="h-full w-full object-cover"
          />
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#172019] hover:bg-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#172019] hover:bg-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#66706A] hover:text-red-500 transition-colors">
              <Heart size={20} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#66706A] hover:text-[#172019] transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Property Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl">{property.address}</h1>
                <div className="mt-2 flex items-center gap-2 text-[#66706A]">
                  <MapPin size={16} />
                  <span>{property.city}, {property.state} {property.zip}</span>
                </div>
              </div>
              {property.rating && (
                <div className="flex items-center gap-1 rounded-lg bg-[#E8F5D3] px-3 py-2">
                  <Star size={18} className="fill-[#31551C] text-[#31551C]" />
                  <span className="font-semibold text-[#31551C]">{property.rating}</span>
                  <span className="text-sm text-[#66706A]">({property.reviews} reviews)</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Users size={18} className="text-[#9AA8A0]" />
                <span className="font-medium">{property.bedrooms} bedrooms</span>
              </span>
              <span className="flex items-center gap-2">
                <Bath size={18} className="text-[#9AA8A0]" />
                <span className="font-medium">{property.bathrooms} bathrooms</span>
              </span>
              <span className="flex items-center gap-2">
                <Maximize2 size={18} className="text-[#9AA8A0]" />
                <span className="font-medium">{property.size.toLocaleString()} sq ft</span>
              </span>
              {property.lotSize && (
                <span className="flex items-center gap-2">
                  <TreePine size={18} className="text-[#9AA8A0]" />
                  <span className="font-medium">{property.lotSize.toLocaleString()} sq ft lot</span>
                </span>
              )}
            </div>
          </div>

          <div className="lg:text-right">
            <p className="font-display text-3xl font-semibold">
              {property.price ? `$${property.price.toLocaleString()}` : property.monthlyRent ? `$${property.monthlyRent.toLocaleString()}/month` : `$${property.nightlyRate}/night`}
            </p>
            {isSale && property.estimatedValue && (
              <div className="mt-2 rounded-lg bg-[#E8F5D3] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#31551C]">Estimated market value</p>
                <p className="text-sm font-medium text-[#31551C]">
                  ${property.estimatedValue.min.toLocaleString()} – ${property.estimatedValue.max.toLocaleString()}
                </p>
                <p className="text-xs text-[#66706A]">Within expected market range</p>
              </div>
            )}
          </div>
        </div>

        {/* Property Description */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h2 className="font-display text-xl">About this property</h2>
          <p className="mt-3 text-[#66706A] leading-relaxed">{property.description}</p>
        </section>

        {/* Property Facts */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h2 className="font-display text-xl">Property facts</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Property type</p>
              <p className="mt-1 font-medium">{property.type}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Year built</p>
              <p className="mt-1 font-medium">{property.yearBuilt}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Status</p>
              <p className="mt-1 font-medium">{property.status}</p>
            </div>
            {property.availability && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Available</p>
                <p className="mt-1 font-medium">{property.availability}</p>
              </div>
            )}
          </div>
        </section>

        {/* Amenities */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h2 className="font-display text-xl">Amenities</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {property.features.map((feature) => {
              const icon = {
                'Garage': Car,
                'Pool': Waves,
                'Garden': TreePine,
                'Central AC': Wind,
                'Hardwood Floors': Building2,
                'Gym': Dumbbell,
                'Rooftop': Building2,
                'Concierge': Building2,
                'Parking': Car,
                'Pet Friendly': TreePine,
                'Wi-Fi': Wifi,
                'Kitchen': Utensils,
                'Washer': Wind,
                'Air Conditioning': Wind,
                'City View': Building2,
                'Balcony': Building2,
                'HOA': Building2,
                'Smart Home': Wifi,
              }[feature] || Building2;
              
              const Icon = icon;
              return (
                <div key={feature} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5D3]">
                    <Icon size={16} className="text-[#31551C]" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Location */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
          <h2 className="font-display text-xl">Location</h2>
          <div className="mt-4 aspect-video rounded-lg bg-[#E7F0E5] flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="mx-auto text-[#9AA8A0]" />
              <p className="mt-2 text-sm text-[#66706A]">Interactive map</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2 text-sm">
              <Building2 size={16} className="text-[#9AA8A0]" />
              <span>Downtown: 12 min</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TreePine size={16} className="text-[#9AA8A0]" />
              <span>Park: 0.3 mi</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building2 size={16} className="text-[#9AA8A0]" />
              <span>School: 0.7 mi</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Car size={16} className="text-[#9AA8A0]" />
              <span>Airport: 18 min</span>
            </div>
          </div>
        </section>

        {/* Affordability Calculator (for purchases) */}
        {isSale && (
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Affordability calculator</h2>
              <button
                onClick={() => setShowAffordability(!showAffordability)}
                className="flex items-center gap-2 text-sm font-medium text-[#173D2B]"
              >
                <Calculator size={16} />
                {showAffordability ? 'Hide' : 'Show calculator'}
              </button>
            </div>
            
            {showAffordability && (
              <>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Purchase price</label>
                    <input
                      type="text"
                      defaultValue={`$${property.price?.toLocaleString()}`}
                      className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Down payment</label>
                    <input
                      type="text"
                      defaultValue="20%"
                      className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Interest rate</label>
                    <input
                      type="text"
                      defaultValue="6.5%"
                      className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Loan term</label>
                    <select className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                      <option>30 years</option>
                      <option>15 years</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Property tax (yearly)</label>
                    <input
                      type="text"
                      defaultValue="$4,200"
                      className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9AA8A0]">Insurance (yearly)</label>
                    <input
                      type="text"
                      defaultValue="$1,800"
                      className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                    />
                  </div>
                </div>
                
                <div className="mt-6 rounded-lg bg-[#E8F5D3] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#31551C]">Estimated monthly payment</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-[#31551C]">$2,700/month</p>
                  <div className="mt-2 grid gap-1 text-sm text-[#66706A]">
                    <div className="flex justify-between">
                      <span>Mortgage</span>
                      <span>$2,100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Property tax</span>
                      <span>$350</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance</span>
                      <span>$150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HOA</span>
                      <span>$100</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {/* Contact / Action Bar */}
        <section className="sticky bottom-0 left-0 right-0 z-40 border-t border-[#DDE2DD] bg-[#FBFCFA] p-4">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#173D2B] text-sm font-semibold text-white sm:flex">
                SJ
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Sarah Johnson</p>
                <p className="text-xs text-[#66706A]">Broker</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowContact(!showContact)}
                className="flex items-center gap-2 rounded-md border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
              >
                <MessageSquare size={18} />
                <span className="hidden sm:inline">Contact</span>
              </button>
              
              {isSale && (
                <Link
                  href={`/user/offers/new?property=${property.id}`}
                  className="flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
                >
                  Make offer
                </Link>
              )}
              
              {isRent && (
                <Link
                  href={`/user/rentals/new?property=${property.id}`}
                  className="flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
                >
                  Apply now
                </Link>
              )}
              
              {isStay && (
                <Link
                  href={`/user/trips/new?property=${property.id}`}
                  className="flex items-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]"
                >
                  Reserve
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Contact Modal */}
        {showContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl">Contact broker</h3>
                <button
                  onClick={() => setShowContact(false)}
                  className="text-[#66706A] hover:text-[#172019]"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Your message</label>
                  <textarea
                    rows={4}
                    placeholder="Hi, I'm interested in this property..."
                    className="w-full rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowContact(false)}
                    className="flex-1 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-medium text-[#66706A] hover:bg-[#F0F2F0]"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123022]">
                    Send message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BuyerPageShell>
  );
}
