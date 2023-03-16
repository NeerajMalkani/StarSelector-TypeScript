export interface PlayerDetail {
    id: number;
    name: string;
    fullName: string;
    nickName: string;
    captain: boolean;
    role: string;
    keeper: boolean;
    substitute: boolean;
    teamId: number;
    battingStyle: string;
    bowlingStyle: string;
    faceImageId: number;
}

export interface Team1 {
    id: number;
    name: string;
    playerDetails: PlayerDetail[];
    shortName: string;
}

export interface PlayerDetail2 {
    id: number;
    name: string;
    fullName: string;
    nickName: string;
    captain: boolean;
    role: string;
    keeper: boolean;
    substitute: boolean;
    teamId: number;
    battingStyle: string;
    bowlingStyle: string;
    faceImageId: number;
}

export interface Team2 {
    id: number;
    name: string;
    playerDetails: PlayerDetail2[];
    shortName: string;
}

export interface Series {
    id: number;
    name: string;
    seriesType: string;
    startDate: number;
    endDate: number;
    seriesFolder: string;
    odiSeriesResult: string;
    t20SeriesResult: string;
    testSeriesResult: string;
}

export interface Umpire1 {
    id: number;
    name: string;
    country: string;
}

export interface Umpire2 {
    id: number;
    name: string;
    country: string;
}

export interface Umpire3 {
    id: number;
    name: string;
    country: string;
}

export interface Referee {
    id: number;
    name: string;
    country: string;
}

export interface TossResults {
    tossWinnerId: number;
    tossWinnerName: string;
    decision: string;
}

export interface Result {
    resultType: string;
    winningTeam: string;
    winningteamId: number;
    winningMargin: number;
    winByRuns: boolean;
    winByInnings: boolean;
}

export interface Venue {
    id: number;
    name: string;
    city: string;
    country: string;
    timezone: string;
    latitude: string;
    longitude: string;
}

export interface PlayersOfTheMatch {
    id: number;
    name: string;
    fullName: string;
    nickName: string;
    captain: boolean;
    keeper: boolean;
    substitute: boolean;
    teamName: string;
    faceImageId: number;
}

export interface PlayersOfTheSery {
    id: number;
    name: string;
    fullName: string;
    nickName: string;
    captain: boolean;
    keeper: boolean;
    substitute: boolean;
    bowlingStyle: string;
    faceImageId: number;
}

export interface RevisedTarget {
    reason: string;
}

export interface MatchTeamInfo {
    battingTeamId: number;
    battingTeamShortName: string;
    bowlingTeamId: number;
    bowlingTeamShortName: string;
}

export interface MatchInfo {
    matchId: number;
    matchDescription: string;
    matchFormat: string;
    matchType: string;
    complete: boolean;
    domestic: boolean;
    matchStartTimestamp: number;
    matchCompleteTimestamp: number;
    dayNight: boolean;
    year: number;
    state: string;
    team1: Team1;
    team2: Team2;
    series: Series;
    umpire1: Umpire1;
    umpire2: Umpire2;
    umpire3: Umpire3;
    referee: Referee;
    tossResults: TossResults;
    result: Result;
    venue: Venue;
    status: string;
    playersOfTheMatch: PlayersOfTheMatch[];
    playersOfTheSeries: PlayersOfTheSery[];
    revisedTarget: RevisedTarget;
    matchTeamInfo: MatchTeamInfo[];
    isMatchNotCovered: boolean;
    HYSEnabled: number;
    livestreamEnabled: boolean;
    isFantasyEnabled: boolean;
    livestreamEnabledGeo: any[];
    alertType: string;
}

export interface VenueInfo {
    established: number;
    capacity: string;
    knownAs?: any;
    ends: string;
    city: string;
    country: string;
    timezone: string;
    homeTeam?: any;
    floodlights: boolean;
    curator?: any;
    profile?: any;
    imageUrl: string;
    ground: string;
    groundLength: number;
    groundWidth: number;
    otherSports: string;
}

export interface MatchRootInfo {
    matchInfo: MatchInfo;
    venueInfo: VenueInfo;
    broadcastInfo: any[];
}
