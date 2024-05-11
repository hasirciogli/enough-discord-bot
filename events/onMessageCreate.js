const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cConfig = require('./../data/config.json');
const levelSystem = require('./../customfeatures/levelsystem');

module.exports = {
    data: {
        eventName: "levelSystemMessageCreateEvent",
        eventCommand: "messageCreate",
    },
    execute: (data) => {
        if (data.author.id == cConfig.ClientID)
            return;

        levelSystem.execute({
            params: data,
            message: data,
            author: data.author,
            content: data.content,
        });
    }
};
