export interface Team1 {
  teamId: number;
  teamName: string;
  teamSName: string;
}

export interface Team2 {
  teamId: number;
  teamName: string;
  teamSName: string;
}

export interface Umpire1 {
  id: number;
  name: string;
}

export interface Umpire2 {
  id: number;
  name: string;
}

export interface Umpire3 {
  id: number;
  name: string;
}

export interface Referee {
  id: number;
  name: string;
}

export interface VenueInfo {
  id: number;
  ground: string;
  city: string;
  country: string;
  timezone: string;
  established: number;
  capacity: string;
  ends: string;
  homeTeam: string;
}

export interface MatchDetails {
  matchId: number;
  seriesId: number;
  seriesName: string;
  matchDesc: string;
  matchFormat: string;
  startDate: string;
  endDate: string;
  state: string;
  status: string;
  team1: Team1;
  team2: Team2;
  umpire1: Umpire1;
  umpire2: Umpire2;
  umpire3: Umpire3;
  referee: Referee;
  venueInfo: VenueInfo;
  toss: string;
  seriesStartDt: string;
  seriesEndDt: string;
}
