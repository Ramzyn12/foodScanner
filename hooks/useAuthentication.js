import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authSlice';

export const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        dispatch(setToken(token));
        await AsyncStorage.setItem('firebaseToken', token);
        setIsLoggedIn(true);
      } else {
        await AsyncStorage.removeItem('firebaseToken');
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return { isLoggedIn, isLoading };
};
