import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

const Paper = ({ children, ...restProps }: FlexProps) => {
  return (
    <Flex
      bg="whiteAlpha.200"
      padding={restProps.padding || 4}
      borderRadius={6}
      {...restProps}
    >
      {children}
    </Flex>
  );
};

export default Paper;
