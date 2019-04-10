const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  console.log("message");
  if(message.content.indexOf(config.prefix) === 0) {
    console.log("outerif");
    if(cmd === "queue") {
      message.channel.send('queue');
      console.log("queue");
    }

    if(cmd === "ping") {
      message.channel.send('ping');
      console.log("ping");
    }
    
    if(cmd === "add") {
      message.channel.send('add');
      console.log("add");
    }
    
    if(cmd === "remove") {
      message.channel.send('remove');
      console.log("remove");
    }
    
    if(cmd === "clear") {
      message.channel.send('clear');
      console.log("clear");
    }
  }
});

client.login("MzA0NzkzNzY0Njg4Mjk3OTg0.XK1xiw.B5l9Ki5LLBlq5S0WYWQBS5IoHDM");
