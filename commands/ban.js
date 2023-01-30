const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = [
    {
        data: new SlashCommandBuilder()
            .setName('ban')
            .setDescription('ban user?')
            .addUserOption(option =>
                option.setName('user').setDescription('ban mamber').setRequired(true),
            )
            .addStringOption(option =>
                option.setName('reason').setDescription('why ?').setRequired(true),
            ),
        execute: (eParams) => {
            const commandInteraction = eParams.interaction;

            if (!commandInteraction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
                commandInteraction.reply("You dont have permission to use that command.");
                setTimeout(() => commandInteraction.deleteReply(), 5000);
                return;
            }

            var argUser = commandInteraction.options.getMember("user");

            commandInteraction.guild.bans.create(argUser?.id).then(() => {
                commandInteraction.reply("User Has Been Banned From This Guild...");
                setTimeout(() => commandInteraction.deleteReply(), 5000);
            }).catch(err => {
                commandInteraction.reply("User ban idk Error occurred :(");
                setTimeout(() => commandInteraction.deleteReply(), 5000);
            });

        },
    }
];