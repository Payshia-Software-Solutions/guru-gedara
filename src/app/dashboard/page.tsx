
"use client";
// This file is intentionally left blank as its content has been moved to /lms/dashboard/page.tsx
// and this route (/dashboard) is no longer used.
// You can delete this file if it's not referenced elsewhere.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OldDashboardRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/lms/dashboard');
  }, [router]);
  return null; // Or a loading spinner
}
