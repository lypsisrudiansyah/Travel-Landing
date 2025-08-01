"use client"
import { AccomodationSection } from "@/components/accomodation-section";
import { FindPlanSection } from "@/components/find-plan-section";
import { HeroSection } from "@/components/hero-section";
import TestimonySection from "@/components/testimony-section";
// import { TestimonySection } from "@/components/testimony-section";
import { WhyHereSection } from "@/components/why-here-section";
import { Footer } from '@/components/footer';
import { useEffect, useState } from "react";
import { useLanguage,  } from "@/contexts/language-context";
import { homepageService } from "@/services/homePageService";
import { LocalizedHomepage } from "@/types/homePageType";

export default function Home() {
  // const [homepage, setHomepage] = useState(
  const [homepage, setHomepage] = useState<LocalizedHomepage | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchHomepage = async () => {

      const data = await homepageService.getHomepage(language);
      setHomepage(data);
    };
    fetchHomepage();
  }, [language]);

  if (!homepage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <main className="flex-1 bg-white">
      <div id="home" className="px-2 py-3 md:px-8 md:pt-5">
        <HeroSection data={homepage}  />
      </div>
      <div id="our-stays" className="px-2 mb-5 md:mb-0 md:px-8 ">
        <AccomodationSection data={homepage} />
      </div>
      <div id="why-merano" className="px-0">
        <WhyHereSection data={homepage} />
      </div>
      <div id="about-us">
        <TestimonySection data={homepage} />
      </div>
      <FindPlanSection data={homepage} />
      <Footer data={homepage} />

    </main>
  );
}
