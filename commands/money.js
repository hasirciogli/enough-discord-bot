const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const { getUser, updateSomethink } = require('./../internal_modules/database');

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

            getUser(commandInteraction.user.id, true, async (status1, res1) => {
                if (status1) {
                    commandInteraction.channel.send("**" + commandInteraction.member.user.username + "** **|** You currently have __**" + res1.ecoin + "**__ **coin**");
                }
                else {
                    commandInteraction.channel.send("internal error try again...");
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

            getUser(commandInteraction.user.id, true, async (status1, res1) => {
                if (status1) {
                    await commandInteraction.channel.send("**" + commandInteraction.member.user.username + "** **|** You currently have __**" + res1.ecash + "$**__ **cash**");
                }
                else {
                    await commandInteraction.channel.send("internal error try again...");
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

            if (mentionedNumber <= 0) {
                commandInteraction.channel.send(":)");
                return;
            }

            var mentionedMember = commandInteraction.options.getMember("user");
            var mentionedNumber = commandInteraction.options.getNumber("how_many");

            getUser(commandInteraction.user.id, true, async (status1, res1) => {
                if (status1) {
                    if (res1.ecoin >= mentionedNumber) {
                        getUser(mentionedMember.id, true, async (status2, res2) => {
                            if (status2) {
                                updateSomethink("ebot", "users", { _id: commandInteraction.user.id }, { "ecoin": -(mentionedNumber) }, {}, async (status3, res3) => {
                                    if (!status3)
                                        sucFail();
                                    else {
                                        updateSomethink("ebot", "users", { _id: mentionedMember.id }, { "ecoin": -(mentionedNumber) }, {}, async (status4, res4) => {
                                            if (!status4)
                                                sucFail();
                                            else {
                                                sucSend(mentionedMember, res1.ecoin - mentionedNumber);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        commandInteraction.channel.send("you dont have "+ mentionedNumber + "ecoin");

                    }
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

            if (mentionedNumber <= 0) {
                commandInteraction.channel.send(":)");
                return;
            }

            getUser(commandInteraction.user.id, true, async (status1, res1) => {
                if (status1) {
                    if (res1.ecash >= mentionedNumber) {
                        getUser(mentionedMember.id, true, async (status2, res2) => {
                            if (status2) {
                                updateSomethink("ebot", "users", { _id: commandInteraction.user.id }, { "ecash": -(mentionedNumber) }, {}, async (status3, res) => {
                                    if (!status3)
                                        sucFail();
                                    else {
                                        updateSomethink("ebot", "users", { _id: mentionedMember.id }, { "ecash": (mentionedNumber) }, {}, async (status4, res) => {
                                            if (!status4)
                                                sucFail();
                                            else {
                                                sucSend(mentionedMember, res1.ecash - mentionedNumber);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        commandInteraction.channel.send("you dont have "+ mentionedNumber + "ecash");

                    }
                }
            });

        },
    },
];