const { withDangerousMod } = require("expo/config-plugins");

module.exports = function withSimpleTestPlugin(config) {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const fs = require("fs");
      const path = require("path");
      
      // Path to the iOS Podfile
      const filePath = path.join(config.modRequest.platformProjectRoot, "Podfile");
      
      // Read the current contents of the Podfile
      let contents = fs.readFileSync(filePath, "utf-8");
      
      // Adding a custom line to the Podfile
      if (!contents.includes("# Added by SimpleTestPlugin")) {
        contents += "\n# Added by SimpleTestPlugin\n";
        fs.writeFileSync(filePath, contents);
        console.log("SimpleTestPlugin has modified the Podfile.");
      } else {
        console.log("Modification already exists.");
      }

      return config;
    },
  ]);
};
