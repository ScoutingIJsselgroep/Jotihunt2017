/**
 * Created by tristan on 23-9-16.
 */
var config = require('./../../config');
var moment = require('moment');
var md5 = require('md5');
var Poll = require('./../../models/poll');
var SendMessages = require('./sendMessages');
var async = require('async');
var request = require('request');

function sendMessage(previousdata, data, hook) {
    switch(hook){
        case "vossen":
            var messageList = [];
            for (var i in data){
                if (!previousdata || (data[i].status != JSON.parse(previousdata.polldata)[i].status && data[i].team == JSON.parse(previousdata.polldata)[i].team)){
                    messageList.push({
                        chat_id: config.telegramchats[data[i].team],
                        text: data[i].team + ' is net op ' + data[i].status + ' gesprongen.' + config.emoticons.status[data[i].status]
                    });
                }
            }
            SendMessages.sendMessages(messageList);
            break;
        case "opdracht":
            request(config.polling.url + hook + '/' + data[0].ID, function (error, response, body) {
                try {
                    SendMessages.sendMessage({
                        chat_id: config.telegramchats[hook],
                        text: JSON.parse(body).data[0].titel + JSON.parse(body).data[0].inhoud.replace(/<\/?[^>]+(>|$)/g, "")
                    });
                } catch (exception){
                }
            });
            break;
        case "nieuws":
            request(config.polling.url + hook + '/' + data[0].ID, function (error, response, body) {
                SendMessages.sendMessage({
                    chat_id: config.telegramchats[hook],
                    text: JSON.parse(body).data[0].titel + JSON.parse(body).data[0].inhoud.replace(/<\/?[^>]+(>|$)/g, "")
                });
            });
            break;
        case "hint":
            var messageList = [];
            for (var i in config.subareas){
                messageList.push({
                    chat_id: config.subareas[i],
                    text: 'Er is een nieuwe hint binnen gekomen. Blijf kalm.'
                });
            }
            break;
    }
}

function callPoll(io){
    var hooks = config.polling.hooks;
    for (var i = 0; i < hooks.length; i++){
        async.waterfall([
            function (callback) {
                // Check if is in database
                var currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a");
                // Add format for partitial minutes
                var currentMinutePart = Math.floor(parseInt(moment().format("s"))/(config.polling.pollTime/1000));

                var md5CurrentTime = md5(currentTime + currentMinutePart + this.hook);
                Poll.find({pollhash: md5CurrentTime}).exec(function (err, pollMessages) {
                    if(!pollMessages.length){
                        // No data for the current time, so go setup a new poll.
                        callback();
                    } else {
                        return;
                    }
                });
            }.bind({hook: hooks[i]}),

            function (callback) {
                // Poll Jotihunt.net
                request(config.polling.url + this.hook, function (error, response, body) {
                    try {
                        if (!error && response.statusCode == 200) {
                            callback(null, JSON.parse(body));
                        }
                    } catch (exception){
                    }
                });
            }.bind({hook: hooks[i]}),

            function (pollData, callback) {
                // Find the last known data
                var hook = this.hook;
                Poll.find({pollhook: this.hook}).sort({created_at: -1}).exec(function (err, pollMessages) {
                    if(pollData.data && (!pollMessages.length || md5(JSON.stringify(pollData.data)) != pollMessages[0].polldatahash)){
                        // New data! Send message and update stores!
                        sendMessage(pollMessages[0], pollData.data, hook);

                        // Update MongoDB
                        callback(null, pollData);

                    }
                });
            }.bind({hook: hooks[i]}),
            function (pollData, callback){
                var currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a");
                var currentMinutePart = Math.floor(parseInt(moment().format("s"))/(config.polling.pollTime/1000));
                var md5CurrentTime = md5(currentTime + currentMinutePart + this.hook);
                var poll = new Poll({
                    pollhash: md5CurrentTime,
                    created_at: new Date(),
                    polldatahash: md5(JSON.stringify(pollData.data)),
                    polldata: JSON.stringify(pollData.data),
                    pollhook: this.hook
                });
                io.sockets.emit('foxStatus', {data: pollData.data});

                poll.save(function(err){

                });
            }.bind({hook: hooks[i], io: io})
        ]);
    }
}

module.exports = {
    /**
     * Schedules the polling service.
     */
    schedulePoll (io) {
        callPoll(io);
        //setInterval(callPoll, config.polling.pollTime);
        setInterval(callPoll.bind(null, io), 1000);
    }
}