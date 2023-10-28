import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Image_URL from "../../assets/poster.jpg";

const Image = styled(Box)`
  width: 100%;
  height: 45vh;
  max-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${Image_URL});
  background-position: center;
  background-color: #ccc;
  box-shadow: inset 0px 0px 10px 10px #0000006a;
  overflow: hidden;
`;

const Heading = styled(Typography)`
  color: #fff;
  font-size: 34px;
  font-weight: 600;
  background-color: rgba(3, 3, 3, 0.1245);
  border-radius: 14px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  padding: 20px;
`;

const SubHeading = styled(Typography)`
  color: #fff;
  font-weight: 600;
  background-color: rgba(3, 3, 3, 0.1245);
  border-radius: 0 0 14px 14px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  padding: 12px;
`;

const Banner = () => {
  return (
    <Image>
      <Heading>Welcome to Blog Posts application</Heading>
      <SubHeading>(Show case your little bit of additional work here)</SubHeading>
    </Image>
  );
};

export default Banner;
