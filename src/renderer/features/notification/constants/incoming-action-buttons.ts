import { BlockIcon, LikeIcon } from 'renderer/components/Icons';

const incomingActionButtons = [
  {
    id: 1,
    label: 'Ignore user',
    Icon: BlockIcon,
  },
  {
    id: 2,
    label: 'Thank user',
    actionMessage: 'Спасибо другалечек',
    Icon: LikeIcon,
  },
];
export default incomingActionButtons;
