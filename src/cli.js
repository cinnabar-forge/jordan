/* eslint-disable security/detect-non-literal-fs-filename */
import asTable from "as-table";
import { program } from "commander";
import fs from "fs";
import os from "os";
import path from "path";

import cinnabarData from "./cinnabar.js";
import { JordanCase } from "./commands.js";

function loadAppFolder() {
  const homeDir = os.homedir();
  const appDir = path.join(homeDir, ".config", "cinnabar-forge", "jordan");

  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
  }
  return appDir;
}

function loadDefaultFolder() {
  const appDir = loadAppFolder();
  const configPath = path.join(appDir, "config.json");
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({}), "utf8");
    console.log(`${configPath} has been created`);
  }

  const configFile = fs.readFileSync(configPath);
  const configData = JSON.parse(configFile);

  return fs.existsSync(configData.mainFolder)
    ? configData.mainFolder
    : process.cwd();
}

function saveDefaultFolder(newPath) {
  // if (!) {
  //   return false;
  // }
  const appDir = loadAppFolder();
  const configPath = path.join(appDir, "config.json");

  fs.writeFileSync(
    configPath,
    JSON.stringify({
      mainFolder: fs.existsSync(newPath) ? newPath : undefined,
    }),
    "utf8",
  );

  return true;
}

program
  .version(`v${cinnabarData.version.text}`, "-v, --version")
  .description("Backup and restore your configs (and, practically, anything)")
  .option(
    "-f, --folder <folder>",
    "Set the working folder",
    loadDefaultFolder(),
  );

let jordanCaseInstance;

function getJordanCase() {
  const options = program.opts();
  const workingFolder = options.folder;
  if (
    !workingFolder ||
    workingFolder == null ||
    !fs.existsSync(workingFolder)
  ) {
    throw new Error("Should specify --folder <folder>");
  }
  if (jordanCaseInstance == null) {
    jordanCaseInstance = new JordanCase(workingFolder);
  }
  if (!jordanCaseInstance.isFolderJordan()) {
    console.error("Init Jordan Backup folder with 'init' command first");
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
  return jordanCaseInstance;
}

program
  .command("folder [path]")
  .description(
    "Set default backup folder (will be used instead of current working directory)",
  )
  .action((path) => {
    saveDefaultFolder(path);
  });

program
  .command("init")
  .description("Init Jordan Backup files")
  .action(() => {
    getJordanCase().initializeConfigFiles();
  });

program
  .command("add <configName> [path]")
  .alias("set")
  .description("Add or set the configuration path")
  .action((configName, path) => {
    getJordanCase().addConfig(configName, path);
  });

program
  .command("remove <configName>")
  .description("Remove the configuration")
  .action((configName) => {
    getJordanCase().removeConfig(configName);
  });

program
  .command("list")
  .alias("ls")
  .description("Display registered configs")
  .action(() => {
    const jordanCase = getJordanCase();
    const list = [];
    const map = jordanCase.getMap();
    jordanCase.getList().map((item) => {
      list.push({
        NAME: item.name,
        TYPE: item.file ? "file" : "directory",
        // eslint-disable-next-line perfectionist/sort-objects
        PATH: map[item.name] ?? (item.file ? `[${item.file}]` : ""),
        // eslint-disable-next-line perfectionist/sort-objects
        PATH_STATUS: map[item.name]
          ? // eslint-disable-next-line security/detect-non-literal-fs-filename
            fs.existsSync(map[item.name])
            ? "Active"
            : "Doesn't exist"
          : "Active (The Cache)",
        // eslint-disable-next-line perfectionist/sort-objects
        // DESCRIPTION: item.description,
      });
    });

    console.log(`Configurations (${list.length}):`);
    console.log(asTable.configure({ delimiter: " | " })(list));
  });

program
  .command("backup <configName>")
  .description("Backup the configurations")
  .action((configName) => {
    const jordanCase = getJordanCase();
    const configs = jordanCase
      .getList()
      .filter((item) => item.name === configName)
      .map((item) => ({
        ...item,
        path: jordanCase.getMap()[item.name],
      }));
    jordanCase.operate(configs, [configName], "backup");
  });

program
  .command("backup-all")
  .description("Backup all configurations")
  .action(() => {
    const jordanCase = getJordanCase();
    const list = jordanCase.getList();
    const map = jordanCase.getMap();
    const configs = list.map((item) => ({
      ...item,
      path: map[item.name],
    }));
    jordanCase.operate(
      configs,
      list.map((item) => item.name),
      "backup",
    );
  });

program
  .command("update <configName>")
  .alias("refresh")
  .description("Update the configuration")
  .action((configName) => {
    console.log(`Updating configuration: ${configName}`);
  });

program
  .command("update-all")
  .alias("refresh-all")
  .description("Update all configurations")
  .action(() => {
    console.log(`Updating all configurations`);
  });

program
  .command("restore <configName>")
  .description("Restore the configuration")
  .action((configName) => {
    const jordanCase = getJordanCase();
    const configs = jordanCase
      .getList()
      .filter((item) => item.name === configName)
      .map((item) => ({
        ...item,
        path: jordanCase.getMap()[item.name],
      }));
    jordanCase.operate(configs, [configName], "restore");
  });

program
  .command("restore-all")
  .description("Restore all configurations")
  .action(() => {
    const jordanCase = getJordanCase();
    const list = jordanCase.getList();
    const map = jordanCase.getMap();
    const configs = list.map((item) => ({
      ...item,
      path: map[item.name],
    }));
    jordanCase.operate(
      configs,
      list.map((item) => item.name),
      "restore",
    );
  });

program.parse(process.argv);
