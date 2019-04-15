require('dotenv').config()
const Discord = require('discord.js');
const prefix = "q!";
const client = new Discord.Client();

var players = [];
var game;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if(message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const opt = message.content.slice(prefix.length + cmd.length).trim().split(" ")
  
  if(message.content.indexOf(prefix) === 0) {
    if(cmd === "setgame") {
      game = opt[0];
      message.channel.send("Set game as " + game);
    }
    
    if(cmd === "queue") {
      players[0] = message.author;
      var playerList;
      for(var i = 1;i < opt.length;i++) {
        playerList += "<@" + opt[i] + "> ";
        players[i] = opt[i];
      }
      message.channel.send("Queued players " + playersList)
    }

    if(cmd === "ping") {
      var pingList = "";
      for(var i = 0;i < users.length;i++) {
        pingList += "<@" + users[i] + "> ";
      }
      message.channel.send(pingList + "\n" + message.author + opt[0]);
    }
    
    if(cmd === "add") {
      players[players.length] = opt[0];
      message.channel.send("Added player <@" + opt[0] + ">");
    }
    
    if(cmd === "remove") {
      message.channel.send(message);
    }
    
    if(cmd === "clear") {
      players = [];
      message.channel.send("Cleared player queue");
    }
    return;
  }
});

client.login(process.env.BOT_TOKEN)
