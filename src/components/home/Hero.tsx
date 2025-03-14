
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  // Auto-rotate slides
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <div className="relative h-[60vh] md:h-[500px] overflow-hidden">
      {/* Slide Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="container-custom h-full relative z-10 flex flex-col justify-center items-center text-center text-white">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">{slide.subtitle}</p>
        <Link to={slide.link}>
          <Button size="lg" className="bg-niraa-600 hover:bg-niraa-700 text-white">
            {slide.buttonText}
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Hero;
