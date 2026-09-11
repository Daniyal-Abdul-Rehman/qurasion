export const hostProperties = [
  { id: 'prop-1', name: 'Downtown Loft', address: '1824 Oak Street', city: 'Dallas', state: 'TX', zip: '75201', propertyType: 'Apartment', bedrooms: 2, bathrooms: 1, guests: 4, sqft: 1200, nightlyRate: 150, status: 'Active', listingStatus: 'Published', views: '8,420', bookings: 127, rating: 4.8, reviews: 89, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80', listedDate: 'Aug 15, 2026' },
  { id: 'prop-2', name: 'Cozy Guest House', address: '741 Pine Avenue', city: 'Dallas', state: 'TX', zip: '75202', propertyType: 'Guest House', bedrooms: 1, bathrooms: 1, guests: 2, sqft: 600, nightlyRate: 95, status: 'Active', listingStatus: 'Draft', views: '0', bookings: 0, rating: 0, reviews: 0, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80', listedDate: 'Not published' },
  { id: 'prop-3', name: 'Luxury Villa', address: '92 Market Street', city: 'Austin', state: 'TX', zip: '78701', propertyType: 'Villa', bedrooms: 5, bathrooms: 3, guests: 10, sqft: 3500, nightlyRate: 450, status: 'Active', listingStatus: 'Published', views: '2,450', bookings: 45, rating: 4.9, reviews: 38, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80', listedDate: 'Aug 10, 2026' },
  { id: 'prop-4', name: 'Beach Condo', address: '310 Lake Drive', city: 'Houston', state: 'TX', zip: '77001', propertyType: 'Condo', bedrooms: 2, bathrooms: 2, guests: 4, sqft: 1100, nightlyRate: 175, status: 'Inactive', listingStatus: 'Paused', views: '3,827', bookings: 67, rating: 4.7, reviews: 52, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80', listedDate: 'Aug 20, 2026' },
];

export const hostListings = [
  { id: 'listing-1', property: 'Downtown Loft', nightlyRate: 150, status: 'Active', views: '8,420', saves: '184', inquiries: '43', bookings: '127', reviews: 89, published: 'Aug 15, 2026' },
  { id: 'listing-2', property: 'Luxury Villa', nightlyRate: 450, status: 'Active', views: '2,450', saves: '234', inquiries: '67', bookings: '45', reviews: 38, published: 'Aug 10, 2026' },
  { id: 'listing-3', property: 'Cozy Guest House', nightlyRate: 95, status: 'Draft', views: '0', saves: '0', inquiries: '0', bookings: '0', reviews: 0, published: 'Not published' },
];

export const hostBookings = [
  { id: 'booking-1', property: 'Downtown Loft', guest: 'Michael Roberts', checkIn: 'Sep 10, 2026', checkOut: 'Sep 15, 2026', guests: 2, total: '$750', status: 'Confirmed', bookingDate: 'Sep 01, 2026' },
  { id: 'booking-2', property: 'Luxury Villa', guest: 'Sarah Kim', checkIn: 'Sep 20, 2026', checkOut: 'Sep 25, 2026', guests: 4, total: '$2,250', status: 'Pending', bookingDate: 'Sep 03, 2026' },
  { id: 'booking-3', property: 'Downtown Loft', guest: 'David Martinez', checkIn: 'Oct 01, 2026', checkOut: 'Oct 05, 2026', guests: 3, total: '$600', status: 'Confirmed', bookingDate: 'Sep 05, 2026' },
];

export const hostReviews = [
  { id: 'review-1', property: 'Downtown Loft', guest: 'Michael Roberts', rating: 5, date: 'Sep 08, 2026', comment: 'Amazing place! Very clean and centrally located. Would definitely recommend.' },
  { id: 'review-2', property: 'Luxury Villa', guest: 'Sarah Kim', rating: 4, date: 'Sep 05, 2026', comment: 'Beautiful property with great amenities. The host was very responsive.' },
  { id: 'review-3', property: 'Downtown Loft', guest: 'Emily Chen', rating: 5, date: 'Aug 28, 2026', comment: 'Perfect for our weekend getaway. The check-in process was seamless.' },
];

export const hostTransactions = [
  { id: 'trans-1', property: 'Downtown Loft', guest: 'James Wilson', checkIn: 'Aug 15, 2026', checkOut: 'Aug 18, 2026', amount: '$450', status: 'Completed' },
  { id: 'trans-2', property: 'Luxury Villa', guest: 'Emily Chen', checkIn: 'Jul 28, 2026', checkOut: 'Aug 02, 2026', amount: '$2,700', status: 'Completed' },
  { id: 'trans-3', property: 'Beach Condo', guest: 'Robert Davis', checkIn: 'Jul 10, 2026', checkOut: 'Jul 14, 2026', amount: '$700', status: 'Completed' },
];

export const hostTasks = [
  { id: 'task-1', title: 'Respond to guest inquiry', time: '10:00 AM', date: 'Today', relatedTo: 'Downtown Loft', type: 'Email', priority: 'High' },
  { id: 'task-2', title: 'Schedule cleaning service', time: '11:30 AM', date: 'Today', relatedTo: 'Luxury Villa', type: 'Service', priority: 'Medium' },
  { id: 'task-3', title: 'Update pricing for weekend', time: '1:00 PM', date: 'Today', relatedTo: 'Downtown Loft', type: 'Pricing', priority: 'High' },
  { id: 'task-4', title: 'Restock amenities', time: '3:00 PM', date: 'Today', relatedTo: 'Beach Condo', type: 'Maintenance', priority: 'Medium' },
];

export const hostAnalytics = {
  overview: {
    totalProperties: 4,
    activeListings: 2,
    upcomingBookings: 8,
    totalReviews: 179,
    avgRating: 4.8,
    totalRevenue: '$12,450',
    occupancyRate: '78%',
    avgNightlyRate: '$193'
  },
  propertyPerformance: [
    { property: 'Downtown Loft', views: 8420, bookings: 127, revenue: '$19,050', rating: 4.8, occupancy: '82%' },
    { property: 'Luxury Villa', views: 2450, bookings: 45, revenue: '$20,250', rating: 4.9, occupancy: '75%' },
    { property: 'Beach Condo', views: 3827, bookings: 67, revenue: '$11,725', rating: 4.7, occupancy: '68%' },
  ],
  monthlyRevenue: [
    { month: 'May', revenue: '$4,200' },
    { month: 'Jun', revenue: '$3,800' },
    { month: 'Jul', revenue: '$4,450' },
    { month: 'Aug', revenue: '$0' },
    { month: 'Sep', revenue: '$0' },
  ],
  topGuests: [
    { name: 'Michael Roberts', stays: 5, totalSpent: '$3,750' },
    { name: 'Sarah Kim', stays: 3, totalSpent: '$2,250' },
    { name: 'David Martinez', stays: 2, totalSpent: '$1,800' }
  ]
};
