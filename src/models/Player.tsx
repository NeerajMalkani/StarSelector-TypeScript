export interface Player {
  id: string;
  bat: string;
  bowl: string;
  name: string;
  nickName: string;
  role: string;
  birthPlace: string;
  intlTeam: string;
  teams: string;
  DoB: string;
  image: string;
  bio: string;
  rankings: Rankings;
  DoBFormat: string;
  faceImageId: string;
}

export interface Rankings {
  bat: Bat[];
  bowl: Bowl[];
  all: All[];
}

export interface Bat {
  testBestRank: string;
  odiBestRank: string;
  t20BestRank: string;
}

export interface Bowl {
  testBestRank: string;
  odiBestRank: string;
  t20BestRank: string;
}

export interface All {
  testBestRank: string;
  odiBestRank: string;
  t20BestRank: string;
}
