export interface BasicProps {
  theme: any;
  route: any;
  navigation: any;
}

export interface TypeMatch {
  matchType: string;
  seriesAdWrapper: SeriesAdWrapper[];
}

export interface SeriesAdWrapper {
  seriesMatches?: SeriesMatches;
}

export interface SeriesMatches {
  seriesId: number;
  seriesName: string;
  matches: Match[];
}

export interface Match {
  matchInfo: MatchInfo;
  MatchInfo: MatchInfo;
  MatchScore?: MatchScore;
}

export interface MatchInfo {
  matchId?: number;
  seriesId?: number;
  seriesName?: string;
  matchFormat?: string;
  startDate: string;
  endDate?: string;
  state?: string;
  status?: string;
  team1?: Team;
  team2?: Team;
  venueInfo?: VenueInfo;
  currentBatTeamId?: number;
  seriesStartDt?: string;
  seriesEndDt?: string;
}

export interface matchInfo {
  matchId?: number;
  seriesId?: number;
  seriesName?: string;
  matchFormat?: string;
  startDate: string;
  endDate?: string;
  state?: string;
  status?: string;
  team1?: Team;
  team2?: Team;
  venueInfo?: VenueInfo;
  currentBatTeamId?: number;
  seriesStartDt?: string;
  seriesEndDt?: string;
}

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
  timezone?: number;
}

export interface MatchScore {
  team1Score?: TeamScore;
  team2Score?: TeamScore;
}

export interface TeamScore {
  inngs1?: InningsScore;
  inngs2?: InningsScore;
}

export interface InningsScore {
  inningsId?: number;
  runs?: number;
  wickets?: number;
  overs?: number;
}
