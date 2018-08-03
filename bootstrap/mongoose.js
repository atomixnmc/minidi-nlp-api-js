var path = require('path'),
    mongoose = require('mongoose');
var bluebird = require('bluebird');
var config = require('../config/index');

module.exports.config = config;

module.exports.connect = function(app) {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.db.uri, config.db.options, function(err) {
            // Log Error
            if (err) {
                console.error('Could not connect to MongoDB!');
                console.log(err);
                reject(err);
            } else {
                //
                mongoose.Promise = bluebird;
                console.log('Connect db: ', config.db.uri);
                //mongooseMiddleware.initialize(mongoose);

                require(path.resolve("modules/models/user/user.model"));

                resolve(config);
            }
        });
    });
}