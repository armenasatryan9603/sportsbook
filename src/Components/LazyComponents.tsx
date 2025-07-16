import { lazy } from "react";

// Lazy load components for better performance
export const LazyHeader = lazy(() => import("./Header"));
export const LazyHeroSection = lazy(() => import("./HeroSection"));
export const LazySportsSection = lazy(() => import("./SportsSection"));
export const LazyPromoSection = lazy(() => import("./PromoSection"));
export const LazyCarousel = lazy(() => import("./Carousel"));
export const LazyFooter = lazy(() => import("./Footer"));

// Preload components for better UX
export const preloadComponents = () => {
  import("./Header");
  import("./HeroSection");
  import("./SportsSection");
  import("./PromoSection");
  import("./Carousel");
  import("./Footer");
};
