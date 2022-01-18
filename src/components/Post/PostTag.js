import React from "react"
import styled from "@emotion/styled"

const Tag = styled.span`
  width: 30px;
  height: 10px;
  margin-right: 3px;
  border-radius: 3px;
  background-color: ${props => props.color};
`

const PostTag = ({ tags }) => {
  return (
    <>
      {tags.map(tag => (
        <Tag key={tag.id} color={tag.color}>
          {tag.name}
        </Tag>
      ))}
    </>
  )
}

export default PostTag
