import { useCallback, useEffect, useRef } from 'react';

export const useThrottledScroll = (callback: (scrollY: number) => void, delay: number = 16) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  const throttledCallback = useCallback(() => {
    if (timeoutRef.current) return;

    timeoutRef.current = setTimeout(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY !== lastScrollY.current) {
        callback(currentScrollY);
        lastScrollY.current = currentScrollY;
      }
      timeoutRef.current = null;
    }, delay);
  }, [callback, delay]);

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [throttledCallback]);

  return lastScrollY.current;
}; 