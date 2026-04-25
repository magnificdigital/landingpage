'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import {
  Briefcase,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Code2,
  Brain,
  Headphones,
  Users,
  Heart,
  Zap,
  GraduationCap,
  Coffee,
} from 'lucide-react';
import { useT, useI18n } from '@/lib/i18n/context';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xrgvkbpn';

export default function Carrieres() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const t = useT();
  const { locale } = useI18n();

  const content = locale === 'en' ? {
    heroTitle1: 'Build the future',
    heroTitle2: 'with us',
    heroSubtitle: 'At Magnific Digital, we\'re looking for passionate talent in technology and artificial intelligence to transform businesses.',
    heroBadge: 'Join the adventure',
    offersTitle: 'Open positions',
    offersSubtitle: 'Discover available positions and find your place on our team.',
    spontaneousTitle: 'Spontaneous application',
    spontaneousSubtitle: 'No position matches your profile? Send us your application, we\'re always looking for exceptional talent.',
    formName: 'Full name *',
    formEmail: 'Email *',
    formPhone: 'Phone',
    formPosition: 'Desired position *',
    formLinkedin: 'LinkedIn',
    formPortfolio: 'Portfolio / GitHub',
    formMotivation: 'Motivation & experience *',
    formNamePlaceholder: 'Your name',
    formEmailPlaceholder: 'you@email.com',
    formPhonePlaceholder: '+1 (438) 000-0000',
    formPositionPlaceholder: 'E.g.: Full-Stack Developer',
    formLinkedinPlaceholder: 'linkedin.com/in/your-profile',
    formPortfolioPlaceholder: 'github.com/your-profile',
    formMotivationPlaceholder: 'Tell us about your background, skills, and why you want to join Magnific Digital...',
    formRequired: '* Required fields. You can also send your resume directly to',
    formSubmit: 'Submit my application',
    formSubmitting: 'Sending...',
    successTitle: 'Application sent!',
    successMessage: 'We will review your profile and get back to you shortly.',
    toastSuccess: 'Application sent successfully! We will get back to you shortly.',
    toastError: 'Error sending. Please try again or write to careers@magnificdigital.net.',
    toastNetwork: 'Network error. Check your connection and try again.',
    valName: 'Name must be at least 2 characters',
    valEmail: 'Please enter a valid email',
    valPosition: 'Please specify the desired position',
    valMessage: 'Your message must be at least 20 characters',
    perks: ['Flexible remote work', 'Continuous training', 'Group insurance', 'Innovative AI projects'],
    footerHome: 'Home',
    footerLegal: 'Legal notice',
    footerPrivacy: 'Privacy',
    footerRights: 'All rights reserved.',
    backToSite: 'Back to site',
    profileTitle: 'Required profile:',
    viewDetails: 'View details',
    collapse: 'Collapse',
    apply: 'Apply',
  } : {
    heroTitle1: 'Construisez le futur',
    heroTitle2: 'avec nous',
    heroSubtitle: 'Chez Magnific Digital, nous cherchons des talents passionnés par la technologie et l\'intelligence artificielle pour transformer les entreprises.',
    heroBadge: 'Rejoignez l\'aventure',
    offersTitle: 'Nos offres d\'emploi',
    offersSubtitle: 'Découvrez les postes ouverts et trouvez votre place dans notre équipe.',
    spontaneousTitle: 'Candidature spontanée',
    spontaneousSubtitle: 'Aucune offre ne correspond à votre profil ? Envoyez-nous votre candidature, nous sommes toujours à la recherche de talents exceptionnels.',
    formName: 'Nom complet *',
    formEmail: 'Email *',
    formPhone: 'Téléphone',
    formPosition: 'Poste souhaité *',
    formLinkedin: 'LinkedIn',
    formPortfolio: 'Portfolio / GitHub',
    formMotivation: 'Motivation & expérience *',
    formNamePlaceholder: 'Votre nom',
    formEmailPlaceholder: 'votre@email.com',
    formPhonePlaceholder: '+1 (438) 000-0000',
    formPositionPlaceholder: 'Ex: Développeur Full-Stack',
    formLinkedinPlaceholder: 'linkedin.com/in/votre-profil',
    formPortfolioPlaceholder: 'github.com/votre-profil',
    formMotivationPlaceholder: 'Parlez-nous de votre parcours, vos compétences et pourquoi vous souhaitez rejoindre Magnific Digital...',
    formRequired: '* Champs obligatoires. Vous pouvez aussi nous envoyer votre CV directement à',
    formSubmit: 'Envoyer ma candidature',
    formSubmitting: 'Envoi en cours...',
    successTitle: 'Candidature envoyée !',
    successMessage: 'Nous examinerons votre profil et vous contacterons rapidement.',
    toastSuccess: 'Candidature envoyée avec succès ! Nous vous répondrons rapidement.',
    toastError: 'Erreur lors de l\'envoi. Veuillez réessayer ou nous écrire à careers@magnificdigital.net.',
    toastNetwork: 'Erreur réseau. Vérifiez votre connexion et réessayez.',
    valName: 'Le nom doit contenir au moins 2 caractères',
    valEmail: 'Veuillez entrer un email valide',
    valPosition: 'Veuillez préciser le poste souhaité',
    valMessage: 'Votre message doit contenir au moins 20 caractères',
    perks: ['Télétravail flexible', 'Formation continue', 'Assurance collective', 'Projets innovants IA'],
    footerHome: 'Accueil',
    footerLegal: 'Mentions légales',
    footerPrivacy: 'Confidentialité',
    footerRights: 'Tous droits réservés.',
    backToSite: 'Retour au site',
    profileTitle: 'Profil recherché :',
    viewDetails: 'Voir les détails',
    collapse: 'Réduire',
    apply: 'Postuler',
  };

  const jobOffers = locale === 'en' ? [
    {
      id: 1,
      title: 'Full-Stack Developer Next.js / React',
      type: 'Full-time',
      location: 'Montreal / Remote',
      description: 'Join our team to design and develop modern web applications powered by AI. You will work with Next.js, React, TypeScript and integrate artificial intelligence APIs.',
      requirements: ['3+ years experience in React / Next.js', 'Proficiency in TypeScript and Tailwind CSS', 'Experience with REST and GraphQL APIs', 'Knowledge of PostgreSQL / MongoDB databases', 'Familiarity with AI concepts (a plus)'],
      icon: Code2,
    },
    {
      id: 2,
      title: 'AI / Machine Learning Engineer',
      type: 'Full-time',
      location: 'Montreal / Remote',
      description: 'Design and deploy AI models for our solutions: intelligent chatbots, voice agents, recommendation systems and business process automation.',
      requirements: ['2+ years in ML / Deep Learning', 'Proficiency in Python, TensorFlow or PyTorch', 'Experience with LLMs (OpenAI, Claude, etc.)', 'Knowledge in NLP and voice processing', 'Ability to explain technical concepts simply'],
      icon: Brain,
    },
    {
      id: 3,
      title: 'Digital Project Manager',
      type: 'Full-time',
      location: 'Montreal / Hybrid',
      description: 'Coordinate the delivery of our client projects from A to Z. You will be the link between our clients and our technical team, ensuring quality and meeting deadlines.',
      requirements: ['2+ years in digital project management', 'Agile / Scrum methodology', 'Excellent communication skills', 'Understanding of web and AI technologies', 'Bilingual French / English'],
      icon: Users,
    },
    {
      id: 4,
      title: 'Client Support & AI Training Specialist',
      type: 'Part-time / Contract',
      location: 'Remote',
      description: 'Support our clients in adopting our AI solutions. Lead training sessions, write documentation and provide quality technical support.',
      requirements: ['Experience in technical client support', 'Ability to train and explain clearly', 'Knowledge of AI tools (ChatGPT, etc.)', 'Self-motivated and organized', 'Excellent written communication'],
      icon: Headphones,
    },
  ] : [
    {
      id: 1,
      title: 'Développeur Full-Stack Next.js / React',
      type: 'Temps plein',
      location: 'Montréal / Télétravail',
      description:
        'Rejoignez notre équipe pour concevoir et développer des applications web modernes propulsées par l\'IA. Vous travaillerez avec Next.js, React, TypeScript et intégrerez des APIs d\'intelligence artificielle.',
      requirements: [
        '3+ ans d\'expérience en React / Next.js',
        'Maîtrise de TypeScript et Tailwind CSS',
        'Expérience avec les APIs REST et GraphQL',
        'Connaissance des bases de données PostgreSQL / MongoDB',
        'Familiarité avec les concepts d\'IA (un atout)',
      ],
      icon: Code2,
    },
    {
      id: 2,
      title: 'Ingénieur IA / Machine Learning',
      type: 'Temps plein',
      location: 'Montréal / Télétravail',
      description:
        'Concevez et déployez des modèles d\'IA pour nos solutions : chatbots intelligents, agents vocaux, systèmes de recommandation et automatisation des processus métiers.',
      requirements: [
        '2+ ans en ML / Deep Learning',
        'Maîtrise de Python, TensorFlow ou PyTorch',
        'Expérience avec les LLMs (OpenAI, Claude, etc.)',
        'Connaissance en NLP et traitement vocal',
        'Capacité à vulgariser des concepts techniques',
      ],
      icon: Brain,
    },
    {
      id: 3,
      title: 'Chargé(e) de projet numérique',
      type: 'Temps plein',
      location: 'Montréal / Hybride',
      description:
        'Coordonnez la livraison de nos projets clients de A à Z. Vous serez le lien entre nos clients et notre équipe technique, assurant la qualité et le respect des délais.',
      requirements: [
        '2+ ans en gestion de projets numériques',
        'Méthodologie Agile / Scrum',
        'Excellentes compétences en communication',
        'Compréhension des technologies web et IA',
        'Bilinguisme français / anglais',
      ],
      icon: Users,
    },
    {
      id: 4,
      title: 'Spécialiste support client & formation IA',
      type: 'Temps partiel / Contractuel',
      location: 'Télétravail',
      description:
        'Accompagnez nos clients dans l\'adoption de nos solutions IA. Animez des formations, rédigez de la documentation et assurez un support technique de qualité.',
      requirements: [
        'Expérience en support client technique',
        'Capacité à former et vulgariser',
        'Connaissance des outils IA (ChatGPT, etc.)',
        'Autonomie et sens de l\'organisation',
        'Excellente communication écrite',
      ],
      icon: Headphones,
    },
  ];

  const perks = [
    { icon: Coffee, label: content.perks[0] },
    { icon: GraduationCap, label: content.perks[1] },
    { icon: Heart, label: content.perks[2] },
    { icon: Zap, label: content.perks[3] },
  ];

  const formSchema = z.object({
    name: z.string().min(2, content.valName),
    email: z.string().email(content.valEmail),
    phone: z.string().optional(),
    linkedin: z.string().optional(),
    portfolio: z.string().optional(),
    position: z.string().min(2, content.valPosition),
    message: z.string().min(20, content.valMessage),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      portfolio: '',
      position: '',
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: `[Carrières] Candidature de ${data.name} — ${data.position}`,
          type: 'candidature',
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success(content.toastSuccess);
        form.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast.error(content.toastError);
      }
    } catch {
      toast.error(content.toastNetwork);
    }

    setIsSubmitting(false);
  };

  const applyToJob = (jobTitle: string) => {
    form.setValue('position', jobTitle);
    document.getElementById('candidature')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-white dark:bg-[#0F172A]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" className="fill-[#1E3A8A] dark:fill-blue-600" />
              <path d="M8 24V12L13 20L18 12L23 20L28 12V24" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="28" cy="12" r="2" fill="#F97316"/>
            </svg>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#1E3A8A] dark:text-blue-400">MAGNIFIC</span>
              <span className="text-[#F97316]"> DIGITAL</span>
            </span>
          </Link>
          <Link href={`/${locale}`} className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">
            &larr; {content.backToSite}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F97316]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Briefcase className="size-4 text-[#F97316]" />
              <span className="text-white/90 text-sm font-medium">{content.heroBadge}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {content.heroTitle1}<br />
              <span className="text-[#F97316]">{content.heroTitle2}</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-8">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {perks.map((perk) => (
                <div key={perk.label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <perk.icon className="size-4 text-[#F97316]" />
                  <span className="text-white/90 text-sm">{perk.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16">
        {/* Offres d'emploi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] dark:text-blue-400 mb-3 text-center">
            {content.offersTitle}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            {content.offersSubtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {jobOffers.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="h-full border-border/50 hover:border-[#F97316]/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="size-12 rounded-xl bg-[#1E3A8A]/10 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <job.icon className="size-6 text-[#1E3A8A] dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground mb-1">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3.5" /> {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3.5" /> {job.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    {expandedJob === job.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4"
                      >
                        <h4 className="font-semibold text-sm text-foreground mb-2">{content.profileTitle}</h4>
                        <ul className="space-y-1.5">
                          {job.requirements.map((req) => (
                            <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <div className="size-1.5 rounded-full bg-[#F97316] mt-1.5 shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <button
                        className="text-sm text-[#1E3A8A] dark:text-blue-400 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedJob(expandedJob === job.id ? null : job.id);
                        }}
                      >
                        {expandedJob === job.id ? content.collapse : content.viewDetails}
                      </button>
                      <Button
                        size="sm"
                        className="bg-[#F97316] hover:bg-[#EA580C] text-white cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          applyToJob(job.title);
                        }}
                      >
                        {content.apply}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Candidature spontanée */}
        <motion.div
          id="candidature"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto scroll-mt-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] dark:text-blue-400 mb-3 text-center">
            {content.spontaneousTitle}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            {content.spontaneousSubtitle}
          </p>

          <Card className="border-border/50">
            <CardContent className="p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="size-16 text-emerald-500 mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">{content.successTitle}</h3>
                  <p className="text-muted-foreground">{content.successMessage}</p>
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
                            <FormLabel>{content.formName}</FormLabel>
                            <FormControl>
                              <Input placeholder={content.formNamePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.formEmail}</FormLabel>
                            <FormControl>
                              <Input placeholder={content.formEmailPlaceholder} type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.formPhone}</FormLabel>
                            <FormControl>
                              <Input placeholder={content.formPhonePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.formPosition}</FormLabel>
                            <FormControl>
                              <Input placeholder={content.formPositionPlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.formLinkedin}</FormLabel>
                            <FormControl>
                              <Input placeholder={content.formLinkedinPlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="portfolio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.formPortfolio}</FormLabel>
                            <FormControl>
                              <Input placeholder={content.formPortfolioPlaceholder} {...field} />
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
                          <FormLabel>{content.formMotivation}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={content.formMotivationPlaceholder}
                              className="min-h-[140px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <p className="text-xs text-muted-foreground">
                      {content.formRequired}{' '}
                      <a href="mailto:careers@magnificdigital.net" className="text-[#F97316] hover:underline">
                        careers@magnificdigital.net
                      </a>
                    </p>

                    <Button
                      size="lg"
                      type="submit"
                      className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-6 text-base cursor-pointer transition-all hover:shadow-lg hover:shadow-orange-500/25"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? content.formSubmitting : content.formSubmit}
                      {!isSubmitting && <Send className="ml-2 size-5" />}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer simple */}
      <footer className="border-t border-border/50 bg-white dark:bg-[#0F172A] py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Magnific Digital. {content.footerRights}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href={`/${locale}`} className="hover:text-[#F97316] transition-colors">{content.footerHome}</Link>
            <Link href={`/${locale}/mentions-legales`} className="hover:text-[#F97316] transition-colors">{content.footerLegal}</Link>
            <Link href={`/${locale}/politique-de-confidentialite`} className="hover:text-[#F97316] transition-colors">{content.footerPrivacy}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
