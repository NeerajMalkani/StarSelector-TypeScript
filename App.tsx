import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Styles } from "./src/styles/styles";
import { darkTheme, lightTheme } from "./src/theme/apptheme";
import DashboardScreen, { navigationRef } from "./src/screens/DashboardScreen";
import MatchDetailsScreen from "./src/screens/MatchDetailsScreen";

const Stack = createStackNavigator();
export default function App() {
  const [themeMode, setThemeMode] = useState(true);
  return (
    <SafeAreaView style={[Styles.flex1]}>
      <PaperProvider theme={themeMode ? lightTheme : darkTheme}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} initialParams={{ themeMode: themeMode }} />
            <Stack.Screen
              name="MatchDetails"
              component={MatchDetailsScreen}
              options={{
                headerStyle: { backgroundColor: themeMode ? lightTheme.colors.primary : darkTheme.colors.primary, borderBottomColor: "transparent" },
                headerShadowVisible: false,
                headerTitleStyle: {
                  color: themeMode ? lightTheme.multicolors.white : darkTheme.multicolors.white,
                },
                headerTintColor: themeMode ? lightTheme.multicolors.white : darkTheme.multicolors.white,
              }}
              initialParams={{ themeMode: themeMode }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
}
