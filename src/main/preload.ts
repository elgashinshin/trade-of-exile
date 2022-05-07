import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const subscription =
  (func: (...args: unknown[]) => void) =>
  (_event: IpcRendererEvent, ...args: unknown[]) => {
    func(...args);
  };

contextBridge.exposeInMainWorld('electron', {
  store: {
    get(val: string) {
      return ipcRenderer.sendSync('electron-store-get', val);
    },
    set(property: any, val: string) {
      ipcRenderer.send('electron-store-set', property, val);
    },
  },
  ipcRenderer: {
    on(channel: string, func: (...args: unknown[]) => void) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, subscription(func));

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    removeListener(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.removeListener(channel, subscription(func));
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    typeMessage(message: string) {
      if (typeof message !== 'string') {
        return;
      }

      ipcRenderer.send('type-message', message);
    },
    enableMouseEvents() {
      ipcRenderer.send('enable-mouse-events');
    },
    disableMouseEvents() {
      ipcRenderer.send('disable-mouse-events');
    },
  },
});
