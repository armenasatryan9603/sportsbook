import { createSelector } from "reselect";
import type { RootState } from "../store";
import { selectMatches } from "./matchesSelectors";

// Base selector for filters state
const selectFiltersState = (state: RootState) => state.filters;

// Selector for current filters
export const selectFilters = createSelector(
  [selectFiltersState],
  (filtersState) => filtersState.filters
);

// Selector for filtered matches (before sorting)
export const selectFilteredMatches = createSelector(
  [selectMatches, selectFilters],
  (matches, filters) => {
    return matches.filter((match) => {
      // Filter by team search (search in both home and away teams)
      if (filters.teamSearch.trim()) {
        const searchTerm = filters.teamSearch.toLowerCase();
        const homeTeamMatches = match.homeTeam
          .toLowerCase()
          .includes(searchTerm);
        const awayTeamMatches = match.awayTeam
          .toLowerCase()
          .includes(searchTerm);
        if (!homeTeamMatches && !awayTeamMatches) {
          return false;
        }
      }

      // Filter by date
      if (filters.dateFilter.trim()) {
        if (match.date !== filters.dateFilter) {
          return false;
        }
      }

      // Filter by league
      if (filters.leagueFilter.trim()) {
        if (match.league !== filters.leagueFilter) {
          return false;
        }
      }

      return true;
    });
  }
);

// Selector for sorted and filtered matches (final result)
export const selectSortedAndFilteredMatches = createSelector(
  [selectFilteredMatches, selectFilters],
  (filteredMatches, filters) => {
    if (!filters.sortBy) {
      return filteredMatches;
    }

    const sortedMatches = [...filteredMatches].sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case "date":
          // Convert date strings to Date objects for proper comparison
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          comparison = dateA.getTime() - dateB.getTime();
          break;
        case "team":
          // Sort by home team name
          comparison = a.homeTeam.localeCompare(b.homeTeam);
          break;
        case "league":
          comparison = a.league.localeCompare(b.league);
          break;
        default:
          return 0;
      }

      return filters.sortDirection === "asc" ? comparison : -comparison;
    });

    return sortedMatches;
  }
);

// Selector for unique leagues (for filter dropdown)
export const selectUniqueLeagues = createSelector(
  [selectMatches],
  (matches) => {
    const leagues = matches.map((match) => match.league);
    return [...new Set(leagues)].sort();
  }
);

// Selector for unique dates (for filter dropdown)
export const selectUniqueDates = createSelector([selectMatches], (matches) => {
  const dates = matches.map((match) => match.date);
  return [...new Set(dates)].sort();
});

// Selector for matches count with filters applied
export const selectFilteredMatchesCount = createSelector(
  [selectFilteredMatches],
  (filteredMatches) => filteredMatches.length
);

// Selector to check if any filters are active
export const selectHasActiveFilters = createSelector(
  [selectFilters],
  (filters) => {
    return (
      filters.teamSearch.trim() !== "" ||
      filters.dateFilter.trim() !== "" ||
      filters.leagueFilter.trim() !== "" ||
      filters.sortBy !== null
    );
  }
);

// Selector for filter status (for UI feedback)
export const selectFilterStatus = createSelector(
  [selectMatches, selectFilteredMatches, selectFilters],
  (allMatches, filteredMatches, filters) => ({
    totalMatches: allMatches.length,
    filteredMatches: filteredMatches.length,
    hasActiveFilters:
      filters.teamSearch.trim() !== "" ||
      filters.dateFilter.trim() !== "" ||
      filters.leagueFilter.trim() !== "" ||
      filters.sortBy !== null,
    isFiltered: filteredMatches.length < allMatches.length,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
  })
);
