const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const opt = message.content.slice(config.prefix.length).trim().split("")
  const cmd = args.shift().toLowerCase();
  var users = new Array();
  
  if(message.content.indexOf(config.prefix) === 0) {
    if(cmd === "queue") {
      users = new Array();
      users[0] = message.author;
      message.channel.send(message);
    }

    if(cmd === "ping") {
      
      message.channel.send(message);
    }
    
    if(cmd === "add") {
      message.channel.send(message);
    }
    
    if(cmd === "remove") {
      message.channel.send(message);
    }
    
    if(cmd === "clear") {
      message.channel.send(message);
    }
  }
});

client.login(config.token);
