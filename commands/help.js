const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { callSql } = require('./../internal_modules/database');


const getHelpBase = (commandInteraction) => {
    return new EmbedBuilder({})
        .setColor([20, 130, 20])
        .setTitle('Enough Help!')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot')
        .setAuthor({ name: commandInteraction.member.displayName, iconURL: commandInteraction.member.user.avatarURL({}), url: 'https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot' })
        .setDescription('List or review all commands.')
        .setThumbnail(commandInteraction.member.user.avatarURL({}))
        .addFields(
            { name: '**security**', value: '`/help security`' },
            { name: 'fun', value: '`/help fun`' },
            { name: 'economy', value: "`/help economy`" },
            /*{ name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },*/
        )
        //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        //.setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Help for commandlist', iconURL: commandInteraction.member.user.avatarURL({}) });
}

const helpEmbeds = (commandInteraction) => {

    return {
        securityc: new EmbedBuilder({})
            .setColor([20, 130, 20])
            .setTitle('Enough Help!')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot')
            .setAuthor({ name: commandInteraction.member.displayName, iconURL: commandInteraction.member.user.avatarURL({}), url: 'https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot' })
            .setDescription('List or review all Security Commands.')
            .setThumbnail(commandInteraction.member.user.avatarURL({}))
            .addFields(
                { name: '**Set Log Channel**', value: '`/setlogchannel <Channel Mention>`' },
                { name: '**Set Log Enabled**', value: '`/setlogenabled`' },
                /*{ name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },*/
            )
            //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            //.setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Help for commandlist', iconURL: commandInteraction.member.user.avatarURL({}) }),




        func: new EmbedBuilder({})
            .setColor([20, 130, 20])
            .setTitle('Enough Help!')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot')
            .setAuthor({ name: commandInteraction.member.displayName, iconURL: commandInteraction.member.user.avatarURL({}), url: 'https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot' })
            .setDescription('List or review all commands.')
            .setThumbnail(commandInteraction.member.user.avatarURL({}))
            .addFields(
                { name: '**security**', value: '`/help security`' },
                { name: 'fun', value: '`/help fun`' },
                { name: 'economy', value: "`/help economy`" },
                /*{ name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },*/
            )
            //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            //.setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Help for commandlist', iconURL: commandInteraction.member.user.avatarURL({}) }),


        economyc: new EmbedBuilder({})
            .setColor([20, 130, 20])
            .setTitle('Enough Help!')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot')
            .setAuthor({ name: commandInteraction.member.displayName, iconURL: commandInteraction.member.user.avatarURL({}), url: 'https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot' })
            .setDescription('List or review all commands.')
            .setThumbnail(commandInteraction.member.user.avatarURL({}))
            .addFields(
                { name: '**security**', value: '`/help security`' },
                { name: 'fun', value: '`/help fun`' },
                { name: 'economy', value: "`/help economy`" },
                /*{ name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },*/
            )
            //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            //.setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Help for commandlist', iconURL: commandInteraction.member.user.avatarURL({}) }),
    }

}

module.exports = [
    {
        data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Clear all messages from the chat')
        .addStringOption(option =>
            option.setName('help_method_name')
                .setDescription('help-method-name')
                .setRequired(false)
                .addChoices(
                    { name: 'Security Commands', value: 'securityc' },
                    { name: 'Fun Commands', value: 'func' },
                    { name: 'Economy Commands', value: 'economyc' },
                )
        ),
    execute: (eParams) => {
        const commandInteraction = eParams.interaction;

        callSql("SELECT * FROM users WHERE id = '1'", (status, data) => {
            if (!status) return console.log(data);

            console.log(data[0].discord_id);

        });

        if (!commandInteraction.options.getString("help_method_name"))
            return commandInteraction.reply({ embeds: [getHelpBase(commandInteraction)] });

        const hMethodName = commandInteraction.options.getString("help_method_name");


        return commandInteraction.reply({ embeds: [helpEmbeds(commandInteraction)[hMethodName]] });
    },
    }
];