import { makeObservable } from 'mobx';
import MessageType from './types/MessageType';
import { TradeNotification } from './types/Notification';

export class TradeNotificationDomain {
  id: TradeNotification['id'];

  username: TradeNotification['username'];

  createdAt: TradeNotification['createdAt'];

  messageType: MessageType;

  tradeType: TradeNotification['tradeType'];

  item: TradeNotification['item'];

  currencyId: TradeNotification['currencyId'];

  currencyCount: TradeNotification['currencyCount'];

  stashTab: TradeNotification['stashTab'];

  position: TradeNotification['position'];

  store = null;

  constructor(store: any, notification: TradeNotification) {
    makeObservable(this, {
      id: false,
      store: false,
      username: false,
      item: false,
      currencyId: false,
      currencyCount: false,
      position: false,
      stashTab: false,
      createdAt: false,
    });
    this.id = notification.id;
    this.username = notification.username;
    this.createdAt = notification.createdAt;
    this.messageType = notification.messageType;
    this.tradeType = notification.tradeType;

    this.item = notification.item;
    this.currencyId = notification.currencyId;
    this.currencyCount = notification.currencyCount;
    this.stashTab = notification.stashTab;
    this.position = notification.position;

    this.store = store;
  }

  get asJson(): TradeNotification {
    return {
      id: this.id,
      username: this.username,
      createdAt: this.createdAt,
      messageType: this.messageType,
      tradeType: this.tradeType,

      item: this.item,
      currencyId: this.currencyId,
      currencyCount: this.currencyCount,
      stashTab: this.stashTab,
      position: this.position,
    };
  }
}
