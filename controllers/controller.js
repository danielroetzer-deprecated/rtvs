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
    pollExecutionAction
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

    //res.locals.public_polls = "";

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
            r.table('polls').get(id).run(conn, function (err, result) {
                if (err) checkError(err, 'controllers/controller.js --> pollExecutionAction()');
                else{
                    processResults(result);
                }
            })
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



//Log messages on success
function success(result, msg) {
    logger.log('verbose',msg + '\n' + JSON.stringify(result, null, 2));
}

//Log messages on error
function checkError(err, msg) {
    logger.log('error',msg + '\n' + err);
}

