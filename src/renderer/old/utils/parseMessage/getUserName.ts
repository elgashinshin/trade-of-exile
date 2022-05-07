import MessageType from '../../../stores/notifications/types/MessageType';
import getUsernameFromRussian from './ru/getUsernameFromRussian';
import getUsernameFromEnglish from './eu/getUsernameFromEnglish';

const getUserName = (message: string, messageType: MessageType) => {
  if (message.includes('@From') || message.includes('@To')) {
    return getUsernameFromEnglish(message, messageType);
  }

  return getUsernameFromRussian(message, messageType);
};

export default getUserName;
