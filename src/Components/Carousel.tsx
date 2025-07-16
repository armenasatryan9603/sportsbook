import React, { useState, useRef } from "react";
import Button from "./Button";

interface CarouselItem {
  id: string;
  title: string;
  image: string;
  category?: string;
  provider?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  title?: string;
  showAllLink?: boolean;
  className?: string;
  itemClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  title,
  showAllLink = false,
  className = "",
  itemClassName = "",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 300;

      if (direction === "left") {
        scrollRef.current.scrollTo({
          left: scrollLeft - scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollTo({
          left: scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      }

      // Update button states
      setTimeout(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          setCanScrollLeft(scrollLeft > 0);
          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
      }, 100);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          {showAllLink && (
            <div className="flex items-center gap-1">
              <Button
                variant="secondary"
                size="sm"
                className=" bg-black hover:bg-gray-800 text-white flex items-center"
              >
                <span>All Games</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-8 px-0 bg-black hover:bg-gray-800 text-white flex items-center"
                disabled={!canScrollLeft}
                onClick={() => scroll("left")}
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>

              {/* Right Arrow */}
              <Button
                variant="secondary"
                size="sm"
                className="w-8 px-0 bg-black hover:bg-gray-800 text-white flex items-center"
                disabled={!canScrollRight}
                onClick={() => scroll("right")}
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="relative">
        {/* Left Arrow */}

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 md:space-x-6 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex-shrink-0 group cursor-pointer ${itemClassName}`}
            >
              <div className="h-full relative rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 bg-slate-800 border border-slate-700 hover:border-emerald-500">
                <img
                  src={item.image}
                  alt={item.title}
                  // className="w-full h-40 md:h-80 object-cover"
                  className="h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-white font-bold text-sm md:text-base mb-2 truncate">
                    {item.title}
                  </h3>
                  <div className="space-y-1">
                    {item.category && (
                      <p className="text-emerald-400 text-xs md:text-sm font-medium truncate">
                        {item.category}
                      </p>
                    )}
                    {item.provider && (
                      <p className="text-gray-300 text-xs md:text-sm truncate">
                        {item.provider}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
