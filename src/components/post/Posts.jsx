import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { Box, Button, Grid, styled, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { API } from "../../service/api";
import Post from "./Post";

const Toolbar = styled(Box)`
  width: 100%;
  // margin: 1.2em 2em;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomSelect = styled(Box)`
  position: relative;
  width: fit-content;
  float: right;
  overflow: hidden;

  border-radius: 5px;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);

  & > span {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    height: 100%;
    width: 2rem;
    background: #f7f7f7;
    pointer-events: none;
  }

  & > span::before,
  & > span::after {
    --size: 0.4em;
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  & > span::before {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-bottom: var(--size) solid rgba(0 0 0 / 0.5);
    top: 35%;
  }

  & > span::after {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid rgba(0 0 0 / 0.5);
    top: 65%;
  }
`;

const Select = styled("select")({
  padding: "0.75em 4em 0.75em 1em",
  background: "#f4f4f4",
  color: "#232629",
  fontSize: "16px",
  border: "0",
  outline: "none",
  appearance: "none",
});

const PostContainer = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "40px 20px",
  display: "grid",
  gap: 25,
  gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
    gap: 15,
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  },
}));

const Posts = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [posts, setPosts] = useState([]);
  // const [startFetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await API.getAllPosts({ category: category || "" });
        if (response.isSuccess) {
          setPosts(response.data);
        }
      } catch (error) {
        toast.error(error.responseMsg);
      }
    };
    fetchData();
  }, [category]);

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h5" sx={{ fontWeight: "600" }}>{`${
          category || "All"
        } posts`}</Typography>
        <CustomSelect className="custom-select">
          <Select id="sort" placeholder="Sort By">
            <option>Sort By</option>
            <option value="Popularity">Popularity</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </Select>
          <span className="custom-arrow"></span>
        </CustomSelect>
      </Toolbar>

      <PostContainer>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Post post={post} />
            </Link>
          ))
        ) : (
          <Box style={{ color: "#878787", margin: "30px 80px", fontSize: 18 }}>
            No data available
          </Box>
        )}
      </PostContainer>
    </React.Fragment>
  );
};

export default Posts;
