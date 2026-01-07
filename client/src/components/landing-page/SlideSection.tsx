import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import slide1 from "../../../public/slides/slide-1.webp";
import slide2 from "../../../public/slides/slide-2.webp";
import slide3 from "../../../public/slides/slide-3.webp";
import slide4 from "../../../public/slides/slide-4.webp";
import slide5 from "../../../public/slides/slide-5.webp";
import slide6 from "../../../public/slides/slide-6.webp";

const slides = [
  { src: slide1, title: "UploadXam | Solusi Digital" },
  { src: slide2, title: "Background & Abstract" },
  { src: slide3, title: "The Problems" },
  { src: slide4, title: "Our Solutions" },
  { src: slide5, title: "Product Preview" },
  { src: slide6, title: "Thank You" },
];

const SlidesSection = () => {
  return (
    <section className="to-bg-background bg-black bg-gradient-to-b from-black/40 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <span className="mb-3 inline-block rounded-full border border-red-500 bg-red-700 px-3 py-1 text-xs font-medium text-red-200 sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm">
            Presentation
          </span>
          <h2 className="mb-3 bg-gradient-to-br from-red-100 to-red-700 bg-clip-text py-4 text-2xl font-bold tracking-tight text-transparent sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            Ini Platform Apa Sih Kak?
          </h2>
          <p className="mx-auto max-w-2xl px-2 text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
            Yuk, simak presentasi singkat tentang UploadXam dan bagaimana
            platform ini dapat membantu kamu dalam mengakses berbagai soal ujian
            dengan mudah dan efisien.
          </p>
        </div>

        {/* Carousel */}
        <Carousel className="mx-auto w-full max-w-4xl">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <Card className="mx-2 overflow-hidden border-2 border-red-500/30 bg-gradient-to-br from-gray-900 via-red-950/20 to-gray-900 p-0 shadow-xl shadow-red-900/20 backdrop-blur-sm transition-all hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-900/30 sm:mx-0">
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={slide.src.src}
                        alt={slide.title}
                        className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="border-t border-red-800/40 bg-gradient-to-b from-gray-900 to-black p-3 text-center sm:p-4">
                      <p className="font-mono text-xs text-red-300/70 sm:text-sm">
                        Slide {index + 1} of {slides.length}
                      </p>
                      <h3 className="mt-1 bg-gradient-to-r from-red-200 via-red-100 to-red-200 bg-clip-text text-base font-semibold text-transparent sm:text-lg">
                        {slide.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 h-8 w-8 rounded-full border border-red-500/60 bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg shadow-red-500/30 transition-all hover:border-red-400 hover:from-red-600 hover:to-red-800 hover:shadow-red-500/50 focus-visible:ring-2 focus-visible:ring-red-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:left-2 sm:h-10 sm:w-10 md:-left-12" />
          <CarouselNext className="right-0 h-8 w-8 rounded-full border border-red-500/60 bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg shadow-red-500/30 transition-all hover:border-red-400 hover:from-red-600 hover:to-red-800 hover:shadow-red-500/50 focus-visible:ring-2 focus-visible:ring-red-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:right-2 sm:h-10 sm:w-10 md:-right-12" />
        </Carousel>

        {/* Slide indicators */}
        <div className="mt-4 flex justify-center gap-1.5 sm:mt-6 sm:gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SlidesSection;
