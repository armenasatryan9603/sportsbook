import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface MatchFilters {
  teamSearch: string;
  dateFilter: string; // Empty string means no date filter
  leagueFilter: string; // Empty string means no league filter
  sortBy: "date" | "team" | "league" | null;
  sortDirection: "asc" | "desc";
}

interface FiltersState {
  filters: MatchFilters;
}

const initialState: FiltersState = {
  filters: {
    teamSearch: "",
    dateFilter: "",
    leagueFilter: "",
    sortBy: null,
    sortDirection: "asc",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTeamSearch: (state, action: PayloadAction<string>) => {
      state.filters.teamSearch = action.payload;
    },
    setDateFilter: (state, action: PayloadAction<string>) => {
      state.filters.dateFilter = action.payload;
    },
    setLeagueFilter: (state, action: PayloadAction<string>) => {
      state.filters.leagueFilter = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<"date" | "team" | "league" | null>
    ) => {
      state.filters.sortBy = action.payload;
      // If setting same sort field, toggle direction
      if (action.payload === state.filters.sortBy) {
        state.filters.sortDirection =
          state.filters.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.filters.sortDirection = "asc";
      }
    },
    setSortDirection: (state, action: PayloadAction<"asc" | "desc">) => {
      state.filters.sortDirection = action.payload;
    },
    clearAllFilters: (state) => {
      state.filters = {
        teamSearch: "",
        dateFilter: "",
        leagueFilter: "",
        sortBy: null,
        sortDirection: "asc",
      };
    },
  },
});

export const {
  setTeamSearch,
  setDateFilter,
  setLeagueFilter,
  setSortBy,
  setSortDirection,
  clearAllFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
