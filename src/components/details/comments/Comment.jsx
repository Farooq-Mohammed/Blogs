import React, { useContext } from "react";
import { Box, styled, Typography } from "@mui/material";

import { Delete } from "@mui/icons-material";

import { DataContext } from "../../../store/DataProvider";
import { API } from "../../../service/api";

const Component = styled(Box)`
  margin-top: 5px;
  background: #00000005;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
font-size: 18px;
  font-weight: 600;
  margin-right: 20px;
`;

const StyleDate = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
`;

const Comment = ({ commentInfo, setToggleReload }) => {
  const { account } = useContext(DataContext);

  const removeComment = async () => {
    const response = await API.deleteComment(commentInfo._id);
    if (response.isSuccess) {
      setToggleReload((prev) => !prev);
    }
  };

  return (
    <Component>
      <Container>
        <Name>{commentInfo.name}</Name>
        <StyleDate>{new Date(commentInfo.createdAt).toDateString()}</StyleDate>
        {commentInfo.name === account.username && (
          <DeleteIcon onClick={() => removeComment()} />
        )}
      </Container>
      <Box>
        <Typography>{commentInfo.comment}</Typography>
      </Box>
    </Component>
  );
};

export default Comment;
