import React, { useContext, useEffect, useState } from "react";
import { Box, Button, TextareaAutosize, styled } from "@mui/material";

import { toast } from "react-toastify";

import { AccountCircle } from "@mui/icons-material";
import { DataContext } from "../../../store/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment";

const Wrapper = styled(Box)`
  display: block;
  margin-top: 27px;
`;

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ProfileIcon = styled(AccountCircle)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

// const image = styled("img")({
//   width: 50,
//   height: 50,
//   borderRadius: "50%",
//   background: "red",
// });

const StyledTextArea = styled(TextareaAutosize)`
  flex: 1;
  height: 100px;
  border-radius: 7px;
  border: 1px solid rgba(0 0 0 / 0.2);
  outline: none;
  padding: 15px;
  // background: #33333305;
`;

const Comments = ({ id }) => {
  const { account } = useContext(DataContext);

  const [commentInfo, setCommentInfo] = useState({
    postId: "",
    comment: "",
    name: account.username,
    date: new Date(),
  });

  const [comments, setComments] = useState([]);

  const [toggleReload, setToggleReload] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      let response = await API.getComments(id);
      if (response.isSuccess) {
        setComments(response.data);
      }
    };
    fetchComments();
  }, [id, toggleReload]);

  const handleCommentChange = (e) => {
    setCommentInfo({
      ...commentInfo,
      postId: id,
      comment: e.target.value,
    });
  };

  const addComment = async () => {
    let response = await API.addComment(commentInfo);
    if (response.isSuccess) {
      setCommentInfo({
        postId: "",
        comment: "",
        name: account.username,
        date: new Date(),
      });
      toast.success("Comment added");
      setToggleReload(prev => !prev);
    }
  };

  return (
    <Box>
      <Container>
        {/* <image src='' alt="profile pic"/> */}
        <ProfileIcon />
        <StyledTextArea
          minRows={1}
          name="comment"
          value={commentInfo.comment}
          onChange={(e) => handleCommentChange(e)}
          placeholder="What's on your mind..."
        />
        <Button
          variant="contained"
          onClick={() => {
            addComment();
          }}
        >
          Post
        </Button>
      </Container>
      <Wrapper>
        {comments.length > 0 &&
          comments.map((comment) => <Comment key={comment._id} commentInfo={comment} setToggleReload={setToggleReload}/>)}
      </Wrapper>
    </Box>
  );
};

export default Comments;
