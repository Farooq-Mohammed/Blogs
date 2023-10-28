import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  AppBar,
  styled,
  Box,
  FormControl,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Menu,
  Search as SearchIcon,
  Home as HomeIcon,
  Add as AddIcon,
  Info as InfoIcon,
  Logout as LogoutIcon,
  Style as StyleIcon,
} from "@mui/icons-material";

import categoryTypes from "../../constants/data";

const Component = styled(AppBar)`
  z-index: 1999;
  position: sticky;
  top: 0;
  left: 0;
  min-height: 55px !important;
  padding: 20px;
  color: #232629;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0 0 0 / 0);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Box)`
  padding: 0 10px;
  display: flex;
  align-items: center;

  & > a {
    margin-left: 10px;
    text-transform: uppercase;
    font-size: 26px;
    font-weight: 700;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`;

const InputContainer = styled(FormControl)`
  margin: 0 30px 0 auto;
  padding: 5px 0 5px 10px;
  background: #fcfdfe;
  color: #2326299f;
  display: flex;
  gap: 0px;
  flex-direction: row;
  align-items: center;
  outline: 1px solid #2326295f;
  border-radius: 20px;
  overflow: hidden;
`;

const Search = styled(`input`)({
  height: 20,
  width: 350,
  minWidth: 120,
  fontSize: 16,
  padding: "4px 10px 4px 6px",
  color: "#232629c3",
  background: "transparent",
  outline: "none",
  border: "none",
  "&::placeholder": {
    color: "#2326295f",
  },
});

const SideBar = styled(Box)`
  position: absolute;
  top: 0;
  height: calc(100vh - 40px);
  padding: 20px;
  display: flex;
  gap: 25px;
  flex-direction: column;
  color: #272829;
  background: #fff;
  box-shadow: 1px 0 4px rgba(0 0 0 / 0.2);
  transition: all 350ms ease-in-out;
  z-index: 10;
`;

const SideBarContent = styled(`div`)({
  display: "flex",
  gap: "15px",
  flexDirection: "column",
  color: "#272829",
  overflowY: "auto",
});

const StyledLink = styled(Link)`
  padding: 10px;
  text-transform: uppercase;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  gap: 15px;
  align-items: center;

  &:hover {
    background: #efefef;
    border-radius: 5px;
  }
`;

const CategoryLink = styled(Link)`
  padding: 5px 10px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  gap: 15px;
  align-items: center;
  &:hover {
    background: #efefef;
    border-radius: 5px;
  }
`;

const Header = () => {
  const [searchParam] = useSearchParams();
  const category = searchParam.get("category");
  const menuRef = useRef();

  const [showMenu, setMenu] = useState(false);

  const [open, setOpen] = useState(true);

  const toggleMenuIcon = () => setMenu((prev) => !prev);

  const handleClick = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) setMenu(false);
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  });

  const LogoComponent = () => (
    <Logo>
      <Menu
        sx={{ cursor: "pointer", fontSize: "26px" }}
        onClick={() => toggleMenuIcon()}
      />
      <Link to="/">Logo</Link>
    </Logo>
  );

  return (
    <Component position="static">
      <LogoComponent />
      <InputContainer>
        <SearchIcon />
        <Search
          list="category"
          name="category"
          id="category"
          placeholder="Search by topic, category, title"
        />
        <datalist id="category">
          {categoryTypes.map((category) => (
            <option key={category.id} value={category.type} />
          ))}
        </datalist>
      </InputContainer>
      <SideBar
        ref={menuRef}
        style={showMenu ? { left: "0%" } : { left: "-100%" }}
      >
        <LogoComponent />
        <SideBarContent>
          <StyledLink to="/" onClick={() => setMenu(false)}>
            <HomeIcon />
            Home
          </StyledLink>
          <StyledLink
            onClick={() => setMenu(false)}
            to={`/create-post?category=${category || "All"}`}
          >
            <AddIcon />
            Create
          </StyledLink>
          <Divider />
          <div>
            <List aria-labelledby="nested-list-subheader">
              <ListItemButton
                sx={{ padding: "5px 10px" }}
                onClick={handleClick}
              >
                <StyleIcon sx={{ marginRight: "15px" }} />
                Category
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </List>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List sx={{ pl: 2 }} component="div" disablePadding>
                <CategoryLink onClick={() => setMenu(false)} to={`/`}>
                  <ListItemText primary="All" />
                </CategoryLink>
                {categoryTypes.map((category) => (
                  <CategoryLink
                    key={category.id + "_$"}
                    to={`/?category=${category.type || ""}`}
                    onClick={() => setMenu(false)}
                  >
                    <ListItemText primary={category.type} />
                  </CategoryLink>
                ))}
              </List>
            </Collapse>
          </div>
          <Divider />
          <StyledLink onClick={() => setMenu(false)} to="/about">
            <InfoIcon />
            About
          </StyledLink>
          <StyledLink onClick={() => setMenu(false)} to="/login">
            <LogoutIcon />
            Logout
          </StyledLink>
        </SideBarContent>
      </SideBar>
    </Component>
  );
};

export default Header;
