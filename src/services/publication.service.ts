import { PrismaClient } from "@prisma/client";
import { prismaPagination, skip } from "@/helpers/functions/skip";
import { CommentQueryParams } from "@/@types/app/comment/CommentQueryParams";
import { Pagination } from "@/helpers/types/pagination";

const prisma = new PrismaClient();

export class PublicationService {
  async getAllPublications({ limit = "10", page = "1" }: Pagination) {
    return await prisma.publication.findMany({
      ...prismaPagination(page, limit),
      select: {
        id: true,
        text: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getPublicationById(id: string) {
    return await prisma.publication.findUnique({
      where: {
        id,
      },
    });
  }

  async createPublication(data: IPublication) {
    return prisma.publication.create({
      data,
    });
  }

  async deletePublication(id: string) {
    return prisma.publication.delete({
      where: {
        id,
      },
    });
  }

  async updatePublication(id: string, data: IPublication) {
    return prisma.publication.update({
      where: {
        id,
      },
      data,
    });
  }
}
