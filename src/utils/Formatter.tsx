import { View } from "react-native";
import { Text } from "react-native-paper";
import { Styles } from "../styles/styles";

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

export const FormatScoreName = (name?: string) => {
  let nameFormatted: string | undefined = "";
  let splittedName: Array<string> = name ? name.split(" ") : [];
  nameFormatted = splittedName.length > 1 ? splittedName[0].substring(0, 1) + "." + splittedName[1] : splittedName[0];
  return nameFormatted;
};

export const FormatScorecardName = (name?: string) => {
  let nameFormatted: string | undefined = "";
  let splittedName: Array<string> = name ? name.split(" ") : [];
  for (let i = 0; i < splittedName.length; i++) {
    if (
      splittedName[i] !== ")" &&
      splittedName[i] !== "(" &&
      splittedName[i] !== "and" &&
      splittedName[i] !== "lbw" &&
      splittedName[i] !== "b" &&
      splittedName[i] !== "c" &&
      splittedName[i] !== "run out" &&
      splittedName[i + 1] !== ")" &&
      splittedName[i + 1] !== "(" &&
      splittedName[i + 1] !== "and" &&
      splittedName[i + 1] !== "lbw" &&
      splittedName[i + 1] !== "b" &&
      splittedName[i + 1] !== "c" &&
      splittedName[i + 1] !== "run out" &&
      i < splittedName.length - 1
    ) {
      splittedName[i] = splittedName[i].includes("(sub)") ? splittedName[i].substring(0, 6) + "." : splittedName[i].substring(0, 1) + ".";
    }
  }
  nameFormatted = splittedName.join(" ");
  return nameFormatted;
};

export const FormatMatchState = ({ matchState, multicolors }: any) => {
  let stateBgColor = multicolors.red;
  let stateText = "";
  switch (matchState) {
    case "In Progress":
      stateBgColor = multicolors.green;
      stateText = "Live";
      break;
    case "Complete":
      stateBgColor = multicolors.yellow;
      stateText = "Finished";
      break;
    default:
      stateBgColor = multicolors.red;
      stateText = matchState;
      break;
  }
  return (
    <View style={[Styles.paddingHorizontal8, Styles.paddingVertical4, Styles.marginEnd16, Styles.borderRadius4, { backgroundColor: stateBgColor }]}>
      <Text variant="bodySmall" style={{ color: multicolors.white }}>
        {stateText}
      </Text>
    </View>
  );
};
