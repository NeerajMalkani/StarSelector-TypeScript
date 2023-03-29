import { View, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { PlayerDetailsProps } from "../models/Props";
import { useMemo, useCallback } from "react";
import { Styles } from "../styles/styles";
import { s3Path } from "../utils/Constants";
import { Avatar } from "react-native-paper";

const PlayerDetails = ({ bottomSheetRef, setIndex, playerData, isLoading, colors }: PlayerDetailsProps) => {
  console.log(playerData);
  const snapPoints = useMemo(() => ["1", "90%"], []);

  const RenderBackdrop = useCallback((props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />, []);

  const OnSheetIndexChanged = useCallback((index: number) => {
    setIndex[1](index);
  }, []);

  return (
    <BottomSheet ref={bottomSheetRef} index={setIndex[0]} snapPoints={snapPoints} onChange={OnSheetIndexChanged} backdropComponent={RenderBackdrop}>
      {isLoading ? (
        <View style={[Styles.flex1, Styles.flexAlignCenter, Styles.flexJustifyCenter]}>
          <ActivityIndicator animating={true} color={colors.primary} size={32} />
        </View>
      ) : (
        <View style={[Styles.flex1, Styles.padding16]}>
          {playerData && (
            <View style={[Styles.flexColumn]}>
              <View>
                <Avatar.Image source={{ uri: s3Path.replace("{faceid}", playerData.faceImageId) }} size={72} />
              </View>
            </View>
          )}
        </View>
      )}
    </BottomSheet>
  );
};

export default PlayerDetails;
