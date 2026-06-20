import { useState, useEffect } from 'react';
import { IS_MOBILE_LIMIT } from '../constants/breakpoints';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < IS_MOBILE_LIMIT : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < IS_MOBILE_LIMIT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};
