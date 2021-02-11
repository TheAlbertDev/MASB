import React from 'react';
import {
  Stack,
  Button,
  CSSObject,
  Menu as ChakraMenu,
  MenuButton,
  Box,
  IconButton,
  MenuList,
  MenuItem,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from '../Link';
import { GiHamburgerMenu as HamburgerIcon } from 'react-icons/gi';
import { Link as GatsbyLink } from 'gatsby';
import { IoLogoGithub } from 'react-icons/io5';

const activeStyle: CSSObject = { opacity: 1 };

const Menu = () => (
  <>
    <Stack
      direction={{ base: 'column', md: 'row' }}
      display={{ base: 'none', md: 'flex' }}
      alignItems="center"
      spacing={4}
      sx={{
        '& a': {
          color: 'teal.200',
          '&:last-of-type:hover': {
            textDecoration: 'none',
          },
          '&:not(:last-of-type)': {
            opacity: 0.6,
            transition: 'opacity 0.2s ease-in-out',
            '&:hover': {
              opacity: 1,
              textDecoration: 'none',
            },
          },
        },
      }}
    >
      <Link href="/" activeStyle={activeStyle}>
        Inicio
      </Link>
      <Link href="/portafolios" activeStyle={activeStyle}>
        Portafolios
      </Link>
      <Link href="/acerca-de" activeStyle={activeStyle}>
        Acerca de
      </Link>
      <Link
        href="https://github.com/TheAlbertDev/MASB/discussions"
        color="teal"
      >
        <Button variant="outline" leftIcon={<IoLogoGithub />} size="sm">
          Comunidad
        </Button>
      </Link>
    </Stack>

    <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
      <ChakraMenu isLazy autoSelect={false}>
        <MenuButton
          as={IconButton}
          icon={<HamburgerIcon />}
          variant="outline"
          aria-label="Options"
        />
        <MenuList>
          <MenuItem as={GatsbyLink} to="/">
            Inicio
          </MenuItem>
          <MenuItem as={GatsbyLink} to="/portafolios">
            Portafolios
          </MenuItem>
          <MenuItem as={GatsbyLink} to="/acerca-de">
            Acerca de
          </MenuItem>
          <MenuItem
            icon={<IoLogoGithub size={20} />}
            as={ChakraLink}
            href="https://github.com/TheAlbertDev/MASB/discussions"
            target="_blank"
            rel="noopener noreferrer nofollow"
            sx={{ '&:hover': { textDecoration: 'none' } }}
          >
            Comunidad
          </MenuItem>
        </MenuList>
      </ChakraMenu>
    </Box>
  </>
);

export default Menu;
