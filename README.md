# node-ts-starter-template

A NodeJS + TypeScript starter template for creating npm packages.

This template includes the following configuration/setup:

- ESLint as linter, Prettier as formatter, and Jest as the test runner and code coverage report generator.

- A simple configuration (`.travis.yml`) to setup continuous integration (CI) with [Travis CI](https://travis-ci.com/) which sends code coverage reports to [codecov](https://codecov.io).

- Devcontainer is preconfigured to be used with Visual Studio Code.

_Note: Access to the repository must be granted by the user to Travis CI and codecov to run automated builds and analyze code coverage reports_.

_This project uses yarn as the package manager_.

## How to get started?

Simply click on the "Use this template" button on Github or click [here](https://github.com/ukalwa/node-ts-starter-template/generate) to generate your project from this template.

## Available Scripts

- `yarn start` - Starts the `./src/index.ts` script by compiling it on the fly to JS using `ts-node`.

- `yarn start:w` - Starts the above script in "watch" mode using `nodemon`. Any file changes you make will restart the above script.

- `yarn clean`: Removes build and coverage directories.

- `yarn lint`: Run ESLint on all typescript files and report errors to the console.

- `yarn build`: Compile TypeScript files to `dist` directory.

- `yarn report`: Collect coverage metrics from `jest` and report it to `codecov`. (_Uploading to codecov will fail if it doesn't have access to your Github repository_)

## Development inside a Container (with VSCode)

With VSCode, it is possible to create a full-featured development environment inside a Docker Container and allows teams to share the same development environment (settings, extensions, launch.json, etc.,) regardless of the host operating system. The editor settings are configured in `.devcontainer/devcontainer.json` and container information in `docker-compose.yml`.

### Before you begin

Please make sure the following software is installed on your machine.

- [Docker Desktop]
- [VSCode]
- [VSCode Remote - Containers] extension _(or [VSCode Remote Development] extension pack)_

### Setup

- After cloning this repo, open the project in VSCode.
- Click on the [prompt] on the bottom-right which says to reopen the folder in a container.
- It should pull and instantiate development containers for this project with preconfigured VSCode settings and extensions.
- If everything went well, you should see the project open in the VSCode editor with the bottom-left showing `Dev Container: node-ts-starter-template`, which indicates the editor is successfully connected to the docker container.

[docker desktop]: https://www.docker.com/products/docker-desktop
[vscode]: https://code.visualstudio.com/Download
[vscode remote - containers]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
[vscode remote development]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack
[prompt]: https://code.visualstudio.com/docs/remote/containers#_adding-configuration-files-to-public-or-private-repositories
