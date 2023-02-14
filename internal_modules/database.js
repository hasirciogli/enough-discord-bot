var mysql = require('mysql');
var cConfig = require('./../data/config.json');



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
                            else{
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