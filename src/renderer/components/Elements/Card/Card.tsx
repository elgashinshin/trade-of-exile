import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { BoxProps } from '@chakra-ui/layout/src/box';
// @ts-ignore
import loader from 'renderer/assets/loader.gif';

type Props = {
  imageUrl: string;
  alt: string;
  text: string;
} & BoxProps;
export const Card: React.FC<Props> = ({ imageUrl, alt, text, ...props }) => {
  return (
    <Flex
      flexDirection={'column'}
      borderRadius={'10px'}
      justifyContent={'space-evenly'}
      padding={1}
      width={'150px'}
      height={'150px'}
      backgroundColor={'gray.50'}
      textAlign={'center'}
      {...props}
    >
      <Image
        fallbackSrc={loader}
        height={'60%'}
        src={imageUrl}
        alt={alt}
        marginX={'auto'}
      />
      <Text
        title={text}
        whiteSpace={'nowrap'}
        overflow={'hidden'}
        textOverflow={'ellipsis'}
      >
        {text}
      </Text>
    </Flex>
  );
};
