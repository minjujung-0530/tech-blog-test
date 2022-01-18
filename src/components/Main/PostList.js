import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import PostAuthor from "../Post/PostAuthor"
import PostTag from "../Post/PostTag"

const PostList = ({ pages }) => {
  const pageList = pages.map(page => {
    const {
      node: { childrenMarkdownRemark },
    } = page

    const pageInfo = childrenMarkdownRemark[0]

    return {
      frontmatter: pageInfo.frontmatter,
      fields: pageInfo.fields,
      id: pageInfo.id,
    }
  })
  return (
    <>
      {pageList.map(
        ({
          frontmatter: {
            author,
            date: { start },
            tag,
            title,
          },
          fields,
          id,
        }) => (
          <Link key={id} to={fields.slug.title}>
            <h3>{title}</h3>
            <PostAuthor authors={author} />
            <PostTag tags={tag} />
            <p>{start}</p>
          </Link>
        )
      )}
    </>
  )
  //   <h1>{title}</h1>
  //   <h2>{name}</h2>
  //   <img src={avatar_url} alt="profile_image" />
  //   <h5>{tagName}</h5>
  //   <div
  //     dangerouslySetInnerHTML={{
  //       __html: html,
  //     }}
  //   />
}

export default PostList
