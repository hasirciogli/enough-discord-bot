const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { callSql } = require('./../internal_modules/database');
const levelSystem = require('./../customfeatures/levelsystem');

module.exports = {
    data: {
        eventName: "levelSystemMessageCreateEvent",
        eventCommand: "messageCreate",
    },

    execute: (eParams) => {
        levelSystem.execute({
            params: eParams,
            message: eParams.message,
            author: eParams.message.author,
            content: eParams.message.content,
        });

        return;
        
        eParams.message.channel.send(eParams.message.content);
        eParams.message.delete();
    }
};
