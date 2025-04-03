import { Router } from "express";
import { PublicationController } from "@/controllers/publication.controller";
import { PublicationService } from "@/services/publication.service";
import {
  createPublicationSchema,
  deletePublicationSchema,
  getAllPublicationsSchema,
} from "@/validators/publication.validator";
import { requireAuth, requireRole } from "@/middleware/authMiddleware";
import { cache } from "@/middleware/cacheMiddleware";
import { validateRequest } from "@/middleware/validateRequest";

const router = Router();

const publicationService = new PublicationService();
const publicationController = new PublicationController(publicationService);

console.log("enterede here");
router.use(requireAuth);

router.post(
  "/publication",
  validateRequest(createPublicationSchema),
  publicationController.create
);

router.delete(
  "/publication/:id",
  validateRequest(deletePublicationSchema),
  publicationController.delete
);

export default router;
