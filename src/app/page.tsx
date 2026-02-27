import {
  Hero,
  ScheduleTimeline,
  GuidelinesGrid,
  PricingCard,
  FacilitatorCards,
  TestimonialCarousel,
  LocationMap,
  CTASection,
  NewsletterSignup,
  FAQSection,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <Hero />
      <ScheduleTimeline />
      <GuidelinesGrid />
      <PricingCard />
      <FacilitatorCards />
      <TestimonialCarousel />
      <LocationMap />
      <FAQSection />
      <CTASection />
      <NewsletterSignup />
    </>
  );
}
