import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import SportsSection from "./Components/SportsSection";
import PromoSection from "./Components/PromoSection";
import Carousel from "./Components/Carousel";
import Footer from "./Components/Footer";
import PerformanceMonitor from "./Components/PerformanceMonitor";
import "./App.css";

import itemLive1 from "./assets/Images/item_live_1.jpg";
import itemLive2 from "./assets/Images/item_live_2.jpg";
import itemLive3 from "./assets/Images/item_live_3.jpg";
import itemLive4 from "./assets/Images/item_live_4.jpg";
import itemLive5 from "./assets/Images/item_live_1.jpg";
import itemLive6 from "./assets/Images/item_live_3.jpg";
import itemLive7 from "./assets/Images/item_live_4.jpg";
import itemLive8 from "./assets/Images/item_live_2.jpg";

import imageItem1 from "./assets/Images/item1.jpg";
import imageItem2 from "./assets/Images/item2.jpg";
import imageItem3 from "./assets/Images/item3.jpg";
import imageItem4 from "./assets/Images/item4.jpg";
import imageItem5 from "./assets/Images/item5.jpg";
import imageItem6 from "./assets/Images/item6.jpg";
import imageItem7 from "./assets/Images/item7.jpg";
import imageItem8 from "./assets/Images/item8.jpg";
import imageItem9 from "./assets/Images/item9.jpg";
import imageItem10 from "./assets/Images/item10.jpg";
import imageItem11 from "./assets/Images/item11.jpg";

// Mock data for carousels
const casinoGames = [
  {
    id: "1",
    title: "Majestic Safari",
    image: imageItem1,
    category: "Slots",
    provider: "Pragmatic Play",
  },
  {
    id: "2",
    title: "Fruit Blaze",
    image: imageItem2,
    category: "Slots",
    provider: "NetEnt",
  },
  {
    id: "3",
    title: "Zulu Gold",
    image: imageItem3,
    category: "Slots",
    provider: "ELK",
  },
  {
    id: "4",
    title: "Greek Legends",
    image: imageItem4,
    category: "Slots",
    provider: "Booming Games",
  },
  {
    id: "5",
    title: "Day of Dead",
    image: imageItem5,
    category: "Slots",
    provider: "Pragmatic Play",
  },
  {
    id: "6",
    title: "Zeus The Thunderer",
    image: imageItem6,
    category: "Slots",
    provider: "MrSlotty",
  },
];

const topRatedGames = [
  {
    id: "1",
    title: "Fate of Fortune",
    image: imageItem7,
    category: "Slots",
    provider: "ELK",
  },
  {
    id: "2",
    title: "Day of Dead",
    image: imageItem8,
    category: "Slots",
    provider: "Pragmatic Play",
  },
  {
    id: "3",
    title: "Full Moon Wild Track",
    image: imageItem9,
    category: "Slots",
    provider: "Playtech",
  },
  {
    id: "4",
    title: "Gonzos Quest",
    image: imageItem10,
    category: "Slots",
    provider: "NetEnt",
  },
  {
    id: "5",
    title: "Dazzle Me Megaways",
    image: imageItem11,
    category: "Megaways",
    provider: "NetEnt",
  },
  {
    id: "6",
    title: "Greek Legends",
    image: imageItem8,
    category: "Slots",
    provider: "Booming Games",
  },
];

const liveCasinoGames = [
  {
    id: "1",
    title: "Blackjack Classic",
    image: itemLive1,
    category: "Table Games",
    provider: "Pragmatic Play",
  },
  {
    id: "2",
    title: "Football Studio",
    image: itemLive2,
    category: "Game Shows",
    provider: "Evolution",
  },
  {
    id: "3",
    title: "Roulette Premium",
    image: itemLive3,
    category: "Table Games",
    provider: "Ezugi",
  },
  {
    id: "4",
    title: "Baccarat VIP",
    image: itemLive4,
    category: "Table Games",
    provider: "Pragmatic Play",
  },
  {
    id: "5",
    title: "Dream Catcher",
    image: itemLive5,
    category: "Game Shows",
    provider: "Evolution",
  },
  {
    id: "6",
    title: "Monopoly Live",
    image: itemLive6,
    category: "Game Shows",
    provider: "Evolution",
  },
  {
    id: "7",
    title: "Dream Catcher",
    image: itemLive7,
    category: "Game Shows",
    provider: "Evolution",
  },
  {
    id: "8",
    title: "Monopoly Live",
    image: itemLive8,
    category: "Game Shows",
    provider: "Evolution",
  },
];

function App() {
  return (
    <div className="App min-h-screen bg-custom-bg">
      <Header />
      <HeroSection />
      <SportsSection />
      <PromoSection />

      {/* Main Content Container */}
      <main className="bg-custom-bg mt-4">
        {/* Casino Games Section */}
        <section className="pb-6 md:pb-8 max-w-[1240px] mx-auto sm:px-12 px-4">
          <Carousel
            itemClassName="w-52 md:w-62 md:h-80"
            items={casinoGames}
            title="Casino"
            showAllLink={true}
          />
        </section>

        {/* Top Rated Games Section */}
        <section className="pb-6 md:pb-8 max-w-[1240px] mx-auto sm:px-12 px-4">
          <Carousel
            itemClassName="w-52 md:w-62 d:h-80"
            items={topRatedGames}
            title="Top Rated Games"
            showAllLink={true}
          />
        </section>

        {/* Live Casino Section */}
        <section className="pb-6 md:pb-8 max-w-[1240px] mx-auto sm:px-12 px-4">
          <Carousel
            itemClassName="w-52 md:w-[268px] md:h-44"
            items={liveCasinoGames}
            title="Live Casino"
            showAllLink={true}
          />
        </section>
      </main>

      <Footer />
      <PerformanceMonitor />
    </div>
  );
}

export default App;
