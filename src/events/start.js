//Message Startup Flavor Text
//Prints to consol
import {Events} from 'discord.js';
export default{
    name: Events.ClientReady,
    once: true,
    execute(client){
        console.log(`Yozora Online. Logged in as ${client.user.tag}`);
    },
};