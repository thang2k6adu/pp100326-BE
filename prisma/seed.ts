import { PrismaClient, Classification, Level, Attitude } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import stakeholders from '../stakeholder.json';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: hashedPassword,
      firstName: 'Regular',
      lastName: 'User',
      role: 'USER',
      isActive: true,
    },
  });

  console.log({ admin, user });

  // Seed Stakeholder Templates
  console.log(`Seeding ${stakeholders.length} stakeholder templates...`);

  for (const item of stakeholders) {
    await prisma.stakeholderTemplate.upsert({
      where: { stakeholderId: item.stakeholderId },
      update: {},
      create: {
        stakeholderId: item.stakeholderId,
        name: item.identification.name,
        positionRole: item.identification.positionRole || null,
        contactInformation: item.identification.contactInformation || null,
        requirements: item.assessment.requirements || null,
        expectations: item.assessment.expectations || null,
        phaseOfMostImpact: Array.isArray(item.assessment.phaseOfMostImpact)
          ? item.assessment.phaseOfMostImpact.join(', ')
          : item.assessment.phaseOfMostImpact || null,
        classification: (item.classificationAndEngagement.classification as Classification) || null,
        power: (item.classificationAndEngagement.power as Level) || null,
        interest: (item.classificationAndEngagement.interest as Level) || null,
        influence: (item.classificationAndEngagement.influence as Level) || null,
        currentAttitude: (item.classificationAndEngagement.currentAttitude as Attitude) || null,
        desiredAttitude: (item.classificationAndEngagement.desiredAttitude as Attitude) || null,
      },
    });
  }
  console.log(`Stakeholder templates seeded successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
