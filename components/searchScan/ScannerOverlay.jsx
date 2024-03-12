import { View, Text } from "react-native";
import React from "react";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

const ScannerOverlay = () => {
  return (
    <View
      style={{ width: "80%", height: "40%", position: "absolute", top: "20%" }}
    >
      <Svg
        width="66"
        height="66"
        viewBox="0 0 66 66"
        fill="none"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <G clip-path="url(#clip0_245_4228)">
          <Path
            d="M1.99805 66C0.929285 66 0.0644531 65.1352 0.0644531 64.0664V32.8711C0.0644531 14.7456 14.81 0 32.9355 0H64.002C65.0707 0 65.9355 0.864832 65.9355 1.93359C65.9355 3.00236 65.0707 3.86719 64.002 3.86719H32.9355C16.9419 3.86719 3.93164 16.8774 3.93164 32.8711V64.0664C3.93164 65.1352 3.06681 66 1.99805 66Z"
            fill="white"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_245_4228">
            <Rect width="66" height="66" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
      <Svg
        width="66"
        height="66"
        viewBox="0 0 66 66"
        fill="none"
        style={{ position: "absolute", bottom: 0, left: 0 }}
      >
        <G clip-path="url(#clip0_245_4255)">
          <Path
            d="M1.99805 0C0.929285 0 0.0644531 0.86483 0.0644531 1.93359V33.1289C0.0644531 51.2544 14.81 66 32.9355 66H64.002C65.0707 66 65.9355 65.1352 65.9355 64.0664C65.9355 62.9976 65.0707 62.1328 64.002 62.1328H32.9355C16.9419 62.1328 3.93164 49.1226 3.93164 33.1289V1.93359C3.93164 0.86483 3.06681 0 1.99805 0Z"
            fill="white"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_245_4255">
            <Rect
              width="66"
              height="66"
              fill="white"
              transform="matrix(1 0 0 -1 0 66)"
            />
          </ClipPath>
        </Defs>
      </Svg>
      <Svg
        style={{ position: "absolute", top: 0, right: 0 }}
        width="66"
        height="66"
        viewBox="0 0 66 66"
        fill="none"
      >
        <G clip-path="url(#clip0_245_4252)">
          <Path
            d="M-8.45201e-08 1.99804C-3.7803e-08 0.929282 0.86483 0.0644503 1.93359 0.0644503L33.1289 0.0644517C51.2544 0.0644525 66 14.81 66 32.9355L66 64.002C66 65.0707 65.1352 65.9355 64.0664 65.9355C62.9976 65.9355 62.1328 65.0707 62.1328 64.002L62.1328 32.9355C62.1328 16.9419 49.1226 3.93164 33.1289 3.93164L1.93359 3.93164C0.86483 3.93164 -1.31237e-07 3.06681 -8.45201e-08 1.99804Z"
            fill="white"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_245_4252">
            <Rect
              width="66"
              height="66"
              fill="white"
              transform="translate(66) rotate(90)"
            />
          </ClipPath>
        </Defs>
      </Svg>
      <Svg
        style={{ position: "absolute", bottom: 0, right: 0 }}
        width="66"
        height="66"
        viewBox="0 0 66 66"
        fill="none"
      >
        <G clip-path="url(#clip0_245_4258)">
          <Path
            d="M-8.45201e-08 64.002C-3.7803e-08 65.0707 0.86483 65.9355 1.93359 65.9355L33.1289 65.9355C51.2544 65.9355 66 51.19 66 33.0645L66 1.99805C66 0.929283 65.1352 0.0644532 64.0664 0.0644532C62.9976 0.0644533 62.1328 0.929283 62.1328 1.99805L62.1328 33.0645C62.1328 49.0581 49.1226 62.0684 33.1289 62.0684L1.93359 62.0684C0.86483 62.0684 -1.31237e-07 62.9332 -8.45201e-08 64.002Z"
            fill="white"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_245_4258">
            <Rect
              width="66"
              height="66"
              fill="white"
              transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 66 66)"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

export default ScannerOverlay;
