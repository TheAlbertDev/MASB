const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// Add `contentType` to Markdown files to filter by content type,
// and a `slug` field
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const parent = getNode(node.parent);
    createNodeField({
      node,
      name: 'contentType',
      value: parent.sourceInstanceName,
    });

    const language = String(node.frontmatter.language);
    let value = createFilePath({ node, getNode, trailingSlash: false });

    if (parent.sourceInstanceName === 'student-projects') {
      value = path.posix.normalize(
        path.posix.join(
          '/',
          'portafolios',
          'proyectos-estudiantes',
          value,
          '..'
        )
      );
    }

    if (parent.sourceInstanceName === 'news') {
      value = path.posix.normalize(path.posix.join('/', 'noticias', value));
    }

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

//Create a page for each student project
exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      studentProjects: allMarkdownRemark(
        filter: { fields: { contentType: { eq: "student-projects" } } }
      ) {
        nodes {
          fields {
            slug
          }
          id
        }
      }
      news: allMarkdownRemark(
        filter: { fields: { contentType: { eq: "news" } } }
      ) {
        nodes {
          fields {
            slug
          }
          id
        }
      }
    }
  `);
  data.studentProjects.nodes.forEach(node => {
    const slug = node.fields.slug;
    const id = node.id;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/student-project.tsx`),
      context: {
        id,
      },
    });
  });

  data.news.nodes.forEach(node => {
    const slug = node.fields.slug;
    const id = node.id;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/new.tsx`),
      context: {
        id,
      },
    });
  });
};
