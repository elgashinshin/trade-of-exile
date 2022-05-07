import MessageType from '../../../../stores/notifications/types/MessageType';

const getUsernameFromEnglish = (message: string, messageType: MessageType) => {
  // without type message after and @From or @To
  let username =
    message
      .split(messageType === MessageType.incoming ? '@From' : '@To')
      .pop() + '';
  // without text message
  username = username.split(':').pop() + '';

  // without guild
  if (username.includes('>')) {
    username = username.split('>').pop() + '';
  }

  return username.trim();
};

export default getUsernameFromEnglish;
