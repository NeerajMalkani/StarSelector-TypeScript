import React, { useState, useRef, useEffect } from "react";
import { ActivityIndicator, View, ScrollView, RefreshControl, Animated, Dimensions } from "react-native";
import { Divider, Text } from "react-native-paper";
import { GetMatchCommentry } from "../../api/APICalls";
import NoData from "../../components/NoData";
import SectionTitle from "../../components/SectionTitle";
import { CommentaryList, LiveDetails } from "../../models/Live";
import { Styles } from "../../styles/styles";
import { FormatOvers, FormatScore, FormatScoreName } from "../../utils/Formatter";
import reactStringReplace from "react-string-replace";
import * as Animatable from "react-native-animatable";
import ScroreOnBall from "../../components/ScoreOnBall";
import { useFocusEffect } from "@react-navigation/native";

let callingLiveTimer: any = null,
  allCommentary: CommentaryList[] = [];
const Live = ({ matchID, theme, matchStatus }: any) => {
  const { colors, multicolors } = theme;
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentaryLoading, setIsCommentaryLoading] = useState(false);
  const [commentaryDetails, setCommentaryDetails] = useState<CommentaryList[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [liveDetails, setLiveDetails] = useState<LiveDetails>();
  const [translateValue, setTranslateValue] = useState<any>(new Animated.Value(Dimensions.get("window").height));
  const scrollViewHolderRef: any = useRef();
  const scrollViewRef: any = useRef();

  const MatchCommentarySuccess = (response: any) => {
    if (response.data && response.data.matchHeader) {
      setLiveDetails(response.data);
      const existingCommentary = [...allCommentary];
      if (existingCommentary.length > 0) {
        allCommentary = Object.values(
          response.data.commentaryList.concat(existingCommentary).reduce((r: any, o: any) => {
            r[o.timestamp] = o;
            return r;
          }, {})
        );
      } else {
        allCommentary = response.data.commentaryList;
      }
      setCommentaryDetails(allCommentary);
    }
    setIsCommentaryLoading(false);
    setRefreshing(false);
    setIsLoading(false);
  };

  const MatchCommentaryLoadMoreSuccess = (response: any) => {
    if (response.data && response.data.matchHeader) {
      const existingCommentary = [...commentaryDetails];
      response.data.commentaryList.shift();
      allCommentary = [...existingCommentary, ...response.data.commentaryList];
      setCommentaryDetails(allCommentary);
    }
    HideLoadingMore();
    setIsCommentaryLoading(false);
  };

  const MatchCommentaryFail = (errorMessage: string) => {
    console.log(errorMessage);
    HideLoadingMore();
    setIsCommentaryLoading(false);
    setRefreshing(false);
    setIsLoading(false);
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const ShowLoadingMore = () => {
    Animated.timing(translateValue, {
      toValue: Dimensions.get("window").height - 136,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };
  const HideLoadingMore = () => {
    Animated.timing(translateValue, {
      toValue: Dimensions.get("window").height,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const OnScroll = ({ nativeEvent }: any) => {
    if (isCloseToBottom(nativeEvent) && !isCommentaryLoading && liveDetails?.miniscore) {
      setIsCommentaryLoading(true);
      ShowLoadingMore();
      GetMatchCommentry({ matchId: matchID, inning: liveDetails?.miniscore.inningsId, lastTimeStamp: commentaryDetails[commentaryDetails.length - 1].timestamp }, MatchCommentaryLoadMoreSuccess, MatchCommentaryFail);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      GetMatchCommentry({ matchId: matchID }, MatchCommentarySuccess, MatchCommentaryFail);
      callingLiveTimer = setInterval(() => {
        GetMatchCommentry({ matchId: matchID }, MatchCommentarySuccess, MatchCommentaryFail);
      }, 20000);
      return () => {
        clearInterval(callingLiveTimer);
        callingLiveTimer = null;
      };
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    GetMatchCommentry({ matchId: matchID }, MatchCommentarySuccess, MatchCommentaryFail);
  };

  const CreateTableHeader = (title: string | number | undefined, isCenter: boolean, isSR?: boolean, isStriker?: boolean) => {
    return (
      <Text variant="bodyMedium" style={[isCenter ? (isSR ? Styles.flex2 : Styles.flex1) : Styles.flex3, isCenter && Styles.textCenter, { color: colors.textSecondary }]}>
        {title}
      </Text>
    );
  };

  const CreateTableCells = (title: string | number | undefined, isCenter: boolean, isSR?: boolean, isStriker?: boolean) => {
    return (
      <Text variant={isCenter ? "bodyMedium" : isStriker ? "titleSmall" : "bodyMedium"} numberOfLines={1} ellipsizeMode="tail" style={[Styles.paddingVertical8, isCenter ? (isSR ? Styles.flex2 : Styles.flex1) : Styles.flex3, isCenter && Styles.textCenter, { color: isStriker ? colors.primary : colors.text }]}>
        {title + (isStriker ? "*" : "")}
      </Text>
    );
  };

  const CreateCommentary = ({ commentaryList }: any) => {
    return (
      <View>
        {commentaryList.map((k: CommentaryList, i: number) => {
          let formattedString,
            isReplaced = false;
          if (k.commentaryFormats) {
            const formats = Object.keys(k.commentaryFormats);
            for (let a = 0; a < formats.length; a++) {
              for (let b = 0; b < k.commentaryFormats[formats[a]].formatId.length; b++) {
                formattedString = reactStringReplace(isReplaced ? formattedString : k.commText, k.commentaryFormats[formats[a]].formatId[b], () => (
                  <Text variant="titleMedium" style={{ fontStyle: formats[a] === "italic" ? "italic" : "normal" }}>
                    {k.commentaryFormats[formats[a]].formatValue[b]}
                  </Text>
                ));
                isReplaced = true;
              }
            }
            if (!isReplaced) {
              formattedString = k.commText;
            }
          } else {
            formattedString = k.commText;
          }
          return (
            <View key={i + k.timestamp + new Date().getTime()}>
              {k.overSeparator && (
                <View style={[Styles.flexColumn, Styles.marginTop8, Styles.borderRadius8, { backgroundColor: colors.background, elevation: 2 }]}>
                  <View style={[Styles.flexRow, Styles.padding8, Styles.borderBottom1, { justifyContent: "space-between", borderBottomColor: colors.seperator }]}>
                    <Text variant="titleMedium" style={[Styles.marginEnd12]}>
                      Over {k.overNumber?.toFixed(0)}
                    </Text>
                    <View style={[Styles.flexRow]}>
                      {k.overSeparator.o_summary.split(" ").map((v, d) => {
                        return <ScroreOnBall key={d + new Date().getTime()} index={d} score={v} colors={colors} multicolors={multicolors} />;
                      })}
                      <Text variant="bodyLarge" style={{ color: colors.primary, marginStart: 12 }}>
                        {"(" + (k.overSeparator.runs ? k.overSeparator.runs : "0") + " runs)"}
                      </Text>
                    </View>
                  </View>
                  <View style={[Styles.flexRow, Styles.padding8, { justifyContent: "space-between" }]}>
                    <View>
                      <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                        Batsmen
                      </Text>
                      <Text variant="bodyMedium">{k.overSeparator.batStrikerNames[0]}</Text>
                      <Text variant="bodyMedium">{k.overSeparator.batNonStrikerNames[0]}</Text>
                    </View>
                    <View style={[Styles.flexAlignEnd]}>
                      <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                        Bowler
                      </Text>
                      <Text variant="bodyMedium">{k.overSeparator.bowlNames[0]}</Text>
                    </View>
                  </View>
                  <View style={[Styles.flexRow, Styles.borderTop1, Styles.padding8, { justifyContent: "space-between", borderTopColor: colors.seperator }]}>
                    <Text variant="bodyLarge" style={{ color: colors.textSecondary }}>
                      Total
                    </Text>
                    <Text variant="bodyLarge">{FormatScore(k.overSeparator.score, k.overSeparator.wickets)}</Text>
                  </View>
                </View>
              )}
              <View style={[Styles.flexRow, Styles.marginTop12]}>
                {k.overNumber && (
                  <View style={[Styles.flex1, Styles.flexColumn]}>
                    <Text variant="titleMedium">{k.overNumber}</Text>
                  </View>
                )}
                <View style={[Styles.flex6]}>
                  <Text variant="bodyMedium">{formattedString}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[Styles.flex1]}>
      <Animatable.View
        style={[
          Styles.positionAbsolute,
          Styles.height24,
          Styles.width80,
          Styles.flexAlignSelfCenter,
          Styles.flexAlignCenter,
          Styles.flexJustifyCenter,
          {
            transform: [
              {
                translateY: translateValue,
              },
            ],
            backgroundColor: multicolors.black,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            zIndex: 2,
          },
        ]}
        delay={700}
        duration={1200}
      >
        <Text variant="titleSmall" style={{ color: multicolors.white }}>
          Loading
        </Text>
      </Animatable.View>
      {isLoading ? (
        <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
          <ActivityIndicator animating={true} color={colors.primary} size={32} />
        </View>
      ) : liveDetails ? (
        <ScrollView ref={scrollViewHolderRef} style={[Styles.flex1]} showsVerticalScrollIndicator={false} stickyHeaderIndices={[1, 3, 5]} onScroll={OnScroll} scrollEventThrottle={400} refreshControl={<RefreshControl colors={[theme.colors.primary]} refreshing={refreshing} onRefresh={onRefresh} />}>
          {liveDetails?.miniscore && liveDetails?.miniscore.matchScoreDetails && liveDetails?.miniscore.matchScoreDetails.inningsScoreList && liveDetails?.miniscore.matchScoreDetails.inningsScoreList.length > 0 && (
            <View style={[Styles.margin16, Styles.padding16, Styles.borderRadius12, { backgroundColor: colors.background, elevation: 2 }]}>
              <View style={[Styles.flexRow, { justifyContent: "space-between" }]}>
                <View style={[Styles.flexColumn]}>
                  <Text variant="titleMedium" style={{ color: colors.textSecondary }}>
                    {liveDetails?.miniscore.matchScoreDetails.inningsScoreList[0].batTeamName ? liveDetails?.miniscore.matchScoreDetails.inningsScoreList[0].batTeamName : ""}
                  </Text>
                  <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
                    <Text variant="headlineMedium">{FormatScore(liveDetails?.miniscore.matchScoreDetails.inningsScoreList[0].score, liveDetails?.miniscore.matchScoreDetails.inningsScoreList[0].wickets)}</Text>
                    <Text variant="bodyLarge"> ({FormatOvers(liveDetails?.miniscore.matchScoreDetails.inningsScoreList[0].overs)})</Text>
                  </View>
                </View>
                <View style={[Styles.flexRow]}>
                  <View style={[Styles.flexColumn, Styles.flexAlignEnd, { elevation: 2 }]}>
                    <Text variant="titleMedium" style={{ color: colors.textSecondary }}>
                      RR
                    </Text>
                    <Text variant="bodyLarge">{liveDetails?.miniscore.requiredRunRate > 0 ? liveDetails.miniscore.requiredRunRate.toFixed(2) : "-"}</Text>
                  </View>
                  <View style={[Styles.flexColumn, Styles.flexAlignEnd, Styles.marginStart24, { elevation: 2 }]}>
                    <Text variant="titleMedium" style={{ color: colors.textSecondary }}>
                      CRR
                    </Text>
                    <Text variant="bodyLarge">{liveDetails?.miniscore.currentRunRate > 0 ? liveDetails.miniscore.currentRunRate.toFixed(2) : "-"}</Text>
                  </View>
                </View>
              </View>
              <Text variant="titleSmall" style={[Styles.marginTop12, { color: colors.primary }]}>
                {liveDetails?.matchHeader.status ? liveDetails?.matchHeader.status : matchStatus}
              </Text>
              {liveDetails?.miniscore.recentOvsStats && (
                <ScrollView
                  ref={scrollViewRef}
                  showsHorizontalScrollIndicator={false}
                  onContentSizeChange={() => {
                    if (scrollViewRef && scrollViewRef.current) {
                      scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                  }}
                  horizontal={true}
                  style={[Styles.marginTop12]}
                >
                  <View style={[Styles.flexRow, Styles.flex1, Styles.padding16]}>
                    {liveDetails?.miniscore.recentOvsStats.split(" ").map((k, i) => {
                      return <ScroreOnBall key={i + new Date().getTime()} index={i} score={k} colors={colors} multicolors={multicolors} />;
                    })}
                  </View>
                </ScrollView>
              )}
            </View>
          )}
          {liveDetails?.miniscore && liveDetails?.miniscore.matchScoreDetails.state !== "Preview" && <SectionTitle title="Miniscore" colors={colors} />}
          {liveDetails?.miniscore && liveDetails?.miniscore.matchScoreDetails.state !== "Preview" && (
            <View>
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
                {liveDetails?.miniscore.batsmanStriker.batName && (
                  <View style={[Styles.flexRow]}>
                    {CreateTableCells(FormatScoreName(liveDetails?.miniscore.batsmanStriker.batName), false, false, true)}
                    {CreateTableCells(liveDetails?.miniscore.batsmanStriker.batRuns ? liveDetails.miniscore.batsmanStriker.batRuns : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.batsmanStriker.batBalls ? liveDetails.miniscore.batsmanStriker.batBalls : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.batsmanStriker.batFours ? liveDetails.miniscore.batsmanStriker.batFours : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.batsmanStriker.batSixes ? liveDetails.miniscore.batsmanStriker.batSixes : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.batsmanStriker.batStrikeRate ? liveDetails.miniscore.batsmanStriker.batStrikeRate.toFixed(2) : 0.0, true, true)}
                  </View>
                )}
                <Divider />
                {liveDetails?.miniscore.batsmanNonStriker.batName && (
                  <View style={[Styles.flexRow]}>
                    {CreateTableCells(FormatScoreName(liveDetails?.miniscore.batsmanNonStriker.batName), false, false)}
                    {CreateTableCells(liveDetails?.miniscore.batsmanNonStriker.batRuns ? liveDetails.miniscore.batsmanNonStriker.batRuns : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.batsmanNonStriker.batBalls ? liveDetails.miniscore.batsmanNonStriker.batBalls : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.batsmanNonStriker.batFours ? liveDetails.miniscore.batsmanNonStriker.batFours : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.batsmanNonStriker.batSixes ? liveDetails.miniscore.batsmanNonStriker.batSixes : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.batsmanNonStriker.batStrikeRate ? liveDetails.miniscore.batsmanNonStriker.batStrikeRate.toFixed(2) : 0.0, true, true)}
                  </View>
                )}
                <Divider />
                <View style={[Styles.flexRow, Styles.paddingTop8, Styles.paddingEnd16, { justifyContent: "flex-end" }]}>
                  <Text variant="bodyMedium">Patnership </Text>
                  <Text variant="titleSmall" style={{ color: colors.primary }}>
                    {liveDetails?.miniscore.partnerShip.runs + "(" + liveDetails?.miniscore.partnerShip.balls + ")"}
                  </Text>
                </View>
                <Divider style={[Styles.marginVertical12]} />
                <View style={[Styles.flexRow]}>
                  {CreateTableHeader("Bowler", false)}
                  {CreateTableHeader("O", true)}
                  {CreateTableHeader("M", true)}
                  {CreateTableHeader("R", true)}
                  {CreateTableHeader("W", true)}
                  {CreateTableHeader("ER", true, true)}
                </View>
                <Divider style={[Styles.marginVertical8]} />
                {liveDetails?.miniscore.bowlerStriker.bowlName && (
                  <View style={[Styles.flexRow]}>
                    {CreateTableCells(FormatScoreName(liveDetails?.miniscore.bowlerStriker.bowlName), false, false, true)}
                    {CreateTableCells(liveDetails?.miniscore.bowlerStriker.bowlOvs ? liveDetails.miniscore.bowlerStriker.bowlOvs : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.bowlerStriker.bowlMaidens ? liveDetails.miniscore.bowlerStriker.bowlMaidens : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.bowlerStriker.bowlRuns ? liveDetails.miniscore.bowlerStriker.bowlRuns : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.bowlerStriker.bowlWkts ? liveDetails.miniscore.bowlerStriker.bowlWkts : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.bowlerStriker.bowlEcon ? liveDetails.miniscore.bowlerStriker.bowlEcon.toFixed(2) : 0.0, true, true)}
                  </View>
                )}
                <Divider />
                {liveDetails?.miniscore.bowlerNonStriker.bowlName && (
                  <View style={[Styles.flexRow]}>
                    {CreateTableCells(FormatScoreName(liveDetails?.miniscore.bowlerNonStriker.bowlName), false, false)}
                    {CreateTableCells(liveDetails?.miniscore.bowlerNonStriker.bowlOvs ? liveDetails.miniscore.bowlerNonStriker.bowlOvs : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.bowlerNonStriker.bowlMaidens ? liveDetails.miniscore.bowlerNonStriker.bowlMaidens : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.bowlerNonStriker.bowlRuns ? liveDetails.miniscore.bowlerNonStriker.bowlRuns : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.bowlerNonStriker.bowlWkts ? liveDetails.miniscore.bowlerNonStriker.bowlWkts : 0, true, false)}
                    {CreateTableCells(liveDetails?.miniscore.bowlerNonStriker.bowlEcon ? liveDetails.miniscore.bowlerNonStriker.bowlEcon.toFixed(2) : 0.0, true, true)}
                  </View>
                )}
                <Divider />
                {liveDetails?.miniscore.lastWicket && (
                  <View style={[Styles.marginTop12]}>
                    <Text variant="titleSmall">Last Wicket</Text>
                    <Text variant="titleSmall" style={{ color: multicolors.red }}>
                      {liveDetails?.miniscore.lastWicket}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
          {commentaryDetails && <SectionTitle title="Commentary" colors={colors} />}
          {commentaryDetails && (
            <View style={[Styles.paddingHorizontal16, Styles.marginBottom32]}>
              <CreateCommentary key={new Date().getTime()} commentaryList={commentaryDetails} />
            </View>
          )}
        </ScrollView>
      ) : (
        <NoData iconName="earth" title="No Live feed" subtitle="Match has not started yet or has been interupted" />
      )}
    </View>
  );
};

export default React.memo(Live);
