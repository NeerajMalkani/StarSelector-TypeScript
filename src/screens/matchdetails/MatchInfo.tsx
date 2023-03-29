import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { GetMatchInfo } from "../../api/APICalls";
import SectionTitle from "../../components/SectionTitle";
import { MatchRootInfo } from "../../models/MatchInfo";
import { Styles } from "../../styles/styles";

const MatchInfo = ({ matchID, theme }: any) => {
  const { colors } = theme;
  const [isLoading, setIsLoading] = useState(true);
  const [matchRootInfo, setMatchRootInfo] = useState<MatchRootInfo>();

  const MatchInfoSuccess = (response: any) => {
    setMatchRootInfo(response.data);
    setIsLoading(false);
  };
  const MatchInfoFail = (errorMessage: string) => {
    setIsLoading(false);
  };

  useEffect(() => {
    GetMatchInfo({ matchID: matchID }, MatchInfoSuccess, MatchInfoFail);
  }, []);

  const RenderTableRow = ({ title, value, showBorder, image }: any) => {
    return (
      <View style={[Styles.flexRow, Styles.flex3, Styles.padding12, showBorder && Styles.borderBottom1, showBorder && { borderBottomColor: colors.seperator }]}>
        <Text variant="bodyMedium" style={[Styles.flex1]}>
          {title}
        </Text>
        {image ? (
          <View style={[Styles.flex2]}>
          <Image source={{ uri: image }} style={[Styles.width56, Styles.height56]} />
          </View>
        ) : (
          <Text variant="titleSmall" style={[Styles.flex2]}>
            {value}
          </Text>
        )}
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
          <SectionTitle title="Match Details" colors={colors} />
          <View style={[Styles.margin16, Styles.marginTop0, Styles.border1, { borderColor: colors.seperator }]}>
            {matchRootInfo && matchRootInfo.matchInfo && (
              <View>
                <RenderTableRow title="Series" value={matchRootInfo.matchInfo.series.name} showBorder={true} />
                <RenderTableRow title="Match" value={matchRootInfo.matchInfo.matchDescription} showBorder={true} />
                <RenderTableRow title="Format" value={matchRootInfo.matchInfo.matchFormat} showBorder={true} />
                <RenderTableRow title="Start Date" value={moment(new Date(matchRootInfo.matchInfo.matchStartTimestamp)).format("MMM Do YYYY, h:mm:ss a")} showBorder={true} />
                <RenderTableRow title="End Date" value={moment(new Date(matchRootInfo.matchInfo.matchCompleteTimestamp)).format("MMM Do YYYY, h:mm:ss a")} showBorder={false} />
              </View>
            )}
          </View>
          <SectionTitle title="Match Officials" colors={colors} />
          <View style={[Styles.margin16, Styles.marginTop0, Styles.border1, { borderColor: colors.seperator }]}>
            {matchRootInfo && matchRootInfo.matchInfo && (
              <View>
                <RenderTableRow title="Umpire 1" value={matchRootInfo.matchInfo.umpire1.name ? matchRootInfo.matchInfo.umpire1.name : "NA"} showBorder={true} />
                <RenderTableRow title="Umpire 2" value={matchRootInfo.matchInfo.umpire2.name ? matchRootInfo.matchInfo.umpire2.name : "NA"} showBorder={true} />
                <RenderTableRow title="Umpire 3" value={matchRootInfo.matchInfo.umpire3.name ? matchRootInfo.matchInfo.umpire3.name : "NA"} showBorder={true} />
                <RenderTableRow title="Refree" value={matchRootInfo.matchInfo.referee.name ? matchRootInfo.matchInfo.referee.name : "NA"} showBorder={false} />
              </View>
            )}
          </View>
          <SectionTitle title="Match Venue" colors={colors} />
          <View style={[Styles.margin16, Styles.marginTop0, Styles.border1, { borderColor: colors.seperator }]}>
            {matchRootInfo && matchRootInfo.venueInfo && (
              <View>
                <RenderTableRow title="Ground" value={matchRootInfo.venueInfo.ground ? matchRootInfo.venueInfo.ground : "NA"} showBorder={true} />
                <RenderTableRow title="City" value={matchRootInfo.venueInfo.city ? matchRootInfo.venueInfo.city : "NA"} showBorder={true} />
                <RenderTableRow title="Country" value={matchRootInfo.venueInfo.country ? matchRootInfo.venueInfo.country : "NA"} showBorder={true} />
                <RenderTableRow title="Capacity" value={matchRootInfo.venueInfo.capacity ? matchRootInfo.venueInfo.capacity : "NA"} showBorder={true} />
                <RenderTableRow title="Established" value={matchRootInfo.venueInfo.established ? matchRootInfo.venueInfo.established : "NA"} showBorder={true} />
                <RenderTableRow title="Ends" value={matchRootInfo.venueInfo.ends ? matchRootInfo.venueInfo.ends : "NA"} showBorder={true} />
                <RenderTableRow title="Image" value="NA" showBorder={false} image={matchRootInfo.venueInfo.imageUrl} />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default React.memo(MatchInfo);
