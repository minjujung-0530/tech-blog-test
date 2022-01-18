import React, { Fragment, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import PostList from "../components/Main/PostList"
import { sourceNodes } from "gatsby-source-notion-api/gatsby-node"
import { Client } from "@notionhq/client"

const IndexPage = ({ serverData }) => {
  // const {
  //   allNotion: { edges },
  // } = useStaticQuery(query)

  console.log(serverData)

  return (
    <Fragment>
      {/* <PostList pages={edges} /> */}
      {serverData.results.map(r => (
        <div key={r.id}>{r.id}</div>
      ))}
    </Fragment>
  )
}

export default IndexPage

export async function getServerData() {
  const notion = new Client({ auth: process.env.NOTION_INTEGRATION_TOKEN })
  const databaseId = process.env.NOTION_DATABASE_ID
  try {
    const result = await fetch(
      "https://api.notion.com/v1/databases/f66491ca3532448287a3f6015ec5cd55",
      {
        headers: {
          "Content-Type": "application/json",
          "Notion-Version": "2021-05-13",
          Authorization: `Bearer secret_LP9YjD3KhbXMQRz6CgpKJotwc5CcfoyUATqk5kEFaB9`,
        },
      }
    ).then(res => res.json())

    const myPage = await notion.databases.query({
      database_id: result.id,
    })

    return { props: myPage }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}

// export const query = graphql`
//   query Myquery {
//     allNotion {
//       edges {
//         node {
//           childrenMarkdownRemark {
//             html
//             id
//             fields {
//               slug {
//                 title
//                 author {
//                   name
//                   avatar_url
//                 }
//                 tag {
//                   name
//                   color
//                 }
//                 date {
//                   start(formatString: "YYYY.MM.DD")
//                 }
//               }
//             }
//             frontmatter {
//               title
//               author {
//                 id
//                 name
//                 avatar_url
//               }
//               tag {
//                 id
//                 name
//                 color
//               }
//               date {
//                 start(formatString: "YYYY.MM.DD")
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
