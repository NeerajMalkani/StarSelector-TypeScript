import { MD3DarkTheme as DarkTheme } from "react-native-paper";
import { MD3LightTheme as LightTheme } from "react-native-paper";

export const darkTheme = {
  ...DarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    primary: "#3f51b5",
    primaryDark: "#1a237e",
    background: "#252525",
    backgroundSecondary: "#292929",
    backgroundTertiary: "#363636",
    seperator: "rgba(255,255,255,0.12)",
    text: "rgba(255,255,255,0.87)",
    textSecondary: "rgba(255,255,255,0.54)",
    textTertiary: "rgba(255,255,255,0.32)",
    inverseText: "rgba(0,0,0,0.87)",
    inverseTextSecondary: "rgba(0,0,0,0.54)",
    inverseTextTertiary: "rgba(0,0,0,0.32)",
  },
  multicolors: {
    red: "#C41E3A",
    green: "#1FA100",
    yellow: "#db8b2f",
    blue: "#4cb5ff",
    golden: "#ffea00",
    white: "#ffffff",
    black: "#000000",
  },
};

export const lightTheme = {
  ...LightTheme,
  roundness: 2,
  colors: {
    ...LightTheme.colors,
    primary: "#3f51b5",//"#e53935",//"#673ab7",
    primaryDark: "#1a237e",//"#b71c1c"//"#311b92",
    background: "#ffffff",
    backgroundSecondary: "#ffffff",
    backgroundTertiary: "#ffffff",
    seperator: "rgba(0,0,0,0.12)",
    text: "rgba(0,0,0,0.87)",
    textSecondary: "rgba(0,0,0,0.54)",
    textTertiary: "rgba(0,0,0,0.32)",
    inverseText: "rgba(255,255,255,0.87)",
    inverseTextSecondary: "rgba(255,255,255,0.54)",
    inverseTextTertiary: "rgba(255,255,255,0.32)",
  },
  multicolors: {
    red: "#C41E3A",
    green: "#1FA100",
    yellow: "#db8b2f",
    blue: "#4cb5ff",
    golden: "#ffff00",
    white: "#ffffff",
    black: "#000000",
  },
};
