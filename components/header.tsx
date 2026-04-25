import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Sun, Moon, Globe } from 'lucide-react';
import { Drawer, DrawerTitle, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useI18n, useT } from '@/lib/i18n/context';

const Header = () => {
  const t = useT();
  const { locale } = useI18n();
  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  const navItems = [
    { label: t('header.nav.home'), id: 'home' },
    { label: t('header.nav.services'), id: 'services' },
    { label: t('header.nav.training'), id: 'formations' },
    { label: t('header.nav.results'), id: 'results' },
    { label: t('header.nav.contact'), id: 'contact' },
  ];

  const { resolvedTheme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY < 50) { setActiveSection('home'); return; }
      const sections = ['services', 'formations', 'results', 'contact'];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) setActiveSection(section);
            return;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const switchLocale = () => {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(fr|en)/, '');
    document.cookie = `NEXT_LOCALE=${otherLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    window.location.href = `/${otherLocale}${pathWithoutLocale || '/'}`;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2.5">
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
                className={cn(
                  'cursor-pointer transition-colors relative group text-sm font-medium',
                  activeSection === item.id
                    ? 'text-[#1E3A8A] dark:text-blue-400'
                    : 'text-foreground/80 hover:text-[#1E3A8A] dark:hover:text-blue-400'
                )}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#F97316] transition-all ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </motion.button>
            ))}
            <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white cursor-pointer" onClick={() => handleNavClick('contact')}>
              {t('header.cta')}
            </Button>
          </nav>

          {/* Language switcher */}
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer text-muted-foreground hover:bg-transparent hover:text-foreground gap-1.5 text-xs font-semibold uppercase"
            onClick={switchLocale}
          >
            <Globe className="size-4" />
            {otherLocale}
          </Button>

          <div className="md:hidden">
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button className="cursor-pointer text-muted-foreground hover:bg-transparent hover:text-foreground" variant="ghost" size="icon">
                  <Menu className="size-5"/>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="px-6 pb-8">
                <DrawerTitle className="sr-only">Navigation</DrawerTitle>
                <nav className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      variant="ghost"
                      className={cn('w-full justify-start', activeSection === item.id && 'text-[#1E3A8A] font-semibold')}
                    >
                      {item.label}
                    </Button>
                  ))}
                  <Button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white" onClick={() => handleNavClick('contact')}>
                    {t('header.cta')}
                  </Button>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>

          {mounted && (
            <Button variant="ghost" size="icon" className="cursor-pointer text-muted-foreground hover:bg-transparent hover:text-foreground" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
              {resolvedTheme === 'dark' ? <Sun className="size-4"/> : <Moon className="size-4"/>}
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
