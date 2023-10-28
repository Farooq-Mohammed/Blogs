import React from "react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

import categoryTypes from "../../constants/data.js";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
  border: 1px solid rgb(224, 224, 224);
`;
const CreateBlogBtn = styled(Button)`
  margin: 20px;
  width: 75%;
  max-width: 200px;
  background: #d22b27;
  color: #fff;
  &:hover {
    background: #bb2323;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`

const Categories = () => {
  const [ searchParam ] = useSearchParams();
  const category = searchParam.get('category');
  
  return (
    <>
      <Link to={`/create-post?category=${category || 'All'}`}>
        <CreateBlogBtn>Create Blog</CreateBlogBtn>
      </Link>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">All categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoryTypes.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyledLink to={`/?category=${category.type || ''}`}>{category.type}</StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
