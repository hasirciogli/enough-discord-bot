const { SlashCommandBuilder } = require('discord.js');

module.exports = [
    {
        data: new SlashCommandBuilder()
            .setName('merhaba')
            .setDescription('Send Merhaba'),
        execute: (eParams) => {
            const commandInteraction = eParams.interaction;
            commandInteraction.reply("Merhaba!");
        },
    }
];