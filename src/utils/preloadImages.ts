export const preloadImages = (
  urls: string[],
  onProgress?: (progress: number) => void
): Promise<HTMLImageElement[]> => {
  let loadedCount = 0;
  const total = urls.length;

  return Promise.all(
    urls.map((url) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          if (onProgress) onProgress((loadedCount / total) * 100);
          resolve(img);
        };
        img.onerror = reject;
      });
    })
  );
};

export const getFrameUrl = (
  dir: string,
  prefix: string,
  index: number,
  digits: number,
  ext: string
) => {
  const paddedIndex = String(index).padStart(digits, '0');
  return `${dir}/${prefix}${paddedIndex}.${ext}`;
};
