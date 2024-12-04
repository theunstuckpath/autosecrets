import { ref, get, set, push, remove } from 'firebase/database';
import { db } from '../config/firebase';
import type { CarListing } from '../types';

// Initialize the database with some sample data
export async function initializeDatabase() {
  const listingsRef = ref(db, 'listings');
  const snapshot = await get(listingsRef);

  if (!snapshot.exists()) {
    const sampleListings: Record<string, Omit<CarListing, 'id'>> = {
      '1': {
        title: '2020 Honda Civic LX',
        make: 'Honda',
        model: 'Civic',
        year: 2020,
        price: 23500,
        mileage: 45000,
        city: 'Toronto',
        province: 'ON',
        sellerType: 'dealer',
        source: 'Cars.ca',
        listingUrl: '#',
        photos: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=500'],
        description: 'Well maintained Honda Civic with full service history.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        condition: 'used'
      },
      // Add more sample listings as needed
    };

    await set(listingsRef, sampleListings);
  }
}

// Call this function when the app starts
initializeDatabase().catch(console.error);
