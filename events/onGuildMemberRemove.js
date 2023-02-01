const { callSql } = require('./../internal_modules/database');
const { onMemberLeft } = require('./../customfeatures/serverLogs');

module.exports = {
    data: {
        eventName: "guildMemberLeftEvent",
        eventCommand: "guildMemberRemove",
    },

    execute: (data) => {
        onMemberLeft({member: data});
    }
};
