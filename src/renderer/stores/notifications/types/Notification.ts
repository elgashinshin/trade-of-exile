import Position from './Position';
import MessageType from './MessageType';

export enum TradeType {
  TRADE = 'trade',
  EXCHANGE = 'exchange',
}

export type Notification = {
  id: string;
  username: string;
  createdAt: Date;
  messageType: MessageType;
  tradeType: TradeType;
};

export type TradeNotification = Notification & {
  item: string;
  currencyId: string;
  currencyCount: string;
  stashTab: string;
  position: Position;
};

export type ExchangeNotification = Notification & {
  recivedCurrencyName: string;
  recivedCurrencyCount: number;

  exchangeableCurrencyName: string;
  exchangeableCurrencyCount: number;
};
