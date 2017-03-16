/**
 * Created by Rötzer on 28.02.2017.
 */





//Load logger
const logger = require('../configs/winston');

//Load config
const config = require('../configs/config');

//Load the RethinkDB module
const r = require('rethinkdb');



//const db = require('../models/db');
/*
module.exports = function (socket) {
    r.connect(config.rethinkdb, function (err, conn) {
        if (err) checkError(err, 'controllers/controller.js -> realTimeAction()');
        else{
            r.table('polls').pluck('id','creator').changes().run(conn,function (err, cursor){
                if (err) checkError(err, 'controllers/controller.js -> realTimeAction()');
                else{
                    cursor.each(function (err, results) {
                        if (err) checkError(err, 'controllers/controller.js -> realTimeAction()');
                        else{
                            logger.log('silly', results);
                            socket.emit('realtime', results);
                        }
                    });
                }
            });
        }
    });
};*/


module.exports = function (socket) {
    r.connect(config.rethinkdb, function (err, conn) {
        if (err) checkError(err, 'controllers/controller.js -> realTimeAction()');
        else{
            r.table('answers').changes().run(conn,function (err, cursor){
                if (err) checkError(err, 'controllers/controller.js -> realTimeAction()');
                else{
                    cursor.each(function (err, results) {
                        if (err) checkError(err, 'controllers/controller.js -> realTimeAction()');
                        else{
                            socket.emit('answerUpdate', results);
                        }
                    });
                }
            });
        }
    });
};


//Log messages on error
function checkError(err, msg) {
    logger.log('error',msg + '\n' + err);
}