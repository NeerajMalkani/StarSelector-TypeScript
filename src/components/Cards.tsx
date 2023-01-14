import { Image, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import CountDown from "react-native-countdown-component";
import { Team } from "../models/Props";
import { Styles } from "../styles/styles";
import { NoImage, s3Path } from "../utils/Constants";

const CarouselCardItem = ({ item, colors, multicolors, isLast }: any) => {
  const CreateTeam = (team: Team, index: number) => {
    return (
      <View style={[Styles.flexColumn, index === 1 ? Styles.flexAlignStart : Styles.flexAlignEnd, Styles.flex1]}>
        {/* <Text variant="labelSmall" style={{ color: colors.textSecondary }}>
          {team.teamName}
        </Text> */}
        <View style={[index === 1 ? Styles.flexRow : Styles.flexRowReverse, Styles.flexAlignCenter]}>
          <Image source={{ uri: team.imageId ? s3Path + team.imageId + ".png" : NoImage }} style={[Styles.width32, Styles.height24, index === 1 ? Styles.marginEnd8 : Styles.marginStart8]} />
          <Text variant="labelSmall">{team.teamSName}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={[Styles.borderRadius8, Styles.marginHorizontal24, Styles.margin16, { elevation: 7, backgroundColor: colors.backgroundTertiary, marginBottom: isLast ? 16 : 0 }]}>
      <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.paddingStart16, Styles.height48, Styles.borderBottom1, { justifyContent: "space-between", borderBottomColor: colors.seperator }]}>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
          {item.matchInfo.seriesName}
        </Text>
        <IconButton icon="bell-ring-outline" iconColor={colors.text} size={18} onPress={() => {}} />
      </View>
      <View style={[Styles.paddingHorizontal16, Styles.paddingVertical8]}>
        <Text variant="bodyMedium">{item.matchInfo.matchDesc}</Text>
      </View>
      <View style={[Styles.flexRow, Styles.paddingHorizontal16, Styles.paddingVertical8, Styles.flexAlignCenter, { justifyContent: "space-between" }]}>
        {CreateTeam(item.matchInfo.team1, 1)}
        <View>
          <CountDown until={(item.matchInfo.startDate - new Date().getTime()) / 1000} timeLabels={{d: 'Days',  h: 'Hours', m: 'Minutes', s: 'Secs'}} digitTxtStyle={{color: colors.inverseText}} digitStyle={{ backgroundColor: colors.primary }} onFinish={() => console.log("finished")} size={12} />
        </View>
        {CreateTeam(item.matchInfo.team2, 2)}
      </View>
      <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.paddingHorizontal16, Styles.height48, Styles.width100per, Styles.borderRadius8, {justifyContent: "space-between", backgroundColor: "#efefef"}]}>
          <Text variant="labelMedium">2.4k</Text>
          <Button compact mode="text" icon="hand-coin" onPress={() => {}}>Join Contest</Button>
      </View>
    </View>
  );
};

export default CarouselCardItem;
