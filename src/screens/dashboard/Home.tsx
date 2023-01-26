import { StatusBar, View, ScrollView, RefreshControl } from "react-native";
import { BasicProps, Match, SeriesAdWrapper, TypeMatch } from "../../models/Props";
import { Styles } from "../../styles/styles";
import { useState, useEffect } from "react";
import { LiveCardItem, UpcomingCardItem } from "../../components/Cards";
import Header from "../../components/Header";
import { ActivityIndicator, Text } from "react-native-paper";
import { GetLiveMatches, GetUpcomingMatches } from "../../api/APICalls";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { deviceWidth } from "../../utils/Constants";

const Home = ({ theme, navigation }: BasicProps) => {
  const { multicolors, colors }: any = theme;
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [index, setIndex] = useState(0);
  const [isCountdownRunning, setIsCountdownRunning] = useState(true);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);

  const CreateMatchesData = (response: any, type: number) => {
    if (response && response.data && Array.isArray(response.data.typeMatches)) {
      const arrMatches: Match[] = [];
      const typeMatches: TypeMatch[] = response.data.typeMatches;
      typeMatches.map((tm: TypeMatch, i: number) => {
        if (Array.isArray(tm.seriesAdWrapper) && tm.seriesAdWrapper.length > 0) {
          tm.seriesAdWrapper.map((sad: SeriesAdWrapper) => {
            if (sad.seriesMatches && Array.isArray(sad.seriesMatches.matches) && sad.seriesMatches.matches.length > 0) {
              arrMatches.push(sad.seriesMatches.matches[0]);
            }
          });
        }
      });
      arrMatches.sort(function (a, b) {
        return parseFloat(a.matchInfo.startDate) - parseFloat(b.matchInfo.startDate);
      });
      type === 1 ? setUpcomingMatches(arrMatches) : setLiveMatches(arrMatches);
      setIsCountdownRunning(true);
    }
  };

  const MatchesSuccess = (response: any, type: number) => {
    CreateMatchesData(response, type);
    setIsLoading(false);
    setRefreshing(false);
  };

  const MatchesFail = (errorMessage: string) => {
    setIsLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setIsCountdownRunning(false);
    setRefreshing(true);
    GetLiveMatches(MatchesSuccess, MatchesFail);
  };

  useEffect(() => {
    GetUpcomingMatches(MatchesSuccess, MatchesFail);
    GetLiveMatches(MatchesSuccess, MatchesFail);
  }, []);

  const RenderLiveCards = ({ item }: any) => {
    return <LiveCardItem item={item} colors={colors} multicolors={multicolors} navigation={navigation} />;
  };

  return (
    <View style={[Styles.flex1]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[Styles.flex1, { backgroundColor: colors.background }]}>
        <Header colors={colors} multicolors={multicolors} title="Home" />
        {isLoading ? (
          <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
            <ActivityIndicator animating={true} color={colors.primary} size={32} />
          </View>
        ) : (
          upcomingMatches.length > 0 && (
            <ScrollView key="scroll1" showsVerticalScrollIndicator={false} stickyHeaderIndices={[2]} refreshControl={<RefreshControl colors={[theme.colors.primary]} refreshing={refreshing} onRefresh={onRefresh} />}>
              <View>
                <Text variant="titleMedium" style={[Styles.paddingHorizontal24, Styles.paddingTop16, { backgroundColor: colors.background }]}>
                  Featured Matches
                </Text>
                <View style={[Styles.width56, Styles.height4, Styles.marginTop4, Styles.borderRadius2, Styles.marginStart24, { backgroundColor: colors.primary }]}></View>
              </View>
              <View>
                <Carousel vertical={false} layout="default" layoutCardOffset={9} onSnapToItem={(index) => setIndex(index)} data={liveMatches} renderItem={RenderLiveCards} sliderWidth={deviceWidth} itemWidth={deviceWidth} />
                <Pagination dotsLength={liveMatches.length} activeDotIndex={index} dotColor={colors.primary} inactiveDotColor={colors.textSecondary} dotContainerStyle={{ marginHorizontal: 3 }} dotStyle={{ width: 10, height: 10, borderRadius: 5 }} containerStyle={[Styles.paddingVertical2]} />
              </View>
              <View style={[Styles.paddingVertical16, { backgroundColor: colors.background }]}>
                <Text variant="titleMedium" style={[Styles.paddingHorizontal24]}>
                  Join the Contest
                </Text>
                <View style={[Styles.width56, Styles.height4, Styles.marginTop4, Styles.borderRadius2, Styles.marginStart24, { backgroundColor: colors.primary }]}></View>
              </View>
              <View>
                {upcomingMatches.map((k, i) => {
                  if (i < 8) {
                    return <UpcomingCardItem key={i} item={k} colors={colors} multicolors={multicolors} isCountdownRunning={isCountdownRunning} navigation={navigation} />;
                  }
                })}
              </View>
            </ScrollView>
          )
        )}
      </View>
    </View>
  );
};

export default Home;
