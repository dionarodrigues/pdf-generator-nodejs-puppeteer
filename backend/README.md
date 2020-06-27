# Starter for Node.js applications written in TypeScript

👌 A basic Starter for Node + TypeScript development with setup for [VSCode](https://code.visualstudio.com/) debugging, Jest, Eslint and more.

---

__This project contains the following settings:__
- Consistent coding styles using [EditorConfig](https://editorconfig.org/)
- Linting via [eslint](https://eslint.org/), [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) and [prettier](https://prettier.io/)
- Testing via [Jest](https://jestjs.io/) and [ts-jest](https://github.com/kulshekhar/ts-jest)
- Dev Build/Compile/Run with [ts-node-dev](https://github.com/whitecolor/ts-node-dev)
- Build via tsc to a /dist folder
- [VSCode debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

## 🚀 Getting Started

Assuming [Node.js](https://nodejs.org/en/) is installed, run the following commands to install the project:

```
$ git clone https://github.com/diogorodrigues/node-typescript-starter.git your-project-name

cd your-project-name

rm -rf .git
yarn install
yarn dev:server
```

## Main files

|  Name | Description |
| :------------ | :------------ |
| src | Contains your source code that will be compiled to the dist dir |
| dist | Contains the distributable (or output) from your TypeScript build. This is the code you ship |
| src/\_\_tests\_\_ | Contains your tests. | 
| src/routes | Contains your routes. | 
| src/server | Entry point to your express app |
| .editorconfig | EditorConfig settings |
| .eslintrc.json | Eslint Settings | 
| jest.config.js | Jest settings | 
| prettier.config.js | Prettier settings | 
| tsconfig.json | Typescript settings | 
| .vscode | Contains VS Code specific settings |

## Eslint + VS Code Settings

1. Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Add the rules below into `settings.json` (you can do this via the command palette (View > Command Palette, type settings.json and press enter):
```
"[javascript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    }
  },
  "[javascriptreact]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    }
  },
  "[typescript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    }
  },
  "[typescriptreact]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    }
  },
```
