import { v4 as uuid } from 'uuid';
import getDateFromMessage from '../getDateFromMessage';
import getPositionItemFromMessage from '../getPositionItemFromMessage';
import Status from '../../../../constants/status';
import MessageType from '../../../../stores/notifications/types/MessageType';
import getUsernameFromRussian from './getUsernameFromRussian';
import getUsernameFromEnglish from '../eu/getUsernameFromEnglish';
import getUserName from '../getUserName';

const parseRussianTradeMessage = (
  message: string,
  messageType: MessageType
) => {
  const withoutYour =
    message.split('Здравствуйте, хочу купить у вас ').pop() + '';
  const withoutListedFor = withoutYour.split(' за ');
  const item = withoutListedFor[0];
  const price = withoutListedFor[1].split(' в лиге ')[0];

  return {
    id: uuid(),
    item,
    price,
    type: messageType,
    username: getUserName(message, messageType),
    status: Status.in_processed,
    createdAt: getDateFromMessage(message),
    ...getPositionItemFromMessage(message),
  };
};

export default parseRussianTradeMessage;
