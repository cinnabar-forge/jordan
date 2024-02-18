import { program } from "commander";
import fs from "fs";

const version = JSON.parse(fs.readFileSync("version.json", "utf8"));

program
  .version(
    `v${version.major}.${version.minor}.${version.patch}`,
    "-v, --version"
  )
  .description("Backup and restore your configs (and, practically, anything)");

program
  .command("cache [newLocation]")
  .alias("location")
  .description("Check or setup a new cache location")
  .action((newLocation) => {
    console.log(`Updating backup location to: ${newLocation}`);
  });

program
  .command("add <configName> <location>")
  .description("Add or update the configuration")
  .action((configName, location) => {
    console.log(configName, location);
  });

program
  .command("remove <configName>")
  .description("Remove the configuration")
  .action((configName, location) => {
    console.log(configName, location);
  });

program
  .command("backup <configName>")
  .description("Backup the configuration")
  .action((configName) => {
    console.log(`Backing up configuration: ${configName}`);
  });

program
  .command("backup-all")
  .description("Backup all configurations")
  .action(() => {
    console.log(`Backing up all configurations`);
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
    console.log(`Restoring configuration: ${configName}`);
  });

program
  .command("restore-all")
  .description("Restore all configurations")
  .action(() => {
    console.log(`Restoring all configurations`);
  });

program.parse(process.argv);
