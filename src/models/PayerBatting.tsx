export interface PlayerBatting {
  headers: string[];
  values: Value[];
  seriesSpinner: SeriesSpinner[];
}

export interface Value {
  values: string[];
}

export interface SeriesSpinner {
  seriesName: string;
}
