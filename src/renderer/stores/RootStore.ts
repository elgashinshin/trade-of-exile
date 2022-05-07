import NotificationStore from './notifications/NotificationStore';

class RootStore {
  notificationStore;
  constructor() {
    this.notificationStore = new NotificationStore();
  }
}
export default RootStore;
