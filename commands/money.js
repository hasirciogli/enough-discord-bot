const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const { callSql, cocug } = require('./../internal_modules/database');

const ___intToString = (num) => {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
        { v: 1E3, s: "K" },
        { v: 1E6, s: "M" },
        { v: 1E9, s: "B" },
        { v: 1E12, s: "T" },
        { v: 1E15, s: "P" },
        { v: 1E18, s: "E" }
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

module.exports = [
    {
        data: new SlashCommandBuilder()
            .setName('coin')
            .setDescription('view your coin balance'),
        execute: (eParams) => {
            const commandInteraction = eParams.interaction;

            commandInteraction.reply("wait");
            commandInteraction.deleteReply();

            //.toLocaleString('en-US')

            callSql(`SELECT * FROM users WHERE discord_id = "${commandInteraction.member.user.id}"`, (status, data) => {
                if (!status) return console.log(data);

                if (data.length <= 0) {
                    callSql(`INSERT INTO users (discord_id, ecoin, ecash) VALUES ("${commandInteraction.member.user.id}", "0.025685", "250.15")`, (status, data) => {
                        if (!status) return console.log(data);

                        callSql(`SELECT * FROM users WHERE discord_id = "${commandInteraction.member.user.id}"`, (status, data) => {
                            if (!status || data.length <= 0) return console.log(data);

                            commandInteraction.channel.send("**" + commandInteraction.member.user.username + "** **|** You currently have __**" + data[0].ecoin + "**__ **enough coin**");

                        });

                    });
                    return;
                }
                else {
                    commandInteraction.channel.send("**" + commandInteraction.member.user.username + "** **|** You currently have __**" + data[0].ecoin + "**__ **enough coin**");
                }


            });

        },
    },



    {
        data: new SlashCommandBuilder()
            .setName('cash')
            .setDescription('view your cash balance'),
        execute: (eParams) => {
            const commandInteraction = eParams.interaction;

            commandInteraction.reply("wait");
            commandInteraction.deleteReply();

            //.toLocaleString('en-US')

            callSql(`SELECT * FROM users WHERE discord_id = "${commandInteraction.member.user.id}"`, (status, data) => {
                if (!status) return console.log(data);

                if (data.length <= 0) {
                    callSql(`INSERT INTO users (discord_id, ecoin, ecash) VALUES ("${commandInteraction.member.user.id}", "0.025685", "250.15")`, (status, data) => {
                        if (!status) return console.log(data);

                        callSql(`SELECT * FROM users WHERE discord_id = "${commandInteraction.member.user.id}"`, (status, data) => {
                            if (!status || data.length <= 0) return console.log(data);

                            commandInteraction.channel.send("**" + commandInteraction.member.user.username + "** **|** You currently have __**" + data[0].ecash + "$**__ **cash**");

                        });

                    });
                    return;
                }
                else {
                    commandInteraction.channel.send("**" + commandInteraction.member.user.username + "** **|** You currently have __**" + data[0].ecash + "$**__ **cash**");
                }


            });

        },
    },
    {
        data: new SlashCommandBuilder()
            .setName('coinpay')
            .setDescription('send coin to mentioned user')
            .addUserOption(option =>
                option.setName('user').setDescription('payout mamber').setRequired(true),
            )
            .addNumberOption(option =>
                option.setName('how_many').setDescription('How many ?').setRequired(true),
            ),
        execute: (eParams) => {
            const commandInteraction = eParams.interaction;

            commandInteraction.reply("wait");
            commandInteraction.deleteReply();

            const sucSend = (send, ret) => {
                commandInteraction.channel.send(`Successfully sent ${send} coin to mentioned user, So You are currently have __**${ret}**__ **enough coin**`);
                //commandInteraction.channel.send("**" + commandInteraction.member.user.username + "** **|** You are currently have __**" + data[0].ecoin + "**__ **enough coin**");
            };

            const sucFail = (num = 0) => {
                console.log(num)
                commandInteraction.channel.send(`500 Internal Server Error please try again later (Propably fixed 20 minute later)`);
                //commandInteraction.channel.send("**" + commandInteraction.member.user.username + "** **|** You are currently have __**" + data[0].ecoin + "**__ **enough coin**");
            };

            var mentionedMember = commandInteraction.options.getMember("user");
            var mentionedNumber = commandInteraction.options.getNumber("how_many");

            cocug(commandInteraction.member.user.id, (status, ci) => {
                if (!status) return sucFail(data, 1);
                ci = ci[0];

                var nDiff = (parseFloat(ci.ecoin) - parseFloat(mentionedNumber));

                if  (nDiff <= 0){
                    return commandInteraction.channel.send(`You dont have ${mentionedNumber} enough coin`);
                }
                else{

                    cocug(mentionedMember.user.id, (status, mu) => {
                        if (!status) return sucFail(data, 2);
    
                        mu = mu[0];
    
                        var nAdd = (parseFloat(mu.ecoin) + parseFloat(mentionedNumber));
                        var nDiff = (parseFloat(ci.ecoin) - parseFloat(mentionedNumber));
    
                        callSql(`UPDATE users SET ecoin = "` + nDiff + `" WHERE discord_id="` + commandInteraction.member.user.id + `"`, (status, data) => {
                            if (!status) return sucFail(data, 3);
    
                            callSql(`UPDATE users SET ecoin = "` + nAdd + `" WHERE discord_id="` + mu.discord_id + `"`, (status, data) => {
                                if (!status) return sucFail(data, 4);
    
                                callSql(`SELECT * FROM users WHERE discord_id = "${commandInteraction.member.user.id}"`, (status, datax) => {
                                    if (!status || data.length <= 0) return sucFail(data, 5);
    
                                    sucSend(mentionedNumber, datax[0].ecoin);
    
                                });
    
                            });
    
                        });
                    });
                }
                
                

            });

        },
    },
    {
        data: new SlashCommandBuilder()
            .setName('cashpay')
            .setDescription('send cash to mentioned user')
            .addUserOption(option =>
                option.setName('user').setDescription('payout mamber').setRequired(true),
            )
            .addNumberOption(option =>
                option.setName('how_many').setDescription('How many ?').setRequired(true),
            ),
        execute: (eParams) => {
            const commandInteraction = eParams.interaction;

            commandInteraction.reply("wait");
            commandInteraction.deleteReply();

            const sucSend = (send, ret) => {
                commandInteraction.channel.send(`Successfully sent ${send} ecash to mentioned user, So You are currently have __**${ret}**__ **enough cash**`);
                //commandInteraction.channel.send("**" + commandInteraction.member.user.username + "** **|** You are currently have __**" + data[0].ecash + "**__ **enough coin**");
            };

            const sucFail = (num = 0) => {
                console.log(num)
                commandInteraction.channel.send(`500 Internal Server Error please try again later (Propably fixed 20 minute later)`);
                //commandInteraction.channel.send("**" + commandInteraction.member.user.username + "** **|** You are currently have __**" + data[0].ecash + "**__ **enough coin**");
            };

            var mentionedMember = commandInteraction.options.getMember("user");
            var mentionedNumber = commandInteraction.options.getNumber("how_many");

            cocug(commandInteraction.member.user.id, (status, ci) => {
                if (!status) return sucFail(data, 1);
                ci = ci[0];

                var nDiff = (parseFloat(ci.ecash) - parseFloat(mentionedNumber));

                if  (nDiff <= 0){
                    return commandInteraction.channel.send(`You dont have ${mentionedNumber} enough cash`);
                }
                else{

                    cocug(mentionedMember.id, (status, mu) => {
                        if (!status) return sucFail(data, 2);
    
                        mu = mu[0];
    
                        var nAdd = (parseFloat(mu.ecash) + parseFloat(mentionedNumber));
                        var nDiff = (parseFloat(ci.ecash) - parseFloat(mentionedNumber));
    
                        callSql(`UPDATE users SET ecash = "` + nDiff + `" WHERE discord_id="` + commandInteraction.member.user.id + `"`, (status, data) => {
                            if (!status) return sucFail(data, 3);
    
                            callSql(`UPDATE users SET ecash = "` + nAdd + `" WHERE discord_id="` + mu.discord_id + `"`, (status, data) => {
                                if (!status) return sucFail(data, 4);
    
                                callSql(`SELECT * FROM users WHERE discord_id = "${commandInteraction.member.user.id}"`, (status, datax) => {
                                    if (!status || data.length <= 0) return sucFail(data, 5);
    
                                    sucSend(mentionedNumber, datax[0].ecash);
    
                                });
    
                            });
    
                        });
                    });
                }
                
                

            });

        },
    },
];