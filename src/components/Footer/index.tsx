import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Footer = () => (
  <Flex
    as="footer"
    alignContent="center"
    alignItems="center"
    justifyContent="center"
    width="100%"
    wrap="wrap"
    mt={8}
    padding={4}
    flexGrow={0}
    gridColumnGap={'0.4ch'}
  >
    <Text as="div" opacity={0.5} fontSize="sm" textAlign="center">
      &copy; 2021 Albert Álvarez Carulla.
    </Text>
    <Text as="div" opacity={0.5} fontSize="sm" textAlign="center">
      Todos los Derechos Reservados.
    </Text>
  </Flex>
);

export default Footer;
