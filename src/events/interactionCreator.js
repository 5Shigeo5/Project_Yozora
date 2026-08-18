import { Events } from "discord.js";

export default{
    name: Events.InteractionCreate,
    async execute(interaction){
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command){
            console.error(`No command ${interaction.commandName} found`);
            return
        }

        try{
            await command.execute(interaction);
        } catch(error){
            console.error(`Error executing ${interaction.commandName}:`, error);

            const errorMessage = {content: 'Error with command execution please check console', ephemeral:true};

            if(interaction.replied || interaction.deferred){
                await interaction.followUp(errorMessage);
            }else{
                await interaction.reply(errorMessage);
            }
        }

    },
};