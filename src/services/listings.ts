import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../config/firebase';
import type { CarListing, SearchFilters } from '../types';

export async function fetchListings(filters: SearchFilters = {}): Promise<CarListing[]> {
  try {
    const listingsRef = ref(db, 'listings');
    const snapshot = await get(listingsRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    let listings = Object.entries(snapshot.val()).map(([id, data]) => ({
      id,
      ...(data as Omit<CarListing, 'id'>)
    }));

    // Apply filters
    if (filters.make) {
      listings = listings.filter(listing => 
        listing.make.toLowerCase().includes(filters.make!.toLowerCase())
      );
    }
    if (filters.model) {
      listings = listings.filter(listing => 
        listing.model.toLowerCase().includes(filters.model!.toLowerCase())
      );
    }
    if (filters.minPrice) {
      listings = listings.filter(listing => listing.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      listings = listings.filter(listing => listing.price <= filters.maxPrice!);
    }
    if (filters.city) {
      listings = listings.filter(listing => 
        listing.city.toLowerCase() === filters.city!.toLowerCase()
      );
    }
    if (filters.province) {
      listings = listings.filter(listing => listing.province === filters.province);
    }
    if (filters.sellerType) {
      listings = listings.filter(listing => listing.sellerType === filters.sellerType);
    }

    return listings.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export async function fetchNewListings(since: Date): Promise<CarListing[]> {
  try {
    const listingsRef = ref(db, 'listings');
    const snapshot = await get(listingsRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    const listings = Object.entries(snapshot.val())
      .map(([id, data]) => ({
        id,
        ...(data as Omit<CarListing, 'id'>)
      }))
      .filter(listing => new Date(listing.createdAt) >= since)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return listings.slice(0, 10); // Return only the 10 most recent listings
  } catch (error) {
    console.error('Error fetching new listings:', error);
    return [];
  }
}
