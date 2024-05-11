const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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

            commandInteraction.reply(".");
            commandInteraction.deleteReply();


            if (!commandInteraction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                commandInteraction.reply("You dont have permission to use that command.");
                setTimeout(() => commandInteraction.deleteReply(), 5000);
                return;
            }

            // getServer(commandInteraction.guild.id, true, async(status, res) => {
            //     if (!status)
            //         commandInteraction.channel.send("Update Failed...");
            //     else {
            //         var new_log_channel_id = commandInteraction.options.getChannel("log_channel").id.toString();

            //         updateSomethink("ebot", "sw_settings", {_id: commandInteraction.guild.id}, {}, { "log_channel_settings.log_channel_id": new_log_channel_id }, async(status, res) => {
            //             if (!status)
            //                 commandInteraction.channel.send("Update Failed...");
            //             else {
            //                 commandInteraction.channel.send("Updated!");
            //             }
            //         });
            //     }
            // });
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

            getServer(commandInteraction.guild.id, true, async(status, res) => {
                if (!status)
                    commandInteraction.channel.send("Update Failed...");
                else {
                    var new_log_channel_enabled = commandInteraction.options.getBoolean("enabled");

                    updateSomethink("ebot", "sw_settings", {_id: commandInteraction.guild.id}, {}, { "log_channel_settings.log_channel_enabled": new_log_channel_enabled }, async(status, res) => {
                        if (!status)
                            commandInteraction.channel.send("Update Failed...");
                        else {
                            commandInteraction.channel.send("Updated!");
                        }
                    });
                }
            });

            commandInteraction.reply("Updated...");
        },
    }
];