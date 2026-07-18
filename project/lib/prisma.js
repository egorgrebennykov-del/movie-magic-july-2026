import "dotenv/config";

let prisma = null;

const connectionString = process.env.DATABASE_URL;

if (connectionString) {
    try {
        const { PrismaPg } = await import("@prisma/adapter-pg");

        let PrismaClientCtor;
        try {
            ({ PrismaClient: PrismaClientCtor } = await import("../generated/prisma/client"));
        } catch {
            ({ PrismaClient: PrismaClientCtor } = await import("@prisma/client"));
        }

        const adapter = new PrismaPg({ connectionString });
        prisma = new PrismaClientCtor({ adapter });
    } catch (error) {
        console.error("Prisma init failed:", error.message);
    }
} else {
    console.warn("DATABASE_URL is not set. Prisma is disabled.");
}

export { prisma };
export default prisma;