const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { callSql } = require('./../internal_modules/database');
const cConfig = require('./../data/config.json');

const { createCanvas, loadImage } = require("canvas");

const width = 460;
const height = 222;

exports.execute = ({ params, message, author }) => {
    if (message.author.id == cConfig.ClientID) return;
    if (message.author.id != "854676894675238913") return;
    return;
    const post = {
        title: author.username + "#" + author.discriminator + " - #196"
    }

    const imagePosition = {
        w: 80,
        h: 80,
        x: 10,
        y: 10,
    };

    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    context.fillStyle = "#764abc";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "rgb(40, 40, 40)";
    context.fillRect(10, height - 40, width - 20, 30);

    context.fillStyle = "rgb(40, 130, 40)";
    context.fillRect(12, height - 38, width - 160, 26);

    // Set the style of the test and render it to the canvas
    context.font = "bold 20pt Verdana";
    context.textAlign = "left";
    context.fillStyle = "#fff";
    // 600 is the x value (the center of the image)
    // 170 is the y (the top of the line of text)
    context.fillText(post.title, 100, 56);

    context.font = "bold 11pt Verdana";
    context.textAlign = "left";
    context.fillStyle = "#fff";
    context.fillText(message.guild.name, 10, 130);



    context.font = "16pt Verdana";
    context.textAlign = "left";
    context.fillStyle = "#fff";
    context.fillText("Level UP! to 65", 10, 153);


    loadImage(author.avatarURL({})).then((image) => {
        const { w, h, x, y } = imagePosition;
        context.drawImage(image, x, y, w, h);

        const buffer = canvas.toBuffer("image/png");


        const aData = new AttachmentBuilder(buffer);

        message.channel.send({
            files: [
                {
                    attachment: buffer,
                    name: "image.png"
                }
            ]
        });
    });


}