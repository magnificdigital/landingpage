'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageSquare, Code2, Brain, CreditCard, Shield, Headphones } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/context';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  items: FaqItem[];
}

const faqCategoriesFr: FaqCategory[] = [
  {
    id: 'general',
    title: 'Général',
    icon: MessageSquare,
    items: [
      {
        question: 'Qu\'est-ce que Magnific Digital ?',
        answer:
          'Magnific Digital est une entreprise basée à Montréal spécialisée dans le développement d\'applications web et mobiles propulsées par l\'intelligence artificielle. Nous concevons des chatbots intelligents, des agents vocaux, des plateformes sur mesure et offrons des formations IA pour les entreprises de toutes tailles.',
      },
      {
        question: 'À qui s\'adressent vos services ?',
        answer:
          'Nos services s\'adressent aux PME, startups et grandes entreprises qui souhaitent intégrer l\'intelligence artificielle dans leurs processus. Que vous ayez besoin d\'automatiser votre service client, de développer une application métier ou de former vos équipes à l\'IA, nous avons une solution adaptée.',
      },
      {
        question: 'Dans quelles régions opérez-vous ?',
        answer:
          'Nous sommes basés à Montréal, mais nous travaillons avec des clients partout au Québec, au Canada et à l\'international. Grâce au télétravail et aux outils collaboratifs, la distance n\'est pas un obstacle.',
      },
      {
        question: 'Comment se déroule une première consultation ?',
        answer:
          'La première consultation est gratuite et dure environ 30 minutes. Nous analysons ensemble vos besoins, identifions les opportunités d\'intégration de l\'IA dans vos processus et vous proposons une feuille de route personnalisée avec un estimé de ROI.',
      },
    ],
  },
  {
    id: 'services',
    title: 'Services & Solutions',
    icon: Code2,
    items: [
      {
        question: 'Quels types d\'applications développez-vous ?',
        answer:
          'Nous développons des applications web (Next.js, React), des applications mobiles (React Native), des chatbots IA conversationnels, des agents vocaux intelligents et des plateformes SaaS sur mesure. Toutes nos solutions intègrent des capacités d\'intelligence artificielle pour maximiser leur valeur.',
      },
      {
        question: 'Pouvez-vous intégrer l\'IA dans une application existante ?',
        answer:
          'Absolument. Nous pouvons enrichir vos applications existantes avec des fonctionnalités IA : chatbot de support, analyse prédictive, automatisation de tâches, recommandations personnalisées, traitement du langage naturel, etc. Nous réalisons un audit technique pour identifier les meilleures opportunités d\'intégration.',
      },
      {
        question: 'Qu\'est-ce qu\'un agent vocal IA ?',
        answer:
          'Un agent vocal IA est un système capable de mener des conversations téléphoniques de manière autonome. Il peut répondre aux appels, qualifier des leads, prendre des rendez-vous, gérer le support de premier niveau et transférer vers un humain si nécessaire. Il fonctionne 24/7 et s\'améliore au fil du temps.',
      },
      {
        question: 'Vos chatbots sont-ils personnalisables ?',
        answer:
          'Oui, nos chatbots sont entièrement personnalisés pour votre entreprise. Ils sont entraînés sur vos données, adoptent votre ton de communication, connaissent vos produits/services et s\'intègrent à vos outils existants (CRM, ERP, calendrier, etc.).',
      },
    ],
  },
  {
    id: 'ia',
    title: 'Intelligence Artificielle',
    icon: Brain,
    items: [
      {
        question: 'Quelles technologies d\'IA utilisez-vous ?',
        answer:
          'Nous utilisons les dernières technologies IA : OpenAI (GPT-4), Anthropic (Claude), modèles open source (Llama, Mistral), ainsi que des frameworks comme LangChain, TensorFlow et PyTorch. Le choix technologique dépend de votre cas d\'usage, vos contraintes de confidentialité et votre budget.',
      },
      {
        question: 'Mes données sont-elles en sécurité avec vos solutions IA ?',
        answer:
          'La sécurité des données est notre priorité. Nous offrons des options de déploiement sur vos propres serveurs (on-premise), utilisons le chiffrement bout en bout et respectons les réglementations en vigueur (Loi 25, RGPD). Vos données ne sont jamais partagées avec des tiers sans votre consentement explicite.',
      },
      {
        question: 'L\'IA va-t-elle remplacer mes employés ?',
        answer:
          'Non. Notre approche vise à augmenter les capacités de vos équipes, pas à les remplacer. L\'IA prend en charge les tâches répétitives et à faible valeur ajoutée, permettant à vos collaborateurs de se concentrer sur des activités stratégiques, créatives et relationnelles.',
      },
      {
        question: 'Proposez-vous des formations sur l\'IA ?',
        answer:
          'Oui, nous offrons des formations IA pratiques et sur mesure pour les entreprises. Nos programmes couvrent l\'utilisation efficace des outils IA (ChatGPT, Claude, Midjourney, etc.), l\'automatisation des processus, le prompt engineering et l\'intégration de l\'IA dans votre métier. Les formations sont dispensées en présentiel ou à distance.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Tarifs & Projets',
    icon: CreditCard,
    items: [
      {
        question: 'Combien coûte un projet type ?',
        answer:
          'Chaque projet est unique. Un chatbot simple peut démarrer autour de 5 000 $, tandis qu\'une application web complète avec IA intégrée se situe généralement entre 15 000 $ et 60 000 $+. Nous établissons un devis détaillé et transparent après la consultation initiale gratuite.',
      },
      {
        question: 'Proposez-vous des forfaits mensuels ?',
        answer:
          'Oui, nous proposons des forfaits de maintenance et d\'évolution mensuels pour accompagner votre croissance. Ces forfaits incluent le support technique, les mises à jour, l\'optimisation des performances IA et l\'ajout de nouvelles fonctionnalités selon vos besoins.',
      },
      {
        question: 'Quelle est la durée moyenne d\'un projet ?',
        answer:
          'Un chatbot peut être livré en 2 à 4 semaines. Une application web sur mesure prend généralement 2 à 4 mois. Nous travaillons en méthodologie agile avec des livrables réguliers, vous permettant de voir l\'avancement et de donner du feedback à chaque étape.',
      },
      {
        question: 'Quelles sont les modalités de paiement ?',
        answer:
          'Nous fonctionnons avec un acompte de 30 % au démarrage, des paiements intermédiaires liés aux jalons du projet, et le solde à la livraison finale. Pour les forfaits mensuels, la facturation est mensuelle. Nous acceptons les virements bancaires et les paiements par carte.',
      },
    ],
  },
  {
    id: 'security',
    title: 'Confidentialité & Sécurité',
    icon: Shield,
    items: [
      {
        question: 'Signez-vous des accords de confidentialité (NDA) ?',
        answer:
          'Oui, nous signons systématiquement un accord de confidentialité avant toute discussion détaillée sur votre projet. La protection de vos idées et de vos données est fondamentale pour nous.',
      },
      {
        question: 'Êtes-vous conformes à la Loi 25 du Québec ?',
        answer:
          'Oui, toutes nos solutions sont conçues en conformité avec la Loi 25 sur la protection des renseignements personnels au Québec. Nous intégrons les principes de « privacy by design » dès la conception et pouvons vous accompagner dans votre propre mise en conformité.',
      },
      {
        question: 'Où sont hébergées les données ?',
        answer:
          'Par défaut, nous hébergeons les données au Canada (AWS Montréal ou Google Cloud Montréal). Selon vos exigences, nous pouvons aussi déployer sur vos propres serveurs ou dans la région de votre choix.',
      },
    ],
  },
  {
    id: 'support',
    title: 'Support & Accompagnement',
    icon: Headphones,
    items: [
      {
        question: 'Quel support offrez-vous après la livraison ?',
        answer:
          'Chaque projet inclut une période de garantie de 30 jours après livraison pour corriger tout bug. Au-delà, nous proposons des forfaits de maintenance incluant le support technique, les mises à jour de sécurité, le monitoring des performances et l\'optimisation continue de vos solutions IA.',
      },
      {
        question: 'Comment puis-je vous contacter en cas d\'urgence ?',
        answer:
          'Les clients avec un forfait de maintenance bénéficient d\'un support prioritaire par email et téléphone du lundi au vendredi, 9h-18h. Pour les urgences critiques (site hors service), nous offrons un temps de réponse garanti sous 2 heures pendant les heures ouvrables.',
      },
      {
        question: 'Formez-vous nos équipes à utiliser les solutions livrées ?',
        answer:
          'Oui, chaque livraison inclut une formation complète de vos équipes : utilisation de la solution, gestion du contenu, interprétation des données IA et bonnes pratiques. Nous fournissons aussi une documentation détaillée et des vidéos tutorielles.',
      },
    ],
  },
];

const faqCategoriesEn: FaqCategory[] = [
  {
    id: 'general',
    title: 'General',
    icon: MessageSquare,
    items: [
      { question: 'What is Magnific Digital?', answer: 'Magnific Digital is a Montreal-based company specializing in the development of AI-powered web and mobile applications. We design intelligent chatbots, voice agents, custom platforms, and offer AI training for businesses of all sizes.' },
      { question: 'Who are your services for?', answer: 'Our services are designed for SMBs, startups, and large enterprises looking to integrate artificial intelligence into their processes. Whether you need to automate customer service, develop a business application, or train your teams on AI, we have a tailored solution.' },
      { question: 'What regions do you operate in?', answer: 'We are based in Montreal, but we work with clients across Quebec, Canada, and internationally. Thanks to remote work and collaborative tools, distance is not an obstacle.' },
      { question: 'How does a first consultation work?', answer: 'The first consultation is free and lasts about 30 minutes. Together, we analyze your needs, identify opportunities for AI integration in your processes, and propose a personalized roadmap with an estimated ROI.' },
    ],
  },
  {
    id: 'services',
    title: 'Services & Solutions',
    icon: Code2,
    items: [
      { question: 'What types of applications do you develop?', answer: 'We develop web applications (Next.js, React), mobile applications (React Native), AI conversational chatbots, intelligent voice agents, and custom SaaS platforms. All our solutions integrate artificial intelligence capabilities to maximize their value.' },
      { question: 'Can you integrate AI into an existing application?', answer: 'Absolutely. We can enhance your existing applications with AI features: support chatbot, predictive analytics, task automation, personalized recommendations, natural language processing, etc. We conduct a technical audit to identify the best integration opportunities.' },
      { question: 'What is an AI voice agent?', answer: 'An AI voice agent is a system capable of conducting phone conversations autonomously. It can answer calls, qualify leads, schedule appointments, handle first-level support, and transfer to a human when necessary. It works 24/7 and improves over time.' },
      { question: 'Are your chatbots customizable?', answer: 'Yes, our chatbots are fully customized for your business. They are trained on your data, adopt your communication tone, know your products/services, and integrate with your existing tools (CRM, ERP, calendar, etc.).' },
    ],
  },
  {
    id: 'ia',
    title: 'Artificial Intelligence',
    icon: Brain,
    items: [
      { question: 'What AI technologies do you use?', answer: 'We use the latest AI technologies: OpenAI (GPT-4), Anthropic (Claude), open source models (Llama, Mistral), as well as frameworks like LangChain, TensorFlow, and PyTorch. Technology choice depends on your use case, privacy constraints, and budget.' },
      { question: 'Is my data secure with your AI solutions?', answer: 'Data security is our priority. We offer on-premise deployment options, use end-to-end encryption, and comply with applicable regulations (Law 25, GDPR). Your data is never shared with third parties without your explicit consent.' },
      { question: 'Will AI replace my employees?', answer: 'No. Our approach aims to augment your teams\' capabilities, not replace them. AI handles repetitive, low-value tasks, allowing your employees to focus on strategic, creative, and interpersonal activities.' },
      { question: 'Do you offer AI training?', answer: 'Yes, we offer practical, customized AI training for businesses. Our programs cover effective use of AI tools (ChatGPT, Claude, Midjourney, etc.), process automation, prompt engineering, and AI integration in your profession. Training is delivered in-person or remotely.' },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Projects',
    icon: CreditCard,
    items: [
      { question: 'How much does a typical project cost?', answer: 'Every project is unique. A simple chatbot can start around $5,000, while a complete web application with integrated AI typically ranges from $15,000 to $60,000+. We provide a detailed, transparent quote after the free initial consultation.' },
      { question: 'Do you offer monthly packages?', answer: 'Yes, we offer monthly maintenance and evolution packages to support your growth. These packages include technical support, updates, AI performance optimization, and new feature additions based on your needs.' },
      { question: 'What is the average project duration?', answer: 'A chatbot can be delivered in 2 to 4 weeks. A custom web application typically takes 2 to 4 months. We work in agile methodology with regular deliverables, allowing you to see progress and provide feedback at each stage.' },
      { question: 'What are the payment terms?', answer: 'We work with a 30% deposit at the start, intermediate payments tied to project milestones, and the balance at final delivery. For monthly packages, billing is monthly. We accept bank transfers and card payments.' },
    ],
  },
  {
    id: 'security',
    title: 'Privacy & Security',
    icon: Shield,
    items: [
      { question: 'Do you sign NDAs?', answer: 'Yes, we systematically sign a confidentiality agreement before any detailed discussion about your project. Protecting your ideas and data is fundamental to us.' },
      { question: 'Are you compliant with Quebec\'s Law 25?', answer: 'Yes, all our solutions are designed in compliance with Quebec\'s Law 25 on the protection of personal information. We integrate "privacy by design" principles from the design phase and can assist you with your own compliance.' },
      { question: 'Where is the data hosted?', answer: 'By default, we host data in Canada (AWS Montreal or Google Cloud Montreal). Based on your requirements, we can also deploy on your own servers or in your preferred region.' },
    ],
  },
  {
    id: 'support',
    title: 'Support & Guidance',
    icon: Headphones,
    items: [
      { question: 'What support do you offer after delivery?', answer: 'Each project includes a 30-day warranty period after delivery to fix any bugs. Beyond that, we offer maintenance packages including technical support, security updates, performance monitoring, and continuous optimization of your AI solutions.' },
      { question: 'How can I reach you in case of emergency?', answer: 'Clients with a maintenance package benefit from priority support via email and phone, Monday to Friday, 9am-6pm. For critical emergencies (site down), we offer a guaranteed response time of under 2 hours during business hours.' },
      { question: 'Do you train our teams to use the delivered solutions?', answer: 'Yes, each delivery includes comprehensive training for your teams: solution usage, content management, AI data interpretation, and best practices. We also provide detailed documentation and tutorial videos.' },
    ],
  },
];

const FaqAccordionItem = ({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) => (
  <div className="border-b border-border/50 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 px-1 text-left group cursor-pointer"
    >
      <span className={cn('font-medium text-[15px] pr-4 transition-colors', isOpen ? 'text-[#1E3A8A] dark:text-blue-400' : 'text-foreground group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400')}>
        {item.question}
      </span>
      <ChevronDown
        className={cn(
          'size-5 shrink-0 text-muted-foreground transition-transform duration-300',
          isOpen && 'rotate-180 text-[#F97316]'
        )}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="pb-5 px-1 text-muted-foreground text-sm leading-relaxed">
            {item.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FaqPage() {
  const { locale } = useI18n();
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const categories = locale === 'en' ? faqCategoriesEn : faqCategoriesFr;

  const ui = locale === 'en' ? {
    title: 'Frequently Asked Questions',
    subtitle: 'Quickly find answers to your questions about our services, technologies, and approach.',
    searchPlaceholder: 'Search a question...',
    clear: 'Clear',
    resultsFor: 'results for',
    resultFor: 'result for',
    noResultsTitle: 'No results found',
    noResultsSubtitle: 'Try different terms or contact us directly.',
    contactUs: 'Contact us',
    ctaTitle: 'Didn\'t find your answer?',
    ctaSubtitle: 'Our team is available to answer all your questions. Contact us for a free consultation.',
    ctaButton: 'Contact us',
    backToSite: '\u2190 Back to site',
    home: 'Home',
    legal: 'Legal notice',
    privacy: 'Privacy',
  } : {
    title: 'Foire aux questions',
    subtitle: 'Trouvez rapidement les r\u00e9ponses \u00e0 vos questions sur nos services, nos technologies et notre approche.',
    searchPlaceholder: 'Rechercher une question...',
    clear: 'Effacer',
    resultsFor: 'r\u00e9sultats pour',
    resultFor: 'r\u00e9sultat pour',
    noResultsTitle: 'Aucun r\u00e9sultat trouv\u00e9',
    noResultsSubtitle: 'Essayez avec d\'autres termes ou contactez-nous directement.',
    contactUs: 'Nous contacter',
    ctaTitle: 'Vous n\'avez pas trouv\u00e9 votre r\u00e9ponse ?',
    ctaSubtitle: 'Notre \u00e9quipe est disponible pour r\u00e9pondre \u00e0 toutes vos questions. Contactez-nous pour une consultation gratuite.',
    ctaButton: 'Nous contacter',
    backToSite: '\u2190 Retour au site',
    home: 'Accueil',
    legal: 'Mentions l\u00e9gales',
    privacy: 'Confidentialit\u00e9',
  };

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const filteredCategories = searchQuery.trim()
    ? categories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : categories.filter((cat) => cat.id === activeCategory);

  const totalResults = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);

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
            {ui.backToSite}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 bg-[#F8FAFC] dark:bg-[#0F172A]/80 border-b border-border/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] dark:text-blue-400 mb-4">
              {ui.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {ui.subtitle}
            </p>

            {/* Search bar */}
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                placeholder={ui.searchPlaceholder}
                className="pl-12 py-6 text-base bg-white dark:bg-[#1E293B] border-border/60 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {ui.clear}
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-3">
                {totalResults} {totalResults !== 1 ? ui.resultsFor : ui.resultFor} &laquo; {searchQuery} &raquo;
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Sidebar categories */}
          {!searchQuery && (
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-64 shrink-0"
            >
              <div className="lg:sticky lg:top-8 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer',
                      activeCategory === cat.id
                        ? 'bg-[#1E3A8A] text-white shadow-md'
                        : 'bg-white dark:bg-[#1E293B] text-muted-foreground hover:bg-[#1E3A8A]/10 hover:text-[#1E3A8A] dark:hover:text-blue-400 border border-border/50'
                    )}
                  >
                    <cat.icon className="size-4 shrink-0" />
                    <span>{cat.title}</span>
                    <span className={cn(
                      'ml-auto text-xs px-2 py-0.5 rounded-full',
                      activeCategory === cat.id
                        ? 'bg-white/20 text-white'
                        : 'bg-border/50 text-muted-foreground'
                    )}>
                      {cat.items.length}
                    </span>
                  </button>
                ))}
              </div>
            </motion.nav>
          )}

          {/* FAQ content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {filteredCategories.map((cat) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 last:mb-0"
                >
                  {searchQuery && (
                    <div className="flex items-center gap-2 mb-4">
                      <cat.icon className="size-5 text-[#1E3A8A] dark:text-blue-400" />
                      <h2 className="font-semibold text-lg text-foreground">{cat.title}</h2>
                    </div>
                  )}
                  <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-border/50 shadow-sm px-6">
                    {cat.items.map((item, i) => {
                      const key = `${cat.id}-${i}`;
                      return (
                        <FaqAccordionItem
                          key={key}
                          item={item}
                          isOpen={openItems.has(key)}
                          onToggle={() => toggleItem(key)}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {searchQuery && totalResults === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Search className="size-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-foreground mb-2">{ui.noResultsTitle}</h3>
                <p className="text-muted-foreground mb-4">
                  {ui.noResultsSubtitle}
                </p>
                <Link
                  href={`/${locale}/#contact`}
                  className="inline-flex items-center gap-2 text-[#F97316] hover:underline font-medium"
                >
                  <MessageSquare className="size-4" />
                  {ui.contactUs}
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-16 text-center bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] rounded-2xl p-10 text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {ui.ctaTitle}
          </h2>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto">
            {ui.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/#contact`}
              className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <MessageSquare className="size-5" />
              {ui.ctaButton}
            </Link>
            <a
              href="mailto:contact@magnificdigital.net"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              contact@magnificdigital.net
            </a>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-white dark:bg-[#0F172A] py-8 mt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Magnific Digital. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href={`/${locale}`} className="hover:text-[#F97316] transition-colors">{ui.home}</Link>
            <Link href={`/${locale}/mentions-legales`} className="hover:text-[#F97316] transition-colors">{ui.legal}</Link>
            <Link href={`/${locale}/politique-de-confidentialite`} className="hover:text-[#F97316] transition-colors">{ui.privacy}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
