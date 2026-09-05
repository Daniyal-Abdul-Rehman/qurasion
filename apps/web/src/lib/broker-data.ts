export const brokerLeads = [
  { id: 'lead-1', name: 'Michael Roberts', type: 'Investor', email: 'michael.r@email.com', phone: '(214) 555-0123', source: 'Listing inquiry', status: 'Qualified', score: 92, property: '1824 Oak Street', capital: '$500K-$1M', strategy: 'Fix & Flip', created: 'Sep 01, 2026' },
  { id: 'lead-2', name: 'Sarah Kim', type: 'Investor', email: 'sarah.k@email.com', phone: '(512) 555-0456', source: 'Match', status: 'Contacted', score: 87, property: '741 Pine Avenue', capital: '$400K-$750K', strategy: 'Buy & Hold', created: 'Sep 02, 2026' },
  { id: 'lead-3', name: 'John Davidson', type: 'Seller', email: 'john.d@email.com', phone: '(469) 555-0789', source: 'Referral', status: 'New', score: 78, property: 'Unknown', capital: 'N/A', strategy: 'N/A', created: 'Sep 03, 2026' },
  { id: 'lead-4', name: 'David Martinez', type: 'Investor', email: 'david.m@email.com', phone: '(214) 555-0321', source: 'Website', status: 'Viewing', score: 95, property: '92 Market Street', capital: '$600K+', strategy: 'BRRRR', created: 'Sep 04, 2026' },
];

export const brokerContacts = [
  { id: 'contact-1', name: 'Michael Roberts', type: 'Investor', email: 'michael.r@email.com', phone: '(214) 555-0123', propertiesViewed: 5, savedProperties: 3, offers: 2, deals: 1, lastContact: '2 hours ago' },
  { id: 'contact-2', name: 'John Smith', type: 'Seller', email: 'john.s@email.com', phone: '(469) 555-0145', properties: 3, activeListings: 2, deals: 1, lastContact: '1 day ago' },
  { id: 'contact-3', name: 'Sarah Williams', type: 'Seller', email: 'sarah.w@email.com', phone: '(512) 555-0278', properties: 1, activeListings: 1, deals: 0, lastContact: '3 days ago' },
  { id: 'contact-4', name: 'David Martinez', type: 'Investor', email: 'david.m@email.com', phone: '(214) 555-0321', propertiesViewed: 8, savedProperties: 5, offers: 3, deals: 2, lastContact: '5 hours ago' },
];

export const brokerSellers = [
  { id: 'seller-1', name: 'John Smith', properties: 3, activeListings: 2, deals: 1, status: 'Active', lastContact: '1 day ago' },
  { id: 'seller-2', name: 'Sarah Williams', properties: 1, activeListings: 1, deals: 0, status: 'Active', lastContact: '3 days ago' },
  { id: 'seller-3', name: 'Robert Davis', properties: 2, activeListings: 1, deals: 0, status: 'Active', lastContact: '1 week ago' },
  { id: 'seller-4', name: 'Emily Chen', properties: 1, activeListings: 0, deals: 0, status: 'Inactive', lastContact: '2 weeks ago' },
];

export const brokerInvestors = [
  { id: 'investor-1', name: 'Michael Roberts', capital: '$500K-$1M', strategies: ['Fix & Flip', 'Buy & Hold'], markets: ['Dallas', 'Austin', 'Houston'], propertyTypes: ['Single Family', 'Multifamily'], targetReturn: '15%+', dealsCompleted: 23, status: 'Active' },
  { id: 'investor-2', name: 'Sarah Kim', capital: '$250K-$750K', strategies: ['Buy & Hold'], markets: ['Florida', 'Texas'], propertyTypes: ['Single Family'], targetReturn: '12%+', dealsCompleted: 8, status: 'Active' },
  { id: 'investor-3', name: 'David Martinez', capital: '$1M-$5M', strategies: ['BRRRR', 'Development'], markets: ['New York', 'New Jersey'], propertyTypes: ['Multifamily'], targetReturn: '18%+', dealsCompleted: 15, status: 'Active' },
  { id: 'investor-4', name: 'James Wilson', capital: '$100K-$300K', strategies: ['Fix & Flip'], markets: ['Atlanta', 'Charlotte'], propertyTypes: ['Single Family'], targetReturn: '20%+', dealsCompleted: 5, status: 'Active' },
];

export const brokerProperties = [
  { id: 'prop-1', address: '1824 Oak Street', seller: 'John Smith', status: 'Active', listingStatus: 'Published', price: '$509,000', views: '8,420', investors: '127', offers: '7', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80' },
  { id: 'prop-2', address: '741 Pine Avenue', seller: 'Sarah Williams', status: 'Active', listingStatus: 'Draft', price: '$475,000', views: '0', investors: '0', offers: '0', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80' },
  { id: 'prop-3', address: '92 Market Street', seller: 'Robert Davis', status: 'Off-market', listingStatus: 'Private', price: '$620,000', views: '245', investors: '18', offers: '2', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80' },
  { id: 'prop-4', address: '310 Lake Drive', seller: 'John Smith', status: 'Pending', listingStatus: 'Under Offer', price: '$545,000', views: '3,827', investors: '89', offers: '5', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80' },
];

export const brokerListings = [
  { id: 'listing-1', property: '1824 Oak Street', price: '$509,000', status: 'Active', views: '8,420', saves: '184', inquiries: '43', matches: '127', offers: '7', published: 'Aug 15, 2026' },
  { id: 'listing-2', property: '310 Lake Drive', price: '$545,000', status: 'Under Offer', views: '3,827', saves: '92', inquiries: '28', matches: '89', offers: '5', published: 'Aug 20, 2026' },
  { id: 'listing-3', property: '741 Pine Avenue', price: '$475,000', status: 'Draft', views: '0', saves: '0', inquiries: '0', matches: '0', offers: '0', published: 'Not published' },
];

export const brokerMatches = [
  { id: 'match-1', property: '1824 Oak Street', investor: 'Michael Roberts', matchScore: 96, capital: '$500K-$1M', strategy: 'Fix & Flip', status: 'Contacted' },
  { id: 'match-2', property: '1824 Oak Street', investor: 'Sarah Kim', matchScore: 93, capital: '$400K-$750K', strategy: 'Buy & Hold', status: 'New' },
  { id: 'match-3', property: '310 Lake Drive', investor: 'David Martinez', matchScore: 89, capital: '$600K+', strategy: 'BRRRR', status: 'Viewing Scheduled' },
];

export const brokerOffers = [
  { id: 'offer-1', property: '1824 Oak Street', investor: 'Michael Roberts', price: '$485,000', financing: 'Cash', inspection: '10 days', closing: '30 days', earnestMoney: '$10,000', status: 'Pending', submitted: 'Sep 04, 2026' },
  { id: 'offer-2', property: '1824 Oak Street', investor: 'Sarah Kim', price: '$495,000', financing: 'Loan', inspection: '15 days', closing: '45 days', earnestMoney: '$8,000', status: 'Countered', submitted: 'Sep 03, 2026' },
  { id: 'offer-3', property: '741 Pine Avenue', investor: 'David Martinez', price: '$610,000', financing: 'Cash', inspection: '7 days', closing: '21 days', earnestMoney: '$15,000', status: 'Accepted', submitted: 'Sep 02, 2026' },
];

export const brokerDeals = [
  { id: 'deal-1', property: '1824 Oak Street', seller: 'John Smith', investor: 'Michael Roberts', price: '$500,000', status: 'Due Diligence', expectedClosing: 'Oct 04, 2026' },
  { id: 'deal-2', property: '741 Pine Avenue', seller: 'Sarah Williams', investor: 'David Martinez', price: '$610,000', status: 'Contracted', expectedClosing: 'Oct 15, 2026' },
  { id: 'deal-3', property: '310 Lake Drive', seller: 'John Smith', investor: 'Sarah Kim', price: '$545,000', status: 'Financing', expectedClosing: 'Sep 28, 2026' },
];

export const brokerTasks = [
  { id: 'task-1', title: 'Follow up with Michael', time: '10:00 AM', date: 'Today', relatedTo: '1824 Oak Street', type: 'Call' },
  { id: 'task-2', title: 'Request inspection report', time: '11:30 AM', date: 'Today', relatedTo: '1824 Oak Street', type: 'Document' },
  { id: 'task-3', title: 'Send seller update', time: '1:00 PM', date: 'Today', relatedTo: 'John Smith', type: 'Email' },
  { id: 'task-4', title: 'Review title document', time: '3:00 PM', date: 'Today', relatedTo: '741 Pine Avenue', type: 'Review' },
];