import { Badge } from '@chakra-ui/react';
import React from 'react';
import Status from 'renderer/constants/status';

type Props = {
  status: Status;
};

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const { colorScheme, text } = React.useMemo(() => {
    switch (status) {
      case Status.success:
        return { text: 'Продано', colorScheme: 'green' };
      case Status.canceled:
        return { text: 'Отменено', colorScheme: 'red' };
      case Status.in_processed:
        return { text: 'В процессе', colorScheme: 'yellow' };
      default:
        return { text: 'Продано', colorScheme: 'green' };
    }
  }, [status]);
  return <Badge colorScheme={colorScheme}>{text}</Badge>;
};
