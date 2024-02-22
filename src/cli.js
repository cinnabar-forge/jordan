import asTable from "as-table";
import { program } from "commander";
import fs from "fs";
import path from "path";

import { JordanCase } from "./commands.js";

const scriptDirectory = path.dirname(new URL(import.meta.url).pathname);
const version = JSON.parse(
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.readFileSync(path.resolve(scriptDirectory, "..", "version.json"), "utf8")
);

program
  .version(
    `v${version.major}.${version.minor}.${version.patch}`,
    "-v, --version"
  )
  .description("Backup and restore your configs (and, practically, anything)")
  .requiredOption("-f, --folder <folder>", "Set the working folder")
  .parse(process.argv);

const options = program.opts();
const jordanCase = new JordanCase(options.folder);
jordanCase.initializeConfigFiles();

program
  .command("add <configName> <location>")
  .description("Add or update the configuration")
  .action((configName, location) => {
    jordanCase.addConfig(configName, location);
  });

program
  .command("remove <configName>")
  .description("Remove the configuration")
  .action((configName) => {
    jordanCase.removeConfig(configName);
  });

program
  .command("list")
  .alias("ls")
  .description("Display registered configs")
  .action(() => {
    const list = [];
    const map = jordanCase.getMap();
    jordanCase.getList().map((item) => {
      list.push({
        NAME: item.name,
        TYPE: item.file ? "file" : "directory",
        // eslint-disable-next-line perfectionist/sort-objects
        PATH: map[item.name],
      });
    });

    console.log(`Configurations (${list.length}):`);
    console.log(asTable.configure({ delimiter: " | " })(list));
  });

program
  .command("backup-all")
  .description("Backup all configurations")
  .action(() => {
    const list = jordanCase.getList();
    const map = jordanCase.getMap();
    const configs = list.map((item) => ({
      ...item,
      path: map[item.name],
    }));
    jordanCase.operate(
      configs,
      list.map((item) => item.name),
      "backup"
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
    const list = jordanCase.getList();
    const map = jordanCase.getMap();
    const configs = list.map((item) => ({
      ...item,
      path: map[item.name],
    }));
    jordanCase.operate(
      configs,
      list.map((item) => item.name),
      "restore"
    );
  });

program
  .command("verify")
  .alias("check")
  .description("Check configurations")
  .action(async () => {
    await jordanCase.verify();
  });

program.parse(process.argv);
