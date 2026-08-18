import { REST, Routes } from "discord.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

dotenv.config();
const __filename =  fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);

const commands = [];
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = await import(`file://${filePath}`);

    if(command.default && 'data' in command.default){
        commands.push(command.default.data.toJSON());
    }
}

//Set up for HTTP Request to Discord API
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async() =>{
    try{
        console.log(`Refreshing ${commands.length} commands`);

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {body: commands},
        );
        
        console.log(`Refreshed ${data.length} commands`);
    }catch(error){
        console.error(error);
    }
})();