import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import PostList from "../components/Main/PostList"
import { sourceNodes } from "gatsby-source-notion-api/gatsby-node"

const IndexPage = () => {
  const {
    allNotion: { edges },
  } = useStaticQuery(query)

  useEffect(async () => {
    await sourceNodes()
  }, [])

  return (
    <>
      <PostList pages={edges} />
    </>
  )
}

export default IndexPage

export const query = graphql`
  query Myquery {
    allNotion {
      edges {
        node {
          childrenMarkdownRemark {
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
                id
                name
                avatar_url
              }
              tag {
                id
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
