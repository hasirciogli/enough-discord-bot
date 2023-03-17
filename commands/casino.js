const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const { getUser, updateSomethink, tFormant } = require('./../internal_modules/database');

const casinoGames = (params) => {
    function casino_getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    return {
        coinFlip: () => {
            getUser(params.commandInteraction.user.id, true, async (status1, res1) => {
                if (status1) {
                    if (res1.ecash < params.payment) {
                        return params.commandInteraction.channel.send("You dont have enough money to play the game.");
                    }

                    updateSomethink("ebot", "users", { _id: params.commandInteraction.user.id }, { "ecash": -(params.payment) }, {}, async (status4, res) => {
                        if (!status4)
                            params.commandInteraction.channel.send("Losed, but database problem #151654456");
                        else {
                            var ssc = casino_getRandomInt(101);
                            if (ssc > (100 - res1.casino.rates.cf_winrate)) {
                                var wonAmount = params.payment * 2;

                                getUser(params.commandInteraction.user.id, true, async (status1, res1) => {
                                    if (status1) {
                                        updateSomethink("ebot", "users", { _id: params.commandInteraction.user.id }, { "ecash": (wonAmount) }, {}, async (status4, res) => {
                                            if (!status4)
                                                params.commandInteraction.channel.send("Won, but database problem #1544568");
                                            else {
                                                params.commandInteraction.channel.send("Congratulations, You are won " + tFormant(params.payment * 2) + "$");
                                            }
                                        });
                                    }
                                    else {
                                        params.commandInteraction.channel.send("Won, but database problem #154456");
                                    }
                                });
                            }
                            else {
                                var loseAmount = params.payment;

                                params.commandInteraction.channel.send("Noooo! you are losed " + tFormant(loseAmount) + "$ :\(");
                            }
                        }
                    });
                }
                else {
                    params.commandInteraction.channel.send("Losed, but database problem #151456");
                }
            });



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