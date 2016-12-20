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
    createUser,
    insertData,
    createMailGroup
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
        },
        //Create database
        function (conn, callback) {
            r.dbCreate(config.db.name).run(conn, function(err, result){
                if(err) {
                    logger.log('verbose','Database already created: ' + config.db.name);
                } else {
                    logger.log('verbose','Created new database: ' + config.db.name);
                    logger.log('verbose',JSON.stringify(result, null, 2));
                }
                callback(null, conn);
            });
        },
        //Create all defined tables from the config.js
        function (conn, callback) {
            for (let i=0, len = config.db.tables.length; i < len; i++){
                //variable for table number
                let help=i+1;

                r.db(config.db.name).tableCreate(config.db.tables[i], {primaryKey: config.db.keys[i]}).run(conn, function(err, result) {
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


//Creating a user
function createUser(mail, forename, surname, passw){
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
        },
        //Check if user is created, if not -> insert user
        function (conn, callback) {
            r.db('rtvs').table('user').get(mail).run(conn, function(err, result){
                if(err) {
                    callback(err);
                }else {
                    //if result == null -> mail is not used
                    if (result!=null){
                        callback(null, 'Mail address already in use')
                    }else{
                        r.db('rtvs').table('user').insert({
                            mail: mail,
                            name: {
                                forename: forename,
                                surname: surname
                            },
                            password: passw,
                            polls: []
                        }).run(conn, function(err, result) {
                            if (err){
                                callback(err);
                            } else{
                                logger.log('verbose',JSON.stringify(result, null, 2));
                            }
                        });
                        callback(null, 'User created: ' + mail);
                    }
                }
            });
        }
    ],function (err, status){
        if (err) logger.log('error',err);
        else logger.log('info',status);
    });
}

//Creating a mail group
function createMailGroup(user_mail, name, mail_addresses){
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
        },function (conn, callback) {
            r.db('rtvs').table('mail_groups').insert({
                name: name,
                user_mail: user_mail,
                mail_addresses: [mail_addresses]
            }).run(conn, function(err, result) {
                if (err){
                    callback(err);
                } else{
                    logger.log('verbose',JSON.stringify(result, null, 2));
                }
            });
            callback(null, 'Mail group created: ' + name);
        }
    ],function (err, status) {
        if (err) logger.log('error',err);
        else logger.log('info',status);
    });
}



//Function skeleton
function functionSkeleton(){
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
        },function (conn, callback) {

        }
    ],function (err, status) {
        if (err) logger.log('error',err);
        else logger.log('info',status);
    });
}


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
                name: 'georg.peyerl',
                mail: 'georg.peyerl@sz-ybbs.ac.at',
                password: '1234',
                polls: ''
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
}

