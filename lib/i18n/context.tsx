'use client';

import { createContext, useContext } from 'react';
import type { Locale } from '../i18n';

type Dictionary = Record<string, unknown>;

interface I18nContextValue {
  locale: Locale;
  dict: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, dict }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

// Helper to get nested value from dict: t('hero.badge') => dict.hero.badge
export function useT() {
  const { dict } = useI18n();

  return function t(key: string): string {
    const keys = key.split('.');
    let value: unknown = dict;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // fallback to key if not found
      }
    }
    return typeof value === 'string' ? value : key;
  };
}
