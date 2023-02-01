const { callSql } = require('./../internal_modules/database');
const { onMemberJoin } = require('./../customfeatures/serverLogs');

module.exports = {
    data: {
        eventName: "guildMemberJoinEvent",
        eventCommand: "guildMemberAdd",
    },

    execute: (data) => {
        onMemberJoin({member: data});
    }
};
