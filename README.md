# TaxMax Desktop Dot
In this example we are going to use `@eo-sdk/core` library to create a tiny little desktop application.

Imagine: There is a company called "TaxMax Accounting". They got a number of clients for which they are
doing their taxes. Once a year they need to collect all the required invoices, bills and other documents
to do the annual tax declaration for them. This could be quite a pain, for the clients as well as for
the TaxMax employees. 

Now, let's make this as simple as possible with the support of a tiny little piece of software running 
on the clients computer. Everytime the client receives a tax related document, he will just drag it onto
the application and it's going to be uploaded to their accountant instantly. The accountant then gets
a notification to its inbox where he can classify the document. Done! When the next tax declaration is 
going to be created, all the accountant has to do is search for the files he received during the last year.

So how do we do that? We are going to create an Angular application using `@eo-sdk/core` to connect to 
the accounting companies enaio backend. We'll be using Electron to create a desktop application from our app.

## Create a new project
Use Angular CLI to create a new project running `ng new taxmax-dot --style=scss`.

## Setup Electron

- Create a folder `electron` in your projects root
- add a folder called `app` there
- create a file `main.ts` which is Electrons main entry file

``` javascript
const {app, BrowserWindow} = require('electron');
let win;

function createWindow() {
  const devMode = process.mainModule.filename.indexOf('app.asar') === -1;
  win = new BrowserWindow({
    width: 200, height: 200, alwaysOnTop: true, autoHideMenuBar: true, maximizable: false, resizable: false
  });

  win.loadFile('app/index.html');

  if (devMode) {
    win.webContents.openDevTools();
  }

  win.on('closed', function () {
    win = null
  })
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
});
```

- add a `package.json` to the electron folder and run `npm i` there to install electrons dependencies


``` json
  {
    "name": "pic-pick",
    "version": "0.0.1",
    "description": "custom client demo",
    "author": "OPTIMAL SYSTEMS GmbH",
    "main": "main.js",
    "scripts": {
      "start": "electron ."
    },
    "build": {
      "appId": "de.enaio.picpick.desktop",
      "productName": "enaio picture picker",
      "copyright": "OPTIMAL SYSTEMS GmbH",
      "directories": {
        "output": "../dist"
      },
      "win": {
        "target": "portable",
        "icon": "../src/favicon.ico"
      },
      "linux": {
        "icon": "../src/favicon.ico"
      },
      "mac": {
        "icon": "../src/favicon.ico"
      }
    },
    "devDependencies": {
      "electron": "2.0.3",
      "electron-builder": "20.26.1"
    }
  }
```

- add new build commands to the projects root `package.json` to be able to build the project

``` json
  "electron-run": "ng build --output-path electron/app --base-href ./ && cd electron && npm start",
  "electron-pack-win": "npm run electron && cd electron && npx electron-builder --win"
```

- build and run the application by running `npm run electron-run` in the project root

That's it for Electron. The app we are going to create will be build into electron's app folder and
wrapped in a desktop application. 
