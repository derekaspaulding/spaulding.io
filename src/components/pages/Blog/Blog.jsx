import React from 'react';
import styles from './blog.module.less';
import MainLayout from '../../layouts/MainLayout'
import { useStaticQuery, graphql, Link } from 'gatsby'

export default () => {
  const data = useStaticQuery(query);
  const posts = data.allMarkdownRemark.edges;
  return (
    <MainLayout title="Blog">
      <div className={styles.postList}>
        {
          posts.map(({ node: post }) => ( 
            <div className={styles.post} key={post.fields.slug}>
              <Link to={post.fields.slug} className={styles.postLink}>{ post.frontmatter.title }</Link>
              <div className={styles.postDate}>{ post.frontmatter.date }</div>
              <p className={styles.postDescription}>{ post.frontmatter.description }</p>
            </div>
          ))
        }
      </div>
    </MainLayout>
  )
}

const query =  graphql`
query {
  allMarkdownRemark(
    limit: 1000,
    sort: { order: DESC, fields: [frontmatter___date] },
  ) {
    edges {
      node {
        excerpt
        html
        fields { slug }
        frontmatter {
          title
          date(formatString: "MMMM Do, YYYY")
          description
        }
      }
    }
  }
}
`;