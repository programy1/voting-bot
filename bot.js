const Discord = require('discord.js');
const client = new Discord.Client();
const https = require('http');

client.on('ready', () => {
    console.log('Bot ready!');
});

client.on('message', message => {
    var firstWord = message.content.replace(/ .*/,'');
    var command = message.content.substring(message.content.indexOf(" ") + 1, message.content.length);
    if (firstWord === 'volím') { //command name
        if(firstWord === command){
            message.reply('Koho volíš?\nJestli chceš volit, napiš mi "volím uživatelské jméno"');
        }else{
            if ( typeof message.mentions.users.first() !== 'undefined' && message.mentions.users.first() ) {
                 let user = message.mentions.users.first();
                 if(message.author.id !== user.id){
                     
                https.get('http://www.programy1.borec.cz/gjs-meteo/discord-volby.php?kdo=' + message.author.id +'&koho=' + user.id, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
                     

  https.get('http://www.programy1.borec.cz/gjs-meteo/discord-volby-read.php?kdo=' + user.id, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data)[0]);
    message.reply('Hotovo, právě si volil/a pro <@' + user.id + '>\nTento člověk má tolik hlasů: ' + JSON.parse(data)[0])
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
                     
                     
            ;
                 }else{
                     message.reply('Nemůžeš volit sám sebe!');
                 }
                
            }else{
                message.reply('Uživatel, kterého chceš zvolit, neexistuje!');
            }
        }
    }else if(firstWord === 'pořadí'){
        message.reply({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Aktuální výsledky voleb",
    description: "Takto zatím vypadají výsledky voleb:",
    fields: [{
        name: "Jméno",
        value: "Počet hlasů: 1"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Volební systém"
    }
  }
});
    }

});

 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
