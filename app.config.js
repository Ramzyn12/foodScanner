const { withPlugins } = require("expo/config-plugins");
const withReanimatedUseFrameworks = require("./withReanimatedUseFrameworks");

module.exports = ({ config }) => {
  // console.log(config);
  return withPlugins(
    {
      ...config,
      // expo: {
      name: "ivyDev",
      slug: "ivy-dev",
      version: "1.0.1",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "automatic",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#F7F6EF",
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.ramzyn12.Ivy.dev",
        googleServicesFile: "./GoogleService-Info.plist",
        buildNumber: "1",
        usesAppleSignIn: true,
        userInterfaceStyle: "automatic",
        infoPlist: {
          NSCameraUsageDescription: "Ivy needs access to your Camera.",
          NSMicrophoneUsageDescription: "Ivy needs access to your Microphone.",
        },
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
        userInterfaceStyle: "automatic",
        permissions: [
          "android.permission.CAMERA",
          "android.permission.RECORD_AUDIO",
        ],
        package: "com.ramzyn12.someapppp",
      },
      web: {
        favicon: "./assets/favicon.png",
      },
      extra: {
        eas: {
          projectId: "b34df258-d968-4b65-938a-9171d0737801",
        },
      },
      plugins: [
        [
          "react-native-vision-camera",
          {
            cameraPermissionText: "Ivy needs access to your Camera.",
            enableCodeScanner: true,
          },
        ],
        ["expo-apple-authentication"],
        "expo-font",
        "@react-native-firebase/app",
        "@react-native-firebase/auth",
        [
          "expo-build-properties",
          {
            ios: {
              useFrameworks: "static",
            },
          },
        ],
      ],
      runtimeVersion: {
        policy: "appVersion",
      },
      updates: {
        url: "https://u.expo.dev/b34df258-d968-4b65-938a-9171d0737801",
      },
    },
    // },
    [withReanimatedUseFrameworks]
  );
};
