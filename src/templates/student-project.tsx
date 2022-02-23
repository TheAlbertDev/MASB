import React from 'react';
import 'katex/dist/katex.min.css';
import { graphql, PageProps } from 'gatsby';
import Layout from '../components/Layout';
import Paper from '../components/Paper';
import {
  Flex,
  Avatar,
  Text,
  HStack,
  Button,
  Link as ChakraLink,
  Heading,
  Tag,
} from '@chakra-ui/react';
import { IoLogoGithub } from 'react-icons/io5';
import {
  FaLinkedin as LinkedinIcon,
  FaEnvelope as EmailIcon,
} from 'react-icons/fa';
import ProjectMap from '../../content/maps/projects.yml';

type TStudentProjectProps = {
  data: any;
  location: PageProps['location'];
};

const StudentProject = ({ data, location }: TStudentProjectProps) => {
  const project = data.markdownRemark;
  const title = project.frontmatter.title;
  return (
    <Layout title={title} location={location}>
      <Text mt={{ base: 24, sm: 32 }} fontSize="sm" as="div">
        {new Date(project.frontmatter.date).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Heading as="h1" mt={0} mb={2}>
        {project.frontmatter.title}
      </Heading>
      <Tag size="sm" variant="subtle" mb={12}>
        {ProjectMap[project.frontmatter.project].es}
      </Tag>
      <Flex direction="row" wrap="wrap" gridGap={6} my={2}>
        {project.frontmatter.students.map((student: any, index: number) => {
          return (
            <Paper
              key={index}
              direction="row"
              padding="8px 16px"
              gridGap={4}
              alignItems="center"
              flex="1 1 0px"
            >
              <Avatar
                name={student.name}
                src={
                  student.picture?.childrenImageSharp[0].gatsbyImageData.images
                    .fallback.src
                }
                borderColor="teal.200"
                borderWidth={2}
              />
              <Flex direction="column">
                <Text overflowWrap="break-word" whiteSpace="nowrap" as="div">
                  {student.name}
                </Text>
                <HStack sx={{ a: { color: 'teal.200' } }}>
                  {student.email && (
                    <ChakraLink href={`mailto:${student.email}`}>
                      <EmailIcon />
                    </ChakraLink>
                  )}
                  {student.linkedin && (
                    <ChakraLink
                      href={`https://www.linkedin.com/in/${student.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      <LinkedinIcon />
                    </ChakraLink>
                  )}
                </HStack>
              </Flex>
            </Paper>
          );
        })}
      </Flex>
      <ChakraLink
        href={project.frontmatter.repo}
        target="_blank"
        rel="noopener noreferrer nofollow"
        sx={{ '&:hover': { textDecoration: 'none' } }}
      >
        <Button
          my={4}
          mb={16}
          leftIcon={<IoLogoGithub size={20} />}
          size="sm"
          variant="outline"
        >
          Ver código fuente
        </Button>
      </ChakraLink>
      <section
        dangerouslySetInnerHTML={{ __html: project.html }}
        className="student-project"
      />
    </Layout>
  );
};

export default StudentProject;

export const pageQuery = graphql`
  query StudentProjectById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        students {
          name
          linkedin
          email
          picture {
            id
            childrenImageSharp {
              gatsbyImageData
            }
          }
        }
        title
        date(formatString: "MMMM DD, YYYY")
        project
        repo
      }
    }
  }
`;
