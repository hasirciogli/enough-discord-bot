const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { callSql } = require('./../internal_modules/database');
const levelSystem = require('./../customfeatures/levelsystem');

module.exports = {
    data: {
        eventName: "levelSystemMessageCreateEvent",
        eventCommand: "messageCreate",
    },
    execute: (data) => {
        levelSystem.execute({
            params: data,
            message: data,
            author: data.author,
            content: data.content,
        });
    }
};
