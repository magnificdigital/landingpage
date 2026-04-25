'use client';

import Header from '@/components/header';
import Hero from '@/components/hero';
import Mission from '@/components/mission';
import Services from '@/components/services';
import HowItWorks from '@/components/how-it-works';
import WhyUs from '@/components/why-us';
import Testimonials from '@/components/testimonials';
import Results from '@/components/results';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Mission />
      <Services />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <Results />
      <Contact />
      <Footer />
    </div>
  );
}
