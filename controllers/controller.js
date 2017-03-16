/**
 * Created by Rötzer on 16.11.2016.
 */


const polls = require('../models/polls');

//Load logger
const logger = require('../configs/winston');

//Load config
const config = require('../configs/config');

//Load the RethinkDB module
const r = require('rethinkdb');


//const db = require('../models/db');

module.exports = {
    indexAction,
    aboutAction,
    createAction,
    availableAction,
    pollExecutionAction,
    storeAction,
    storeAnswersAction,
    showAnswersAction,
    realTimeAction
};

//Call index page
function indexAction (req, res) {
    //set the page title
    res.locals.title = 'Home - RTVS';

    //set the active tab for the navigation bar
    res.locals.active_item = 'home';

    //render and deliver the index.pug file
    res.render('index');
}

function aboutAction (req, res) {
    //Or write it like this, same thing as above
    res.render('about', {
        title: 'About Us - RTVS',
        active_item: 'about'
    });
}

function createAction(req, res){
    res.render('create', {
        title: 'Create Poll - RTVS',
        active_item: 'create'
    });
}

function availableAction(req, res){

    r.connect(config.rethinkdb, function (err, conn) {
        if (err) checkError(err, 'controllers/controller.js --> availableAction()');
        else{
            r.table('polls').filter({availability: 'public'}).withFields('name', 'id','creator').run(conn, function (err, cursor) {
                if (err) checkError(err, 'controllers/controller.js --> availableAction()');
                else{
                    cursor.toArray(function (err, results) {
                        if (err) checkError(err, 'controllers/controller.js --> availableAction()');
                        else {
                            processResults(results);
                        }
                    });
                }
            });
        }
    });

    function processResults(results) {
        res.render('available', {
            title: 'Available Polls - RTVS',
            active_item: 'available',
            public_polls: results
        });
    }

}


function pollExecutionAction(req, res){
    const id = req.body.id;
    const pollName = req.body.pollName;

    r.connect(config.rethinkdb, function (err, conn) {
        if (err) checkError(err, 'controllers/controller.js --> pollExecutionAction()');
        else{
            r.table('polls').get(id).pluck('data').run(conn, function (err, result) {
                if (err) checkError(err, 'controllers/controller.js --> pollExecutionAction()');
                else{
                    processResults(result);
                }
            });
        }
    });

    function processResults(result) {
        res.render('execution', {
            title: 'Execute Poll - RTVS',
            active_item: '',
            id: id,
            pollName: pollName,
            result: result
        });
    }


}

function storeAction(req, res) {
    /*polls.createPoll(req.body.pollTitle,'admin',['user1@gmail.com','user2@gmail.com'],['no group'], false,{
        question1: {
            type: 'multi',
            title: req.body.question1,
            content: [
                req.body.multi00,
                req.body.multi01,
                req.body.multi02,
                req.body.multi03
            ]
        }
    },'today','tomorrow','public');*/

    let questions = {};
    if(req.body.hiddenType1=='text'){
        questions = {
            question1: {
                type: req.body.hiddenType1,
                title: req.body.question1
            }
        };
    }else if(req.body.hiddenType1=='single'){
        questions = {
            question1: {
                type: req.body.hiddenType1,
                title: req.body.question1,
                content: [
                    req.body.single00,
                    req.body.single01,
                    req.body.single02,
                    req.body.single03
                ]
            }
        };
    }else{
        questions = {
            question1: {
                type: req.body.hiddenType1,
                title: req.body.question1,
                content: [
                    req.body.multi00,
                    req.body.multi01,
                    req.body.multi02,
                    req.body.multi03
                ]
            }
        };
    }
    createPoll(res,req.body.pollTitle,'admin',['user1@gmail.com','user2@gmail.com'],['no group'], false,
        questions,'today','tomorrow','public');
}

function createPoll(res, poll_name, creator, mails, mail_groups, anonymous, questions, valid_from, valid_to, availability) {
    r.connect(config.rethinkdb,function (err, conn) {
        if(err) {
            res.render('store', {
                title: 'Storing Poll Data... - RTVS',
                err: 1,
                msg: 'An Error occurred, please try again'
            });
            checkError(err, 'controllers/controller.js --> createPoll()');
        }else{
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
                if(err) {
                    res.render('store', {
                        title: 'Storing Poll Data... - RTVS',
                        err: 1,
                        msg: 'An Error occurred, please try again'
                    });
                    checkError(err, 'controllers/controller.js --> createPoll()');
                }
                else{
                    res.render('store', {
                        title: 'Storing Poll Data... - RTVS',
                        err: 0,
                        msg: 'Successfully stored your data'
                    });
                    success(result, 'Successfully inserted data into polls');
                }
            });
        }
    });
}


function storeAnswersAction(req, res){

    let answers = {};

    if(req.body.hiddenType=='multi'){
        answers = {
            answer1: {
                type: req.body.hiddenType,
                title: req.body.title,
                content: req.body.multi
            }
        };
    }else if(req.body.hiddenType=='single'){
        answers = {
            answer1: {
                type: req.body.hiddenType,
                title: req.body.title,
                content: req.body.single
            }
        };
    }else{
        answers = {
            answer1: {
                type: req.body.hiddenType,
                title: req.body.title,
                content: req.body.textarea
            }
        };
    }



    r.connect(config.rethinkdb, function (err, conn) {
        if (err){
            res.render('store', {
                title: 'Storing Answers - RTVS',
                err: 1,
                msg: 'An Error occurred, please try again'
            });
            checkError(err, 'controllers/controller.js --> storeAnswersAction()');
        }else{
            r.table('answers').insert({
                poll_key: req.body.id,
                user: 'admin',
                answers: [answers]
            }).run(conn,function (err, result) {
                if(err) {
                    res.render('store', {
                        title: 'Storing Answers - RTVS',
                        err: 1,
                        msg: 'An Error occurred, please try again'
                    });
                    checkError(err, 'controllers/controller.js --> createPoll()');
                }
                else{
                    res.render('store', {
                        title: 'Storing Answers - RTVS',
                        err: 0,
                        msg: 'Successfully stored your given answers'
                    });
                    success(result, 'Successfully inserted data into answers');
                }
            });
        }
    });
}


function showAnswersAction(req, res){

    r.connect(config.rethinkdb, function (err, conn) {
        if (err) checkError(err, 'controllers/controller.js --> showAnswersAction()');
        else{
            r.table('answers').filter({poll_key: req.body.id}).run(conn, function (err, cursor) {
                if (err) checkError(err, 'controllers/controller.js --> showAnswersAction()');
                else{
                    cursor.toArray(function (err, results) {
                        if (err) checkError(err, 'controllers/controller.js --> showAnswersAction()');
                        else {
                            processResults(results);
                        }
                    });
                }
            });
        }
    });

    function processResults(results) {
        res.render('answers', {
            title: 'Showing Answers for: ' + req.body.pollName,
            answers: results
        });
    }

}



function realTimeAction(req, res) {


    /*r.connect(config.rethinkdb, function (err, conn) {
        if (err) checkError(err, 'controllers/controller.js -> realTimeAction()');
        else{
            r.table('polls').pluck('id','creator').changes().run(conn,function (err, cursor){
                if (err) checkError(err, 'controllers/controller.js -> realTimeAction()');
                else{



                    io.sockets.on('connection', function(socket){

                        cursor.each(function (err, results) {
                            if (err) checkError(err, 'controllers/controller.js -> realTimeAction()');
                            else{
                                logger.log('silly', results);
                                socket.emit('realtime', results);
                            }
                        });
                    });


                }
            });
        }
    });*/


    res.render('realtime', {
        title: 'Testing... - RTVS',
        active_item: ''
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

