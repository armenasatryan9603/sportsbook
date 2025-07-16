import matchesReducer, {
  updateRandomOdds,
  clearUpdateHighlight,
  updateSpecificOdds,
} from "../matchesSlice";

// Mock Math.random for predictable tests
const mockMath = Object.create(global.Math);
mockMath.random = jest.fn(() => 0.5);
global.Math = mockMath;

describe("matchesSlice", () => {
  const initialState = {
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
        updatedField: null,
        lastUpdated: 0,
      },
      {
        id: "2",
        homeTeam: "West Ham",
        awayTeam: "Arsenal",
        homeOdds: "1.87",
        drawOdds: "1.87",
        awayOdds: "1.87",
        date: "Feb 2, 2024",
        time: "00:00",
        league: "Premier League",
        partner1: "/src/assets/images/partnerLogos/logo2.jpg",
        partner2: "/src/assets/images/partnerLogos/logo3.jpg",
        updatedField: null,
        lastUpdated: 0,
      },
    ],
    isUpdating: false,
  };

  beforeEach(() => {
    // Reset Math.random mock
    (Math.random as jest.Mock).mockReturnValue(0.5);
    // Mock Date.now
    jest.spyOn(Date, "now").mockReturnValue(1234567890);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("initial state", () => {
    it("should return the initial state", () => {
      expect(matchesReducer(undefined, { type: "unknown" })).toEqual(
        expect.objectContaining({
          matches: expect.any(Array),
          isUpdating: false,
        })
      );
    });

    it("should have correct initial matches structure", () => {
      const state = matchesReducer(undefined, { type: "unknown" });
      expect(state.matches).toHaveLength(4);
      expect(state.matches[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          homeTeam: expect.any(String),
          awayTeam: expect.any(String),
          homeOdds: expect.any(String),
          drawOdds: expect.any(String),
          awayOdds: expect.any(String),
          updatedField: null,
          lastUpdated: 0,
        })
      );
    });
  });

  describe("updateRandomOdds", () => {
    it("should update random odds and set isUpdating to true", () => {
      // Mock Math.random to return specific values
      (Math.random as jest.Mock)
        .mockReturnValueOnce(0) // Select first match
        .mockReturnValueOnce(0) // Select homeOdds
        .mockReturnValueOnce(0.5); // Generate odds value 2.25

      const action = updateRandomOdds();
      const state = matchesReducer(initialState, action);

      expect(state.isUpdating).toBe(true);
      expect(state.matches[0].homeOdds).toBe("2.25");
      expect(state.matches[0].updatedField).toBe("homeOdds");
      expect(state.matches[0].lastUpdated).toBe(1234567890);
    });

    it("should update drawOdds when random selects it", () => {
      (Math.random as jest.Mock)
        .mockReturnValueOnce(0.5) // Select second match
        .mockReturnValueOnce(0.5) // Select drawOdds
        .mockReturnValueOnce(0.8); // Generate odds value 2.70

      const action = updateRandomOdds();
      const state = matchesReducer(initialState, action);

      expect(state.matches[1].drawOdds).toBe("2.70");
      expect(state.matches[1].updatedField).toBe("drawOdds");
      expect(state.matches[1].lastUpdated).toBe(1234567890);
    });

    it("should update awayOdds when random selects it", () => {
      (Math.random as jest.Mock)
        .mockReturnValueOnce(0.9) // Select last match
        .mockReturnValueOnce(0.9) // Select awayOdds
        .mockReturnValueOnce(0.3); // Generate odds value 1.95

      const action = updateRandomOdds();
      const state = matchesReducer(initialState, action);

      expect(state.matches[1].awayOdds).toBe("1.95");
      expect(state.matches[1].updatedField).toBe("awayOdds");
      expect(state.matches[1].lastUpdated).toBe(1234567890);
    });

    it("should generate odds between 1.50 and 3.00", () => {
      // Test minimum value
      (Math.random as jest.Mock)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0); // Should generate 1.50

      let action = updateRandomOdds();
      let state = matchesReducer(initialState, action);
      expect(state.matches[0].homeOdds).toBe("1.50");

      // Test maximum value
      (Math.random as jest.Mock)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(1); // Should generate 3.00

      action = updateRandomOdds();
      state = matchesReducer(initialState, action);
      expect(state.matches[0].homeOdds).toBe("3.00");
    });
  });

  describe("clearUpdateHighlight", () => {
    it("should clear update highlight for specified match", () => {
      const stateWithUpdate = {
        ...initialState,
        matches: [
          {
            ...initialState.matches[0],
            updatedField: "homeOdds" as const,
          },
          ...initialState.matches.slice(1),
        ],
        isUpdating: true,
      };

      const action = clearUpdateHighlight("1");
      const state = matchesReducer(stateWithUpdate, action);

      expect(state.matches[0].updatedField).toBe(null);
      expect(state.isUpdating).toBe(false);
    });

    it("should not affect other matches", () => {
      const stateWithUpdate = {
        ...initialState,
        matches: [
          {
            ...initialState.matches[0],
            updatedField: "homeOdds" as const,
          },
          {
            ...initialState.matches[1],
            updatedField: "drawOdds" as const,
          },
        ],
        isUpdating: true,
      };

      const action = clearUpdateHighlight("1");
      const state = matchesReducer(stateWithUpdate, action);

      expect(state.matches[0].updatedField).toBe(null);
      expect(state.matches[1].updatedField).toBe("drawOdds");
    });

    it("should handle non-existent match ID gracefully", () => {
      const action = clearUpdateHighlight("999");
      const state = matchesReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isUpdating: false,
      });
    });
  });

  describe("updateSpecificOdds", () => {
    it("should update specific odds field", () => {
      const action = updateSpecificOdds({
        matchId: "1",
        field: "homeOdds",
        value: "2.50",
      });
      const state = matchesReducer(initialState, action);

      expect(state.matches[0].homeOdds).toBe("2.50");
      expect(state.matches[0].updatedField).toBe("homeOdds");
      expect(state.matches[0].lastUpdated).toBe(1234567890);
    });

    it("should update drawOdds field", () => {
      const action = updateSpecificOdds({
        matchId: "2",
        field: "drawOdds",
        value: "3.25",
      });
      const state = matchesReducer(initialState, action);

      expect(state.matches[1].drawOdds).toBe("3.25");
      expect(state.matches[1].updatedField).toBe("drawOdds");
      expect(state.matches[1].lastUpdated).toBe(1234567890);
    });

    it("should update awayOdds field", () => {
      const action = updateSpecificOdds({
        matchId: "1",
        field: "awayOdds",
        value: "1.75",
      });
      const state = matchesReducer(initialState, action);

      expect(state.matches[0].awayOdds).toBe("1.75");
      expect(state.matches[0].updatedField).toBe("awayOdds");
      expect(state.matches[0].lastUpdated).toBe(1234567890);
    });

    it("should handle non-existent match ID gracefully", () => {
      const action = updateSpecificOdds({
        matchId: "999",
        field: "homeOdds",
        value: "2.50",
      });
      const state = matchesReducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it("should not affect other matches", () => {
      const action = updateSpecificOdds({
        matchId: "1",
        field: "homeOdds",
        value: "2.50",
      });
      const state = matchesReducer(initialState, action);

      expect(state.matches[0].homeOdds).toBe("2.50");
      expect(state.matches[1].homeOdds).toBe("1.87"); // Should remain unchanged
    });
  });

  describe("state immutability", () => {
    it("should not mutate the original state", () => {
      const originalState = { ...initialState };
      const action = updateRandomOdds();

      matchesReducer(initialState, action);

      expect(initialState).toEqual(originalState);
    });

    it("should create new state objects", () => {
      const action = updateRandomOdds();
      const newState = matchesReducer(initialState, action);

      expect(newState).not.toBe(initialState);
      expect(newState.matches).not.toBe(initialState.matches);
      expect(newState.matches[0]).not.toBe(initialState.matches[0]);
    });
  });
});
