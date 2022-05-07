import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';

class MouseEvents {
  private static getWindow(event: IpcMainEvent) {
    return BrowserWindow.fromWebContents(event.sender);
  }

  private static enableMouseEvents() {
    ipcMain.on('enable-mouse-events', (event) => {
      const window = MouseEvents.getWindow(event);
      window?.setIgnoreMouseEvents(false);
    });
  }

  private static disableMouseEvents() {
    ipcMain.on('disable-mouse-events', (event) => {
      const window = MouseEvents.getWindow(event);
      window?.setIgnoreMouseEvents(true, { forward: true });
    });
  }

  public static start() {
    MouseEvents.enableMouseEvents();
    MouseEvents.disableMouseEvents();
  }
}

export default MouseEvents;
