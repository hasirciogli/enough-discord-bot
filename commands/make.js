const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = [
    {
        data: new SlashCommandBuilder()
        .setName('make')
        .setDescription('Make Moments')
        .addStringOption(option =>
            option.setName('make_method_name')
                .setDescription('help-method-name')
                .setRequired(false)
                .addChoices(
                    { name: 'meme', value: 'make-meme' },
                    { name: 'gif', value: "make-gif" },
                    { name: 'sigma', value: "make-sigma" },
                    { name: 'turkish', value: "make-turkish-joke" },
                    { name: 'english', value: "make-english-joke" },
                )
        ),
    execute: (eParams) => {
        const commandInteraction = eParams.interaction;

        if (!commandInteraction.options.getString("make_method_name"))
            return commandInteraction.reply("`/help fun` for correct **__fun__** commands");


        return commandInteraction.reply({ embeds: [helpEmbeds(commandInteraction)[hMethodName]] });
    },
    }
];