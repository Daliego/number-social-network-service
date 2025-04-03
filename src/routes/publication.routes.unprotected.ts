import { Router } from "express";
import { PublicationController } from "@/controllers/publication.controller";
import { PublicationService } from "@/services/publication.service";
import { getAllPublicationsSchema } from "@/validators/publication.validator";
import { cache } from "@/middleware/cacheMiddleware";
import { validateRequest } from "@/middleware/validateRequest";

const router = Router();

const publicationService = new PublicationService();
const publicationController = new PublicationController(publicationService);

router.get(
  "/publication",
  cache({ duration: 300 }),
  validateRequest(getAllPublicationsSchema),
  publicationController.getAll
);

export default router;
