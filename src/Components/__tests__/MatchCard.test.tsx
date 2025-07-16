import { render, screen } from "@testing-library/react";
import MatchCard from "../MatchCard";
import type { Match } from "../../store/slices/matchesSlice";

// Mock the useOddsAnimation hook
const mockAnimationHook = {
  getAnimationClasses: jest.fn(),
  getFlashEffect: jest.fn(),
  getTextColor: jest.fn(),
};

jest.mock("../../hooks/useOddsAnimation", () => ({
  useOddsAnimation: () => mockAnimationHook,
}));

// Mock image imports
jest.mock("../../assets/images/ball.jpg", () => "ball.jpg");
jest.mock("../../assets/images/partnerLogos/logo1.jpg", () => "logo1.jpg");
jest.mock("../../assets/images/partnerLogos/logo2.jpg", () => "logo2.jpg");
jest.mock("../../assets/images/partnerLogos/logo3.jpg", () => "logo3.jpg");

describe("MatchCard", () => {
  const mockMatch: Match = {
    id: "1",
    homeTeam: "Chelsea",
    awayTeam: "Liverpool",
    homeOdds: "1.87",
    drawOdds: "2.10",
    awayOdds: "2.50",
    date: "Feb 2, 2024",
    time: "00:00",
    league: "Premier League",
    partner1: "/src/assets/images/partnerLogos/logo1.jpg",
    partner2: "/src/assets/images/partnerLogos/logo2.jpg",
    updatedField: null,
    lastUpdated: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Set up default mock returns
    mockAnimationHook.getAnimationClasses.mockReturnValue(
      "bg-[#2A253A] hover:bg-[#3A2F4A] transition-all duration-300"
    );
    mockAnimationHook.getFlashEffect.mockReturnValue("");
    mockAnimationHook.getTextColor.mockReturnValue("text-white");
  });

  describe("rendering", () => {
    it("should render match information correctly", () => {
      render(<MatchCard match={mockMatch} />);

      expect(screen.getByText("Chelsea")).toBeInTheDocument();
      expect(screen.getByText("Liverpool")).toBeInTheDocument();
      expect(screen.getByText("Premier League")).toBeInTheDocument();
      expect(screen.getByText("Feb 2, 2024")).toBeInTheDocument();
      expect(screen.getByText("vs")).toBeInTheDocument();
    });

    it("should render odds buttons with correct values", () => {
      render(<MatchCard match={mockMatch} />);

      expect(screen.getByText("1.87")).toBeInTheDocument();
      expect(screen.getByText("2.10")).toBeInTheDocument();
      expect(screen.getByText("2.50")).toBeInTheDocument();

      expect(screen.getByText("1")).toBeInTheDocument(); // Home odds label
      expect(screen.getByText("X")).toBeInTheDocument(); // Draw odds label
      expect(screen.getByText("2")).toBeInTheDocument(); // Away odds label
    });

    it("should render team logos", () => {
      render(<MatchCard match={mockMatch} />);

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(3); // 2 team logos + 1 league ball

      const teamLogos = images.filter(
        (img) => img.getAttribute("alt") === "logo"
      );
      expect(teamLogos).toHaveLength(2);
    });

    it("should render league icon", () => {
      render(<MatchCard match={mockMatch} />);

      const leagueIcon = screen.getByAltText("league");
      expect(leagueIcon).toBeInTheDocument();
      expect(leagueIcon).toHaveAttribute("src", "ball.jpg");
    });

    it("should have correct CSS classes for styling", () => {
      const { container } = render(<MatchCard match={mockMatch} />);

      const matchCard = container.firstChild as HTMLElement;
      expect(matchCard).toHaveClass("match-card");
      expect(matchCard).toHaveClass("bg-[#130D25]");
      expect(matchCard).toHaveClass("backdrop-blur-sm");
      expect(matchCard).toHaveClass("rounded-2xl");
      expect(matchCard).toHaveClass("gpu-accelerated");
    });
  });

  describe("logo mapping", () => {
    it("should map logo1 correctly", () => {
      const matchWithLogo1 = {
        ...mockMatch,
        partner1: "/src/assets/images/partnerLogos/logo1.jpg",
      };

      render(<MatchCard match={matchWithLogo1} />);

      const teamLogos = screen.getAllByAltText("logo");
      expect(teamLogos[0]).toHaveAttribute("src", "logo1.jpg");
    });

    it("should map logo2 correctly", () => {
      const matchWithLogo2 = {
        ...mockMatch,
        partner2: "/src/assets/images/partnerLogos/logo2.jpg",
      };

      render(<MatchCard match={matchWithLogo2} />);

      const teamLogos = screen.getAllByAltText("logo");
      expect(teamLogos[1]).toHaveAttribute("src", "logo2.jpg");
    });

    it("should map logo3 correctly", () => {
      const matchWithLogo3 = {
        ...mockMatch,
        partner1: "/src/assets/images/partnerLogos/logo3.jpg",
      };

      render(<MatchCard match={matchWithLogo3} />);

      const teamLogos = screen.getAllByAltText("logo");
      expect(teamLogos[0]).toHaveAttribute("src", "logo3.jpg");
    });

    it("should fallback to logo1 for unknown logos", () => {
      const matchWithUnknownLogo = {
        ...mockMatch,
        partner1: "/src/assets/images/partnerLogos/unknown.jpg",
      };

      render(<MatchCard match={matchWithUnknownLogo} />);

      const teamLogos = screen.getAllByAltText("logo");
      expect(teamLogos[0]).toHaveAttribute("src", "logo1.jpg");
    });
  });

  describe("team name tooltips", () => {
    it("should add title attribute to team names for tooltips", () => {
      render(<MatchCard match={mockMatch} />);

      const homeTeamSpan = screen.getByText("Chelsea");
      const awayTeamSpan = screen.getByText("Liverpool");

      expect(homeTeamSpan).toHaveAttribute("title", "Chelsea");
      expect(awayTeamSpan).toHaveAttribute("title", "Liverpool");
    });

    it("should have line-clamp-1 class for text truncation", () => {
      render(<MatchCard match={mockMatch} />);

      const homeTeamSpan = screen.getByText("Chelsea");
      const awayTeamSpan = screen.getByText("Liverpool");

      expect(homeTeamSpan).toHaveClass("line-clamp-1");
      expect(awayTeamSpan).toHaveClass("line-clamp-1");
    });
  });

  describe("animation integration", () => {
    it("should call animation hooks with correct parameters when not updated", () => {
      render(<MatchCard match={mockMatch} />);

      expect(mockAnimationHook.getAnimationClasses).toHaveBeenCalledWith(
        false,
        "homeOdds",
        null
      );
      expect(mockAnimationHook.getAnimationClasses).toHaveBeenCalledWith(
        false,
        "drawOdds",
        null
      );
      expect(mockAnimationHook.getAnimationClasses).toHaveBeenCalledWith(
        false,
        "awayOdds",
        null
      );

      expect(mockAnimationHook.getFlashEffect).toHaveBeenCalledWith(
        false,
        "homeOdds",
        null
      );
      expect(mockAnimationHook.getFlashEffect).toHaveBeenCalledWith(
        false,
        "drawOdds",
        null
      );
      expect(mockAnimationHook.getFlashEffect).toHaveBeenCalledWith(
        false,
        "awayOdds",
        null
      );

      expect(mockAnimationHook.getTextColor).toHaveBeenCalledWith(
        false,
        "homeOdds",
        null
      );
      expect(mockAnimationHook.getTextColor).toHaveBeenCalledWith(
        false,
        "drawOdds",
        null
      );
      expect(mockAnimationHook.getTextColor).toHaveBeenCalledWith(
        false,
        "awayOdds",
        null
      );
    });

    it("should call animation hooks with correct parameters when homeOdds updated", () => {
      const updatedMatch = {
        ...mockMatch,
        updatedField: "homeOdds" as const,
        lastUpdated: 1234567890,
      };

      render(<MatchCard match={updatedMatch} />);

      expect(mockAnimationHook.getAnimationClasses).toHaveBeenCalledWith(
        true,
        "homeOdds",
        "homeOdds"
      );
      expect(mockAnimationHook.getAnimationClasses).toHaveBeenCalledWith(
        true,
        "drawOdds",
        "homeOdds"
      );
      expect(mockAnimationHook.getAnimationClasses).toHaveBeenCalledWith(
        true,
        "awayOdds",
        "homeOdds"
      );

      expect(mockAnimationHook.getFlashEffect).toHaveBeenCalledWith(
        true,
        "homeOdds",
        "homeOdds"
      );
      expect(mockAnimationHook.getFlashEffect).toHaveBeenCalledWith(
        true,
        "drawOdds",
        "homeOdds"
      );
      expect(mockAnimationHook.getFlashEffect).toHaveBeenCalledWith(
        true,
        "awayOdds",
        "homeOdds"
      );

      expect(mockAnimationHook.getTextColor).toHaveBeenCalledWith(
        true,
        "homeOdds",
        "homeOdds"
      );
      expect(mockAnimationHook.getTextColor).toHaveBeenCalledWith(
        true,
        "drawOdds",
        "homeOdds"
      );
      expect(mockAnimationHook.getTextColor).toHaveBeenCalledWith(
        true,
        "awayOdds",
        "homeOdds"
      );
    });

    it("should apply animation classes to odds buttons", () => {
      mockAnimationHook.getAnimationClasses.mockReturnValue(
        "animate-pulse bg-gradient-to-r from-green-400 to-blue-500"
      );
      mockAnimationHook.getFlashEffect.mockReturnValue(
        "animate-bounce shadow-xl"
      );

      render(<MatchCard match={mockMatch} />);

      const oddsButtons = screen.getAllByRole("button");
      expect(oddsButtons).toHaveLength(3);

      oddsButtons.forEach((button) => {
        expect(button).toHaveClass("odds-button");
        expect(button.className).toContain("animate-pulse");
        expect(button.className).toContain("bg-gradient-to-r");
        expect(button.className).toContain("animate-bounce");
        expect(button.className).toContain("shadow-xl");
      });
    });

    it("should apply text color classes to odds values", () => {
      mockAnimationHook.getTextColor.mockReturnValue("text-white font-bold");

      render(<MatchCard match={mockMatch} />);

      const oddsValues = [
        screen.getByText("1.87"),
        screen.getByText("2.10"),
        screen.getByText("2.50"),
      ];

      oddsValues.forEach((value) => {
        expect(value).toHaveClass("text-white");
        expect(value).toHaveClass("font-bold");
      });
    });
  });

  describe("memoization", () => {
    it("should be memoized with React.memo", () => {
      const { rerender } = render(<MatchCard match={mockMatch} />);

      const initialCalls =
        mockAnimationHook.getAnimationClasses.mock.calls.length;

      // Rerender with same props
      rerender(<MatchCard match={mockMatch} />);

      // Should not call hooks again due to memoization
      expect(mockAnimationHook.getAnimationClasses).toHaveBeenCalledTimes(
        initialCalls
      );
    });

    it("should re-render when match prop changes", () => {
      const { rerender } = render(<MatchCard match={mockMatch} />);

      const initialCalls =
        mockAnimationHook.getAnimationClasses.mock.calls.length;

      // Rerender with different props
      const newMatch = { ...mockMatch, homeTeam: "Arsenal" };
      rerender(<MatchCard match={newMatch} />);

      // Should call hooks again due to prop change
      expect(mockAnimationHook.getAnimationClasses).toHaveBeenCalledTimes(
        initialCalls * 2
      );
    });
  });

  describe("accessibility", () => {
    it("should have proper button roles", () => {
      render(<MatchCard match={mockMatch} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);

      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("role", "button");
      });
    });

    it("should have proper image alt attributes", () => {
      render(<MatchCard match={mockMatch} />);

      const leagueIcon = screen.getByAltText("league");
      expect(leagueIcon).toBeInTheDocument();

      const logoImages = screen.getAllByAltText("logo");
      expect(logoImages).toHaveLength(2);
    });
  });

  describe("edge cases", () => {
    it("should handle empty team names", () => {
      const matchWithEmptyNames = {
        ...mockMatch,
        homeTeam: "",
        awayTeam: "",
      };

      render(<MatchCard match={matchWithEmptyNames} />);

      // Should still render structure
      expect(screen.getByText("vs")).toBeInTheDocument();
      expect(screen.getByText("Premier League")).toBeInTheDocument();
    });

    it("should handle missing odds values", () => {
      const matchWithMissingOdds = {
        ...mockMatch,
        homeOdds: "",
        drawOdds: "",
        awayOdds: "",
      };

      render(<MatchCard match={matchWithMissingOdds} />);

      // Should still render buttons structure
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);

      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("X")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("should handle very long team names", () => {
      const matchWithLongNames = {
        ...mockMatch,
        homeTeam: "Very Long Team Name That Should Be Truncated",
        awayTeam: "Another Very Long Team Name That Should Be Truncated",
      };

      render(<MatchCard match={matchWithLongNames} />);

      const homeTeamSpan = screen.getByText(
        "Very Long Team Name That Should Be Truncated"
      );
      const awayTeamSpan = screen.getByText(
        "Another Very Long Team Name That Should Be Truncated"
      );

      expect(homeTeamSpan).toHaveClass("line-clamp-1");
      expect(awayTeamSpan).toHaveClass("line-clamp-1");
    });

    it("should handle different update field values", () => {
      const updateFields: Array<"homeOdds" | "drawOdds" | "awayOdds"> = [
        "homeOdds",
        "drawOdds",
        "awayOdds",
      ];

      updateFields.forEach((field) => {
        const updatedMatch = {
          ...mockMatch,
          updatedField: field,
          lastUpdated: Date.now(),
        };

        render(<MatchCard match={updatedMatch} />);

        expect(mockAnimationHook.getAnimationClasses).toHaveBeenCalledWith(
          true,
          field,
          field
        );
        expect(mockAnimationHook.getFlashEffect).toHaveBeenCalledWith(
          true,
          field,
          field
        );
        expect(mockAnimationHook.getTextColor).toHaveBeenCalledWith(
          true,
          field,
          field
        );
      });
    });
  });
});
