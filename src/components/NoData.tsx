import { View } from "react-native";
import { Text } from "react-native-paper";
import { Styles } from "../styles/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const NoData = ({ title, subtitle, iconName }: any) => {
  return (
    <View style={[Styles.flex1, Styles.flexColumn, Styles.paddingHorizontal16, Styles.flexAlignCenter, { marginTop: 128}]}>
      {iconName && <MaterialCommunityIcons name={iconName} size={72}/>}
      <Text variant="titleLarge">{title}</Text>
      {subtitle && <Text variant="bodyMedium">{subtitle}</Text>}
    </View>
  );
};

export default NoData;
