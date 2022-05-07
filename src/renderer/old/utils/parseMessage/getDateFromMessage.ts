const getDateFromMessage = (message: string) => {
  return new Date(message.slice(0, 19));
};

export default getDateFromMessage;
