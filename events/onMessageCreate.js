const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { findOneListingBy_Id, getUser, getServer } = require('./../internal_modules/database');
const cConfig = require('./../data/config.json');
const levelSystem = require('./../customfeatures/levelsystem');

module.exports = {
    data: {
        eventName: "levelSystemMessageCreateEvent",
        eventCommand: "messageCreate",
    },
    execute: (data) => {
        if (data.author.id == cConfig.TClientID)
            return;

        levelSystem.execute({
            params: data,
            message: data,
            author: data.author,
            content: data.content,
        });
    }
};
