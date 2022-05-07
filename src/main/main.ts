/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, clipboard } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import robot from 'robotjs';
import axios from 'axios';
import Store from 'electron-store';
import MenuBuilder from './menu';
import MouseEvents from './src/mouse-events';
import TradeNotification from './src/trade-notification/trade-notification';
import { BlackList } from './src/black-list';

const { overlayWindow } = require('electron-overlay-window');
const EventEmmiter = require('events');

const store = new Store();

axios
  .get('https://www.pathofexile.com/api/trade/data/static', {
    headers: {
      'user-agent': 'Mozilla/5.0',
    },
  })
  .then((response) => {
    console.debug(response.data);
  })
  .catch((error) => {
    console.debug(error.message);
  });

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
const eventEmmiter = new EventEmmiter();

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    ...overlayWindow.WINDOW_OPTS,
    show: false,
    width: 300,
    alwaysOnTop: true,
    height: 300,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.setIgnoreMouseEvents(true, { forward: true });
  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  mainWindow.loadURL('http://localhost:1212');
  overlayWindow.attachTo(mainWindow, 'Path of Exile');

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  new TradeNotification(eventEmmiter, mainWindow).watchChangesClientTxt();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */
ipcMain.on('type-message', (_event, message) => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    window.blur();
  }
  robot.setKeyboardDelay(1);
  robot.keyTap('enter');
  clipboard.writeText(message, 'clipboard');
  robot.keyTap('v', 'control');
  robot.keyTap('enter');
});

MouseEvents.start();
new BlackList(eventEmmiter).loadBlackList();
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) {
        createWindow();
      }
    });
  })
  .catch(console.log);
