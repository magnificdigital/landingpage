import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, Globe, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useT } from '@/lib/i18n/context';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xrgvkbpn';

const Contact = () => {
  const t = useT();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = useMemo(() => z.object({
    name: z.string().min(2, t('contact.validation.nameMin')),
    company: z.string().min(2, t('contact.validation.companyRequired')),
    email: z.string().email(t('contact.validation.emailInvalid')),
    phone: z.string().optional(),
    message: z.string().min(10, t('contact.validation.messageMin')),
  }), [t]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', company: '', email: '', phone: '', message: '' },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone || 'Non renseigné',
          message: data.message,
          _subject: `[Magnific Digital] Nouvelle demande de ${data.name} - ${data.company}`,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success(t('contact.toast.success'));
        form.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast.error(t('contact.toast.error'));
      }
    } catch {
      toast.error(t('contact.toast.networkError'));
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, label: t('contact.info.email'), value: 'contact@magnificdigital.net', href: 'mailto:contact@magnificdigital.net' },
    { icon: Phone, label: t('contact.info.phone'), value: '+1 (438) 350-2445', href: 'tel:+14383502445' },
    { icon: Globe, label: t('contact.info.website'), value: 'magnificdigital.net', href: 'https://magnificdigital.net' },
  ];

  return (
    <section id="contact" className="py-24 bg-[#1E3A8A] dark:bg-[#0F172A] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F97316]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F97316]/5 rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur-md">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle className="size-16 text-emerald-400 mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">{t('contact.success.title')}</h3>
                    <p className="text-white/70">{t('contact.success.message')}</p>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80">{t('contact.form.name')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('contact.form.namePlaceholder')} className="bg-white/10 border-white/20 text-white placeholder:text-white/40" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80">{t('contact.form.company')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('contact.form.companyPlaceholder')} className="bg-white/10 border-white/20 text-white placeholder:text-white/40" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80">{t('contact.form.email')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('contact.form.emailPlaceholder')} type="email" className="bg-white/10 border-white/20 text-white placeholder:text-white/40" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80">{t('contact.form.phone')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('contact.form.phonePlaceholder')} className="bg-white/10 border-white/20 text-white placeholder:text-white/40" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">{t('contact.form.message')}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t('contact.form.messagePlaceholder')}
                                className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/40"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        size="lg"
                        type="submit"
                        className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-6 text-base cursor-pointer transition-all hover:shadow-lg hover:shadow-orange-500/25"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                        {!isSubmitting && <Send className="ml-2 size-5" />}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col justify-center space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 group"
              >
                <div className="size-12 rounded-xl bg-[#F97316]/20 flex items-center justify-center group-hover:bg-[#F97316]/30 transition-colors">
                  <info.icon className="size-5 text-[#F97316]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">{info.label}</p>
                  <p className="text-white font-medium group-hover:text-[#F97316] transition-colors">{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Horaires */}
            <div className="mt-4 pt-6 border-t border-white/10">
              <p className="text-white/60 text-sm mb-2">{t('contact.hours.title')}</p>
              <p className="text-white/90 text-sm">{t('contact.hours.weekdays')}</p>
              <p className="text-white/90 text-sm">{t('contact.hours.consultation')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
