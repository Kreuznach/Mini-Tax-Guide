import { useState, useCallback } from 'react';

/**
 * useState와 동일한 인터페이스지만 값을 localStorage에 영속 저장합니다.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        setStoredValue(prev => {
          const valueToStore =
            value instanceof Function ? value(prev) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
        });
      } catch (error) {
        console.error(`[useLocalStorage] key="${key}"`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue] as const;
}
