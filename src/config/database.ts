import { PrismaClient } from "@prisma/client";
import { ENV } from "@/config/env";

const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
  datasources: {
    db: {
      url: ENV.MYSQL_DATABASE_URL,
    },
  },
});

const handleShutdown = async () => {
  await prisma.$disconnect();
};

process.on("SIGTERM", handleShutdown);
process.on("SIGINT", handleShutdown);

export default prisma;
