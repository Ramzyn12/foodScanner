import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const [theme, setTheme] = useState('light'); // default to light
  const systemTheme = useColorScheme(); // this hooks into system theme changes

  const getDarkModePreference = async () => {
    try {
      const preference = await AsyncStorage.getItem('darkModePreference');
      if (preference !== null) {
        return preference;
      }
    } catch (error) {
      // console.error('Failed to fetch the data from storage', error);
    }
    return null; // default to null if there's no stored preference
  };

  useEffect(() => {
    const loadPreferences = async () => {
      const storedPreference = await getDarkModePreference();
      if (storedPreference === 'system') {
        setTheme(systemTheme);
      } else if (storedPreference) {
        setTheme(storedPreference);
      } else {
        setTheme('light'); // default theme if nothing is stored
      }
    };

    loadPreferences();
  }, [systemTheme]);

  return {theme, setTheme};
};
