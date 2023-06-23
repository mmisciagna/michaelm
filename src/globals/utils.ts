import slugify from 'react-slugify';
import { Showcases } from '@/content/showcases';

export function getUserPreferredTheme(): string | null {
  if (typeof window === 'undefined') return null;

  const isDarkTheme =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  return determineTheme(isDarkTheme);
}

export function determineTheme(condition: boolean): string {
  return condition ? 'dark' : 'light';
}

export function getLocalStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(key);
}

export function setLocalStorage(key: string, val: string): void | null {
  if (typeof window === 'undefined') return null;
  window.localStorage.setItem(key, val);
}

export function setTheme(theme: string): void {
  document.documentElement.setAttribute('theme', theme);
}

export function getCurrentShowcase(slug: string): Showcase | undefined {
  return Showcases.find((showcase) => {
    return slugify(showcase.data.title) === slug;
  });
}
