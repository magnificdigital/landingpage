import { motion } from 'framer-motion';
import { Brain, Users, Handshake } from 'lucide-react';
import { useT } from '@/lib/i18n/context';

const WhyUs = () => {
  const t = useT();

  const reasons = [
    { icon: Brain, title: t('whyUs.reasons.expertise.title'), description: t('whyUs.reasons.expertise.description') },
    { icon: Users, title: t('whyUs.reasons.team.title'), description: t('whyUs.reasons.team.description') },
    { icon: Handshake, title: t('whyUs.reasons.support.title'), description: t('whyUs.reasons.support.description') },
  ];
  return (
    <section className="py-24 bg-white dark:bg-[#0F172A]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E3A8A] dark:text-blue-400 mb-6">
            {t('whyUs.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('whyUs.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="size-16 rounded-2xl bg-[#F97316]/10 dark:bg-orange-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <reason.icon className="size-8 text-[#F97316]" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] dark:text-blue-400 mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
