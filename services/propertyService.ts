import { Property, PropertyFilters } from '../types';
import { MOCK_PROPERTIES } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  getProperties: async (filters: PropertyFilters): Promise<{ data: Property[], total: number }> => {
    await delay(800);
    
    let filtered = [...MOCK_PROPERTIES];

    if (filters.keyword) {
      const lowerKeyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(lowerKeyword));
    }

    if (filters.location && filters.location.length > 0) {
        // Simple mock implementation for location filter
        // In real app, this would be more complex matching
    }

    if (filters.listingType) {
      filtered = filtered.filter(p => p.listingType === filters.listingType);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(p => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]);
    }
    
    // Sort logic
    if (filters.sortBy) {
        switch(filters.sortBy) {
            case 'price_asc': filtered.sort((a,b) => a.price - b.price); break;
            case 'price_desc': filtered.sort((a,b) => b.price - a.price); break;
            case 'area_asc': filtered.sort((a,b) => a.area - b.area); break;
            default: break;
        }
    }

    return {
      data: filtered,
      total: filtered.length
    };
  },

  getFeaturedProperties: async (): Promise<Property[]> => {
    await delay(500);
    return MOCK_PROPERTIES.filter(p => p.featured);
  },

  getPropertyById: async (id: string): Promise<Property | undefined> => {
    await delay(600);
    return MOCK_PROPERTIES.find(p => p.id === id);
  },

  getRelatedProperties: async (id: string): Promise<Property[]> => {
    await delay(500);
    return MOCK_PROPERTIES.filter(p => p.id !== id).slice(0, 3);
  }
};