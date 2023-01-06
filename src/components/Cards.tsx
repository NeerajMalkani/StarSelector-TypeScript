import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { Styles } from "../styles/styles";
import { NoImage } from "../utils/Constants";

const CarouselCardItem = ({ item, index, colors }: any) => {
  interface TeamInfo {
    teamFlag: string;
    teamName: string;
    teamRuns?: string;
    teamOvers?: string;
    teamWickets?: string;
    teamIndex: number;

  }
  const CreateTeamInfo = (teamprops: TeamInfo) => {
    let overs: string | undefined = "";
    if(teamprops.teamOvers && teamprops.teamOvers.toString().split(".").length > 0){
      overs = teamprops.teamOvers.toString().split(".")[1] === "6" ? teamprops.teamOvers.toString().split(".")[0] + ".0" : teamprops.teamOvers;
    } else {
      overs = teamprops.teamOvers;
    }
    return (
      <View style={[Styles.flexColumn, Styles.flex1, {alignItems: teamprops.teamIndex === 1 ? "flex-start" : "flex-end"}]}>
        <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
          <Image style={[Styles.width32, Styles.height24]} source={{ uri: teamprops.teamFlag }} />
          <Text variant="titleSmall" style={[Styles.marginStart8]}>
            {teamprops.teamName}
          </Text>
        </View>
        <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.marginTop8]}>
          <Text variant="titleLarge">{(teamprops.teamRuns ? teamprops.teamRuns : 0) + "/" + (teamprops.teamWickets ? teamprops.teamWickets : 0)}</Text>
          <Text variant="bodyMedium" style={[Styles.marginStart8]}>{"(" + (overs ? overs : 0.0) + ")"}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[Styles.borderRadius8, Styles.padding16, Styles.margin16, { elevation: 7, backgroundColor: colors.backgroundTertiary }]} key={index}>
      <Text variant="titleMedium" numberOfLines={1} ellipsizeMode="tail">{item.matchTitle}</Text>
      <Text variant="bodyMedium">{item.matchDesc}</Text>
      <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.marginTop16, { justifyContent: "space-between" }]}>
        {CreateTeamInfo({ teamName: item.team1Name, teamFlag: item.team1Image ? item.team1Image : NoImage, teamRuns: item.team1RunsInn2 ? item.team1RunsInn2 : item.team1RunsInn1, teamOvers: item.team1OversInn2 ? item.team1OversInn2 : item.team1OversInn1, teamWickets: item.team1WicketsInn2 ? item.team1WicketsInn2 : item.team1WicketsInn1, teamIndex: 1 })}
        <View style={[Styles.flexColumn]}>
          <Text variant="bodySmall">{item.state}</Text>
        </View>
        {CreateTeamInfo({ teamName: item.team2Name, teamFlag: item.team2Image ? item.team2Image : NoImage, teamRuns: item.team2RunsInn2 ? item.team2RunsInn2 : item.team2RunsInn1, teamOvers: item.team2OversInn2 ? item.team2OversInn2 : item.team2OversInn1, teamWickets: item.team2WicketsInn2 ? item.team2WicketsInn2 : item.team2WicketsInn1, teamIndex: 2 })}
      </View>
      <View style={[Styles.width100per, Styles.height32, Styles.borderTop1, Styles.marginTop16, Styles.flexJustifyCenter, {borderTopColor: "#dedede"}]}>
          <Text variant="bodyMedium" ellipsizeMode="tail" numberOfLines={1}>{item.status}</Text>
      </View>
    </View>
  );
};

export default CarouselCardItem;
