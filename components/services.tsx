import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Smartphone, MessageSquare, Mic, GraduationCap } from 'lucide-react';
import { useT } from '@/lib/i18n/context';

const Services = () => {
  const t = useT();

  const services = [
    { id: 'web-mobile', icon: Smartphone, title: t('services.items.webApps.title'), description: t('services.items.webApps.description'), gradient: 'from-blue-500 to-blue-700' },
    { id: 'chatbots', icon: MessageSquare, title: t('services.items.chatbots.title'), description: t('services.items.chatbots.description'), gradient: 'from-orange-400 to-orange-600' },
    { id: 'vocal', icon: Mic, title: t('services.items.voiceAgents.title'), description: t('services.items.voiceAgents.description'), gradient: 'from-blue-400 to-blue-600' },
    { id: 'formation', icon: GraduationCap, title: t('services.items.training.title'), description: t('services.items.training.description'), gradient: 'from-orange-500 to-orange-700' },
  ];
  return (
    <section id="services" className="py-24 bg-[#F8FAFC] dark:bg-[#0F172A]/80">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#F97316]/10 text-[#F97316] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            {t('services.badge')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#F97316] mb-6">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div id="formations" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-white dark:bg-[#1E293B] border border-border/50 transition-all duration-500 p-8 relative overflow-hidden hover:shadow-xl hover:border-[#F97316]/30 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn(
                      'size-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-500',
                      service.gradient
                    )}>
                      <service.icon className="size-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>

                <div className={cn(
                  'absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left',
                  service.gradient
                )} />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
