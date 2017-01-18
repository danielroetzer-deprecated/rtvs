/**
 * Created by Rötzer on 16.11.2016.
 */

'use strict';

//Load the defined logger from the configs
//======================================================
const logger = require('./configs/winston');

//Load config
//======================================================
const config = require('./configs/config.js');

//Load path module
//======================================================
const path = require('path');


//Load and initialize express
//======================================================
const express = require('express');
const app = express();
logger.log('info','configuring express...');


//Load morgan an initialize it
//======================================================
const morgan = require('morgan');
const fs = require('fs');

const accessLogStream = fs.createWriteStream(__dirname + '/logs/access-logs.log', {flags: 'a'});
app.use(morgan('combined', {stream:accessLogStream}));

logger.log('verbose','http logger loaded');



//Some static files like css, favicon,... need to public for the user
//======================================================
app.use(express.static(path.join(__dirname + '/public')));
logger.log('verbose','public directory set');


//Load pug
//======================================================
app.set('view engine', 'pug');
logger.log('verbose','view engine set to pug');


//Load the routes
//======================================================
require('./routes/routes')(app);
logger.log('verbose','routing paths set');

/*
//Load and initialize the body parser module
//======================================================
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
*/



//Listener
//======================================================
app.listen(config.server.port, function () {
    logger.log('info','express configured');
    logger.log('info','listening on port: ' + config.server.port);
});



//catch 404 and forward to error handler
//======================================================
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler, displays error messages in the browser
//only keep this activated in development
//======================================================
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('templates/error');
});



//Load Database file and load the first setup
//======================================================
//Uncomment, if the database + tables need to be created
/*const db = require('./models/index');

logger.log('info','loading database setup...');
db.setup();*/




const polls = require('./models/polls');


/*
polls.createPoll('poll_name','creator',['mail1,mail2'],['group1','group2'],false,{
    question_title1: {
        type: 'multi',
        content: [
            'choice1',
            'choice2',
            'choice3',
            'choice4'
        ]
    },
    question_title2: {
        type: 'multi',
        content: [
            'choice1',
            'choice2',
            'choice3',
            'choice4'
        ]
    }
}, 'today', 'tomorrow', 'public');
*/

/*
const testa = require('./models/test');
const dbTest = new testa();
const x = dbTest.getAllPublicPolls();
logger.log('silly',x);*/



/*
db_OLD.js


//db.initDB();


const mail='daniel.roetzer@gmail.com',
    forename='Daniel',
    surname='Rötzer',
    passw='1234';



//db.createUser(mail,forename,surname,passw);

const user_mail='daniel.roetzer@gmail.com';
const name='5AHITM';
let mail_addresses = [];
mail_addresses.push('jakob.auer@gmail.com');
mail_addresses.push('lukas.liebscher@gmail.com');
mail_addresses.push('daniel.lampl@gmail.com');
mail_addresses.push('georg.peyerl@gmail.com');

//db.createMailGroup(user_mail, name, mail_addresses);
*/