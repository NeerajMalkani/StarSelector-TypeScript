import { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native-paper";
import { GetMatchOvers } from "../../api/APICalls";
import { LiveDetails } from "../../models/Live";
import { Styles } from "../../styles/styles";
import { FormatScore } from "../../utils/Formatter";

const Live = ({ matchID, theme }: any) => {
  const { colors } = theme;
  const [isLoading, setIsLoading] = useState(true);
  const [liveDetails, setLiveDetails] = useState<LiveDetails>();

  const MatchLiveSuccess = (response: any) => {
    setLiveDetails(response.data);
    setIsLoading(false);
  };

  const MatchLiveFail = (errorMessage: string) => {
    console.log(errorMessage);
    setIsLoading(false);
  };

  useEffect(() => {
    GetMatchOvers({ matchID: matchID }, MatchLiveSuccess, MatchLiveFail);
  }, []);

  return (
    <View style={[Styles.flex1]}>
      {isLoading ? (
        <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
          <ActivityIndicator animating={true} color={colors.primary} size={32} />
        </View>
      ) : (
        <View style={[Styles.flex1]}>
          <View style={[Styles.flexRow, Styles.margin16, Styles.padding16, { justifyContent: "space-between", backgroundColor: colors.background, elevation: 2 }]}>
            <View style={[Styles.flexColumn, { elevation: 2 }]}>
              <Text variant="titleMedium" style={{ color: colors.textSecondary }}>
                {liveDetails && liveDetails.miniscore.inningsScores[0].inningsScore[0].batTeamShortName}
              </Text>
              <Text variant="headlineMedium">
                {liveDetails && FormatScore(liveDetails.miniscore.inningsScores[0].inningsScore[0].runs, liveDetails.miniscore.inningsScores[0].inningsScore[0].wickets)}
              </Text>
            </View>
            <View style={[Styles.flexColumn, Styles.flexAlignEnd, { elevation: 2 }]}>
              <Text variant="titleMedium" style={{ color: colors.textSecondary }}>
                CRR
              </Text>
              <Text variant="headlineMedium">
              {liveDetails && liveDetails.miniscore.crr}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Live;
