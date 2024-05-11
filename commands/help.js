const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');


const getHelpBase = (commandInteraction) => {
    return new EmbedBuilder({})
        .setColor([20, 130, 20])
        .setTitle('Enough Help!')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot')
        .setAuthor({ name: commandInteraction.member.displayName, iconURL: commandInteraction.member.user.avatarURL({}), url: 'https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot' })
        .setDescription('List or review all commands.')
        .setThumbnail(commandInteraction.member.user.avatarURL({}))
        .addFields(
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
        func: new EmbedBuilder({})
            .setColor([20, 130, 20])
            .setTitle('Enough Help!')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot')
            .setAuthor({ name: commandInteraction.member.displayName, iconURL: commandInteraction.member.user.avatarURL({}), url: 'https://discord.com/api/oauth2/authorize?client_id=1069311371579248650&permissions=8&scope=bot' })
            .setDescription('List or review all commands.')
            .setThumbnail(commandInteraction.member.user.avatarURL({}))
            .addFields(
                { name: 'meme', value: '`/make meme`' },
                { name: 'gif', value: "`/make gif`" },
                { name: 'sigma', value: "`/make sigma`" },
                { name: 'turkish', value: "`/make turkish joke`" },
                { name: 'english', value: "`/make english joke`" },
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
                { name: 'In App Cash', value: "`/cash` and `/cashpay <user> <amount>`" },
                { name: 'Real EToken', value: "`/coin` and `/coinpay <user> <amount>`" },
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
        .setDescription('Give about help commands')
        .addStringOption(option =>
            option.setName('help_method_name')
                .setDescription('help-method-name')
                .setRequired(false)
                .addChoices(
                    { name: 'Fun Commands', value: 'func' },
                    { name: 'Economy Commands', value: 'economyc' },
                )
        ),
    execute: (eParams) => {
        const commandInteraction = eParams.interaction;

        if (!commandInteraction.options.getString("help_method_name"))
            return commandInteraction.reply({ embeds: [getHelpBase(commandInteraction)] });

        const hMethodName = commandInteraction.options.getString("help_method_name");


        return commandInteraction.reply({ embeds: [helpEmbeds(commandInteraction)[hMethodName]] });
    },
    }
];