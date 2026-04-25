'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail, Facebook, Instagram } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/logo';
import { useT, useI18n } from '@/lib/i18n/context';

interface FooterLink {
  label: string;
  href: string;
  scrollTo?: string;
}

const Footer = () => {
  const t = useT();
  const { locale } = useI18n();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, scrollTo?: string) => {
    if (!scrollTo) return;
    e.preventDefault();
    const el = document.getElementById(scrollTo);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const footerSections: { title: string; links: FooterLink[] }[] = [
    {
      title: t('footer.sections.services.title'),
      links: [
        { label: t('footer.sections.services.links.webApps'), href: '#services', scrollTo: 'services' },
        { label: t('footer.sections.services.links.chatbots'), href: '#services', scrollTo: 'services' },
        { label: t('footer.sections.services.links.voiceAgents'), href: '#services', scrollTo: 'services' },
        { label: t('footer.sections.services.links.training'), href: '#formations', scrollTo: 'formations' },
      ],
    },
    {
      title: t('footer.sections.company.title'),
      links: [
        { label: t('footer.sections.company.links.about'), href: '#mission', scrollTo: 'mission' },
        { label: t('footer.sections.company.links.portfolio'), href: '#results', scrollTo: 'results' },
        { label: t('footer.sections.company.links.howItWorks'), href: '#how-it-works', scrollTo: 'how-it-works' },
        { label: t('footer.sections.company.links.careers'), href: `/${locale}/carrieres` },
      ],
    },
    {
      title: t('footer.sections.support.title'),
      links: [
        { label: t('footer.sections.support.links.contact'), href: '#contact', scrollTo: 'contact' },
        { label: t('footer.sections.support.links.faq'), href: `/${locale}/faq` },
        { label: t('footer.sections.support.links.privacy'), href: `/${locale}/politique-de-confidentialite` },
        { label: t('footer.sections.support.links.legal'), href: `/${locale}/mentions-legales` },
      ],
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/magnific-digital/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://facebook.com/magnificdigital', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/magnificdigital', label: 'Instagram' },
    { icon: Mail, href: 'mailto:contact@magnificdigital.net', label: 'Email' },
  ];

  return (
    <footer className="bg-white dark:bg-[#0F172A] relative overflow-hidden">
      <div className="container px-6 mx-auto pt-14 pb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Logo + description */}
          <div className="lg:w-1/3 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-3">
                <Logo />
              </div>
              <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="size-9 border border-border/60 text-muted-foreground rounded-md flex items-center justify-center hover:text-[#F97316] hover:border-[#F97316]/40 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="size-4" />
                  </motion.a>
                ))}
              </div>

              {/* Contact direct */}
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <a href="mailto:contact@magnificdigital.net" className="block hover:text-[#F97316] transition-colors">
                  contact@magnificdigital.net
                </a>
                <a href="tel:+14383502445" className="block hover:text-[#F97316] transition-colors">
                  +1 (438) 350-2445
                </a>
              </div>
            </motion.div>
          </div>

          {/* 3 colonnes de liens */}
          <div className="w-full lg:w-2/3 flex justify-end">
            <div className="w-full lg:w-auto flex justify-between flex-wrap lg:grid lg:grid-cols-3 gap-8 lg:gap-16">
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-foreground/70">
                    {section.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          onClick={(e) => handleClick(e, link.scrollTo)}
                          className="text-muted-foreground hover:text-[#F97316] transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href={`/${locale}/politique-de-confidentialite`} className="hover:text-[#F97316] transition-colors">
              {t('footer.bottomLinks.privacy')}
            </a>
            <a href={`/${locale}/mentions-legales`} className="hover:text-[#F97316] transition-colors">
              {t('footer.bottomLinks.legal')}
            </a>
            <a href="https://magnificdigital.net" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97316] transition-colors">
              magnificdigital.net
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
