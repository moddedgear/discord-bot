const discord = require("discord.js");
const mysql = require("mysql");
const fs = require("fs");
const options = require("./phoenix.json");
const client = new discord.Client();
const {Util} = require("discord.js");
const dev = "374518519502471169";
const regex = /\d+/;
const Member = require("./Modules/Member.js");
var prize = 1;
var releaseDate = "21st January 2018";
var banned = false;
const colors = {
    WHITE: 16777215,
    BLACK: 0,
    RED: 16711680,
    GREEN: 45568,
    BLUE: 255,
    YELLOW: 16776960,
    PURPLE: 7405823,
    VIOLET: 12976383,
    CYAN: 65535,
    LIGHTGREEN: 65280,
    GREY: 2830381,
    LIGHTGREY: 9144970,
    DEFAULT: 3447003
}

try {
    var db = mysql.createConnection({
        host: "localhost",
        user: options.user,
        password: options.pass
    });

    db.query("USE " + options.maindb);
    //db.query("USE test");
    console.log("[MySQL] Connected!");
} catch (err) {
    console.error("ERROR: " + err);
}

"use strict";

client.on("ready", async () => {
    console.log("Logged in as %s#%d - %d", client.user.username, client.user.discriminator, client.user.id);
    db.query("SELECT * FROM version", (err, data) => {
        if (err) {
            throw new Error(err);
        } else {
            client.user.setActivity("Update " + data[0].ver);
        }
    });
});

client.on("message", async message => {
    /**
     * @class 
     * @constructor
     */
    class Config {
        constructor(config) {
            this.config = config;
        }
    }
    /**
     * @extends {Config}
     * @constructor
     * @class
     */
    class Guild extends Config {
        constructor(guildConfig) {
            super(guildConfig, guildConfig);
        }
    }
    /**
     * @class
     * @constructor
     */
    class Manager {
        constructor(gamble) {
            this.gamble = gamble;
        }
    }
    /**
     * @extends {Manager}
     * @constructor
     * @class
     */
    class Gamble extends Manager {
        constructor(data) {
            super(data);
        }
    }
    
    var builder = new Config();
    var manager = new Manager();

    async function denied() {
        await message.reply("**You don\'t have permission!** :lock:");
    }

    if (message.content.startsWith(options.prefix) == true) {
        var args = message.content.split(" ");
        var command = args[0].substr(2).toLowerCase();
        args = args.splice(1);

        if (command == "help" || command == "") {
            await message.channel.send(message.author.toString() + " Check your DM\'s")
            let member = await message.guild.members.get(message.author.id);
            var author = await message.guild.members.get(dev);
            member.send({
                embed: {
                    color: 3447004,
                    title: "Help Menu | Donkey",
                    description: "Here is a list of the commands for the bot!",
                    author: {
                        name: author.user.username + "#" + author.user.discriminator,
                        icon_url: author.user.displayAvatarURL({format: "png", size: 2048})
                    },
                    thumbnail: {
                        url: author.user.displayAvatarURL({format: "png", size: 2048})
                    },
                    fields: [
                        {
                            name: "**Moderation Commands**",
                            value: "s!warn <@user> <reason> - warns a user\ns!mute <@user> <reason> - mutes a member (not in vc)\ns!unmute <@user> <reason> - unmutes a muted member\ns!servermute <@user> <reason> - server mutes member in voice channel\ns!serverunmute <@user> <reason> - server unmutes member in voice channel\ns!softban <@user> <reason> - softban a user\ns!sunban <@user> <reason> revoke softban\ns!ghostify <@user> <reason> - makes user a ghost"
                        },
                        {
                            name: "**Invites**",
                            value: "s!botinvite - bot invite link\ns!serverinvite - bot server invite link"
                        },
                        {
                            name: "**Other Commands**",
                            value: "s!say <channel> <message> - send message to specific channel\ns!version - shows you the current version\ns!devs - lists the developers\ns!ping - get reponse time"
                        },
                        {
                            name: "**Fun Commands**",
                            value: "s!profile - displays profile\ns!profile <@user> - displays other users profile\ns!gamble <amount> - gamble with DonkeyBucks\ns!sendcash <@user> <amount> - send cash to a user"
                        },
                        {
                            name: "**Dev Commands**",
                            value: "s!givecash <@user> <amount>\ns!takecash <@user> <amount>"
                        }
                    ],
                    timestamp: new Date()
                }
            });
        }
        
        if (command == "warn") {
            await message.delete();
            if (message.guild.member(message.author.id).hasPermission("ADMINISTRATOR") == true || message.author.id == dev) {
                try {
                    let member = await message.guild.members.find("id", args[0].match(regex)[0]);
                    let reason = args.join(" ").substr(args[0].length+1);
                    await member.send({
                        embed: {
                            color: 16711680,
                            title: "WARNING!",
                            author: {
                                name: client.user.username + "#" + client.user.discriminator
                            },
                            thumbnail: {
                                url: client.user.displayAvatarURL({format: "png", size: 2048})
                            },
                            fields: [
                                {
                                    name: "**YOU HAVE BEEN WARNED!!!**",
                                    value: ":rage: :rage: :rage: :rage:"
                                },
                                {
                                    name: "**Warned By:**",
                                    value: message.author.username + "#" + message.author.discriminator
                                },
                                {
                                    name: "**Reason:**",
                                    value: reason
                                }
                            ],
                            timestamp: new Date()
                        }
                    });
                } catch (err) {
                    await message.reply("s!warn <@user> <reason>");
                }
            } else {
                try {
                    await message.delete();
                    denied();
                } catch (err) {
                    console.error(err);
                }
            }
        } else if (command == "purge") {
            if (message.guild.member(message.author.id).hasPermission("MANAGE_MESSAGES") == true || message.author.id == dev) {
                if (args == "") {
                    try {
                        let messages = await message.channel.messages.fetch({limit: 100});
                        message.channel.bulkDelete(messages, true);
                    } catch (err) {
                        await console.log("ERROR: " + err);
                    }
                } else {
                    try {
                        let messages = await message.channel.messages.fetch({limit: args});
                        message.channel.bulkDelete(messages, true);
                    } catch (err) {
                        await message.reply("s!purge <number>");
                    }
                }
            } else {
                try {
                    await message.delete();
                    denied();
                } catch (err) {
                    console.error(err);
                }
            }
        } else if (command == "mute") {
            if (message.guild.member(message.author.id).hasPermission("MANAGE_ROLES") == true || message.author.id == dev) {
                try {
                    if (message.guild.roles.find("name", "muted") == null) {
                        await message.guild.createRole({
                            data: {
                                name: "muted",
                                color: "RED",
                                hoist: false,
                                position: 0,
                                permissions: 345152,
                                mentionable: false
                            }
                        });
                    } else {
                        try {
                            var member = await message.guild.members.get(args[0].match(regex)[0]);
                            if (!member.roles.find("name", "muted")) {
                                await message.delete();
                                var mutedRole = await message.guild.roles.find("name", "muted");
                                var reason = args.splice(1).join(" ") || null;
                                if (reason == null) {
                                    await message.reply("You must provide a reason!");
                                } else {
                                    member.setRoles([mutedRole.id]);
                                    message.guild.roles.find("name", "@everyone").edit({permissions: 0});
                                    await message.channel.send(member.toString() + " **has been muted (reason: " + reason + ")** :mute:");
                                }
                            } else {
                                await message.delete();
                                await message.channel.send(member.toString() + " **is already muted** :mute:"); 
                            }
                        } catch (e) {
                            await message.reply("s!mute <@user> <reason>");
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                try {
                    await message.delete();
                    denied();
                } catch (err) {
                    console.error(err);
                }
            }
        } else if (command == "unmute") {
            if (message.guild.member(message.author.id).hasPermission("MANAGE_ROLES") || message.author.id == dev) {
                try {
                    var member = await message.guild.members.get(args[0].match(regex)[0]);
                    if (!member.roles.find("name", "muted")) {
                        await message.delete();
                        await message.channel.send(member.toString() + " **is not muted**");
                    } else {
                        await message.delete();
                        var mutedRole = await message.guild.roles.find("name", "muted");
                        var reason = args.splice(1).join(" ") || null;
                        if (reason == null) {
                            await message.reply("You must provide a reason!");
                        } else {
                            member.removeRole(mutedRole.id);
                            await message.channel.send(member.toString() + " **has been unmuted (reason: " + reason + ")** :loud_sound:");
                        }
                    }
                } catch (e) {
                    await message.reply("s!mute <@user> <reason>");
                }
            } else {
                try {
                    await message.delete();
                    denied();
                } catch (err) {
                    console.error(err);
                }
            }
        } else if (command == "servermute") {
            await message.delete();
            if (message.guild.member(message.author.id).hasPermission("MUTE_MEMBERS") == true || message.author.id == dev) {
                try {
                    var member = await message.guild.members.get(args[0].match(regex)[0]);
                    var reason = args.splice(1).join(" ") || null;
                    if (!member.voiceChannel) {
                        await message.channel.send(member.toString() + " **is not in a voice channel**");
                    } else {
                        if (reason == null) {
                            await message.reply("You must provide a reason!");
                        } else {
                            if (member.serverMute == true) {
                                await message.channel.send(member.toString() + " **is already server muted!**");
                            } else {
                                await member.setMute(true);
                                await message.channel.send(member.toString() + " **has been server muted (reason: " + reason + ")** :mute:");
                            }
                        }
                    }
                } catch (err) {
                    await message.reply("s!servermute <@user> <reason");
                }
            } else {
                try {
                    await message.delete();
                    denied();
                } catch (err) {
                    console.error(err);
                }
            }
        } else if (command == "serverunmute") {
            await message.delete();
            if (message.guild.member(message.author.id).hasPermission("MUTE_MEMBERS") == true || message.author.id == dev) {
                try {
                    var member = await message.guild.members.get(args[0].match(regex)[0]);
                    var reason = args.splice(1).join(" ") || null;
                    if (!member.voiceChannel) {
                        await message.channel.send(member.toString() + " **is not in a voice channel**");
                    } else {
                        if (reason == null) {
                            await message.reply("You must provide a reason!");
                        } else {
                            if (member.serverMute == false) {
                                await message.channel.send(member.toString() + " **is not server muted**");
                            } else {
                                await member.setMute(false);
                                await message.channel.send(member.toString() + " **has been server unmuted (reason: " + reason + ")** :loud_sound:");
                            }
                        }
                    }
                } catch (err) {
                    await message.reply("s!serverunmute <@user> <reason>");
                }
            } else {
                try {
                    await message.delete();
                    denied();
                } catch (err) {
                    console.error(err);
                }
            }
        } else if (command == "botinvite") {
            message.channel.send(`${message.author.toString()} Here is the invite link for the bot!\n<https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958591>`);
        } else if (command == "config") {
            if (message.guild.member(message.author.id).hasPermission("MANAGE_SERVER") == true || message.author.id == dev) {
                try {
                    db.query(`SELECT * FROM guild_config WHERE guild_name = ${JSON.stringify(message.guild.name)}`, (error, data) => {
                        try {
                            if (error) {
                                throw new Error(error);
                            } else {
                                if (data == "") {
                                    var guildSettings = Object.create(new builder.constructor({
                                        settings: {
                                            test: "Under Development :tools:",
                                        }
                                    }));
                                    guildSettings = JSON.stringify(guildSettings.config);
                                    db.query(`INSERT INTO guild_config (guild_name, config_data) VALUES (${JSON.stringify(message.guild.name)}, ${JSON.stringify(guildSettings)})`);
                                    return message.channel.send(message.author.toString() + " Build successful!");
                                } else {
                                    var guildData = JSON.parse(data[0].config_data);
                                    guildData.settings.test_one = false;
                                    db.query(`UPDATE guild_config SET config_data = ${JSON.stringify(guildData)}`);
                                    return message.channel.send({
                                        embed: {
                                            title: "Server Settings/Config | " + message.guild.name,
                                            description: "The current configuration for this guild",
                                            color: 12714239,
                                            author: {
                                                name: message.author.username + "#" + message.author.discriminator,
                                                icon_url: message.guild.iconURL
                                            },
                                            thumbnail: {
                                                url: message.guild.iconURL
                                            },
                                            fields: [
                                                {
                                                    name: "Settings:",
                                                    value: guildData.settings.test
                                                }
                                            ]
                                        }
                                    });
                                }
                            }
                        } catch (err) {
                            console.error(err);
                        }
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        } else if (command == "softban") {
            if (message.guild.member(message.author.id).hasPermission("MANAGE_ROLES") == true || message.author.id == dev) {
                try {
                    if (message.guild.roles.find("name", "softban") == null) {
                        await message.guild.createRole({
                            data: {
                                name: "softban",
                                color: "RED",
                                hoist: false,
                                position: 0,
                                permissions: 1024,
                                mentionable: false
                            }
                        });
                    } else {
                        try {
                            var member = await message.guild.members.get(args[0].match(regex)[0]);
                            if (!member.roles.find("name", "softban")) {
                                await message.delete();
                                var mutedRole = await message.guild.roles.find("name", "softban");
                                var reason = args.splice(1).join(" ") || null;
                                if (reason == null) {
                                    await message.reply("You must provide a reason!");
                                } else {
                                    member.setRoles([mutedRole.id]);
                                    message.guild.roles.find("name", "@everyone").edit({permissions: 0});
                                    await message.channel.send(member.toString() + " **has been softbanned (reason: " + reason + ")** :hammer:");
                                }
                            } else {
                                await message.delete();
                                await message.channel.send(member.toString() + " **is already softbanned** :hammer:"); 
                            }
                        } catch (e) {
                            await message.reply("s!softban <@user> <reason>");
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                try {
                    await message.delete();
                    denied();
                } catch (err) {
                    console.error(err);
                }
            }
        } else if (command == "sunban") {
            if (message.guild.member(message.author.id).hasPermission("MANAGE_ROLES") || message.author.id == dev) {
                try {
                    var member = await message.guild.members.get(args[0].match(regex)[0]);
                    if (!member.roles.find("name", "softban")) {
                        await message.delete();
                        await message.channel.send(member.toString() + " **is not softbanned**");
                    } else {
                        await message.delete();
                        var mutedRole = await message.guild.roles.find("name", "softban");
                        var reason = args.splice(1).join(" ") || null;
                        if (reason == null) {
                            await message.reply("You must provide a reason!");
                        } else {
                            member.removeRole(mutedRole.id);
                            await message.channel.send(member.toString() + " **has been unbanned (reason: " + reason + ")** :unlock:");
                        }
                    }
                } catch (e) {
                    await message.reply("s!sunban <@user> <reason>");
                }
            } else {
                try {
                    await message.delete();
                    denied();
                } catch (err) {
                    console.error(err);
                }
            }
        } else if (command == "checkid") {
            let member = Member.fetch_byID(args[0]);
            message.channel.send(member.user.username + "#" + member.user.discriminator);
        } else if (command == "say") {
            Member.channelSay(args.shift(), args.join(" "));
        } else if (command == "ghostify") {
            message.channel.send(message.author.toString() + " not ready yet!");
        } else if (command == "serverinvite") {
            message.channel.send(message.author.toString() + " https://discord.gg/gG5WHTs");
        } else if (command == "version") {
            db.query("SELECT * FROM version", (err, data) => {
                message.channel.send({
                    embed: {
                        color: colors.LIGHTGREEN,
                        title: "Version | " + client.user.username + "#" + client.user.discriminator,
                        author: {
                            name: client.user.username,
                            icon_url: client.user.displayAvatarURL({format: "png", size: 2048})
                        },
                        thumbnail: {
                            url: client.user.displayAvatarURL({format: "png", size: 2048})
                        },
                        fields: [
                            {
                                name: data[0].ver,
                                value: "Released: " + releaseDate
                            }
                        ]
                    }
                });
            });
        } else if (command == "devs") {
            message.channel.send({
                embed: {
                    title: "Developers | " + client.user.username,
                    color: colors.BLUE,
                    author: {
                        name: client.user.username + "#" + client.user.discriminator,
                    },
                    thumbnail: {
                        url: "https://www.netgains.org/wp-content/uploads/2014/01/node_js.png"
                    },
                    fields: [
                        {
                            name: "Bot Developers:",
                            value: "*Satan#3044* **-** *ᴙɘTꙅzlib#4005*"
                        }
                    ]
                }
            });
        } else if (command == "profile") {
            if (args == "") {
                args = message.author.id;
            } else {
                args = message.mentions.members.first().id;
            }

            db.query("SELECT * FROM bot_data WHERE discordID = " + JSON.stringify(args) + " LIMIT 1", (err, data) => {
                if (err) {
                    throw new Error(err);
                } else {
                    if (data == "" && message.author.id == args) {
                        let m = message.guild.members.get(args);
                        db.query(`INSERT INTO bot_data (discriminator, discordID, cash, daily, loan, loan_amount, gamble, banned, description, badges, name, win_chance) VALUES (${JSON.stringify(m.user.discriminator)}, ${JSON.stringify(m.user.id)}, 5000, 0, 0, 0, 0, 0, ${JSON.stringify("-")}, ${JSON.stringify("-")}, ${JSON.stringify(m.user.username)}#${JSON.stringify(m.user.discriminator)}, 1)`, e => {
                            if (e) {
                                return message.channel.send(m.toString() + " - " + e);
                            } else {
                                return message.channel.send(m.toString() + " Account created! :wink:");
                            }
                        });
                    } else if (data == "" && message.author.id != args) {
                        return message.channel.send(message.guild.members.get(args).toString() + " has no profile :wink:");
                    } else {
                        return message.channel.send({
                            embed: {
                                color: colors.DEFAULT,
                                description: data[0].description,
                                author: {
                                    name: message.guild.members.get(args).user.username + "#" + message.guild.members.get(args).user.discriminator
                                },
                                thumbnail: {
                                    url: message.guild.members.get(args).user.displayAvatarURL({format: "png", size: 2048})
                                },
                                fields: [
                                    {
                                        name: "Badges:",
                                        value: data[0].badges
                                    },
                                    {
                                        name: "PhoenixPounds:",
                                        value: data[0].cash + " :pound:"
                                    }
                                ]
                            }
                        });
                    }
                }
            });
        } else if (command == "gamble") {
            db.query(`SELECT * FROM bot_data WHERE discordID = ${JSON.stringify(message.author.id)}`, async (err, data) => {
                if (err) {
                    throw new Error(err);
                } else {
                    try {
                        if (data[0].gamble == 0) {
                            /**
                                * @param {number} amount - how much to gamble
                                */

                            async function gamble(amount) {
                                this.amount = amount
                                var chances = [1, 0, 0, 1, 0, 1, 1];
                                var allowed = false;

                                if (isNaN(amount)) {
                                    message.reply("s!gamble <amount>");
                                    allowed = false;
                                } else if (Math.abs(amount) > data[0].cash) {
                                    message.reply("You dont have enough :pound:");
                                    allowed = false;
                                } else if (Math.abs(amount) > 10000) {
                                    message.reply("What are you doing, max bet is: **10000** :pound:");
                                    allowed = false;
                                } else if (amount <= 0) {
                                    message.reply("What are you doing, you cannot gamble less than 0");
                                    allowed = false;
                                } else {
                                    allowed = true;
                                }

                                if (allowed) {
                                    let num = Math.floor(Math.random() * chances.length);
                                    if (chances[num] == 1) {
                                        let winnings = Math.floor(Math.PI + Math.pow(amount, prize)) + Math.floor(Math.random() * amount / 2);
                                        message.channel.send({
                                            embed: {
                                                title: "Gambling | WIN",
                                                color: colors.LIGHTGREEN,
                                                author: {
                                                    name: message.author.username + "#" + message.author.discriminator
                                                },
                                                thumbnail: {
                                                    url: "https://mm.aiircdn.com/158/271769.jpg"
                                                },
                                                fields: [
                                                    {
                                                        name: "Used:",
                                                        value: amount + " :pound:"
                                                    },
                                                    {
                                                        name: "WON:",
                                                        value: winnings + " :pound:"
                                                    }
                                                ],
                                                timestamp: new Date()
                                            }
                                        });
                                    
                                        db.query(`UPDATE bot_data SET cash = cash + ${winnings} WHERE discordID = ${JSON.stringify(message.author.id)}`);
                                    } else {
                                        message.channel.send({
                                            embed: {
                                                tite: "Gambling | LOST",
                                                color: colors.RED,
                                                author: {
                                                    name: message.author.username + "#" + message.author.discriminator
                                                },
                                                thumbnail: {
                                                    url: "https://www.askideas.com/media/73/Maggie-Simpson-Showing-Loser-Sign-Picture.jpg"
                                                },
                                                fields: [
                                                    {
                                                        name: "Used:",
                                                        value: amount + " :pound:"
                                                    },
                                                    {
                                                        name: "LOST:",
                                                        value: amount + " :pound:"
                                                    }
                                                ],
                                                timestamp: new Date()
                                            }
                                        });
                                    
                                        db.query(`UPDATE bot_data SET cash = cash - ${amount} WHERE discordID = ${JSON.stringify(message.author.id)}`);
                                    }
                                } else {
                                    return undefined;
                                }
                                
                            }

                            gamble(parseInt(args.shift()));
                        } else if (data[0].gamble == 1) {
                            return message.author.send({
                                embed: {
                                    color: colors.RED,
                                    title: "**YOU HAVE BEEN BANNED FROM GAMBLING!**",
                                    author: {
                                        name: client.user.username + "#" + client.user.discriminator
                                    },
                                    thumbnail: {
                                        url: client.user.displayAvatarURL({format: "png", size: 2048})
                                    },
                                    fields: [
                                        {
                                            name: "*You have been banned from gambling!*",
                                            value: "[Support Server](https://discord.gg/baPWpRU)"
                                        }
                                    ]
                                },
                                timestamp: new Date()
                            });
                            message.reply("Gambling has been put on lockdown! (Gambling will be unlocked soon)");
                        } else if (data[0].gamble == 2) {
                            return message.author.send({
                                embed: {
                                    color: colors.RED,
                                    title: "**LOCKDOWN :lock:**",
                                    author: {
                                        name: client.user.username + "#" + client.user.discriminator
                                    },
                                    thumbnail: {
                                        url: client.user.displayAvatarURL({format: "png", size: 2048})
                                    },
                                    fields: [
                                        {
                                            name: "*Gambling has been put on lockdown!*",
                                            value: "[Support Server](https://discord.gg/baPWpRU)"
                                        }
                                    ]
                                },
                                timestamp: new Date()
                            });
                            message.reply("Gambling has been put on lockdown!");
                        } else {
                            return undefined;
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }
            });
        } else if (command == "verupdate") {
            if (message.author.id == dev) {
                let newVer = args.shift();
                db.query(`UPDATE version SET ver = ${JSON.stringify(newVer)}`);
                message.delete();
            } else {
                return message.channel.send(message.author.toString() + " You are not allowed to use this command!");
            }
        } else if (command == "sendcash") {
            if (args.length == 2) {
                var member = args.shift().match(regex).shift();
                var amount = args.shift();
                message.delete();

                db.query(`SELECT * FROM bot_data WHERE discordID = ${JSON.stringify(message.author.id)}`, (err, data) => {
                    if (err) {
                        throw new Error(err);
                    } else {
                        if (amount > data[0].cash) {
                            return message.channel.send(message.author.toString() + " You dont have enough cash");
                        } else if (amount < 0) {
                            return message.channel.send(message.author.toString() + " You cannot send less than 0");
                        } else {
                            db.query(`UPDATE bot_data SET cash = cash - ${amount} WHERE discordID = ${JSON.stringify(message.author.id)}`);
                            db.query(`UPDATE bot_data SET cash = cash + ${amount} WHERE discordID = ${JSON.stringify(member)}`, (err) => {
                                if (err) {
                                    throw new Error(err);
                                } else {
                                    return message.channel.send(`${message.author.toString()} **Sent** **${amount}** :pound: to ${message.guild.member(member).toString()}`);
                                }
                            });
                        }
                    }
                });
            } else if (args.length == 1) {
                return message.channel.send("s!sendcash <@user> <amount>");
            } else if (args.length == 0) {
                return message.channel.send("s!sendcash <@user> <amount>");
            }
        } else if (command == "givecash") {
            if (message.author.id == dev) {
                if (args.length == 0 || args.length == 1) {
                    return message.channel.send("s!givecash <@user> <amount>");
                } else {
                    var member = message.mentions.members.first().id;
                    var amount = args.pop();
                    message.delete();

                    db.query(`UPDATE bot_data SET cash = cash + ${amount} WHERE discordID = ${JSON.stringify(member)}`, (err) => {
                        if (err) {
                            throw new Error(err);
                        } else {
                            return message.channel.send(`+**${amount}** :pound: ${message.guild.member(member).toString()}`);
                        }
                    });
                }
            }
        } else if (command == "chance") {
            if (message.author.id == dev || message.author.id == "342808086215524352" || message.author.id == "377538099896385547") {
                prize = args.shift();
                message.delete();
            }
        } else if (command == "takecash") {
            if (message.author.id == dev || message.author.id == "342808086215524352" || message.author.id == "377538099896385547") {
                if (args.length == 0 || args.length == 1) {
                    return message.channel.send("s!takecash <@user> <amount>");
                } else {
                    var member = message.mentions.members.first().id;
                    var amount = args.pop();
                    message.delete();

                    db.query(`UPDATE bot_data SET cash = cash - ${amount} WHERE discordID = ${JSON.stringify(member)}`, (err) => {
                        if (err) {
                            throw new Error(err);
                        } else {
                            return message.channel.send(`-**${amount}** :pound: ${message.guild.member(member).toString()}`);
                        }
                    });
                }
            }
        } else if (command == "ping") {
            client.ping;
            return message.channel.send(`${client.pings[0]}ms`);
        } else if (command == "gamblelock") {
            if (message.author.id == dev || message.author.id == "342808086215524352" || message.author.id == "377538099896385547") {
                db.query("UPDATE bot_data SET gamble = 2", (err) => {
                    if (err) {
                        throw new Error(err);
                    } else {
                        return message.channel.send(message.author.toString() + " has put gambling on lockdown! :lock:");
                    }
                });
            }
        } else if (command == "gambleunlock") {
            if (message.author.id == dev || message.author.id == "342808086215524352" || message.author.id == "377538099896385547") {
                db.query("UPDATE bot_data SET gamble = 0", (err) => {
                    if (err) {
                        throw new Error(err);
                    } else {
                        return message.channel.send(message.author.toString() + " has unlocked gambling!, :unlock:");
                    }
                });
            }
        } else if (command == "botban") {
            if (message.author.id == dev || message.author.id == "342808086215524352" || message.author.id == "377538099896385547") {
                var member = message.mentions.members.first();
                db.query(`SELECT * FROM bot_data WHERE discordID = ${JSON.stringify(member.id)}`, (err, data) => {
                    if (err) {
                        if (data[0].banned == 1) {
                            return message.reply("What are you doing?, this member is already banned from using the bot!");
                        } else {
                            db.query(`UPDATE bot_data SET banned = 1 WHERE discordID = ${JSON.stringify(member.id)}`, (err) => {
                                if (err) {
                                    throw new Error(err);
                                } else {
                                    return message.channel.send(member.toString() + " has been banned from using bot!");
                                }
                            });
                        }
                    }
                });
            }
        } else if (command == "botunban") {
            if (message.author.id == dev || message.author.id == "342808086215524352" || message.author.id == "377538099896385547") {
                var member = message.mentions.members.first();
                db.query(`SELECT * FROM bot_data WHERE discordID = ${JSON.stringify(member.id)}`, (err, data) => {
                    if (err) {
                        throw new Error(err);
                    } else {
                        db.query(`UPDATE bot_data SET banned = 0 WHERE discordID = ${JSON.stringify(member.id)}`, (err) => {
                            if (err) {
                                throw new Error(err);
                            } else {
                                if (data[0].banned == 0) {
                                    return message.reply("What are you doing?, you cant unbotban someone that isnt banned!");
                                } else {
                                    return message.channel.send(member.toString() + " has been unbanned from using the bot");
                                }
                            }
                        });
                    }
                });
            }
        }
    }
});

client.login(options.token);