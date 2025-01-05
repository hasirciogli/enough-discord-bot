const { prisma } = require("../prisma/prisma.js")

module.exports.getUser = async (userId) => {
    await prisma.$connect();
    var user = await prisma.users.findUnique({
        where: {
            discordId: userId
        }
    })

    console.log(user, userId)

    if (!user) {
        var { err, user } = await this.createUser(userId);

        if (err)
            return {
                err: "User create failed",
            }

        return {
            user,
            err: null,
        }
    } else return {
        user,
        err: null,
    }
}

module.exports.createUser = async (userId) => {
    console.log("logge", userId);
    var newUser = await prisma.users.create({
        data: {
            discordId: userId,
        }
    })

    if (!newUser)
        return {
            status: false,
            err: "User create failed",
        }

    return {
        status: true,
        err: null,
        user: newUser
    }
}

module.exports.addCoin = async (userId, coin) => {
    var { user, err } = this.getUser(userId);

    if (err)
        return {
            err,
            user: null
        }

    var isSucc = prisma.users.update({
        where: {
            discordId: userId,
        },
        data: {
            coin: {
                increment: coin
            }
        }
    })

    if (!isSucc)
        return {
            err: "Server error.",
            user: null
        }

    return {
        err: null,
        user: isSucc
    }
}

module.exports.removeCoin = async (userId, coin) => {
    var { user, err } = this.getUser(userId);

    if (err)
        return {
            err,
            user: null
        }

    var isSucc = prisma.users.update({
        where: {
            discordId: userId,
        },
        data: {
            coin: {
                decrement: coin
            }
        }
    })

    if (!isSucc)
        return {
            err: "Server error.",
            user: null
        }

    return {
        err: null,
        user: isSucc
    }
}
