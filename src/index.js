import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import {fileURLToPath, pathToFileURL} from 'url';
import {Client, GatewayIntentBits, Collection} from 'discord.js';
import memberAdd from './events/guild_member_add.js';
//Get Current Folder Path
const __filename =  fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

//Command Collections
client.commands = new Collection();

/*
========================
START: LOADER FOR ALL COMMANDS!
========================
*/

//Event Loader
//get the JS files in events folder
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

//loop through all JavasScript files
//If else is for  how often should the events run
for(const file of eventFiles){
    const filePath= pathToFileURL(path.join(eventsPath, file)).href;
    const {default: event} = await import(filePath);
    
    if (event.once){

        client.once(event.name, (...args) => event.execute(...args, client));
    
    }else{

        client.on(event.name, (...args) => event.execute(...args,client));

    }
}

//Command Loader

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//loop through all JavasScript files
//Puts the commands into the command collection delcared earlier
for(const file of commandFiles){
    const filePath= pathToFileURL(path.join(commandsPath, file)).href;
    const {default: command} = await import(filePath);
    
    if ('data' in command && 'execute' in command){

        client.commands.set(command.data.name, command);

    }else{

        console.log(`Warning, command at ${file} is missing a property`);
        
    }
}

//Client On section
client.on('guildMemberAdd', async (member) =>{
    await memberAdd.execute(member);
});

//Start up
client.login(process.env.DISCORD_BOT_TOKEN);