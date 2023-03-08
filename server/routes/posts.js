import express from "express";
import {
  createPost,
  createPostComment,
  getFeedPosts,
  getUserPosts,
  getPostComments,
  likePost,
  deletePost,
  deleteComment,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREAT */
router.post("/", verifyToken, createPost);
router.post("/:id", createPostComment);

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:id/comments", verifyToken, getPostComments);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* DELETE */
router.delete("/:id", verifyToken, deletePost);
router.delete("/:id/comment", verifyToken, deleteComment);

export default router;
