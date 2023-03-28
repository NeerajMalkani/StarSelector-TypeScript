import { ActivityIndicator, View } from "react-native";
import { Styles } from "../styles/styles";

const OverlayLoader = ({ colors }: any) => {
  return (
    <View style={[Styles.positionAbsolute, Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter, Styles.width100per, Styles.height100per, { top: 0, zIndex: 2}]}>
      <ActivityIndicator animating={true} color={colors.primary} size={32} />
    </View>
  );
};

export default OverlayLoader;
