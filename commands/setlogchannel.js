const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { callSql } = require('./../internal_modules/database');

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



            return commandInteraction.reply(commandInteraction.options.getChannel("log_channel").id);
        },
    }
];