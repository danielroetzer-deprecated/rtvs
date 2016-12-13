/**
 * Created by Rötzer on 16.11.2016.
 */

//const db = require('../models/db');
module.exports = {
    indexAction,
    aboutAction,
    createAction,
    availableAction
};

//Call index page
function indexAction (req, res) {
    //set the page title
    res.locals.title = 'Home - RVP';

    //set the active tab for the navigation bar
    res.locals.active_home = 'active';
    res.locals.active_about = '';
    res.locals.active_create = '';
    res.locals.active_available = '';

    //render and deliver the index.pug file
    res.render('index');
}

function aboutAction (req, res) {
    //Or write it like this, same thing as above
    res.render('about', {
        title: 'About Us - RVP',
        active_home: '',
        active_about: 'active',
        active_create: '',
        active_available: ''
    });
}

function createAction(req, res){
    res.render('create', {
        title: 'Create Poll - RVP',
        active_home: '',
        active_about: '',
        active_create: 'active',
        active_available: ''
    });
}

function availableAction(req, res){
    res.render('available', {
        title: 'Available Polls - RVP',
        active_home: '',
        active_about: '',
        active_create: '',
        active_available: 'active'
    });
}

