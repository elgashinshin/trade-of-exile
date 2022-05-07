import { CopyIcon } from '@chakra-ui/icons';
import { AddUser, TradeIcon } from 'renderer/components/Icons';

type Argument = {
  item: string;
  username: string;
};
export const getLeftSideIncomingActionButtons = ({ username }: Argument) => {
  return [
    {
      id: 5,
      label: 'Copy item to clipboard',
      Icon: CopyIcon,
    },
    {
      id: 1,
      label: 'Invite user',
      actionMessage: `/invite ${username}`,
      Icon: AddUser,
    },
    {
      id: 2,
      label: 'Trade with user',
      actionMessage: `/tradewith ${username}`,
      Icon: TradeIcon,
    },
  ];
};
