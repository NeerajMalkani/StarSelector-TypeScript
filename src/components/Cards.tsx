import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { Styles } from "../styles/styles";

const CarouselCardItem = ({ item, index }: any) => {
  return (
    <View style={[Styles.borderRadius8, Styles.paddingBottom32, Styles.padding16, Styles.margin16, { elevation: 7, backgroundColor: "white" }]} key={index}>
      <Text variant="titleMedium">{item.matchTitle}</Text>
      <Text variant="bodyMedium">{item.matchDesc}</Text>
      <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.marginTop16, { justifyContent: "space-between" }]}>
        <View style={[Styles.flexColumn]}>
          <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
            <Image style={[Styles.width32, Styles.height24]} source={{ uri: item.team1Image ? item.team1Image : "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=" }} />
            <Text variant="titleSmall" style={[Styles.marginStart8]}>
              {item.team1Name}
            </Text>
          </View>
        </View>
        <View style={[Styles.flexColumn]}>
          <Text variant="bodySmall">{item.state}</Text>
        </View>
        <View style={[Styles.flexColumn]}>
          <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.flexJustifyEnd]}>
            <Text variant="titleSmall" style={[Styles.marginEnd8]}>
              {item.team2Name}
            </Text>
            <Image style={[Styles.width32, Styles.height24]} source={{ uri: item.team2Image ? item.team2Image : "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=" }} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CarouselCardItem;
