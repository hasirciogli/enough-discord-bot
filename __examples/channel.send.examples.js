// Start typing in a channel
channel.sendTyping();

// Send a basic message
channel.send('hello!')
  .then(message => console.log(`Sent message: ${message.content}`))
  .catch(console.error);

// Send a remote file
channel.send({
  files: ['https://cdn.discordapp.com/icons/222078108977594368/6e1019b3179d71046e463a75915e7244.png?size=2048']
})
  .then(console.log)
  .catch(console.error);

// Send a local file
channel.send({
  files: [{
    attachment: 'entire/path/to/file.jpg',
    name: 'file.jpg',
    description: 'A description of the file'
  }]
})
  .then(console.log)
  .catch(console.error);

// Send an embed with a local image inside
channel.send({
  content: 'This is an embed',
  embeds: [
    {
      thumbnail: {
        url: 'attachment://file.jpg'
      }
    }
  ],
  files: [{
    attachment: 'entire/path/to/file.jpg',
    name: 'file.jpg',
    description: 'A description of the file'
  }]
})
  .then(console.log)
  .catch(console.error);