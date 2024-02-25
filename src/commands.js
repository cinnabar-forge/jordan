import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export class JordanCase {
  constructor(folder) {
    if (folder == null) {
      throw new Error("folder must be specified");
    }
    this.folder = folder;
    this.configsFolder = path.join(this.folder, "configs");
    this.listFile = path.join(this.folder, "list.json");
    this.mapFile = path.join(this.folder, "map.json");
  }

  addConfig(name, path) {
    let isDirectory;
    try {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      isDirectory = fs.lstatSync(path).isDirectory();
    } catch (e) {
      console.error(e);
    }
    const list = this.getList();
    const map = this.getMap();
    const configExists = list.find((item) => item.name === name);

    console.log(configExists);

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!fs.existsSync(path)) {
      console.log(`The specified path does not exist: ${path}`);
      console.log(`Adding ${name} with the provided path regardless`);
    }

    if (configExists && configExists.file !== isDirectory) {
      console.log(`${name} exists. Updating path`);
    } else {
      console.log(`${name} ${configExists ? "updated" : "added"}`);
      list.push({ file: !isDirectory && "file", name });
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.writeFileSync(this.listFile, JSON.stringify(list, null, 2), "utf8");
    }

    // eslint-disable-next-line security/detect-object-injection
    map[name] = path;
    this.setMap(map);
  }

  getList() {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    return JSON.parse(fs.readFileSync(this.listFile, "utf8"));
  }

  getMap() {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    return JSON.parse(fs.readFileSync(this.mapFile, "utf8"));
  }

  initializeConfigFiles() {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!fs.existsSync(this.folder)) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.mkdirSync(this.folder, { recursive: true });
    }
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!fs.existsSync(this.configsFolder)) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.mkdirSync(this.configsFolder, { recursive: true });
    }
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!fs.existsSync(this.listFile)) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.writeFileSync(this.listFile, JSON.stringify([], null, 2), "utf8");
    }
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!fs.existsSync(this.mapFile)) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.writeFileSync(this.mapFile, JSON.stringify({}, null, 2), "utf8");
    }
  }

  async operate(configs, names, action) {
    configs.forEach((config) => {
      if (names.includes(config.name)) {
        const backupRelativePath = `${this.configsFolder}/${config.name}/`;
        const backupPath = path.resolve(backupRelativePath);
        const sourcePath = config.path;

        let command;

        if (action === "backup") {
          // eslint-disable-next-line security/detect-non-literal-fs-filename
          fs.mkdirSync(backupPath, { recursive: true });
          command = `rsync -avh --progress "${sourcePath}" "${backupPath}"`;
          console.log(`Backing up ${config.name} to ${backupPath}...`);
        } else if (action === "restore") {
          // eslint-disable-next-line security/detect-non-literal-fs-filename
          const backupFilePath = config.file ? path.resolve(backupPath, config.file) : `${backupPath}/`
          const sourceDirPath = config.file ? path.dirname(sourcePath) : sourcePath
          command = `rsync -avh --progress "${backupFilePath}" "${sourceDirPath}"`;
          console.log(`Restoring ${config.name} to ${sourceDirPath}...`);
        }

        this.runCommand(command);
      }
    });
    if (action === "backup") {
      console.log("remote backup action");
    }
  }

  removeConfig(name) {
    let list = this.getList();
    const initialLength = list.length;
    list = list.filter((item) => item.name !== name);
    if (list.length < initialLength) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.writeFileSync(this.listFile, JSON.stringify(list, null, 2), "utf8");
      console.log(`${name} removed`);
    } else {
      console.log(`${name} not found`);
    }
  }

  runCommand(command) {
    try {
      console.log(command)
      execSync(command, { stdio: "inherit" });
    } catch (error) {
      console.error(`Error executing command: ${command}`, error);
    }
  }

  setMap(map) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.writeFileSync(this.mapFile, JSON.stringify(map, null, 2), "utf8");
  }
}
