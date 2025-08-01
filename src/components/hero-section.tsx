
"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Menu,
  Globe,
  ChevronDown,
  Calendar as CalendarIcon,
  Users,
  User,
  Search as SearchIcon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { StaggeredFadeText } from "./ui/staggered-fade";
import { LocalizedHomepage } from "@/types/homePageType";
import { useLanguage } from "@/contexts/language-context";
import { LocalizedHeroSection } from "@/types/heroSectionType";
import { heroService } from "@/services/heroService";

const searchFormSchema = z.object({
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  guests: z.string().min(1, "Please select the number of guests."),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const heroContent2 = [
  {
    subtitle: "STAY MERAN",
    title: "Three Unique Stays in the Heart of Merano",
    image:
      "/assets/hero1.webp?v=3",
    // "https://images.unsplash.com/photo-1672742457847-01f827751ac5?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "mountain valley",
  },
  {
    subtitle: "NAZARE, PORTUGAL",
    title: "Coastal Beauty Surfing Haven",
    image: "/assets/hero2.webp?v=3",

    // "https://images.unsplash.com/photo-1672741658743-7ee67e9d0c10?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "ocean waves",
  },
  {
    subtitle: "MONTENEGRO",
    title: "Where Mountains Meet the Sea",
    image:
      "/assets/hero3.webp?v=3",
    // "https://images.unsplash.com/photo-1672729908465-fd30e7586ec9?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "beach mountains",
  },
  {
    subtitle: "LIGHTHOUSE",
    title: "A Beacon of Light on the Coast",
    image:
      "/assets/hero4.webp?v=3",
    // "https://images.unsplash.com/photo-1672733165337-50ed54c86dc8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "lighthouse coast",
  },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Our Stays", href: "#our-stays" },
  { name: "Why Merano", href: "#why-merano" },
  { name: "About Us", href: "#about-us" },
];


export function HeroSection({ data }: { data: LocalizedHomepage | null }) {
  console.log("Accomodation Night:", data?.accomodation_night);
  console.log("Accomodation Title:", data?.accomodation_title);
  console.log("arrival:", data?.hero_arrival);


  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const { language, setLanguage } = useLanguage();

  const [heroContent, setHeroContent] = React.useState<LocalizedHeroSection[]>([]);

  React.useEffect(() => {
    const fetchHeroContent = async () => {
      const heroes = await heroService.getAllHeroes(language);
      setHeroContent(heroes);
      console.log("Fetched Hero Content:", heroes);
      
    };

    fetchHeroContent();
  }, [language]);
  


  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);


  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      guests: "0",
    },
  });

  function onSubmit(data: SearchFormValues) {
    console.log(data);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 1.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut", delayChildren: 1.2 },
    },
  };

  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      api?.scrollNext();
    }
    if (isRightSwipe) {
      api?.scrollPrev();
    }
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, scale: 0.1 }}
        // whileInView={{
        //   opacity: 1,
        //   scale: [0.3, 0.3, 1]
        // }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.1 }, // langsung tampil
          scale: {
            duration: 1.0,
            times: [0, 0.2, 1],
            ease: "easeOut"
          }
        }}
        viewport={{ once: true, amount: 0.3 }}

        // className="relative h-[788px] w-full overflow-hidden rounded-xl"
        className="relative h-[calc(100vh-3rem)] w-full overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        <Carousel setApi={setApi} className="w-full h-full">
          <CarouselContent className="h-full">
            {heroContent.map((content, index) => (
              <CarouselItem
                key={index}
                className="relative sm:h-screen h-[145vh]"
              >
                <Image
                  src={content.image?.asset.url || 'assets/hero1.webp?v=3'}
                  alt={content.subtitle}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                <div className="absolute inset-0 z-10 flex h-full flex-col" id="theTitleParent">
                  <main className="flex flex-grow flex-col items-center justify-center p-4 mb-[75vh] md:mb-[30dvh]">
                    <motion.div
                      className="flex flex-col items-center text-center text-white"
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <StaggeredFadeText
                        text={content.subtitle}
                        as="p"
                        className="mb-6 md:mb-8 font-body text-base md:text-2xl tracking-[0.3em] font-light text-white/90"
                      />
                      <StaggeredFadeText
                        text={content.title}
                        as="h1"
                        className="font-headline text-[40px] md:text-8xl font-medium tracking-tight w-11/12 md:w-[60%]"
                      />
                    </motion.div>
                  </main>
                </div>


              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute inset-0 z-10 flex h-full flex-col pointer-events-none">
          <header className="p-4 md:p-6 pointer-events-auto">
            <div className="mx-auto flex max-w-7xl items-center justify-between">

              {/* Desktop Header */}
              <motion.div
                id="DesktopHeader"
                className="hidden md:flex relative items-center justify-center w-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.0,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <nav className="flex items-center gap-2 rounded-full bg-black/20 p-3 backdrop-blur-sm">
                  <Image src="/assets/union.png" className="mr-2" alt="logoDummy" width={40} height={40} />
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="font-body text-lg font-light text-white/90 transition-colors hover:text-white px-8 py-2"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
                <div className="absolute -right-[80vw] lg:-right-[10vw]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-white/90 hover:bg-white/10 hover:text-white text-lg font-light"
                      >
                        {/* <Globe className="h-4 w-4" /> */}
                        <Image src="/icons/globeIcon.png" className="mr-2 mb-1" alt="Globe" width={30} height={30} />
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
                      className="bg-neutral-900/90 border-white/20 text-white backdrop-blur-md font-normal text-base"
                    >
                      <DropdownMenuItem
                        onClick={() => setLanguage("en")} // Change language to English
                        className={cn(
                          "hover:bg-neutral-700/100 focus:bg-neutral-700/100 text-white font-normal text-base",
                          language === "en" && "bg-neutral-700/100" // Highlight active language
                        )}
                      >
                        English (EN)
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setLanguage("it")} // Change language to Italian
                        className={cn(
                          "hover:bg-neutral-700/100 focus:bg-neutral-700/100 text-white font-normal text-base",
                          language === "it" && "bg-neutral-700/100" // Highlight active language
                        )}
                      >
                        Italy (IT)
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setLanguage("de")} // Change language to German
                        className={cn(
                          "hover:bg-neutral-700/100 focus:bg-neutral-700/100 text-white font-normal text-base",
                          language === "de" && "bg-neutral-700/100" // Highlight active language
                        )}
                      >
                        German (DE)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>

              {/* Mobile Header */}
              <div className="flex md:hidden items-center justify-between w-full">
                <nav className="flex items-center gap-2 rounded-full bg-black/20 p-2 backdrop-blur-sm w-full justify-between">

                  <Image src="/assets/union.png" className="mr-2" alt="logoDummy" width={40} height={40} />
                  <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild onClick={() => setOpen(true)}>
                      <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full px-4 text-sm font-light">
                        Menu
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-neutral-900/95 backdrop-blur-md text-white border-l-white/20 w-[80vw]">
                      <div className="flex flex-col gap-6 p-6">
                        <a href="#" className="flex items-center gap-2">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                            <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
                          </svg>
                          <span className="font-headline text-xl font-bold text-white">
                            MeranoStays
                          </span>
                        </a>
                        <nav className="flex flex-col gap-4">
                          {navLinks.map((link) => (
                            <a

                              key={link.name}
                              href={link.href}
                              className="font-body text-lg text-white/90 hover:text-white transition-colors"
                              onClick={(e) => {
                                setOpen(false);
                                e.preventDefault();
                                setTimeout(() => {
                                  const target = document.querySelector(link.href);
                                  if (target) {
                                    target.scrollIntoView({ behavior: "smooth" });
                                  }
                                }, 700);
                              }}
                            >
                              {link.name}
                            </a>
                          ))}
                        </nav>
                        <DropdownMenu >
                          <DropdownMenuTrigger asChild className="-mt-2">
                            <a className="flex items-center gap-2 font-body text-lg text-white/90 hover:text-white transition-colors cursor-pointer">
                              <span>English (EN)</span>
                              <Image src="/icons/globeIcon.png" alt="Globe" width={24} height={24} />
                            </a>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="bg-neutral-900/90 border-white/20 text-white backdrop-blur-md">
                            <DropdownMenuItem className="hover:bg-neutral-700/100 focus:bg-neutral-700/100 text-white">English (EN)</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-neutral-700/100 focus:bg-neutral-700/100 text-white">Italy (IT)</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-neutral-700/100 focus:bg-neutral-700/100 text-white">German (DE)</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </SheetContent>

                  </Sheet>
                </nav>
              </div>
            </div>
          </header>

          {/* <main className="flex-grow flex-col items-center justify-end p-4 pointer-events-auto hidden md:flex"> */}
          <main className="flex-grow flex-col items-center justify-end p-4 pointer-events-auto hidden md:flex relative z-10">

            {/* Desktop Search Form */}
            <motion.div
              id="DesktopSearchForm"
              className="mb-[8vh] w-full max-w-2xl"
              initial={{
                opacity: 0,
                filter: 'blur(12px)',
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.6,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              <Form {...form}>
                <div className="grid md:grid-cols-2 gap-x-4 gap-y-2 mb-2 px-4">
                  <label className="text-white text-left text-base font-normal">{data?.hero_arrival}</label>
                  <label className="text-white text-left text-base font-normal">{data?.hero_person}</label>
                </div>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-px rounded-3xl bg-white/20 p-[0.32rem] backdrop-blur-sm"
                >
                  <FormField
                    control={form.control}
                    name="dates"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-center bg-white rounded-l-3xl py-[0.7vh]">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant={"ghost"}
                              className={cn(
                                "h-12 w-full p-2 justify-start text-left font-normal text-foreground hover:bg-transparent rounded-r-none",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <Image src="/icons/calendarIcon.png" className="mr-2" alt="Calendar" width={24} height={24} />
                              <span className="flex-grow">
                                {date?.from ? (
                                  date.to ? (
                                    <>
                                      {format(date.from, "LLL dd, y")} -{" "}
                                      {format(date.to, "LLL dd, y")}
                                    </>
                                  ) : (
                                    format(date.from, "LLL dd, y")
                                  )
                                ) : (
                                  <span className="font-light text-base text-gray-600">Select Date</span>
                                )}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={date}
                              onSelect={(range) => {
                                setDate(range);
                                if (range?.from && range?.to) {
                                  field.onChange(range);
                                }
                              }}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-500 font-bold px-2 text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    aria-label="PersonSelect"
                    name="guests"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-center bg-white" >
                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                          <FormControl>
                            <SelectTrigger className="select-trigger h-12 border-0  font-normal bg-white focus:ring-0 text-foreground rounded-none">
                              <div className="flex items-center gap-2 p-2 w-full font-light text-base text-gray-600">
                                <Image src="/icons/personIcon.png" className="mr-2" alt="IconPeople" width={24} height={24} />
                                <SelectValue placeholder="0 Person" />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">0 Person</SelectItem>
                            {[...Array(8)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1} Person{i > 0 && 's'}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500 font-bold px-2 text-xs" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" aria-label="Search" className="w-20 h-auto py-0 my-0 text-sm font-bold bg-[#18191A] hover:bg-neutral-700 text-white rounded-r-3xl rounded-l-none">
                    <Image src="/icons/searchLcd.png" alt="Search" width={28} height={28} className="" />
                  </Button>
                </form>
              </Form>
              <div className="mb-48"></div>
            </motion.div>
          </main>
          {/* <main className="absolute bottom-0 w-full p-4 pointer-events-auto flex md:hidden"> */}
          <main className="absolute bottom-0 w-full p-2 pointer-events-auto flex md:hidden relative z-10">
            {/* Mobile Search Form */}
            <motion.div
              className="w-full mt-[48.6vh] "
              variants={itemVariants}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 gap-4 rounded-3xl bg-white p-3"
                >
                  <FormField
                    control={form.control}
                    name="dates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Arrival & Departure</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                id="date"
                                variant={"outline"}
                                aria-label="SelectDate"
                                className={cn(
                                  "w-full justify-start text-left font-normal h-12 rounded-xl",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <Image src="/icons/calendarIcon.png" className="-ml-1 mr-2" alt="calendar" width={24} height={24} />
                                {date?.from ? (
                                  date.to ? (
                                    <>
                                      {format(date.from, "LLL dd, y")} -{" "}
                                      {format(date.to, "LLL dd, y")}
                                    </>
                                  ) : (
                                    format(date.from, "LLL dd, y")
                                  )
                                ) : (
                                  <span>Select Date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="center">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={date}
                              onSelect={(range) => {
                                setDate(range);
                                if (range?.from && range?.to) {
                                  field.onChange(range);
                                }
                              }}
                              numberOfMonths={1}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guests"
                    aria-label="PersonSelect"
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel className="text-black">Person</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="select-trigger h-12">
                              <div className="flex items-center gap-2 font-light text-gray-600">
                                <Image src="/icons/personIcon.png" className="mr-2" alt="iconPeople" width={24} height={24} />
                                <SelectValue placeholder="0 Person" />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">0 Person</SelectItem>
                            {[...Array(8)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1} Person{i > 0 && 's'}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button aria-label="SearchMobileSz" type="submit" size="lg" className="h-14 text-base font-extralight bg-[#18191A] hover:bg-neutral-700 text-white rounded-xl w-full">
                    <span className="mr-2">Find It</span>
                    <Image src="/icons/searchLcd.png" alt="Search" width={24} height={24} />

                  </Button>
                </form>
              </Form>
            </motion.div>
          </main>
          <div className="absolute bottom-28 md:bottom-10 right-0 left-0 md:right-16 md:left-auto z-20 flex justify-center md:justify-start gap-2 pointer-events-auto">
            {heroContent.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-1 w-6 rounded-full transition-colors hidden md:block",
                  current === index ? "bg-white" : "bg-white/30"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Left click area */}
        {/* <div
          className="hidden md:block absolute left-0 top-0 w-2/12 h-full z-10 cursor-pointer"
          onClick={() => api?.scrollPrev()}
        /> */}

        {/* Right click area */}
        {/* <div
          className="hidden md:block absolute right-0 top-0 w-2/12 h-[80%] z-10 cursor-pointer"
          onClick={() => api?.scrollNext()}
        /> */}
        {/* Left click area with arrow */}
        <div
          className="group hidden md:block absolute left-0 top-0 w-1/12 h-full z-10 cursor-pointer"
          onClick={() => api?.scrollPrev()}
        >
          <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-2xl pointer-events-none">
            <ChevronLeft className="h-24 w-24" />
          </div>
        </div>

        {/* Right click area with arrow */}
        <div
          className="group hidden md:block absolute right-0 top-0 w-1/12 h-[85%] z-10 cursor-pointer"
          onClick={() => api?.scrollNext()}
        >
          <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-2xl pointer-events-none">
            <ChevronRight className="mt-[18vh] h-24 w-24" />
          </div>
        </div>
      </motion.section>
      <style jsx global>{`
        .select-trigger > svg {
          display: none;
        }
      `}</style>
    </>
  );
}
