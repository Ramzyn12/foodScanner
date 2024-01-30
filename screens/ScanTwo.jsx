import React, { useEffect, useState, useRef, useMemo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  signOut
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet"

function ScanTwo() {

  //If need
  const token = useSelector(state => state.auth.token)

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('Signed out!');
    }).catch((error) => {
      console.log(error);
    })
  }

  
  return (
    <View style={styles.container}>
      <Button onPress={handleLogout} title="logout" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ScanTwo;
