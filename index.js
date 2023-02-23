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
    GatewayIntentBits.MessageContent,]
});
const fs = require("fs");
const cConfig = require('./data/config.json');


const clconsole = async () => {
  await console.clear();
}

//clconsole();


var __commands = [];
var isLoadFinished = false;
var __eventsClients = new Map();


const loadClientBotData = () => {
  __commands = [];

  fs.readdir("./commands/", async (err, files) => {
    if (err) return console.error(err);
    await files.forEach(async (file) => {
      if(file.startsWith("-")) return;
      if (!file.endsWith(".js")) return;
      let props = await require(`./commands/${file}`);

      await props.forEach(async (command) => {
        console.log(`Yüklenen komut: ${command.data.name}`);

        var vData = command.data;
        vData.execute = command.execute;

        await __commands.push(vData);
        return;
      });
    });

    return;
  });


  __eventsClients = new Map();

  fs.readdir("./events/", async (err, files) => {
    if (err) return console.error(err);
    await files.forEach(async (file) => {
      if (!file.endsWith(".js")) return;
      let props = await require(`./events/${file}`);

      await __eventsClients.set(props.data.eventCommand, props);
      console.log(`Yüklenen Event: ${props.data.eventCommand}`);
      return;
    });
    return;
  });

  isLoadFinished = true;
  return "okeee";
}
try {
  taswe = loadClientBotData();

} catch (error) {
  console.error(error);
}


const rest = new REST({ version: '10' }).setToken(cConfig.TToken);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (!interaction.guild.members.cache.get(cConfig.TClientID).permissions.has(PermissionFlagsBits.Administrator)) {
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

var iPre = setInterval(() => {
  if (isLoadFinished) {
    isLoadFinished = false;

    setTimeout(() => {
      console.log('Started refreshing application (/) commands.');

      rest.put(Routes.applicationCommands(cConfig.TClientID), { body: __commands });

      console.log('Successfully reloaded application (/) commands.');
    }, 100);

    __eventsClients.forEach(item => {
      console.log(`${item.data.eventName} has been registered`);
      client.on(item.data.eventCommand, (data) => item.execute(data));
    });

    clearInterval(iPre);
  }
}, 1000);

client.login(cConfig.TToken);