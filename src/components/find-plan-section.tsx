
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LocalizedHomepage } from "@/types/homePageType";

export function FindPlanSection({ data }: { data: LocalizedHomepage | null }) {
  return (
    <section className="py-12 md:py-24 bg-white mb-10 md:mb-0 px-0">
      <div className="px-4 md:px-28">
        <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
          <Image
            src={data?.find_plan_image.asset.url || 'assets/hero2.webp'}
            alt="Misty mountains"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="mountain landscape"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent z-10" /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-500/90 via-gray-400/60 to-transparent z-10" />

          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-4">
            <h2 className="text-2xl font-medium md:text-[44px] leading-tight mb-4">
              {data?.find_plan_title}
            </h2>
            <p className="mt-4 max-w-[57vw] text-[16px] font-light text-white/90">
              {data?.find_plan_description}
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
