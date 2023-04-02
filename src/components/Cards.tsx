import { Image, TouchableNativeFeedback, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import CountDown from "react-native-countdown-component";
import TextTicker from "react-native-text-ticker";
import moment from "moment";
import { Team, TeamScore } from "../models/Matches";
import { Styles } from "../styles/styles";
import { NoImage, s3Path } from "../utils/Constants";
import { FormatMatchState, FormatOvers, FormatScore } from "../utils/Formatter";

export const UpcomingCardItem = ({ item, colors, multicolors, isCountdownRunning, navigation }: any) => {
  const CreateTeam = (team: Team, index: number) => {
    return (
      <View style={[Styles.flexColumn, index === 1 ? Styles.flexAlignStart : Styles.flexAlignEnd, Styles.flex1]}>
        <Text variant="labelSmall" numberOfLines={1} ellipsizeMode="tail" style={[Styles.marginBottom8, { color: colors.textSecondary, maxWidth: 104 }]}>
          {team.teamName}
        </Text>
        <View style={[index === 1 ? Styles.flexRow : Styles.flexRowReverse, Styles.flexAlignCenter]}>
          <Image source={{ uri: team.imageId ? s3Path.replace("{faceid}", team.imageId.toString()) : NoImage }} style={[Styles.width32, Styles.height24, index === 1 ? Styles.marginEnd8 : Styles.marginStart8]} />
          <Text variant="labelSmall">{team.teamSName}</Text>
        </View>
      </View>
    );
  };
  const OnMatchInfoClick = () => {
    navigation.navigate("MatchDetails", {
      matchID: item.matchInfo.matchId,
      matchName: item.matchInfo.team1.teamSName + " vs " + item.matchInfo.team2.teamSName,
      team1Name: item.matchInfo.team1.teamName,
      team2Name: item.matchInfo.team2.teamName,
    });
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
          <CountDown running={true} until={(item.matchInfo.startDate - new Date().getTime()) / 1000} timeLabelStyle={{ color: colors.text }} timeLabels={{ d: "Days", h: "Hours", m: "Minutes", s: "Secs" }} digitTxtStyle={{ color: colors.primary }} digitStyle={{ backgroundColor: multicolors.white, elevation: 2 }} size={12} />
        </View>
        {CreateTeam(item.matchInfo.team2, 2)}
      </View>
      <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.marginTop8, Styles.paddingHorizontal16, Styles.height48, Styles.width100per, Styles.borderRadius8, { justifyContent: "space-between", backgroundColor: colors.backgroundLight }]}>
        <Text variant="labelMedium">2.4k</Text>
        <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
          <Button compact mode="text" icon="information" labelStyle={{ marginStart: 4 }} onPress={OnMatchInfoClick}>
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
  const CreateTeam = (team: Team, teamScore: TeamScore, currentBatTeamId: number) => {
    return (
      <View style={[Styles.width100per, Styles.paddingVertical4, Styles.flexRow, { justifyContent: "space-between" }]}>
        <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.flex4]}>
          <Image source={{ uri: team.imageId ? s3Path.replace("{faceid}", team.imageId.toString()) : NoImage }} style={[Styles.width32, Styles.height24]} />
          <Text variant="titleSmall" numberOfLines={1} ellipsizeMode="tail" style={[Styles.marginStart8, Styles.marginEnd8]}>
            {team.teamName}
          </Text>
        </View>
        <View style={[Styles.flexRow, Styles.flexAlignCenter, Styles.flex1_5]}>
          <Text variant={team.teamId === currentBatTeamId ? "titleLarge" : "bodyLarge"} style={{ color: team.teamId === currentBatTeamId ? colors.text : colors.textSecondary }}>
            {teamScore ? FormatScore(teamScore.inngs2 ? teamScore.inngs2?.runs : teamScore.inngs1?.runs, teamScore.inngs2 ? teamScore.inngs2?.wickets : teamScore.inngs1?.wickets) : "0/0"}
          </Text>
          <Text variant="bodySmall" style={[Styles.marginStart4, { color: colors.textSecondary }]}>
            ({teamScore ? FormatOvers(teamScore.inngs2 ? teamScore.inngs2?.overs : teamScore.inngs1?.overs) : "0.0"})
          </Text>
        </View>
      </View>
    );
  };
  const OnCardClick = () => {
    navigation.navigate("MatchDetails", {
      matchID: item.matchInfo.matchId,
      matchName: item.matchInfo.team1.teamSName + " vs " + item.matchInfo.team2.teamSName,
      team1Name: item.matchInfo.team1.teamName,
      team2Name: item.matchInfo.team2.teamName,
      matchStatus: item.matchInfo.status,
    });
  };
  return (
    <TouchableNativeFeedback onPress={OnCardClick}>
      <View style={[Styles.borderRadius8, Styles.marginHorizontal12, Styles.marginHorizontal16, Styles.marginTop4, Styles.marginBottom16, { elevation: 7, backgroundColor: colors.backgroundTertiary }]}>
        <View style={[Styles.flexRow, Styles.flex4, Styles.flexAlignCenter, Styles.paddingStart16, Styles.height48, Styles.borderBottom1, { justifyContent: "space-between", borderBottomColor: colors.seperator, overflow: "hidden" }]}>
          <View style={[Styles.flex3, Styles.paddingEnd8]}>
            <TextTicker style={{ color: colors.textSecondary }} loop={false} duration={10000} marqueeDelay={1000}>
              {item.matchInfo.seriesName}
            </TextTicker>
          </View>
          <FormatMatchState matchState={item.matchInfo.state} multicolors={multicolors} />
        </View>
        <View style={[Styles.paddingHorizontal16, Styles.paddingVertical8]}>
          <Text variant="bodyMedium">{item.matchInfo.matchDesc}</Text>
        </View>
        <View style={[Styles.flexColumn, Styles.paddingHorizontal16, Styles.paddingVertical8, Styles.flexAlignCenter]}>
          {CreateTeam(item.matchInfo.team1, item.matchScore?.team1Score, item.matchInfo.currBatTeamId)}
          {CreateTeam(item.matchInfo.team2, item.matchScore?.team2Score, item.matchInfo.currBatTeamId)}
        </View>
        <View style={[Styles.paddingHorizontal16, Styles.paddingVertical12, Styles.borderTop1, { borderTopColor: colors.seperator }]}>
          <Text variant="bodyMedium" numberOfLines={1} ellipsizeMode="tail">
            {item.matchInfo.status ? item.matchInfo.status : "The match starts at " + moment(new Date(parseFloat(item.matchInfo.startDate))).format("MMM Do YYYY, h:mm:ss a")}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
