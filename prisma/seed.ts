import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.directMessage.deleteMany();
  await prisma.user.deleteMany();

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "john@test.com",
        password:
          "$2b$12$Gb3bsH/caOkqwXHbbwZTX.MBNoe6aEl5wLIeP6b5NUybuBme6iKiG", // password123
        userName: "john_doe",
        firstName: "John",
        lastName: "Doe",
        status: "ONLINE",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
    }),

    prisma.user.create({
      data: {
        email: "jane@test.com",
        password:
          "$2b$12$Gb3bsH/caOkqwXHbbwZTX.MBNoe6aEl5wLIeP6b5NUybuBme6iKiG",
        userName: "jane_doe",
        firstName: "Jane",
        lastName: "Doe",
        status: "ONLINE",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      },
    }),
    prisma.user.create({
      data: {
        email: "bob@test.com",
        password:
          "$2b$12$Gb3bsH/caOkqwXHbbwZTX.MBNoe6aEl5wLIeP6b5NUybuBme6iKiG",
        userName: "bob_smith",
        firstName: "Bob",
        lastName: "Smith",
        status: "OFFLINE",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      },
    }),
  ]);
  await prisma.user.updateMany({
    where: { email: "adminaccount@gmail.com" },
    data: {},
  });

  // // Make them friends with each other
  await Promise.all([
    prisma.user.update({
      where: { id: users[0].id },
      data: {
        User_A: {
          connect: [{ id: users[1].id }, { id: users[2].id }],
        },
      },
    }),
    prisma.user.update({
      where: { id: users[1].id },
      data: {
        User_B: {
          connect: [{ id: users[0].id }],
        },
        User_A: {
          connect: [{ id: users[2].id }],
        },
      },
    }),
    prisma.user.update({
      where: { id: users[2].id },
      data: {
        User_B: {
          connect: [{ id: users[0].id }, { id: users[1].id }],
        },
      },
    }),
  ]);

  await Promise.all([
    prisma.directMessage.create({
      data: {
        content: "Hey Jane, how are you?",
        senderId: users[0].id,
        receiverId: users[1].id,
      },
    }),
    prisma.directMessage.create({
      data: {
        content: "I'm good John, thanks for asking!",
        senderId: users[1].id,
        receiverId: users[0].id,
      },
    }),
    prisma.directMessage.create({
      data: {
        content: "Hey Bob, are you there?",
        senderId: users[0].id,
        receiverId: users[2].id,
      },
    }),
    // Additional messages
    prisma.directMessage.create({
      data: {
        content: "Hey, want to grab lunch?",
        senderId: users[1].id,
        receiverId: users[2].id,
      },
    }),
    prisma.directMessage.create({
      data: {
        content: "Sure, where should we meet?",
        senderId: users[2].id,
        receiverId: users[1].id,
      },
    }),
    prisma.directMessage.create({
      data: {
        content: "How about that new place downtown?",
        senderId: users[1].id,
        receiverId: users[2].id,
      },
    }),
  ]);

  console.log("Database has been seeded! 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
