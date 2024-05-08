const plugins = require("expo/config-plugins");
const {
  mergeContents,
} = require("@expo/config-plugins/build/utils/generateCode");
const path = require("path");
const fs = require("fs");

module.exports = function withReanimatedUseFrameworks(config) {
  return plugins.withDangerousMod(config, [
    "ios",
    async (config) => {
      console.log("Entering the plugin function");
      console.log(
        `Platform project root: ${config.modRequest.platformProjectRoot}`
      );
      const filePath = path.join(
        config.modRequest.platformProjectRoot,
        "Podfile"
      );
      console.log(`Modifying Podfile at: ${filePath}`);
      const contents = fs.readFileSync(filePath, "utf-8");

      const preInstall = mergeContents({
        tag: "reanimated_rnfirebase",
        src: contents,
        newSrc: [
          `pre_install do |installer|`,
          `installer.pod_targets.each do |pod|`,
          `if pod.name.eql?('RNScreens')`,
          `def pod.build_type`,
          `Pod::BuildType.static_library`,
          `end`,
          `end`,
          `end`,
          `end`,
        ].join("\n"),
        offset: 0,
        anchor: /\s*use_native_modules!\s*/i,
        comment: "#",
      });

      if (!preInstall.didMerge) {
        // eslint-disable-next-line no-console
        console.error(
          // eslint-disable-next-line no-useless-concat
          "ERROR: Cannot add `withReanimatedUseFrameworks` to the project's " +
            "ios/Podfile because it's malformed."
        );

        return config;
      }

      fs.writeFileSync(filePath, preInstall.contents);

      return config;
    },
  ]);
};
