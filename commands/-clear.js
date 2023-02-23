const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = [
    {
        data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear all messages from the chat')
        .addIntegerOption(option =>
            option.setName('message_count').setDescription('delete messages count').setRequired(true),
        ),
    execute: (eParams) => {
        const commandInteraction = eParams.interaction;
        const count = commandInteraction.options.getInteger('message_count');

        if (!commandInteraction.member.permissions.has(PermissionFlagsBits.ManageMessages))
            return commandInteraction.reply("Bu komutu kullanmak için yetkiniz yok!");


        const amount = parseInt(count) + 1;

        if (isNaN(amount)) {
            return commandInteraction.reply("Geçerli bir sayı belirtin!");
        } else if (amount <= 1 || amount > 100) {
            return commandInteraction.reply("1 ile 100 arasında bir sayı belirtin!");
        }

        commandInteraction.channel.bulkDelete(amount, true).then(() => {
            commandInteraction.reply("OK");
            setTimeout(() => {commandInteraction.deleteReply()}, 2000);
        }).catch(err => {
            console.error(err);
            commandInteraction.reply("Silme sırasında bir hata oluştu.");
        });
    },
    }
];