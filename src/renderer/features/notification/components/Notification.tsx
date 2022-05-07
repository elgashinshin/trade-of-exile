import {
  Box,
  CloseButton,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { ShopIcon } from 'renderer/components/Icons';
import { TradeNotification } from 'renderer/stores/notifications/types/Notification';
import { getActionButtons } from '../helpers/getActionButtons';

type Props = {
  notification: TradeNotification;
};

export const Notification: React.FC<Props> = ({ notification }) => {
  console.count(notification.id);
  const { username, currencyCount, currencyId, item, messageType } =
    notification;
  const { rightSide, leftSide } = React.useMemo(
    () =>
      getActionButtons({
        username,
        messageType,
      }),
    [messageType, username]
  );

  return (
    <Box width={'300px'} borderRadius={10} padding={'.5em'} bg={'purple.50'}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <ShopIcon boxSize={'1.2em'} color={'grey'} />
        <Text fontSize={'.8rem'} fontWeight={'bold'} userSelect={'none'}>
          {username}
        </Text>
        <CloseButton size={'sm'} color={'grey'} />
      </Flex>
      <Flex justifyContent={'space-between'} fontSize={'.8rem'} marginY={1}>
        <Text textAlign={'center'}>{item}</Text>
        <Text>
          {currencyId} {currencyCount}
        </Text>
      </Flex>
      <Flex justifyContent={'space-between'}>
        <Box>
          {rightSide.map(({ label, id, Icon }) => (
            <Tooltip
              bg={'white'}
              color={'black'}
              openDelay={500}
              label={label}
              placement={'top'}
              borderRadius={5}
            >
              <IconButton
                key={id}
                opacity={'70%'}
                aria-label={label}
                size={'xs'}
                // onClick={() => {
                //   actionMessage && ipcRenderer.send('hey', actionMessage);
                // }}
                marginRight={1}
                icon={<Icon />}
              />
            </Tooltip>
          ))}
        </Box>
        <Box>
          {leftSide.map(({ label, id, Icon }) => (
            <Tooltip
              openDelay={500}
              bg={'white'}
              color={'black'}
              label={label}
              placement={'top'}
              borderRadius={5}
            >
              <IconButton
                opacity={'70%'}
                aria-label={label}
                key={id}
                size={'xs'}
                // onClick={() => {
                //   actionMessage && ipcRenderer.send('hey', actionMessage);
                // }}
                marginLeft={1}
                icon={<Icon />}
              />
            </Tooltip>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};
