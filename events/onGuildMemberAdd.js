const { callSql, getUser } = require('./../internal_modules/database');
const { onMemberJoin } = require('./../customfeatures/serverLogs');

module.exports = {
    data: {
        eventName: "guildMemberJoinEvent",
        eventCommand: "guildMemberAdd",
    },

    execute: (data) => {
        getUser(data.user.id, true, async (status, res) => { });
        onMemberJoin({ member: data });
    }
};
