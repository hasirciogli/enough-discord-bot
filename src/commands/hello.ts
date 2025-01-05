import { SlashCommandBuilder } from "discord.js";

type ExecuteParamsDto = {
  params: any;
  message: any;
  author: any;
};

const HelloCommand = new SlashCommandBuilder()
  .setName("hello")
  .setDescription("Hello command");

export const execute = ({ params, message, author }: ExecuteParamsDto) => {
  message.channel.send("Hello");
};

export default HelloCommand;
