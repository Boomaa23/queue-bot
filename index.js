require('dotenv').config()
const Discord = require('discord.js');
const prefix = "q!";
const client = new Discord.Client();

var players = [];
var game = "";
var date = "";
var date = "";
var init = false;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', message => {
  if(message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const opt = message.content.slice(prefix.length + cmd.length).trim().split(" ");
  if(opt.length === 1 && opt[0] === '') {
    opt.shift();
  }
  
  if(message.content.indexOf(prefix) === 0) {
    if(cmd === "help") {
      
    }
    
    if(cmd === "queue") {
      var min = 0;
      var gameTemp = "";
      for(var i = 0;i < opt.length;i++) {
        if(opt[i].charAt(0) === '<') {
          min = i;
          break;
        } else {
          gameTemp += opt[i] + " ";
        }
      }
      
      var max = opt.length;
      for(var i = min;i < opt.length;i++) {
        if(opt[i].charAt(0) != '<' && opt[i].charAt(0) != ' ') {
          max = i;
          break;
        }
      }
      
      if(opt.slice(min).length > 0 && min > 0 && opt.length >= 2) {
        game = gameTemp;
        players = [];
        for(var i = min;i < max;i++) {
          players[players.length] = opt[i];
        }
        
        optStr = players.length > 1 ? "s " + optStr : " " + optStr;
        date = opt[max];
        time = opt[max + 1];
        init = true;
        var out = "Added player" + players.join(" ").trim() + " to play *" + game.trim() + "*";
        
        if(typeof time != 'undefined') {
          out += " at " + time;
        }
        if(typeof date != 'undefined') {
          out += " on " + date;
        }
        message.channel.send(out);
      } else {
        message.channel.send("Please add arguments `<game> [<player>] [<date>] [<time>]`");
      }
    }
      
    if(init === true) {
      if(cmd === "setgame") {
        if(opt.length > 0) {
          game = "";
          for(var i = 0;i < opt.length;i++) {
            game += opt[i] + " ";
          }
          message.channel.send("Set game as " + game);
        } else {
          message.channel.send("Please include a game to set");
        }
      }

      if(cmd === "ping") {
        if(players.length >= 0) {
          var out = "This is a reminder for " + players.join(" ") + " to play " + game.trim();
          if(typeof time != 'undefined') {
            out += " at " + time;
          }
          if(typeof date != 'undefined') {
            out += " on " + date;
          }
          message.channel.send(out);
        } else {
          message.channel.send("There are no players in the queue");
        }
      }
      
      if(cmd === "add") {
        if(opt.length > 0) {
          var optStr = "";
          for(var i = 0;i < opt.length;i++) {
            players[players.length] = opt[i];
            optStr += opt[i] + " ";
          }
          message.channel.send("Added player(s) " + optStr + " to play " + game);
        } else {
          message.channel.send("Please include a player to add to the queue");
        }
      }
      
      if(cmd === "remove") {
        if(opt.length > 0) {
          for(var i = 0;i < players.length;i++) {
            console.log(opt[0]);
            if(players[i] === opt[0]) {
              message.channel.send("Removed " + players[i]);
              players.splice(i, 1);
              break;
            }
          }
        } else {
          message.channel.send("Please include a player to remove from the queue");
        }
      }
      
      if(cmd === "clear") {
        players = [];
        game = "";
        init = false;
        message.channel.send("Cleared player queue");
      }
    } else if(cmd != "queue"){
      message.channel.send("Queue has not been initialized.\n Please run `q!queue <game> [<player>]` before continuing.")
    }
    return;
  }
});

client.login(process.env.BOT_TOKEN)
