import { View } from "react-native";
import { Text } from "react-native-paper";
import { Styles } from "../styles/styles";

const SectionTitle = ({ title, colors }: any) => {
  return (
    <View style={[Styles.paddingVertical16, { backgroundColor: colors.background }]}>
      <Text variant="titleMedium" style={[Styles.paddingHorizontal24, { backgroundColor: colors.background }]}>
        {title}
      </Text>
      <View style={[Styles.width56, Styles.height4, Styles.marginTop4, Styles.borderRadius2, Styles.marginStart24, { backgroundColor: colors.primary }]}></View>
    </View>
  );
};

export default SectionTitle;
