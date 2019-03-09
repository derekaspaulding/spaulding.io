import React from 'react';
import styles from './blogPost.module.less';
import { graphql } from "gatsby"
import Layout from '../layouts/MainLayout'

const BlogPostTemplate = ({ data }) => { 
  const post = data.markdownRemark;

  return (
    <Layout title={post.frontmatter.title}>
      <div className={styles.post} dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export default BlogPostTemplate;

export const query = graphql`
query PostQuery($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html,
    frontmatter {
      title,
      date
    }
  }
}
`