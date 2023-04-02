import { View, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { PlayerDetailsProps } from "../models/Props";
import { useMemo, useCallback, useState } from "react";
import { Styles } from "../styles/styles";
import { s3Path } from "../utils/Constants";
import { Avatar, Button, Text } from "react-native-paper";
import { GetPlayerBattingID, GetPlayerBowlingID } from "../api/APICalls";
import { PlayerBatting, Value } from "../models/PayerBatting";
import { PlayerBowling } from "../models/PlayerBowling";

const PlayerDetails = ({ bottomSheetRef, setIndex, playerData, isLoading, colors }: PlayerDetailsProps) => {
  const snapPoints = useMemo(() => ["94%"], []);
  const [currTabSelected, setCurrentTabSelected] = useState<number>(1);
  const [isInnerLoading, setIsInnerLoading] = useState<boolean>(false);
  const [playerBatting, setPlayerBatting] = useState<PlayerBatting | null>(null);
  const [playerBowling, setPlayerBowling] = useState<PlayerBowling | null>(null);
  const RenderBackdrop = useCallback((props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />, []);

  const OnSheetIndexChanged = useCallback((index: number) => {
    setIndex[1](index);
  }, []);

  const PlayerBattingSuccess = (response: any) => {
    if (response && response.data) {
      setPlayerBatting(response.data);
      setIsInnerLoading(false);
    }
  };

  const PlayerBattingFail = (errorMessage: any) => {
    console.log(errorMessage);
    setIsInnerLoading(false);
  };

  const PlayerBowlingSuccess = (response: any) => {
    if (response && response.data) {
      setPlayerBowling(response.data);
      setIsInnerLoading(false);
    }
  };

  const PlayerBowlingFail = (errorMessage: any) => {
    console.log(errorMessage);
    setIsInnerLoading(false);
  };

  const GetPlayerBatting = (playerID: number) => {
    setIsInnerLoading(true);
    GetPlayerBattingID({ playerID: playerID }, PlayerBattingSuccess, PlayerBattingFail);
  };

  const GetPlayerBowling = (playerID: number) => {
    setIsInnerLoading(true);
    GetPlayerBowlingID({ playerID: playerID }, PlayerBowlingSuccess, PlayerBowlingFail);
  };

  const OnSheetClosed = () => {
    setCurrentTabSelected(1);
  };

  const Render5ColumnRow = ({ values, isHeader, showBorder, index }: any) => {
    return (
      <View style={[Styles.flexRow, Styles.padding12, showBorder && Styles.borderBottom1, showBorder && { borderBottomColor: colors.seperator }]}>
        {values.map((k: string, i: number) => {
          return (
            <Text key={index.toString() + i.toString()} variant={i === 0 ? "titleSmall" : "bodyMedium"} style={[i === 0 ? Styles.flex1_5 : Styles.flex1, { color: isHeader ? colors.textSecondary : colors.text }]}>
              {k === "ROWHEADER" ? "" : k}
            </Text>
          );
        })}
      </View>
    );
  };

  const RenderTableRow = ({ title, value, showBorder }: any) => {
    return (
      <View style={[Styles.flexRow, Styles.padding12, showBorder && Styles.borderBottom1, showBorder && { borderBottomColor: colors.seperator }]}>
        <Text variant="bodyMedium" style={[Styles.flex1]}>
          {title}
        </Text>
        <Text variant="titleSmall" style={[Styles.flex2]}>
          {value}
        </Text>
      </View>
    );
  };

  return (
    <BottomSheet ref={bottomSheetRef} index={setIndex[0]} enablePanDownToClose onClose={OnSheetClosed} snapPoints={snapPoints} onChange={OnSheetIndexChanged} backdropComponent={RenderBackdrop}>
      {isLoading ? (
        <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
          <ActivityIndicator animating={true} color={colors.primary} size={32} />
        </View>
      ) : (
        <View style={[Styles.flex1, Styles.paddingHorizontal16]}>
          {playerData && (
            <View style={[Styles.flex1, Styles.flexColumn]}>
              <View style={[Styles.flexRow]}>
                <Avatar.Image source={{ uri: s3Path.replace("{faceid}", playerData.faceImageId) }} size={72} />
                <View style={[Styles.flexColumn, Styles.marginStart12]}>
                  <Text variant="titleLarge">{playerData.name}</Text>
                  <Text variant="bodyLarge" style={[{ color: colors.textSecondary }]}>
                    {playerData.intlTeam}
                  </Text>
                </View>
              </View>
              <View style={[Styles.flexRow, Styles.marginTop12, { justifyContent: "space-between" }]}>
                <Button mode="text" labelStyle={{ fontSize: 16 }} textColor={currTabSelected === 1 ? colors.primary : colors.text} onPress={() => setCurrentTabSelected(1)}>
                  Info
                </Button>
                <Button mode="text" labelStyle={{ fontSize: 16 }} textColor={currTabSelected === 2 ? colors.primary : colors.text} onPress={() => setCurrentTabSelected(2)}>
                  Bio
                </Button>
                <Button
                  mode="text"
                  labelStyle={{ fontSize: 16 }}
                  textColor={currTabSelected === 3 ? colors.primary : colors.text}
                  onPress={() => {
                    GetPlayerBatting(parseFloat(playerData.id));
                    setCurrentTabSelected(3);
                  }}
                >
                  Batting
                </Button>
                <Button
                  mode="text"
                  labelStyle={{ fontSize: 16 }}
                  textColor={currTabSelected === 4 ? colors.primary : colors.text}
                  onPress={() => {
                    GetPlayerBowling(parseFloat(playerData.id));
                    setCurrentTabSelected(4);
                  }}
                >
                  Bowling
                </Button>
              </View>
              <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                {currTabSelected === 1 && (
                  <View style={[Styles.flex1, Styles.flexColumn, Styles.marginTop12, Styles.border1, { borderColor: colors.seperator }]}>
                    <RenderTableRow title="Born" value={playerData.DoB} showBorder={true} />
                    <RenderTableRow title="Birth Place" value={playerData.birthPlace} showBorder={true} />
                    <RenderTableRow title="Role" value={playerData.role} showBorder={true} />
                    <RenderTableRow title="Batting Style" value={playerData.bat ? playerData.bat : "--"} showBorder={true} />
                    <RenderTableRow title="Bowling Style" value={playerData.bowl ? playerData.bowl : "--"} showBorder={true} />
                    <RenderTableRow title="Teams" value={playerData.teams} showBorder={false} />
                  </View>
                )}
                {currTabSelected === 2 && (
                  <Text variant="bodyMedium" ellipsizeMode="tail" style={[Styles.marginTop12]}>
                    {playerData.bio
                      ? playerData.bio
                          .replace(/<brs*[/]?>/gi, "\n")
                          .replace(/<is*[/]?>/gi, "")
                          .replace(/<s*[/]?i>/gi, "")
                          .replace(/<bs*[/]?>/gi, "")
                          .replace(/<s*[/]?b>/gi, "")
                          .replace(/<BLOCKQUOTEs*[/]?>/gi, "")
                          .replace(/<s*[/]?BLOCKQUOTE>/gi, "")
                      : "No Bio"}
                  </Text>
                )}
                {currTabSelected === 3 &&
                  (isInnerLoading ? (
                    <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter, Styles.paddingTop32]}>
                      <ActivityIndicator animating={true} color={colors.primary} size={32} />
                    </View>
                  ) : (
                    <View style={[Styles.flex1, Styles.flexColumn, Styles.marginTop12, Styles.border1, { borderColor: colors.seperator }]}>
                      <Render5ColumnRow values={playerBatting?.headers} isHeader={true} showBorder={true} index={500} />
                      {playerBatting?.values.map((k: Value, i: number) => {
                        return <Render5ColumnRow values={k.values} isHeader={false} showBorder={true} index={i} />;
                      })}
                    </View>
                  ))}
                {currTabSelected === 4 &&
                  (isInnerLoading ? (
                    <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter, Styles.paddingTop32]}>
                      <ActivityIndicator animating={true} color={colors.primary} size={32} />
                    </View>
                  ) : (
                    <View style={[Styles.flex1, Styles.flexColumn, Styles.marginTop12, Styles.border1, { borderColor: colors.seperator }]}>
                      <Render5ColumnRow values={playerBowling?.headers} isHeader={true} showBorder={true} index={500} />
                      {playerBowling?.values.map((k: Value, i: number) => {
                        return <Render5ColumnRow values={k.values} isHeader={false} showBorder={true} index={i} />;
                      })}
                    </View>
                  ))}
              </BottomSheetScrollView>
            </View>
          )}
        </View>
      )}
    </BottomSheet>
  );
};

export default PlayerDetails;
