export interface Team {
    teamId: number;
    teamName: string;
    teamSName: string;
    imageId: number;
}

export interface Squad {
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

export interface PlayingXI {
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

export interface Bench {
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

export interface Players {
    playingXI: PlayingXI[];
    bench: Bench[];
    Squad: Squad[];
}

export interface TeamRoot {
    team: Team;
    players: Players;
}

export interface Squads {
    team1: TeamRoot;
    team2: TeamRoot;
}
