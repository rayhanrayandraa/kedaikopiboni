import { CANVAS_CONFIG } from '../constants/breakpoints';

export const getCanvasResolution = (isMobile: boolean) => {
  return isMobile ? CANVAS_CONFIG.MOBILE_SCALE : CANVAS_CONFIG.DESKTOP_SCALE;
};

export const getThrottleFPS = (isMobile: boolean) => {
  return isMobile ? CANVAS_CONFIG.THROTTLE_FPS_MOBILE : CANVAS_CONFIG.THROTTLE_FPS_DESKTOP;
};
