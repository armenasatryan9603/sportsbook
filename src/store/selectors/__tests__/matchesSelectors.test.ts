import type { RootState } from "../../store";
import {
  selectMatches,
  selectIsUpdating,
  selectUpdatedMatches,
  selectMatchById,
  selectMatchesCount,
  selectLastUpdatedMatch,
  selectOddsValues,
} from "../matchesSelectors";

describe("matchesSelectors", () => {
  const mockState: RootState = {
    matches: {
      matches: [
        {
          id: "1",
          homeTeam: "Chelsea",
          awayTeam: "Liverpool",
          homeOdds: "1.87",
          drawOdds: "1.87",
          awayOdds: "1.87",
          date: "Feb 2, 2024",
          time: "00:00",
          league: "Premier League",
          partner1: "/src/assets/images/partnerLogos/logo1.jpg",
          partner2: "/src/assets/images/partnerLogos/logo2.jpg",
          updatedField: "homeOdds",
          lastUpdated: 1234567890,
        },
        {
          id: "2",
          homeTeam: "West Ham",
          awayTeam: "Arsenal",
          homeOdds: "2.50",
          drawOdds: "3.25",
          awayOdds: "1.75",
          date: "Feb 2, 2024",
          time: "00:00",
          league: "Premier League",
          partner1: "/src/assets/images/partnerLogos/logo2.jpg",
          partner2: "/src/assets/images/partnerLogos/logo3.jpg",
          updatedField: null,
          lastUpdated: 0,
        },
        {
          id: "3",
          homeTeam: "Manchester United",
          awayTeam: "Tottenham",
          homeOdds: "1.95",
          drawOdds: "2.10",
          awayOdds: "2.80",
          date: "Feb 3, 2024",
          time: "15:00",
          league: "Premier League",
          partner1: "/src/assets/images/partnerLogos/logo3.jpg",
          partner2: "/src/assets/images/partnerLogos/logo1.jpg",
          updatedField: "drawOdds",
          lastUpdated: 1234567999,
        },
      ],
      isUpdating: true,
    },
    filters: {
      filters: {
        teamSearch: "",
        dateFilter: "",
        leagueFilter: "",
        sortBy: null,
        sortDirection: "asc",
      },
    },
  };

  describe("selectMatches", () => {
    it("should return all matches", () => {
      const result = selectMatches(mockState);
      expect(result).toEqual(mockState.matches.matches);
      expect(result).toHaveLength(3);
    });

    it("should be memoized", () => {
      const result1 = selectMatches(mockState);
      const result2 = selectMatches(mockState);
      expect(result1).toBe(result2); // Same reference for memoization
    });

    it("should return new reference when matches change", () => {
      const result1 = selectMatches(mockState);

      const newState = {
        ...mockState,
        matches: {
          ...mockState.matches,
          matches: [
            ...mockState.matches.matches,
            {
              id: "4",
              homeTeam: "Brighton",
              awayTeam: "Newcastle",
              homeOdds: "2.00",
              drawOdds: "2.00",
              awayOdds: "2.00",
              date: "Feb 4, 2024",
              time: "18:00",
              league: "Premier League",
              partner1: "/src/assets/images/partnerLogos/logo1.jpg",
              partner2: "/src/assets/images/partnerLogos/logo2.jpg",
              updatedField: null,
              lastUpdated: 0,
            },
          ],
        },
      };

      const result2 = selectMatches(newState);
      expect(result1).not.toBe(result2);
      expect(result2).toHaveLength(4);
    });
  });

  describe("selectIsUpdating", () => {
    it("should return isUpdating status", () => {
      const result = selectIsUpdating(mockState);
      expect(result).toBe(true);
    });

    it("should be memoized", () => {
      const result1 = selectIsUpdating(mockState);
      const result2 = selectIsUpdating(mockState);
      expect(result1).toBe(result2);
    });

    it("should return false when not updating", () => {
      const newState = {
        ...mockState,
        matches: {
          ...mockState.matches,
          isUpdating: false,
        },
      };

      const result = selectIsUpdating(newState);
      expect(result).toBe(false);
    });
  });

  describe("selectUpdatedMatches", () => {
    it("should return only matches with updates", () => {
      const result = selectUpdatedMatches(mockState);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("3");
    });

    it("should return empty array when no matches are updated", () => {
      const newState = {
        ...mockState,
        matches: {
          ...mockState.matches,
          matches: mockState.matches.matches.map((match) => ({
            ...match,
            updatedField: null,
          })),
        },
      };

      const result = selectUpdatedMatches(newState);
      expect(result).toHaveLength(0);
    });

    it("should be memoized", () => {
      const result1 = selectUpdatedMatches(mockState);
      const result2 = selectUpdatedMatches(mockState);
      expect(result1).toBe(result2);
    });
  });

  describe("selectMatchById", () => {
    it("should return specific match by id", () => {
      const selector = selectMatchById("2");
      const result = selector(mockState);

      expect(result).toBeDefined();
      expect(result!.id).toBe("2");
      expect(result!.homeTeam).toBe("West Ham");
    });

    it("should return undefined for non-existent match", () => {
      const selector = selectMatchById("999");
      const result = selector(mockState);

      expect(result).toBeUndefined();
    });

    it("should be memoized", () => {
      const selector = selectMatchById("1");
      const result1 = selector(mockState);
      const result2 = selector(mockState);

      expect(result1).toBe(result2);
    });

    it("should return different instances for different IDs", () => {
      const selector1 = selectMatchById("1");
      const selector2 = selectMatchById("2");

      const result1 = selector1(mockState);
      const result2 = selector2(mockState);

      expect(result1).not.toBe(result2);
      expect(result1!.id).toBe("1");
      expect(result2!.id).toBe("2");
    });
  });

  describe("selectMatchesCount", () => {
    it("should return the count of matches", () => {
      const result = selectMatchesCount(mockState);
      expect(result).toBe(3);
    });

    it("should be memoized", () => {
      const result1 = selectMatchesCount(mockState);
      const result2 = selectMatchesCount(mockState);
      expect(result1).toBe(result2);
    });

    it("should return 0 for empty matches", () => {
      const emptyState = {
        ...mockState,
        matches: {
          ...mockState.matches,
          matches: [],
        },
      };

      const result = selectMatchesCount(emptyState);
      expect(result).toBe(0);
    });
  });

  describe("selectLastUpdatedMatch", () => {
    it("should return the most recently updated match", () => {
      const result = selectLastUpdatedMatch(mockState);
      expect(result).toBeDefined();
      expect(result.id).toBe("3");
      expect(result.lastUpdated).toBe(1234567999);
    });

    it("should handle matches with same lastUpdated time", () => {
      const sameTimeState = {
        ...mockState,
        matches: {
          ...mockState.matches,
          matches: mockState.matches.matches.map((match) => ({
            ...match,
            lastUpdated: 1234567890,
          })),
        },
      };

      const result = selectLastUpdatedMatch(sameTimeState);
      expect(result).toBeDefined();
      expect(result.id).toBe("1"); // Should return the first one
    });

    it("should be memoized", () => {
      const result1 = selectLastUpdatedMatch(mockState);
      const result2 = selectLastUpdatedMatch(mockState);
      expect(result1).toBe(result2);
    });

    it("should return first match when all have lastUpdated = 0", () => {
      const zeroState = {
        ...mockState,
        matches: {
          ...mockState.matches,
          matches: mockState.matches.matches.map((match) => ({
            ...match,
            lastUpdated: 0,
          })),
        },
      };

      const result = selectLastUpdatedMatch(zeroState);
      expect(result.id).toBe("1");
    });
  });

  describe("selectOddsValues", () => {
    it("should return odds values with minimal data", () => {
      const result = selectOddsValues(mockState);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        id: "1",
        homeOdds: "1.87",
        drawOdds: "1.87",
        awayOdds: "1.87",
        updatedField: "homeOdds",
        lastUpdated: 1234567890,
      });
    });

    it("should not include team names and other non-odds data", () => {
      const result = selectOddsValues(mockState);

      expect(result[0]).not.toHaveProperty("homeTeam");
      expect(result[0]).not.toHaveProperty("awayTeam");
      expect(result[0]).not.toHaveProperty("league");
      expect(result[0]).not.toHaveProperty("partner1");
      expect(result[0]).not.toHaveProperty("partner2");
    });

    it("should be memoized", () => {
      const result1 = selectOddsValues(mockState);
      const result2 = selectOddsValues(mockState);
      expect(result1).toBe(result2);
    });

    it("should return empty array for empty matches", () => {
      const emptyState = {
        ...mockState,
        matches: {
          ...mockState.matches,
          matches: [],
        },
      };

      const result = selectOddsValues(emptyState);
      expect(result).toEqual([]);
    });
  });

  describe("selector performance", () => {
    it("should not recompute when unrelated state changes", () => {
      const selector = selectMatches;

      // Create a spy to track selector calls
      const selectorSpy = jest.fn(selector);

      // Call selector with original state
      const result1 = selectorSpy(mockState);

      // Change unrelated state
      const newState = {
        ...mockState,
        matches: {
          ...mockState.matches,
          isUpdating: !mockState.matches.isUpdating, // Only change isUpdating
        },
      };

      // Call selector again
      const result2 = selectorSpy(newState);

      // Should return same reference (memoized)
      expect(result1).toBe(result2);
    });

    it("should recompute when relevant state changes", () => {
      const selector = selectMatches;

      // Original result
      const result1 = selector(mockState);

      // Change matches array
      const newState = {
        ...mockState,
        matches: {
          ...mockState.matches,
          matches: [...mockState.matches.matches.slice(0, 2)], // Remove last match
        },
      };

      // Should return new reference
      const result2 = selector(newState);
      expect(result1).not.toBe(result2);
      expect(result2).toHaveLength(2);
    });
  });
});
