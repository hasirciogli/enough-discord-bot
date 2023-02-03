const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { callSql, initializeServer } = require('./../internal_modules/database');

module.exports = [
    {
        data: new SlashCommandBuilder()
            .setName('setlogchannel')
            .setDescription('Ser server log\'s')
            .addChannelOption(option =>
                option.setName('log_channel')
                    .setDescription('Mention Log Channel...')
                    .setRequired(true)
            ),
        execute: (eParams) => {
            const commandInteraction = eParams.interaction;

            if (!commandInteraction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                commandInteraction.reply("You dont have permission to use that command.");
                setTimeout(() => commandInteraction.deleteReply(), 5000);
                return;
            }

            callSql(`SELECT * FROM sw_settings WHERE server_id='${commandInteraction.guild.id}'`, (err, data) => {
                if (!err)
                    console.log(err);
                else {
                    if (data.length > 0) {
                        var logChannelSettings = JSON.parse(data[0].log_channel_settings);
                        logChannelSettings.log_channel_id = commandInteraction.options.getChannel("log_channel").id;

                        callSql(`UPDATE sw_settings SET log_channel_settings='${JSON.stringify(logChannelSettings)}' WHERE server_id='${commandInteraction.guild.id}'`, (err, data) => {
                            if (!err)
                                console.log(err);
                            else {

                            }
                        });
                    }
                    else{
                        initializeServer({guild: commandInteraction.guild}, (data, val) => {
                            callSql(`SELECT * FROM sw_settings WHERE server_id='${commandInteraction.guild.id}'`, (err, data) => {
                                if (!err)
                                    console.log(err);
                                else {
                                    if (data.length > 0) {
                                        var logChannelSettings = JSON.parse(data[0].log_channel_settings);
                                        logChannelSettings.log_channel_enabled = commandInteraction.options.getBoolean("enabled");
                
                                        callSql(`UPDATE sw_settings SET log_channel_settings='${JSON.stringify(logChannelSettings)}' WHERE server_id='${commandInteraction.guild.id}'`, (err, data) => {
                                            if (!err)
                                                console.log(err);
                                            else {
                
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    }
                }
            });

            commandInteraction.reply("Updated...");
        },
    },
    {
        data: new SlashCommandBuilder()
            .setName('setlogstatus')
            .setDescription('Ser server log\'s')
            .addBooleanOption(option =>
                option.setName('enabled')
                    .setDescription('is enabled ??')
                    .setRequired(true)
            ),
        execute: (eParams) => {
            const commandInteraction = eParams.interaction;

            if (!commandInteraction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                commandInteraction.reply("You dont have permission to use that command.");
                setTimeout(() => commandInteraction.deleteReply(), 5000);
                return;
            }

            callSql(`SELECT * FROM sw_settings WHERE server_id='${commandInteraction.guild.id}'`, (err, data) => {
                if (!err)
                    console.log(err);
                else {
                    if (data.length > 0) {
                        var logChannelSettings = JSON.parse(data[0].log_channel_settings);
                        logChannelSettings.log_channel_enabled = commandInteraction.options.getBoolean("enabled");

                        callSql(`UPDATE sw_settings SET log_channel_settings='${JSON.stringify(logChannelSettings)}' WHERE server_id='${commandInteraction.guild.id}'`, (err, data) => {
                            if (!err)
                                console.log(err);
                            else {

                            }
                        });
                    }
                    else{
                        initializeServer({guild: commandInteraction.guild}, (data, val) => {
                            callSql(`SELECT * FROM sw_settings WHERE server_id='${commandInteraction.guild.id}'`, (err, data) => {
                                if (!err)
                                    console.log(err);
                                else {
                                    if (data.length > 0) {
                                        var logChannelSettings = JSON.parse(data[0].log_channel_settings);
                                        logChannelSettings.log_channel_enabled = commandInteraction.options.getBoolean("enabled");
                
                                        callSql(`UPDATE sw_settings SET log_channel_settings='${JSON.stringify(logChannelSettings)}' WHERE server_id='${commandInteraction.guild.id}'`, (err, data) => {
                                            if (!err)
                                                console.log(err);
                                            else {
                
                                            }
                                        });
                                    }
                                }
                            });
                        });
                        
                    }
                }
            });

            commandInteraction.reply("Updated...");
        },
    }
];