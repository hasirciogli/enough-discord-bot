var mysql = require('mysql');



exports.callSql = (sql, callBack) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'enough_bot'
    });

    connection.connect((err) => {

        if (err) callBack(false, err);
        else{
            connection.query(sql, function (err, result, fields) {
                if (err) callBack(false, err);
                else
                    callBack(true, result);
            });
        }
        

    });
}