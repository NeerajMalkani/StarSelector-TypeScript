import { View } from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";
import { Styles } from "../styles/styles";

const Header = ({ colors, multicolors, title }: any) => {
  return (
    <View style={[Styles.width100per, Styles.height64, { backgroundColor: colors.primary, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }]}>
      <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.padding4, Styles.paddingHorizontal24, { justifyContent: "space-between" }]}>
        <Text variant="headlineSmall" style={[{ color: multicolors.white }]}>
          {title}
        </Text>
        <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
          <IconButton icon="wallet" iconColor={multicolors.white} size={32} onPress={() => console.log("Pressed")} />
          <IconButton icon="bell" iconColor={multicolors.white} size={32} style={[{ marginStart: -4 }]} onPress={() => console.log("Pressed")} />
          <Avatar.Image size={40} style={[Styles.marginStart4, { backgroundColor: colors.primaryDark }]} source={{ uri: "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png" }} />
        </View>
      </View>
    </View>
  );
};

export default Header;
