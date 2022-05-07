const isTradeMessage = (message: string) => {
  return message.includes('Здравствуйте, хочу купить у вас');
};

export default isTradeMessage;
