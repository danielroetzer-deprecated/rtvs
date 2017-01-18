/**
 * Created by Rötzer on 11.01.2017.
 */


//Load logger
const logger = require('../configs/winston');

//Load config
const config = require('../configs/config');

//Load the RethinkDB module
const r = require('rethinkdb');


class test{
    constructor(){

    }
    getAllPublicPolls() {
        r.connect(config.rethinkdb, function (err, conn) {
            if (err) checkError(err, 'models/polls.js --> getAllPublicPolls()');
            else{
                return r.db('rtvs').table('polls').filter({availability: 'public'}).run(conn, function (err, cursor) {
                    if (err) checkError(err, 'models/polls.js --> getAllPublicPolls()');
                    else{
                        cursor.toArray(function (err, results) {
                            if (err) checkError(err, 'models/polls.js --> getAllPublicPolls()');
                            else {
                                logger.log('silly',results);
                                //processResults(results);
                                return results;
                            }
                        });
                    }
                });
            }
        });
    }
}

//Log messages on success
function success(result, msg) {
    logger.log('verbose',msg + '\n' + JSON.stringify(result, null, 2));
}

//Log messages on error
function checkError(err, msg) {
    logger.log('error',msg + '\n' + err);
}

//Export the database setup
module.exports = test;