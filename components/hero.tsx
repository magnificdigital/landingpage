import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useT } from '@/lib/i18n/context';

const Hero = () => {
  const t = useT();

  return (
    <section
      className="relative min-h-screen bg-white dark:bg-[#0F172A] pt-28 pb-20 lg:pt-40 lg:pb-24 overflow-hidden"
    >
      {/* Static background orbs with CSS animation only */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{ willChange: 'auto' }}>
        <div className="absolute left-[5%] top-[10%] w-[400px] h-[400px] rounded-full bg-[#1E3A8A]/10 dark:bg-blue-600/10 blur-[80px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute right-[10%] top-[20%] w-[300px] h-[300px] rounded-full bg-[#F97316]/15 dark:bg-orange-500/10 blur-[60px] animate-[float_10s_ease-in-out_infinite_1s]" />
        <div className="absolute left-[30%] bottom-[15%] w-[250px] h-[250px] rounded-full bg-[#F97316]/10 dark:bg-orange-500/8 blur-[50px] animate-[float_12s_ease-in-out_infinite_2s]" />
        <div className="absolute right-[20%] bottom-[10%] w-[200px] h-[200px] rounded-full bg-[#1E3A8A]/8 dark:bg-blue-500/8 blur-[40px] animate-[float_14s_ease-in-out_infinite_3s]" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#F97316]/10 dark:bg-orange-500/20 text-[#F97316] px-4 py-2 rounded-full text-sm font-semibold mb-8"
          >
            <Sparkles className="size-4" />
            {t('hero.badge')}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1]"
          >
            <span className="text-[#1E3A8A] dark:text-blue-400">MAGNIFIC</span>{' '}
            <span className="text-[#F97316]">DIGITAL</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#1F2937] dark:text-gray-300 mb-4 max-w-3xl mx-auto font-medium"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Service lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-2 mb-10"
          >
            <p className="text-base md:text-lg text-muted-foreground">
              {t('hero.serviceLine1')}
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              {t('hero.serviceLine2')}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              className="bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-6 text-base font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all hover:[&_svg]:translate-x-1"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta1')}
              <ArrowRight className="ml-2 size-5 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#1E3A8A] text-[#1E3A8A] dark:border-blue-400 dark:text-blue-400 hover:bg-[#1E3A8A] hover:text-white dark:hover:bg-blue-600 px-8 py-6 text-base font-semibold cursor-pointer transition-all"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta2')}
            </Button>
          </motion.div>

          {/* Floating dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              {/* Dashboard simulation */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: t('hero.dashboard.productivity'), value: t('hero.dashboard.productivityValue'), color: 'bg-[#F97316]' },
                  { label: t('hero.dashboard.engagement'), value: t('hero.dashboard.engagementValue'), color: 'bg-emerald-500' },
                  { label: t('hero.dashboard.responseTime'), value: t('hero.dashboard.responseTimeValue'), color: 'bg-blue-400' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white"
                  >
                    <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                    <div className={`h-1 ${stat.color} rounded-full mt-2 w-3/4`} />
                  </motion.div>
                ))}
              </div>

              {/* Chat simulation */}
              <div className="flex gap-4">
                <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/80 text-sm">{t('hero.chat.label')}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white/10 rounded-lg p-2 text-sm text-white/70 max-w-[70%]">
                      {t('hero.chat.greeting')}
                    </div>
                    <div className="bg-[#F97316]/30 rounded-lg p-2 text-sm text-white/90 max-w-[70%] ml-auto">
                      {t('hero.chat.placeholder')}
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                    <span className="text-white/80 text-sm">{t('hero.vocal.label')}</span>
                  </div>
                  <div className="flex items-center justify-center h-16">
                    <div className="flex items-end gap-1">
                      {[20, 32, 26, 38, 22, 34, 28].map((h, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-[#F97316] rounded-full"
                          animate={{ height: [8, h, 8] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#F97316]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
