const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        eventName: "guildCreateEvent",
        eventCommand: "guildCreate",
    },

    execute: (data) => {
        getServer(data.guild.id, true, async (status, res) => {});
    }
};
