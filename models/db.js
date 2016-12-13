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
    initDB,
    insertData
};

//Initialize DB -> Called one time on server start
//async.waterfall([]) executes all defined function in a row
//The connection variable must be given to the other functions with callback()
function initDB(){
    async.waterfall([
        function (callback) {
            r.connect(config.rethinkdb, function (err, conn) {
                if (err){
                    logger.log('error','Failed to connect to the database \n' + err);
                }else{
                    logger.log('verbose','Database connection successful');
                }
                callback(null,conn);
            });
        },function (connection, callback) {
            r.dbCreate('rvp').run(connection, function(err, result){
                if(err) {
                    logger.log('verbose','Database already created');
                } else {
                    logger.log('verbose','Created new database: rvp');
                    logger.log('verbose',JSON.stringify(result, null, 2));
                }
                callback(null, connection);
            });
        },function (connection, callback) {
            r.db('rvp').tableCreate('polls').run(connection, function(err, result) {
                if (err) {
                    logger.log('verbose','Table already created');
                }else{
                    logger.log('verbose','Created new table: polls');
                    logger.log('verbose',JSON.stringify(result, null, 2));
                }

                callback(null,'Database is ready');
            });
        }
    ],function (err, status) {
        if (err) logger.log('error',err);
        else logger.log('info',status);
    });
}

function insertData(name,age){/*
    async.waterfall([
        function (callback) {
            r.connect(config.rethinkdb, function (err, conn) {
                if (err){
                    console.log('Failed to connect to the database');
                    //throw err;
                }
                callback(null,conn);
            });
        },function (connection, callback) {
            r.db('finalPrototype').table('finalTable').insert({
                name: name,
                alter: age
            }).run(connection, function(err, result) {
                if (err) throw err;
                logger.log('verbose',JSON.stringify(result, null, 2));
            });
            callback(null, '++ Data successfully added ++')
        }

    ],function (err, status) {
        if (err) throw err;
        else console.log(status);
    });*/
}

