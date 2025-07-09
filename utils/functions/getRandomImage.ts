/**
 * Returns a random image URL from pravatar.cc
 * @param size - Image size (50 to 500, default 150)
 * @param index - Optional index (1 to 70), if not provided, picks randomly
 */
export default function getRandomPersonsImage(size: number = 150, index?: number): string {
  const validSize = Math.max(50, Math.min(size, 500));
  const validIndex = index && index >= 1 && index <= 70 ? index : Math.floor(Math.random() * 70) + 1;

  return `https://i.pravatar.cc/${validSize}?img=${validIndex}`;
}

export function getRandomImage(width = 320, height = 240): string {
  return `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`;
}

