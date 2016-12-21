/**
 * Created by Dani on 15.11.2016.
 */

//Export project wide relevant information
module.exports = {
    rethinkdb: {
        host: 'localhost',
        port: 28015,
        db: 'rtvs',
        user: 'admin',
        password: '',
        timeout: 20,
        ssl: null
    },
    server: {
        host: 'localhost',
        port: 3000
    },
    tablesAndKeys: {
        tables: [
            'users',
            'mail_groups',
            'polls',
            'answers'
        ],
        keys: [
            'mail',
            'id',
            'id',
            'id'
        ]
    }
};

