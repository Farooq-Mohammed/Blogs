import React from "react";
import { Box, Typography, styled } from "@mui/material";

import { getDefaultPoster } from "../../utils/common-utils";

const Container = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background: #fff;
  box-shadow: 2px 2px 10px #00000026;
  overflow: hidden;
  & > p {
    padding: 0 5px;
  }
`;

const Image = styled("img")({
  maxHeight: "240px",
  width: "100%",
  objectFit: "cover",
  marginBottom: "3px",
});

const Text = styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const Title = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  margin: 10px 3px;

  // ellipsis effect
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

const Description = styled(Typography)`
  font-size: 14px;
  margin: 0 3px 25px;

  // ellipsis effect
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
`;

const Post = ({ post }) => {
  return (
    <Container>
      <Image
        src={post.poster ? post.poster : getDefaultPoster()}
        alt="Poster"
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px 10px",
        }}
      >
        <Text>
          Author: <b>{post.username}</b>
        </Text>
        <Text>
          Category: <b>{post.category}</b>
        </Text>
      </Box>
      <Title>{post.title}</Title>
      <Description>{post.description}</Description>
    </Container>
  );
};

export default Post;
