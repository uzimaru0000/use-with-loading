import { useEffect, useRef } from 'react';

type AsyncFunc = (...args: any[]) => Promise<any>;
type WithLoading<T> = T & { isLoading: boolean };

function withLoading<F extends AsyncFunc>(f: F) {
  const wrap = Object.assign(
    async (...args: Parameters<F>): Promise<ReturnType<F>> => {
      try {
        wrap.isLoading = true;
        return await f(...args);
      } finally {
        wrap.isLoading = false;
      }
    },
    { isLoading: false }
  );

  return wrap as WithLoading<F>;
}

export const useWithLoading = <F extends AsyncFunc>(f: F) => {
  const wrapFunc = useRef<WithLoading<F>>(withLoading(f));

  useEffect(() => {
    wrapFunc.current = withLoading(f);
  }, [f]);

  return wrapFunc.current;
};
