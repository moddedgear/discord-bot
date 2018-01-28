const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", function() {
    console.log("Logged in as %s#%d - %d", client.user.username, client.user.discriminator, client.user.id);
});

client.on("message", async function(message) {
    //here is where we create our command handler
    if (message.content.startsWith(config.prefix)) {
        //we are checking if the messages starts with our bots prefix first
        var args = message.content.split(" "); //splitting all the contents of the message into an array ['!purge', '100']
        var commmand = args.shift().slice(1); //get the command without the prefix (ping, purge, help)

        if (command == "yourcommand") {
            //do something
        }

        //exmaple command
        if (command == "ping") {
            return message.channel.send("Pong!"); //send a message
            return messge.reply("Pong!"); //reply to the user (mentions in chat)
        }
    }
});

client.login(config.token);