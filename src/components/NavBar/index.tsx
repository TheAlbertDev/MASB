import React from 'react';
import LogoSVG from '../../images/logo.svg';
import { Flex, Spacer, Text, Container, Box } from '@chakra-ui/react';
import Menu from './Menu';
import { Link } from 'gatsby';

const NavBar = () => (
  <Box
    w="100%"
    zIndex={1}
    left={0}
    right={0}
    sx={{
      '@supports (backdrop-filter: none)': {
        position: 'fixed',
        bg: '#20202380',
        backdropFilter: 'blur(10px)',
      },
    }}
    bg="#20202380"
  >
    <Container maxW="container.lg" w="100%" zIndex={1} left={0} right={0}>
      <Flex
        direction="row"
        wrap="nowrap"
        alignItems="center"
        justifyContent="center"
        height="64px"
        paddingY={2}
        flexGrow={0}
        width="100%"
      >
        <Flex
          sx={{ svg: { fill: 'teal.200', height: '40px', width: '40px' } }}
          alignItems="center"
          gridGap={4}
        >
          <Box sx={{ 'a:hover': { textDecoration: 'none' } }}>
            <Link
              to="/"
              style={{ display: 'flex', gap: 12, alignItems: 'center' }}
            >
              <LogoSVG />
              <Text fontSize="3xl" fontWeight="semibold" color="white">
                MASB
              </Text>
            </Link>
          </Box>
        </Flex>
        <Spacer />
        <Menu />
      </Flex>
    </Container>
  </Box>
);

export default NavBar;
