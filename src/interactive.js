// import inquirer from "inquirer";
import os from "os";
import path from "path";

const homeDir = os.homedir();
const appDir = path.join(homeDir, ".config", "cinnabar-forge", "jordan");

export function viewer() {
  console.log("Jordan directory: " + appDir);
  console.log(
    "WARNING: There will be interactive shell only. To use Jordan in cli command mode enter 'jordan-cli'"
  );
}
