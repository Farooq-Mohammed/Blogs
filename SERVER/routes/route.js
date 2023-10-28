import express from "express";

// funtions
import { signupUser, loginUser } from "../controller/userController.js";
import { getImage, uploadImage } from "../controller/imageController.js";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controller/postController.js";
import { addComment, deleteComment, getComments } from "../controller/commentController.js";

// middleware
import upload from "../middleware/upload.js";
import { authenticateToken } from "../controller/jwtController.js";

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/create', authenticateToken, createPost);

router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPostById);
router.put('/post/:id', authenticateToken, updatePost);
router.delete('/post/:id', authenticateToken, deletePost);

router.post('/comment/new', authenticateToken ,addComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/:id', authenticateToken, deleteComment);

export default router;