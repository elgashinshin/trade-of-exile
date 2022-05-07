const isRussianMessage = (message: string) => {
  const reg = new RegExp('[А-я]');

  return reg.test(message);
};

export default isRussianMessage;
