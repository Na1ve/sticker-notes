const DEFAULT_DELAY = 300;

export function debounce<F extends (...args: any[]) => any>(
  callback: F,
  delay: number = DEFAULT_DELAY
) {
  let timer: ReturnType<typeof setTimeout>;

  const debounced = (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
}
