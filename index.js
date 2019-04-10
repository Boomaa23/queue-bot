const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(message.content.indexOf(config.prefix) === 0) {
    if(command === "queue") {
       message.channel.send('queue');
    }

    if(command === "ping") {
      message.channel.send('ping');
    }
    
    if(command === "add") {
      message.channel.send('add');
    }
    
    if(command === "remove") {
      message.channel.send('remove');
    }
    
    if(command === "clear") {
      message.channel.send('clear');
    }
  }
});

client.login("MzA0NzkzNzY0Njg4Mjk3OTg0.XK1xiw.B5l9Ki5LLBlq5S0WYWQBS5IoHDM");
