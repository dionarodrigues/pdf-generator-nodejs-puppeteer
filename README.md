# PDF Generator for business proposals using Node.JS with Puppeteer and HTML

👌 A complete application to create PDF files from a HTML form using Node.JS with with Typescript. 

---

__This project contains the following settings:__
- PDF generator using [Puppeteer](https://www.npmjs.com/package/puppeteer)
- Images Uploading using [Multer](https://www.npmjs.com/package/multer)
- Templating engine with [Handlebars](https://handlebarsjs.com/)
- CSS framework using [Bulma](https://bulma.io/)
- Consistent coding styles using [EditorConfig](https://editorconfig.org/)
- Linting via [eslint](https://eslint.org/), [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) and [prettier](https://prettier.io/)
- Dev Build/Compile/Run with [ts-node-dev](https://github.com/whitecolor/ts-node-dev)
- [VSCode debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

## 🚀 Getting Started

Assuming [Node.js](https://nodejs.org/en/) is installed, run the following commands to install the project:

```
$ git clone https://github.com/diogorodrigues/node-typescript-starter.git your-project-name

cd your-project-name

rm -rf .git
cd backend
yarn install
yarn dev:server
```

It is important that you start the backend application before using the HTML form. When filling out the HTML form, the PDF will be downloaded automatically.

## Main files

|  Name | Description |
| :------------ | :------------ |
| app | Contains front-end static files: HTML, CSS and JS for the form |
| app/index.html | HTML form | 
| app/assets/js/scripts.js | Scripts to handle the form and fetch the API to generate PDFs | 
| backend | Contains the Node.JS application to generate PDFs from HTML form |
| backend/public | To storage images and PDFs from the HTML form |
| backend/src | Contains your source code |
| backend/src/app/templates | Contains the hbs templates for PDFs | 
| backend/src/app/controllers | Contains the controllers to handle Images and PDFs | 
| backend/src/app/config | Contains some configs for multer |
| backend/src/routes | Contains the routes | 
| backend/src/server.ts | Entry point to your express app |

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
