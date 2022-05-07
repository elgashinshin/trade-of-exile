import axios from 'axios';

const UPDATE_INTERVAL = 1800000;

export class BlackList {
  blacklist = [];

  eventEmmiter: any = null;

  constructor(eventEmmiter: any) {
    this.eventEmmiter = eventEmmiter;
  }

  async loadBlackList() {
    try {
      const { data } = await axios.get(
        'https://raw.githubusercontent.com/The-Forbidden-Trove/character_name_blacklist/main/blacklist.txt'
      );

      this.blacklist = data.split('\n');

      this.sendBlackList();
    } catch (error) {
      console.error(error);
    }
  }

  sendBlackList() {
    if (this.eventEmmiter && this.blacklist) {
      this.eventEmmiter.emit('update-balcklist', this.blacklist);
    }
  }

  async start() {
    this.loadBlackList();

    setTimeout(this.loadBlackList, UPDATE_INTERVAL);
  }
}
