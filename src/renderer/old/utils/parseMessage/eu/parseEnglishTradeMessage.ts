import { v4 as uuid } from 'uuid';
import getPositionItemFromMessage from '../getPositionItemFromMessage';
import MessageType from '../../../../stores/notifications/types/MessageType';
import getDateFromMessage from '../getDateFromMessage';
import getUserName from "../getUserName";

const parseEnglishTradeMessage = (
  message: string,
  messageType: MessageType
) => {
  const withoutYour = message.split('Hi, I would like to buy your ')[1];
  const withoutListedFor = withoutYour.split(' listed for ');
  const item = withoutListedFor[0];
  const price = withoutListedFor[1].split(' in ')[0];
  return {
    id: uuid(),
    type: messageType,
    username: getUserName(message, messageType),
    createdAt: getDateFromMessage(message),
    item,
    price,
    ...getPositionItemFromMessage(message),
  };
};

export default parseEnglishTradeMessage;
