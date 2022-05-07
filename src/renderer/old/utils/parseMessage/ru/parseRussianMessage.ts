import isRussianMessage from './isRussianMessage';
import parseRussianTradeMessage from './parseRussianTradeMessage';
import isTradeMessage from './isTradeMessage';
import MessageType from '../../../../stores/notifications/types/MessageType';

const parseRussianMessage = (message: string, messageType: MessageType) => {
  if (!isRussianMessage(message)) {
    return;
  }

  if (isTradeMessage(message)) {
    return parseRussianTradeMessage(message, messageType);
  }

  return;
};

export default parseRussianMessage;
