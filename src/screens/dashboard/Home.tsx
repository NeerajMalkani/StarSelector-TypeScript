import { StatusBar, View, Dimensions } from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";
import { BasicProps, Match } from "../../models/Props";
import { Styles } from "../../styles/styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useRef, useState, useEffect } from "react";
import CarouselCardItem from "../../components/Cards";
import Provider from "../../api/Provider";
import { GetImageFromID } from "../../utils/ImageFromID";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = SLIDER_WIDTH;

const Home = ({ theme }: BasicProps) => {
  const { multicolors, colors }: any = theme;
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  const [matches, setMatches] = useState<Array<Match>>([]);

  const CreateMatchData = (response: any) => {
    const matchesCreate: Array<Match> = [];
    response.data.typeMatches.map((s: any, i: number) => {
      if (Array.isArray(s.seriesAdWrapper) && s.seriesAdWrapper.length > 0) {
        s.seriesAdWrapper.map((m: any) => {
          if (m.seriesMatches && Array.isArray(m.seriesMatches.matches) && m.seriesMatches.matches.length > 0) {
            matchesCreate.push({
              team1ImageID: m.seriesMatches.matches[0].matchInfo.team1.imageId,
              team2ImageID: m.seriesMatches.matches[0].matchInfo.team2.imageId,
              team1Name: m.seriesMatches.matches[0].matchInfo.team1.teamSName,
              team2Name: m.seriesMatches.matches[0].matchInfo.team2.teamSName,
              matchTitle: m.seriesMatches.matches[0].matchInfo.seriesName,
              matchDesc: m.seriesMatches.matches[0].matchInfo.matchDesc,
              state: m.seriesMatches.matches[0].matchInfo.state,
            });

            let image1: any = null,
              image2: any = null;
            GetImageFromID(m.seriesMatches.matches[0].matchInfo.team1.imageId, (base64Image: any, id: any) => {
              image1 = base64Image;
              if (image1 !== null && image2 !== null) {
                const matchesTemp = [...matchesCreate];
                matchesTemp.map((k) => {
                  if (k.team1ImageID === id) {
                    k.team1Image = image1;
                    k.team2Image = image2;
                  }
                });
                setMatches(matchesTemp);
              }
            });
            GetImageFromID(m.seriesMatches.matches[0].matchInfo.team2.imageId, (base64Image: any, id: any) => {
              image2 = base64Image;
              if (image1 !== null && image2 !== null) {
                const matchesTemp = [...matchesCreate];
                matchesTemp.map((k) => {
                  if (k.team2ImageID === id) {
                    k.team1Image = image1;
                    k.team2Image = image2;
                  }
                });
                setMatches(matchesTemp);
              }
            });
          }
        });
      }
    });
    setMatches(matchesCreate);
  };

  useEffect(() => {
    Provider.get("matches/list", { matchState: "live" }, { "X-RapidAPI-Key": "Qtw5daIGTJmsha5QLAJJypOYspmxp1Fvr02jsnBNF5nCbUk9IG", "X-RapidAPI-Host": "unofficial-cricbuzz.p.rapidapi.com" })
      .then((response) => {
        if (response && response.data && Array.isArray(response.data.typeMatches) && response.data.typeMatches.length > 0) {
          CreateMatchData(response);
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  return (
    <View style={[Styles.flex1]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[Styles.width100per, Styles.height192, Styles.positionAbsolute, { backgroundColor: colors.primary, borderBottomLeftRadius: 96 }]}>
        <View style={[Styles.flexRow, Styles.padding16, { justifyContent: "space-between" }]}>
          <Text variant="headlineSmall" style={[{ color: multicolors.white }]}>
            Home
          </Text>
          <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
            <IconButton icon="wallet" iconColor={multicolors.white} size={24} onPress={() => console.log("Pressed")} />
            <IconButton icon="bell" iconColor={multicolors.white} size={24} style={[{ marginStart: -4 }]} onPress={() => console.log("Pressed")} />
            <Avatar.Image size={32} style={[Styles.marginStart4, { backgroundColor: colors.primaryDark }]} source={{ uri: "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png" }} />
          </View>
        </View>
      </View>
      <View style={[{ marginTop: 64 }]}>
        <Carousel vertical={false} ref={isCarousel} data={matches} renderItem={CarouselCardItem} sliderWidth={SLIDER_WIDTH} itemWidth={ITEM_WIDTH} inactiveSlideShift={0} onSnapToItem={(index) => setIndex(index)} />
        <Pagination dotsLength={matches.length} activeDotIndex={index} carouselRef={isCarousel} containerStyle={{ marginTop: -16 }} inactiveDotScale={0.6} dotStyle={[{ backgroundColor: colors.primary, width: 12, height: 12, borderRadius: 6, marginStart: -8 }]} inactiveDotStyle={[{ backgroundColor: colors.textSecondary }]} tappableDots={true} />
      </View>
    </View>
  );
};

export default Home;
