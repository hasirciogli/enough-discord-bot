const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { callSql } = require('./../internal_modules/database');

module.exports = {
    data: {
        eventName: "levelSystemMessageCreateEvent",
        eventCommand: "messageCreate",
    },

    execute: (eParams) => {
        eParams.message.channel.send(eParams.message.content);
        eParams.message.delete();
    }
};
