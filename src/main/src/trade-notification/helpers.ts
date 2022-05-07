/* eslint-disable consistent-return */
const whisperRegex = /@From|@To|@Кому|@От кого/;

export const isWhisperMessage = (message: string) => {
  return message.match(whisperRegex);
};

export const removeLogData = (message: string) => {
  return String(message.split(whisperRegex).pop());
};

export const getUsername = (_message: string): undefined | string => {
  if (_message.match(whisperRegex)) {
    throw new Error('Message includes whisper attributes');
    return;
  }

  let message = String(_message.split(':').shift()).trim();

  if (message.includes('<') && message.includes('>')) {
    message = String(message.split('>').pop());
  }

  return message.trim();
};

export const getPositionItemFromMessage = (message: string) => {
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

export const getMessageType = (message: string) => {
  if (message.match(/@От кого|@From/)) {
    return 'incoming';
  }

  if (message.match(/@Кому|@To/)) {
    return 'outgoing';
  }
};
