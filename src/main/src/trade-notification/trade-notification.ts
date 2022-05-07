import sane from 'sane';
import readline from 'readline';
import fs from 'fs';
import { BrowserWindow } from 'electron';
import { getNotification } from './get-notification';

class TradeNotification {
  private window: BrowserWindow;

  private eventEmmiter: any;

  private blacklist: string[] = [];

  private dir = 'D:/games&launchers/Steam/steamapps/common/Path of Exile/logs';

  private file = 'Client.txt';

  private index = fs.statSync(`${this.dir}/${this.file}`).size;

  constructor(eventEmmiter: any, window: BrowserWindow) {
    this.eventEmmiter = eventEmmiter;
    this.window = window;
  }

  private updateBlackList() {
    if (!this.eventEmmiter) {
      return;
    }

    this.eventEmmiter.on('update-balcklist', (blacklist: string[]) => {
      this.blacklist = blacklist;
    });
  }

  public watchChangesClientTxt() {
    this.updateBlackList();

    sane(this.dir, {
      glob: 'Client.txt',
      poll: true,
    }).on('change', (_fileName, _dir, stat) => {
      const options = {
        // encoding: 'utf-8' as BufferEncoding,
        start: this.index,
      };

      this.index = stat.size;

      readline
        .createInterface({
          input: fs.createReadStream(`${this.dir}/Client.txt`, options),
        })
        .on('line', (line) => {
          const notification = getNotification(line);

          if (notification) {
            const isBlackList = this.blacklist.includes(
              notification.username || ''
            );

            this.window.webContents.send('create-notification', {
              ...notification,
              isBlackList,
            });
          }
        });
    });
  }
}

export default TradeNotification;
