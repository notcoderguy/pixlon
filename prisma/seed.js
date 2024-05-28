const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { Command } = require('commander');

const prisma = new PrismaClient();
const program = new Command();

program
  .version('1.0.0')
  .option('-e, --email <type>', 'Admin email')
  .option('-n, --name <type>', 'Admin name')
  .option('-p, --password <type>', 'Admin password');

program.parse(process.argv);

const options = program.opts();

if (!options.email || !options.name || !options.password) {
  console.error('Please provide all required options: email, name, and password');
  process.exit(1);
}

async function main() {
  const hashedPassword = await bcrypt.hash(options.password, 14);

  await prisma.user.upsert({
    where: { email: options.email },
    update: {},
    create: {
      email: options.email,
      username: options.name,
      passwordHash: hashedPassword,
      // isAdmin: true,
    },
  });

  console.log('Admin seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
