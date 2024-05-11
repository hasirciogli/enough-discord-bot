const { REST, Routes, Client, GatewayIntentBits, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.MessageContent,
  ]
});
const fs = require("fs");
const cConfig = require('./data/config.json');
const { readdir } = require('fs').promises;


const rest = new REST({ version: '10' }).setToken(cConfig.Token);

var __commands = [];
var __eventsClients = new Map();

const loadClientBotData = () => {
  new Promise(async (yes, no) => {
    try {
      const commandFiles = await readdir("./commands/");
      for (const file of commandFiles) {
        if (file.startsWith("-") || !file.endsWith(".js")) continue;
        const commands = require(`./commands/${file}`);
        commands.forEach(command => {
          console.log(`Yüklenen komut: ${command.data.name}`);
          var vData = command.data;
          vData.execute = command.execute;
          __commands.push(vData);
        });
      }

      const eventFiles = await readdir("./events/");
      for (const file of eventFiles) {
        if (!file.endsWith(".js")) continue;
        const event = require(`./events/${file}`);
        if (!__eventsClients.has(event.data.eventCommand)) {
          __eventsClients.set(event.data.eventCommand, event);
          console.log(`Yüklenen Event: ${event.data.eventCommand}`);
        }
      }

      console.log('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationCommands(cConfig.ClientID), { body: __commands });
      console.log('Successfully reloaded application (/) commands.');

      client.removeAllListeners();
      __eventsClients.forEach(item => {
        console.log(`${item.data.eventName} has been registered`);
        client.on(item.data.eventCommand, (data) => item.execute(data));
      });
    } catch (error) {
      console.error('An error occurred while loading client bot data:', error);
    }

    yes(true);
  });
};


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('');
  loadClientBotData();
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (!interaction.guild.members.cache.get(cConfig.ClientID).permissions.has(PermissionFlagsBits.SendMessages || PermissionFlagsBits.ReadMessageHistory || PermissionFlagsBits.ManageMessages)) {
    interaction.reply("Bot Need an send messages, read msg history, manage members Permission!");
    setTimeout(() => interaction.deleteReply(), 5000);
    return;
  }

  __commands.forEach(item => {
    if (item.name == interaction.commandName) {
      item.execute({ interaction: interaction });
    }
  });
});

client.login(cConfig.Token);
