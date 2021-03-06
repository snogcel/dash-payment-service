var AppConfig      = require('../config/AppConfig');
var Logger         = require('log');
var dbPool         = require('../repository/Database').connect();
var Wallet         = require('../lib/wallet');

var log = new Logger(AppConfig.logLevel);

var generateReport = function(opts, callback){

    dbPool.getConnection(function(err,connection) {

        connection.query("SELECT * FROM receiver ORDER BY created_date DESC LIMIT 2000", function(err,result){
            if ( !err ){
                console.log("success!");
                connection.release();

                if (result.length === 0) {
                    return callback(err, null);
                } else {
                    return callback(err, result);
                }

            } else {
                console.log("fail!");
                connection.release();

                return callback(err,result);
            }
        });

    });

};

module.exports = {
    generateReport: generateReport
};
