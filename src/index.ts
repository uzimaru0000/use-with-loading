import { useMemo, useState } from 'react';

type AsyncFunc = (...args: any[]) => Promise<any>;

export const useWithLoading = <
  F extends AsyncFunc,
  Args extends Parameters<F>,
  Return extends ReturnType<F>
>(
  f: F
) => {
  const [isLoading, setIsLoading] = useState(false);

  const wrapFunc = useMemo(() => {
    const wrap = async (...args: Args): Promise<Awaited<Return>> => {
      setIsLoading(true);
      try {
        return await f(...args);
      } finally {
        setIsLoading(false);
      }
    };
    wrap.isLoading = isLoading;

    return wrap;
  }, [f, isLoading]);

  return wrapFunc;
};
