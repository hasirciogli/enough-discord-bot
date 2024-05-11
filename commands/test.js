const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');


module.exports = [
    {
        data: new SlashCommandBuilder()
            .setName('test')
            .setDescription('Make Moments'),
        execute: (eParams) => {
            const commandInteraction = eParams.interaction;

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('yes-sir' + commandInteraction.member.id)
                        .setLabel('Yes!')
                        .setStyle(ButtonStyle.Success),
                ).addComponents(
                    new ButtonBuilder()
                        .setCustomId('no-sir' + commandInteraction.member.id)
                        .setLabel('No!')
                        .setStyle(ButtonStyle.Danger),
                );

            const yesfilter = i => i.customId === ("yes-sir" + commandInteraction.member.id ) && i.user.id === commandInteraction.member.id;

            const collector = commandInteraction.channel.createMessageComponentCollector({ yesfilter, time: 15000 });

            commandInteraction.reply({ content: 'I think you should,', components: [row] });

            collector.on('collect', i => {
                if(i.customId == ('yes-sir' + commandInteraction.member.id))
                {
                    console.log(i);
                    i.update({ content: 'Accepted!', components: [] });
                }
                else{
                    i.update({ content: 'not Accepted!', components: [] });
                }

                setTimeout(() => {
                    commandInteraction.deleteReply();
                }, 2000);
            });

            collector.on('end', collected => console.log(`Collected ${collected.size} items`));

            
            setTimeout(() => {
                commandInteraction.deleteReply();
            }, 15000);
            

            
        },
    }
];