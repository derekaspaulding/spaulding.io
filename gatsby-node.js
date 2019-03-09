const path = require('path');
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ( { node, getNode, actions } ) => {
  const { createNodeField } = actions;

  if(node.internal.type === 'MarkdownRemark') {
    const relativePath = createFilePath({ node, getNode, basePath: `src/pages/blog/posts` });
    const { date } = node.frontmatter;
    createNodeField({
      node,
      name: 'slug',
      value: `/blog${relativePath}`,
  })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve('./src/components/templates/blogPost.jsx')
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post) => {
      createPage({
        path: post.node.fields.slug,
        component: postTemplate,
        context: {
          slug: post.node.fields.slug,
        }
      })
    })

    return null;
  })
}