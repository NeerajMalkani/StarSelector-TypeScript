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

  const CreateFeaturedMatches = (response: any) => {
    const matchesCreate: Array<Match> = [];
    response.data.typeMatches.map((s: any, i: number) => {
      if (Array.isArray(s.seriesAdWrapper) && s.seriesAdWrapper.length > 0) {
        s.seriesAdWrapper.map((m: any) => {
          if (m.seriesMatches && Array.isArray(m.seriesMatches.matches) && m.seriesMatches.matches.length > 0) {
            const matchInfo = m.seriesMatches.matches[0].matchInfo;
            const matchScore = m.seriesMatches.matches[0].matchScore;
            let objMatchDetails: Match = new Object();
            objMatchDetails.matchTitle= matchInfo.seriesName;
            objMatchDetails.matchDesc= matchInfo.matchDesc
            objMatchDetails.state= matchInfo.state;
            objMatchDetails.team1ImageID= matchInfo.team1.imageId;
            objMatchDetails.team2ImageID= matchInfo.team2.imageId;
            objMatchDetails.team1Name= matchInfo.team1.teamSName;
            objMatchDetails.team2Name= matchInfo.team2.teamSName;
            if(matchScore && "team1Score" in matchScore){
              if("inngs1" in matchScore.team1Score){
                objMatchDetails.team1RunsInn1 = matchScore.team1Score.inngs1.runs;
                objMatchDetails.team1OversInn1 = matchScore.team1Score.inngs1.overs;
                objMatchDetails.team1WicketsInn1 = matchScore.team1Score.inngs1.wickets;
              }
              if("inngs2" in matchScore.team1Score){
                objMatchDetails.team1RunsInn2 = matchScore.team1Score.inngs2.runs;
                objMatchDetails.team1OversInn2 = matchScore.team1Score.inngs2.overs;
                objMatchDetails.team1WicketsInn2 = matchScore.team1Score.inngs2.wickets;
              }
            }
            if(matchScore && "team2Score" in matchScore){
              if("inngs1" in matchScore.team2Score){
                objMatchDetails.team2RunsInn1 = matchScore.team2Score.inngs1.runs;
                objMatchDetails.team2OversInn1 = matchScore.team2Score.inngs1.overs;
                objMatchDetails.team2WicketsInn1 = matchScore.team2Score.inngs1.wickets;
              }
              if("inngs2" in matchScore.team2Score){
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
                setMatches(matchesTemp);
            });
            GetImageFromID(matchInfo.team2.imageId, (base64Image: any, id: any) => {
                const matchesTemp = [...matchesCreate];
                matchesTemp.map((k) => {
                  if (k.team2ImageID === id) {
                    k.team2Image = base64Image;
                  }
                });
                setMatches(matchesTemp);
            });
          }
        });
      }
    });
    setMatches(matchesCreate);
  };

  const FetchFeaturedMatchData = () => {
    Provider.get("matches/list", { matchState: "live" })
    .then((response) => {
      if (response && response.data && Array.isArray(response.data.typeMatches) && response.data.typeMatches.length > 0) {
        CreateFeaturedMatches(response);
      }
    })
    .catch((ex) => {
      console.log(ex);
    });
  };

  useEffect(() => {
    FetchFeaturedMatchData();
    
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
