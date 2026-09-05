'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RentExplorePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/user/explore');
  }, [router]);

  return null;
}
