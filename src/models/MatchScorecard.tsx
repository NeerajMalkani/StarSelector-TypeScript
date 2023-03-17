export interface MatchScorecard {
    scoreCard: ScoreCard[]
    matchHeader: MatchHeader
    isMatchComplete: boolean
    status: string
    videos: any[]
    responseLastUpdated: number
  }
  
  export interface ScoreCard {
    matchId: number
    inningsId: number
    timeScore: number
    batTeamDetails: BatTeamDetails
    bowlTeamDetails: BowlTeamDetails
    scoreDetails: ScoreDetails
    extrasData: ExtrasData
    ppData: PpData
    wicketsData: WicketsData
    partnershipsData: PartnershipsData
  }
  
  export interface BatTeamDetails {
    batTeamId: number
    batTeamName: string
    batTeamShortName: string
    batsmenData: BatsmenData
  }
  
  export interface BatsmenData {
    bat_5: Bat5
    bat_2: Bat2
    bat_10: Bat10
    bat_7: Bat7
    bat_1: Bat1
    bat_8: Bat8
    bat_3: Bat3
    bat_9: Bat9
    bat_6: Bat6
    bat_4: Bat4
    bat_11: Bat11
  }
  
  export interface Bat5 {
    batId: number
    batName: string
    batShortName: string
    isCaptain: boolean
    isKeeper: boolean
    runs: number
    balls: number
    dots: number
    fours: number
    sixes: number
    mins: number
    strikeRate: number
    outDesc: string
    bowlerId: number
    fielderId1: number
    fielderId2: number
    fielderId3: number
    ones: number
    twos: number
    threes: number
    fives: number
    boundaries: number
    sixers: number
    wicketCode: string
  }
  
  export interface Bat2 {
    batId: number
    batName: string
    batShortName: string
    isCaptain: boolean
    isKeeper: boolean
    runs: number
    balls: number
    dots: number
    fours: number
    sixes: number
    mins: number
    strikeRate: number
    outDesc: string
    bowlerId: number
    fielderId1: number
    fielderId2: number
    fielderId3: number
    ones: number
    twos: number
    threes: number
    fives: number
    boundaries: number
    sixers: number
    wicketCode: string
  }
  
  export interface Bat10 {
    batId: number
    batName: string
    batShortName: string
    isCaptain: boolean
    isKeeper: boolean
    runs: number
    balls: number
    dots: number
    fours: number
    sixes: number
    mins: number
    strikeRate: number
    outDesc: string
    bowlerId: number
    fielderId1: number
    fielderId2: number
    fielderId3: number
    ones: number
    twos: number
    threes: number
    fives: number
    boundaries: number
    sixers: number
    wicketCode: string
  }
  
  export interface Bat7 {
    batId: number
    batName: string
    batShortName: string
    isCaptain: boolean
    isKeeper: boolean
    runs: number
    balls: number
    dots: number
    fours: number
    sixes: number
    mins: number
    strikeRate: number
    outDesc: string
    bowlerId: number
    fielderId1: number
    fielderId2: number
    fielderId3: number
    ones: number
    twos: number
    threes: number
    fives: number
    boundaries: number
    sixers: number
    wicketCode: string
  }
  
  export interface Bat1 {
    batId: number
    batName: string
    batShortName: string
    isCaptain: boolean
    isKeeper: boolean
    runs: number
    balls: number
    dots: number
    fours: number
    sixes: number
    mins: number
    strikeRate: number
    outDesc: string
    bowlerId: number
    fielderId1: number
    fielderId2: number
    fielderId3: number
    ones: number
    twos: number
    threes: number
    fives: number
    boundaries: number
    sixers: number
    wicketCode: string
  }
  
  export interface Bat8 {
    batId: number
    batName: string
    batShortName: string
    isCaptain: boolean
    isKeeper: boolean
    runs: number
    balls: number
    dots: number
    fours: number
    sixes: number
    mins: number
    strikeRate: number
    outDesc: string
    bowlerId: number
    fielderId1: number
    fielderId2: number
    fielderId3: number
    ones: number
    twos: number
    threes: number
    fives: number
    boundaries: number
    sixers: number
    wicketCode: string
  }
  
  export interface Bat3 {
    batId: number
    batName: string
    batShortName: string
    isCaptain: boolean
    isKeeper: boolean
    runs: number
    balls: number
    dots: number
    fours: number
    sixes: number
    mins: number
    strikeRate: number
    outDesc: string
    bowlerId: number
    fielderId1: number
    fielderId2: number
    fielderId3: number
    ones: number
    twos: number
    threes: number
    fives: number
    boundaries: number
    sixers: number
    wicketCode: string
  }
  
  export interface Bat9 {
    batId: number
    batName: string
    batShortName: string
    isCaptain: boolean
    isKeeper: boolean
    runs: number
    balls: number
    dots: number
    fours: number
    sixes: number
    mins: number
    strikeRate: number
    outDesc: string
    bowlerId: number
    fielderId1: number
    fielderId2: number
    fielderId3: number
    ones: number
    twos: number
    threes: number
    fives: number
    boundaries: number
    sixers: number
    wicketCode: string
  }
  
  export interface Bat6 {
    batId: number
    batName: string
    batShortName: string
    isCaptain: boolean
    isKeeper: boolean
    runs: number
    balls: number
    dots: number
    fours: number
    sixes: number
    mins: number
    strikeRate: number
    outDesc: string
    bowlerId: number
    fielderId1: number
    fielderId2: number
    fielderId3: number
    ones: number
    twos: number
    threes: number
    fives: number
    boundaries: number
    sixers: number
    wicketCode: string
  }
  
  export interface Bat4 {
    batId: number
    batName: string
    batShortName: string
    isCaptain: boolean
    isKeeper: boolean
    runs: number
    balls: number
    dots: number
    fours: number
    sixes: number
    mins: number
    strikeRate: number
    outDesc: string
    bowlerId: number
    fielderId1: number
    fielderId2: number
    fielderId3: number
    ones: number
    twos: number
    threes: number
    fives: number
    boundaries: number
    sixers: number
    wicketCode: string
  }
  
  export interface Bat11 {
    batId: number
    batName: string
    batShortName: string
    isCaptain: boolean
    isKeeper: boolean
    runs: number
    balls: number
    dots: number
    fours: number
    sixes: number
    mins: number
    strikeRate: number
    outDesc: string
    bowlerId: number
    fielderId1: number
    fielderId2: number
    fielderId3: number
    ones: number
    twos: number
    threes: number
    fives: number
    boundaries: number
    sixers: number
    wicketCode: string
  }
  
  export interface BowlTeamDetails {
    bowlTeamId: number
    bowlTeamName: string
    bowlTeamShortName: string
    bowlersData: BowlersData
  }
  
  export interface BowlersData {
    bowl_1: Bowl1
    bowl_4: Bowl4
    bowl_6: Bowl6
    bowl_5: Bowl5
    bowl_3: Bowl3
    bowl_7?: Bowl7
    bowl_2: Bowl2
  }
  
  export interface Bowl1 {
    bowlerId: number
    bowlName: string
    bowlShortName: string
    isCaptain: boolean
    isKeeper: boolean
    overs: number
    maidens: number
    runs: number
    wickets: number
    economy: number
    no_balls: number
    wides: number
    dots: number
    balls: number
    runsPerBall: number
  }
  
  export interface Bowl4 {
    bowlerId: number
    bowlName: string
    bowlShortName: string
    isCaptain: boolean
    isKeeper: boolean
    overs: number
    maidens: number
    runs: number
    wickets: number
    economy: number
    no_balls: number
    wides: number
    dots: number
    balls: number
    runsPerBall: number
  }
  
  export interface Bowl6 {
    bowlerId: number
    bowlName: string
    bowlShortName: string
    isCaptain: boolean
    isKeeper: boolean
    overs: number
    maidens: number
    runs: number
    wickets: number
    economy: number
    no_balls: number
    wides: number
    dots: number
    balls: number
    runsPerBall: number
  }
  
  export interface Bowl5 {
    bowlerId: number
    bowlName: string
    bowlShortName: string
    isCaptain: boolean
    isKeeper: boolean
    overs: number
    maidens: number
    runs: number
    wickets: number
    economy: number
    no_balls: number
    wides: number
    dots: number
    balls: number
    runsPerBall: number
  }
  
  export interface Bowl3 {
    bowlerId: number
    bowlName: string
    bowlShortName: string
    isCaptain: boolean
    isKeeper: boolean
    overs: number
    maidens: number
    runs: number
    wickets: number
    economy: number
    no_balls: number
    wides: number
    dots: number
    balls: number
    runsPerBall: number
  }
  
  export interface Bowl7 {
    bowlerId: number
    bowlName: string
    bowlShortName: string
    isCaptain: boolean
    isKeeper: boolean
    overs: number
    maidens: number
    runs: number
    wickets: number
    economy: number
    no_balls: number
    wides: number
    dots: number
    balls: number
    runsPerBall: number
  }
  
  export interface Bowl2 {
    bowlerId: number
    bowlName: string
    bowlShortName: string
    isCaptain: boolean
    isKeeper: boolean
    overs: number
    maidens: number
    runs: number
    wickets: number
    economy: number
    no_balls: number
    wides: number
    dots: number
    balls: number
    runsPerBall: number
  }
  
  export interface ScoreDetails {
    ballNbr: number
    isDeclared: boolean
    isFollowOn: boolean
    overs: number
    revisedOvers: number
    runRate: number
    runs: number
    wickets: number
    runsPerBall: number
  }
  
  export interface ExtrasData {
    noBalls: number
    total: number
    byes: number
    penalty: number
    wides: number
    legByes: number
  }
  
  export interface PpData {
    pp_1: Pp1
  }
  
  export interface Pp1 {
    ppId: number
    ppOversFrom: number
    ppOversTo: number
    ppType: string
    runsScored: number
  }
  
  export interface WicketsData {
    wkt_1: Wkt1
    wkt_2: Wkt2
    wkt_6?: Wkt6
    wkt_4?: Wkt4
    wkt_5?: Wkt5
    wkt_3?: Wkt3
  }
  
  export interface Wkt1 {
    batId: number
    batName: string
    wktNbr: number
    wktOver: number
    wktRuns: number
    ballNbr: number
  }
  
  export interface Wkt2 {
    batId: number
    batName: string
    wktNbr: number
    wktOver: number
    wktRuns: number
    ballNbr: number
  }
  
  export interface Wkt6 {
    batId: number
    batName: string
    wktNbr: number
    wktOver: number
    wktRuns: number
    ballNbr: number
  }
  
  export interface Wkt4 {
    batId: number
    batName: string
    wktNbr: number
    wktOver: number
    wktRuns: number
    ballNbr: number
  }
  
  export interface Wkt5 {
    batId: number
    batName: string
    wktNbr: number
    wktOver: number
    wktRuns: number
    ballNbr: number
  }
  
  export interface Wkt3 {
    batId: number
    batName: string
    wktNbr: number
    wktOver: number
    wktRuns: number
    ballNbr: number
  }
  
  export interface PartnershipsData {
    pat_1: Pat1
    pat_2: Pat2
    pat_3: Pat3
    pat_6?: Pat6
    pat_5?: Pat5
    pat_4?: Pat4
    pat_7?: Pat7
  }
  
  export interface Pat1 {
    bat1Id: number
    bat1Name: string
    bat1Runs: number
    bat1fours: number
    bat1sixes: number
    bat2Id: number
    bat2Name: string
    bat2Runs: number
    bat2fours: number
    bat2sixes: number
    totalRuns: number
    totalBalls: number
    bat1balls: number
    bat2balls: number
    bat1Ones: number
    bat1Twos: number
    bat1Threes: number
    bat1Fives: number
    bat1Boundaries: number
    bat1Sixers: number
    bat2Ones: number
    bat2Twos: number
    bat2Threes: number
    bat2Fives: number
    bat2Boundaries: number
    bat2Sixers: number
  }
  
  export interface Pat2 {
    bat1Id: number
    bat1Name: string
    bat1Runs: number
    bat1fours: number
    bat1sixes: number
    bat2Id: number
    bat2Name: string
    bat2Runs: number
    bat2fours: number
    bat2sixes: number
    totalRuns: number
    totalBalls: number
    bat1balls: number
    bat2balls: number
    bat1Ones: number
    bat1Twos: number
    bat1Threes: number
    bat1Fives: number
    bat1Boundaries: number
    bat1Sixers: number
    bat2Ones: number
    bat2Twos: number
    bat2Threes: number
    bat2Fives: number
    bat2Boundaries: number
    bat2Sixers: number
  }
  
  export interface Pat3 {
    bat1Id: number
    bat1Name: string
    bat1Runs: number
    bat1fours: number
    bat1sixes: number
    bat2Id: number
    bat2Name: string
    bat2Runs: number
    bat2fours: number
    bat2sixes: number
    totalRuns: number
    totalBalls: number
    bat1balls: number
    bat2balls: number
    bat1Ones: number
    bat1Twos: number
    bat1Threes: number
    bat1Fives: number
    bat1Boundaries: number
    bat1Sixers: number
    bat2Ones: number
    bat2Twos: number
    bat2Threes: number
    bat2Fives: number
    bat2Boundaries: number
    bat2Sixers: number
  }
  
  export interface Pat6 {
    bat1Id: number
    bat1Name: string
    bat1Runs: number
    bat1fours: number
    bat1sixes: number
    bat2Id: number
    bat2Name: string
    bat2Runs: number
    bat2fours: number
    bat2sixes: number
    totalRuns: number
    totalBalls: number
    bat1balls: number
    bat2balls: number
    bat1Ones: number
    bat1Twos: number
    bat1Threes: number
    bat1Fives: number
    bat1Boundaries: number
    bat1Sixers: number
    bat2Ones: number
    bat2Twos: number
    bat2Threes: number
    bat2Fives: number
    bat2Boundaries: number
    bat2Sixers: number
  }
  
  export interface Pat5 {
    bat1Id: number
    bat1Name: string
    bat1Runs: number
    bat1fours: number
    bat1sixes: number
    bat2Id: number
    bat2Name: string
    bat2Runs: number
    bat2fours: number
    bat2sixes: number
    totalRuns: number
    totalBalls: number
    bat1balls: number
    bat2balls: number
    bat1Ones: number
    bat1Twos: number
    bat1Threes: number
    bat1Fives: number
    bat1Boundaries: number
    bat1Sixers: number
    bat2Ones: number
    bat2Twos: number
    bat2Threes: number
    bat2Fives: number
    bat2Boundaries: number
    bat2Sixers: number
  }
  
  export interface Pat4 {
    bat1Id: number
    bat1Name: string
    bat1Runs: number
    bat1fours: number
    bat1sixes: number
    bat2Id: number
    bat2Name: string
    bat2Runs: number
    bat2fours: number
    bat2sixes: number
    totalRuns: number
    totalBalls: number
    bat1balls: number
    bat2balls: number
    bat1Ones: number
    bat1Twos: number
    bat1Threes: number
    bat1Fives: number
    bat1Boundaries: number
    bat1Sixers: number
    bat2Ones: number
    bat2Twos: number
    bat2Threes: number
    bat2Fives: number
    bat2Boundaries: number
    bat2Sixers: number
  }
  
  export interface Pat7 {
    bat1Id: number
    bat1Name: string
    bat1Runs: number
    bat1fours: number
    bat1sixes: number
    bat2Id: number
    bat2Name: string
    bat2Runs: number
    bat2fours: number
    bat2sixes: number
    totalRuns: number
    totalBalls: number
    bat1balls: number
    bat2balls: number
    bat1Ones: number
    bat1Twos: number
    bat1Threes: number
    bat1Fives: number
    bat1Boundaries: number
    bat1Sixers: number
    bat2Ones: number
    bat2Twos: number
    bat2Threes: number
    bat2Fives: number
    bat2Boundaries: number
    bat2Sixers: number
  }
  
  export interface MatchHeader {
    matchId: number
    matchDescription: string
    matchFormat: string
    matchType: string
    complete: boolean
    domestic: boolean
    matchStartTimestamp: number
    matchCompleteTimestamp: number
    dayNight: boolean
    year: number
    state: string
    status: string
    tossResults: TossResults
    result: Result
    revisedTarget: RevisedTarget
    playersOfTheMatch: PlayersOfTheMatch[]
    playersOfTheSeries: PlayersOfTheSery[]
    matchTeamInfo: MatchTeamInfo[]
    isMatchNotCovered: boolean
    team1: Team1
    team2: Team2
    seriesDesc: string
    seriesId: number
    seriesName: string
    alertType: string
    livestreamEnabled: boolean
  }
  
  export interface TossResults {
    tossWinnerId: number
    tossWinnerName: string
    decision: string
  }
  
  export interface Result {
    resultType: string
    winningTeam: string
    winningteamId: number
    winningMargin: number
    winByRuns: boolean
    winByInnings: boolean
  }
  
  export interface RevisedTarget {
    reason: string
  }
  
  export interface PlayersOfTheMatch {
    id: number
    name: string
    fullName: string
    nickName: string
    captain: boolean
    keeper: boolean
    substitute: boolean
    teamName: string
    faceImageId: number
  }
  
  export interface PlayersOfTheSery {
    id: number
    name: string
    fullName: string
    nickName: string
    captain: boolean
    role: string
    keeper: boolean
    substitute: boolean
    teamId: number
    battingStyle: string
    bowlingStyle: string
    teamName: string
    faceImageId: number
  }
  
  export interface MatchTeamInfo {
    battingTeamId: number
    battingTeamShortName: string
    bowlingTeamId: number
    bowlingTeamShortName: string
  }
  
  export interface Team1 {
    id: number
    name: string
    playerDetails: any[]
    shortName: string
  }
  
  export interface Team2 {
    id: number
    name: string
    playerDetails: any[]
    shortName: string
  }
  