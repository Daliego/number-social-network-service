import { Router } from "express";
import { CommentController } from "@/controllers/comment.controller";
import { CommentService } from "@/services/comments.service";
import {
  createCommentsSchema,
  deleteCommentsSchema,
  getAllCommentsSchema,
} from "@/validators/comment.validator";
import { requireAuth } from "@/middleware/authMiddleware";
import { cache } from "@/middleware/cacheMiddleware";
import { validateRequest } from "@/middleware/validateRequest";

const router = Router();
const commentService = new CommentService();
const commentController = new CommentController(commentService);

router.get(
  "/comment",
  cache({ duration: 300 }),
  validateRequest(getAllCommentsSchema),
  commentController.getAll
);

export default router;
