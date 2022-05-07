/* eslint-disable consistent-return */
import { randomUUID } from 'crypto';
import {
  getMessageType,
  getPositionItemFromMessage,
  getUsername,
  isWhisperMessage,
  removeLogData,
} from './helpers';

export class EnglishMessage {
  message: string = '';

  static whisperRegex = /@From|@To|@Кому|@От кого/;

  constructor(message: string) {
    this.message = message;
  }

  get getItemNameAndPrice() {
    const { message } = this;
    const withoutYour = message.split('Hi, I would like to buy your ')[1];
    const withoutListedFor = withoutYour.split(' listed for ');
    const item = withoutListedFor[0];
    const price = withoutListedFor[1].split(' in ')[0].split(' ');

    return {
      item,
      currencyCount: parseInt(price[0], 10),
      currencyId: price[1],
    };
  }

  get isTradeMessage() {
    return this.message.includes('Hi, I would like to buy your');
  }

  get isExchangeMessage() {
    return this.message.includes("Hi, I'd like to buy your");
  }

  private tradeMessageCompose() {
    let { message } = this;

    message = removeLogData(message);

    const username = getUsername(message);
    const { position, stashTab } = getPositionItemFromMessage(message);
    const { item, currencyCount, currencyId } = this.getItemNameAndPrice;
    const messageType = getMessageType(this.message);

    return {
      id: randomUUID(),
      username,
      position,
      stashTab,
      item,
      currencyCount,
      currencyId,
      messageType,
      createdAt: new Date().toISOString(),
      tradeType: 'trade',
    };
  }

  get getExchangeItemAndPrice() {
    let { message } = this;

    // message without greeting
    message = String(message.split("Hi, I'd like to buy your").pop());

    const buyoutCurrency = String(message.split('for my').shift()).trim();

    const recivedCurrencyCount = String(buyoutCurrency.split(' ').shift());
    let recivedCurrencyName: string | string[] = buyoutCurrency.split(' ');
    recivedCurrencyName.shift();
    recivedCurrencyName = String(recivedCurrencyName).replace(',', ' ');

    const price = String(
      message.split('for my').pop()?.split('in').shift()
    ).trim();

    const exchangeableCurrencyCount = String(price.split(' ').shift());
    let exchangeableCurrencyName: string | string[] = price.split(' ');
    exchangeableCurrencyName.shift();
    exchangeableCurrencyName = String(exchangeableCurrencyName).replace(
      ',',
      ' '
    );

    return {
      recivedCurrencyCount: parseInt(recivedCurrencyCount, 10),
      recivedCurrencyName,
      exchangeableCurrencyCount: parseInt(exchangeableCurrencyCount, 10),
      exchangeableCurrencyName,
    };
  }

  private exchangeMessageCompose() {
    let { message } = this;

    message = removeLogData(message);

    const username = getUsername(message);

    const {
      exchangeableCurrencyCount,
      exchangeableCurrencyName,
      recivedCurrencyCount,
      recivedCurrencyName,
    } = this.getExchangeItemAndPrice;
    const messageType = getMessageType(this.message);

    return {
      id: randomUUID(),
      username,
      messageType,
      createdAt: new Date().toISOString(),

      tradeType: 'exchange',

      recivedCurrencyName,
      recivedCurrencyCount,

      exchangeableCurrencyName,
      exchangeableCurrencyCount,
    };
  }

  public get composeMessage() {
    if (isWhisperMessage(this.message) && this.isTradeMessage) {
      return this.tradeMessageCompose();
    }

    if (isWhisperMessage(this.message) && this.isExchangeMessage) {
      return this.exchangeMessageCompose();
    }
  }
}
