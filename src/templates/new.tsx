import React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '../components/Layout';
import Paper from '../components/Paper';
import { Text, Heading, Tag, Flex } from '@chakra-ui/react';

type TNewProps = {
  data: any;
  location: PageProps['location'];
};

const New = ({ data, location }: TNewProps) => {
  const _new = data.new;
  const title = _new.frontmatter.title;
  return (
    <Layout title={title} location={location}>
      <Text mt={{ base: 24, sm: 32 }} fontSize="sm" as="div">
        {new Date(_new.frontmatter.date).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Heading as="h1" mt={0} mb={2}>
        {_new.frontmatter.title}
      </Heading>
      <Flex gridRowGap={2} gridColumnGap={2} wrap="wrap" mb={12}>
        {_new.frontmatter.tags.map((tag: string, index: number) => (
          <Tag key={index} size="sm" variant="subtle">
            #{tag}
          </Tag>
        ))}
      </Flex>
      <section
        dangerouslySetInnerHTML={{ __html: _new.html }}
        className="new"
      />
    </Layout>
  );
};

export default New;

export const pageQuery = graphql`
  query NewById($id: String!) {
    new: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`;
