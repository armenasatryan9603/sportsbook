import React, { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setTeamSearch,
  setDateFilter,
  setLeagueFilter,
  setSortBy,
  clearAllFilters,
} from "../store/slices/filtersSlice";
import {
  selectFilters,
  selectUniqueLeagues,
  selectUniqueDates,
  selectFilterStatus,
} from "../store/selectors/filtersSelectors";

interface MatchFiltersProps {
  className?: string;
}

const MatchFilters: React.FC<MatchFiltersProps> = memo(({ className = "" }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const uniqueLeagues = useAppSelector(selectUniqueLeagues);
  const uniqueDates = useAppSelector(selectUniqueDates);
  const filterStatus = useAppSelector(selectFilterStatus);

  // Handle input changes
  const handleTeamSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTeamSearch(e.target.value));
    },
    [dispatch]
  );

  const handleDateFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setDateFilter(e.target.value));
    },
    [dispatch]
  );

  const handleLeagueFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setLeagueFilter(e.target.value));
    },
    [dispatch]
  );

  const handleSortByChange = useCallback(
    (sortBy: "date" | "team" | "league" | null) => {
      dispatch(setSortBy(sortBy));
    },
    [dispatch]
  );

  const handleClearFilters = useCallback(() => {
    dispatch(clearAllFilters());
  }, [dispatch]);

  return (
    <div className={`bg-[#1A1529] rounded-lg p-4 mb-6 ${className}`}>
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Search Teams
          </label>
          <input
            type="text"
            value={filters.teamSearch}
            onChange={handleTeamSearchChange}
            placeholder="Search by team name..."
            className="w-full px-3 py-2 bg-[#2A253A] text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Date Filter */}
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date
          </label>
          <select
            value={filters.dateFilter}
            onChange={handleDateFilterChange}
            className="w-full px-3 py-2 bg-[#2A253A] text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
          >
            <option value="">All Dates</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        {/* League Filter */}
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            League
          </label>
          <select
            value={filters.leagueFilter}
            onChange={handleLeagueFilterChange}
            className="w-full px-3 py-2 bg-[#2A253A] text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
          >
            <option value="">All Leagues</option>
            {uniqueLeagues.map((league) => (
              <option key={league} value={league}>
                {league}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Controls */}
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sort By
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleSortByChange("date")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                filters.sortBy === "date"
                  ? "bg-blue-600 text-white"
                  : "bg-[#2A253A] text-gray-300 hover:bg-[#3A2F4A]"
              }`}
            >
              Date{" "}
              {filters.sortBy === "date" &&
                (filters.sortDirection === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSortByChange("team")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                filters.sortBy === "team"
                  ? "bg-blue-600 text-white"
                  : "bg-[#2A253A] text-gray-300 hover:bg-[#3A2F4A]"
              }`}
            >
              Team{" "}
              {filters.sortBy === "team" &&
                (filters.sortDirection === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSortByChange("league")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                filters.sortBy === "league"
                  ? "bg-blue-600 text-white"
                  : "bg-[#2A253A] text-gray-300 hover:bg-[#3A2F4A]"
              }`}
            >
              League{" "}
              {filters.sortBy === "league" &&
                (filters.sortDirection === "asc" ? "↑" : "↓")}
            </button>
          </div>
        </div>

        {/* Clear Filters Button */}
        {filterStatus.hasActiveFilters && (
          <div className="min-w-[120px]">
            <label className="block text-sm font-medium text-transparent mb-2">
              Clear
            </label>
            <button
              onClick={handleClearFilters}
              className="w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Filter Status */}
      <div className="mt-4 pt-3 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            Showing {filterStatus.filteredMatches} of{" "}
            {filterStatus.totalMatches} matches
          </span>
          {filterStatus.hasActiveFilters && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Filters Active
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

MatchFilters.displayName = "MatchFilters";

export default MatchFilters;
