import React from 'react';
import { PageProps } from 'gatsby';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Seo from '../Seo';
import { Container, Flex } from '@chakra-ui/react';

type TLayoutProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  location?: PageProps['location'];
};

const Layout = (props: TLayoutProps) => {
  return (
    <Flex
      height="100%"
      direction="column"
      wrap="nowrap"
      alignItems="stretch"
      justifyContent="stretch"
    >
      <Seo title={props.title} />
      <NavBar />
      <Container
        maxW="container.md"
        width="100%"
        flexGrow={1}
        sx={
          {
            // marginTop: '64px',
            // '@supports (backdrop-filter: none)': {
            //   marginTop: 0,
            // },
          }
        }
      >
        {props.children}
      </Container>
      <Footer />
    </Flex>
  );
};

export default Layout;
