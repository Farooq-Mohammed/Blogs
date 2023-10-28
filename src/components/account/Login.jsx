import React, { useState, useContext } from "react";
import { Box, Button, styled, TextField, Typography } from "@mui/material";

import { toast } from "react-toastify";

// Elements
import { API } from "../../service/api.js";
import { DataContext } from "../../store/DataProvider.jsx";
import { useNavigate } from "react-router-dom";

//URL
import IMAGE from "../../assets/poster.jpg";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  margin-top: 60px;
  box-shadow: 5px 2px 12px rgb(0 0 0/0.24);
  overflow: hidden;
`;

const Image = styled("img")({
  width: 240,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  // margin-top: 20px;
  // gap: 20px;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #1a2b3e;
  color: #fff;
  height: 40px;
  border-radius: 3px;
`;

const SignUpButton = styled(Button)`
  text-transform: none;
  background: #1a2b3e0e;
  color: #1a2b3e;
  height: 40px;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/0.124);
`;

const Text = styled(Typography)`
  color: #666;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const Login = () => {
  const { setAccount, setUserAuthenticated } = useContext(DataContext);
  const navigate = useNavigate();

  // states
  const [isLogin, setIsLogin] = useState(true);
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });
  const [signUpValues, setSignUpValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // functions
  const toggleLoginState = () => setIsLogin((prev) => !prev);

  const handleLoginInputChange = (e) =>
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });

  const handleSignUpInputChange = (e) =>
    setSignUpValues({ ...signUpValues, [e.target.name]: e.target.value });

  const signupUser = async () => {
    let response = await API.userSignup(signUpValues);
    if (response.isSuccess) {
      setError("");
      setSignUpValues({ username: "", email: "", password: "" });
      toggleLoginState();
    } else {
      setError("Something went wrong!");
    }
  };

  const loginUser = async () => {
    try {
      let response = await API.userLogin(loginValues);
      if (response.isSuccess) {
        setError("");
        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accesstoken}`
        );
        setAccount({
          username: response.data.username,
          email: response.data.email,
        });
        setUserAuthenticated(true);
        toast.success("Login successfull");
        navigate("/");
      }
    } catch (error) {
      console.log('Error', error);
      if(!error.code){
        toast.error('Connection issue')
      }else 
        toast.error(`${error.responseMsg}`);
    }
  };

  return (
    <Component>
      <Box>
        <Image src={IMAGE} alt="poster" />
      </Box>
      {isLogin ? (
        <Wrapper>
          <TextField
            type="text"
            variant="standard"
            size="small"
            name="username"
            value={loginValues.username}
            onChange={(e) => handleLoginInputChange(e)}
            placeholder="Username"
          />
          <TextField
            type="password"
            variant="standard"
            size="small"
            name="password"
            value={loginValues.password}
            onChange={(e) => handleLoginInputChange(e)}
            placeholder="Password"
          />
          {error && <Error>{error}</Error>}
          <LoginButton variant="contained" onClick={() => loginUser()}>
            Login
          </LoginButton>
          <Text style={{ textAlign: "center" }}>or</Text>
          <SignUpButton onClick={toggleLoginState}>
            Create an account
          </SignUpButton>
        </Wrapper>
      ) : (
        <Wrapper>
          <TextField
            type="text"
            variant="standard"
            size="small"
            name="username"
            value={signUpValues.username}
            onChange={(e) => handleSignUpInputChange(e)}
            placeholder="Username"
          />
          <TextField
            type="email"
            variant="standard"
            size="small"
            name="email"
            value={signUpValues.email}
            onChange={(e) => handleSignUpInputChange(e)}
            placeholder="Email"
          />
          <TextField
            type="password"
            variant="standard"
            size="small"
            name="password"
            value={signUpValues.password}
            onChange={(e) => handleSignUpInputChange(e)}
            placeholder="Password"
          />
          {error && <Error>{error}</Error>}
          <LoginButton
            variant="contained"
            onClick={() => {
              signupUser();
            }}
          >
            SignUp
          </LoginButton>
          <Text style={{ textAlign: "center" }}>or</Text>
          <SignUpButton onClick={toggleLoginState}>
            Already have an account?
          </SignUpButton>
        </Wrapper>
      )}
    </Component>
  );
};

export default Login;
