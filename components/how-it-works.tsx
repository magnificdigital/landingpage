import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { MessageSquare, BarChart3, Cog, Rocket } from 'lucide-react';
import { useT, useI18n } from '@/lib/i18n/context';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const manuallyTriggered = useRef(false);
  const t = useT();
  const { dict } = useI18n();
  const howItWorksDict = dict.howItWorks as any;

  const stepKeys = ['step1', 'step2', 'step3', 'step4'] as const;
  const stepIcons = [MessageSquare, Cog, BarChart3, Rocket];

  const steps = stepKeys.map((key, i) => ({
    id: i + 1,
    title: t(`howItWorks.steps.${key}.title`),
    description: t(`howItWorks.steps.${key}.description`),
    icon: stepIcons[i],
    visual: {
      title: t(`howItWorks.steps.${key}.visualTitle`),
      items: (howItWorksDict?.steps as Record<string, any>)?.[key]?.visualItems ?? [],
    },
  }));

  const stepDuration = 5000;

  useEffect(() => {
    if (isPaused) return;

    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (stepDuration / 50);
      });
    }, 50);

    const stepTimeout = setTimeout(() => {
      setActiveStep((prevStep) => {
        manuallyTriggered.current = false;
        return (prevStep + 1) % steps.length;
      });
    }, stepDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [activeStep, isPaused, steps.length]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    manuallyTriggered.current = true;
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 4000);
  };

  return (
    <section id="how-it-works" className="py-24 bg-[#F8FAFC] dark:bg-[#0F172A]/80">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-center flex-col text-center gap-5 mb-16"
        >
          <div className="py-1 text-[#F97316] font-semibold border-b-2 border-[#F97316] mb-1.5">
            {t('howItWorks.badge')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E3A8A] dark:text-blue-400">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-12 max-w-6xl mx-auto"
        >
          {/* Step Navigation */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center cursor-pointer transition-all duration-300 overflow-hidden"
                onClick={() => handleStepClick(index)}
              >
                <div
                  className={cn(
                    'size-12 rounded-full flex items-center justify-center transition-colors duration-300',
                    index === activeStep
                      ? 'bg-[#F97316]/20 dark:bg-orange-500/30'
                      : 'bg-[#1E3A8A]/10 dark:bg-blue-900/30'
                  )}
                >
                  <step.icon
                    className={cn(
                      'size-5 transition-colors duration-300',
                      index === activeStep ? 'text-[#F97316]' : 'text-[#1E3A8A] dark:text-blue-400'
                    )}
                  />
                </div>

                <h3
                  className={cn(
                    'p-5 pb-3 text-lg font-semibold mb-0 transition-colors duration-300 text-center',
                    index === activeStep ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </h3>

                <div className="w-full h-0.5 bg-border/60">
                  <AnimatePresence>
                    {index === activeStep && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="h-0.5 w-full overflow-hidden"
                      >
                        <motion.div
                          className="h-0.5 bg-gradient-to-r from-[#F97316] to-[#1E3A8A]"
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.05, ease: 'linear' }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* Content Panel */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-border/50 shadow-sm bg-white dark:bg-[#1E293B]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="p-8 md:p-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Description */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-10 rounded-xl bg-[#F97316]/15 flex items-center justify-center">
                        {(() => {
                          const StepIcon = steps[activeStep].icon;
                          return <StepIcon className="size-5 text-[#F97316]" />;
                        })()}
                      </div>
                      <span className="text-sm font-semibold text-[#F97316]">
                        {t('howItWorks.stepLabel')} {activeStep + 1}/{steps.length}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {steps[activeStep].description}
                    </p>
                  </div>

                  {/* Visual card */}
                  <div className="bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] rounded-xl p-6 text-white">
                    <h4 className="font-bold text-lg mb-4 text-white/90">
                      {steps[activeStep].visual.title}
                    </h4>
                    <ul className="space-y-3">
                      {steps[activeStep].visual.items.map((item: string, i: number) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="size-2 rounded-full bg-[#F97316]" />
                          <span className="text-white/80">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
