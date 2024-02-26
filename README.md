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
npm install -g @cinnabar-forge/jordan
```

This will make the `jordan` (interactive) and `jordan-cli` (command-line, aliases: `jordan-cmd` and `jordan-command`) command available in your terminal.

### Basic Usage

To start using Jordan, you need to specify a working folder with the `-f` or `--folder` option. This folder will be used to store and manage your configurations.

```bash
jordan-cli -f <path_to_your_folder>
```

You can also use `-c` or `--current` option to make the program work from the folder you're currently in. For the sake of simplicity, I will use this option in next examples.

#### Adding a Configuration

To add a new configuration or update an existing one:

```bash
jordan-cli -c add <configName> [path]
```

If path is omitted, the config will be considered 'cached' and will ignore `backup` and `restore` commands.

#### Removing a Configuration

To remove an existing configuration:

```bash
jordan-cli -c remove <configName>
```

#### Listing All Configurations

To list all registered configurations:

```bash
jordan-cli -c list
```

Or

```bash
jordan-cli -c ls
```

#### Backing Up and Restoring

To back up a configuration:

```bash
jordan-cli -c backup <configName>
```

To back up all configurations:

```bash
jordan-cli -c backup-all
```

To restore a configuration:

```bash
jordan-cli -c restore <configName>
```

To restore all configurations:

```bash
jordan-cli -c restore-all
```

For more specific operations or additional commands, use `jordan-cli --help` or `-h` to see all available options.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

Clone the repository and install dependencies:

```bash
git clone git@github.com:cinnabar-forge/node-jordan.git
cd node-jordan
npm install
```

## License

Cinnabar Forge Jordan is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Authors

- Timur Moziev ([@TimurRin](https://github.com/TimurRin))
