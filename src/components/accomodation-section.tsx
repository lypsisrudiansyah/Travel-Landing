
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LocalizedHomepage } from "@/types/homePageType";

const accommodations = [
  {
    title: "Helles Apartment in historischer Villa",
    description:
      "A bright, stylish retreat in a historic villa, blending classic charm with modern comfort.",
    price: "£100",
    // image: "https://placehold.co/387x409.png",
    image: "/assets/lptRoom1.webp",
    imageHint: "apartment interior",
  },
  {
    title: "Apartment Franz",
    description:
      "A modern, minimalist retreat offering a peaceful and stylish stay in the heart of Merano.",
    price: "£80",
    image: "/assets/lptRoom2.webp",
    imageHint: "modern kitchen",
  },
  {
    title: "Apartment Sissi mit Balkon",
    description:
      "An elegant escape featuring a private balcony with picturesque views of the city and surrounding nature.",
    price: "£120",
    image: "/assets/lptRoom3.webp",
    imageHint: "living room balcony",
  },
];

export function AccomodationSection({ data }: { data: LocalizedHomepage | null }) {
  return (
    // <section className="relative bg-white h-[calc(100vh-3rem)] w-full">
    <section className="relative bg-white min-h-[calc(100vh-3rem)] w-full mt-12 md:mt-8 mb-16 md:mb-14">
      <div className="px-2 md:px-24 pt-0 md:pt-16">
        <div className="max- mx-auto mb-12">
          <h2 className="text-[32px] md:text-[44px] font-medium tracking-tight text-foreground text-left w-12/12 md:w-[66vw]">
            {data?.accomodation_title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accommodations.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={387}
                  height={409}
                  className="object-cover w-full h-full"
                  data-ai-hint={item.imageHint}
                />
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm text-foreground text-sm font-medium px-3 py-1.5 rounded-md">
                  {data?.accomodation_start} {item.price} / {data?.accomodation_night}
                </div>
              </div>
              <div className="flex flex-col flex-grow gap-2">
                <div className="flex-grow">
                  <h3 className="font-headline text-[20px] md:text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-black font-body text-[16px] md:text-base font-extralight mt-2 w-12/12 md:w-[28vw]">
                    {item.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  aria-label="DiscoverButton"
                  className="mt-4 w-fit border-black text-black hover:bg-neutral-100 rounded-full px-6 py-7"
                >
                  <span className="text-base font-normal">Discover More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
