import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

let prisma = null;

if (connectionString) {
    const adapter = new PrismaPg({ connectionString });
    prisma = new PrismaClient({ adapter });
}

export { prisma };
export default prisma;