import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputBase,
  styled,
  TextareaAutosize,
  TextField,
} from "@mui/material";

import { AddCircle as Add } from "@mui/icons-material";

import { toast } from "react-toastify";

import { DataContext } from "../../store/DataProvider";
import { API } from "../../service/api";
import { getDefaultPoster } from "../../utils/common-utils";

const Component = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    minHeight: "100vh",
  },
}));

const Wrapper = styled(FormControl)(({ theme }) => ({
  margin: "20px auto",
  padding: "30px",
  width: "80%",
  maxWidth: "1280px",
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0 0 0 / 0.2)',
  borderRadius: 5,
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "10px",
    h1: {
      margin: "20px 0 0 0",
    },
  },
}));

const Heading = styled("h1")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: "22px",
  },
}));

const BlogPoster = styled(Box)`
  margin: 0 auto;
  width: 100%;
  max-height: 300px;
  aspect-ratio: 24/9;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & > label {
    position: absolute;
    opacity: 0.5;
  }

  &:hover {
    & > img {
      opacity: 0.34;
    }
    & > label {
      cursor: pointer;
      opacity: 1;
    }
  }
`;

const Title = styled(TextField)`
  background: #f9f9f9;
`;

const Category = styled(TextField)`
  background: #f9f9f9;
`;

const StyledTextArea = styled(TextField)`
  background: #f9f9f9;
`;

const CreatePost = () => {
  const { account } = useContext(DataContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
    poster: "",
    username: account.username,
    category: location.search?.split("=")[1] || "All",
  });

  const [file, setFile] = useState("");

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const formData = new FormData();
        formData.append("name", file[0].name);
        formData.append("file", file[0]);
        try {
          // API call
          const response = await API.uploadFile(formData);
          post.poster = response.data.imageUrl;
        } catch (error) {
          toast.error(error.responseMsg);
        }
      }
    };
    getImage();
  }, [file, post]);

  const handleInputChange = (e) =>
    setPost({ ...post, [e.target.name]: e.target.value });

  const savePost = async () => {
    if (!post.title.trim()) {
      // alert("Title shouldn't be empty");
      toast.warning("Title shouldn't be empty");
      return;
    }
    if (!post.description.trim()) {
      toast.warning("Description shouldn't be empty");
      return;
    }
    try {
      const response = await API.createPost(post);
      if (response.isSuccess) {
        toast.success("Post created");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.responseMsg);
    }
  };

  return (
    <Component>
      <Wrapper>
        <Heading style={{ color: "#343434" }}>Create Post</Heading>
        <BlogPoster>
          <img src={post.poster ? post.poster : getDefaultPoster()} alt="" />
          <label htmlFor="fileInput">
            <Add fontSize="large" color="action" />
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files)}
            style={{ display: "none" }}
          />
        </BlogPoster>
        <Title
          size="small"
          name="title"
          value={post.title}
          onChange={(e) => handleInputChange(e)}
          label="Title"
        />
        <Category
          size="small"
          name="category"
          value={post.category}
          onChange={(e) => handleInputChange(e)}
          label="Category"
        />
        <StyledTextArea
          name="description"
          value={post.description}
          onChange={(e) => handleInputChange(e)}
          multiline
          minRows={7}
          label="Description"
        />
        <Grid container gap={2} justifyContent="end">
          {/* <Grid item>
            <Button variant="contained" color="success">
              Save
            </Button>
          </Grid> */}
          <Grid item>
            <Button variant="contained" onClick={() => savePost()}>
              Publish
            </Button>
          </Grid>
        </Grid>
      </Wrapper>
    </Component>
  );
};

export default CreatePost;
