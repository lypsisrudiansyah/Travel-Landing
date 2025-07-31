
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FindPlanSection() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
          <Image
            src="https://images.unsplash.com/photo-1672729908506-efeac8ded7ee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Misty mountains"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="mountain landscape"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent z-10" /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-500/90 via-gray-400/60 to-transparent z-10" />

          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-4">
            <h2 className="text-2xl font-medium md:text-4xl leading-tight">
              Find Your Stay Plan <br /> Your Perfect Getaway
            </h2>
            <p className="mt-4 max-w-[57vw] text-base font-normal text-white/90">
              Ready to experience Merano's charm? Discover availability and book your ideal accommodation today. Whether you're looking for a romantic escape, a cultural adventure, or a relaxing retreat, StayMeran has the perfect place for you.
            </p>
            <Button
              variant="default"
              size="lg"
              aria-label="ButtonFindPlan"
              className="mt-8 bg-white text-black hover:bg-neutral-200 rounded-full px-8 py-8 text-base font-normal"
            >
              <span className="mr-2">Find Your Stay</span>
              <Image src="/icons/arrowRight.png" className="mr-2" alt="arrowRight" width={24} height={24} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
