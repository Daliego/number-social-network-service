import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.user.deleteMany({});
  await prisma.publication.deleteMany({});
  await prisma.comment.deleteMany({});

  // Create development test users
  const hashedPassword = await bcrypt.hash("Password123!", 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    }),
    prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        name: "Bob Johnson",
        email: "bob@example.com",
        password: hashedPassword,
      },
    }),
  ]);

  console.log("Development seed completed:", users);

  await prisma.publication.createMany({
    data: [
      {
        text: "123456789",
        userId: users[0].id,
        title: "Test Publication 1",
      },
      {
        text: "089529",
        userId: users[1].id,
        title: "Test Publication 2",
      },
      {
        text: "2983",
        userId: users[2].id,
        title: "Test Publication 3",
      },
    ],
  });

  const publications = await prisma.publication.findMany();

  await prisma.comment.createMany({
    data: [
      {
        text: "45",
        userId: users[0].id,
        publicationId: publications[0].id,
        operation: "subtraction",
      },

      {
        text: "6798",
        userId: users[0].id,
        publicationId: publications[1].id,
        operation: "division",
      },
      {
        text: "92970345",
        userId: users[1].id,
        publicationId: publications[1].id,
        operation: "addition",
      },
      {
        text: "234",
        userId: users[2].id,
        publicationId: publications[2].id,
        operation: "multiplication",
      },
    ],
  });
  console.log("Comments seeded");

  const comment = await prisma.comment.findFirst();

  const commendFromComment = await prisma.comment.create({
    data: {
      text: "This is a test comment for another comment",
      userId: users[0].id,
      publicationId: publications[0].id,
      predecessorId: comment?.id,
      operation: "addition",
    },
  });

  await prisma.comment.create({
    data: {
      text: "This is a test comment for another comment",
      userId: users[0].id,
      publicationId: publications[0].id,
      predecessorId: commendFromComment.id,
      operation: "addition",
    },
  });
  console.log("Comments seeded"); /*  */
}

main()
  .catch((e) => {
    console.error("Error seeding development data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
