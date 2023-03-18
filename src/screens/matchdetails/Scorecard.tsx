import { useState, useEffect } from "react";
import { View, ActivityIndicator, ScrollView, RefreshControl, TouchableNativeFeedback } from "react-native";
import { Text } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { GetMatchScorecard } from "../../api/APICalls";
import NoData from "../../components/NoData";
import { MatchScorecard, ScoreCard, ScoreDetails } from "../../models/MatchScorecard";
import { Styles } from "../../styles/styles";
import { FormatOvers, FormatScore, FormatScorecardName, FormatScoreName } from "../../utils/Formatter";

const Scorecard = ({ matchID, theme }: any) => {
  const { colors, multicolors } = theme;
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const collapsible1 = useState(true);
  const collapsible2 = useState(true);
  const collapsible3 = useState(true);
  const collapsible4 = useState(true);
  const arrcollapsed = [collapsible1, collapsible2, collapsible3, collapsible4];
  const [matchScorecard, setMatchScorecard] = useState<MatchScorecard>();

  const MatchScorecardSuccess = (response: any) => {
    if (response && response.data) {
      setMatchScorecard(response.data);
    }
    setRefreshing(false);
    setIsLoading(false);
  };

  const MatchScorecardFail = (errorMessage: string) => {
    console.log(errorMessage);
    setRefreshing(false);
    setIsLoading(false);
  };

  const CreateScoreCardTable = ({ batTeamDetails }: any) => {
    return (
      <View style={[Styles.flexColumn]}>
        {Object.keys(batTeamDetails.batsmenData).map((k: string, i: number) => {
          return (
            <View key={i} style={[Styles.flexRow, Styles.paddingHorizontal16, Styles.height72, Styles.flexAlignCenter, Styles.borderBottom1, { borderBottomColor: colors.seperator }]}>
              <View style={[Styles.flex4]}>
                <Text variant="bodyLarge" numberOfLines={1} ellipsizeMode="tail">
                  {FormatScoreName(batTeamDetails.batsmenData["bat_" + (i + 1)].batName)}
                </Text>
                <Text variant="bodySmall" numberOfLines={2} ellipsizeMode="tail" style={[Styles.paddingEnd12, { color: colors.textSecondary }]}>
                  {batTeamDetails.batsmenData["bat_" + (i + 1)].outDesc === "" ? "Yet to bat" : FormatScorecardName(batTeamDetails.batsmenData["bat_" + (i + 1)].outDesc)}
                </Text>
              </View>
              <Text variant="bodyMedium" style={[Styles.flex1]}>
                {batTeamDetails.batsmenData["bat_" + (i + 1)].runs}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1]}>
                {batTeamDetails.batsmenData["bat_" + (i + 1)].balls}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1]}>
                {batTeamDetails.batsmenData["bat_" + (i + 1)].fours}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1]}>
                {batTeamDetails.batsmenData["bat_" + (i + 1)].sixes}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1]}>
                {batTeamDetails.batsmenData["bat_" + (i + 1)].strikeRate}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  interface ScorecardHeader {
    scorecard: ScoreCard;
    index: number;
  }

  const CreateScoreCardHeader = ({ scorecard, index }: ScorecardHeader) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          arrcollapsed[index][1](!arrcollapsed[index][0]);
        }}
      >
        <View key={scorecard.matchId} style={[Styles.flexColumn]}>
          <View style={[Styles.flexRow, Styles.height56, Styles.paddingHorizontal16, Styles.flexAlignCenter, Styles.borderBottom1, { justifyContent: "space-between", borderBottomColor: colors.seperator }]}>
            <Text variant="bodyMedium">{scorecard.batTeamDetails.batTeamName}</Text>
            <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
              <Text variant="titleMedium">{FormatScore(scorecard.scoreDetails.runs, scorecard.scoreDetails.wickets)}</Text>
              <Text variant="bodyMedium" style={[Styles.marginStart4]}>
                ({FormatOvers(scorecard.scoreDetails.overs)})
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    GetMatchScorecard({ matchID: matchID }, MatchScorecardSuccess, MatchScorecardFail);
  };

  useEffect(() => {
    GetMatchScorecard({ matchID: matchID }, MatchScorecardSuccess, MatchScorecardFail);
  }, []);

  return (
    <View style={[Styles.flex1]}>
      {isLoading ? (
        <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
          <ActivityIndicator animating={true} color={colors.primary} size={32} />
        </View>
      ) : matchScorecard ? (
        <ScrollView style={[Styles.flex1]} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl colors={[theme.colors.primary]} refreshing={refreshing} onRefresh={onRefresh} />}>
          {matchScorecard.scoreCard.map((k: ScoreCard, i: number) => {
            return (
              <View key={i}>
                <CreateScoreCardHeader scorecard={k} index={i} />
                <Collapsible collapsed={arrcollapsed[i][0]}>
                  <CreateScoreCardTable {...k} />
                </Collapsible>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <NoData iconName="earth" title="No Live feed" subtitle="Match has not started yet or has been interupted" />
      )}
    </View>
  );
};

export default Scorecard;
