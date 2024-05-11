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
