import React, { useMemo } from 'react';
import { Box, Text, Flex, Input, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useStore } from 'renderer/hooks/useStore';
import Draggable, {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from 'react-draggable';
import { NotificationManager } from '../components/NotificationManager';

const { ipcRenderer, store } = window.electron;

let listener: any;

const Notifications = () => {
  const { notificationStore } = useStore();
  const notifications = notificationStore.getNotifications;

  const createNotification = React.useCallback(
    (notification) => {
      notificationStore.createNotification(notification);
    },
    [notificationStore]
  );

  React.useEffect(() => {
    if (listener) {
      return;
    }

    listener = ipcRenderer.on('create-notification', createNotification);
  }, [createNotification]);

  const onOpenFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (!file) {
      return;
    }

    localStorage.setItem('clientDir', file[0].path);
  };

  const [canDragging, setCanDragging] = React.useState(false);
  const startPosition = useMemo(() => {
    const notificationPosition = store.get('notification-position');

    if (notificationPosition) {
      return notificationPosition;
    }
  }, []);
  const [position, setPosition] = React.useState<{ x: number; y: number }>();

  const onStartDragging = () => {
    if (!canDragging) {
      return false;
    }
  };

  const onStopDragging = (
    _event: DraggableEvent,
    positionDragging: DraggableData
  ) => {
    const { x, y } = positionDragging;

    setPosition({ x, y });
    store.set('notification-position', { x, y });
  };

  return (
    <Draggable
      position={position || startPosition}
      onStop={onStopDragging}
      onStart={onStartDragging}
      handle="strong"
    >
      <Flex
        position={'absolute'}
        onMouseEnter={() => ipcRenderer.enableMouseEvents()}
        onMouseLeave={() => ipcRenderer.disableMouseEvents()}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        p={3}
      >
        {canDragging && (
          <Text
            as={'strong'}
            bg={'teal'}
            userSelect={'none'}
            cursor={'grab'}
            width={'100%'}
            textAlign={'center'}
            className={'cursor'}
          >
            Drag me!
          </Text>
        )}
        <Button
          size={'sm'}
          onClick={() => {
            setCanDragging(!canDragging);
            console.debug(store.get('notification-position'));
          }}
        >
          Change position
        </Button>
        <Input onChange={onOpenFile} type={'file'} />
        {notifications.map((notification, index) => (
          <Box key={notification.asJson.id} marginBottom={2}>
            <NotificationManager notification={notification.asJson} />
          </Box>
        ))}
      </Flex>
    </Draggable>
  );
};

export default observer(Notifications);
