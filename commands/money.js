const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const { callSql } = require('./../internal_modules/database');

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
    }
];