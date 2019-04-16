require('dotenv').config()
const Discord = require('discord.js');
const prefix = "q!";
const client = new Discord.Client();
const queueCmdRef = "<game> <player1> [<player2>...] [<date>] [<time>]";

var players = [];
var game = "";
var date = "";
var date = "";
var init = false;

var help = "**QueueBot Command Reference**\n";
help += "*Queue* - `q!queue` - Starts QueueBot with a queue\n`<game> <player1> [<player2>...] [<date>] [<time>]`\n\n";
help += "*Setgame* - `q!setgame <game>` - Sets game to queue for\n";
help += "*Ping* - `q!ping` - Pings users currently in queue\n";
help += "*Add* - `q!add` - Adds one or more user(s) to queue\n`<player1> [<player2>...]`\n";
help += "*Remove* - `q!remove` - Removes one+ specified player(s) from queue\n`<player1> [<player2>...]`\n";
help += "*Clear* - `q!clear <game>` - Clears and resets the queue\n\n";
help += "*Help* - `q!help public|[self]` - Displays the command reference\n";

client.on('ready', () => {
  console.log(`\x1b[32mLogged in as ${client.user.tag}`);
});

client.on('message', message => {
  if(message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const opt = message.content.slice(prefix.length + cmd.length).trim().split(" ");
  
  if(message.content.indexOf(prefix) === 0) {
    console.log("\x1b[32m[QueueBot] Command with prefix recieved: " + message.content);
    if(opt.length === 1 && opt[0] === '') {
      console.log("\x1b[33m[QueueBot] No options on command");
      opt.shift();
    }
    
    if(cmd === "help") {
      if(typeof opt[0] != 'undefined' && opt[0].trim() === "public") {
        console.log("\x1b[32m[QueueBot] Printing out command reference to channel");
        message.channel.send(help);
      } else {
        console.log("\x1b[32m[QueueBot] Printing out command reference to DMs");
        message.author.send(help);
      }
      return;
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
        console.log("\x1b[0m[QueueBot] Players on queue command from index " + min + " to " + max);
        game = gameTemp.trim();
        players = [];
        for(var i = min;i < max;i++) {
          players[players.length] = opt[i];
        }
        
        var multi = players.length > 1 ? "s " : " ";
        date = opt[max];
        time = opt[max + 1];
        init = true;
        var out = "Queued player" + multi + players.join(" ").trim() + " to play *" + game + "*";
        
        if(typeof time != 'undefined') {
          console.log("\x1b[0m[QueueBot] Time defined - added to output");
          out += " at " + time;
        }
        if(typeof date != 'undefined') {
          console.log("\x1b[0m[QueueBot] Date defined - added to output")
          out += " on " + date;
        }
        console.log("\x1b[32m[QueueBot] Queue message sent to channel successfully");
        message.channel.send(out);
      } else {
        console.log("\x1b[33m[QueueBot] Queue command has too few options after arguments");
        message.channel.send("Please run `q!help` or add more options: \n`" + queueCmdRef + "`");
        return;
      }
    }
      
    if(init === true) {
      if(cmd != "queue" && cmd != "help") {
        console.log("\x1b[0m[QueueBot] Command running after queue initialization");
      }
      
      if(cmd === "setgame") {
        if(opt.length > 0) {
          game = "";
          for(var i = 0;i < opt.length;i++) {
            game += opt[i] + " ";
          }
          game = game.trim();
          console.log("\x1b[32m[QueueBot] Game set to " + game + " successfully");
          message.channel.send("Set game as *" + game + "*");
        } else {
          console.log("\x1b[33m[QueueBot] No game found in options to set");
          message.channel.send("Please include a game to set");
          return;
        }
      }

      if(cmd === "ping") {
        if(players.length >= 0) {
          var out = "This is a reminder for " + players.join(" ") + " to play *" + game + "*";
          if(typeof time != 'undefined') {
            console.log("\x1b[0m[QueueBot] Time defined - added to output");
            out += " at " + time;
          }
          if(typeof date != 'undefined') {
            console.log("\x1b[0m[QueueBot] Date defined - added to output");
            out += " on " + date;
          }
          console.log("\x1b[32m[QueueBot] Players in queue pinged successfully");
          message.channel.send(out);
        } else {
          console.log("\x1b[33m[QueueBot] No players in queue to ping");
          message.channel.send("There are no players in the queue");
          return;
        }
      }
      
      if(cmd === "add") {
        if(opt.length > 0) {
          for(var i = 0;i < opt.length;i++) {
            players[players.length] = opt[i];
          }
          var multi = opt.length > 1 ? "s" : "";
          console.log("[QueueBot] Players " + opt.join(" ").trim() + "added to queue");
          message.channel.send("Added player" + multi + " " + opt.join(" ").trim() + " to play " + game);
        } else {
          console.log("\x1b[33m[QueueBot] No players to add to queue in options");
          message.channel.send("Please include a player to add to the queue");
          return;
        }
      }
      
      if(cmd === "remove") {
        if(opt.length > 0) {
          for(var j = 0;j < opt.length;j++) {
            for(var i = 0;i < players.length;i++) {
              if(players[i] === opt[j]) {
                console.log("\x1b[32m[QueueBot] Removed " + players[i].trim() + " at index " + i + " of " + players.length);
                message.channel.send("Removed " + players[i]);
                players.splice(i, 1);
                break;
              }
            }
          }
        } else {
          console.log("\x1b[33m[QueueBot] No players to remove from queue in options");
          message.channel.send("Please include a player to remove from the queue");
          return;
        }
      }
      
      if(cmd === "clear") {
        players = [];
        game = "";
        init = false;
        console.log("\x1b[32m[QueueBot] Cleared player queue");
        message.channel.send("Cleared player queue. Please run: \n`q!queue " + queueCmdRef + "`\nif you would like to make a new queue.");
      }
    } else if(cmd === "clear"  || cmd === "remove" || cmd === "add" || cmd === "setgame" || cmd === "ping"){
      console.log("\x1b[31m[QueueBot] Queue not initialized");
      message.channel.send("Queue has not been initialized. Please run: \n`q!queue " + queueCmdRef + "`\nbefore continuing.");
      return;
    }
    
    if(cmd !== "queue" && cmd !== "clear"  && cmd !== "remove" && cmd !== "add" && cmd !== "setgame" && cmd !== "ping") {
      console.log("\x1b[31m[QueueBot] Invalid command passed...returning early with error");
      message.channel.send("Invalid command entered: `" + message.content + "`");
      return;
    }
    console.log("\x1b[32m[QueueBot] Command finished without errors");
    return;
  }
});

client.login(process.env.BOT_TOKEN)
