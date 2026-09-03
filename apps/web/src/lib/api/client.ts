// API Client for Real Estate Platform

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';

class ApiClient {
  private baseUrl: string;
  private version: string;

  constructor(baseUrl: string, version: string) {
    this.baseUrl = baseUrl;
    this.version = version;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api/${this.version}${endpoint}`;
    const requestId = this.generateRequestId();

    const headers = {
      'Content-Type': 'application/json',
      'X-Request-ID': requestId,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Property APIs
  async searchProperties(filters: any, page = 1, pageSize = 20) {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...filters,
    });
    return this.request(`/properties?${params}`);
  }

  async getProperty(id: string) {
    return this.request(`/properties/${id}`);
  }

  async createPropertyAnalysis(propertyId: string, assumptions?: any) {
    return this.request(`/properties/${propertyId}/analyses`, {
      method: 'POST',
      body: JSON.stringify({ assumptions }),
    });
  }

  async getAnalysis(id: string) {
    return this.request(`/analyses/${id}`);
  }

  // Investor APIs
  async getInvestorProfile(id: string) {
    return this.request(`/investor-profiles/${id}`);
  }

  async createInvestorProfile(profile: any) {
    return this.request('/investor-profiles', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async updateInvestorProfile(id: string, profile: any) {
    return this.request(`/investor-profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  }

  async getMatches(investorId: string) {
    return this.request(`/investor-profiles/${investorId}/matches`);
  }

  // Offer APIs
  async createOffer(offer: any) {
    return this.request('/offers', {
      method: 'POST',
      body: JSON.stringify(offer),
    });
  }

  async getOffer(id: string) {
    return this.request(`/offers/${id}`);
  }

  async getOffers(filters?: any) {
    const params = new URLSearchParams(filters || {});
    return this.request(`/offers?${params}`);
  }

  // Deal APIs
  async getDeal(id: string) {
    return this.request(`/deals/${id}`);
  }

  async getDeals(filters?: any) {
    const params = new URLSearchParams(filters || {});
    return this.request(`/deals?${params}`);
  }

  // Document APIs
  async getUploadUrl(documentType: string, propertyId?: string, dealId?: string) {
    return this.request('/documents/upload-url', {
      method: 'POST',
      body: JSON.stringify({ documentType, propertyId, dealId }),
    });
  }

  // Job APIs
  async getJobStatus(id: string) {
    return this.request(`/jobs/${id}`);
  }
}

export const apiClient = new ApiClient(API_URL, API_VERSION);
