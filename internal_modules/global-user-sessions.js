//var mysql = require('mysql');
const { MongoClient, Decimal128 } = require('mongodb');
var cConfig = require('./../data/config.json');


exports.getUserSession = async (user_id, callBack) => {
    const cl = await this.getMongoDB()

    await this.findOneListingBy_Id(cl, "ebot", "users", user_id, async (status, result) => {
        if (!status) {

            if (createIfDostNotExists) {
                await this.createListing(cl, "ebot", "users", {
                    _id: user_id,
                    "date": Date.now(),
                    ecash: new Decimal128("200.00"),
                    ecoin: new Decimal128("0.00000"),
                    lol: "xd",
                },
                    async (status, res) => {
                        if (!status) {
                            callBack(false, res);
                        }
                        else {
                            await this.findOneListingBy_Id(cl, "ebot", "users", user_id, async (status, result) => {
                                if (!status) {
                                    callBack(false, result);
                                } else {
                                    callBack(true, result);
                                }
                            });
                        }
                    });
            }
            else {
                callBack(false, result);
            }
        } else {
            callBack(true, result);
        }
    });


    try {
        await cl.close();
    } catch (e) {
        console.error("l -> close err" + e);
    }
}

exports.updateUserWork = async (user_id, callBack) => {
    const cl = await this.getMongoDB();

    const result = await cl.db("ebot").collection("global_user_sessions").updateOne(query, { $inc: inc, $set: set });

    if (result) {
        await callBack(true, result);
    } else {
        await callBack(false, result);
    }

    try {
        await cl.close();
    } catch (e) {
        console.error("l -> close err" + e);
    }
}