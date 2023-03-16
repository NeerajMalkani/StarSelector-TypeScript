import { useState, useEffect } from "react";
import { StatusBar, View, ScrollView, RefreshControl } from "react-native";
import { BasicProps } from "../../models/Props";
import { Styles } from "../../styles/styles";
import { ActivityIndicator } from "react-native-paper";
import { LiveCardItem, UpcomingCardItem } from "../../components/Cards";
import Header from "../../components/Header";
import { GetFeaturedMatches, GetLiveMatches, GetUpcomingMatches } from "../../api/APICalls";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { deviceWidth } from "../../utils/Constants";
import SectionTitle from "../../components/SectionTitle";
import { Match, Matches, SeriesMatches, TypeMatch } from "../../models/Matches";

let arrFeaturedMatches: Match[] = [];
const Home = ({ theme, navigation }: BasicProps) => {
  const { multicolors, colors }: any = theme;

  const [refreshing, setRefreshing] = useState(false);
  const [isFeaturedLoaded, setFeaturedLoaded] = useState(false);
  const [isUpcomingLoaded, setUpcomingLoaded] = useState(false);

  const [featuredMatches, setFeaturedMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);

  const [index, setIndex] = useState(0);
  const [isCountdownRunning, setIsCountdownRunning] = useState(true);

  const FeaturedLiveMatchesSuccess = (response: any) => {
    if (response && response.data && Array.isArray(response.data.typeMatches)) {
      const objLiveMatches: TypeMatch[] = response.data.typeMatches;
      const objIntLiveMatches: TypeMatch[] = objLiveMatches.filter((typeMatch: TypeMatch) => {
        return typeMatch.matchType === "International";
      });
      arrFeaturedMatches = [];
      objIntLiveMatches.map((typeMatch: TypeMatch) => {
        typeMatch.seriesMatches.map((seriesMatch: SeriesMatches) => {
          seriesMatch.seriesAdWrapper?.matches.map((match: Match) => {
            arrFeaturedMatches.push(match);
          });
        });
      });
    }
    GetFeaturedMatches(FeaturedMatchesSuccess, FeaturedMatchesFail);
  };
  const FeaturedLiveMatchesFail = (errorMessage: string) => {
    console.log(errorMessage);
    GetFeaturedMatches(FeaturedMatchesSuccess, FeaturedMatchesFail);
  };
  const FeaturedMatchesSuccess = (response: any) => {
    setFeaturedLoaded(true);
    setRefreshing(false);
    if (response && response.data && Array.isArray(response.data.matches)) {
      let objFeaturedMatches: Matches[] = response.data.matches;
      objFeaturedMatches = objFeaturedMatches.filter((match: Matches) => {
        return match.match.matchInfo?.state !== "In Progress";
      });
      objFeaturedMatches.map((match: Matches) => {
        arrFeaturedMatches.push(match.match);
      });
      setFeaturedMatches(arrFeaturedMatches);
    }
  };
  const FeaturedMatchesFail = (errorMessage: string) => {
    console.log(errorMessage);
    setFeaturedLoaded(true);
    setRefreshing(false);
  };

  const UpcomingMatchesSuccess = (response: any) => {
    if (response && response.data && Array.isArray(response.data.typeMatches)) {
      const objUpcomingMatches: TypeMatch[] = response.data.typeMatches;
      let arrUpcomingMatches: Match[] = [];
      objUpcomingMatches.map((typeMatch: TypeMatch) => {
        typeMatch.seriesMatches.map((seriesMatch: SeriesMatches) => {
          seriesMatch.seriesAdWrapper?.matches.map((match: Match) => {
            arrUpcomingMatches.push(match);
          });
        });
      });
      arrUpcomingMatches.sort(function (a, b) {
        return parseFloat(a.matchInfo.startDate) - parseFloat(b.matchInfo.startDate);
      });
      setUpcomingMatches(arrUpcomingMatches);
      setIsCountdownRunning(true);
    }
    setUpcomingLoaded(true);
    setRefreshing(false);
  };
  const UpcomingMatchesFail = (errorMessage: string) => {
    console.log(errorMessage);
    setUpcomingLoaded(true);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setIsCountdownRunning(false);
    setRefreshing(true);
    GetLiveMatches(FeaturedLiveMatchesSuccess, FeaturedLiveMatchesFail);
  };

  const RenderLiveCards = ({ item }: any) => {
    return <LiveCardItem item={item} colors={colors} multicolors={multicolors} navigation={navigation} />;
  };

  useEffect(() => {
    GetUpcomingMatches(UpcomingMatchesSuccess, UpcomingMatchesFail);
    GetLiveMatches(FeaturedLiveMatchesSuccess, FeaturedLiveMatchesFail);
  }, []);

  return (
    <View style={[Styles.flex1]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[Styles.flex1, { backgroundColor: colors.background }]}>
        <Header colors={colors} multicolors={multicolors} title="Home" />
        {isFeaturedLoaded && isUpcomingLoaded ? (
          <ScrollView key="scroll1" showsVerticalScrollIndicator={false} stickyHeaderIndices={[2]} refreshControl={<RefreshControl colors={[theme.colors.primary]} refreshing={refreshing} onRefresh={onRefresh} />}>
            <SectionTitle title="Featured Matches" colors={colors} />
            {featuredMatches.length > 0 && (
              <View>
                <Carousel vertical={false} layout="default" layoutCardOffset={9} onSnapToItem={(index) => setIndex(index)} data={featuredMatches} renderItem={RenderLiveCards} sliderWidth={deviceWidth} itemWidth={deviceWidth} />
                <Pagination dotsLength={featuredMatches.length} activeDotIndex={index} dotColor={colors.primary} inactiveDotColor={colors.textSecondary} dotContainerStyle={{ marginHorizontal: 3 }} dotStyle={{ width: 10, height: 10, borderRadius: 5 }} containerStyle={[Styles.paddingVertical2]} />
              </View>
            )}
            <SectionTitle title="Join the Contest" colors={colors} />
            {upcomingMatches.length > 0 && (
              <View>
                {upcomingMatches.map((k, i) => {
                  if (i < 8) {
                    return <UpcomingCardItem key={i} item={k} colors={colors} multicolors={multicolors} isCountdownRunning={isCountdownRunning} navigation={navigation} />;
                  }
                })}
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
            <ActivityIndicator animating={true} color={colors.primary} size={32} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;
