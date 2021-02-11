import * as React from 'react';
import { graphql } from 'gatsby';
import Newsletter from '../components/Newsletter';
import Link from '../components/Link';
import RutronikLogo from '../images/rutronik-logo.svg';
import UbLogo from '../images/ub-logo.svg';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import VdhLogo from '../images/vhir-logo.svg';
import { FaArrowRight as ArrowRight, FaGraduationCap } from 'react-icons/fa';
import { IoFlask } from 'react-icons/io5';
import { IoIosLaptop } from 'react-icons/io';
import { BiNews as NewIcon } from 'react-icons/bi';
import {
  IoGitBranchOutline as GitBranchIcon,
  IoCodeSlash as CodeIcon,
} from 'react-icons/io5';
import AgileIcon from '../images/agile-icon-v2.svg';
import {
  Heading,
  Flex,
  Button,
  Container,
  LinkBox,
  LinkOverlay,
  Box,
  Text,
  Icon,
  Image,
  List,
  ListItem,
  ListIcon,
  Tag,
  useTheme,
} from '@chakra-ui/react';

type TIndexPageProps = {
  data: any;
};

const IndexPage = ({ data }: TIndexPageProps) => {
  const theme = useTheme();
  return (
    <Flex
      height="100%"
      direction="column"
      wrap="nowrap"
      alignItems="stretch"
      justifyContent="stretch"
    >
      <Seo title={'Inicio'} />
      <NavBar />
      <Container maxW="container.md" width="100%" flexGrow={1}>
        <Box
          width="100%"
          height="100vh"
          zIndex={-1}
          position="absolute"
          top={0}
          left={0}
          right={0}
          sx={{
            height: 'calc(100vh - 128px)',
            '@supports (backdrop-filter: none)': {
              height: 'calc(100vh - 64px)',
            },
            video: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            },
          }}
        >
          <video autoPlay muted loop playsInline>
            <source src="/videos/cabecera-web.mp4" type="video/mp4" />
          </video>
        </Box>
        <Container
          display="flex"
          alignContent="flex-start"
          justifyContent="center"
          flexDirection="column"
          maxWidth={'60ch'}
          p={0}
          minHeight="550px"
          minWidth="285px"
          sx={{
            height: 'calc(100vh - 128px)',
            margin: 0,
            '@supports (backdrop-filter: none)': {
              height: 'calc(100vh - 64px)',
              marginTop: '32px',
            },
          }}
        >
          <Heading as="h1" m={0}>
            Microcontroladores para Aplicaciones y Sistemas Biomédicos
          </Heading>
          <Text as="div" my={4} color="whiteAlpha.700">
            Introducción para ingenieros biomédicos a la programación de
            microntroladores a bajo nivel, flujos de trabajo en equipo basados
            en el sistema control de versiones Git, y la gestion ágil de
            proyectos.
          </Text>
          <Flex wrap="wrap" gridRowGap={2} gridColumnGap={4}>
            <LinkBox>
              <Button
                variant="solid"
                rightIcon={<ArrowRight />}
                sx={{
                  '& a:hover': { textDecoration: 'none' },
                  '& a': { color: 'gray.800' },
                }}
              >
                <LinkOverlay as={Link} href="/portafolios" color="inherit">
                  Ver portafolios de estudiantes
                </LinkOverlay>
              </Button>
            </LinkBox>
            <LinkBox>
              <Button
                variant="outline"
                sx={{
                  '& a:hover': { textDecoration: 'none' },
                  '& a': { color: 'teal.200' },
                }}
              >
                <LinkOverlay as={Link} href="/acerca-de" color="inherit">
                  Más acerca de MASB
                </LinkOverlay>
              </Button>
            </LinkBox>
          </Flex>
        </Container>

        <Box my={{ base: 16, sm: 32 }}>
          <Heading
            as="h2"
            fontSize="2xl"
            textAlign={{ base: 'left', sm: 'center' }}
            mb={8}
          >
            La industria y la investigación llevados al aula
          </Heading>
          <Flex
            as="ul"
            wrap="wrap"
            alignItems="flex-start"
            alignContent="center"
            justifyContent="space-evenly"
            gridColumnGap={8}
            gridRowGap={16}
            style={{ listStyle: 'none', padding: 0 }}
            sx={{
              li: {
                flex: '1 1 0px',
                minWidth: '200px',
                flexDirection: 'column',
                alignItems: 'stretch',
                alignContent: 'flex-start',
                rowGap: 4,
                div: {
                  textAlign: 'left',
                },
              },
            }}
          >
            <Flex as="li">
              <Icon as={IoIosLaptop} color="teal.200" w="60px" h="60px" />
              <Text as="div" fontWeight="bold" fontSize="lg" mt={2} mb={1}>
                B-learning
              </Text>
              <Text as="div" fontSize="sm">
                Se prioriza el desarrollo de procesos cognitivos de mayor
                complejidad en el aula para favorecer el aprendizaje
                significativo.
              </Text>
            </Flex>
            <Flex as="li">
              <Icon as={IoFlask} color="teal.200" w="60px" h="60px" />
              <Text as="div" fontWeight="bold" fontSize="lg" mt={2} mb={1}>
                Proyectos de aplicación real
              </Text>
              <Text as="div" fontSize="sm">
                El proyecto que se realiza siempre está ligado a una aplicación
                real de investigación, transferencia o industrial previamente
                validado.
              </Text>
            </Flex>
            <Flex as="li">
              <Icon as={FaGraduationCap} color="teal.200" w="60px" h="60px" />
              <Text as="div" fontWeight="bold" fontSize="lg" mt={2} mb={1}>
                Learning-by-doing
              </Text>
              <Text as="div" fontSize="sm">
                Metodología basada en la práctica que obliga a interactuar con
                el entorno y adaptarse a él con el objetivo de lograr un
                aprendizaje más eficaz y con mejores resultados.
              </Text>
            </Flex>
            <Flex as="li">
              <Icon as={GitBranchIcon} color="teal.200" w="60px" h="60px" />
              <Text as="div" fontWeight="bold" fontSize="lg" mt={2} mb={1}>
                Flujos de trabajo en equipo
              </Text>
              <Text as="div" fontSize="sm">
                Se aprende a trabajar en equipo utilizando herramientas y flujos
                de trabajo en equipo que permiten colaborar en proyectos de gran
                envergadura.
              </Text>
            </Flex>
            <Flex as="li">
              <Icon as={CodeIcon} color="teal.200" w="60px" h="60px" />
              <Text as="div" fontWeight="bold" fontSize="lg" mt={2} mb={1}>
                Programación en C/C++
              </Text>
              <Text as="div" fontSize="sm">
                Los dos lenguajes de programación más utilizados en el ámbito de
                los sistemas embebidos. Su madurez y alta presencia en el
                ámbito, los hacen indispensables en el portafolios de un
                profesional en la programación de microcontroladores.
              </Text>
            </Flex>
            <Flex as="li">
              <Icon as={AgileIcon} color="teal.200" w="60px" h="60px" />
              <Text as="div" fontWeight="bold" fontSize="lg" mt={2} mb={1}>
                Gestión ágil de proyectos
              </Text>
              <Text as="div" fontSize="sm">
                Gestión iterativa que permite la entrega continua y la
                integración de la retroalimentación del entorno.{' '}
                <i>Learning-by-doing</i>: se utiliza la gestión ágil para el
                propio desarrollo de la asignatura.
              </Text>
            </Flex>
          </Flex>
        </Box>

        <Box my={32}>
          <Heading
            as="h2"
            fontSize="2xl"
            textAlign={{ base: 'left', sm: 'center' }}
            mb={8}
          >
            Proyectos
          </Heading>
          <Flex
            direction="column"
            wrap="nowrap"
            alignItems="stretch"
            alignContent="center"
            justifyContent="space-evenly"
            gridColumnGap={2}
            gridRowGap={8}
          >
            <Text as="div" fontWeight="bold" fontSize="lg">
              Potenciostato portable
            </Text>
            <Flex
              alignContent="stretch"
              sx={{
                direction: 'row',
                alignItems: 'flex-start',
                '@media (max-width: 625px)': {
                  flexDirection: 'column',
                  alignItems: 'stretch',
                },
              }}
              gridColumnGap={8}
              gridRowGap={8}
            >
              <Image src="/imgs/potenciostato-portable.jpg" />
              <Box>
                <Text mt={0}>
                  En este proyecto se desarrolla un potenciostato portable
                  alimentado mediante puerto USB capaz de realizar
                  cronoamperometrías (CA) y voltametrías cíclicas (CV) con un
                  rango de medición de corriente que va de los 65 mA hasta 1
                  &mu;A en un rango de tensión de &plusmn;3.3 V.
                </Text>
                <Text mb={0}>
                  Este proyecto nace de la colaboración con el{' '}
                  <Link href="http://es.vhir.org/portal1/grup-presentacio.asp?s=recerca&contentid=187667&idrefer=187668">
                    Institut de Recerca de la Vall d'Hebrón
                  </Link>{' '}
                  para el desarrollo de dispositivos de detección y diagnóstico
                  de enfermedades.{' '}
                  <Link href="https://www.mdpi.com/1424-8220/19/24/5388">
                    [Referencia]
                  </Link>
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Box>
        {/*
    <Box my={32}>
      <Heading
        as="h2"
        fontSize="2xl"
        textAlign={{ base: 'left', sm: 'center' }}
        mb={8}
      >
        Entidades colaboradoras
      </Heading>
      <Flex
        wrap="wrap"
        alignItems="center"
        alignContent="center"
        justifyContent="space-evenly"
        gridColumnGap={2}
        gridRowGap={8}
      >
        <Icon as={UbLogo} w="auto" h="60px" />
        <Icon as={VdhLogo} w="auto" h="60px" />
        <Icon as={RutronikLogo} w="auto" h="60px" p={2} />
      </Flex>
    </Box>
    */}
        <Box my={32}>
          <Heading
            as="h2"
            fontSize="2xl"
            textAlign={{ base: 'left', sm: 'center' }}
            mb={8}
          >
            Noticias
          </Heading>
          <List spacing={3} pl={0}>
            {data.news.nodes.map((_new: any, index: number) => (
              <LinkBox key={index}>
                <ListItem display="flex" flexWrap="wrap">
                  <Box
                    flexGrow={1}
                    style={{ marginLeft: '24px', textIndent: '-24px' }}
                  >
                    <ListIcon as={NewIcon} color="teal.200" />
                    {_new.frontmatter.title}{' '}
                    <LinkOverlay href={_new.fields.slug}>
                      Leer notícia
                    </LinkOverlay>
                  </Box>
                  <Tag
                    flexGrow={0}
                    ml="24px"
                    variant="subtle"
                    colorScheme="teal"
                    size="sm"
                  >
                    {new Date(_new.frontmatter.date).toLocaleDateString(
                      'es-ES',
                      {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }
                    )}
                  </Tag>
                </ListItem>
              </LinkBox>
            ))}
          </List>
        </Box>
        {/* 
    <Box my={32}>
      <Heading
        as="h2"
        fontSize="2xl"
        textAlign={{ base: 'left', sm: 'center' }}
        mb={16}
      >
        Eventos
      </Heading>
      <Flex
        wrap="wrap"
        alignItems="center"
        alignContent="center"
        justifyContent="space-evenly"
        gridColumnGap={2}
        gridRowGap={8}
      ></Flex>
    </Box>

    <Box my={32}>
      <Heading
        as="h2"
        fontSize="2xl"
        textAlign={{ base: 'left', sm: 'center' }}
        mb={16}
      >
        Opiniones
      </Heading>
      <Flex
        wrap="wrap"
        alignItems="center"
        alignContent="center"
        justifyContent="space-evenly"
        gridColumnGap={2}
        gridRowGap={8}
      ></Flex>
    </Box>
      */}
        {/*
    <Box my={32}>
      <Heading
        as="h2"
        fontSize="2xl"
        textAlign={{ base: 'left', sm: 'center' }}
        mb={16}
      >
        Contacto
      </Heading>
      <Flex
        wrap="wrap"
        alignItems="center"
        alignContent="center"
        justifyContent="space-evenly"
        gridColumnGap={2}
        gridRowGap={8}
      ></Flex>
    </Box> */}
      </Container>
      <Box
        mt={-16}
        mb={-8}
        py={8}
        backgroundColor={'teal.200'}
        color={theme.colors.bgColor}
      >
        <Container maxW="container.md">
          <Heading
            as="h2"
            fontSize="2xl"
            textAlign={{ base: 'left', sm: 'center' }}
            mb={8}
          >
            Newsletter
          </Heading>
          <Flex
            wrap="wrap"
            alignItems="center"
            alignContent="center"
            justifyContent="space-evenly"
            gridColumnGap={2}
            gridRowGap={8}
          >
            <Newsletter />
          </Flex>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
};

export default IndexPage;

export const query = graphql`
  {
    news: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "news" } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        frontmatter {
          title
          date
          tags
        }
        fields {
          slug
        }
      }
    }
  }
`;
