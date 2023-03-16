export interface Team {
  teamId?: number;
  teamName?: string;
  teamSName?: string;
  imageId?: number;
}

export interface VenueInfo {
  id?: number;
  ground?: string;
  city?: string;
  timezone?: string;
}

export interface MatchInfo {
  matchId?: number;
  seriesId?: number;
  seriesName?: string;
  matchDesc?: string;
  matchFormat?: string;
  startDate: string;
  endDate?: string;
  state?: string;
  team1?: Team;
  team2?: Team;
  venueInfo?: VenueInfo;
  isTournament?: boolean;
  seriesStartDt?: string;
  seriesEndDt?: string;
  isTimeAnnounced?: boolean;
  stateTitle?: string;
  matchType?: string;
  status?: string;
  currBatTeamId?: number;
  isFantasyEnabled?: boolean;
}

export interface Inngs {
  inningsId?: number;
  runs?: number;
  wickets?: number;
  overs?: number;
  isDeclared?: boolean;
}

export interface TeamScore {
  inngs1?: Inngs;
  inngs2?: Inngs;
}

export interface MatchScore {
  team1Score?: TeamScore;
  team2Score?: TeamScore;
}

export interface Match {
  matchInfo: MatchInfo;
  matchScore: MatchScore;
}

export interface Matches {
  match: Match;
}

export interface SeriesAdWrapper {
  seriesId: number;
  seriesName: string;
  matches: Match[];
}

export interface SeriesMatches {
  seriesAdWrapper?: SeriesAdWrapper;
}

export interface TypeMatch {
  matchType: string;
  seriesMatches: SeriesMatches[];
}
