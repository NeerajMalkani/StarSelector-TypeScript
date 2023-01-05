import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { Styles } from "../styles/styles";
import { NoImage } from "../utils/Constants";

const CarouselCardItem = ({ item, index }: any) => {
  interface TeamInfo {
    teamFlag: string;
    teamName: string;
    teamRuns?: string;
    teamOvers?: string;
    teamWickets?: string;
  }
  const CreateTeamInfo = (teamprops: TeamInfo) => {
    return (
      <View style={[Styles.flexColumn]}>
        <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
          <Image style={[Styles.width32, Styles.height24]} source={{ uri: teamprops.teamFlag }} />
          <Text variant="titleSmall" style={[Styles.marginStart8]}>
            {teamprops.teamName}
          </Text>
        </View>
        <View style={[Styles.flexRow]}>
          <Text variant="titleLarge">{(teamprops.teamRuns ? teamprops.teamRuns : 0) + "/" + (teamprops.teamWickets ? teamprops.teamWickets : 0)}</Text>
          <Text variant="titleSmall">{"(" + (teamprops.teamOvers ? teamprops.teamOvers : 0) + ")"}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[Styles.borderRadius8, Styles.paddingBottom32, Styles.padding16, Styles.margin16, { elevation: 7, backgroundColor: "white" }]} key={index}>
      <Text variant="titleMedium">{item.matchTitle}</Text>
      <Text variant="bodyMedium">{item.matchDesc}</Text>
      <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.marginTop16, { justifyContent: "space-between" }]}>
        {CreateTeamInfo({ teamName: item.team1Name, teamFlag: item.team1Image ? item.team1Image : NoImage, teamRuns: item.team1RunsInn1, teamOvers: item.team1OversInn1, teamWickets: item.team1WicketsInn1 })}
        <View style={[Styles.flexColumn]}>
          <Text variant="bodySmall">{item.state}</Text>
        </View>
        {CreateTeamInfo({ teamName: item.team2Name, teamFlag: item.team2Image ? item.team2Image : NoImage, teamRuns: item.team2RunsInn1, teamOvers: item.team2OversInn1, teamWickets: item.team2WicketsInn1 })}
      </View>
    </View>
  );
};

export default CarouselCardItem;
