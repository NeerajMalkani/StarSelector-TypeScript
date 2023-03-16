// export interface BatsmanStriker {
//     id: number;
//     balls: number;
//     runs: number;
//     fours: number;
//     sixes: number;
//     strkRate: string;
//     name: string;
//     nickName: string;
// }

// export interface BatsmanNonStriker {
//     id: number;
//     balls: number;
//     runs: number;
//     fours: number;
//     sixes: number;
//     strkRate: string;
//     name: string;
//     nickName: string;
// }

// export interface BowlerStriker {
//     id: number;
//     overs: string;
//     runs: number;
//     maidens: number;
//     wickets: number;
//     economy: string;
//     name: string;
// }

// export interface BowlerNonStriker {
//     id: number;
//     overs: string;
//     runs: number;
//     maidens: number;
//     wickets: number;
//     economy: string;
//     name: string;
// }

// export interface InningsScore2 {
//     inningsId: number;
//     batTeamId: number;
//     batTeamShortName: string;
//     runs: number;
//     wickets: number;
//     overs: number;
//     target: number;
//     balls: number;
// }

// export interface InningsScore {
//     inningsScore: InningsScore2[];
// }

// export interface Performance {
//     runs: number;
//     wickets: number;
//     label: string;
// }

// export interface PowerPlay {
//     id: number;
//     ovrFrom: number;
//     ovrTo: number;
//     ppType: string;
//     run: number;
// }

// export interface Pp {
//     powerPlay: PowerPlay[];
// }

// export interface Miniscore {
//     batsmanStriker: BatsmanStriker;
//     batsmanNonStriker: BatsmanNonStriker;
//     bowlerStriker: BowlerStriker;
//     bowlerNonStriker: BowlerNonStriker;
//     crr: number;
//     rrr: number;
//     inningsNbr: string;
//     lastWkt: string;
//     curOvsStats: string;
//     inningsScores: InningsScore[];
//     inningsId: number;
//     performance: Performance[];
//     partnership: string;
//     pp: Pp[];
//     target: number;
//     custStatus: string;
// }

// export interface OverSep {
//     score: number;
//     wickets: number;
//     inningsId: number;
//     overSummary: string;
//     runs: number;
//     timestamp: string;
//     overNum: number;
//     ovrBatNames: string[];
//     ovrBowlNames: string[];
//     batTeamName: string;
// }

// export interface OverSepList {
//     overSep: OverSep[];
// }

// export interface TeamDetails {
//     batTeamId: number;
//     batTeamName: string;
//     bowlTeamId: number;
//     bowlTeamName: string;
// }

// export interface Player {
//     id: string;
//     name: string;
//     teamName: string;
//     faceImageId: string;
// }

// export interface MomPlayers {
//     player: Player[];
// }

// export interface MosPlayers {
// }

// export interface MatchHeaders {
//     state: string;
//     status: string;
//     matchFormat: string;
//     matchStartTimestamp: string;
//     teamDetails: TeamDetails;
//     momPlayers: MomPlayers;
//     mosPlayers: MosPlayers;
//     winningTeamId: number;
//     matchEndTimeStamp: string;
//     seriesId: number;
//     matchDesc: string;
//     seriesName: string;
// }

// export interface LiveDetails {
//     miniscore: Miniscore;
//     overSepList: OverSepList[];
//     matchHeaders: MatchHeaders;
//     responseLastUpdated: string;
// }

export interface Bold {
  formatId: string[];
  formatValue: string[];
}

export interface CommentaryFormats {
  bold: Bold;
}

export interface OverSeparator {
  score: number;
  wickets: number;
  inningsId: number;
  o_summary: string;
  runs: number;
  batStrikerIds: number[];
  batStrikerNames: string[];
  batStrikerRuns: number;
  batStrikerBalls: number;
  batNonStrikerIds: number[];
  batNonStrikerNames: string[];
  batNonStrikerRuns: number;
  batNonStrikerBalls: number;
  bowlIds: number[];
  bowlNames: string[];
  bowlOvers: number;
  bowlMaidens: number;
  bowlRuns: number;
  bowlWickets: number;
  timestamp: any;
  overNum: number;
  batTeamName: string;
  event: string;
}

export interface CommentaryList {
  commText: string;
  timestamp: any;
  ballNbr: number;
  inningsId: number;
  event: string;
  batTeamName: string;
  commentaryFormats: CommentaryFormats;
  overNumber?: number;
  overSeparator: OverSeparator;
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

export interface RevisedTarget {
  reason: string;
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
  role: string;
  keeper: boolean;
  substitute: boolean;
  teamId: number;
  battingStyle: string;
  bowlingStyle: string;
  teamName: string;
  faceImageId: number;
}

export interface MatchTeamInfo {
  battingTeamId: number;
  battingTeamShortName: string;
  bowlingTeamId: number;
  bowlingTeamShortName: string;
}

export interface Team1 {
  id: number;
  name: string;
  playerDetails: any[];
  shortName: string;
}

export interface Team2 {
  id: number;
  name: string;
  playerDetails: any[];
  shortName: string;
}

export interface MatchHeader {
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
  status: string;
  tossResults: TossResults;
  result: Result;
  revisedTarget: RevisedTarget;
  playersOfTheMatch: PlayersOfTheMatch[];
  playersOfTheSeries: PlayersOfTheSery[];
  matchTeamInfo: MatchTeamInfo[];
  isMatchNotCovered: boolean;
  team1: Team1;
  team2: Team2;
  seriesDesc: string;
  seriesId: number;
  seriesName: string;
  alertType: string;
  livestreamEnabled: boolean;
}

export interface BatsmanStriker {
  batBalls: number;
  batDots: number;
  batFours: number;
  batId: number;
  batName: string;
  batMins: number;
  batRuns: number;
  batSixes: number;
  batStrikeRate: number;
}

export interface BatsmanNonStriker {
  batBalls: number;
  batDots: number;
  batFours: number;
  batId: number;
  batName: string;
  batMins: number;
  batRuns: number;
  batSixes: number;
  batStrikeRate: number;
}

export interface BatTeam {
  teamId: number;
  teamScore: number;
  teamWkts: number;
}

export interface BowlerStriker {
  bowlId: number;
  bowlName: string;
  bowlMaidens: number;
  bowlNoballs: number;
  bowlOvs: number;
  bowlRuns: number;
  bowlWides: number;
  bowlWkts: number;
  bowlEcon: number;
}

export interface BowlerNonStriker {
  bowlId: number;
  bowlName: string;
  bowlMaidens: number;
  bowlNoballs: number;
  bowlOvs: number;
  bowlRuns: number;
  bowlWides: number;
  bowlWkts: number;
  bowlEcon: number;
}

export interface PartnerShip {
  balls: number;
  runs: number;
}

export interface InningsScoreList {
  inningsId: number;
  batTeamId: number;
  batTeamName: string;
  score: number;
  wickets: number;
  overs: number;
  isDeclared: boolean;
  isFollowOn: boolean;
  ballNbr: number;
}

export interface TossResults2 {
  tossWinnerId: number;
  tossWinnerName: string;
  decision: string;
}

export interface MatchTeamInfo2 {
  battingTeamId: number;
  battingTeamShortName: string;
  bowlingTeamId: number;
  bowlingTeamShortName: string;
}

export interface MatchScoreDetails {
  matchId: number;
  inningsScoreList: InningsScoreList[];
  tossResults: TossResults2;
  matchTeamInfo: MatchTeamInfo2[];
  isMatchNotCovered: boolean;
  matchFormat: string;
  state: string;
  customStatus: string;
  highlightedTeamId: number;
}

export interface LatestPerformance {
  runs: number;
  wkts: number;
  label: string;
}

export interface Pp1 {
  ppId: number;
  ppOversFrom: number;
  ppOversTo: number;
  ppType: string;
  runsScored: number;
}

export interface PpData {
  pp_1: Pp1;
}

export interface MatchUdrs {
  matchId: number;
  inningsId: number;
  timestamp: Date;
  team1Id: number;
  team1Remaining: number;
  team1Successful: number;
  team1Unsuccessful: number;
  team2Id: number;
  team2Remaining: number;
  team2Successful: number;
  team2Unsuccessful: number;
}

export interface Miniscore {
  inningsId: number;
  batsmanStriker: BatsmanStriker;
  batsmanNonStriker: BatsmanNonStriker;
  batTeam: BatTeam;
  bowlerStriker: BowlerStriker;
  bowlerNonStriker: BowlerNonStriker;
  overs: number;
  recentOvsStats: string;
  target: number;
  partnerShip: PartnerShip;
  currentRunRate: number;
  requiredRunRate: number;
  lastWicket: string;
  matchScoreDetails: MatchScoreDetails;
  latestPerformance: LatestPerformance[];
  ppData: PpData;
  matchUdrs: MatchUdrs;
  overSummaryList: any[];
  status: string;
  lastWicketScore: number;
  remRunsToWin: number;
  responseLastUpdated: number;
  event: string;
}

export interface LiveDetails {
  commentaryList: CommentaryList[];
  matchHeader: MatchHeader;
  miniscore: Miniscore;
  commentarySnippetList: any[];
  page: string;
  enableNoContent: boolean;
  matchVideos: any[];
  responseLastUpdated: number;
}
