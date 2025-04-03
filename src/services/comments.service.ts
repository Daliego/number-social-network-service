import { PrismaClient } from "@prisma/client";
import { prismaPagination, skip } from "@/helpers/functions/skip";
import { CommentQueryParams } from "@/@types/app/comment/CommentQueryParams";
import { AppError } from "@/utils/appError";
import { makeOperation } from "@/helpers/functions/mathOperations";

const prisma = new PrismaClient();

export class CommentService {
  async getAllComments({
    limit = "10",
    page = "1",
    email,
    id,
    typeId,
  }: CommentQueryParams) {
    if (typeId === "publication") {
      return await prisma.comment.findMany({
        ...prismaPagination(page, limit),
        where: {
          publicationId: id,
        },
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
      });
    } else if (typeId === "reply") {
      const comment = await prisma.comment.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          successors: true,
        },
      });

      if (!comment) {
        throw new AppError("Comment not found", 404);
      }
      
      return comment.successors;
    }

    return await prisma.comment.findMany({
      ...prismaPagination(page, limit),
      where: {
        user: {
          email: email,
        },
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getCommentById(id: string) {
    return await prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }

  async createComment(data: IComment) {
    let number: number = 0;

    if (data.predecessorId) {
      const predecessorComment = await prisma.comment.findUnique({
        where: {
          id: data.predecessorId,
        },
      });

      if (!predecessorComment) {
        throw new AppError("Predecessor comment not found", 404);
      }

      number = Number(predecessorComment.text);
    } else {
      const publication = await prisma.publication.findUnique({
        where: {
          id: data.publicationId,
        },
      });

      if (!publication) {
        throw new AppError("Publication not found", 404);
      }

      number = Number(publication.text);
    }

    const sum: number = makeOperation(
      data.operation,
      number,
      Number(data.text)
    );

    return prisma.comment.create({
      data: {
        ...data,
        text: sum.toString(),
      },
    });
  }

  async deleteComment(id: string) {
    return prisma.comment.delete({
      where: {
        id,
      },
    });
  }

  async updateComment(id: string, data: IComment) {
    return prisma.comment.update({
      where: {
        id,
      },
      data,
    });
  }
}
