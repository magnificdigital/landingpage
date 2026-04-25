import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useT } from '@/lib/i18n/context';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

const Results = () => {
  const t = useT();

  const stats = [
    { value: 40, suffix: '%', prefix: '+', label: t('results.stats.productivity'), color: 'text-[#F97316]', barColor: 'bg-[#F97316]' },
    { value: 25, suffix: '%', prefix: '+', label: t('results.stats.engagement'), color: 'text-[#1E3A8A] dark:text-blue-400', barColor: 'bg-[#1E3A8A] dark:bg-blue-500' },
    { value: 3, suffix: 'x', prefix: '÷', label: t('results.stats.responseTime'), color: 'text-[#F97316]', barColor: 'bg-[#F97316]' },
  ];

  return (
    <section id="results" className="py-24 bg-[#F8FAFC] dark:bg-[#0F172A]/80">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#F97316] mb-6">
            {t('results.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`text-5xl md:text-6xl font-black mb-3 ${stat.color}`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="text-muted-foreground font-medium text-lg uppercase tracking-wide">
                {stat.label}
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
                viewport={{ once: true }}
                className={`h-1.5 ${stat.barColor} rounded-full mt-4 mx-auto max-w-[120px] origin-left`}
              />
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-white dark:bg-[#1E293B] rounded-2xl p-10 shadow-sm border border-border/50"
        >
          <p className="text-xl italic text-foreground mb-6 leading-relaxed">
            &ldquo;{t('results.quote')}&rdquo;
          </p>
          <p className="text-[#1E3A8A] dark:text-blue-400 font-semibold">
            {t('results.attribution')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
