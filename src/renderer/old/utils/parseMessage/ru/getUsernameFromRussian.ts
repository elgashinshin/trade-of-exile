import MessageType from '../../../../stores/notifications/types/MessageType';

const getUsernameFromRussian = (message: string, messageType: MessageType) => {
  // without type message after and @From or @To
  let username =
    message
      .split(messageType === MessageType.incoming ? '@От кого' : '@Кому')
      .pop() + '';
  // without text message
  username = username.split(':').pop() + '';

  console.debug(username);
  // without guild
  if (username.includes('>')) {
    username = username.split('>').pop() + '';
  }

  return username.trim();
};

export default getUsernameFromRussian;
