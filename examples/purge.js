const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", function() {
    console.log("Logged in as %s#5d - %d", client.user.username, client.user.discriminator, client.user.id);
});

client.on("message", async function(message) {
    if (message.content.startsWith(config.prefix)) {
        var args = message.content.split(" ");
        var command = args.shift().slice(1);

        if (command == "purge") {
            try {
                message.delete(); //delete the command
                var message = message.channel.messages.fetch({limit: 100}); //get the messages from the channel
                return message.channel.bulkDelete(messages); //bulk delete the messages
            } catch (err) {
                throw new Error(err); //throw an error if fails
            }
        }
    }
});

client.login(config.token);