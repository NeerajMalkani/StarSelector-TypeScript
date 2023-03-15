import { StatusBar, View, ScrollView, RefreshControl } from "react-native";
import { BasicProps } from "../../models/Props";
import { Styles } from "../../styles/styles";
import { useState, useEffect } from "react";
import { LiveCardItem, UpcomingCardItem } from "../../components/Cards";
import Header from "../../components/Header";
import { ActivityIndicator, Text } from "react-native-paper";
import { GetFeaturedMatches, GetUpcomingMatches } from "../../api/APICalls";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { deviceWidth } from "../../utils/Constants";
import SectionTitle from "../../components/SectionTitle";
import { Match, Matches } from "../../models/Matches";

const Home = ({ theme, navigation }: BasicProps) => {
  const { multicolors, colors }: any = theme;
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [index, setIndex] = useState(0);
  const [isCountdownRunning, setIsCountdownRunning] = useState(true);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);

  const CreateMatchesData = (response: any, type: number) => {
    if (response && response.data && Array.isArray(response.data.matches)) {
      const objFeaturedMatches: Matches[] = response.data.matches;
      let arrMatches: Match[] = [];
      objFeaturedMatches.map((match: Matches) => {
        arrMatches.push(match.match);
      });
      setLiveMatches(arrMatches);
      setIsCountdownRunning(true);
    }
  };

  const MatchesSuccess = (response: any, type: number) => {
    CreateMatchesData(response, type);
    setIsLoading(false);
    setRefreshing(false);
  };

  const MatchesFail = (errorMessage: string) => {
    console.log(errorMessage);
    setIsLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setIsCountdownRunning(false);
    setRefreshing(true);
    GetFeaturedMatches(MatchesSuccess, MatchesFail);
  };

  const RenderLiveCards = ({ item }: any) => {
    return <LiveCardItem item={item} colors={colors} multicolors={multicolors} navigation={navigation} />;
  };

  useEffect(() => {
    //GetUpcomingMatches(MatchesSuccess, MatchesFail);
    GetFeaturedMatches(MatchesSuccess, MatchesFail);
  }, []);

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
          liveMatches.length > 0 && (
            <ScrollView key="scroll1" showsVerticalScrollIndicator={false} stickyHeaderIndices={[2]} refreshControl={<RefreshControl colors={[theme.colors.primary]} refreshing={refreshing} onRefresh={onRefresh} />}>
              <SectionTitle title="Featured Matches" colors={colors} />
              <View>
                <Carousel vertical={false} layout="default" layoutCardOffset={9} onSnapToItem={(index) => setIndex(index)} data={liveMatches} renderItem={RenderLiveCards} sliderWidth={deviceWidth} itemWidth={deviceWidth} />
                <Pagination dotsLength={liveMatches.length} activeDotIndex={index} dotColor={colors.primary} inactiveDotColor={colors.textSecondary} dotContainerStyle={{ marginHorizontal: 3 }} dotStyle={{ width: 10, height: 10, borderRadius: 5 }} containerStyle={[Styles.paddingVertical2]} />
              </View>
              <SectionTitle title="Join the Contest" colors={colors} />
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
