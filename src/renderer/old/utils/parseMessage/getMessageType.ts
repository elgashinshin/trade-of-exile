import getMessageTypeEnglish from './eu/getMessageTypeEnglish';
import getMessageTypeRussian from './ru/getMessageTypeRussian';

const getMessageType = (message: string) => {
  return getMessageTypeEnglish(message) || getMessageTypeRussian(message);
};

export default getMessageType;
