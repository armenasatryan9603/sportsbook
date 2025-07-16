import React from "react";
import Button from "./Button";

interface HeroSectionProps {
  className?: string;
}
import banner from "../assets/Images/banner.jpg";
import partner1 from "../assets/Images/partner1.jpg";
import partner2 from "../assets/Images/partner2.jpg";
import partner3 from "../assets/Images/partner3.jpg";

const HeroSection: React.FC<HeroSectionProps> = ({ className = "" }) => {
  return (
    <section
      className={`sm:px-12 px-4 max-w-[1240px] mx-auto bg-custom-bg text-white ${className}`}
    >
      <div className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-lg font-medium text-gray-300">
                SIGN UP & GET REWARD
              </h1>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl md:text-6xl font-bold text-white">
                  UP TO
                </span>
                <span className="text-4xl md:text-6xl font-bold text-emerald-400">
                  $ 20,000
                </span>
              </div>
            </div>

            <Button
              variant="accent"
              size="lg"
              className="mt-8 bg-pink-600 hover:bg-pink-700 w-52"
            >
              Create Account
            </Button>
          </div>

          {/* Right Content - Players Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Placeholder for player images */}
              <div className="flex space-x-4 mr-10 sm:mr-20">
                <img className="w-72 sm:w-[400px]" src={banner} alt="Players" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 space-y-4">
                <div className="w-12 sm:w-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <img src={partner1} alt="partner 1" />
                </div>
                <div className="w-12 sm:w-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <img src={partner2} alt="partner 2" />
                </div>
                <div className="w-12 sm:w-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <img src={partner3} alt="partner 3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
