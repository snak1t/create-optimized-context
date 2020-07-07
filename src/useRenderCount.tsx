import { useRef, useEffect } from 'react';

export function useRenderCount(): number {
  const ref = useRef<number>(0);
  useEffect(() => {
    ref.current = ref.current + 1;
  });
  return ref.current;
}
