import moment from "moment";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { GetMatchInfo } from "../../api/APICalls";
import { MatchDetails } from "../../models/MatchDetails";
import { Styles } from "../../styles/styles";

const MatchInfo = ({ matchID, theme }: any) => {
  const { colors } = theme;
  const [isLoading, setIsLoading] = useState(true);
  const [matchInfo, setMatchInfo] = useState<MatchDetails>();

  const MatchInfoSuccess = (response: any) => {
    setMatchInfo(response.data);
    setIsLoading(false);
  };

  const MatchInfoFail = (errorMessage: string) => {
    setIsLoading(false);
  };

  useEffect(() => {
    GetMatchInfo({ matchID: matchID }, MatchInfoSuccess, MatchInfoFail);
  }, []);

  const RenderTableRow = ({ title, value }: any) => {
    return (
      <View style={[Styles.flexRow, Styles.flex3, Styles.padding12, Styles.borderBottom1, { borderBottomColor: colors.seperator }]}>
        <Text variant="bodyMedium" style={[Styles.flex1]}>
          {title}
        </Text>
        <Text variant="titleSmall" style={[Styles.flex2]}>
          {value}
        </Text>
      </View>
    );
  };

  return (
    <View style={[Styles.flex1]}>
      <ScrollView>
        {isLoading ? (
          <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
            <ActivityIndicator animating={true} color={colors.primary} size={32} />
          </View>
        ) : (
          <View>
            <View>
              <Text variant="titleMedium" style={[Styles.paddingHorizontal24, Styles.paddingTop16, { backgroundColor: colors.background }]}>
                Match Details
              </Text>
              <View style={[Styles.width56, Styles.height4, Styles.marginTop4, Styles.borderRadius2, Styles.marginStart24, { backgroundColor: colors.primary }]}></View>
            </View>
            <View style={[Styles.margin16, Styles.border1, { borderColor: colors.seperator }]}>
              {matchInfo && (
                <View>
                  <RenderTableRow title="Series" value={matchInfo.seriesName} />
                  <RenderTableRow title="Match" value={matchInfo.matchDesc} />
                  <RenderTableRow title="Format" value={matchInfo.matchFormat} />
                  <RenderTableRow title="Start Date" value={moment(new Date(parseFloat(matchInfo.startDate))).format("MMM Do YYYY, h:mm:ss a")} />
                  <RenderTableRow title="End Date" value={moment(new Date(parseFloat(matchInfo.endDate))).format("MMM Do YYYY, h:mm:ss a")} />
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MatchInfo;
