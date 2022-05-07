/* eslint-disable consistent-return */
import { EnglishMessage } from './english-message';

export const getNotification = (message: string) => {
  const englishNotification = new EnglishMessage(message).composeMessage;

  if (englishNotification) {
    return englishNotification;
  }
};
