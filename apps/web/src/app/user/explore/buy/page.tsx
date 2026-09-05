'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExplorePage from '../page';

export default function BuyExplorePage() {
  const router = useRouter();
  
  useEffect(() => {
    // This is a redirect to the main explore page with Buy intent pre-selected
    // In a real app, you'd use URL params or state management
    router.push('/user/explore');
  }, [router]);

  return null;
}
