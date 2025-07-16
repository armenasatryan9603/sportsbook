import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeOdds: string;
  drawOdds: string;
  awayOdds: string;
  date: string;
  time: string;
  league: string;
  partner1: string;
  partner2: string;
  updatedField: "homeOdds" | "drawOdds" | "awayOdds" | null;
  lastUpdated: number;
}

interface MatchesState {
  matches: Match[];
  isUpdating: boolean;
}

// Initial match data
const initialState: MatchesState = {
  matches: [
    {
      id: "1",
      homeTeam: "Chelsea",
      awayTeam: "Liverpool",
      homeOdds: "1.87",
      drawOdds: "3.20",
      awayOdds: "2.45",
      date: "Feb 2, 2024",
      time: "15:00",
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
      homeOdds: "3.10",
      drawOdds: "3.40",
      awayOdds: "1.95",
      date: "Feb 2, 2024",
      time: "17:30",
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
      homeOdds: "2.20",
      drawOdds: "3.10",
      awayOdds: "2.80",
      date: "Feb 3, 2024",
      time: "14:00",
      league: "Premier League",
      partner1: "/src/assets/images/partnerLogos/logo3.jpg",
      partner2: "/src/assets/images/partnerLogos/logo1.jpg",
      updatedField: null,
      lastUpdated: 0,
    },
    {
      id: "4",
      homeTeam: "Brighton",
      awayTeam: "Newcastle",
      homeOdds: "2.60",
      drawOdds: "3.00",
      awayOdds: "2.40",
      date: "Feb 3, 2024",
      time: "16:30",
      league: "Premier League",
      partner1: "/src/assets/images/partnerLogos/logo1.jpg",
      partner2: "/src/assets/images/partnerLogos/logo2.jpg",
      updatedField: null,
      lastUpdated: 0,
    },
    {
      id: "5",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      homeOdds: "2.10",
      drawOdds: "3.50",
      awayOdds: "2.90",
      date: "Feb 4, 2024",
      time: "20:00",
      league: "La Liga",
      partner1: "/src/assets/images/partnerLogos/logo2.jpg",
      partner2: "/src/assets/images/partnerLogos/logo3.jpg",
      updatedField: null,
      lastUpdated: 0,
    },
    {
      id: "6",
      homeTeam: "Atletico Madrid",
      awayTeam: "Sevilla",
      homeOdds: "1.75",
      drawOdds: "3.20",
      awayOdds: "4.50",
      date: "Feb 4, 2024",
      time: "18:00",
      league: "La Liga",
      partner1: "/src/assets/images/partnerLogos/logo1.jpg",
      partner2: "/src/assets/images/partnerLogos/logo2.jpg",
      updatedField: null,
      lastUpdated: 0,
    },
    {
      id: "7",
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      homeOdds: "1.95",
      drawOdds: "3.80",
      awayOdds: "3.40",
      date: "Feb 5, 2024",
      time: "19:30",
      league: "Bundesliga",
      partner1: "/src/assets/images/partnerLogos/logo3.jpg",
      partner2: "/src/assets/images/partnerLogos/logo1.jpg",
      updatedField: null,
      lastUpdated: 0,
    },
    {
      id: "8",
      homeTeam: "RB Leipzig",
      awayTeam: "Bayer Leverkusen",
      homeOdds: "2.40",
      drawOdds: "3.10",
      awayOdds: "2.70",
      date: "Feb 5, 2024",
      time: "17:00",
      league: "Bundesliga",
      partner1: "/src/assets/images/partnerLogos/logo2.jpg",
      partner2: "/src/assets/images/partnerLogos/logo3.jpg",
      updatedField: null,
      lastUpdated: 0,
    },
    {
      id: "9",
      homeTeam: "PSG",
      awayTeam: "Marseille",
      homeOdds: "1.60",
      drawOdds: "3.90",
      awayOdds: "5.20",
      date: "Feb 6, 2024",
      time: "21:00",
      league: "Ligue 1",
      partner1: "/src/assets/images/partnerLogos/logo1.jpg",
      partner2: "/src/assets/images/partnerLogos/logo2.jpg",
      updatedField: null,
      lastUpdated: 0,
    },
    {
      id: "10",
      homeTeam: "AC Milan",
      awayTeam: "Inter Milan",
      homeOdds: "2.30",
      drawOdds: "3.20",
      awayOdds: "2.80",
      date: "Feb 6, 2024",
      time: "20:45",
      league: "Serie A",
      partner1: "/src/assets/images/partnerLogos/logo3.jpg",
      partner2: "/src/assets/images/partnerLogos/logo1.jpg",
      updatedField: null,
      lastUpdated: 0,
    },
    {
      id: "11",
      homeTeam: "Juventus",
      awayTeam: "Napoli",
      homeOdds: "2.80",
      drawOdds: "3.00",
      awayOdds: "2.50",
      date: "Feb 7, 2024",
      time: "19:00",
      league: "Serie A",
      partner1: "/src/assets/images/partnerLogos/logo2.jpg",
      partner2: "/src/assets/images/partnerLogos/logo3.jpg",
      updatedField: null,
      lastUpdated: 0,
    },
    {
      id: "12",
      homeTeam: "Manchester City",
      awayTeam: "Aston Villa",
      homeOdds: "1.45",
      drawOdds: "4.20",
      awayOdds: "6.50",
      date: "Feb 7, 2024",
      time: "16:00",
      league: "Premier League",
      partner1: "/src/assets/images/partnerLogos/logo1.jpg",
      partner2: "/src/assets/images/partnerLogos/logo2.jpg",
      updatedField: null,
      lastUpdated: 0,
    },
  ],
  isUpdating: false,
};

// Generate random odds between 1.50 and 3.00
const generateRandomOdds = (): string => {
  const randomValue = Math.random() * (3.0 - 1.5) + 1.5;
  return randomValue.toFixed(2);
};

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    updateRandomOdds: (state) => {
      // Select a random match
      const randomMatchIndex = Math.floor(Math.random() * state.matches.length);
      const randomMatch = state.matches[randomMatchIndex];

      // Select a random odds field to update
      const oddsFields: Array<"homeOdds" | "drawOdds" | "awayOdds"> = [
        "homeOdds",
        "drawOdds",
        "awayOdds",
      ];
      const randomField =
        oddsFields[Math.floor(Math.random() * oddsFields.length)];

      // Update the odds
      randomMatch[randomField] = generateRandomOdds();
      randomMatch.updatedField = randomField;
      randomMatch.lastUpdated = Date.now();

      state.isUpdating = true;
    },
    clearUpdateHighlight: (state, action: PayloadAction<string>) => {
      const match = state.matches.find((m) => m.id === action.payload);
      if (match) {
        match.updatedField = null;
      }
      state.isUpdating = false;
    },
    updateSpecificOdds: (
      state,
      action: PayloadAction<{
        matchId: string;
        field: "homeOdds" | "drawOdds" | "awayOdds";
        value: string;
      }>
    ) => {
      const match = state.matches.find((m) => m.id === action.payload.matchId);
      if (match) {
        match[action.payload.field] = action.payload.value;
        match.updatedField = action.payload.field;
        match.lastUpdated = Date.now();
      }
    },
  },
});

export const { updateRandomOdds, clearUpdateHighlight, updateSpecificOdds } =
  matchesSlice.actions;
export default matchesSlice.reducer;
