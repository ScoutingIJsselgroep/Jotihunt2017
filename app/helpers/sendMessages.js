/**
 * Created by tristan on 23-9-16.
 */
var Bot = require('node-telegram-bot');
var bot = new Bot({
    token: '122155087:AAFsSC1IcEc4srzH9oUKWqmBG8frx5yJs4U'
});
module.exports = {
    sendMessages(messages) {
        for (var message in messages) {
            bot.sendMessage(messages[message]);
        }
    },
    sendMessage(message) {
        bot.sendMessage(message);
    },
    sendLocation(location) {
        bot.sendLocation(location);
    },
    sendLocations(locations){
        for (var location in locations) {
            bot.sendLocation(locations[location]);
        }
    }
}