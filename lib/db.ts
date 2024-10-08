
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

// neonConfig.webSocketConstructor = ws;

// const prismaClientSingleton = () => {
//   neonConfig.webSocketConstructor = ws
//   const connectionString = `${process.env.DATABASE_URL}`

//   const pool = new Pool({ connectionString })
//   const adapter = new PrismaNeon(pool)
//   const db = new PrismaClient({ adapter })

//   return db
// }

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>
// } & typeof global

// export const db = globalThis.prismaGlobal ?? prismaClientSingleton()



// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db
const neon = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaNeon(neon);
export const db = new PrismaClient({ adapter });