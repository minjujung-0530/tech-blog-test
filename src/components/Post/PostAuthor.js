import React from "react"
import styled from "@emotion/styled"

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const PostAuthor = ({ authors }) => {
  return (
    <>
      {authors.map(author => (
        <div key={author.id}>
          <ProfileImage src={author.avatar_url} alt="author_profile" />
          <strong>{author.name}</strong>
        </div>
      ))}
    </>
  )
}

export default PostAuthor
