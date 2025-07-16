import React, { useState } from "react";
import Button from "./Button";
import LanguageDropdown from "./LanguageDropdown";

const Logo = () => {
  return (
    <div className="flex-shrink-0 pr-10 ml-2.5 sm:ml-0">
      <div className="flex items-center">
        <span className="text-xs font-bold text-red-500">MAXX</span>
        <span className="text-xs font-bold text-white">BET360</span>
      </div>
    </div>
  );
};

// Icon components
const SportIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const LiveIcon = () => (
  <div className="flex items-center">
    <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
    <span className="text-xs font-bold">LIVE</span>
  </div>
);

const CasinoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

const LiveCasinoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    <circle cx="18" cy="6" r="2" fill="red" />
  </svg>
);

const VirtualGamesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 6.5C15.5 5.67 14.83 5 14 5s-1.5.67-1.5 1.5S13.17 8 14 8s1.5-.67 1.5-1.5zM19.5 12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-3-6c-.83 0-1.5.67-1.5 1.5S15.67 8 16.5 8 18 7.33 18 6.5 17.33 5 16.5 5zM7.5 14c.83 0 1.5-.67 1.5-1.5S8.33 11 7.5 11 6 11.67 6 12.5 6.67 14 7.5 14zm0-9C6.67 5 6 5.67 6 6.5S6.67 8 7.5 8 9 7.33 9 6.5 8.33 5 7.5 5zm12 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1z" />
  </svg>
);

const PromotionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState("sport");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "sport", label: "Sport", icon: <SportIcon /> },
    { id: "live", label: "Live", icon: <LiveIcon /> },
    { id: "casino", label: "Casino", icon: <CasinoIcon /> },
    { id: "live-casino", label: "Live Casino", icon: <LiveCasinoIcon /> },
    { id: "virtual-games", label: "Virtual Games", icon: <VirtualGamesIcon /> },
    { id: "promotion", label: "Promotion", icon: <PromotionIcon /> },
  ];

  return (
    <header className={"bg-custom-dark text-white shadow-lg sticky top-0 z-50"}>
      <div className="container mx-auto">
        <div className="mx-auto max-w-[1146px] flex items-center justify-between h-14 sm:h-16 lg:h-18">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="h-full hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigationItems.map((item) => (
              <>
                {item.id === "promotion" && (
                  <div className="border-l-[1px] h-4 border-gray-700"></div>
                )}
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`!m-0 h-full rounded-none flex items-center px-3 xl:px-4 py-2 font-medium transition-colors duration-200 relative ${
                    activeTab === item.id
                      ? "text-emerald-400"
                      : "text-gray-300 hover:text-white hover:bg-slate-800"
                  } ${item.id === "promotion" ? "!text-[#B98D1B]" : ""}`}
                >
                  <span className="mx-1.5">{item.icon}</span>
                  <span className="whitespace-nowrap text-sm">
                    {item.label}
                  </span>
                  {activeTab === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"></div>
                  )}
                </button>
              </>
            ))}
          </nav>

          {/* Tablet Navigation (simplified) */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1">
            {navigationItems.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1 px-2 py-2 text-xs font-medium rounded-lg transition-colors duration-200 relative ${
                  activeTab === item.id
                    ? "text-emerald-400"
                    : "text-gray-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span className="flex items-center">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
                {activeTab === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"></div>
                )}
              </button>
            ))}
            <div className="relative">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center space-x-1 px-2 py-2 text-xs font-medium rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200"
              >
                <span className="text-base">⋯</span>
                <span>More</span>
              </button>
            </div>
          </nav>

          {/* Right Side - Language, Login, Sign Up */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <LanguageDropdown />

            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-300 border-white border-[1px] hover:bg-slate-800 hover:text-white text-xs sm:text-xs px-3 sm:px-4"
              >
                Login
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-xs px-3 sm:px-4"
              >
                Sign up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden lg:hidden text-white hover:text-gray-300 p-2 -m-2 rounded-lg transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation with Animation */}
        <div
          className={`md:hidden lg:hidden border-t border-slate-800 absolute left-0 right-0 bg-custom-dark shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen
              ? "max-h-[calc(100vh-4rem)] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <div className="px-3 sm:px-4 py-3 space-y-1 overflow-y-auto">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-3 py-3 text-xs font-medium rounded-lg transition-all duration-200 relative transform ${
                  activeTab === item.id
                    ? "text-emerald-400"
                    : "text-gray-300 hover:text-white hover:bg-slate-800"
                } ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <span className="flex items-center">{item.icon}</span>
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <div className="absolute !m-0 bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"></div>
                )}
              </button>
            ))}

            <div className="pt-4 pb-2 space-y-2 border-t border-slate-800 mt-4">
              <Button
                variant="outline"
                size="md"
                className="w-full text-gray-300 border-gray-600 hover:bg-slate-800 hover:text-white justify-center"
              >
                Login
              </Button>
              <Button
                variant="primary"
                size="md"
                className="w-full bg-emerald-600 hover:bg-emerald-700 justify-center"
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>

        {/* Tablet More Menu with Animation */}
        <div
          className={`hidden md:block lg:hidden border-t border-slate-800 absolute left-0 right-0 bg-custom-dark shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <div className="px-4 py-3 space-y-1">
            {navigationItems.slice(4).map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 relative transform ${
                  activeTab === item.id
                    ? "text-emerald-400 bg-slate-800/50"
                    : "text-gray-300 hover:text-white hover:bg-slate-800"
                } ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <span className="flex items-center">{item.icon}</span>
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
