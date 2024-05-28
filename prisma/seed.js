// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const admins = [
    {
      email: "prateekborah1909@gmail.com",
      name: "Admin One",
      password: "admin_password1",
    },
    {
      email: "notcoderguy@gmail.com",
      name: "Admin Two",
      password: "admin_password2",
    },
  ];

  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 14);
    await prisma.user.upsert({
      where: { email: admin.email },
      update: {},
      create: {
        email: admin.email,
        username: admin.name,
        passwordHash: hashedPassword,
        // isAdmin: true,
      },
    });
  }

  console.log('Admins seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
