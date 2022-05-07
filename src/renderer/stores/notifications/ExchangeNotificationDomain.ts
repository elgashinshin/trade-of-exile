import { makeObservable } from 'mobx';
import MessageType from './types/MessageType';
import { ExchangeNotification } from './types/Notification';

export class ExchangeNotificationDomain {
  id: ExchangeNotification['id'];

  username: ExchangeNotification['username'];

  createdAt: ExchangeNotification['createdAt'];

  messageType: MessageType;

  tradeType: ExchangeNotification['tradeType'];

  recivedCurrencyName: ExchangeNotification['recivedCurrencyName'];

  recivedCurrencyCount: ExchangeNotification['recivedCurrencyCount'];

  exchangeableCurrencyName: ExchangeNotification['exchangeableCurrencyName'];

  exchangeableCurrencyCount: ExchangeNotification['exchangeableCurrencyCount'];

  store = null;

  constructor(store: any, notification: ExchangeNotification) {
    makeObservable(this, {
      id: false,
      username: false,
      createdAt: false,
      messageType: false,
      tradeType: false,

      recivedCurrencyName: false,
      recivedCurrencyCount: false,
      exchangeableCurrencyName: false,
      exchangeableCurrencyCount: false,

      store: false,
    });
    this.id = notification.id;
    this.username = notification.username;
    this.createdAt = notification.createdAt;
    this.messageType = notification.messageType;
    this.tradeType = notification.tradeType;

    this.recivedCurrencyName = notification.recivedCurrencyName;
    this.recivedCurrencyCount = notification.recivedCurrencyCount;
    this.exchangeableCurrencyName = notification.exchangeableCurrencyName;
    this.exchangeableCurrencyCount = notification.exchangeableCurrencyCount;

    this.store = store;
  }

  get asJson(): ExchangeNotification {
    return {
      id: this.id,
      username: this.username,
      createdAt: this.createdAt,
      messageType: this.messageType,
      tradeType: this.tradeType,

      recivedCurrencyName: this.recivedCurrencyName,
      recivedCurrencyCount: this.recivedCurrencyCount,
      exchangeableCurrencyName: this.exchangeableCurrencyName,
      exchangeableCurrencyCount: this.exchangeableCurrencyCount,
    };
  }
}
