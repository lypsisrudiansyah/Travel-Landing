"use client"
import React from 'react';
import useMasonry from './useMasonry';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";


const TestimonySection = () => {
  const masonryContainer = useMasonry();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const testimonials = [
    {
      name: "Sab",
      avatar: "https://placehold.co/64x64.png",
      imageHint: "woman portrait",
      text: "Absolutely great accommodation in one of the most beautiful villas! Spacious, spacious, quiet and very clean. Dorothea is such a gracious and friendly host. Thanks for that. The location is unbeatable. We felt more than comfortable and would come back any time. \n \n \n ",
      bgColor: "bg-[#707577]",
      textColor: "text-white",
    },
    {
      name: "Katja",
      avatar: "https://placehold.co/64x64.png",
      imageHint: "woman portrait black and white",
      text: "Beautiful little apartment in an old villa. I didn't miss anything. You can walk quickly to the city and also fix the mountains thanks to the good public transport. Despite the heat, it was pleasantly cool in the apartment. \n",
      bgColor: "bg-white",
      textColor: "text-black",
    },
    {
      name: "Wibke",
      avatar: "https://placehold.co/64x64.png",
      imageHint: "woman smiling",
      text: "Super nice hostess, perfect location, cozy place to stay in a great property - we will be happy to come back 😍 \n\n",
      bgColor: "bg-white",
      textColor: "text-black",
    },

    {
      name: "Dieter",
      avatar: "https://placehold.co/64x64.png",
      imageHint: "couple smiling",
      text: "One of the most beautiful apartments we have experienced on airbnb in 10 years. Dorothea is also a very lovely hostess. Full score!!! \n",
      bgColor: "bg-white",
      textColor: "text-black",
    },
    {
      name: "Michael",
      avatar: "https://placehold.co/64x64.png",
      imageHint: "man smiling blue shirt",
      text: "Very charming and beautiful place to stay just a few minutes from the center. We will be happy to come back.",
      bgColor: "bg-white",
      textColor: "text-black",
    },
    {
      name: "Michael",
      avatar: "https://placehold.co/64x64.png",
      imageHint: "man smiling",
      text: "I have been in the apartment for the second time. I feel very comfortable there, great starting point for hikes around Merano and in Ulten. Very quiet and yet very centrally located. I'd love to come back :) \n",
      bgColor: "bg-white",
      textColor: "text-black",
    },
    {
      name: "Laura",
      avatar: "https://placehold.co/64x64.png",
      imageHint: "woman smiling looking away",
      text: "Dorothea's house is beautiful and clean, original and very well-kept in every detail, the villa where it is charming and surrounded by greenery, the neighborhood is quiet and feels like walking in a forest but at the same time it is very close to the center and the magnificent paths and gardens of Merano. The owners are attentive, thoughtful, and kind! A great stay!",
      bgColor: "bg-neutral-100",
      textColor: "text-black",
    },
  ];

  const splitIntoCustomColumns = (data: any[], columnPattern: number[]) => {
    const columns: any[][] = columnPattern.map(() => []);
    let dataIndex = 0;
    for (let i = 0; i < columnPattern.length; i++) {
      for (let j = 0; j < columnPattern[i]; j++) {
        if (dataIndex < data.length) {
          columns[i].push(data[dataIndex]);
          dataIndex++;
        }
      }
    }
    return columns;
  };

  const columnPattern = [2, 3, 2]; // pola kolom 2-3-2
  const testimonialColumns = splitIntoCustomColumns(testimonials, columnPattern);

  return (
    <div className="py-12 md:py-24 mx-4 md:mx-28">
      {/* Header */}
      <div className="text-left md:text-center mb-6 md:mb-12">
        <h2 className="text-3xl font-medium md:text-5xl font-bold text-gray-900 mb-8">
          What Our Guests Say At StayMeran
        </h2>
        <p className="text-base font-light md:text-lg md:font-normal text-gray-600">
          We take pride in providing an exceptional stay for our guests. See what they have to say about their experiences and why they choose to return.
        </p>
      </div>

      {/* Masonry Layout - Desktop */}
      <div
        ref={masonryContainer}
        className="hidden md:grid items-start gap-4 sm:grid-cols-3 md:gap-6"
      >
        {testimonialColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6 w-full">
            {column.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-lg break-inside-avoid-column border-[1.8px] border-gray-200",
                  testimonial.bgColor,
                  testimonial.textColor
                )}
              >
                <p className="text-lg font-light leading-[2.5]">
                  {testimonial.text.split("\n").map((line: any, idx: any) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className={
                    cn("text-lg font-medium",
                      testimonial.textColor
                    )
                  }>{testimonial.name}</span>
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                    data-ai-hint={testimonial.imageHint}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Carousel Layout - Mobile */}
      <div className="md:hidden">
        <Carousel setApi={setApi} className="w-full max-w-md mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="">
                  <Card className={cn("rounded-xl border-[1.9px] border-gray-200",
                    testimonial.bgColor,
                  )}>
                    <CardContent className="flex flex-col justify-between p-5 h-[22rem]">
                      <p className={cn("text-lg leading-loose line-clamp-5",
                        testimonial.textColor
                      )}>
                        {testimonial.text}
                      </p>
                      <div className="flex items-center justify-between mt-6">
                        <span className={cn("text-lg font-medium",
                          testimonial.textColor
                        )}>{testimonial.name}</span>
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="rounded-xl"
                          data-ai-hint={testimonial.imageHint}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-[3px] w-6  rounded-full transition-all",
                current === index ? "bg-gray-800" : "bg-gray-300"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonySection;
