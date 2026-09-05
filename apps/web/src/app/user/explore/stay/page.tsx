'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StayExplorePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/user/explore');
  }, [router]);

  return null;
}
