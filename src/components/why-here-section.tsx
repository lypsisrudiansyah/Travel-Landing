
"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { LocalizedHomepage } from "@/types/homePageType";
import { useLanguage } from "@/contexts/language-context";
import { LocalizedWhyStay } from "@/types/whyStayType";
import { whyStayService } from "@/services/whyStayService";

const whyStayContent2 = [
  {
    title: "Breathtaking Nature",
    description: "Surrounded by majestic mountains, rolling vineyards, and scenic walking trails.",
    // image: "https://images.unsplash.com/photo-1672729908461-9bca4ce805ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image: "/assets/whyHere2.webp",
    imageHint: "mountain landscape",
  },
  {
    title: "Rich Culture",
    description: "Explore historic castles, charming streets, and a vibrant local arts scene.",
    image: "/assets/whyHere11.webp",
    imageHint: "historic architecture",
  },
  {
    title: "Culinary Delights",
    description: "Indulge in a fusion of Alpine and Mediterranean flavors at local eateries.",
    image: "/assets/whyHere2.webp",
    imageHint: "gourmet food",
  },
  {
    title: "Wellness Relaxation",
    description: "Unwind and rejuvenate at world-class thermal spas and wellness retreats.",
    image: "/assets/whyHere3.webp?v=1",
    imageHint: "spa wellness",
  },
];

export function WhyHereSection({ data }: { data: LocalizedHomepage | null }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const { language, setLanguage } = useLanguage();

  const [whyStayContent, setWhyStayContent] = React.useState<LocalizedWhyStay[]>([])

  React.useEffect(() => {
    const fetchWhyStayContent = async () => {
      const result = await whyStayService.getAllWhyStay(language)
      setWhyStayContent(result)
      console.log('Fetched Why Stay Content:', result)
    }

    fetchWhyStayContent()
  }, [language])



  React.useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    // Sync carousel on init
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleItemClick = (index: number) => {
    setCurrent(index);
    api?.scrollTo(index);
  };

  const cardVariants = {
    inactive: {
      opacity: 0.7,
      transition: { duration: 0.3 }
    },
    active: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
  };

  const itemContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
  };


  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.7,
        staggerChildren: 0.5, // Delay between children animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
    // <section className="py-12 md:py-24 bg-[#F8FAFB]">
    <motion.section
      initial="hidden"
      whileInView="visible" // Animasi dimulai saat elemen terlihat di viewport
      viewport={{ once: true, amount: 0.3 }} // Animasi hanya terjadi sekali, dengan 30% elemen terlihat
      variants={containerVariants} // Use containerVariants for section animation
      className="md:min-h-[calc(100vh-3rem)] w-full bg-[#F8FAFB]"
    >
      <motion.div
        variants={itemVariants} // Use itemVariants for individual items
        className="max-w-full md:mx-28 py-12 md:py-20 px-4 md:px-0"
      >
        <motion.div
          variants={itemVariants} // Apply itemVariants to the title and description
          className="text-left mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">{data?.why_title}</h2>
          <p className="mt-4 max-w-[87vw] text-base md:text-[1.3rem] font-light text-muted-foreground">
            {data?.why_description}
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <motion.div
          variants={containerVariants} // Apply containerVariants to the grid layout
          className="hidden md:grid md:grid-cols-5 gap-12 items-center justify-center text-center"
        >
          <motion.div
            variants={itemVariants} // Apply itemVariants to each card
            className="md:col-span-2 flex flex-col gap-4"
          >
            {whyStayContent.map((item, index) => (
              <motion.div
                key={index}
                className={cn(
                  "p-6 rounded-lg cursor-pointer transition-all duration-300",
                  current === index ? "bg-white  -ml-60 pl-60" : "bg-transparent -ml-[1.4vw]"
                )}
                variants={itemVariants}
                animate={current === index ? "active" : "inactive"}
                whileHover={{ opacity: 1 }}
                onClick={() => handleItemClick(index)}
                aria-label="ItemWhyHereButton"
              >
                <h3 className={cn("text-[24px] font-medium  text-left",
                  current === index ? 'text-foreground' : 'text-gray-400')
                }>{item.title}</h3>
                <AnimatePresence mode="wait">
                  {current === index && (
                    <motion.p
                      className="text-accent-foreground mt-2 text-left text-[16px] font-extralight"
                      variants={itemContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
          <div className="relative md:col-span-3 ml-4">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {whyStayContent.map((content, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full h-[488px] overflow-hidden rounded-lg -pr-24">
                      <Image
                        src={content.image?.asset.url || 'assets/whyHere1.webp?v=3'}
                        alt={content.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 mt-4">
              {whyStayContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(index)}
                  className={cn(
                    "h-1.5 w-8 rounded-full transition-colors",
                    current === index ? "bg-foreground" : "bg-muted"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-6">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {whyStayContent.map((content, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
                    <Image
                      src={content.image?.asset.url + "?v=1" || 'assets/whyHere1.webp?v=3'}

                      alt={content.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={itemContentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Card className="bg-white rounded-lg shadow-sm">
                <CardContent className="p-6">
                  {/* {whyStayContent.findIndex} */}
                  <h3 className="text-xl font-medium text-foreground">{whyStayContent.at(current)?.title ?? ""}</h3>
                  <p className="text-muted-foreground mt-2">{whyStayContent.at(current)?.description ?? ""}</p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="z-20 flex gap-2 justify-center">
            {whyStayContent.map((_, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(index)}
                className={cn(
                  "h-1.5 w-8 rounded-full transition-colors",
                  current === index ? "bg-foreground" : "bg-muted"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
