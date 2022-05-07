const isEnglishMessage = (message: string) => {
  const reg = new RegExp('[A-z]');
  return reg.test(message);
};

export default isEnglishMessage;
