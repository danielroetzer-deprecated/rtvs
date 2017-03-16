/**
 * Created by Rötzer on 17.11.2016.
 */


const bodyParser = require('body-parser');

const controller = require('../controllers/controller');

//Defining routes and which function they execute from the controller
module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.get('/', controller.indexAction);
    app.get('/about', controller.aboutAction);
    app.get('/create', controller.createAction);
    //app.post('/create', controller.createAction);
    app.get('/available', controller.availableAction);

    app.post('/pollExecution', controller.pollExecutionAction);
    app.post('/store', controller.storeAction);

    app.get('/realtime', controller.realTimeAction);

    app.post('/storeAnswers', controller.storeAnswersAction);
    app.post('/answers', controller.showAnswersAction);

};