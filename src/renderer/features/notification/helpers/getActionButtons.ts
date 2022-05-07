import MessageType from '../../../stores/notifications/types/MessageType';
import { getLeftSideIncomingActionButtons } from './getLeftSideIncomingActionButtons';
import { getRightSideIncomingActionButtons } from './getRightSideIncomingActionButtons';

type Argument = {
  username: string;
  messageType: MessageType;
};
export const getActionButtons = ({ username }: Argument) => {
  return {
    leftSide: getLeftSideIncomingActionButtons({ item: 'adf', username }),
    rightSide: getRightSideIncomingActionButtons(username),
  };
};
