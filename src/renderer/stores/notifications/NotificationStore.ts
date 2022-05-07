import { action, makeObservable, observable } from 'mobx';
import { TradeNotificationDomain } from './TradeNotificationDomain';
import { ExchangeNotificationDomain } from './ExchangeNotificationDomain';
import {
  ExchangeNotification,
  TradeNotification,
  TradeType,
} from './types/Notification';

class NotificationStore {
  notifications: Array<TradeNotificationDomain | ExchangeNotificationDomain> =
    [];

  constructor() {
    makeObservable(this, {
      notifications: observable,
      createNotification: action.bound,
    });
  }

  createNotification(
    _newNotification: TradeNotification | ExchangeNotification
  ) {
    if (_newNotification) {
      let notification:
        | TradeNotificationDomain
        | ExchangeNotificationDomain
        | null = null;

      console.debug(_newNotification);
      if (_newNotification.tradeType === TradeType.TRADE) {
        notification = new TradeNotificationDomain(
          this,
          _newNotification as TradeNotification
        );
      }

      if (_newNotification.tradeType === TradeType.EXCHANGE) {
        notification = new ExchangeNotificationDomain(
          this,
          _newNotification as ExchangeNotification
        );
      }

      if (notification) {
        this.notifications = [notification, ...this.notifications];
      }
    }
  }

  get getNotifications() {
    return this.notifications;
  }
}

export default NotificationStore;
