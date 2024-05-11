const { PrismaClient } = require("@prisma/client")

// 'global' anahtar sözcüğünü 'CustomGlobal' tipi olarak kullan
let prisma;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

module.exports.prisma = prisma;