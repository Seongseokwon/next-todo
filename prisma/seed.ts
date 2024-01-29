import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});

const setExperienceOfLevel = (level: number): number => {
    return level ** 2 + 3 * level + 2;
}


const seedData = async () => {
    let i = 1;
    while (i < 100) {
        const res = await prisma.level.create({
            data: {
                level: i,
                maxExperience: setExperienceOfLevel(i++)
            }
        })
    }
}

const main = async () => {
    await seedData();
}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect()
        process.exit()
    })
    .finally(async () => {
        await prisma.$disconnect()
    })