import { motion } from 'framer-motion';
import { useT } from '@/lib/i18n/context';

const Mission = () => {
  const t = useT();

  return (
    <section id="mission" className="py-24 bg-white dark:bg-[#0F172A]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E3A8A] dark:text-blue-400 mb-8 leading-tight">
            {t('mission.title')}
          </h2>

          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              {t('mission.paragraph1')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              {t('mission.paragraph2')}
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 mx-auto w-24 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#F97316] rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
