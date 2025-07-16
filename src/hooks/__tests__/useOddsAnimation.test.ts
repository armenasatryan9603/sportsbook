import { renderHook, act } from "@testing-library/react";
import { useOddsAnimation } from "../useOddsAnimation";
import { clearUpdateHighlight } from "../../store/slices/matchesSlice";

// Mock the Redux action
jest.mock("../../store/slices/matchesSlice", () => ({
  clearUpdateHighlight: jest.fn(),
}));

// Mock useAppDispatch
const mockDispatch = jest.fn();
jest.mock("../../store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

describe("useOddsAnimation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe("initialization", () => {
    it("should return animation utility functions", () => {
      const { result } = renderHook(() => useOddsAnimation());

      expect(result.current).toHaveProperty("getAnimationClasses");
      expect(result.current).toHaveProperty("getFlashEffect");
      expect(result.current).toHaveProperty("getTextColor");
      expect(result.current).toHaveProperty("triggerHighlightClear");
      expect(result.current).toHaveProperty("cleanup");

      expect(typeof result.current.getAnimationClasses).toBe("function");
      expect(typeof result.current.getFlashEffect).toBe("function");
      expect(typeof result.current.getTextColor).toBe("function");
      expect(typeof result.current.triggerHighlightClear).toBe("function");
      expect(typeof result.current.cleanup).toBe("function");
    });

    it("should return memoized functions", () => {
      const { result, rerender } = renderHook(() => useOddsAnimation());

      const firstRender = result.current;

      rerender();

      const secondRender = result.current;

      expect(firstRender.getAnimationClasses).toBe(
        secondRender.getAnimationClasses
      );
      expect(firstRender.getFlashEffect).toBe(secondRender.getFlashEffect);
      expect(firstRender.getTextColor).toBe(secondRender.getTextColor);
      expect(firstRender.triggerHighlightClear).toBe(
        secondRender.triggerHighlightClear
      );
      expect(firstRender.cleanup).toBe(secondRender.cleanup);
    });
  });

  describe("getAnimationClasses", () => {
    it("should return updated classes when field matches", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const classes = result.current.getAnimationClasses(
        true,
        "homeOdds",
        "homeOdds"
      );

      expect(classes).toContain("animate-pulse");
      expect(classes).toContain("bg-gradient-to-r");
      expect(classes).toContain("from-green-400");
      expect(classes).toContain("to-blue-500");
      expect(classes).toContain("will-change-transform");
    });

    it("should return default classes when field does not match", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const classes = result.current.getAnimationClasses(
        true,
        "homeOdds",
        "drawOdds"
      );

      expect(classes).toContain("bg-[#2A253A]");
      expect(classes).toContain("hover:bg-[#3A2F4A]");
      expect(classes).toContain("transition-all");
      expect(classes).toContain("will-change-transform");
    });

    it("should return default classes when not updated", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const classes = result.current.getAnimationClasses(
        false,
        "homeOdds",
        "homeOdds"
      );

      expect(classes).toContain("bg-[#2A253A]");
      expect(classes).toContain("hover:bg-[#3A2F4A]");
    });

    it("should return default classes when updatedField is null", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const classes = result.current.getAnimationClasses(
        true,
        "homeOdds",
        null
      );

      expect(classes).toContain("bg-[#2A253A]");
      expect(classes).toContain("hover:bg-[#3A2F4A]");
    });
  });

  describe("getFlashEffect", () => {
    it("should return flash effect when field matches", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const effect = result.current.getFlashEffect(
        true,
        "drawOdds",
        "drawOdds"
      );

      expect(effect).toContain("animate-bounce");
      expect(effect).toContain("shadow-xl");
      expect(effect).toContain("shadow-green-500/50");
      expect(effect).toContain("ring-2");
      expect(effect).toContain("ring-green-400");
      expect(effect).toContain("will-change-transform");
    });

    it("should return empty string when field does not match", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const effect = result.current.getFlashEffect(
        true,
        "drawOdds",
        "homeOdds"
      );

      expect(effect).toBe("");
    });

    it("should return empty string when not updated", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const effect = result.current.getFlashEffect(
        false,
        "drawOdds",
        "drawOdds"
      );

      expect(effect).toBe("");
    });

    it("should return empty string when updatedField is null", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const effect = result.current.getFlashEffect(true, "drawOdds", null);

      expect(effect).toBe("");
    });
  });

  describe("getTextColor", () => {
    it("should return updated text color when field matches", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const color = result.current.getTextColor(true, "awayOdds", "awayOdds");

      expect(color).toBe("text-white font-bold");
    });

    it("should return default text color when field does not match", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const color = result.current.getTextColor(true, "awayOdds", "homeOdds");

      expect(color).toBe("text-white");
    });

    it("should return default text color when not updated", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const color = result.current.getTextColor(false, "awayOdds", "awayOdds");

      expect(color).toBe("text-white");
    });

    it("should return default text color when updatedField is null", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const color = result.current.getTextColor(true, "awayOdds", null);

      expect(color).toBe("text-white");
    });
  });

  describe("triggerHighlightClear", () => {
    it("should call clearHighlight when updatedField is provided", () => {
      const { result } = renderHook(() => useOddsAnimation());

      act(() => {
        result.current.triggerHighlightClear("match-1", "homeOdds");
      });

      // Should schedule a timeout to clear highlight
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);

      // Fast forward to trigger the timeout
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        clearUpdateHighlight("match-1")
      );
    });

    it("should not call clearHighlight when updatedField is null", () => {
      const { result } = renderHook(() => useOddsAnimation());

      act(() => {
        result.current.triggerHighlightClear("match-1", null);
      });

      expect(setTimeout).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("should not call clearHighlight when updatedField is empty string", () => {
      const { result } = renderHook(() => useOddsAnimation());

      act(() => {
        result.current.triggerHighlightClear("match-1", "");
      });

      expect(setTimeout).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe("timeout management", () => {
    it("should clear existing timeout when setting new one for same match", () => {
      const { result } = renderHook(() => useOddsAnimation());

      // Set first timeout
      act(() => {
        result.current.triggerHighlightClear("match-1", "homeOdds");
      });

      expect(setTimeout).toHaveBeenCalledTimes(1);

      // Set second timeout for same match
      act(() => {
        result.current.triggerHighlightClear("match-1", "drawOdds");
      });

      // Should clear the previous timeout
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledTimes(2);
    });

    it("should not dispatch when component is unmounted", () => {
      const { result, unmount } = renderHook(() => useOddsAnimation());

      act(() => {
        result.current.triggerHighlightClear("match-1", "homeOdds");
      });

      // Unmount component
      unmount();

      // Fast forward to trigger the timeout
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      // Should not dispatch after unmount
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("should handle multiple matches with different timeouts", () => {
      const { result } = renderHook(() => useOddsAnimation());

      // Set timeouts for different matches
      act(() => {
        result.current.triggerHighlightClear("match-1", "homeOdds");
        result.current.triggerHighlightClear("match-2", "drawOdds");
      });

      expect(setTimeout).toHaveBeenCalledTimes(2);

      // Fast forward to trigger both timeouts
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith(
        clearUpdateHighlight("match-1")
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        clearUpdateHighlight("match-2")
      );
    });
  });

  describe("cleanup", () => {
    it("should clear all timeouts when cleanup is called", () => {
      const { result } = renderHook(() => useOddsAnimation());

      // Set multiple timeouts
      act(() => {
        result.current.triggerHighlightClear("match-1", "homeOdds");
        result.current.triggerHighlightClear("match-2", "drawOdds");
        result.current.triggerHighlightClear("match-3", "awayOdds");
      });

      expect(setTimeout).toHaveBeenCalledTimes(3);

      // Call cleanup
      act(() => {
        result.current.cleanup();
      });

      // Should clear all timeouts
      expect(clearTimeout).toHaveBeenCalledTimes(3);

      // Fast forward - should not dispatch anything
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("should mark component as unmounted after cleanup", () => {
      const { result } = renderHook(() => useOddsAnimation());

      // Set timeout before cleanup
      act(() => {
        result.current.triggerHighlightClear("match-1", "homeOdds");
      });

      // Call cleanup
      act(() => {
        result.current.cleanup();
      });

      // Set new timeout after cleanup
      act(() => {
        result.current.triggerHighlightClear("match-2", "drawOdds");
      });

      // Fast forward to trigger timeout
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      // Should not dispatch because component is marked as unmounted
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe("performance", () => {
    it("should return same reference for same parameters", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const classes1 = result.current.getAnimationClasses(
        true,
        "homeOdds",
        "homeOdds"
      );
      const classes2 = result.current.getAnimationClasses(
        true,
        "homeOdds",
        "homeOdds"
      );

      // Should be same reference due to memoization
      expect(classes1).toBe(classes2);
    });

    it("should return different references for different parameters", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const classes1 = result.current.getAnimationClasses(
        true,
        "homeOdds",
        "homeOdds"
      );
      const classes2 = result.current.getAnimationClasses(
        true,
        "drawOdds",
        "drawOdds"
      );

      // Should be different references
      expect(classes1).not.toBe(classes2);
    });
  });

  describe("edge cases", () => {
    it("should handle all possible field combinations", () => {
      const { result } = renderHook(() => useOddsAnimation());

      const fields: Array<"homeOdds" | "drawOdds" | "awayOdds"> = [
        "homeOdds",
        "drawOdds",
        "awayOdds",
      ];

      fields.forEach((field) => {
        fields.forEach((updatedField) => {
          const classes = result.current.getAnimationClasses(
            true,
            field,
            updatedField
          );
          const effect = result.current.getFlashEffect(
            true,
            field,
            updatedField
          );
          const color = result.current.getTextColor(true, field, updatedField);

          expect(typeof classes).toBe("string");
          expect(typeof effect).toBe("string");
          expect(typeof color).toBe("string");
        });
      });
    });

    it("should handle undefined and null values gracefully", () => {
      const { result } = renderHook(() => useOddsAnimation());

      // Test with undefined
      const classes1 = result.current.getAnimationClasses(
        true,
        "homeOdds",
        undefined as any
      );
      const effect1 = result.current.getFlashEffect(
        true,
        "homeOdds",
        undefined as any
      );
      const color1 = result.current.getTextColor(
        true,
        "homeOdds",
        undefined as any
      );

      expect(classes1).toContain("bg-[#2A253A]");
      expect(effect1).toBe("");
      expect(color1).toBe("text-white");

      // Test with null
      const classes2 = result.current.getAnimationClasses(
        true,
        "homeOdds",
        null
      );
      const effect2 = result.current.getFlashEffect(true, "homeOdds", null);
      const color2 = result.current.getTextColor(true, "homeOdds", null);

      expect(classes2).toContain("bg-[#2A253A]");
      expect(effect2).toBe("");
      expect(color2).toBe("text-white");
    });
  });
});
