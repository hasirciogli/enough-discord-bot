const { REST, Routes, Client, GatewayIntentBits, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
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
    GatewayIntentBits.MessageContent,]
});
const fs = require("fs");
const cConfig = require('./data/config.json');


var __commands = [];
var __eventsClients = new Map();


const loadClientBotData = async () => {
  __commands = [];

    await fs.readdir("./commands/", async (err, files) => {
      if (err) return console.error(err);
      await files.forEach(async (file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);

        await props.forEach(async (command) => {
          await console.log(`Yüklenen komut: ${command.data.name}`);

          var vData = command.data;
          vData.execute = command.execute;

          __commands.push(vData);
        });
      });

      setTimeout(() => {
        console.log('Started refreshing application (/) commands.');

        rest.put(Routes.applicationCommands(cConfig.ClientID), { body: __commands });

        console.log('Successfully reloaded application (/) commands.');
      }, 3000);

    });


    __eventsClients = new Map();

    await fs.readdir("./events/", async (err, files) => {
      if (err) return console.error(err);
      await files.forEach(async (file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./events/${file}`);

        __eventsClients.set(props.data.eventCommand, props);
        await console.log('');
        await console.log(`Yüklenen Event: ${props.data.eventCommand}`);
        await console.log('');

      });

    });
}

(async () => {
  try {
    loadClientBotData();
  } catch (error) {
    console.error(error);
  }
})();


const rest = new REST({ version: '10' }).setToken(cConfig.Token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (!interaction.guild.members.cache.get("1069311371579248650").permissions.has(PermissionFlagsBits.Administrator)) {
    interaction.reply("Bot Need an Administrator Permission!");
    setTimeout(() => interaction.deleteReply(), 5000);
    return;
  }

  __commands.forEach(item => {
    if (item.name == interaction.commandName) {
      item.execute({ interaction: interaction });
    }
  });
});

client.on('messageCreate', (message) => {
  if (message.author.id == cConfig.ClientID) return;
  if (message.author.id != "854676894675238913") return;

  if(message.author.id == cConfig.ownerID && message.content == "!rc")
  {
    message.channel.send("31");
    loadClientBotData();
    return;
  }

  console.log(__eventsClients);

  __eventsClients.forEach(item => {
    item.data.eventCommand == "messageCreate" ? item.execute({message: message}) : "";
  });
});

client.login(cConfig.Token);