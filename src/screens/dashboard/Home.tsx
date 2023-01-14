import { StatusBar, View, Dimensions, ScrollView, RefreshControl } from "react-native";
import { BasicProps, Match, SeriesAdWrapper, TypeMatch } from "../../models/Props";
import { Styles } from "../../styles/styles";
import { useState, useEffect } from "react";
import CarouselCardItem from "../../components/Cards";
import Provider from "../../api/Provider";
import Header from "../../components/Header";
import { Text } from "react-native-paper";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = SLIDER_WIDTH;

const Home = ({ theme }: BasicProps) => {
  const { multicolors, colors }: any = theme;
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);

  const CreateMatches = (response: any) => {
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
      setUpcomingMatches(arrMatches);
    }
  };

  const FetchMatchData = () => {
    Provider.get("matches/list", { matchState: "upcoming" })
      .then((response) => {
        if (response && response.data && Array.isArray(response.data.typeMatches) && response.data.typeMatches.length > 0) {
          CreateMatches(response);
          setRefreshing(false);
        }
      })
      .catch((ex) => {
        console.log(ex);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    FetchMatchData();
  }, []);

  return (
    <View style={[Styles.flex1, { paddingBottom: 104 }]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[Styles.flex1, { backgroundColor: colors.background }]}>
        <Header colors={colors} multicolors={multicolors} />
        {upcomingMatches.length > 0 && (
          <View style={[Styles.flexColumn]}>
            <Text variant="titleLarge" style={[Styles.paddingHorizontal24, Styles.paddingTop16, Styles.paddingBottom0]}>
              Upcoming Matches
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  colors={[theme.colors.primary]}
                  refreshing={refreshing}
                  onRefresh={() => {
                    FetchMatchData();
                  }}
                />
              }
            >
              {upcomingMatches.map((k, i) => {
                return <CarouselCardItem key={i} item={k} colors={colors} multicolors={multicolors} isLast={i === upcomingMatches.length - 1 ? true : false} />;
              })}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;
