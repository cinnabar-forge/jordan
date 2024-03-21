# Cinnabar Forge Jordan

Cinnabar Forge Jordan is a versatile tool for backing up and restoring configuration files and directories. Designed with simplicity in mind, it allows users to manage their configurations in a fast and efficient way.

## Features

- **Flexible Configuration Management**: Easily add, update, or remove configurations to suit your evolving needs.
- **Efficient Backup and Restore**: Backup individual configurations or all at once to a specified folder, ensuring your settings are safely stored and can be restored at any time.
- **Interactive and Command-Line Modes**: Choose between an interactive mode for guided configuration management or a command-line interface for quick and scriptable actions.
- **Comprehensive List Display**: View all your registered configurations with an easy-to-read table format.
- **Anywhere Node.js Goes**: Linux? Windows? [Termux](https://termux.dev)? You name it. The only thing you need is your packet manager.
- **CLI-powered**: Setup your favorite crontabs and CI tools to backup your configurations in a timely manner.

## Getting Started

### Installation

Install Cinnabar Forge Jordan globally using npm:

```bash
npm install -g jordan-backup
```

This will make the `jordan` command available in your terminal.

### Usage

To start using Jordan, you need to specify a working folder in two ways:

- with `folder` command. It will set the specified folder as the main one.

```bash
jordan folder <path_to_your_folder>
```

- with the `-f` or `--folder` option. The specified folder will be used for this time only.

```bash
jordan -f <path_to_your_folder>
```

#### Initialization

Before we can use other commands, we should init folder.

```bash
jordan init
```

It will create `jordan.json` file, which declares folder as Jordan Backup's one.

#### Adding a Configuration

To add a new configuration or update an existing one:

```bash
jordan add <configName> [path]
```

If path is omitted, the config will be considered 'cached' and will ignore `backup` and `restore` commands.

#### Removing a Configuration

To remove an existing configuration:

```bash
jordan remove <configName>
```

#### Listing All Configurations

To list all registered configurations:

```bash
jordan list
```

Or

```bash
jordan ls
```

#### Backing Up and Restoring

To back up a configuration:

```bash
jordan backup <configName>
```

To back up all configurations:

```bash
jordan backup-all
```

To restore a configuration:

```bash
jordan restore <configName>
```

To restore all configurations:

```bash
jordan restore-all
```

For more specific operations or additional commands, use `jordan --help` or `-h` to see all available options.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

Clone the repository and install dependencies:

```bash
git clone git@github.com:cinnabar-forge/jordan.git
cd jordan
npm install
```

## License

Cinnabar Forge Jordan is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Authors

- Timur Moziev ([@TimurRin](https://github.com/TimurRin))
