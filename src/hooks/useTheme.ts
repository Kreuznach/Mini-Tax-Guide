import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Theme } from '../types';

function detectSystemTheme(): Theme {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch {
    return 'light';
  }
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(
    'mtg-theme',
    detectSystemTheme()
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return { theme, toggleTheme };
}
