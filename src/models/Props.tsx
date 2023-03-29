import { Player } from "./Player";

export interface BasicProps {
  theme: any;
  route: any;
  navigation: any;
}

export interface PlayerDetailsProps {
  bottomSheetRef: any;
  setIndex: any;
  playerData?: Player;
  isLoading: boolean;
  colors: any;
}