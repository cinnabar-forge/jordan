# Cinnabar Forge Jordan

Cinnabar Forge Jordan is a versatile tool for backing up and restoring configuration files and directories. Designed with simplicity in mind, it allows users to manage their configurations in a fast and efficient way

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

#### Adding a Configuration

To add a new configuration or update an existing one:

```bash
jordan-cli -f <path> add <configName> <location>
```

#### Removing a Configuration

To remove an existing configuration:

```bash
jordan-cli -f <path> remove <configName>
```

#### Listing All Configurations

To list all registered configurations:

```bash
jordan-cli -f <path> list
```

#### Backing Up and Restoring

To back up a configuration:

```bash
jordan-cli -f <path> backup <configName>
```

To back up all configurations:

```bash
jordan-cli -f <path> backup-all
```

To restore a configuration:

```bash
jordan-cli -f <path> restore <configName>
```

To restore all configurations:

```bash
jordan-cli -f <path> restore-all
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

## Changelog

For a detailed history of changes, check out the [CHANGELOG.md](CHANGELOG.md) file.

## License

Cinnabar Forge Jordan is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Authors

- Timur Moziev ([@TimurRin](https://github.com/TimurRin))
