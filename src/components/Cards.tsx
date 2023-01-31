import { Image, TouchableNativeFeedback, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import CountDown from "react-native-countdown-component";
import { Team, TeamScore } from "../models/Props";
import { Styles } from "../styles/styles";
import { NoImage, s3Path } from "../utils/Constants";
import { FormatOvers, FormatScore } from "../utils/Formatter";
import { Icon } from "../screens/DashboardScreen";

export const UpcomingCardItem = ({ item, colors, multicolors, isCountdownRunning, navigation }: any) => {
  const CreateTeam = (team: Team, index: number) => {
    return (
      <View style={[Styles.flexColumn, index === 1 ? Styles.flexAlignStart : Styles.flexAlignEnd, Styles.flex1]}>
        <Text variant="labelSmall" numberOfLines={1} ellipsizeMode="tail" style={[Styles.marginBottom8, { color: colors.textSecondary, maxWidth: 104 }]}>
          {team.teamName}
        </Text>
        <View style={[index === 1 ? Styles.flexRow : Styles.flexRowReverse, Styles.flexAlignCenter]}>
          <Image source={{ uri: team.imageId ? s3Path + team.imageId + ".png" : NoImage }} style={[Styles.width32, Styles.height24, index === 1 ? Styles.marginEnd8 : Styles.marginStart8]} />
          <Text variant="labelSmall">{team.teamSName}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={[Styles.borderRadius8, Styles.margin16, Styles.marginTop2, { elevation: 7, backgroundColor: colors.backgroundTertiary }]}>
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
          <CountDown
            running={isCountdownRunning}
            until={(item.matchInfo.startDate - new Date().getTime()) / 1000}
            timeLabelStyle={{ color: colors.text }}
            timeLabels={{ d: "Days", h: "Hours", m: "Minutes", s: "Secs" }}
            digitTxtStyle={{ color: colors.primary }}
            digitStyle={{ backgroundColor: multicolors.white, elevation: 2 }}
            onFinish={() => console.log("finished")}
            size={12}
          />
        </View>
        {CreateTeam(item.matchInfo.team2, 2)}
      </View>
      <View
        style={[Styles.flexRow, Styles.flexAlignCenter, Styles.marginTop8, Styles.paddingHorizontal16, Styles.height48, Styles.width100per, Styles.borderRadius8, { justifyContent: "space-between", backgroundColor: colors.backgroundLight }]}
      >
        <Text variant="labelMedium">2.4k</Text>
        <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
          <Button compact mode="text" icon="information" labelStyle={{ marginStart: 4 }} onPress={() => {}}>
            INFO
          </Button>
          <Button compact mode="text" icon="handshake" labelStyle={{ marginStart: 4 }} textColor={colors.secondary} style={[Styles.marginStart8]} onPress={() => {}}>
            JOIN
          </Button>
        </View>
      </View>
    </View>
  );
};

export const LiveCardItem = ({ item, colors, multicolors, navigation }: any) => {
  const MatchStateFormatter = ({ matchState }: any) => {
    let stateBgColor = multicolors.red;
    let stateText = "";
    switch (matchState) {
      case "In Progress":
        stateBgColor = multicolors.green;
        stateText = "Live";
        break;
      case "Complete":
        stateBgColor = multicolors.yellow;
        stateText = "Finished";
        break;
      default:
        stateBgColor = multicolors.red;
        stateText = matchState;
        break;
    }
    return (
      <View style={[Styles.paddingHorizontal8, Styles.paddingVertical4, Styles.marginEnd16, Styles.borderRadius4, { backgroundColor: stateBgColor }]}>
        <Text variant="bodySmall" style={{ color: multicolors.white }}>
          {stateText}
        </Text>
      </View>
    );
  };

  const CreateTeam = (team: Team, teamScore: TeamScore, currentBatTeamId: number) => {
    return (
      <View style={[Styles.width100per, Styles.paddingVertical4, Styles.flexRow, { justifyContent: "space-between" }]}>
        <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
          <Image source={{ uri: team.imageId ? s3Path + team.imageId + ".png" : NoImage }} style={[Styles.width32, Styles.height24]} />
          <Text variant="titleSmall" style={[Styles.marginStart8]}>
            {team.teamName}
          </Text>
        </View>
        <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
          <Text variant={team.teamId === currentBatTeamId ? "titleLarge" : "bodyLarge"} style={{color: team.teamId === currentBatTeamId ? colors.text : colors.textSecondary}}>{teamScore ? FormatScore(teamScore.inngs1?.runs, teamScore.inngs1?.wickets) : "0/0"}</Text>
          <Text variant="bodySmall" style={[Styles.marginStart4, {color: colors.textSecondary}]}>
            ({teamScore ? FormatOvers(teamScore.inngs1?.overs) : "0.0"})
          </Text>
        </View>
      </View>
    );
  };
  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate("MatchDetails", {
          matchID: item.matchInfo.matchId,
          matchName: item.matchInfo.team1.teamSName + " vs " + item.matchInfo.team2.teamSName,
          team1ID: item.matchInfo.team1.teamId,
          team2ID: item.matchInfo.team2.teamId,
          team1Name: item.matchInfo.team1.teamName,
          team2Name: item.matchInfo.team2.teamName,
        })
      }
    >
      <View style={[Styles.borderRadius8, Styles.marginHorizontal12, Styles.margin16, { elevation: 7, backgroundColor: colors.backgroundTertiary }]}>
        <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.paddingStart16, Styles.height48, Styles.borderBottom1, { justifyContent: "space-between", borderBottomColor: colors.seperator }]}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            {item.matchInfo.seriesName}
          </Text>
          <MatchStateFormatter matchState={item.matchInfo.state} />
        </View>
        <View style={[Styles.paddingHorizontal16, Styles.paddingVertical8]}>
          <Text variant="bodyMedium">{item.matchInfo.matchDesc}</Text>
        </View>
        <View style={[Styles.flexColumn, Styles.paddingHorizontal16, Styles.paddingVertical8, Styles.flexAlignCenter]}>
          {CreateTeam(item.matchInfo.team1, item.matchScore?.team1Score, item.matchInfo.currentBatTeamId)}
          {CreateTeam(item.matchInfo.team2, item.matchScore?.team2Score, item.matchInfo.currentBatTeamId)}
        </View>
        <View style={[Styles.paddingHorizontal16, Styles.paddingVertical12, Styles.borderTop1, { borderTopColor: colors.seperator }]}>
          <Text variant="bodyMedium" numberOfLines={1} ellipsizeMode="tail">
            {item.matchInfo.status}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
