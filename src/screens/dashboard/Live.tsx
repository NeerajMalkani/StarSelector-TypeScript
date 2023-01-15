import { useState, useEffect } from "react";
import { StatusBar, View, Dimensions } from "react-native";
import { Carousel, Pagination } from "react-native-snap-carousel";
import Provider from "../../api/Provider";
import { LiveCardItem } from "../../components/Cards";
import Header from "../../components/Header";
import { BasicProps, Match, SeriesAdWrapper, TypeMatch } from "../../models/Props";
import { Styles } from "../../styles/styles";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = SLIDER_WIDTH;

const Live = ({ theme }: BasicProps) => {
  const { multicolors, colors }: any = theme;
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);

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
      setLiveMatches(arrMatches);
    }
  };

  const FetchMatchData = () => {
    Provider.get("matches/list", { matchState: "live" })
      .then((response) => {
        if (response && response.data && Array.isArray(response.data.typeMatches) && response.data.typeMatches.length > 0) {
          CreateMatches(response);
          setIsLoading(false);
          setRefreshing(false);
        }
      })
      .catch((ex) => {
        console.log(ex);
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    FetchMatchData();
  }, []);

  const RenderLiveCards = ({ item }: any) => {
    return <LiveCardItem item={item} colors={colors} multicolors={multicolors} />;
  };

  return (
    <View style={[Styles.flex1, { paddingBottom: 104 }]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Header colors={colors} multicolors={multicolors} title="Live" />
      <View>
        <Carousel vertical={false} layout="default" layoutCardOffset={9} onSnapToItem={(index) => setIndex(index)} data={liveMatches} renderItem={RenderLiveCards} sliderWidth={SLIDER_WIDTH} itemWidth={ITEM_WIDTH} />
        <Pagination dotsLength={liveMatches.length} activeDotIndex={index} />
      </View>
    </View>
  );
};

export default Live;
