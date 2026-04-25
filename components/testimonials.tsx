import { motion } from 'framer-motion';
import Marquee from '@/components/ui/marquee';
import { useT, useI18n } from '@/lib/i18n/context';

const avatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
];

const TestimonialCard = ({ testimonial }: { testimonial: { name: string; role: string; content: string; avatar: string } }) => (
  <div className="flex-shrink-0 w-[350px] bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-900/15 dark:to-orange-900/10 rounded-xl p-6 border border-border/50 shadow-sm mx-1.5">
    <p className="text-muted-foreground mb-4 font-medium leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
    <div className="flex items-center gap-3">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        width={40}
        height={40}
        className="rounded-full object-cover size-10"
        loading="lazy"
      />
      <div>
        <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const t = useT();
  const { dict } = useI18n();
  const testimonialsDict = dict.testimonials as any;

  const testimonials = (testimonialsDict.items as any[]).map((item: any, i: number) => ({
    ...item,
    avatar: avatars[i],
  }));

  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4, 8);

  return (
    <section className="py-24 bg-white dark:bg-[#0F172A] overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-center flex-col text-center gap-5"
        >
          <div className="py-1 text-[#F97316] font-semibold border-b-2 border-[#F97316] mb-1.5">
            {t('testimonials.badge')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E3A8A] dark:text-blue-400">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>
      </div>

      <div className="w-full mx-auto px-6">
        <motion.div
          className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-1.5 mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Marquee pauseOnHover className="[--duration:40s] grow">
            {firstRow.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s] grow">
            {secondRow.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 start-0 w-1/12 bg-gradient-to-r from-white dark:from-[#0F172A]" />
          <div className="pointer-events-none absolute inset-y-0 end-0 w-1/12 bg-gradient-to-l from-white dark:from-[#0F172A]" />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
