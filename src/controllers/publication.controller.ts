import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base.controller";
import { AppError } from "@/utils/appError";
import { PublicationService } from "@/services/publication.service";

export class PublicationController extends BaseController {
  constructor(private publicationService: PublicationService) {
    super();
  }

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    await this.handleRequest(req, res, next, async () => {
      const { page, limit } = req.query as { page: string; limit: string };

      return await this.publicationService.getAllPublications({
        page,
        limit,
      });
    });
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await this.handleRequest(req, res, next, async () => {
      return await this.publicationService.createPublication(req.body);
    });
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await this.handleRequest(req, res, next, async () => {
      const { id } = req.params;
      const comment = await this.publicationService.getPublicationById(id);
      if (!comment) {
        throw new AppError("Publication not found", 404);
      }
      return await this.publicationService.deletePublication(id);
    });
  };
}
