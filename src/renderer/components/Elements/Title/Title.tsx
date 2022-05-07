import { Divider, Text } from '@chakra-ui/react';
import React from 'react';

export const Title: React.FC = ({ children }) => {
  return (
    <>
      <Text fontSize="3xl">{children}</Text>
      <Divider />
    </>
  );
};
