import {
  CameraHighlights,
  useBarcodeScanner,
} from "@mgcrea/vision-camera-barcode-scanner";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from "react-native-vision-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Worklets } from "react-native-worklets-core";
import { useIsFocused, useNavigationState } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import BottomSheet from "@gorhom/bottom-sheet";
import { useReducedMotion } from "react-native-reanimated";

//TO-DO
// Check if the code is the correct type or if it exists and show alert if not

export const Scan = ({ navigation }) => {
  // Use a simple default back camera
  const device = useCameraDevice("back");
  const reducedMotion = useReducedMotion();

  const [torch, setTorch] = useState(false);
  //Maybe add debounce to the scanning so doesnt scan too much!!!!
  const lastScannedBarcode = useRef(null); // Initialize a ref to store the last scanned barcode

  // Set the Format
  const format = useCameraFormat(device, [
    { videoResolution: { width: 1280, height: 720 } },
  ]);

  const { hasPermission, requestPermission } = useCameraPermission();

  // Camera active when screen focused or on modalScreen
  const isFocused = useIsFocused();
  const state = useNavigationState((state) => state);
  const currentRouteName = state.routes[state.index].name;
  const isActive = isFocused || currentRouteName === "ModalScreen";

  //Bottom sheet setup
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);

  useEffect(() => {
    if (!isFocused) {
      bottomSheetRef.current.close();
    } else {
      bottomSheetRef.current.collapse();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  // What to do when barcode detected
  const onBarcodeDetected = Worklets.createRunInJsFn((barcodes) => {
    // If already scanned dont fetch again...
    if (barcodes["0"].value === lastScannedBarcode.current) {
      console.log("already scanned!");
      return;
    }

    // Update the ref with the new scanned barcode
    lastScannedBarcode.current = barcodes["0"].value;
    Haptics.selectionAsync(); // Vibration

    // navigation.navigate("ModalScreen", { barcodeId: barcodes["0"].value });
  });

  // Barcode scanner hook from frame plugin
  const { props: cameraProps, highlights } = useBarcodeScanner({
    fps: 5,
    barcodeTypes: ["ean-13"],
    scanMode: "continuous",
    onBarcodeScanned: (barcodes) => {
      "worklet";
      if (barcodes.length > 0) {
        onBarcodeDetected(barcodes);
      }
    },
  });

  //if no device (or format?)
  if (!device || !format) {
    return <Text>No device available</Text>;
  }

  return (
    <View style={styles.container}>
      {!hasPermission && (
        //Probs shouldnt be button?
        <Button
          title="Grant Permission to use scanner settings > "
          color="#007aff"
          accessibilityLabel="Learn more about this purple button"
        />
      )}
      {hasPermission && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            {...cameraProps}
            torch={torch ? "on" : "off"}
            resizeMode="cover"
            isActive={isActive}
            // format={format}
          />
          <CameraHighlights highlights={highlights} color="peachpuff" />
          {/* <CameraOverlay/> */}
          <View style={styles.boxOverlay}></View>
          <View style={styles.leftButtonRow}>
            <Pressable
              style={styles.torchbutton}
              onPress={() => setTorch(!torch)}
              // disabledOpacity={0.4}
            >
              <MaterialIcons
                name={torch ? "flashlight-on" : "flashlight-off"}
                color="white"
                size={40}
              />
            </Pressable>
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            animateOnMount={!reducedMotion}
            snapPoints={snapPoints}
            // onChange={handleSheetChanges}
            onChange={(index) => {
              console.log("BottomSheet index:", index);
            }}
          >
            <View style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheet>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: "chalk",
    position: "relative",
    // height: 640, // 1920 / 5
    // width: 320', // 1080 / 5
    // height: 384, // 1920 / 5
    // width: 384, // 1080 / 5
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  modalButton: {
    position: "absolute",
  },
  boxOverlay: {
    width: "90%",
    height: "35%",
    marginTop: 40,
    borderColor: "black",
    borderWidth: 4, // or StyleSheet.hairlineWidth
    borderRadius: 16,
    position: "absolute",
    justifySelf: "start",
    alignSelf: "center",
    zIndex: 9999,
  },
  permissionContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 25,
  },
  permissionText: {
    fontSize: 17,
    paddingVertical: 12,
  },
  hyperlink: {
    color: "#007aff",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 0,
    width: 30,
    height: 30,
    borderRadius: 20 / 2,
    backgroundColor: "rgba(140, 140, 140, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#0056b3", // Darker color when the button is pressed
  },
  leftButtonRow: {
    position: "absolute",
    left: "10%",
    top: 50,
  },
  rightButtonRow: {
    position: "absolute",
    right: "10%",
    top: 50,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
