import express from "express";
import {
  deletePost,
  getFeedPosts,
  getUserPosts,
  likePost,
  updatePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.delete("/:id", verifyToken, deletePost);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

router.put("/:id", verifyToken, updatePost);

export default router;
