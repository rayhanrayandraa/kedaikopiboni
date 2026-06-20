import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollProgress = (triggerRef: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!triggerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => st.kill();
  }, [triggerRef]);

  return progress;
};
