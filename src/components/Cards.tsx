import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SLIDER_WIDTH } from "../screens/dashboard/Home";
import { Styles } from "../styles/styles";
import { NoImage } from "../utils/Constants";

const CarouselCardItem = ({ item, index, colors, multicolors, isLast, type }: any) => {
  
  const FormattedTeamOvers = (teamOvers: any) => {
    let team1OversFormatted: string | undefined = "";
    if (teamOvers && teamOvers.toString().split(".").length > 0) {
      team1OversFormatted = teamOvers.toString().split(".")[1] === "6" ? teamOvers.toString().split(".")[0] + ".0" : teamOvers;
    } else {
      team1OversFormatted = teamOvers;
    }
    return team1OversFormatted;
  };

  const team1Runs = item.team1RunsInn2 ? item.team1RunsInn2 : item.team1RunsInn1,
    team1Overs = item.team1OversInn2 ? FormattedTeamOvers(item.team1OversInn2) : FormattedTeamOvers(item.team1OversInn1),
    team1Wickets = item.team1WicketsInn2 ? item.team1WicketsInn2 : item.team1WicketsInn1;

  const team2Runs = item.team2RunsInn2 ? item.team2RunsInn2 : item.team2RunsInn1,
    team2Overs = item.team2OversInn2 ? FormattedTeamOvers(item.team2OversInn2) : FormattedTeamOvers(item.team2OversInn1),
    team2Wickets = item.team2WicketsInn2 ? item.team2WicketsInn2 : item.team2WicketsInn1;

  return (
    <View style={[Styles.borderRadius8, Styles.padding16, Styles.paddingBottom24, Styles.marginStart16, Styles.marginVertical16, { elevation: 7, backgroundColor: colors.backgroundTertiary, width: 196, marginEnd: isLast ? 16 : 0 }]} key={index}>
      <View style={[Styles.flexRow, Styles.flexAlignCenter, { justifyContent: "space-between" }]}>
        <View style={[Styles.flexAlignCenter, Styles.flexJustifyCenter, Styles.paddingVertical2, { borderBottomWidth: 2, borderBottomColor: item.state === "In Progress" ? multicolors.green : multicolors.yellow }]}>
          <Text variant="labelMedium" style={[Styles.fontBold, { color: colors.text }]}>
            {item.state === "In Progress" ? "Live" : item.state}
          </Text>
        </View>
        <View>
          <Text variant="labelSmall" style={[{ color: colors.text }]}>
            2.4k
          </Text>
        </View>
      </View>
      <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.marginTop24, { justifyContent: "space-around" }]}>
        <View style={[Styles.flexColumn, Styles.flexAlignCenter]}>
          <Image style={[Styles.width32, Styles.height24]} source={{ uri: item.team1Image ? item.team1Image : NoImage }} />
          <Text variant="titleSmall" style={[Styles.marginTop4]}>
            {item.team1Name}
          </Text>
        </View>
        <View style={[Styles.flexColumn, Styles.flexAlignCenter]}>
          <Image style={[Styles.width32, Styles.height24]} source={{ uri: item.team2Image ? item.team2Image : NoImage }} />
          <Text variant="titleSmall" style={[Styles.marginTop4]}>
            {item.team2Name}
          </Text>
        </View>
      </View>
      <View style={[Styles.flexColumn, Styles.marginTop12]}>
        <View style={[Styles.flexRow, Styles.flexAlignCenter, { justifyContent: "space-between" }]}>
          <Text variant="labelMedium" numberOfLines={1} style={[Styles.marginTop4, Styles.paddingEnd4, Styles.flex1]}>
            {item.team1FullName}
          </Text>
          <Text variant="titleMedium">{(team1Runs ? team1Runs : 0) + "/" + (team1Wickets ? team1Wickets : 0)}</Text>
        </View>
        <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.marginTop4, { justifyContent: "space-between" }]}>
          <Text variant="labelMedium" numberOfLines={1} style={[Styles.marginTop4, Styles.paddingEnd4, Styles.flex1]}>
            {item.team2FullName}
          </Text>
          <Text variant="titleMedium">{(team2Runs ? team2Runs : 0) + "/" + (team2Wickets ? team2Wickets : 0)}</Text>
        </View>
      </View>
      {type === "upcoming" && <Button mode="contained" style={[Styles.marginTop16]} onPress={() => {}}>Create Team</Button>}
    </View>
  );
};

export default CarouselCardItem;
