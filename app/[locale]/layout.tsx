import { ReactNode } from 'react';
import { Metadata } from 'next';
import { i18n, Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { I18nProvider } from '@/lib/i18n/context';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const meta = {
    fr: {
      title: 'Magnific Digital | Solutions IA PME & Grandes Entreprises',
      description:
        "Magnific Digital développe des applications web & mobiles propulsées par l'IA : chatbots intelligents, agents vocaux, automatisation et formations pratiques pour accélérer votre croissance.",
      ogTitle: 'Magnific Digital | Solutions IA sur mesure',
      ogDescription:
        'Applications web & mobiles IA, chatbots, agents vocaux et formations pour accélérer votre croissance.',
    },
    en: {
      title: 'Magnific Digital | AI Solutions for SMBs & Enterprises',
      description:
        'Magnific Digital builds AI-powered web & mobile applications: intelligent chatbots, voice agents, automation and hands-on training to accelerate your growth.',
      ogTitle: 'Magnific Digital | Custom AI Solutions',
      ogDescription:
        'AI-powered web & mobile apps, chatbots, voice agents and training to accelerate your growth.',
    },
  };

  const m = meta[locale as keyof typeof meta] || meta.fr;

  return {
    title: m.title,
    description: m.description,
    keywords: [
      'IA',
      'AI',
      'intelligence artificielle',
      'chatbot',
      'agent vocal',
      'voice agent',
      'formation IA',
      'PME',
      'automatisation',
      'Magnific Digital',
    ],
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: 'https://magnificdigital.net',
      siteName: 'Magnific Digital',
      type: 'website',
    },
    alternates: {
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <I18nProvider locale={locale as Locale} dict={dict as Record<string, unknown>}>
      <div lang={locale}>
        {children}
      </div>
    </I18nProvider>
  );
}
