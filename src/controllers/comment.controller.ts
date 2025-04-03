import { Request, Response, NextFunction } from "express";
import { UserService } from "@/services/user.service";
import { BaseController } from "./base.controller";
import { AppError } from "@/utils/appError";
import { CommentService } from "@/services/comments.service";

export class CommentController extends BaseController {
  constructor(private commentService: CommentService) {
    super();
  }

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    await this.handleRequest(req, res, next, async () => {
      const { page, limit, id, typeId } = req.query as {
        page: string;
        limit: string;
        id: string;
        typeId: string;
      };
      const { email } = req.body;
      return await this.commentService.getAllComments({
        page,
        limit,
        email,
        id,
        typeId,
      });
    });
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await this.handleRequest(req, res, next, async () => {
      return await this.commentService.createComment(req.body);
    });
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await this.handleRequest(req, res, next, async () => {
      const { id } = req.params;
      const comment = await this.commentService.getCommentById(id);
      if (!comment) {
        throw new AppError("Comment not found", 404);
      }
      return await this.commentService.deleteComment(id);
    });
  };
}
