import { createSelector } from "reselect";
import type { RootState } from "../store";

// Base selectors
const selectMatchesState = (state: RootState) => state.matches;

// Memoized selectors
export const selectMatches = createSelector(
  [selectMatchesState],
  (matchesState) => matchesState.matches
);

export const selectIsUpdating = createSelector(
  [selectMatchesState],
  (matchesState) => matchesState.isUpdating
);

// Selector for matches with updates
export const selectUpdatedMatches = createSelector([selectMatches], (matches) =>
  matches.filter((match) => match.updatedField !== null)
);

// Selector for a specific match by id
export const selectMatchById = (matchId: string) =>
  createSelector([selectMatches], (matches) =>
    matches.find((match) => match.id === matchId)
  );

// Selector for matches count
export const selectMatchesCount = createSelector(
  [selectMatches],
  (matches) => matches.length
);

// Selector for last updated match
export const selectLastUpdatedMatch = createSelector(
  [selectMatches],
  (matches) => {
    return matches.reduce((latest, current) => {
      if (!latest || current.lastUpdated > latest.lastUpdated) {
        return current;
      }
      return latest;
    }, matches[0]);
  }
);

// Selector for odds values only (for performance comparison)
export const selectOddsValues = createSelector([selectMatches], (matches) =>
  matches.map((match) => ({
    id: match.id,
    homeOdds: match.homeOdds,
    drawOdds: match.drawOdds,
    awayOdds: match.awayOdds,
    updatedField: match.updatedField,
    lastUpdated: match.lastUpdated,
  }))
);
