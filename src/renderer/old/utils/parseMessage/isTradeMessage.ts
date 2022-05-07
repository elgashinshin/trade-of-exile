const isTradeMessage = (message: string) => {
  const reg = new RegExp('[]');

  return reg.test(message);
};

export default isTradeMessage;
