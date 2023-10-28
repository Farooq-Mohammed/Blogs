import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
  // minHeight: "calc(100vh - 78px)",
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

const EditPost = () => {
  const { account } = useContext(DataContext);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState({
    title: "",
    description: "",
    poster: "",
    username: account.username,
    category: location.search?.split("=")[1] || "All",
  });

  const [file, setFile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) setPost(response.data);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const formData = new FormData();
        formData.append("name", file[0].name);
        formData.append("file", file[0]);
        try {
          // API call
          const response = await API.uploadFile(formData);
          setPost((prev) => ({ ...prev, poster: response.data.imageUrl }));
        } catch (error) {
          toast.error(error.responseMsg);
        }
      }
    };
    getImage();
  }, [file, setPost]);

  const handleInputChange = (e) =>
    setPost({ ...post, [e.target.name]: e.target.value });

  const updatePost = async () => {
    if (!post.title.trim()) {
      alert("Title shouldn't be empty");
      return;
    }
    if (!post.description.trim()) {
      alert("Description shouldn't be empty");
      return;
    }
    let response = await API.updatePost(post);
    if (response.isSuccess) {
      navigate(`/post/${id}`);
    }
  };

  return (
    <Component>
      <Wrapper>
        <h1 style={{ color: "#343434" }}>Edit Post</h1>
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
        <TextField
          size="small"
          name="title"
          value={post.title}
          onChange={(e) => handleInputChange(e)}
          label="Title"
          style={{ background: "#f9f9f9" }}
        />
        <TextField
          size="small"
          name="category"
          value={post.category}
          onChange={(e) => handleInputChange(e)}
          label="Category"
          style={{ background: "#f9f9f9" }}
        />
        <TextField
          name="description"
          value={post.description}
          onChange={(e) => handleInputChange(e)}
          multiline
          minRows={7}
          label="Description"
          style={{ background: "#f9f9f9" }}
        />

        <Grid container gap={2} justifyContent="end">
          <Grid item>
            <Button variant="contained" color="success">
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => updatePost()}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Wrapper>
    </Component>
  );
};

export default EditPost;
