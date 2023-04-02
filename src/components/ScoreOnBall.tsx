import { View } from "react-native";
import { Text } from "react-native-paper";
import { Styles } from "../styles/styles";

const ScroreOnBall = ({ index, score, colors, multicolors }: any) => {
  score = score ? score.toString() : "";
  let ballColor = colors.textSecondary;
  switch (true) {
    case score === "4":
      ballColor = multicolors.blue;
      break;
    case score === "6":
      ballColor = multicolors.green;
      break;
    case score === "W":
      ballColor = multicolors.red;
      break;
    case score === "Wd" || score === "wd":
      ballColor = multicolors.yellow;
      break;
    case score === "Nb" || score === "nb" || score === "N" || score === "n":
      ballColor = multicolors.yellow;
      break;
    case score === "B" || score === "b" || score === "by" || score === "Lb" || score === "lb":
      ballColor = multicolors.golden;
      break;
    case score === "... " || score === "..." || score === " ... " || score === "" || score === "  " || score === "|":
      ballColor = multicolors.white;
      break;
  }
  return score === "... " || score === "..." || score === " ... " || score === "" || score === "  " ? null : (
    <View key={new Date().getTime()} style={[Styles.marginStart4, Styles.padding4, Styles.flexAlignCenter, Styles.flexJustifyCenter, { borderRadius: 10000, minWidth: 24, backgroundColor: ballColor }]}>
      <Text variant="bodySmall" style={{ color: multicolors.white }}>
        {score}
      </Text>
    </View>
  );
};

export default ScroreOnBall;
