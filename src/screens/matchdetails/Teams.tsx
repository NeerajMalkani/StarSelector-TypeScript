import { ScrollView, View } from "react-native";
import { Avatar, Divider, List, Text } from "react-native-paper";
import { useState, useEffect } from "react";
import { Styles } from "../../styles/styles";
import { GetMatchTeams } from "../../api/APICalls";
import { deviceWidth, s3Path } from "../../utils/Constants";
import { SinglePlayer } from "../../models/MatchDetails";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";

const Teams = ({ theme, matchID, team1ID, team2ID, team1Name, team2Name }: any) => {
  const { colors, multicolors } = theme;
  const [team1Playing11, setTeam1Playing11] = useState<SinglePlayer[]>([]);
  const [team1PlayingBench, setTeam1PlayingBench] = useState<SinglePlayer[]>([]);
  const [team2Playing11, setTeam2Playing11] = useState<SinglePlayer[]>([]);
  const [team2PlayingBench, setTeam2PlayingBench] = useState<SinglePlayer[]>([]);

  const [index, setIndex] = useState(0);

  const TeamSuccess = (response: any, type: number) => {
    if (response && response.data && Array.isArray(response.data.player)) {
      const playing11: SinglePlayer[] = response.data.player[0].player;
      const playingBench: SinglePlayer[] = response.data.player[1].player;
      if (type === 1) {
        setTeam1Playing11(playing11);
        setTeam1PlayingBench(playingBench);
      } else {
        setTeam2Playing11(playing11);
        setTeam2PlayingBench(playingBench);
      }
    }
  };

  const TeamFail = () => {};

  useEffect(() => {
    GetMatchTeams({ matchID: matchID, teamID: team1ID, type: 1 }, TeamSuccess, TeamFail);
    GetMatchTeams({ matchID: matchID, teamID: team2ID, type: 2 }, TeamSuccess, TeamFail);
  }, []);

  const CreateTeam1 = () => {
    return (
      <ScrollView style={[Styles.paddingHorizontal16]}>
        <List.Subheader>Playing 11</List.Subheader>
        {team1Playing11.map((k: SinglePlayer, i: number) => {
          return (
            <View key={i}>
              <List.Item
                title={k.name}
                description={k.role}
                right={() => {
                  return (
                    <View style={[Styles.flexRow]}>
                      {k.captain && (
                        <View style={[Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginStart8, Styles.width24, Styles.height24, Styles.borderRadius12, { backgroundColor: multicolors.red }]}>
                          <Text variant="titleSmall" style={[{ color: multicolors.white }]}>
                            C
                          </Text>
                        </View>
                      )}
                      {k.keeper && (
                        <View style={[Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginStart8, Styles.width24, Styles.height24, Styles.borderRadius12, { backgroundColor: multicolors.yellow }]}>
                          <Text variant="labelSmall" style={[{ color: multicolors.white }]}>
                            WK
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                }}
                left={() => <Avatar.Image size={42} source={{ uri: s3Path + k.faceImageId + ".png" }} />}
              />
              <Divider />
            </View>
          );
        })}
        <List.Subheader style={[Styles.marginTop12]}>Bench</List.Subheader>
        {team1PlayingBench.map((k: SinglePlayer, i: number) => {
          return (
            <View key={i}>
              <List.Item title={k.name} description={k.role} left={() => <Avatar.Image size={36} source={{ uri: s3Path + k.faceImageId + ".png" }} />} />
              <Divider />
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const CreateTeam2 = () => {
    return (
      <ScrollView style={[Styles.paddingHorizontal16]}>
        <List.Subheader>Playing 11</List.Subheader>
        {team2Playing11.map((k: SinglePlayer, i: number) => {
          return (
            <View key={i}>
              <List.Item
                title={k.name}
                description={k.role}
                right={() => {
                  return (
                    <View style={[Styles.flexRow]}>
                      {k.captain && (
                        <View style={[Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginStart8, Styles.width24, Styles.height24, Styles.borderRadius12, { backgroundColor: multicolors.red }]}>
                          <Text variant="titleSmall" style={[{ color: multicolors.white }]}>
                            C
                          </Text>
                        </View>
                      )}
                      {k.keeper && (
                        <View style={[Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginStart8, Styles.width24, Styles.height24, Styles.borderRadius12, { backgroundColor: multicolors.yellow }]}>
                          <Text variant="labelSmall" style={[{ color: multicolors.white }]}>
                            WK
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                }}
                left={() => <Avatar.Image size={42} source={{ uri: s3Path + k.faceImageId + ".png" }} />}
              />
              <Divider />
            </View>
          );
        })}
        <List.Subheader style={[Styles.marginTop12]}>Bench</List.Subheader>
        {team2PlayingBench.map((k: SinglePlayer, i: number) => {
          return (
            <View key={i}>
              <List.Item title={k.name} description={k.role} left={() => <Avatar.Image size={36} source={{ uri: s3Path + k.faceImageId + ".png" }} />} />
              <Divider />
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const [routes] = useState([
    { key: "team1", title: team1Name },
    { key: "team2", title: team2Name },
  ]);

  const renderScene = SceneMap({
    team1: CreateTeam1,
    team2: CreateTeam2,
  });

  const renderTabBar = (props: any) => <TabBar {...props} tabStyle={{ width: deviceWidth / 2, paddingHorizontal: 18 }} scrollEnabled indicatorStyle={{ backgroundColor: colors.primary, height: 3 }} labelStyle={{ color: colors.text, textTransform: "capitalize" }} style={{ backgroundColor: colors.background }} />;

  return (
    <View style={[Styles.flex1]}>
      <TabView renderTabBar={renderTabBar} navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={{ width: deviceWidth }} />
    </View>
  );
};

export default Teams;
