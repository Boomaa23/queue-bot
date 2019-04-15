require('dotenv').config()
const Discord = require('discord.js');
const prefix = "q!";
const client = new Discord.Client();

var players = [];
var game = "";
var init = false;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if(message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const opt = message.content.slice(prefix.length + cmd.length).trim().split(" ");
  
  if(message.content.indexOf(prefix) === 0) {
    if(cmd === "queue") {
      var min = 0;
      var gameTemp = "";
      for(var i = 0;i < opt.length;i++) {
        if(opt[i].charAt(0) === '<') {
          min = i;
          game = gameTemp;
          break;
        } else {
          gameTemp += opt[i] + " ";
        }
      }
      players = [];
      players[0] = message.author;
      var optStr = "";
      for(var i = min;i < opt.length;i++) {
        players[players.length] = opt[i];
        optStr += opt[i] + " ";
      }
      init = true;
      
      message.channel.send("Added player(s) " + optStr + "to play **" + game + "**");
    }
    
    if(init === true) {
      if(cmd === "setgame") {
        game = opt[0];
        message.channel.send("Set game as " + game);
      }

      if(cmd === "ping") {
        if(players.length > 0) {
          var optStr = "";
          for(var i = 0;i < opt.length;i++) {
            optStr += opt + " ";
          }
          message.channel.send(players + "\n" + optStr);
        } else {
          message.channel.send("There are no players in the queue");
        }
      }
      
      if(cmd === "add") {
        var optStr = "";
        for(var i = 0;i < opt.length;i++) {
          players[players.length] = opt[i];
          optStr += opt[i] + " ";
        }
        message.channel.send("Added player(s) " + optStr + " to play " + game);
      }
      
      if(cmd === "remove") {
        message.channel.send(message);
      }
      
      if(cmd === "clear") {
        players = [];
        game = "";
        init = false;
        message.channel.send("Cleared player queue");
      }
    } else {
      message.channel.send("Queue has not been initialized.\n Please run `q!queue <game> [<player>]` before continuing.")
    }
    return;
  }
});

client.login(process.env.BOT_TOKEN)
