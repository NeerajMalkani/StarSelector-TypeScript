export const FormatOvers = (overs?: number) => {
  let oversFormatted: string | undefined = "";
  const splitedOvers = overs ? overs.toString().split(".") : "";
  oversFormatted = overs && splitedOvers.length > 0 ? (splitedOvers[1] === "6" ? parseInt(splitedOvers[0]) + 1 + ".0" : overs.toString()) : overs ? overs.toString() : "";
  return oversFormatted;
};

export const FormatScore = (runs?: number, wickets?: number) => {
  let scoreFormatted: string | undefined = "";
  scoreFormatted = (runs ? runs : "0") + "/" + (wickets ? wickets : "0");
  return scoreFormatted;
};
