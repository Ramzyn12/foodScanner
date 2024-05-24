import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create context
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // This should ideally hold the theme name.
  const [themePreference, setThemePreference] = useState("system"); // Additional state to hold the actual preference.

  const systemTheme = useColorScheme(); // Hooks into system theme changes

  useEffect(() => {
    const loadPreferences = async () => {
      const storedPreference = await AsyncStorage.getItem("darkModePreference");
      if (storedPreference) {
        setThemePreference(storedPreference); // Set the preference
        if (storedPreference === "system") {
          setTheme(systemTheme);
        } else {
          setTheme(storedPreference);
        }
      } else {
        setTheme("light");
        setThemePreference("system");
      }
    };
    loadPreferences();
  }, [systemTheme]);

  useEffect(() => {
    if (themePreference === "system") {
      setTheme(systemTheme); // Apply system theme whenever system theme changes
    }
  }, [systemTheme, themePreference]);

  const updateTheme = async (newPreference) => {
    setThemePreference(newPreference); // Update preference
    if (newPreference === "system") {
      setTheme(systemTheme);
    } else {
      setTheme(newPreference);
    }
    try {
      await AsyncStorage.setItem("darkModePreference", newPreference);
    } catch (error) {
      console.error("Failed to save the theme preference", error);
    }
  };

  const value = { theme, setTheme: updateTheme, themePreference };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Hook to use theme
export const useColourTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
