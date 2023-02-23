//var mysql = require('mysql');
const { MongoClient, Decimal128 } = require('mongodb');
var cConfig = require('./../data/config.json');


exports.getMongoDB = async () => {
    const uri = cConfig.mongodb_url;

    const client = new MongoClient(uri);

    await client.connect();

    return await client;

    try {
        // Connect to the MongoDB cluster



    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

exports.createListing = async (client, db, collection, newListing, callBack) => {
    const result = await client.db(db).collection(collection).insertOne(newListing);

    if (result) {
        await callBack(true, result);
    } else {
        await callBack(false, result);
    }
}

exports.findOneListingBy_Id = async (client, db, collection, _id, callBack) => {
    const result = await client.db(db).collection(collection).findOne({ _id: _id });

    if (result) {
        await callBack(true, result);
    } else {
        await callBack(false, result);
    }
}

/*
exports.callSql = (sql, callBack) => {
    var connection = mysql.createConnection({
        host: cConfig.mysql_host,
        port: cConfig.mysql_port,
        user: cConfig.mysql_user,
        password: cConfig.mysql_password,
        database: cConfig.mysql_database
    });

    connection.connect((err) => {

        if (err) {
            callBack(false, err)
            connection.end();
        }
        else {
            connection.query(sql, function (err, result, fields) {
                if (err) callBack(false, err);
                else
                    callBack(true, result);

                connection.end();
            });
        }


    });
}

exports.initializeServer = (bData, callBack) => {
    this.callSql(`SELECT * FROM sw_settings WHERE server_id="${bData.guild.id}"`, (status, data) => {
        if (!status) {
            callBack(false, data);
        }
        else {
            if (data.length <= 0) {
                var sSettings = {
                    log_channel_id: -1,
                    log_channel_enabled: false
                };

                this.callSql(`INSERT INTO sw_settings (server_id, log_channel_settings) VALUES ("${bData.guild.id}", '${JSON.stringify(sSettings)}')`, (status, data) => {
                    if (!status) {
                        callBack(false, data);
                    }
                    else {
                        callBack(true, "");
                    }
                });
            }
            else {
                callBack(true, "");
            }
        }
    });
}

exports.initializeUser = (user_id, callBack) => {
    this.callSql(`SELECT * FROM users WHERE discord_id="${user_id}"`, (status, data) => {
        if (!status) {
            callBack(false, data);
        }
        else {
            if (data.length <= 0) {

                callSql(`INSERT INTO users (discord_id, ecoin, ecash) VALUES ("${user_id}", "0.025685", "250.15")`, (status, data) => {
                    if (!status) return console.log(data);

                    callBack(true, "");
                });
            }
            else {
                callBack(true, "");
            }
        }
    });
}

exports.cocug = (user_id, callBack) => {
    this.callSql(`SELECT * FROM users WHERE discord_id="${user_id}"`, (status, data) => {
        if (!status) {
            callBack(false, "err");
        }
        else {
            if (data.length <= 0) {

                this.callSql(`INSERT INTO users (discord_id, ecoin, ecash) VALUES ("${user_id}", "0.025685", "250.15")`, (status, data) => {
                    if (!status) return callBack(false, "err");

                    this.callSql(`SELECT * FROM users WHERE discord_id="${user_id}"`, (status, data) => {
                        if (!status) {
                            callBack(false, "err");
                        }
                        else {
                            if (data.length > 0) {
                                callBack(true, data);
                            }
                            else {
                                callBack(false, "err");
                            }
                        }
                    });
                });
            }
            else {
                callBack(true, data);
            }
        }
    });
}
*/

const initializeNewUser = async () => { }



exports.getUser = async (user_id, createIfDostNotExists, callBack) => {
    const cl = await this.getMongoDB()

    await this.findOneListingBy_Id(cl, "ebot", "users", user_id, async (status, result) => {
        if (!status) {

            if (createIfDostNotExists) {
                await this.createListing(cl, "ebot", "users", {
                    _id: user_id,
                    "date": Date.now(),
                    ecash: 2567899,
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

exports.getServer = async (server_id, createIfDostNotExists, callBack) => {
    const cl = await this.getMongoDB()

    await this.findOneListingBy_Id(cl, "ebot", "sw_settings", server_id, async (status, result) => {
        if (!status) {

            if (createIfDostNotExists) {
                await this.createListing(cl, "ebot", "sw_settings", {
                    _id: server_id,
                    prefix: "!",
                    status: 1,
                    log_channel_settings: {
                        log_channel_id: "",
                        log_channel_enabled: false,
                    }
                },
                    async (status, res) => {
                        if (!status) {
                            callBack(false, res);
                        }
                        else {
                            await this.findOneListingBy_Id(cl, "ebot", "sw_settings", server_id, async (status, result) => {
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


exports.updateSomethink = async (db, collection, query, inc, set, callBack) => {
    const cl = await this.getMongoDB();

    const result = await cl.db(db).collection(collection).updateOne(query, { $inc: inc, $set: set });

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