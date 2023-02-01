export interface BatsmanStriker {
    id: number;
    balls: number;
    runs: number;
    fours: number;
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
    runs: number;
    economy: string;
    name: string;
}

export interface BowlerNonStriker {
    id: number;
    overs: string;
    runs: number;
    economy: string;
    name: string;
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

export interface InningsScore {
    inningsScore: InningsScore2[];
}

export interface Performance {
    runs: number;
    wickets: number;
    label: string;
}

export interface PowerPlay {
    id: number;
    ovrFrom: number;
    ovrTo: number;
    ppType: string;
    run: number;
}

export interface Pp {
    powerPlay: PowerPlay[];
}

export interface Miniscore {
    batsmanStriker: BatsmanStriker;
    batsmanNonStriker: BatsmanNonStriker;
    bowlerStriker: BowlerStriker;
    bowlerNonStriker: BowlerNonStriker;
    crr: number;
    inningsNbr: string;
    lastWkt: string;
    curOvsStats: string;
    inningsScores: InningsScore[];
    inningsId: number;
    performance: Performance[];
    partnership: string;
    pp: Pp[];
    target: number;
    custStatus: string;
}

export interface OverSep {
    score: number;
    wickets: number;
    inningsId: number;
    overSummary: string;
    runs: number;
    timestamp: string;
    overNum: number;
    ovrBatNames: string[];
    ovrBowlNames: string[];
    batTeamName: string;
}

export interface OverSepList {
    overSep: OverSep[];
}

export interface TeamDetails {
    batTeamId: number;
    batTeamName: string;
    bowlTeamId: number;
    bowlTeamName: string;
}

export interface Player {
    id: string;
    name: string;
    teamName: string;
    faceImageId: string;
}

export interface MomPlayers {
    player: Player[];
}

export interface MosPlayers {
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

export interface LiveDetails {
    miniscore: Miniscore;
    overSepList: OverSepList[];
    matchHeaders: MatchHeaders;
    responseLastUpdated: string;
}
