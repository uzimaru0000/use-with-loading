import { describe, expect, it } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useWithLoading } from './index';

const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('data');
    }, 100);
  });
};

const fetchError = async () => {
  throw new Error('Error occurred');
};

describe('useWithLoading', () => {
  it('should handle loading state correctly', async () => {
    const { result } = renderHook(() => useWithLoading(fetchData));

    expect(result.current.isLoading).toBe(false);
    act(() => {
      result.current();
    });
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should handle data state correctly', async () => {
    const { result } = renderHook(() => useWithLoading(fetchData));
    const wrappedFunction = result.current;

    let data;
    await act(async () => {
      data = await wrappedFunction();
    });

    expect(data).toBe('data');
  });

  it('should update loading state even when an error occurs', async () => {
    const { result } = renderHook(() => useWithLoading(fetchError));
    const wrappedFunction = result.current;

    expect(wrappedFunction.isLoading).toBe(false);

    await act(async () => {
      expect(() => wrappedFunction()).rejects.toThrow('Error occurred');
    });

    expect(wrappedFunction.isLoading).toBe(false);
  });
});
