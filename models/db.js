/**
 * Created by Dani on 15.11.2016.
 */

//Load the defined logger from the configs
const logger = require('../configs/winston');

const config = require('../configs/config');

//Load the async module
const async = require('async');

//Load the RethinkDB module
const r = require('rethinkdb');


//Exporting the database query functions
module.exports = {
    initDB
};

//Initialize DB -> Called one time on server start
//async.waterfall([]) executes all defined function in a row
//The connection variable must be given to the other functions with callback()
function initDB(){
    async.waterfall([
        function (callback) {
            r.connect(config.rethinkdb, function (err, conn) {
                if (err){
                    logger.log('error','Failed to connect to the database');
                    callback(err);
                }else{
                    logger.log('verbose','Database connection successful');
                }
                callback(null,conn);
            });
        },function (connection, callback) {
            r.dbCreate(config.db.name).run(connection, function(err, result){
                if(err) {
                    logger.log('verbose','Database already created: ' + config.db.name);
                } else {
                    logger.log('verbose','Created new database: ' + config.db.name);
                    logger.log('verbose',JSON.stringify(result, null, 2));
                }
                callback(null, connection);
            });
        },function (connection, callback) {
            for (let i=0, len = config.db.tables.length; i < len; i++){
                //variable for table number
                let help=i+1;

                r.db(config.db.name).tableCreate(config.db.tables[i], {primaryKey: config.db.keys[i]}).run(connection, function(err, result) {
                    if (err) {
                        logger.log('verbose','Table ' + help + '/' + len + ' already created: '+ config.db.tables[i]);
                    }else{
                        logger.log('verbose','Created new table: ' + help + '/' + len + ' ' + config.db.tables[i]);
                        logger.log('verbose',JSON.stringify(result, null, 2));
                    }
                });

                //callback if the end of tables is reached
                if(i==(len-1)){
                    callback(null,'Database is ready');
                }
            }
        }
    ],function (err, status) {
        if (err) logger.log('error',err);
        else logger.log('info',status);
    });
}
/*
function insertData(){
    async.waterfall([
        function (callback) {
            r.connect(config.rethinkdb, function (err, conn) {
                if (err){
                    console.log('Failed to connect to the database');
                    callback(err);
                }
                callback(null,conn);
            });
        },function (connection, callback) {
            r.db('rtvs').table('user').insert({
                name: 'Daniel',
                mail: 'daniel.roetzer@gmail.com',
                password: '1234',
            }).run(connection, function(err, result) {
                if (err) throw err;
                logger.log('verbose',JSON.stringify(result, null, 2));
            });
            callback(null, '++ Data successfully added ++')
        }

    ],function (err, status) {
        if (err) throw err;
        else console.log(status);
    });
}*/

