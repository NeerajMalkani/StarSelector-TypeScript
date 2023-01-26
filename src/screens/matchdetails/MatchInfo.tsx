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
      {isLoading ? (
        <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
          <ActivityIndicator animating={true} color={colors.primary} size={32} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0, 2, 4]}>
          <View style={[Styles.paddingVertical16, { backgroundColor: colors.background }]}>
            <Text variant="titleMedium" style={[Styles.paddingHorizontal24]}>
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
          <View style={[Styles.paddingVertical16, { backgroundColor: colors.background }]}>
            <Text variant="titleMedium" style={[Styles.paddingHorizontal24]}>
              Match Officials
            </Text>
            <View style={[Styles.width56, Styles.height4, Styles.marginTop4, Styles.borderRadius2, Styles.marginStart24, { backgroundColor: colors.primary }]}></View>
          </View>
          <View style={[Styles.margin16, Styles.border1, { borderColor: colors.seperator }]}>
            {matchInfo && (
              <View>
                <RenderTableRow title="Umpire 1" value={matchInfo.umpire1.name ? matchInfo.umpire1.name : "NA"} />
                <RenderTableRow title="Umpire 2" value={matchInfo.umpire2.name ? matchInfo.umpire2.name : "NA"} />
                <RenderTableRow title="Umpire 3" value={matchInfo.umpire3.name ? matchInfo.umpire3.name : "NA"} />
                <RenderTableRow title="Refree" value={matchInfo.referee.name ? matchInfo.referee.name : "NA"} />
              </View>
            )}
          </View>
          <View style={[Styles.paddingVertical16, { backgroundColor: colors.background }]}>
            <Text variant="titleMedium" style={[Styles.paddingHorizontal24]}>
              Match Venue
            </Text>
            <View style={[Styles.width56, Styles.height4, Styles.marginTop4, Styles.borderRadius2, Styles.marginStart24, { backgroundColor: colors.primary }]}></View>
          </View>
          <View style={[Styles.margin16, Styles.border1, { borderColor: colors.seperator }]}>
            {matchInfo && (
              <View>
                <RenderTableRow title="Ground" value={matchInfo.venueInfo.ground} />
                <RenderTableRow title="City" value={matchInfo.venueInfo.city} />
                <RenderTableRow title="Country" value={matchInfo.venueInfo.country} />
                <RenderTableRow title="Capacity" value={matchInfo.venueInfo.capacity} />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MatchInfo;
