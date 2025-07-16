import { useCallback, useMemo, useRef } from "react";
import { useAppDispatch } from "../store/hooks";
import { clearUpdateHighlight } from "../store/slices/matchesSlice";

// CSS class constants for better performance
const CSS_CLASSES = {
  UPDATED:
    "animate-pulse bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg transform scale-105 transition-all duration-500 will-change-transform",
  DEFAULT:
    "bg-[#2A253A] hover:bg-[#3A2F4A] transition-all duration-300 will-change-transform",
  FLASH:
    "animate-bounce shadow-xl shadow-green-500/50 ring-2 ring-green-400 will-change-transform",
  TEXT_UPDATED: "text-white font-bold",
  TEXT_DEFAULT: "text-white",
} as const;

// Timeout cache to prevent memory leaks
const timeoutCache = new Map<string, NodeJS.Timeout>();

export const useOddsAnimation = () => {
  const dispatch = useAppDispatch();
  const isUnmountedRef = useRef(false);

  // Cleanup function to clear all timeouts
  const cleanup = useCallback(() => {
    timeoutCache.forEach((timeout) => clearTimeout(timeout));
    timeoutCache.clear();
    isUnmountedRef.current = true;
  }, []);

  // Function to clear the highlight after animation duration
  const clearHighlight = useCallback(
    (matchId: string) => {
      // Clear any existing timeout for this match
      const existingTimeout = timeoutCache.get(matchId);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      // Set new timeout
      const timeoutId = setTimeout(() => {
        if (!isUnmountedRef.current) {
          dispatch(clearUpdateHighlight(matchId));
        }
        timeoutCache.delete(matchId);
      }, 2000); // Clear highlight after 2 seconds

      timeoutCache.set(matchId, timeoutId);
    },
    [dispatch]
  );

  // Memoized function to check if field should be updated
  const shouldUpdateField = useCallback(
    (
      isUpdated: boolean,
      field: "homeOdds" | "drawOdds" | "awayOdds",
      updatedField: "homeOdds" | "drawOdds" | "awayOdds" | null
    ): boolean => {
      return isUpdated && updatedField === field;
    },
    []
  );

  // Function to get animation classes based on update state
  const getAnimationClasses = useCallback(
    (
      isUpdated: boolean,
      field: "homeOdds" | "drawOdds" | "awayOdds",
      updatedField: "homeOdds" | "drawOdds" | "awayOdds" | null
    ): string => {
      return shouldUpdateField(isUpdated, field, updatedField)
        ? CSS_CLASSES.UPDATED
        : CSS_CLASSES.DEFAULT;
    },
    [shouldUpdateField]
  );

  // Function to get the flash effect for the entire odds button
  const getFlashEffect = useCallback(
    (
      isUpdated: boolean,
      field: "homeOdds" | "drawOdds" | "awayOdds",
      updatedField: "homeOdds" | "drawOdds" | "awayOdds" | null
    ): string => {
      return shouldUpdateField(isUpdated, field, updatedField)
        ? CSS_CLASSES.FLASH
        : "";
    },
    [shouldUpdateField]
  );

  // Function to get text color for updated odds
  const getTextColor = useCallback(
    (
      isUpdated: boolean,
      field: "homeOdds" | "drawOdds" | "awayOdds",
      updatedField: "homeOdds" | "drawOdds" | "awayOdds" | null
    ): string => {
      return shouldUpdateField(isUpdated, field, updatedField)
        ? CSS_CLASSES.TEXT_UPDATED
        : CSS_CLASSES.TEXT_DEFAULT;
    },
    [shouldUpdateField]
  );

  // Function to trigger automatic highlight clearing
  const triggerHighlightClear = useCallback(
    (matchId: string, updatedField: string | null) => {
      if (updatedField) {
        clearHighlight(matchId);
      }
    },
    [clearHighlight]
  );

  // Memoized return object
  const animationUtils = useMemo(
    () => ({
      getAnimationClasses,
      getFlashEffect,
      getTextColor,
      triggerHighlightClear,
      cleanup,
    }),
    [
      getAnimationClasses,
      getFlashEffect,
      getTextColor,
      triggerHighlightClear,
      cleanup,
    ]
  );

  return animationUtils;
};
