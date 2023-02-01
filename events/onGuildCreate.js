const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { callSql, initializeServer } = require('./../internal_modules/database');

module.exports = {
    data: {
        eventName: "guildCreateEvent",
        eventCommand: "guildCreate",
    },

    execute: (data) => {
        initializeServer({guild: data}, (data, val) => {/*console.log(data + "\n" + val)*/});
    }
};
