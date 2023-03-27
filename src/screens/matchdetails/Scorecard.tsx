import { useState, useEffect } from "react";
import { View, ActivityIndicator, ScrollView, RefreshControl, TouchableNativeFeedback } from "react-native";
import { Divider, Text } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { GetMatchScorecard } from "../../api/APICalls";
import NoData from "../../components/NoData";
import { MatchScorecard, ScoreCard } from "../../models/MatchScorecard";
import { Styles } from "../../styles/styles";
import { FormatOvers, FormatScore, FormatScoreName } from "../../utils/Formatter";

const Scorecard = ({ matchID, theme }: any) => {
  console.log(matchID);
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
      arrcollapsed[response.data.scoreCard.length - 1][1](false);
    }
    setRefreshing(false);
    setIsLoading(false);
  };

  const MatchScorecardFail = (errorMessage: string) => {
    console.log(errorMessage);
    setRefreshing(false);
    setIsLoading(false);
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
        <View key={scorecard.matchId} style={[Styles.flexColumn, { backgroundColor: "#C9D1FE" }]}>
          <View style={[Styles.flexRow, Styles.height48, Styles.paddingHorizontal16, Styles.flexAlignCenter, Styles.borderBottom1, { justifyContent: "space-between", borderBottomColor: colors.seperator }]}>
            <Text variant="titleMedium">{scorecard.batTeamDetails.batTeamName}</Text>
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
  const CreateScoreCardBattingTable = ({ batTeamDetails, wicketsData }: any) => {
    let strFOW = "";
    Object.keys(wicketsData).map((k: string, i: number) => {
      strFOW += wicketsData["wkt_" + (i + 1)].batName + "(" + wicketsData["wkt_" + (i + 1)].wktRuns + "-" + wicketsData["wkt_" + (i + 1)].wktNbr + "), ";
    });
    return (
      <View style={[Styles.flexColumn, Styles.margin8, Styles.borderRadius12, { elevation: 2, backgroundColor: colors.background }]}>
        <View style={[Styles.flexRow, Styles.paddingHorizontal16, Styles.height40, Styles.flexAlignCenter, Styles.borderBottom1, { borderBottomColor: colors.seperator }]}>
          <Text variant="titleSmall" style={[Styles.flex3, { color: colors.textSecondary }]}>
            Batsman
          </Text>
          <Text variant="titleSmall" style={[Styles.flex1, { textAlign: "center", color: colors.textSecondary }]}>
            R
          </Text>
          <Text variant="titleSmall" style={[Styles.flex1, { textAlign: "center", color: colors.textSecondary }]}>
            B
          </Text>
          <Text variant="titleSmall" style={[Styles.flex1, { textAlign: "center", color: colors.textSecondary }]}>
            4s
          </Text>
          <Text variant="titleSmall" style={[Styles.flex1, { textAlign: "center", color: colors.textSecondary }]}>
            6s
          </Text>
          <Text variant="titleSmall" style={[Styles.flex1_5, { textAlign: "center", color: colors.textSecondary }]}>
            SR
          </Text>
        </View>
        {Object.keys(batTeamDetails.batsmenData).map((k: string, i: number) => {
          return (
            <View key={i} style={[Styles.flexRow, Styles.paddingHorizontal16, Styles.height72, Styles.flexAlignCenter, i < Object.keys(batTeamDetails.batsmenData).length - 1 && Styles.borderBottom1, i < Object.keys(batTeamDetails.batsmenData).length - 1 && { borderBottomColor: colors.seperator }]}>
              <View style={[Styles.flex3]}>
                <Text variant="titleSmall" numberOfLines={1} ellipsizeMode="tail" style={[{ color: batTeamDetails.batsmenData["bat_" + (i + 1)].outDesc === "batting" ? colors.primary : batTeamDetails.batsmenData["bat_" + (i + 1)].outDesc !== "" ? colors.textSecondary : colors.text }]}>
                  {FormatScoreName(batTeamDetails.batsmenData["bat_" + (i + 1)].batName)}
                </Text>
                <Text variant="bodySmall" numberOfLines={2} ellipsizeMode="tail" style={[Styles.paddingEnd12, { color: colors.textSecondary }]}>
                  {batTeamDetails.batsmenData["bat_" + (i + 1)].outDesc === "" ? "Yet to bat" : batTeamDetails.batsmenData["bat_" + (i + 1)].outDesc}
                </Text>
              </View>
              <Text variant="titleSmall" style={[Styles.flex1, { textAlign: "center" }]}>
                {batTeamDetails.batsmenData["bat_" + (i + 1)].runs}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1, { textAlign: "center" }]}>
                {batTeamDetails.batsmenData["bat_" + (i + 1)].balls}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1, { textAlign: "center" }]}>
                {batTeamDetails.batsmenData["bat_" + (i + 1)].fours}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1, { textAlign: "center" }]}>
                {batTeamDetails.batsmenData["bat_" + (i + 1)].sixes}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1_5, { textAlign: "center" }]}>
                {batTeamDetails.batsmenData["bat_" + (i + 1)].strikeRate}
              </Text>
            </View>
          );
        })}
        <Divider />
        <View style={[Styles.padding16]}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            <Text variant="titleSmall">Fall of wickets - </Text>
            {strFOW}
          </Text>
        </View>
      </View>
    );
  };
  const CreateScoreCardBowlingTable = ({ bowlTeamDetails, extrasData }: any) => {
    return (
      <View style={[Styles.flexColumn, Styles.margin8, Styles.borderRadius12, { elevation: 2, backgroundColor: colors.background }]}>
        <View style={[Styles.flexRow, Styles.paddingHorizontal16, Styles.height40, Styles.flexAlignCenter, Styles.borderBottom1, { borderBottomColor: colors.seperator }]}>
          <Text variant="titleSmall" style={[Styles.flex3, { color: colors.textSecondary }]}>
            Bowler
          </Text>
          <Text variant="titleSmall" style={[Styles.flex1, { textAlign: "center", color: colors.textSecondary }]}>
            O
          </Text>
          <Text variant="titleSmall" style={[Styles.flex1, { textAlign: "center", color: colors.textSecondary }]}>
            M
          </Text>
          <Text variant="titleSmall" style={[Styles.flex1, { textAlign: "center", color: colors.textSecondary }]}>
            R
          </Text>
          <Text variant="titleSmall" style={[Styles.flex1, { textAlign: "center", color: colors.textSecondary }]}>
            W
          </Text>
          <Text variant="titleSmall" style={[Styles.flex1_5, { textAlign: "center", color: colors.textSecondary }]}>
            ER
          </Text>
        </View>
        {Object.keys(bowlTeamDetails.bowlersData).map((k: string, i: number) => {
          return (
            <View key={i} style={[Styles.flexRow, Styles.paddingHorizontal16, Styles.height48, Styles.flexAlignCenter, i < Object.keys(bowlTeamDetails.bowlersData).length - 1 && Styles.borderBottom1, i < Object.keys(bowlTeamDetails.bowlersData).length - 1 && { borderBottomColor: colors.seperator }]}>
              <Text variant="bodyMedium" numberOfLines={1} ellipsizeMode="tail" style={[Styles.flex3]}>
                {FormatScoreName(bowlTeamDetails.bowlersData["bowl_" + (i + 1)].bowlName)}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1, { textAlign: "center" }]}>
                {bowlTeamDetails.bowlersData["bowl_" + (i + 1)].overs}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1, { textAlign: "center" }]}>
                {bowlTeamDetails.bowlersData["bowl_" + (i + 1)].maidens}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1, { textAlign: "center" }]}>
                {bowlTeamDetails.bowlersData["bowl_" + (i + 1)].runs}
              </Text>
              <Text variant="titleSmall" style={[Styles.flex1, { textAlign: "center" }]}>
                {bowlTeamDetails.bowlersData["bowl_" + (i + 1)].wickets}
              </Text>
              <Text variant="bodyMedium" style={[Styles.flex1_5, { textAlign: "center" }]}>
                {bowlTeamDetails.bowlersData["bowl_" + (i + 1)].economy}
              </Text>
            </View>
          );
        })}
        <Divider />
        <View style={[Styles.flexRow, Styles.padding16]}>
          <Text variant="titleSmall">Extras - </Text>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            {extrasData.total} (NB {extrasData.noBalls}, LB {extrasData.legByes}, B {extrasData.byes}, WD {extrasData.wides}, P {extrasData.penalty})
          </Text>
        </View>
      </View>
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
        <ScrollView style={[Styles.flex1]} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0, 2, 4, 6]} refreshControl={<RefreshControl colors={[theme.colors.primary]} refreshing={refreshing} onRefresh={onRefresh} />}>
          {matchScorecard.scoreCard[0] && <CreateScoreCardHeader scorecard={matchScorecard.scoreCard[0]} index={0} />}
          {matchScorecard.scoreCard[0] && (
            <Collapsible collapsed={arrcollapsed[0][0]}>
              <CreateScoreCardBattingTable {...matchScorecard.scoreCard[0]} />
              <CreateScoreCardBowlingTable {...matchScorecard.scoreCard[0]} />
            </Collapsible>
          )}
          {matchScorecard.scoreCard[1] && <CreateScoreCardHeader scorecard={matchScorecard.scoreCard[1]} index={1} />}
          {matchScorecard.scoreCard[1] && (
            <Collapsible collapsed={arrcollapsed[1][0]}>
              <CreateScoreCardBattingTable {...matchScorecard.scoreCard[1]} />
              <CreateScoreCardBowlingTable {...matchScorecard.scoreCard[1]} />
            </Collapsible>
          )}
          {matchScorecard.scoreCard[2] && <CreateScoreCardHeader scorecard={matchScorecard.scoreCard[2]} index={2} />}
          {matchScorecard.scoreCard[2] && (
            <Collapsible collapsed={arrcollapsed[2][0]}>
              <CreateScoreCardBattingTable {...matchScorecard.scoreCard[2]} />
              <CreateScoreCardBowlingTable {...matchScorecard.scoreCard[2]} />
            </Collapsible>
          )}
          {matchScorecard.scoreCard[3] && <CreateScoreCardHeader scorecard={matchScorecard.scoreCard[3]} index={3} />}
          {matchScorecard.scoreCard[3] && (
            <Collapsible collapsed={arrcollapsed[3][0]}>
              <CreateScoreCardBattingTable {...matchScorecard.scoreCard[3]} />
              <CreateScoreCardBowlingTable {...matchScorecard.scoreCard[3]} />
            </Collapsible>
          )}
        </ScrollView>
      ) : (
        <NoData iconName="earth" title="No Live feed" subtitle="Match has not started yet or has been interupted" />
      )}
    </View>
  );
};

export default Scorecard;
