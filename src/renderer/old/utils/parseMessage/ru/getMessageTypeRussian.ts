import MessageType from '../../../../stores/notifications/types/MessageType';

const getMessageTypeRussian = (message: string) => {
  // outgoing message
  if (message.includes('@Кому')) {
    return MessageType.outgoing;
  }

  // incoming message
  if (message.includes('@От кого')) {
    return MessageType.outgoing;
  }

  return false;
};

export default getMessageTypeRussian;
