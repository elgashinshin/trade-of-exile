import { CopyIcon } from '@chakra-ui/icons';
import { AddUser, TradeIcon } from 'renderer/components/Icons';

const buttons = [
  {
    id: 5,
    label: 'Copy item to clipboard',
    Icon: CopyIcon,
  },
  {
    id: 1,
    label: 'Invite user',
    Icon: AddUser,
  },
  {
    id: 2,
    label: 'Trade with user',
    Icon: TradeIcon,
  },
];
export default buttons;
