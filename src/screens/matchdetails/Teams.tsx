import { ScrollView, View, ActivityIndicator } from "react-native";
import { Avatar, Divider, List, Text } from "react-native-paper";
import { useState, useEffect } from "react";
import { Styles } from "../../styles/styles";
import { GetMatchTeams } from "../../api/APICalls";
import { deviceWidth, s3Path } from "../../utils/Constants";
import { SinglePlayer } from "../../models/MatchDetails";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import SectionTitle from "../../components/SectionTitle";
import NoData from "../../components/NoData";

const Teams = ({ theme, matchID, team1ID, team2ID, team1Name, team2Name }: any) => {
  const { colors, multicolors } = theme;
  const [isLoading, setIsLoading] = useState(true);
  const [team1Playing11, setTeam1Playing11] = useState<SinglePlayer[]>([]);
  const [team1PlayingBench, setTeam1PlayingBench] = useState<SinglePlayer[]>([]);
  const [team2Playing11, setTeam2Playing11] = useState<SinglePlayer[]>([]);
  const [team2PlayingBench, setTeam2PlayingBench] = useState<SinglePlayer[]>([]);

  const [index, setIndex] = useState(0);

  const TeamSuccess = (response: any, type: number) => {
    if (response && response.data && Array.isArray(response.data.player)) {
      const playing11: SinglePlayer[] = response.data.player[0] ? response.data.player[0].player : [];
      const playingBench: SinglePlayer[] = response.data.player[1] ? response.data.player[1].player : [];
      if (type === 1) {
        setTeam1Playing11(playing11);
        setTeam1PlayingBench(playingBench);
      } else {
        setTeam2Playing11(playing11);
        setTeam2PlayingBench(playingBench);
      }
    }
    setIsLoading(false);
  };

  const TeamFail = (errorMessage: string) => {
    console.log(errorMessage);
    setIsLoading(false);
  };

  useEffect(() => {
    GetMatchTeams({ matchID: matchID, teamID: team1ID, type: 1 }, TeamSuccess, TeamFail);
    GetMatchTeams({ matchID: matchID, teamID: team2ID, type: 2 }, TeamSuccess, TeamFail);
  }, []);

  interface TeamProps {
    playing11: SinglePlayer[];
    bench: SinglePlayer[];
  }

  const CreateCaptian = () => {
    return (
      <View style={[Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginStart8, Styles.width40, Styles.height40, Styles.borderRadius12, { backgroundColor: multicolors.red }]}>
        <Text variant="titleLarge" style={[{ color: multicolors.white }]}>
          C
        </Text>
      </View>
    );
  };

  const CreateWicketKeeper = () => {
    return (
      <View style={[Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginStart8, Styles.width40, Styles.height40, Styles.borderRadius12, { backgroundColor: multicolors.yellow }]}>
        <Text variant="titleMedium" style={[{ color: multicolors.white }]}>
          WK
        </Text>
      </View>
    );
  };

  const CreateTeam = ({ playing11, bench }: TeamProps) => {
    return (
      <View style={[Styles.flex1, Styles.paddingHorizontal16]}>
        {isLoading ? (
          <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
            <ActivityIndicator animating={true} color={colors.primary} size={32} />
          </View>
        ) : (
          <ScrollView style={[Styles.flex1]} showsVerticalScrollIndicator={false} stickyHeaderIndices={playing11.length > 0 && bench.length > 0 ? [0, 2] : playing11.length > 0 ? [0] : []}>
            {playing11.length > 0 && <SectionTitle title="Playing 11" colors={colors} />}
            <View>
              {playing11.map((k: SinglePlayer, i: number) => {
                return (
                  <View key={i}>
                    <List.Item
                      title={k.name}
                      description={k.role ? k.role : "NA"}
                      descriptionStyle={{ color: colors.textSecondary, fontSize: 12 }}
                      right={() => (
                        <View style={[Styles.flexRow, Styles.flexAlignCenter]}>
                          {k.captain && <CreateCaptian />}
                          {k.keeper && <CreateWicketKeeper />}
                        </View>
                      )}
                      left={() => <Avatar.Image size={42} source={{ uri: s3Path + k.faceImageId + ".png" }} />}
                    />
                    <Divider />
                  </View>
                );
              })}
            </View>
            {bench.length > 0 && <SectionTitle title="Bench" colors={colors} />}
            <View>
              {bench.map((k: SinglePlayer, i: number) => {
                return (
                  <View key={i}>
                    <List.Item title={k.name} description={k.role ? k.role : "NA"} descriptionStyle={{ color: colors.textSecondary, fontSize: 12 }} left={() => <Avatar.Image size={36} source={{ uri: s3Path + k.faceImageId + ".png" }} />} />
                    <Divider />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    );
  };

  const [routes] = useState([
    { key: "team1", title: team1Name },
    { key: "team2", title: team2Name },
  ]);

  const renderScene = SceneMap({
    team1: () => (team1Playing11.length === 0 ? <NoData iconName="account-group" title="Teams not decided yet" subtitle="Playing 11 will be decided once the toss is completed" /> : <CreateTeam playing11={team1Playing11} bench={team1PlayingBench} />),
    team2: () => (team2Playing11.length === 0 ? <NoData iconName="account-group" title="Teams not decided yet" subtitle="Playing 11 will be decided once the toss is completed" /> : <CreateTeam playing11={team2Playing11} bench={team2PlayingBench} />),
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      tabStyle={{ width: deviceWidth / 2, paddingHorizontal: 18 }}
      scrollEnabled
      indicatorStyle={{ backgroundColor: colors.primary, height: 3 }}
      labelStyle={{ color: colors.text, textTransform: "capitalize" }}
      style={{ backgroundColor: colors.background }}
    />
  );

  return (
    <View style={[Styles.flex1]}>
      <TabView renderTabBar={renderTabBar} navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={{ width: deviceWidth }} />
    </View>
  );
};

export default Teams;
