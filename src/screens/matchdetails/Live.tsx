import { useState, useEffect, useRef } from "react";
import { ActivityIndicator, View, ScrollView, RefreshControl } from "react-native";
import { Divider, Text } from "react-native-paper";
import { GetMatchCommentry, GetMatchCommentryUnofficial } from "../../api/APICalls";
import NoData from "../../components/NoData";
import SectionTitle from "../../components/SectionTitle";
import { LiveDetails } from "../../models/Live";
import { Styles } from "../../styles/styles";
import { FormatOvers, FormatScore, FormatScoreName } from "../../utils/Formatter";
import reactStringReplace from "react-string-replace";
import { CommentaryLine } from "../../models/MatchCommentary";
import OverlayLoader from "../../components/OverlayLoader";
let lastTime = "",
  iid = 1;
const Live = ({ matchID, theme, matchStatus }: any) => {
  lastTime = "";
  const { colors, multicolors } = theme;
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentaryLoading, setIsCommentaryLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [liveDetails, setLiveDetails] = useState<LiveDetails>();
  const [commentaryDetails, setCommentaryDetails] = useState<CommentaryLine[]>([]);
  const scrollViewRef: any = useRef();

  const MatchCommentarySuccess = (response: any, isTms: boolean) => {
    if (response.data && response.data.commentaryLines) {
      response.data.commentaryLines.shift();
      const prevCom = isTms ? commentaryDetails : [];
      setCommentaryDetails([...prevCom, ...response.data.commentaryLines]);
      setIsCommentaryLoading(false);
    }
  };

  const MatchCommentaryFail = (errorMessage: string) => {
    console.log(errorMessage);
    setIsCommentaryLoading(false);
  };

  const MatchLiveSuccess = (response: any) => {
    if (response.data && response.data.matchHeader && response.data.miniscore) {
      iid = response.data.miniscore.inningsId;
      lastTime = "";
      GetMatchCommentryUnofficial({ matchId: matchID, iid: response.data.miniscore.inningsId }, MatchCommentarySuccess, MatchCommentaryFail);
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

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 100;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  useEffect(() => {
    GetMatchCommentry({ matchID: matchID }, MatchLiveSuccess, MatchLiveFail);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setCommentaryDetails([]);
    GetMatchCommentry({ matchID: matchID }, MatchLiveSuccess, MatchLiveFail);
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
      <Text
        variant={isCenter ? "bodyMedium" : isStriker ? "titleSmall" : "bodyMedium"}
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[Styles.paddingVertical8, isCenter ? (isSR ? Styles.flex2 : Styles.flex1) : Styles.flex3, isCenter && Styles.textCenter, { color: isStriker ? colors.primary : colors.text }]}
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
      case score === "Nb" || score === "nb" || score === "N" || score === "n":
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
      <View key={index} style={[Styles.marginStart4, Styles.padding4, Styles.flexAlignCenter, Styles.flexJustifyCenter, { borderRadius: 10000, minWidth: 24, backgroundColor: ballColor }]}>
        <Text variant="bodySmall" style={{ color: multicolors.white }}>
          {score}
        </Text>
      </View>
    );
  };

  const CreateCommentary = ({ commentaryList }: any) => {
    return (
      <View>
        {commentaryList.map((k: CommentaryLine, i: number) => {
          if (k.commentary) {
            if (i === commentaryList.length - 1) {
              lastTime = k.commentary.timestamp;
            }
            let formattedString,
              isReplaced = false;
            if (k.commentary.commentaryFormats) {
              for (let a = 0; a < k.commentary.commentaryFormats.length; a++) {
                if (k.commentary.commentaryFormats[a].type) {
                  for (let b = 0; b < k.commentary.commentaryFormats[a].value.length; b++) {
                    formattedString = reactStringReplace(isReplaced ? formattedString : k.commentary.commtxt, k.commentary.commentaryFormats[a].value[b].id, () => (
                      <Text key={b} variant="titleMedium" style={{ fontStyle: k.commentary?.commentaryFormats[a].type === "italic" ? "italic" : "normal" }}>
                        {k.commentary?.commentaryFormats[a].value[b].value}
                      </Text>
                    ));
                    isReplaced = true;
                  }
                  
                }
              }
              if (!isReplaced) {
                formattedString = k.commentary.commtxt;
              }
            } else {
              formattedString = k.commentary.commtxt;
            }
            return (
              <View key={i}>
                {k.commentary.overSep && (
                  <View style={[Styles.flexColumn, Styles.marginTop8, Styles.borderRadius8, { backgroundColor: colors.background, elevation: 2 }]}>
                    <View style={[Styles.flexRow, Styles.padding8, Styles.borderBottom1, { justifyContent: "space-between", borderBottomColor: colors.seperator }]}>
                      <Text variant="titleMedium" style={[Styles.marginEnd12]}>
                        Over {k.commentary.overNum?.toFixed(0)}
                      </Text>
                      <View style={[Styles.flexRow]}>
                        {k.commentary.overSep.overSummary.split(" ").map((v, d) => {
                          return <ScroreOnBall key={d} index={d} score={v} />;
                        })}
                        <Text variant="bodyLarge" style={{ color: colors.primary, marginStart: 12 }}>
                          {"(" + (k.commentary.overSep.runs ? k.commentary.overSep.runs : "0") + " runs)"}
                        </Text>
                      </View>
                    </View>
                    <View style={[Styles.flexRow, Styles.padding8, { justifyContent: "space-between" }]}>
                      <View>
                        <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                          Batsmen
                        </Text>
                        <Text variant="bodyMedium">{k.commentary.overSep.batStrikerName}</Text>
                        <Text variant="bodyMedium">{k.commentary.overSep.batNonStrikerName}</Text>
                      </View>
                      <View style={[Styles.flexAlignEnd]}>
                        <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                          Bowler
                        </Text>
                        <Text variant="bodyMedium">{k.commentary.overSep.bowlName}</Text>
                      </View>
                    </View>
                    <View style={[Styles.flexRow, Styles.borderTop1, Styles.padding8, { justifyContent: "space-between", borderTopColor: colors.seperator }]}>
                      <Text variant="bodyLarge" style={{ color: colors.textSecondary }}>
                        Total
                      </Text>
                      <Text variant="bodyLarge">{FormatScore(k.commentary.overSep.score, k.commentary.overSep.wickets)}</Text>
                    </View>
                  </View>
                )}
                <View style={[Styles.flexRow, Styles.marginTop12]}>
                  {k.commentary.overNum && (
                    <View style={[Styles.flex1, Styles.flexColumn]}>
                      <Text variant="titleMedium">{k.commentary.overNum}</Text>
                    </View>
                  )}
                  <View style={[Styles.flex6]}>
                    <Text variant="bodyMedium">{formattedString}</Text>
                  </View>
                </View>
              </View>
            );
          }
        })}
      </View>
    );
  };

  return (
    <View style={[Styles.flex1]}>
      {isCommentaryLoading && <OverlayLoader colors={colors} />}
      {isLoading ? (
        <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
          <ActivityIndicator animating={true} color={colors.primary} size={32} />
        </View>
      ) : liveDetails ? (
        <ScrollView
          style={[Styles.flex1]}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1, 3, 5]}
          onScroll={({ nativeEvent }: any) => {
            if (isCloseToBottom(nativeEvent) && !isCommentaryLoading && lastTime !== "") {
              setIsCommentaryLoading(true);
              GetMatchCommentryUnofficial({ matchId: matchID, iid: iid, tms: lastTime }, MatchCommentarySuccess, MatchCommentaryFail);
            }
          }}
          scrollEventThrottle={400}
          refreshControl={<RefreshControl colors={[theme.colors.primary]} refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {liveDetails?.miniscore.matchScoreDetails && liveDetails?.miniscore.matchScoreDetails.inningsScoreList && liveDetails?.miniscore.matchScoreDetails.inningsScoreList.length > 0 && (
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
                      return <ScroreOnBall key={i} index={i} score={k} />;
                    })}
                  </View>
                </ScrollView>
              )}
            </View>
          )}
          {liveDetails?.miniscore.matchScoreDetails.state !== "Preview" && <SectionTitle title="Miniscore" colors={colors} />}
          {liveDetails?.miniscore.matchScoreDetails.state !== "Preview" && (
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
            <View style={[Styles.paddingHorizontal16]}>
              <CreateCommentary commentaryList={commentaryDetails} />
            </View>
          )}
        </ScrollView>
      ) : (
        <NoData iconName="earth" title="No Live feed" subtitle="Match has not started yet or has been interupted" />
      )}
    </View>
  );
};

export default Live;
