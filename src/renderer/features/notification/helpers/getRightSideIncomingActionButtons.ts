import { BlockIcon, LikeIcon } from 'renderer/components/Icons';

export const getRightSideIncomingActionButtons = (username: string) => {
  return [
    {
      id: 1,
      label: 'Ignore user',
      Icon: BlockIcon,
    },
    {
      id: 2,
      label: 'Thank user',
      actionMessage: `@${username} Спасибо другалечек`,
      Icon: LikeIcon,
    },
  ];
};
