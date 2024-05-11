const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

const casinoGames = (params) => {
    function casino_getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    return {
        coinFlip: () => {

        }
    }

}

module.exports = [
    {
        data: new SlashCommandBuilder()
            .setName('casino-play')
            .setDescription('Casino Commands')
            .addStringOption(option =>
                option.setName('casino_game')
                    .setDescription('What do you want to play?')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Coin Flip', value: 'coinFlip' },
                    )
            )
            .addNumberOption(option =>
                option.setName('casino_game_payment')
                    .setDescription('How many coins should be paid to the game?')
                    .setRequired(true)
            ),
        execute: (eParams) => {
            const commandInteraction = eParams.interaction;

            commandInteraction.reply("-");
            commandInteraction.deleteReply();

            if (!commandInteraction.options.getString("casino_game"))
                return commandInteraction.reply("Error for 500 try again later");

            const cMethodName = commandInteraction.options.getString("casino_game");
            const cPayAmount = commandInteraction.options.getNumber("casino_game_payment");

            getUser(commandInteraction.user.id, true, async (status1, res1) => {
                if (status1) {
                    var cECash = res1.ecash;

                    if (cECash > 0 && cPayAmount <= cECash)
                        casinoGames({ commandInteraction: commandInteraction, payment: cPayAmount })[cMethodName]();
                    else
                        commandInteraction.channel.send("You dont have enough money to play the game");
                }
                else {

                }
            });
        },
    }
];