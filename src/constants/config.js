// API Notification Messages

// import { getAccessToken } from "../utils/common-utils";

export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded, please wait!",
  },
  success: {
    title: "Success",
    message: "Data successfully loaded",
  },
  responseFailure: {
    title: "Error",
    message:
      "An error occured while fetching response from the server. Please try again",
  },
  requestFailure: {
    title: "Error",
    message: "An error occured while parsing request data",
  },
  networkError: {
    title: "Error",
    message: "Unable to connect with the server.",
  },
};

// API SERVICE CALL
// NEED SERVICE CALL: {URL: '/', method: 'GET/POST/PUT/UPDATE', params: true/false, query: true/false }
export const SERVICE_URLS = {
  userSignup: {
    url: "/signup",
    method: "POST",
  },
  userLogin: {
    url: "/login",
    method: "POST",
  },
  uploadFile: {
    url: "/file/upload",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  },
  createPost: {
    url: "/create",
    method: "POST",
  },
  getAllPosts: {
    url: "/posts",
    method: "GET",
    params: true,
  },
  getPostById: {
    url: "/post",
    method: "GET",
    query: true,
  },
  updatePost: {
    url: "/post",
    method: "PUT",
    query: true,
  },
  deletePost: {
    url: "/post",
    method: "DELETE",
    query: true,
  },
  addComment: {
    url: "/comment/new",
    method: 'POST',
  },
  getComments: {
    url: "/comments",
    method: "GET",
    query: true,
  },
  deleteComment: {
    url: "/comment",
    method: "DELETE",
    query: true,
  }
};
