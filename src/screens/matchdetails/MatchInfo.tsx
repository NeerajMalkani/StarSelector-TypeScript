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

  const RenderTableRow = ({ title, value, showBorder }: any) => {
    return (
      <View style={[Styles.flexRow, Styles.flex3, Styles.padding12, showBorder && Styles.borderBottom1, showBorder && { borderBottomColor: colors.seperator }]}>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[Styles.paddingVertical16, { backgroundColor: colors.background }]}>
            <Text variant="titleMedium" style={[Styles.paddingHorizontal24]}>
              Match Details
            </Text>
            <View style={[Styles.width56, Styles.height4, Styles.marginTop4, Styles.borderRadius2, Styles.marginStart24, { backgroundColor: colors.primary }]}></View>
          </View>
          <View style={[Styles.margin16, Styles.border1, { borderColor: colors.seperator }]}>
            {matchInfo && (
              <View>
                <RenderTableRow title="Series" value={matchInfo.seriesName} showBorder={true} />
                <RenderTableRow title="Match" value={matchInfo.matchDesc} showBorder={true} />
                <RenderTableRow title="Format" value={matchInfo.matchFormat} showBorder={true} />
                <RenderTableRow title="Start Date" value={moment(new Date(parseFloat(matchInfo.startDate))).format("MMM Do YYYY, h:mm:ss a")} showBorder={true} />
                <RenderTableRow title="End Date" value={moment(new Date(parseFloat(matchInfo.endDate))).format("MMM Do YYYY, h:mm:ss a")} showBorder={false} />
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
                <RenderTableRow title="Umpire 1" value={matchInfo.umpire1.name ? matchInfo.umpire1.name : "NA"} showBorder={true}/>
                <RenderTableRow title="Umpire 2" value={matchInfo.umpire2.name ? matchInfo.umpire2.name : "NA"} showBorder={true} />
                <RenderTableRow title="Umpire 3" value={matchInfo.umpire3.name ? matchInfo.umpire3.name : "NA"} showBorder={true} />
                <RenderTableRow title="Refree" value={matchInfo.referee.name ? matchInfo.referee.name : "NA"} showBorder={false} />
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
                <RenderTableRow title="Ground" value={matchInfo.venueInfo.ground ? matchInfo.venueInfo.ground : "NA"} showBorder={true} />
                <RenderTableRow title="City" value={matchInfo.venueInfo.city ? matchInfo.venueInfo.city : "NA"} showBorder={true} />
                <RenderTableRow title="Country" value={matchInfo.venueInfo.country ? matchInfo.venueInfo.country : "NA"} showBorder={true} />
                <RenderTableRow title="Capacity" value={matchInfo.venueInfo.capacity ? matchInfo.venueInfo.capacity : "NA"} showBorder={false} />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MatchInfo;
