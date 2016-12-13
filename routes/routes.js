/**
 * Created by Rötzer on 17.11.2016.
 */


const controller = require('../controllers/controller');

//Defining routes and which function they execute from the controller
module.exports = function (app) {
    app.get('/', controller.indexAction);
    app.get('/about', controller.aboutAction);
    app.get('/create', controller.createAction);
    //app.post('/create', controller.createAction);
    app.get('/available', controller.availableAction);
};