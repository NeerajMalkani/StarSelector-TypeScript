export const FormatOvers = (overs: number) => {
  let oversFormatted: string | undefined = "";
  const splitedOvers = overs.toString().split(".");
  oversFormatted = overs && splitedOvers.length > 0 ? (splitedOvers[1] === "6" ? splitedOvers[0] + ".0" : overs.toString()) : overs.toString();
  return oversFormatted;
};

export const FormatScore = (runs: number, wickets: number) => {
  let scoreFormatted: string | undefined = "";
  scoreFormatted = (runs ? runs : "0") + "/" + (wickets ? wickets : "0");
  return scoreFormatted;
};
