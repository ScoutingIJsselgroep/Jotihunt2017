/**
 * Created by tristan on 23-9-16.
 */
var config = require('./../../config');
var moment = require('moment');
var md5 = require('js-md5');
var Poll = require('./../../models/poll');
var Hint = require('./../../models/hint');
var SendMessages = require('./sendMessages');
var async = require('async');
var request = require('request');

function sendMessage(previousdata, data, hook) {
    switch(hook){
        case "vossen":
            var messageList = [];
            for (var i in data){
                if (!previousdata || (data[i].status != previousdata[i].status && data[i].team == previousdata[i].team)){

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
                SendMessages.sendMessage({
                    chat_id: config.telegramchats[hook],
                    text: JSON.parse(body).data[0].titel + JSON.parse(body).data[0].inhoud.replace(/<\/?[^>]+(>|$)/g, "")
                });
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
            for (var i in config.subareas){
                messageList.push({
                    chat_id: config.subareas[i],
                    text: 'Er is een nieuwe hint binnen gekomen. Blijf kalm.'
                });
            }
            break;
    }
}

function callPoll(){
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
                    if (!error && response.statusCode == 200) {
                        callback(null, JSON.parse(body));
                    }
                }).bind({hook: this.hook});
            }.bind({hook: hooks[i]}),

            function (pollData, callback) {
                // Find the last known data
                var hook = this.hook;
                Poll.find({pollhook: this.hook}).sort({created_at: -1}).exec(function (err, pollMessages) {
                    if(!pollMessages.length || md5(pollData.data) != pollMessages[0].polldatahash){
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
                    polldatahash: md5(pollData.data),
                    polldata: pollData.data,
                    pollhook: this.hook
                });

                poll.save(function(err){

                });
            }.bind({hook: hooks[i]})
        ]);
        // First, check if is in Database
        // md5: md5(moment(formatwithoutSeconds)+hooks[i])
        // if not exists, poll Jotihunt.net
        // findLast(hook)
        // If findLast == null || md5(data[0]) != findLast.messageMd5
        // We've got a new one! Send a message!
        // Insert poll into DB
    }
}

module.exports = {
    /**
     * Schedules the polling service.
     */
    schedulePoll () {
        callPoll();
        //setInterval(callPoll, config.polling.pollTime);
        setInterval(callPoll, 1000);
    }
}