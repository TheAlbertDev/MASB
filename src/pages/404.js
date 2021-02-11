import * as React from 'react';
import Link from '../components/Link';
import { Flex, Box } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { BiDizzy } from 'react-icons/bi';

const NotFoundPage = () => (
  <Layout title="404: Página no encontrada">
    <Flex
      direction="column"
      alignContent="center"
      justifyContent="center"
      height="100%"
    >
      <Box>
        <h1>404: Página no encontrada</h1>
        <p>
          ¡Ostras! Me sabe fatal, pero no encuentro la página que buscas. Vuelve
          a probar desde <Link href="/">aquí</Link>.
        </p>
        <BiDizzy size={120} style={{ margin: '0 auto', marginTop: 32 }} />
      </Box>
    </Flex>
  </Layout>
);

export default NotFoundPage;
