import type { Breakpoint } from '../types';

export const BREAKPOINTS: Breakpoint = {
  MOBILE: 375,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1440,
};

export const IS_MOBILE_LIMIT = BREAKPOINTS.TABLET;

export const CANVAS_CONFIG = {
  MOBILE_SCALE: 0.5,
  DESKTOP_SCALE: 1,
  WEBP_QUALITY_MOBILE: 60,
  WEBP_QUALITY_DESKTOP: 85,
  THROTTLE_FPS_MOBILE: 30,
  THROTTLE_FPS_DESKTOP: 60,
};

export const TOTAL_FRAMES = 245;
export const FRAME_DIR = '/sequence';
export const FRAME_PREFIX = 'ezgif-frame-';
export const FRAME_DIGITS = 3;
export const FRAME_EXT = 'jpg'; // Change to webp after conversion
