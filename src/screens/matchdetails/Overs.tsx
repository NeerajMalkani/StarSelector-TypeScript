import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const Overs = ({ matchID }: any) => {
  return (
    <View>
      <Text variant="bodyLarge">Overs</Text>
    </View>
  );
};

export default React.memo(Overs);
