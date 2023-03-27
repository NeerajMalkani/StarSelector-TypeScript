export interface CommentaryMain {
  commentaryLines: CommentaryLine[];
  miniscore: Miniscore;
  matchHeaders: MatchHeaders;
  appIndex: AppIndex;
  matchVideos: MatchVideo[];
  responseLastUpdated: string;
}

export interface CommentaryLine {
  commSnippet?: CommSnippet;
  commentary?: Commentary;
}

export interface CommSnippet {
  infraType: string;
  headline: string;
  commTimestamp: string;
  itemId: string;
  appLinkUrl: string;
  inningsId: number;
  imageId: number;
  mappingId: string;
  videoUrl: string;
  adTag: string;
  videoCategory: VideoCategory[];
  language: string;
  videoId: number;
  videoType: string;
}

export interface VideoCategory {
  id: number;
  name: string;
  imageID: number;
}

export interface Commentary {
  commtxt: string;
  timestamp: string;
  overNum?: number;
  inningsId: number;
  eventType: string;
  commentaryFormats: CommentaryFormat[];
  ballNbr?: number;
  overSep?: OverSep;
}

export interface CommentaryFormat {
  type?: string;
  value: Value[];
}

export interface Value {
  id: string;
  value: string;
}

export interface OverSep {
  score: number;
  wickets: number;
  inningsId: number;
  overSummary: string;
  runs: number;
  batStrikerDetails: string;
  batNonStrikerDetails: string;
  bowlDetails: string;
  timestamp: string;
  overNum: number;
  batStrikerName: string;
  batNonStrikerName: string;
  bowlName: string;
  batTeamName: string;
}

export interface Miniscore {
  batsmanStriker: BatsmanStriker;
  batsmanNonStriker: BatsmanNonStriker;
  bowlerStriker: BowlerStriker;
  bowlerNonStriker: BowlerNonStriker;
  crr: number;
  rrr: number;
  inningsNbr: string;
  lastWkt: string;
  curOvsStats: string;
  inningsScores: InningsScore[];
  inningsId: number;
  performance: Performance[];
  udrs: Udrs;
  partnership: string;
  pp: Pp[];
}

export interface BatsmanStriker {
  id: number;
  balls: number;
  runs: number;
  strkRate: string;
  name: string;
  nickName: string;
}

export interface BatsmanNonStriker {
  id: number;
  balls: number;
  runs: number;
  strkRate: string;
  name: string;
  nickName: string;
}

export interface BowlerStriker {
  id: number;
  overs: string;
  maidens: number;
  wickets: number;
  runs: number;
  economy: string;
  name: string;
}

export interface BowlerNonStriker {
  id: number;
  overs: string;
  maidens: number;
  wickets: number;
  runs: number;
  economy: string;
  name: string;
}

export interface InningsScore {
  inningsScore: InningsScore2[];
}

export interface InningsScore2 {
  inningsId: number;
  batTeamId: number;
  batTeamShortName: string;
  runs: number;
  wickets: number;
  overs: number;
  target: number;
  balls: number;
}

export interface Performance {
  runs: number;
  wickets: number;
  label: string;
}

export interface Udrs {
  team1Id: number;
  team1Remaining: number;
  team2Id: number;
  team2Successful: number;
  team2Unsuccessful: number;
}

export interface Pp {
  powerPlay: PowerPlay[];
}

export interface PowerPlay {
  id: number;
  ovrFrom: number;
  ovrTo: number;
  ppType: string;
  run: number;
}

export interface MatchHeaders {
  state: string;
  status: string;
  matchFormat: string;
  matchStartTimestamp: string;
  teamDetails: TeamDetails;
  momPlayers: MomPlayers;
  mosPlayers: MosPlayers;
  winningTeamId: number;
  matchEndTimeStamp: string;
  seriesId: number;
  matchDesc: string;
  seriesName: string;
}

export interface TeamDetails {
  batTeamId: number;
  batTeamName: string;
  bowlTeamId: number;
  bowlTeamName: string;
}

export interface MomPlayers {
  player: Player[];
}

export interface Player {
  id: string;
  name: string;
  teamName: string;
  faceImageId: string;
}

export interface MosPlayers {
  player: Player2[];
}

export interface Player2 {
  id: string;
  name: string;
  faceImageId: string;
}

export interface AppIndex {
  seoTitle: string;
  webURL: string;
}

export interface MatchVideo {
  infraType: string;
  headline: string;
  commTimestamp: string;
  itemId: string;
  appLinkUrl: string;
  imageId: number;
  mappingId: string;
  videoUrl: string;
  adTag: string;
  videoCategory: VideoCategory2[];
  language: string;
  videoId: number;
  videoType: string;
}

export interface VideoCategory2 {
  id: number;
  name: string;
  imageID: number;
}
