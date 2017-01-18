/**
 * Created by Rötzer on 22.12.2016.
 */


//Load logger
const logger = require('../configs/winston');

//Load config
const config = require('../configs/config');

//Load the RethinkDB module
const r = require('rethinkdb');

//Export the database setup
module.exports = {
    createPoll,
    getAllPublicPolls
};

function createPoll(poll_name, creator, mails, mail_groups, anonymous, questions, valid_from, valid_to, availability) {
    r.connect(config.rethinkdb,function (err, conn) {
        if(err) checkError(err, 'models/polls.js --> createPoll()');
        else{
            r.table('polls').insert({
                name: poll_name,
                creator: creator,
                mails: [mails],
                mail_groups: [mail_groups],
                anonymous: anonymous,
                data: [questions],
                valid_from: valid_from,
                valid_to: valid_to,
                availability: availability
            }).run(conn,function (err, result) {
                if(err) checkError(err, 'models/polls.js --> createPoll()');
                else{
                    success(result, 'Successfully inserted data into polls');
                }
            });
        }
    });
}


function getAllPublicPolls() {
    r.connect(config.rethinkdb, function (err, conn) {
        if (err) checkError(err, 'models/polls.js --> getAllPublicPolls()');
        else{
            r.table('polls').filter({availability: 'public'}).run(conn, function (err, cursor) {
                if (err) checkError(err, 'models/polls.js --> getAllPublicPolls()');
                else{
                    //cursor.each(console.log);
                    //logger.log('silly',result);
                    //return result
                    cursor.toArray(function (err, results) {
                        if (err) checkError(err, 'models/polls.js --> getAllPublicPolls()');
                        else {
                            //processResults(results);
                            return results;
                        }
                    });
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

/*
function prototype() {
    r.connect(config.rethinkdb, function (err, conn) {
        if (err) checkError(err, '');
        else{

        }
    });
}*/