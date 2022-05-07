const isTradeMessage = (message: string) => {
  return message.includes('Hi, I would like to buy your');
};

export default isTradeMessage;
