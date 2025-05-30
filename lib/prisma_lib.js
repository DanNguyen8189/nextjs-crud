import { PrismaClient } from '@prisma/client';
//const { PrismaClient } = require('@prisma/client')

let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else if (process.env.NODE_ENV === 'development'){
    if (!global.prisma) {
        global.prisma = new PrismaClient(
            {
            datasources: {
                // override datasource url for local dev environment
                db: {
                    url: process.env.DATABASE_DEV_URL,
                },
            },
            }
        );
    }
    prisma = global.prisma;
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;