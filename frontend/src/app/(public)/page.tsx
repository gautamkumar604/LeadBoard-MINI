import React from 'react';
import { HeroSection } from '@/components/public/HeroSection';
import { FeaturesSection } from '@/components/public/FeaturesSection';
import { WhyChooseSection } from '@/components/public/WhyChooseSection';
import { LeadFormSection } from '@/components/public/LeadFormSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <WhyChooseSection />
      <LeadFormSection />
    </>
  );
}
