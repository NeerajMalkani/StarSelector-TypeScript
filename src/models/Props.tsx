export interface BasicProps {
  theme: any;
  route: any;
  navigation: any;
}

export interface Match {
  matchTitle?: string;
  matchDesc?: string;
  matchFormat?: string;
  team1ImageID?: number;
  team1Image?: string;
  team1Name?: string;
  team1FullName?: string;
  team1RunsInn1?: number;
  team1WicketsInn1?: number;
  team1OversInn1?: number;
  team1RunsInn2?: number;
  team1WicketsInn2?: number;
  team1OversInn2?: number;
  team2ImageID?: number;
  team2Image?: string;
  team2Name?: string;
  team2FullName?: string;
  team2RunsInn1?: number;
  team2WicketsInn1?: number;
  team2OversInn1?: number;
  team2RunsInn2?: number;
  team2WicketsInn2?: number;
  team2OversInn2?: number;
  startDate?: string;
  endDate?: string;
  state?: string;
  status?: string;
}
