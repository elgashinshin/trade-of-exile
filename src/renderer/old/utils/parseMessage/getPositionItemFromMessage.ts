const getPositionItemFromMessage = (message: string) => {
  const newMessage = message.split('(')[1].split(')')[0].split('; ');
  const stashTab = newMessage[0].split('"')[1];
  const position = newMessage[1].split(': ')[1].split(', ');

  let left: RegExpMatchArray | null | number = position[0].match(/\d+/);

  if (left) {
    left = parseInt(left[0], 10);
  }

  let top: RegExpMatchArray | null | number = position[1].match(/\d+/);

  if (top) {
    top = parseInt(top[0], 10);
  }

  return {
    stashTab,
    position: {
      left,
      top,
    },
  };
};

export default getPositionItemFromMessage;
