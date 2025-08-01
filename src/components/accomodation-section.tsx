
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LocalizedHomepage } from "@/types/homePageType";
import { accommodationService } from "@/services/accomodationService";
import { useLanguage } from "@/contexts/language-context";
import * as React from "react";
import { LocalizedAccommodation } from "@/types/accomodationType";

const accommodations2 = [
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

  const { language, setLanguage } = useLanguage();
  const [accommodations, setAccommodations] = React.useState<LocalizedAccommodation[]>([]);

  React.useEffect(() => {
    const fetchAccommodations = async () => {
      const accommodationsData = await accommodationService.getAllAccommodations(language);
      setAccommodations(accommodationsData);
      console.log("Fetched Accommodations:", accommodationsData);
    };

    fetchAccommodations();
  }, [language]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.4, // Delay between children animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.2, // Delay for button animation
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible" // Animasi dimulai saat elemen terlihat di viewport
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="relative bg-white min-h-[calc(100vh-3rem)] w-full mt-12 md:mt-8 mb-16 md:mb-14"
    >
      <motion.div
        variants={itemVariants}
        className="px-2 md:px-24 pt-0 md:pt-16"
      >
        <motion.div
          variants={itemVariants}
          className="max- mx-auto mb-12"
        >
          <h2 className="text-[32px] md:text-[44px] font-medium tracking-tight text-foreground text-left w-12/12 md:w-[66vw]">
            {data?.accomodation_title}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {accommodations.map((item: any, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-lg"
              >
                <Image
                  src={item.image?.asset?.url || "assets/lptRoom1.webp?v=3"}
                  alt={item.title}
                  width={387}
                  height={409}
                  className="object-cover w-full h-full"
                />
                <motion.div
                  variants={itemVariants}
                  className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm text-foreground text-sm font-medium px-3 py-1.5 rounded-md"
                >
                  {data?.accomodation_start} £{item.price} / {data?.accomodation_night}
                </motion.div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-col flex-grow gap-2"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex-grow"
                >
                  <h3 className="font-headline text-[20px] md:text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-black font-body text-[16px] md:text-base font-extralight mt-2 w-12/12 md:w-[28vw]">
                    {item.subtitle}
                  </p>
                </motion.div>
                <motion.div variants={buttonVariants}>
                  <Button
                    variant="outline"
                    aria-label="DiscoverButton"
                    className="mt-4 w-fit border-black text-black hover:bg-neutral-100 rounded-full px-6 py-7"
                  >
                    <span className="text-base font-normal">Discover More</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}