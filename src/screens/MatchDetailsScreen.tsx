import { useEffect, useState, useRef } from "react";
import { StatusBar, View } from "react-native";
import { withTheme } from "react-native-paper";
import { TabView, TabBar } from "react-native-tab-view";
import PlayerDetails from "../components/PlayerDetails";
import { Styles } from "../styles/styles";
import { deviceWidth } from "../utils/Constants";
import Live from "./matchdetails/Live";
import MatchInfo from "./matchdetails/MatchInfo";
import Overs from "./matchdetails/Overs";
import Scorecard from "./matchdetails/Scorecard";
import Teams from "./matchdetails/Teams";
import BottomSheet from "@gorhom/bottom-sheet";
import { GetPlayerID } from "../api/APICalls";
import { Player } from "../models/Player";

const MatchDetailsScreen = ({ route, navigation, theme }: any) => {
  const { colors, multicolors } = theme;
  const matchID = route.params.matchID;
  const team1Name = route.params.team1Name;
  const team2Name = route.params.team2Name;
  const matchStatus = route.params.matchStatus;
  const playerDetailsRef = useRef<BottomSheet>(null);
  const [playerData, setPlayerData] = useState<Player>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sheetIndex = useState(-1);
  const [index, setIndex] = useState(0);

  const PlayerSuccess = (response: any) => {
    if (response && response.data) {
      setPlayerData(response.data);
      setIsLoading(false);
    }
  };

  const PlayerFail = (errorMessage: any) => {
    console.log(errorMessage);
    setIsLoading(false);
  };

  const OpenPlayerDetails = (playerID: number) => {
    setIsLoading(true);
    GetPlayerID({ playerID: playerID }, PlayerSuccess, PlayerFail);
    sheetIndex[1](0);
  };

  const [routes] = useState([
    { key: "info", title: "Match Info" },
    { key: "teams", title: "Teams" },
    { key: "live", title: "Live" },
    { key: "scorecard", title: "Scorecard" },
    { key: "overs", title: "Overs" },
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "info":
        return <MatchInfo theme={theme} matchID={matchID} />;
      case "teams":
        return <Teams theme={theme} matchID={matchID} team1Name={team1Name} team2Name={team2Name} openPlayer={OpenPlayerDetails} />;
      case "live":
        return <Live theme={theme} matchID={matchID} matchStatus={matchStatus} />;
      case "scorecard":
        return <Scorecard theme={theme} matchID={matchID} />;
      case "overs":
        return <Overs />;
      default:
        return null;
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: route.params.matchName });
  }, []);

  const renderTabBar = (props: any) => <TabBar {...props} tabStyle={{ width: "auto", paddingHorizontal: 18 }} scrollEnabled indicatorStyle={{ backgroundColor: multicolors.white, height: 3 }} style={{ backgroundColor: colors.primary }} />;

  return (
    <View style={[Styles.flex1]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[Styles.flex1, { backgroundColor: colors.background }]}>
        <TabView renderTabBar={renderTabBar} navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={{ width: deviceWidth }} />
        <PlayerDetails bottomSheetRef={playerDetailsRef} setIndex={sheetIndex} playerData={playerData} isLoading={isLoading} colors={colors} />
      </View>
    </View>
  );
};

export default withTheme(MatchDetailsScreen);
