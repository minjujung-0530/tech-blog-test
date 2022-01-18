// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }

const path = require("path")

// Generate a Slug Each Post Data
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = node.frontmatter

    createNodeField({ node, name: "slug", value: slug })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // Get All Markdown File For Paging
  const queryAllMarkdownData = await graphql(
    `
      {
        allNotion {
          edges {
            node {
              childMarkdownRemark {
                html
                id
                fields {
                  slug {
                    title
                    author {
                      name
                      avatar_url
                    }
                    tag {
                      name
                      color
                    }
                    date {
                      start(formatString: "YYYY.MM.DD")
                    }
                  }
                }
                frontmatter {
                  title
                  author {
                    name
                    avatar_url
                  }
                  tag {
                    name
                    color
                  }
                  date {
                    start(formatString: "YYYY.MM.DD")
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  // Handling GraphQL Query Error
  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`)
    return
  }

  // Import Post Template Component
  const PostTemplateComponent = path.resolve(
    __dirname,
    "src/templates/post_template.js"
  )

  // Page Generating Function
  const generatePostPage = ({ node: { childMarkdownRemark } }) => {
    const pageOptions = {
      path: childMarkdownRemark.fields.slug.title,
      component: PostTemplateComponent,
      context: childMarkdownRemark.fields.slug,
    }

    createPage(pageOptions)
  }

  // Generate Post Page And Passing Slug Props for Query
  queryAllMarkdownData.data.allNotion.edges.forEach(generatePostPage)
}
