import * as React from "react"
import { Link } from "gatsby"
import { Client } from "@notionhq/client"

import Layout from "../components/layout"
import Seo from "../components/seo"

const UsingSSR = props => {
  console.log(props)
  return (
    <Layout>
      <Seo title="Using SSR" />
      <h1>SSR page</h1>
      {/* <img
        style={{ width: "300px" }}
        alt="A random dog"
        src={serverData.message}
      />
      <p>Welcome to a server side rendered page with a random dog photo</p>
      <p>
        To learn more, head over to our{" "}
        <a href="https://www.gatsbyjs.com/docs/reference/rendering-options/server-side-rendering/">
          documentation about Server Side Rendering
        </a>
        .
      </p>
      <Link to="/">Go back to the homepage</Link> */}
    </Layout>
  )
}

export default UsingSSR

// export async function getServerData() {
//   const url = `https://api.notion.com/v1/databases/f66491ca3532448287a3f6015ec5cd55/query`
//   const body = {
//     page_size: 100,
//   }
//   const notionVersion = "2021-05-13"
//   try {
// const result = await fetch(url, {
//   method: "",
//   body: JSON.stringify(body),
//   headers: {
//     "Content-Type": "application/json",
//     "Notion-Version": notionVersion,
//     Authorization: `Bearer secret_LP9YjD3KhbXMQRz6CgpKJotwc5CcfoyUATqk5kEFaB9`,
//   },
// }).then(res => res.json())

//     return result.results
//   } catch (error) {
//     console.log(error)
//   }
// }

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

    // const pages = []

    // for (let page of result.results) {
    //   page = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Notion-Version": "2021-05-13",
    //       Authorization: `Bearer secret_LP9YjD3KhbXMQRz6CgpKJotwc5CcfoyUATqk5kEFaB9`,
    //     },
    //   }).then(res => res.json())

    //   pages.push(page)
    // }

    return { props: myPage }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
