import React, { useEffect, useCallback, useMemo, memo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useOddsUpdateService } from "../services/oddsUpdateService";
import { useOddsAnimation } from "../hooks/useOddsAnimation";
import { selectMatches } from "../store/selectors/matchesSelectors";
import { selectSortedAndFilteredMatches } from "../store/selectors/filtersSelectors";
import MatchCard from "./MatchCard";
import MatchFilters from "./MatchFilters";

interface SportsSectionProps {
  className?: string;
}

const SportsSection: React.FC<SportsSectionProps> = memo(
  ({ className = "" }) => {
    const dispatch = useAppDispatch();
    // Use memoized selector for better performance
    const matches = useAppSelector(selectMatches);
    const filteredAndSortedMatches = useAppSelector(
      selectSortedAndFilteredMatches
    );

    // Track previous matches state to detect new updates
    const prevMatchesRef = useRef<typeof matches>([]);

    // Memoize service hooks
    const oddsService = useMemo(
      () => ({
        ...useOddsUpdateService(dispatch),
      }),
      [dispatch]
    );

    const { triggerHighlightClear, cleanup } = useOddsAnimation();

    // Memoize the start and stop functions
    const startService = useCallback(() => {
      oddsService.start();
    }, [oddsService]);

    const stopService = useCallback(() => {
      oddsService.stop();
      cleanup(); // Clean up animation timeouts
    }, [oddsService, cleanup]);

    // Start the real-time odds update service when component mounts
    useEffect(() => {
      startService();
      return stopService;
    }, [startService, stopService]);

    // Only trigger highlight clearing for newly updated matches
    useEffect(() => {
      const prevMatches = prevMatchesRef.current;

      // Find matches that have been newly updated (not just any matches with updatedField)
      const newlyUpdatedMatches = matches.filter((match) => {
        const prevMatch = prevMatches.find((prev) => prev.id === match.id);
        return (
          match.updatedField &&
          match.lastUpdated &&
          (!prevMatch || prevMatch.lastUpdated !== match.lastUpdated)
        );
      });

      // Only trigger highlight clearing for newly updated matches
      if (newlyUpdatedMatches.length > 0) {
        const timeoutId = setTimeout(() => {
          newlyUpdatedMatches.forEach((match) => {
            triggerHighlightClear(match.id, match.updatedField);
          });
        }, 100); // Small delay to batch updates

        // Clean up timeout on unmount or dependency change
        return () => clearTimeout(timeoutId);
      }

      // Update the previous matches reference
      prevMatchesRef.current = matches;
    }, [matches, triggerHighlightClear]);

    // Memoize the grid classes
    const gridClasses = useMemo(
      () => "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
      []
    );

    // Memoize the section classes
    const sectionClasses = useMemo(
      () => `sm:px-12 px-4 max-w-[1240px] mx-auto relative -mt-6 ${className}`,
      [className]
    );

    return (
      <section className={sectionClasses}>
        <div className="container mx-auto">
          <MatchFilters />
          <div className={gridClasses}>
            {filteredAndSortedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>
    );
  }
);

SportsSection.displayName = "SportsSection";

export default SportsSection;
