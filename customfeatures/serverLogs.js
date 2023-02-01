const { PermissionFlagsBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { callSql, initializeServer } = require('./../internal_modules/database');
const { ClientID } = require('./../data/config.json');

exports.onMemberJoin = ({ member }) => {
    console.log("JOIN");
    callSql(`SELECT * FROM sw_settings WHERE server_id='${member.guild.id}'`, (err, data) => {
        if (!err)
            console.log(data);
        else {
            if (data.length > 0) {
                var logChannelSettings = JSON.parse(data[0].log_channel_settings);
                if (logChannelSettings.log_channel_id != -1 && logChannelSettings.log_channel_enabled) {
                    const logChannel = member.guild.channels.cache.get(logChannelSettings.log_channel_id) ?? 0;

                    if (!logChannel)
                        return;

                    const va = new EmbedBuilder({})
                        .setColor([20, 130, 20])
                        .setTitle('Member Join The Server')
                        .setURL('https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot')
                        .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({}), url: 'https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot' })
                        .setDescription(member.user.id)
                        .addFields({
                            name: 'User',
                            value: member.user.username + "#" + member.user.discriminator,
                        })
                        .setThumbnail(member.user.avatarURL({}))
                        .setTimestamp()
                        .setFooter({ text: 'Enough Logger', iconURL: member.user.avatarURL({}) });

                    logChannel.send({ embeds: [va] });
                }
            }
        }
    });
}


exports.onMemberLeft = ({ member }) => {
    console.log("LEFT");
    if (member.user.id == ClientID)
        return;


    callSql(`SELECT * FROM sw_settings WHERE server_id='${member.guild.id}'`, (err, data) => {
        if (!err)
            console.log(err);
        else {
            if (data.length > 0) {
                var logChannelSettings = JSON.parse(data[0].log_channel_settings);
                if (logChannelSettings.log_channel_id != -1 && logChannelSettings.log_channel_enabled) {
                    const logChannel = member.guild.channels.cache.get(logChannelSettings.log_channel_id) ?? 0;

                    if (!logChannel)
                        return;

                    const va = new EmbedBuilder({})
                        .setColor([20, 130, 20])
                        .setTitle('Member Left The Server')
                        .setURL('https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot')
                        .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({}), url: 'https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot' })
                        .setDescription(member.user.id)
                        .addFields({
                            name: 'User',
                            value: member.user.username + "#" + member.user.discriminator,
                        })
                        .setThumbnail(member.user.avatarURL({}))
                        .setTimestamp()
                        .setFooter({ text: 'Enough Logger', iconURL: member.user.avatarURL({}) });

                    logChannel.send({ embeds: [va] });
                }
            }
        }
    });
}