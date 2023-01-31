import { createNavigationContainerRef } from "@react-navigation/native";
import { BottomNavigation, withTheme } from "react-native-paper";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./dashboard/Home";
import Search from "./dashboard/Search";
import Bets from "./dashboard/Bets";
import News from "./dashboard/News";
import Profile from "./dashboard/Profile";
import { BasicProps } from "../models/Props";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";

export const Icon = createIconSetFromIcoMoon(require("../selection.json"), "IcoMoon", "icomoon.ttf");
export const navigationRef = createNavigationContainerRef();
const DashboardScreen = ({ navigation, theme }: BasicProps) => {
  const { colors }: any = theme;
  const [index, setIndex] = useState(0);
  const [fontsLoaded] = useFonts({
    IcoMoon: require("../../assets/resources/fonts/icomoon.ttf"),
  });
  const [routes] = useState([
    { key: "home", title: "Home", focusedIcon: (props: any) => <Ionicons {...props} name="home" size={28} /> },
    { key: "search", title: "Search", focusedIcon: (props: any) => <Ionicons {...props} name="search" size={28} /> },
    { key: "bets", title: "Bets", focusedIcon: (props: any) => <Icon {...props} name="trophy" size={28} /> },
    { key: "news", title: "News", focusedIcon: (props: any) => <Ionicons {...props} name="newspaper" size={28} /> },
    { key: "profile", title: "Profile", focusedIcon: (props: any) => <Ionicons {...props} name="person" size={28} /> },
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "home":
        return <Home theme={theme} route={null} navigation={navigation} />;
      case "search":
        return <Search theme={theme} route={null} navigation={null} />;
      case "bets":
        return <Bets />;
      case "news":
        return <News />;
      case "profile":
        return <Profile />;
    }
  };
  if (!fontsLoaded) {
    return null;
  } else {
    return <BottomNavigation shifting compact navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} activeColor={colors.primary} inactiveColor={colors.textSecondary} theme={{ colors: { secondaryContainer: "transparent" } }} barStyle={{ backgroundColor: colors.backgroundSecondary, borderTopColor: colors.textTertiary, borderTopWidth: 1 }} />;
  }
};

export default withTheme(DashboardScreen);
