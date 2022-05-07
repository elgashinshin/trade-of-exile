import { Box, Button } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Store } from '../../index';

const Main = () => {
  const { notificationStore } = useContext(Store);
  return (
    <Box>
      <Button
        marginBottom={3}
        onClick={() =>
          notificationStore.createNotification({
            id: '1',
            currencyId: 'alt',
            currencyCount: 10,
            item: 'hi im item',
            user: 'broki',
          })
        }
      >
        create notification
      </Button>
    </Box>
  );
};

export default observer(Main);
