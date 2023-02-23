const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { getServer } = require('./../internal_modules/database');

module.exports = {
    data: {
        eventName: "guildCreateEvent",
        eventCommand: "guildCreate",
    },

    execute: (data) => {
        getServer(data.guild.id, true, async (status, res) => {});
    }
};
