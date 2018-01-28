# settings up your first bot

to install nodejs on windows download the installer from https://nodejs.org/en/ and run the installer,
to install nodejs on ubuntu run the following commands in the terminal
<div>
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 68576280<br>
sudo apt-add-repository "deb https://deb.nodesource.com/node_7.x $(lsb_release -sc) main"<br>
sudo apt-get update -y<br>
sudo apt-get install nodejs -y<br>
</div>
<br>

the nodejs installed for windows will automatically install npm for you,<br>
on ubuntu you will need to install this yourself, to do this run sudo apt-get install npm -y

now that nodejs and npm are installed we can make the package.json file<br>
run npm init and then enter the info about your bot and it will then make the package.json file for you when your done

now that you have the package.json file we need to install discord.js<br>

run in the terminal or in command prompt npm i -S discord.js node-opus<br>

now goto https://discordapp.com/developers/applications/me and create a new app, then click the create a bot user button, once its has made a bot user you want to click, click to reveal to get your token (do not give you token to anyone else)<br>
create a new file and save it as config.json, in there is where we are going to be putting the token<br>
in the config.json flle add this code<br>
<pre>
{
  "token": "your super secret token",
   "prefix": "!"
}
</pre>

<pre>
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("config.json");

client.on("ready", function() {
  console.log("Logged in as %s#%d - %d", client.user.username, client.user.discriminator, client.user.id);
});

client.on("message", async function(message) {
  //create your command handler heres
});

client.login(config.token);

the code above will get your bot online without any commands
</pre>
