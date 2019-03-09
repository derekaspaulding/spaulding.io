module.exports = {
  plugins: [
    'gatsby-plugin-less', 
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/pages/blog/posts`,
      },
    },
  ],
}