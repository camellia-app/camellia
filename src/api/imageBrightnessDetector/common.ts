/**
 * Returns brightness from 0 (dark) to 1 (light).
 */
export type ImageBrightnessDetector = (image: HTMLImageElement) => Promise<number>;
