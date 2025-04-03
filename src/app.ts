import express from "express";
import { ENV } from "@/config/env";
import userRoutes from "@/routes/user.routes";
import authRoutes from "@/routes/auth.routes";
import publicationRoutes from "@/routes/publication.routes";
import publicationRoutesUnprotected from "@/routes/publication.routes.unprotected";
import commentsRoutesUnprotected from "@/routes/comment.routes.unprotected";
import commentRoutes from "@/routes/comment.routes";
import { errorHandler } from "@/middleware/errorHandler";
import { setupSecurityHeaders } from "@/middleware/securityHeaders";
import { apiLimiter } from "@/middleware/rateLimiter";
import { authLimiter } from "@/middleware/rateLimiter";
import cors from "cors";
import { requestId } from "@/middleware/requestId";
import { compressionMiddleware } from "@/middleware/performanceMiddleware";
import { cache } from "@/middleware/cacheMiddleware";
import { ErrorMonitoringService } from "@/services/errorMonitoring.service";
import { ErrorRequestHandler } from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./docs/swagger";
import { notFoundHandler } from "./middleware/notFound";

const app = express();

ErrorMonitoringService.getInstance();

// Group middleware by function
const setupMiddleware = (app: express.Application) => {
  // Security
  app.use(requestId);
  setupSecurityHeaders(app as express.Express);
  app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));

  // Performance
  app.use(compressionMiddleware);
  app.use(express.json({ limit: "10kb" }));

  // Rate Limiting
  app.use("/api/auth", authLimiter);
  app.use("/api", apiLimiter);
};

setupMiddleware(app);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello!!!" });
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: "none",
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
  },
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Express TypeScript API Documentation",
};

app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(specs, swaggerOptions));

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  return errorHandler(err, req, res, next);
};

app.use(errorMiddleware);

app.use("/api/users", cache({ duration: 300 }));
app.use("/api/comment", commentRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/unprotected", publicationRoutesUnprotected);
app.use("/api/unprotected", commentsRoutesUnprotected);

app.use(notFoundHandler);

export default app;
