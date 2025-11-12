
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';

export function useSafeNavigation() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigate = useCallback((path) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    try {
      router.push(path);
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setTimeout(() => setIsNavigating(false), 500);
    }
  }, [isNavigating, router]);

  return { isNavigating, navigate };
}
