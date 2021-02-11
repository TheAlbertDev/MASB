import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import StudentProjects from '../components/StudentProjectCard';
import { Flex, Select, Alert, AlertIcon, Heading } from '@chakra-ui/react';
import ProjectMap from '../../content/maps/projects.yml';

const PortafoliosPage = ({ data }: any) => {
  const [filter, setFilter] = React.useState<{
    year: number | '';
    project: string | '';
  }>({ year: '', project: '' });

  const projects = data.allMarkdownRemark.nodes;

  const years = projects
    .map((project: any) => new Date(project.frontmatter.date).getFullYear())
    .filter(
      (year: number, index: number, years: Array<number>) =>
        years.indexOf(year) == index
    );

  return (
    <Layout title="Portafolios">
      <Heading as="h1" mt={{ base: 24, sm: 32 }}>
        Portafolios
      </Heading>
      <Alert status="info" borderRadius={6} fontSize="sm">
        <AlertIcon />
        Los proyectos aquí expuestos se muestran tal cual fueron presentados.
      </Alert>
      <Flex
        direction="row"
        wrap="wrap"
        alignContent="flex-start"
        alignItems="center"
        gridGap={4}
        my={8}
      >
        <Select
          placeholder="Año"
          flexGrow={0}
          width="content"
          borderColor="teal"
          value={filter.year}
          onChange={e =>
            setFilter(prevState => ({
              ...prevState,
              year: e.target.value && parseInt(e.target.value),
            }))
          }
        >
          {years
            .sort((a: number, b: number) => b - a)
            .map((year: number, index: number) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))}
        </Select>
        <Select
          placeholder="Proyecto"
          flexGrow={0}
          width="content"
          borderColor="teal"
          value={filter.project}
          onChange={e =>
            setFilter(prevState => ({
              ...prevState,
              project: e.target.value,
            }))
          }
        >
          {Object.keys(ProjectMap)
            .sort()
            .map((projectType, index) => (
              <option value={projectType} key={index}>
                {ProjectMap[projectType].es}
              </option>
            ))}
        </Select>
      </Flex>

      <Flex direction="column" gridGap={8}>
        {projects.map((project: any, index: number) => {
          if (
            filter.year !== '' &&
            new Date(project.frontmatter.date).getFullYear() != filter.year
          )
            return;
          if (
            filter.project !== '' &&
            project.frontmatter.project !== filter.project
          )
            return;
          return (
            <StudentProjects
              key={index}
              title={project.frontmatter.title}
              slug={project.fields.slug}
              project={project.frontmatter.project}
              repo={project.frontmatter.repo}
              year={new Date(project.frontmatter.date).getFullYear()}
              students={project.frontmatter.students.map((student: any) => ({
                name: student.name,
                picture:
                  student.picture?.childrenImageSharp[0].gatsbyImageData.images
                    .fallback.src,
              }))}
            />
          );
        })}
      </Flex>
    </Layout>
  );
};

export default PortafoliosPage;

export const query = graphql`
  {
    allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "student-projects" } }
        frontmatter: { language: { eq: "es" } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        fields {
          slug
        }
        id
        frontmatter {
          title
          project
          repo
          date
          students {
            name
            picture {
              id
              childrenImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;
