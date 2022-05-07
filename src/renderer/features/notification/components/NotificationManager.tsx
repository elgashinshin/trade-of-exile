/* eslint-disable react/prop-types */
import {
  ExchangeNotification,
  TradeNotification,
  TradeType,
} from 'renderer/stores/notifications/types/Notification';
import { Notification } from './Notification';

type Props = {
  notification: TradeNotification | ExchangeNotification;
};
export const NotificationManager: React.FC<Props> = ({ notification }) => {
  return (
    <>
      {notification.tradeType === TradeType.TRADE && (
        <Notification notification={notification as TradeNotification} />
      )}

      {notification.tradeType === TradeType.EXCHANGE && <div>EXCHANGE</div>}
    </>
  );
};
