import MessageType from '../../../../stores/notifications/types/MessageType';

const getMessageTypeEnglish = (message: string) => {
  // outgoing message
  if (message.includes('@To')) {
    return MessageType.outgoing;
  }

  // incoming message
  if (message.includes('@From')) {
    return MessageType.outgoing;
  }

  return false;
};

export default getMessageTypeEnglish;
