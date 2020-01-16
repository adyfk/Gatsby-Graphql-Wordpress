/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  createRedirect({ fromPath: '/', toPath: '/home', redirectInBrowser: true, isPermanent: true })

  const result = await graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            path
            status
            template
            title
            content
            template
          }
        }
      }
      allWordpressPost {
        edges {
          node {
            id
            path
            status
            format
            title
            content
            template
          }
        }
      }
      allWordpressWpPortofolio {
        edges {
          node{
            id
            path
            title
            excerpt
            featured_media {
              source_url
            }
            content
            acf{
              portofolio_url
            }
          }
        }
      }
      allWordpressPost {
        edges {
          node{
            excerpt
            wordpress_id
            date(formatString:"Do MM YYYY HH:mm")
            title
            slug
            content
          }
        }
      }
    }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Access query results via object destructuring
  const { allWordpressPage, allWordpressPost, allWordpressWpPortofolio } = result.data
  const portofolioUnderContentTemplate = path.resolve(`./src/templates/portofolioUnderContent.js`)
  // Create Page pages.
  const pageTemplate = path.resolve(`./src/templates/page.js`)

  allWordpressPage.edges.forEach(edge => {
    const { path, ...context } = edge.node
    createPage({
      path,
      component: slash(
        edge.node.template === 'portofolio_under_content.php' ?
          portofolioUnderContentTemplate :
          pageTemplate
      ),
      context
    })
  })

  // const postTemplate = path.resolve(`./src/templates/post.js`)

  // allWordpressPost.edges.forEach(edge => {
  //   const { path, ...context } = edge.node
  //   createPage({
  //     path: `/post${path}`,
  //     component: slash(
  //       edge.node.template === 'portofolio_under_content.php' ?
  //         portofolioUnderContentTemplate :
  //         postTemplate
  //     ),
  //     context
  //   })
  // })
  const portofolioTemplate = path.resolve(`./src/templates/portofolio.js`)

  allWordpressWpPortofolio.edges.forEach(edge => {
    const { path, ...context } = edge.node;
    createPage({
      path,
      component: slash(portofolioTemplate),
      context
    })
  })

  const blogPostListTemplate = path.resolve(`./src/templates/blogPostList.js`)

  const posts = allWordpressPost.edges
  const postPerPage = 2
  const numberOfPage = Math.ceil(posts.length / postPerPage)

  Array.from({
    length: numberOfPage
  }).forEach((edge, index) => {
    createPage({
      path: index === 0 ? `/blog` : `/blog/${index + 1}`,
      component: slash(blogPostListTemplate),
      context: {
        posts: posts.slice(index * postPerPage, (index * postPerPage) + postPerPage),
        numberOfPage,
        currentPage: index + 1
      }
    })
  })

  posts.forEach(post => {
    const { path, ...context } = post.node
    createPage({
      path: `/blog${post.node.path}`,
      component: slash(pageTemplate),
      context
    })
  })
}