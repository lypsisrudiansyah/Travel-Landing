// Solution 1: Add touch event handling to make carousel swipeable
// Replace your hero-section.tsx with these modifications

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
} from "lucide-react";
import { StaggeredFadeText } from "./ui/staggered-fade";

const searchFormSchema = z.object({
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  guests: z.string().min(1, "Please select the number of guests."),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const heroContent = [
  {
    subtitle: "STAY MERAN",
    title: "Three Unique Stays in the Heart of Merano",
    image: "/assets/hero1.webp?v=3",
    imageHint: "mountain valley",
  },
  {
    subtitle: "NAZARE, PORTUGAL",
    title: "Coastal Beauty Surfing Haven",
    image: "/assets/hero2.webp?v=3",
    imageHint: "ocean waves",
  },
  {
    subtitle: "MONTENEGRO",
    title: "Where Mountains Meet the Sea",
    image: "/assets/hero3.webp?v=3",
    imageHint: "beach mountains",
  },
  {
    subtitle: "LIGHTHOUSE",
    title: "A Beacon of Light on the Coast",
    image: "/assets/hero4.webp?v=3",
    imageHint: "lighthouse coast",
  },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Our Stays", href: "#our-stays" },
  { name: "Why Merano", href: "#why-merano" },
  { name: "About Us", href: "#about-us" },
];

export function HeroSection() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  // Add touch handling state
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

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

  // Touch handlers for swipe detection
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

  return (
    <>
    <motion.section
        initial= {{ opacity: 0, scale: 0.1 }
}
whileInView = {{
  opacity: 1,
    scale: [0.3, 0.3, 1]
}}
transition = {{
  opacity: { duration: 0.1 },
  scale: {
    duration: 1.0,
      times: [0, 0.2, 1],
        ease: "easeOut"
  }
}}
viewport = {{ once: true, amount: 0.3 }}
className = "relative h-[788px] w-full overflow-hidden rounded-xl"
// Add touch events to the main section
onTouchStart = { handleTouchStart }
onTouchMove = { handleTouchMove }
onTouchEnd = { handleTouchEnd }
  >
  <Carousel setApi={ setApi } className = "w-full h-full" >
    <CarouselContent className="h-full" >
    {
      heroContent.map((content, index) => (
        <CarouselItem
                key= { index }
                className = "relative sm:h-screen h-[145vh]"
        >
        <Image
                  src={ content.image }
                  alt = { content.subtitle }
                  fill
                  style = {{ objectFit: 'cover' }}
priority = { index === 0}
data - ai - hint={ content.imageHint }
                />
  < div className = "absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

    <div className="absolute inset-0 z-10 flex h-full flex-col" >
      <main className="flex flex-grow flex-col items-center justify-center p-4 mb-[45dvh]" >
        <motion.div
                      className="flex flex-col items-center text-center text-white"
key = { index }
initial = {{ opacity: 0, x: 50 }}
animate = {{ opacity: 1, x: 0 }}
exit = {{ opacity: 0, x: -50 }}
transition = {{ duration: 0.5, ease: "easeInOut" }}
                    >
  <StaggeredFadeText
                        text={ content.subtitle }
as = "p"
className = "mb-8 font-body text-base md:text-2xl tracking-[0.3em] font-light text-white/90"
  />
  <StaggeredFadeText
                        text={ content.title }
as = "h1"
className = "font-headline text-[40px] md:text-7xl font-medium tracking-tight w-12/12 md:w-[70%]"
  />
  </motion.div>
  </main>
  </div>
  </CarouselItem>
            ))}
</CarouselContent>
  </Carousel>

{/* Modified overlay with better pointer events handling */ }
<div className="absolute inset-0 z-10 flex h-full flex-col" >
  <header className="p-4 md:p-6 pointer-events-auto" >
    <div className="mx-auto flex max-w-7xl items-center justify-between" >

      {/* Desktop Header */ }
      < motion.div
id = "DesktopHeader"
className = "hidden md:flex items-center justify-between w-full"
initial = {{ opacity: 0, scale: 0.8 }}
animate = {{ opacity: 1, scale: 1 }}
transition = {{
  delay: 1.0,
    duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
                }}
              >
  <a href="#" className = "flex items-center gap-2 text-white" >
    <svg width="32" height = "32" viewBox = "0 0 32 32" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
      <circle cx="16" cy = "16" r = "14" stroke = "white" strokeWidth = "2" />
        <circle cx="16" cy = "16" r = "8" stroke = "white" strokeWidth = "2" />
          </svg>
          </a>
          < nav className = "flex items-center gap-2 rounded-full bg-black/20 p-2 backdrop-blur-sm" >
          {
            navLinks.map((link) => (
              <a
                      key= { link.name }
                      href = { link.href }
                      className = "font-body text-sm font-medium text-white/90 transition-colors hover:text-white px-8 py-2"
              >
              { link.name }
              </a>
            ))
          }
            </nav>
            < div className = "flex items-center" >
              <DropdownMenu>
              <DropdownMenuTrigger asChild >
              <Button
                        variant="ghost"
size = "sm"
className = "flex items-center gap-1 text-white/90 hover:bg-white/10 hover:text-white"
  >
  <Globe className="h-4 w-4" />
    <span>English(EN) </span>
    < ChevronDown className = "h-4 w-4" />
      </Button>
      </DropdownMenuTrigger>
      < DropdownMenuContent align = "end" className = "bg-neutral-900/90 border-white/20 text-white backdrop-blur-md" >
        <DropdownMenuItem className="hover:bg-neutral-700/100 focus:bg-neutral-700/100 bg:text-white focus:text-white" > English(EN) </DropdownMenuItem>
          < DropdownMenuItem className = "hover:bg-neutral-700/100 focus:bg-neutral-700/100 bg:text-white focus:text-white" > Italy(IT) </DropdownMenuItem>
            < DropdownMenuItem className = "hover:bg-neutral-700/100 focus:bg-neutral-700/100 bg:text-white focus:text-white" > German(DE) </DropdownMenuItem>
              </DropdownMenuContent>
              </DropdownMenu>
              </div>
              </motion.div>

{/* Mobile Header */ }
<div className="flex md:hidden items-center justify-between w-full" >
  <a href="#" className = "flex items-center gap-2 text-white" >
    <svg width="32" height = "32" viewBox = "0 0 32 32" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
      <circle cx="16" cy = "16" r = "14" stroke = "white" strokeWidth = "2" />
        <circle cx="16" cy = "16" r = "8" stroke = "white" strokeWidth = "2" />
          </svg>
          </a>
          < Sheet open = { open } onOpenChange = { setOpen } >
            <SheetTrigger asChild onClick = {() => setOpen(true)}>
              <Button variant="ghost" className = "text-white hover:bg-white/10 rounded-full px-4" >
                Menu
                </Button>
                </SheetTrigger>
                < SheetContent side = "right" className = "bg-background/90 text-foreground border-l-white/20 w-[80vw]" >
                  <div className="flex flex-col gap-6 p-6" >
                    <a href="#" className = "flex items-center gap-2" >
                      <svg width="32" height = "32" viewBox = "0 0 32 32" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
                        <circle cx="16" cy = "16" r = "14" stroke = "currentColor" strokeWidth = "2" />
                          <circle cx="16" cy = "16" r = "8" stroke = "currentColor" strokeWidth = "2" />
                            </svg>
                            < span className = "font-headline text-xl font-bold" >
                              MeranoStays
                              </span>
                              </a>
                              < nav className = "flex flex-col gap-4" >
                              {
                                navLinks.map((link) => (
                                  <a
                            key= { link.name }
                            href = { link.href }
                            className = "font-body text-lg"
                            onClick = {(e) => {
                                  setOpen(false);
                              e.preventDefault();
                                  setTimeout(() => {
                                  const target = document.querySelector(link.href);
                                  if(target) {
                                    target.scrollIntoView({ behavior: "smooth" });
                                  }
                                }, 700);
                              }}
                          >
  { link.name }
  </a>
                        ))}
</nav>
  < DropdownMenu >
  <DropdownMenuTrigger asChild >
  <Button
                            variant="outline"
size = "lg"
className = "flex items-center gap-2 justify-start bg-transparent"
  >
  <Globe className="h-5 w-5" />
    <span>Language(EN) </span>
    < ChevronDown className = "h-4 w-4 ml-auto" />
      </Button>
      </DropdownMenuTrigger>
      < DropdownMenuContent align = "start" className = "w-56 bg-background/80 backdrop-blur-sm border-white/20 text-foreground" >
        <DropdownMenuItem>English </DropdownMenuItem>
        < DropdownMenuItem > Deutsch </DropdownMenuItem>
        < DropdownMenuItem > Italiano </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        </div>
        </SheetContent>
        </Sheet>
        </div>
        </div>
        </header>

{/* Add swipeable area behind the form */ }
<div 
            className="absolute inset-0 pointer-events-none z-0"
style = {{ pointerEvents: 'auto' }}
onTouchStart = { handleTouchStart }
onTouchMove = { handleTouchMove }
onTouchEnd = { handleTouchEnd }
  />

  <motion.div
              id="DesktopSearchForm"
className = "mt-8 w-full max-w-2xl"
initial = {{
  opacity: 0,
    filter: 'blur(12px)',
      scale: 0.98,
              }}
animate = {{
  opacity: 1,
    filter: 'blur(0px)',
      scale: 1,
              }}
transition = {{
  duration: 0.9,
    delay: 0.6,
      ease: [0.33, 1, 0.68, 1],
              }}
            >
  <Form { ...form } >
  <div className="grid md:grid-cols-2 gap-x-4 gap-y-2 mb-2 px-4" >
    <label className="text-white text-left text-base font-normal" > Arrival & Departure </label>
      < label className = "text-white text-left text-base font-normal" > Person </label>
        </div>
        < form
onSubmit = { form.handleSubmit(onSubmit) }
className = "grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-px rounded-2xl bg-white/20 p-1 backdrop-blur-sm"
  >
  <FormField
                    control={ form.control }
name = "dates"
render = {({ field }) => (
  <FormItem className= "flex flex-col justify-center bg-white rounded-l-xl" >
  <Popover>
  <PopoverTrigger asChild >
  <Button
                              id="date"
variant = { "ghost"}
className = {
  cn(
                                "h-12 w-full p-2 justify-start text-left font-normal text-foreground hover:bg-transparent rounded-r-none",
                                !date && "text-muted-foreground"
                              )}
                            >
  <Image src="/icons/calendarIcon.png" className = "mr-2" alt = "Search" width = { 24} height = { 24} />
    <span className="flex-grow" >
    {
      date?.from?(
        date.to ? (
          <>
          { format(date.from, "LLL dd, y") } - { " "}
                                      { format(date.to, "LLL dd, y") }
</>
                                  ) : (
  format(date.from, "LLL dd, y")
)
                                ) : (
  <span className= "font-light text-base text-gray-600" > Select Date </span>
                                )}
</span>
  </Button>
  </PopoverTrigger>
  < PopoverContent className = "w-auto p-0" align = "start" >
    <Calendar
                              initialFocus
mode = "range"
defaultMonth = { date?.from }
selected = { date }
onSelect = {(range) => {
  setDate(range);
  if (range?.from && range?.to) {
    field.onChange(range);
  }
}}
numberOfMonths = { 2}
  />
  </PopoverContent>
  </Popover>
  < FormMessage className = "text-red-500 font-bold px-2 text-xs" />
    </FormItem>
                    )}
                  />
  < FormField
control = { form.control }
aria - label="PersonSelect"
name = "guests"
render = {({ field }) => (
  <FormItem className= "flex flex-col justify-center bg-white" >
  <Select onValueChange={ field.onChange } defaultValue = { field.value } >
    <FormControl>
    <SelectTrigger className="select-trigger h-12 border-0 font-normal bg-white focus:ring-0 text-foreground rounded-none" >
      <div className="flex items-center gap-2 p-2 w-full font-light text-base text-gray-600" >
        <Image src="/icons/personIcon.png" className = "mr-2" alt = "Search" width = { 24} height = { 24} />
          <SelectValue placeholder="0 Person" />
            </div>
            </SelectTrigger>
            </FormControl>
            < SelectContent >
            <SelectItem value="0" > 0 Person </SelectItem>
{
  [...Array(8)].map((_, i) => (
    <SelectItem key= { i + 1} value = {(i + 1).toString()}> { i + 1} Person{ i > 0 && 's' } </SelectItem>
                            ))}
</SelectContent>
  </Select>
  < FormMessage className = "text-red-500 font-bold px-2 text-xs" />
    </FormItem>
                    )}
                  />
  < Button type = "submit" aria - label="Search" className = "w-16 h-auto py-0 my-0 text-sm font-bold bg-[#18191A] hover:bg-neutral-700 text-white rounded-r-2xl rounded-l-none" >
    <Image src="/icons/searchLcd.png" alt = "Search" width = { 24} height = { 24} />
      </Button>
      </form>
      </Form>
      < div className = "mb-48" > </div>
        </motion.div>
        </main>

{/* Mobile Search Form - Modified with better touch handling */ }
<main className="absolute bottom-0 w-full p-4 pointer-events-auto flex md:hidden relative z-10" >
  <motion.div
              className="w-full"
variants = { itemVariants }
  >
  <Form { ...form } >
  <form
                  onSubmit={ form.handleSubmit(onSubmit) }
className = "grid grid-cols-1 gap-4 rounded-2xl bg-white p-6"
  >
  <FormField
                    control={ form.control }
name = "dates"
render = {({ field }) => (
  <FormItem>
  <FormLabel className= "text-neutral-700" > Arrival & Departure </FormLabel>
  < Popover >
  <PopoverTrigger asChild >
  <FormControl>
  <Button
                                id="date"
variant = { "outline"}
aria - label="SelectDate"
className = {
  cn(
                                  "w-full justify-start text-left font-normal h-12",
                                  !date && "text-muted-foreground"
                                )}
                              >
  <Image src="/icons/calendarIcon.png" className = "-ml-1 mr-2" alt = "Search" width = { 24} height = { 24} />
  {
    date?.from?(
      date.to ? (
        <>
        { format(date.from, "LLL dd, y") } - { " "}
                                      { format(date.to, "LLL dd, y") }
</>
                                  ) : (
  format(date.from, "LLL dd, y")
)
                                ) : (
  <span>Select Date </span>
                                )}
</Button>
  </FormControl>
  </PopoverTrigger>
  < PopoverContent className = "w-auto p-0" align = "center" >
    <Calendar
                              initialFocus
mode = "range"
defaultMonth = { date?.from }
selected = { date }
onSelect = {(range) => {
  setDate(range);
  if (range?.from && range?.to) {
    field.onChange(range);
  }
}}
numberOfMonths = { 1}
  />
  </PopoverContent>
  </Popover>
  < FormMessage />
  </FormItem>
                    )}
                  />
  < FormField
control = { form.control }
name = "guests"
aria - label="PersonSelect"
render = {({ field }) => (
  <FormItem>
  <FormLabel className= "text-neutral-700" > Person </FormLabel>
  < Select onValueChange = { field.onChange } defaultValue = { field.value } >
    <FormControl>
    <SelectTrigger className="h-12" >
      <div className="flex items-center gap-2 font-light text-gray-600" >
        <Image src="/icons/personIcon.png" className = "mr-2" alt = "Search" width = { 24} height = { 24} />
          <SelectValue placeholder="0 Person" />
            </div>
            </SelectTrigger>
            </FormControl>
            < SelectContent >
            <SelectItem value="0" > 0 Person </SelectItem>
{
  [...Array(8)].map((_, i) => (
    <SelectItem key= { i + 1} value = {(i + 1).toString()}> { i + 1} Person{ i > 0 && 's' } </SelectItem>
                            ))}
</SelectContent>
  </Select>
  < FormMessage />
  </FormItem>
                    )}
                  />
  < Button aria - label="SearchMobileSz" type = "submit" size = "lg" className = "h-14 text-base font-extralight bg-[#18191A] hover:bg-neutral-700 text-white rounded-xl w-full" >
    <span className="mr-2" > Find It </span>
      < Image src = "/icons/searchLcd.png" alt = "Search" width = { 24} height = { 24} />
        </Button>
        </form>
        </Form>
        </motion.div>
        </main>

{/* Indicators */ }
<div className="absolute bottom-28 md:bottom-10 right-0 left-0 md:right-16 md:left-auto z-20 flex justify-center md:justify-start gap-2 pointer-events-auto" >
{
  heroContent.map((_, index) => (
    <button
                key= { index }
                onClick = {() => api?.scrollTo(index)}
className = {
  cn(
                  "h-1 w-6 rounded-full transition-colors hidden md:block",
    current === index ? "bg-white" : "bg-white/30"
                )}
aria - label={ `Go to slide ${index + 1}` }
              />
            ))}
</div>
  </div>
  </motion.section>
  < style jsx global > {`
        .select-trigger > svg {
          display: none;
        }
      `}</style>
  </>
  );
}