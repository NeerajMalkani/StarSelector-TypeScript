import { useState, useEffect, useRef } from "react";
import { ActivityIndicator, View, ScrollView, RefreshControl } from "react-native";
import { Divider, Text } from "react-native-paper";
import { GetMatchOvers } from "../../api/APICalls";
import NoData from "../../components/NoData";
import SectionTitle from "../../components/SectionTitle";
import { LiveDetails } from "../../models/Live";
import { Styles } from "../../styles/styles";
import { FormatOvers, FormatScore, FormatScoreName } from "../../utils/Formatter";

const Live = ({ matchID, theme, matchStatus }: any) => {
  const { colors, multicolors } = theme;
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [liveDetails, setLiveDetails] = useState<LiveDetails>();
  const scrollViewRef: any = useRef();

  const MatchLiveSuccess = (response: any) => {
    if (response.data && response.data.matchHeaders && response.data.miniscore) {
      setLiveDetails(response.data);
    }
    setRefreshing(false);
    setIsLoading(false);
  };

  const MatchLiveFail = (errorMessage: string) => {
    console.log(errorMessage);
    setRefreshing(false);
    setIsLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    GetMatchOvers({ matchID: matchID }, MatchLiveSuccess, MatchLiveFail);
  };

  useEffect(() => {
    GetMatchOvers({ matchID: matchID }, MatchLiveSuccess, MatchLiveFail);
  }, []);

  const CreateTableHeader = (title: string | number | undefined, isCenter: boolean, isSR?: boolean, isStriker?: boolean) => {
    return (
      <Text variant="bodyMedium" style={[isCenter ? (isSR ? Styles.flex2 : Styles.flex1) : Styles.flex3, isCenter && Styles.textCenter, { color: colors.textSecondary }]}>
        {title}
      </Text>
    );
  };

  const CreateTableCells = (title: string | number | undefined, isCenter: boolean, isSR?: boolean, isStriker?: boolean) => {
    return (
      <Text
        variant={isCenter ? "bodyMedium" : isStriker ? "titleSmall" : "bodySmall"}
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[Styles.paddingVertical8, isCenter ? (isSR ? Styles.flex2 : Styles.flex1) : Styles.flex3, isCenter && Styles.textCenter]}
      >
        {title + (isStriker ? "*" : "")}
      </Text>
    );
  };

  const ScroreOnBall = ({ index, score }: any) => {
    score = score ? score.toString() : "";
    let ballColor = colors.textSecondary;
    switch (true) {
      case score === "4":
        ballColor = multicolors.blue;
        break;
      case score === "6":
        ballColor = multicolors.green;
        break;
      case score === "W":
        ballColor = multicolors.red;
        break;
      case score === "Wd" || score === "wd":
        ballColor = multicolors.yellow;
        break;
      case score === "Nb" || score === "nb":
        ballColor = multicolors.yellow;
        break;
      case score === "B" || score === "b" || score === "by" || score === "Lb" || score === "lb":
        ballColor = multicolors.golden;
        break;
      case score === "... " || score === "..." || score === " ... " || score === "" || score === "  " || score === "|":
        ballColor = multicolors.white;
        break;
    }
    return score === "... " || score === "..." || score === " ... " || score === "" || score === "  " ? null : (
      <View key={index} style={[Styles.marginStart4, Styles.width24, Styles.height24, Styles.flexAlignCenter, Styles.flexJustifyCenter, { borderRadius: 12, backgroundColor: ballColor }]}>
        <Text variant="bodySmall" style={{ color: multicolors.white }}>
          {score}
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
      ) : liveDetails ? (
        <ScrollView style={[Styles.flex1]} showsVerticalScrollIndicator={false} stickyHeaderIndices={[2]} refreshControl={<RefreshControl colors={[theme.colors.primary]} refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={[Styles.margin16, Styles.padding16, Styles.borderRadius12, { backgroundColor: colors.background, elevation: 2 }]}>
            <View style={[Styles.flexRow, { justifyContent: "space-between" }]}>
              <View style={[Styles.flexColumn]}>
                <Text variant="titleMedium" style={{ color: colors.textSecondary }}>
                  {liveDetails?.miniscore.inningsScores[0].inningsScore[0].batTeamShortName}
                </Text>
                <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
                  <Text variant="headlineMedium">{FormatScore(liveDetails?.miniscore.inningsScores[0].inningsScore[0].runs, liveDetails?.miniscore.inningsScores[0].inningsScore[0].wickets)}</Text>
                  <Text variant="bodyLarge"> ({FormatOvers(liveDetails?.miniscore.inningsScores[0].inningsScore[0].overs)})</Text>
                </View>
              </View>
              <View style={[Styles.flexRow]}>
                <View style={[Styles.flexColumn, Styles.flexAlignEnd, { elevation: 2 }]}>
                  <Text variant="titleMedium" style={{ color: colors.textSecondary }}>
                    RR
                  </Text>
                  <Text variant="bodyLarge">{liveDetails?.miniscore.rrr ? liveDetails.miniscore.rrr.toFixed(2) : "-"}</Text>
                </View>
                <View style={[Styles.flexColumn, Styles.flexAlignEnd, Styles.marginStart24, { elevation: 2 }]}>
                  <Text variant="titleMedium" style={{ color: colors.textSecondary }}>
                    CRR
                  </Text>
                  <Text variant="bodyLarge">{liveDetails?.miniscore.crr ? liveDetails.miniscore.crr.toFixed(2) : "-"}</Text>
                </View>
              </View>
            </View>
            <Text variant="titleSmall" style={[Styles.marginTop12, { color: colors.primary }]}>
              {liveDetails?.miniscore.custStatus ? liveDetails?.miniscore.custStatus : matchStatus}
            </Text>
          </View>
          <SectionTitle title="Last 12 Balls" colors={colors} />
          <ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={() => {
              if (scrollViewRef && scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
              }
            }}
            horizontal={true}
            style={[Styles.margin16, Styles.marginTop0, Styles.borderRadius12, { backgroundColor: colors.background, elevation: 2 }]}
          >
            <View style={[Styles.flexRow, Styles.flex1, Styles.padding16]}>
              {liveDetails?.miniscore.curOvsStats.split(" ").map((k, i) => {
                return <ScroreOnBall key={i} index={i} score={k} />;
              })}
            </View>
          </ScrollView>
          <SectionTitle title="Miniscore" colors={colors} />
          <View style={[Styles.margin16, Styles.marginTop0, Styles.padding16, Styles.borderRadius12, { backgroundColor: colors.background, elevation: 2 }]}>
            <View style={[Styles.flexRow]}>
              {CreateTableHeader("Batsman", false)}
              {CreateTableHeader("R", true)}
              {CreateTableHeader("B", true)}
              {CreateTableHeader("F", true)}
              {CreateTableHeader("S", true)}
              {CreateTableHeader("SR", true, true)}
            </View>
            <Divider style={[Styles.marginVertical8]} />
            {liveDetails?.miniscore.batsmanStriker.name && (
              <View style={[Styles.flexRow]}>
                {CreateTableCells(FormatScoreName(liveDetails?.miniscore.batsmanStriker.name), false, false, true)}
                {CreateTableCells(liveDetails?.miniscore.batsmanStriker.runs ? liveDetails.miniscore.batsmanStriker.runs : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.batsmanStriker.balls ? liveDetails.miniscore.batsmanStriker.balls : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.batsmanStriker.fours ? liveDetails.miniscore.batsmanStriker.fours : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.batsmanStriker.sixes ? liveDetails.miniscore.batsmanStriker.sixes : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.batsmanStriker.strkRate ? parseFloat(liveDetails.miniscore.batsmanStriker.strkRate).toFixed(2) : 0.0, true, true)}
              </View>
            )}
            <Divider />
            {liveDetails?.miniscore.batsmanNonStriker.name && (
              <View style={[Styles.flexRow]}>
                {CreateTableCells(FormatScoreName(liveDetails?.miniscore.batsmanNonStriker.name), false, false)}
                {CreateTableCells(liveDetails?.miniscore.batsmanNonStriker.runs ? liveDetails.miniscore.batsmanNonStriker.runs : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.batsmanNonStriker.balls ? liveDetails.miniscore.batsmanNonStriker.balls : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.batsmanNonStriker.fours ? liveDetails.miniscore.batsmanNonStriker.fours : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.batsmanNonStriker.sixes ? liveDetails.miniscore.batsmanNonStriker.sixes : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.batsmanNonStriker.strkRate ? parseFloat(liveDetails.miniscore.batsmanNonStriker.strkRate).toFixed(2) : 0.0, true, true)}
              </View>
            )}
            <Divider />
            <View style={[Styles.flexRow, Styles.paddingTop8]}>
              <Text variant="bodyMedium">Patnership </Text>
              <Text variant="titleSmall" style={{ color: colors.primary }}>
                {liveDetails?.miniscore.partnership}
              </Text>
            </View>
          </View>

          <View style={[Styles.margin16, Styles.marginTop0, Styles.padding16, Styles.borderRadius12, { backgroundColor: colors.background, elevation: 2 }]}>
            <View style={[Styles.flexRow]}>
              {CreateTableHeader("Bowler", false)}
              {CreateTableHeader("O", true)}
              {CreateTableHeader("R", true)}
              {CreateTableHeader("M", true)}
              {CreateTableHeader("W", true)}
              {CreateTableHeader("E", true, true)}
            </View>
            <Divider style={[Styles.marginVertical8]} />
            {liveDetails?.miniscore.bowlerStriker.name && (
              <View style={[Styles.flexRow]}>
                {CreateTableCells(FormatScoreName(liveDetails?.miniscore.bowlerStriker.name), false, false, true)}
                {CreateTableCells(liveDetails?.miniscore.bowlerStriker.overs ? liveDetails.miniscore.bowlerStriker.overs : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.bowlerStriker.runs ? liveDetails.miniscore.bowlerStriker.runs : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.bowlerStriker.maidens ? liveDetails.miniscore.bowlerStriker.maidens : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.bowlerStriker.wickets ? liveDetails.miniscore.bowlerStriker.wickets : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.bowlerStriker.economy ? parseFloat(liveDetails.miniscore.bowlerStriker.economy).toFixed(2) : 0.0, true, true)}
              </View>
            )}
            <Divider />
            {liveDetails?.miniscore.bowlerNonStriker.name && (
              <View style={[Styles.flexRow]}>
                {CreateTableCells(FormatScoreName(liveDetails?.miniscore.bowlerNonStriker.name), false, false)}
                {CreateTableCells(liveDetails?.miniscore.bowlerNonStriker.overs ? liveDetails.miniscore.bowlerNonStriker.overs : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.bowlerNonStriker.runs ? liveDetails.miniscore.bowlerNonStriker.runs : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.bowlerNonStriker.maidens ? liveDetails.miniscore.bowlerNonStriker.maidens : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.bowlerNonStriker.wickets ? liveDetails.miniscore.bowlerNonStriker.wickets : 0, true, false)}
                {CreateTableCells(liveDetails?.miniscore.bowlerNonStriker.economy ? parseFloat(liveDetails.miniscore.bowlerNonStriker.economy).toFixed(2) : 0.0, true, true)}
              </View>
            )}
            <Divider />
          </View>
        </ScrollView>
      ) : <NoData iconName="earth" title="No Live feed" subtitle="Match has not started yet or has been interupted"/>}
    </View>
  );
};

export default Live;
