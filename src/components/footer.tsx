
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mail, Phone, Instagram, Globe, ChevronDown, Landmark } from "lucide-react";
import { LocalizedHomepage } from "@/types/homePageType";
import { useLanguage } from "@/contexts/language-context";

export function Footer({ data }: { data: LocalizedHomepage | null }) {
  const { language, setLanguage } = useLanguage();


  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.3, // Delay between children animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible" // Animasi dimulai saat elemen terlihat di viewport
      viewport={{ once: true, amount: 0.3 }} // Animasi hanya terjadi sekali, dengan 30% elemen terlihat
      variants={sectionVariants} // Apply sectionVariants for the footer animation
      className="bg-neutral-900 text-white px-4 md:px-28"
    >
      <motion.div
        variants={itemVariants}
        className="container py-12 md:py-20">
        <div className="text-left mb-16 md:mb-8">
          <motion.h2 variants={itemVariants} className="text-xl font-normal md:text-4xl tracking-tight">
            {data?.contact_us}
          </motion.h2>
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-left">
            <Button variant="outline" aria-label="ButtonEmail" className="bg-transparent justify-start md:justify-center py-6 border-white/40 hover:bg-white/10 hover:border-white text-white rounded-full text-lg font-light">
              {/* <Mail className="mr-2 " size={48} /> */}
              <Image src="/icons/mailIcon.png" className="mr-2" alt="Mail" width={24} height={24} />
              <span>Email: info@staymeran.com</span>
            </Button>
            <Button variant="outline" aria-label="ButtonPhone" className="bg-transparent justify-start md:justify-center py-6 border-white/40 hover:bg-white/10 hover:border-white text-white rounded-full text-lg font-light">
              <Image src="/icons/phoneIcon.png" className="mr-2" alt="phone" width={24} height={24} />
              <span>Phone: +39 123 456 7890</span>
            </Button>
          </div>
        </div>

        <div className="container border-t mx-auto justify-center border-white/20 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8">
            <div className="space-y-4 md:block hidden">
              <div className="flex items-center gap-2">
                <Image src="/assets/union.png" className="mr-2" alt="Logo" width={40} height={40} />
                <span className="text-lg font-medium">Stay Merano</span>
              </div>
              <p className="text-white/70 text-base font-normal">Bernhard Johannes Str. 1, 39012 Merano</p>
              <Image
                src="/assets/welcomeApartment.jpg"
                alt="Booking.com Award"
                width={235}
                height={141}
                className="rounded-lg"
                data-ai-hint="award certificate"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">About</h3>
              <ul className="space-y-4 text-white/70">
                <li><a href="#" className="hover:text-white text-base font-light">About Us</a></li>
                <li><a href="#" className="hover:text-white text-base font-light">Merano</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Our Stays</h3>
              <ul className="space-y-4 text-white/70">
                <li><a href="#" className="hover:text-white text-base font-light">Helles Apartment in historischer Villa</a></li>
                <li><a href="#" className="hover:text-white text-base font-light">Apartment Franz</a></li>
                <li><a href="#" className="hover:text-white text-base font-light">Apartment Sissi mit Balkon</a></li>
              </ul>
            </div>
            <div className="space-y-4 md:justify-self-end">
              <h3 className="text-lg font-medium mb-4 block md:hidden">Our Social Media</h3>
              <div className="flex gap-2 md:justify-self-end mb-16">
                <Button variant="ghost" aria-label="ButtonWhatsapp" size="icon" className="bg-white/10 rounded-full text-white hover:bg-white/20">
                  <Image src="/icons/waIcon.png" className="mr-0" alt="WA" width={24} height={24} />

                </Button>
                <Button variant="ghost" aria-label="ButtonInstagram" size="icon" className="bg-white/10 rounded-full text-white hover:bg-white/20">
                  <Image src="/icons/igIcon.png" className="mr-0" alt="IG" width={24} height={24} />

                </Button>
              </div>
              <div className="space-y-4 py-6 md:hidden block">
                <div className="flex items-center gap-2">
                  <Image src="/assets/union.png" className="mr-2" alt="Logo" width={40} height={40} />
                  <span className="text-lg font-medium">Stay Merano</span>
                </div>
                <p className="text-white/70 text-base font-normal">Bernhard Johannes Str. 1, 39012 Merano</p>
                <Image
                  src="/assets/welcomeApartment.jpg"
                  alt="Booking.com Award"
                  width={235}
                  height={141}
                  className="rounded-lg"
                  data-ai-hint="award certificate"
                />
              </div>
              <Image src="/assets/contentDesignBy.png" className="mr-0" alt="ContentDesign" width={192} height={136} />

              {/* <p className="text-sm text-white/70">Content, Design and Code by</p>
              <div className="flex gap-2">
                <div className="bg-neutral-700/80 p-4 rounded-md flex items-center justify-center h-20 w-20">
                  <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9382 27.25L0.382812 0.75H8.69141L16.0352 17.8418L16.25 17.1582L15.3418 14.8418L20.1387 4.1582L23.8301 12.0645L27.6387 4.1582L31.3301 12.0645L27.4219 21.6582L27.75 22.5059L34.9382 6.5L40 18.25L28.1699 27.25H20.3828L24.1699 19.0645L20.25 10.3418L11.9382 27.25Z" fill="white" />
                  </svg>
                </div>
                <div className="bg-neutral-700/80 p-4 rounded-md flex flex-col justify-center text-sm h-20">
                  <div>Websites</div>
                  <div>Marketing</div>
                  <div>Social Media</div>
                </div>
              </div> */}
            </div>

          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
          <p className="font-light text-base">Copyright &copy;2025</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-white/90 hover:bg-white/10 hover:text-white font-light text-base"
                >
                  {/* <span>English (EN)</span> */}
                  <span>
                    {language === "en" && "English (EN)"}
                    {language === "it" && "Italy (IT)"}
                    {language === "de" && "German (DE)"}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-neutral-900/90 border-white/20 text-white backdrop-blur-md z-50"
              >
                <DropdownMenuItem
                  onClick={() => setLanguage("en")}
                  className="hover:bg-neutral-700/80 focus:bg-neutral-700/80 font-light text-base"
                >
                  English (EN)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("it")}
                  className="hover:bg-neutral-700/80 focus:bg-neutral-700/80 font-light text-base"
                >
                  Italy (IT)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("de")}
                  className="hover:bg-neutral-700/80 focus:bg-neutral-700/80 font-light text-base"
                >
                  German (DE)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-white/90 hover:bg-white/10 hover:text-white font-light text-base"
                >
                  <span>Legal</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-neutral-900/90 border-white/20 text-white backdrop-blur-md">
                <DropdownMenuItem className="hover:bg-neutral-700/80 focus:bg-neutral-700/80 font-light text-base">
                  <a href="#">Imprint</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-neutral-700/80 focus:bg-neutral-700/80 font-light text-base">
                  <a href="#">Privacy</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
