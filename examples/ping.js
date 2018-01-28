const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", function() {
    console.log("Logged in as %s#%d - %d", client.user.username, client.user.discriminator, client.user.id);
});

client.on("message", async function(message) {
    if (message.content.startsWith(config.prefix)) {
        var args = messge.content.split(" ");
        var command = args.shift().slice(1);

        if (command == "ping") {
            return message.channel.send("Pong!");
        }
    }
});

client.login(config.token);