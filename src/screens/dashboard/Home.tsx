import { StatusBar, View, ScrollView, RefreshControl } from "react-native";
import { BasicProps, Match, SeriesAdWrapper, TypeMatch } from "../../models/Props";
import { Styles } from "../../styles/styles";
import { useState, useEffect } from "react";
import { UpcomingCardItem } from "../../components/Cards";
import Provider from "../../api/Provider";
import Header from "../../components/Header";
import { ActivityIndicator, Text } from "react-native-paper";

const Home = ({ theme }: BasicProps) => {
  const { multicolors, colors }: any = theme;
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
      arrMatches.sort(function (a, b) {
        return parseFloat(a.matchInfo.startDate) - parseFloat(b.matchInfo.startDate);
      });
      setUpcomingMatches(arrMatches);
    }
  };

  const FetchMatchData = () => {
    Provider.get("matches/list", { matchState: "upcoming" })
      .then((response) => {
        if (response && response.data && Array.isArray(response.data.typeMatches) && response.data.typeMatches.length > 0) {
          CreateMatches(response);
          setIsLoading(false);
          setRefreshing(false);
        } else {
        }
      })
      .catch((ex) => {
        console.log(ex);
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setIsLoading(true);
    FetchMatchData();
  };

  useEffect(() => {
    FetchMatchData();
  }, []);

  return (
    <View style={[Styles.flex1, { paddingBottom: 104 }]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[Styles.flex1, { backgroundColor: colors.background }]}>
        <Header colors={colors} multicolors={multicolors} title="Home" />
        {isLoading ? (
          <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
            <ActivityIndicator animating={true} color={colors.primary} size={32} />
          </View>
        ) : (
          upcomingMatches.length > 0 && (
            <View style={[Styles.flexColumn]}>
              <Text variant="titleLarge" style={[Styles.paddingHorizontal24, Styles.paddingTop16, Styles.paddingBottom8]}>
                Upcoming Matches
              </Text>
              <ScrollView key="scroll1" showsVerticalScrollIndicator={false} refreshControl={<RefreshControl colors={[theme.colors.primary]} refreshing={refreshing} onRefresh={() => onRefresh} />}>
                {upcomingMatches.map((k, i) => {
                  return <UpcomingCardItem key={i} item={k} colors={colors} multicolors={multicolors} isLast={i === upcomingMatches.length - 1 ? true : false} />;
                })}
              </ScrollView>
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default Home;
