import { AccomodationSection } from "@/components/accomodation-section";
import { FindPlanSection } from "@/components/find-plan-section";
import { HeroSection } from "@/components/hero-section";
import TestimonySection from "@/components/testimony-section";
// import { TestimonySection } from "@/components/testimony-section";
import { WhyHereSection } from "@/components/why-here-section";
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="flex-1 bg-white">
      <div id="home" className="px-2 py-3 md:px-8 md:pt-5">
        <HeroSection />
      </div>
      <div id="our-stays" className="px-2 mb-5 md:mb-0 md:px-8 ">
        <AccomodationSection />
      </div>
      <div id="why-merano" className="px-0">
        <WhyHereSection />
      </div>
      <div id="about-us">
        <TestimonySection />
      </div>
      <FindPlanSection />
      <Footer />

    </main>
  );
}
