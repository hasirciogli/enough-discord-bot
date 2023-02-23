const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = [
    {
        data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('unban user?')
        .addStringOption(option =>
            option.setName('user_id').setDescription('ban mamber').setRequired(true),
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

        var argUser = commandInteraction.options.getString("user_id");

        commandInteraction.guild.bans.remove(argUser).then(() => {
            commandInteraction.reply("User Has Been Unbanned From This Guild...");
            setTimeout(() => commandInteraction.deleteReply(), 5000);
        }).catch(err => {
            commandInteraction.reply("User Unbanned idk Error occurred :(");
            setTimeout(() => commandInteraction.deleteReply(), 5000);
        });

    },
    }
];