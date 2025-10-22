import {PrismaClient, Prodi} from "../generated/prisma";
import {faker} from "@faker-js/faker";

const prisma = new PrismaClient();

function generateNIM(prodi: Prodi): string {
  const prodiMap: Record<Prodi, string> = {
    [Prodi.Informatika]: "200",
    [Prodi.Sistem_Informasi]: "300",
    [Prodi.Ilmu_Komunikasi]: "100",
  };

  const fakultas = "L";
  const prodiCode = prodiMap[prodi];

  const angkatanYear = faker.number.int({min: 2020, max: 2025});
  const angkatanCode = (angkatanYear % 1000).toString().padStart(3, "0");

  const urutan = faker.number.int({min: 1, max: 999}).toString().padStart(3, "0");

  return `${fakultas}${prodiCode}${angkatanCode}${urutan}`;
}

async function main() {
  await prisma.upload.deleteMany();
  await prisma.user.deleteMany();

  const prodis = [Prodi.Informatika, Prodi.Sistem_Informasi, Prodi.Ilmu_Komunikasi];
  const users = [];

  for (let i = 0; i < 10; i++) {
    const prodi = faker.helpers.arrayElement(prodis);

    const user = await prisma.user.create({
      data: {
        id: faker.string.uuid(),
        nim: generateNIM(prodi),
        name: faker.person.fullName(),
        prodi, // langsung enum
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
    });

    users.push(user);
  }

  console.log(`Seeded ${users.length} users ✅`);

  // Seed Uploads
  const uploads = [];
  for (let i = 0; i < 30; i++) {
    const randomUser = faker.helpers.arrayElement(users);

    const upload = await prisma.upload.create({
      data: {
        id: faker.string.uuid(),
        title: faker.lorem.words(3),
        fileUrl: faker.internet.url(),
        tipe_soal: faker.helpers.arrayElement(["UTS", "UAS"]),
        semester: faker.number.int({min: 1, max: 8}),
        year: faker.number.int({min: 2020, max: 2025}),
        prodi: randomUser.prodi, // samakan dengan prodi user
        uploadedAt: faker.date.recent({days: 0.5}),
        userId: randomUser.id,
        mata_kuliah: faker.helpers.arrayElement([
          "Matematika Diskrit",
          "Basis Data",
          "Pemrograman",
          "Jaringan Komputer",
        ]),
      },
    });

    uploads.push(upload);
  }

  console.log(`Seeded ${uploads.length} uploads ✅`);
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });