#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Task = require('./models/task');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var tasks = [];

function taskCreate(name, importance, urgency, progress, cb) {
    taskdetail = { name: name, importance: importance, urgency: urgency, progress: progress }

    var task = new Task(taskdetail);

    task.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Task: ' + task);
        tasks.push(task)
        cb(null, task)
    });
}


function createTasks(cb) {
    async.series([
        function (callback) {
            taskCreate('Create', 1, 5, 0, callback);
        },
        function (callback) {
            taskCreate('Read', 2, 4, 20, callback);
        },
        function (callback) {
            taskCreate('Delete', 3, 3, 40, callback);
        },
        function (callback) {
            taskCreate('Update', 4, 2, 60, callback);
        },
        function (callback) {
            taskCreate('Love', 5, 1, 80, callback);
        },
    ],
        // optional callback
        cb);
}


async.series([
    createTasks
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('TASKInstances: ' + tasks);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });
