const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { callSql, initializeServer } = require('./../internal_modules/database');

module.exports = {
    data: {
        eventName: "guildRemoveEvent",
        eventCommand: "guildRemove",
    },

    execute: (data) => {
        
    }
};
