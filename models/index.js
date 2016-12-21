/**
 * Created by Dani on 21.12.2016.
 */

//Load logger
const logger = require('../configs/winston');

//Load config
const config = require('../configs/config');

//Load the RethinkDB module
const r = require('rethinkdb');

//Export the database setup
module.exports = {setup};


//Database setup, called on server start, to ensure database and tables are created
function setup() {
    r.connect(config.rethinkdb,function (err, conn) {
        if(err) checkError(err,'models/index.js --> setup()');
        else{
            r.dbCreate(config.rethinkdb.db).run(conn, function (err, result) {
                if(err) checkError(err, 'models/index.js --> setup()');
                else {
                    //Emit success msg
                    success(result, 'Database ' + config.rethinkdb.db + ' successfully created');

                    //Create all tables, which are defined in config.js
                    for (let i=0, len = config.tablesAndKeys.tables.length; i < len; i++){
                        r.tableCreate(config.tablesAndKeys.tables[i], {primaryKey: config.tablesAndKeys.keys[i]}).run(conn, function(err, result) {
                            if (err) checkError(err, 'models/index.js --> setup()');
                            else success(result, 'Table ' + config.tablesAndKeys.tables[i] + ' successfully created');
                        });
                    }
                }
            });
        }
    });
}


//Log messages on success
function success(result, msg) {
    logger.log('verbose',msg + '\n' + JSON.stringify(result, null, 2));
}

//Log messages on error
function checkError(err, msg) {
    logger.log('error',msg + '\n' + err);
}


