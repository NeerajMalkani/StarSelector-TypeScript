import { StatusBar, View, Dimensions, ScrollView, RefreshControl } from "react-native";
import { BasicProps, Match } from "../../models/Props";
import { Styles } from "../../styles/styles";
import { useState, useEffect } from "react";
import CarouselCardItem from "../../components/Cards";
import Provider from "../../api/Provider";
import { GetImageFromID } from "../../utils/ImageFromID";
import Header from "../../components/Header";
import { Text } from "react-native-paper";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = SLIDER_WIDTH;

const Home = ({ theme }: BasicProps) => {
  const { multicolors, colors }: any = theme;
  const [refreshing, setRefreshing] = useState(false);
  const [liveMatches, setLiveMatches] = useState<Array<Match>>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Array<Match>>([]);

  const CreateMatches = (response: any, matchState: string) => {
    const matchesCreate: Array<Match> = [];
    response.data.typeMatches.map((s: any, i: number) => {
      if (Array.isArray(s.seriesAdWrapper) && s.seriesAdWrapper.length > 0) {
        s.seriesAdWrapper.map((m: any) => {
          if (m.seriesMatches && Array.isArray(m.seriesMatches.matches) && m.seriesMatches.matches.length > 0) {
            const matchInfo = m.seriesMatches.matches[0].matchInfo;
            const matchScore = m.seriesMatches.matches[0].matchScore;
            let objMatchDetails: Match = new Object();
            objMatchDetails.matchTitle = matchInfo.seriesName;
            objMatchDetails.matchDesc = matchInfo.matchDesc;
            objMatchDetails.state = matchInfo.state;
            objMatchDetails.status = matchInfo.status + " " + matchInfo.status;
            objMatchDetails.team1ImageID = matchInfo.team1.imageId;
            objMatchDetails.team2ImageID = matchInfo.team2.imageId;
            objMatchDetails.team1Name = matchInfo.team1.teamSName;
            objMatchDetails.team2Name = matchInfo.team2.teamSName;
            objMatchDetails.team1FullName = matchInfo.team1.teamName;
            objMatchDetails.team2FullName = matchInfo.team2.teamName;
            if (matchScore && "team1Score" in matchScore) {
              if ("inngs1" in matchScore.team1Score) {
                objMatchDetails.team1RunsInn1 = matchScore.team1Score.inngs1.runs;
                objMatchDetails.team1OversInn1 = matchScore.team1Score.inngs1.overs;
                objMatchDetails.team1WicketsInn1 = matchScore.team1Score.inngs1.wickets;
              }
              if ("inngs2" in matchScore.team1Score) {
                objMatchDetails.team1RunsInn2 = matchScore.team1Score.inngs2.runs;
                objMatchDetails.team1OversInn2 = matchScore.team1Score.inngs2.overs;
                objMatchDetails.team1WicketsInn2 = matchScore.team1Score.inngs2.wickets;
              }
            }
            if (matchScore && "team2Score" in matchScore) {
              if ("inngs1" in matchScore.team2Score) {
                objMatchDetails.team2RunsInn1 = matchScore.team2Score.inngs1.runs;
                objMatchDetails.team2OversInn1 = matchScore.team2Score.inngs1.overs;
                objMatchDetails.team2WicketsInn1 = matchScore.team2Score.inngs1.wickets;
              }
              if ("inngs2" in matchScore.team2Score) {
                objMatchDetails.team2RunsInn2 = matchScore.team2Score.inngs2.runs;
                objMatchDetails.team2OversInn2 = matchScore.team2Score.inngs2.overs;
                objMatchDetails.team2WicketsInn2 = matchScore.team2Score.inngs2.wickets;
              }
            }
            matchesCreate.push(objMatchDetails);

            GetImageFromID(matchInfo.team1.imageId, (base64Image: any, id: any) => {
              const matchesTemp = [...matchesCreate];
              matchesTemp.map((k) => {
                if (k.team1ImageID === id) {
                  k.team1Image = base64Image;
                }
              });
              if (matchState === "live") {
                setLiveMatches(matchesTemp);
              } else {
                setUpcomingMatches(matchesTemp);
              }
            });
            GetImageFromID(matchInfo.team2.imageId, (base64Image: any, id: any) => {
              const matchesTemp = [...matchesCreate];
              matchesTemp.map((k) => {
                if (k.team2ImageID === id) {
                  k.team2Image = base64Image;
                }
              });
              if (matchState === "live") {
                setLiveMatches(matchesTemp);
              } else {
                setUpcomingMatches(matchesTemp);
              }
            });
          }
        });
      }
    });
    matchesCreate.sort(function (a: any, b: any) {
      if (a.state > b.state) {
        return -1;
      } else {
        return 0;
      }
    });
    if (matchState === "live") {
      setLiveMatches(matchesCreate);
    } else {
      setUpcomingMatches(matchesCreate);
    }
  };

  const FetchMatchData = (matchState: string) => {
    Provider.get("matches/list", { matchState: matchState })
      .then((response) => {
        if (response && response.data && Array.isArray(response.data.typeMatches) && response.data.typeMatches.length > 0) {
          CreateMatches(response, matchState);
          setRefreshing(false);
        }
      })
      .catch((ex) => {
        console.log(ex);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    FetchMatchData("live");
    FetchMatchData("upcoming");
  }, []);

  return (
    <View style={[Styles.flex1]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ScrollView
        style={[Styles.flex1, { backgroundColor: colors.background }]}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={refreshing}
            onRefresh={() => {
              FetchMatchData("live");
              FetchMatchData("upcoming");
            }}
          />
        }
      >
        <Header colors={colors} multicolors={multicolors} />
        {liveMatches.length > 0 && (
          <View style={[Styles.flexColumn]}>
            <Text variant="titleLarge" style={[Styles.padding16, Styles.paddingBottom0]}>
              Ongoing Matches
            </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {liveMatches.map((k, i) => {
                return <CarouselCardItem item={k} index={k} colors={colors} multicolors={multicolors} isLast={i === liveMatches.length - 1 ? true : false} type="live"  />;
              })}
            </ScrollView>
          </View>
        )}
        {upcomingMatches.length > 0 && (
          <View style={[Styles.flexColumn]}>
            <Text variant="titleLarge" style={[Styles.padding16, Styles.paddingBottom0]}>
              Upcoming Matches
            </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {upcomingMatches.map((k, i) => {
                return <CarouselCardItem key={i} item={k} index={k} colors={colors} multicolors={multicolors} isLast={i === upcomingMatches.length - 1 ? true : false} type="upcoming" />;
              })}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
