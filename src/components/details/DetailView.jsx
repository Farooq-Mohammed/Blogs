import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Box, Typography, styled } from "@mui/material";
import { Edit, Delete, AccessTime, Person } from "@mui/icons-material";

import { getDefaultPoster } from "../../utils/common-utils.js";
import { DataContext } from "../../store/DataProvider";
import { API } from "../../service/api";
import Comments from "./comments/Comments.jsx";

const Container = styled(Box)(({ theme }) => ({
  background: "#fff",
  margin: "30px auto",
  maxWidth: "1440px",
  width: "85%",
  [theme.breakpoints.down("sm")]: {
    margin: "15px 0",
    width: "100%",
  },
}));

const Image = styled("img")({
  width: "100%",
  aspectRatio: 16 / 9,
  maxHeight: "45vh",
  objectFit: "cover",
});

const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin: 55px 0 20px 0;
`;

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Wrapper = styled(Box)`
  padding: 20px 30px;
`;

const Author = styled(Box)`
  //   outline: 1px solid #000;
  color: #878787;
  margin: 20px 0;
  display: flex;
  gap: 22px;
  justify-content: space-between;
`;

const Description = styled(Typography)`
  margin: 50px auto;
`;

const DetailView = () => {
  const navigate = useNavigate();

  const { account } = useContext(DataContext);
  const { id } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPostById(id);
      setPost(response.data);
    };
    fetchData();
  }, [id]);

  const deletePost = async () => {
    let response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Image
        src={post.poster ? post.poster : getDefaultPoster()}
        alt="Blog Poster"
      />
      {account.username === post.username && (
        <Box style={{ float: "right" }}>
          <Link to={`/edit-post/${post._id}`}>
            <EditIcon color="primary" />
          </Link>
          <DeleteIcon color="error" onClick={() => deletePost()} />
        </Box>
      )}
      <Wrapper>
        <Title>{post.title}</Title>
        <Author>
          <Box
            component="span"
            sx={{ display: "flex", gap: "5px", alignItems: "center" }}
          >
            <Person />
            <Typography>{post.username}</Typography>
          </Box>
          <Box
            component="span"
            sx={{ display: "flex", gap: "5px", alignItems: "center" }}
          >
            <AccessTime fontSize="small" />{" "}
            <Typography>{new Date(post.createdAt).toDateString()}</Typography>
          </Box>
        </Author>
        <Description>{post.description}</Description>
        <Comments id={id} />
      </Wrapper>
    </Container>
  );
};

export default DetailView;
