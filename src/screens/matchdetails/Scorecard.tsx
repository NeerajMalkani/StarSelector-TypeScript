import { useState, useEffect } from "react";
import { View, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { Text } from "react-native-paper";
import { GetMatchScorecard } from "../../api/APICalls";
import NoData from "../../components/NoData";
import { MatchScorecard, ScoreCard } from "../../models/MatchScorecard";
import { Styles } from "../../styles/styles";
import { FormatOvers, FormatScore } from "../../utils/Formatter";

const Scorecard = ({ matchID, theme }: any) => {
  const { colors, multicolors } = theme;
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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

  const CreateScoreCard = ({ batTeamDetails, scoreDetails }: ScoreCard) => {
    return (
      <View style={[Styles.flexColumn]}>
        <View style={[Styles.flexRow, Styles.height56, Styles.paddingHorizontal16, Styles.flexAlignCenter, Styles.borderBottom1, { justifyContent: "space-between", borderBottomColor: colors.seperator }]}>
          <Text variant="bodyMedium">{batTeamDetails.batTeamName}</Text>
          <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
            <Text variant="titleMedium">{FormatScore(scoreDetails.runs, scoreDetails.wickets)}</Text>
            <Text variant="bodyMedium" style={[Styles.marginStart4]}>({FormatOvers(scoreDetails.overs)})</Text>
          </View>
        </View>
        <View>
        
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
        <ScrollView style={[Styles.flex1]} showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]} refreshControl={<RefreshControl colors={[theme.colors.primary]} refreshing={refreshing} onRefresh={onRefresh} />}>
          {matchScorecard.scoreCard.map((k: ScoreCard, i: number) => {
            return <CreateScoreCard {...k} />;
          })}
        </ScrollView>
      ) : (
        <NoData iconName="earth" title="No Live feed" subtitle="Match has not started yet or has been interupted" />
      )}
    </View>
  );
};

export default Scorecard;
