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

exports.initializeUser = (data) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'enough_bot'
    });

    connection.connect((err) => {

        if (err) callBack(false, err);
        else {
            connection.query(sql, function (err, result, fields) {
                if (err) callBack(false, err);
                else
                    callBack(true, result);
            });
        }


    });
}