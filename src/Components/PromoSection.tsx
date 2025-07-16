import React from "react";
import Button from "./Button";
import casinoBanner1 from "../assets/Images/casinoBanner1.jpg";
import casinoBanner2 from "../assets/Images/casinoBanner2.jpg";

interface PromoSectionProps {
  className?: string;
}

interface PromoItemProps {
  title: string;
  description: string;
  banner: string;
}

const PromoItem = ({ title, description, banner }: PromoItemProps) => {
  return (
    <div className=" relative overflow-hidden rounded-lg">
      <div className="relative bg-gradient-to-r from-purple-600 to-purple-800 min-h-[330px] flex flex-col justify-between">
        {/* Background Image - positioned to the right */}
        <div
          className="md:h-[400px] absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,500)), url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Content */}
        <div className="z-10 p-8 flex flex-col w-full absolute -bottom-4 h-fit">
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-xl">🎰</span>
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>

            <p className="text-white/90 text-sm max-w-sm leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 text-base"
            >
              ⚽ Sport
            </Button>
            <Button
              variant="accent"
              size="lg"
              className="w-1/2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 text-base"
            >
              📺 Live
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PromoSection: React.FC<PromoSectionProps> = ({ className = "" }) => {
  return (
    <section
      className={`sm:px-12 px-4 max-w-[1240px] mx-auto mt-8 bg-custom-bg ${className}`}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Casino Promo */}
          <PromoItem
            title="Casino"
            description="Dive in to our wide range of in-house games, live casino and slots to experience a thrilling casino adventure."
            banner={casinoBanner1}
          />
          <PromoItem
            title="Sport"
            description="Dive in to our wide range of in-house games, live casino and slots to experience a thrilling casino adventure."
            banner={casinoBanner2}
          />
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
