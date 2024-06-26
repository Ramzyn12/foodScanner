import {
  CameraHighlights,
  useBarcodeScanner,
} from "@mgcrea/vision-camera-barcode-scanner";
import React, { useEffect, useRef, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from "react-native-vision-camera";
import { Worklets } from "react-native-worklets-core";
import { useIsFocused, useNavigationState } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { useReducedMotion, useSharedValue } from "react-native-reanimated";
import ScanSearchBottomSheet from "../components/searchScan/ScanSearchBottomSheet";
import ScannerOverlay from "../components/searchScan/ScannerOverlay";
import { themedColours } from "../constants/themedColours";
import { useColourTheme } from "../context/Themed";
import ArrowLeft from "../svgs/ArrowLeft";

export const Scan = ({ navigation }) => {
  const device = useCameraDevice("back");
  const [sheetIndex, setSheetIndex] = useState(0);
  const lastScanTimestamp = useRef(0);
  const debounceDelay = 2000; // 2 second
  const sheetIndexShared = useSharedValue(0);
  const currentRouteNameShared = useSharedValue("");
  const isFocused = useIsFocused();
  const state = useNavigationState((state) => state);
  const currentRouteName = state.routes[state.index].name;
  const isActive = isFocused || currentRouteName === "FoodDetails";
  const [permissionStatus, setPermissionStatus] = useState("");
  const { theme } = useColourTheme();

  const format = useCameraFormat(device, [
    { videoResolution: { width: 1280, height: 720 } },
  ]);

  useEffect(() => {
    sheetIndexShared.value = sheetIndex;
  }, [sheetIndex]);

  useEffect(() => {
    currentRouteNameShared.value = currentRouteName;
  }, [currentRouteName]);

  const getPermissionStatus = async () => {
    const permission = Camera.getCameraPermissionStatus();
    setPermissionStatus(permission);
    if (permission === "not-determined") {
      const newCameraPermission = await Camera.requestCameraPermission();
      setPermissionStatus(newCameraPermission);
    } else {
      setPermissionStatus(permission);
    }
  };

  useEffect(() => {
    getPermissionStatus();
  }, []);

  const onBarcodeDetected = Worklets.createRunInJsFn((barcodes) => {
    if (
      sheetIndexShared.value === 2 ||
      currentRouteNameShared.value === "FoodDetails"
    ) {
      return;
    }

    const now = Date.now();
    const timeSinceLastScan = now - lastScanTimestamp.current;
    if (timeSinceLastScan < debounceDelay) return;

    lastScanTimestamp.current = now; // Update timestamp of last scan

    Haptics.selectionAsync();
    navigation.navigate("FoodDetails", { barcodeId: barcodes["0"].value });
  });

  // Barcode scanner hook from frame plugin
  const { props: cameraProps, highlights } = useBarcodeScanner({
    fps: 5,
    barcodeTypes: ["ean-13", "ean-8"],
    scanMode: "continuous",
    onBarcodeScanned: (barcodes) => {
      "worklet";
      if (barcodes.length > 0) {
        onBarcodeDetected(barcodes);
      }
    },
  });

  if (!device || !format) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No device available</Text>;
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      {(permissionStatus === "denied" || permissionStatus === "restricted") && (
        //REMEBER TO MAKE THIS BETTER
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 50,
          }}
        >
          <Text
            style={{ textAlign: "center", fontFamily: "Mulish_600SemiBold" }}
          >
            Camera access is required to use the barcode scanner. Please enable
            camera permissions in your device settings.
          </Text>
          <Pressable
            onPress={() => Linking.openSettings()}
            style={{
              height: 44,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              marginTop: 20,
              width: "100%",
              backgroundColor: themedColours.primary[theme],
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Mulish_700Bold",
                color: "white",
              }}
            >
              Go to settings
            </Text>
          </Pressable>
        </View>
      )}
      {permissionStatus === "not-determined" && (
        //REMEBER TO MAKE THIS BETTER
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: 'black',
          }}
        >
        </View>
      )}
      {permissionStatus === "granted" && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            {...cameraProps}
            // torch={torch ? "on" : "off"}
            resizeMode="cover"
            isActive={isActive}
            // format={format}
          />
          <CameraHighlights highlights={highlights} color="peachpuff" />
          <ScannerOverlay />
          {/* Do we need setSheetIndex? */}
          <ScanSearchBottomSheet setSheetIndex={setSheetIndex} />
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
