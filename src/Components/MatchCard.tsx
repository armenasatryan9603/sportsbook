import React, { memo } from "react";
import type { Match } from "../store/slices/matchesSlice";
import { useOddsAnimation } from "../hooks/useOddsAnimation";
import ball from "../assets/images/ball.jpg";
import logo1 from "../assets/images/partnerLogos/logo1.jpg";
import logo2 from "../assets/images/partnerLogos/logo2.jpg";
import logo3 from "../assets/images/partnerLogos/logo3.jpg";

interface MatchCardProps {
  match: Match;
}

// Memoize logo mapping for performance
const logoMap = {
  logo1,
  logo2,
  logo3,
} as const;

const getLogoImage = (logoPath: string) => {
  if (logoPath.includes("logo1")) return logoMap.logo1;
  if (logoPath.includes("logo2")) return logoMap.logo2;
  if (logoPath.includes("logo3")) return logoMap.logo3;
  return logoMap.logo1; // fallback
};

const MatchCard: React.FC<MatchCardProps> = memo(({ match }) => {
  const { getAnimationClasses, getFlashEffect, getTextColor } =
    useOddsAnimation();
  const hasUpdate = !!match.updatedField;

  return (
    <div className="match-card bg-[#130D25] backdrop-blur-sm rounded-2xl p-6 hover:bg-slate-800 transition-all duration-300 border border-slate-700/50 shadow-xl gpu-accelerated">
      {/* League and Date Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <img className="w-4 h-4" src={ball} alt="league" />
          <span className="text-xs text-gray-400 font-medium">
            {match.league}
          </span>
        </div>
        <span className="text-xs text-gray-400">{match.date}</span>
      </div>

      {/* Teams */}
      <div className="grid grid-cols-3 mb-6 justify-items-center">
        <div className="flex flex-col items-start space-y-3">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-[#2A253A]">
            <img
              className="w-6 h-6"
              src={getLogoImage(match.partner1)}
              alt="logo"
            />
          </div>
          <span
            title={match.homeTeam}
            className="text-white font-semibold text-xs line-clamp-1"
          >
            {match.homeTeam}
          </span>
        </div>

        <span className="mt-4 text-gray-400 text-md font-medium text-center">
          vs
        </span>

        <div className="flex flex-col items-end space-y-3">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-[#2A253A]">
            <img
              className="w-6 h-6"
              src={getLogoImage(match.partner2)}
              alt="logo"
            />
          </div>
          <span
            title={match.awayTeam}
            className="text-white font-semibold text-xs line-clamp-1"
          >
            {match.awayTeam}
          </span>
        </div>
      </div>

      {/* Betting Odds */}
      <div className="flex gap-2 mx-auto">
        <button
          className={`odds-button w-1/3 px-2 py-1 rounded-md flex justify-center items-center gap-2 ${getAnimationClasses(
            hasUpdate,
            "homeOdds",
            match.updatedField
          )} ${getFlashEffect(hasUpdate, "homeOdds", match.updatedField)}`}
        >
          <div className="text-sm text-gray-400">1</div>
          <div
            className={`text-sm ${getTextColor(
              hasUpdate,
              "homeOdds",
              match.updatedField
            )}`}
          >
            {match.homeOdds}
          </div>
        </button>
        <button
          className={`odds-button w-1/3 px-2 py-1 rounded-md flex justify-center items-center gap-2 ${getAnimationClasses(
            hasUpdate,
            "drawOdds",
            match.updatedField
          )} ${getFlashEffect(hasUpdate, "drawOdds", match.updatedField)}`}
        >
          <div className="text-sm text-gray-400">X</div>
          <div
            className={`text-sm ${getTextColor(
              hasUpdate,
              "drawOdds",
              match.updatedField
            )}`}
          >
            {match.drawOdds}
          </div>
        </button>
        <button
          className={`odds-button w-1/3 px-2 py-1 rounded-md flex justify-center items-center gap-2 ${getAnimationClasses(
            hasUpdate,
            "awayOdds",
            match.updatedField
          )} ${getFlashEffect(hasUpdate, "awayOdds", match.updatedField)}`}
        >
          <div className="text-sm text-gray-400">2</div>
          <div
            className={`text-sm ${getTextColor(
              hasUpdate,
              "awayOdds",
              match.updatedField
            )}`}
          >
            {match.awayOdds}
          </div>
        </button>
      </div>
    </div>
  );
});

MatchCard.displayName = "MatchCard";

export default MatchCard;
