'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/users/login');
    } else {
      setIsLoading(false); // Allow rendering if token is found
    }
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // Optional: show spinner
  }

  return <>{children}</>;
}
