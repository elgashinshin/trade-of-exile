import isTradeMessage from './isTradeMessage';
import isEnglishMessage from './isEnglishMessage';
import parseEnglishTradeMessage from './parseEnglishTradeMessage';
import MessageType from '../../../../stores/notifications/types/MessageType';

const parseEnglishMessage = (message: string, messageType: MessageType) => {
  if (!isEnglishMessage(message)) {
    throw 'not english message';
    return;
  }

  if (isTradeMessage(message)) {
    return parseEnglishTradeMessage(message, messageType);
  }

  return;
};

export default parseEnglishMessage;
