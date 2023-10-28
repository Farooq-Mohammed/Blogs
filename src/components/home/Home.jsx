import React from "react";
import { Grid } from "@mui/material";

import Posts from "../post/Posts";

const Home = () => {
  return (
    <div style={{ minHeight: "calc(100vh - 78px)" }}>
      <Grid container item>
        <Posts />
      </Grid>
    </div>
  );
};

export default Home;
