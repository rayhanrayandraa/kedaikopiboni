import { useEffect, useState, useRef, useCallback } from 'react';
import { preloadImages, getFrameUrl } from '../utils/preloadImages';
import { 
  TOTAL_FRAMES, 
  FRAME_DIR, 
  FRAME_PREFIX, 
  FRAME_DIGITS, 
  FRAME_EXT,
  CANVAS_CONFIG 
} from '../constants/breakpoints';
import { useIsMobile } from './useIsMobile';

export const useImageSequence = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  scrollProgress: number
) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isMobile = useIsMobile();
  const lastRenderedIndex = useRef<number>(-1);

  // Preload images
  useEffect(() => {
    const urls = Array.from({ length: TOTAL_FRAMES }, (_, i) => 
      getFrameUrl(FRAME_DIR, FRAME_PREFIX, i + 1, FRAME_DIGITS, FRAME_EXT)
    );

    preloadImages(urls, setLoadProgress)
      .then((imgs) => {
        imagesRef.current = imgs;
        setIsLoaded(true);
      })
      .catch((err) => console.error('Failed to preload images:', err));
  }, []);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img) return;

    // Handle resolution scaling
    const scale = isMobile ? CANVAS_CONFIG.MOBILE_SCALE : CANVAS_CONFIG.DESKTOP_SCALE;
    const { width, height } = img;
    
    // Set canvas dimensions once or on resize
    if (canvas.width !== width * scale) {
      canvas.width = width * scale;
      canvas.height = height * scale;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    lastRenderedIndex.current = index;
  }, [isMobile, canvasRef]);

  // Render on scroll progress change
  useEffect(() => {
    if (!isLoaded) return;

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(scrollProgress * TOTAL_FRAMES))
    );

    if (frameIndex !== lastRenderedIndex.current) {
      requestAnimationFrame(() => renderFrame(frameIndex));
    }
  }, [scrollProgress, isLoaded, renderFrame]);

  return { isLoaded, loadProgress };
};
