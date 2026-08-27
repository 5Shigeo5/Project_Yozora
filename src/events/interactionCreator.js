import { Events, MessageFlags } from "discord.js";

import { roleMenu } from "../utils/role_config.js";
import { buttonHandler } from "../utils/button_config.js";

export default{
    name: Events.InteractionCreate,
    async execute(interaction){
        console.log(`Received interaction! Type: ${interaction.type}, isButton: ${interaction.isButton()}, Interaction ID: ${interaction.customId}`);
        /*-------------------------------------
                    SLASH COMMAND
        --------------------------------------*/
        if(interaction.isChatInputCommand()){
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command){
                console.error(`No command ${interaction.commandName} found`);
                return
            }

            try{
                await command.execute(interaction);
            } catch(error){
                console.error(`Error executing ${interaction.commandName}:`, error);

                const errorMessage = {
                    content: 'Error with command execution please check console',
                    flags: MessageFlags.Ephemeral
                    };

                if(interaction.replied || interaction.deferred){
                    await interaction.followUp(errorMessage);
                }else{
                    await interaction.reply(errorMessage);
                }
            }
            return;
        }
        

        /*-------------------------------------
                    BUTTON LOGIC
        --------------------------------------*/
        if(interaction.isButton()){
            
            const buttonSel = buttonHandler[interaction.customId];

            if(buttonSel){
                await buttonSel(interaction);
            }else{
                console.log(`[WARNING] Unhandled button interaction at ID ${interaction.customId}`);
                await interaction.reply({content: 'Feature Pending'});
            }


        }

        /*-------------------------------------
                    DROPDOWN LOGIC
        --------------------------------------*/
        if(interaction.isStringSelectMenu()){
            
            const selectionChoice = interaction.values; 
            const roleConfig = Object.values(roleMenu).find(cfg => cfg.customId === interaction.customId);

            if(roleConfig){
                const catRoleId= roleConfig.options.map(opt => opt.value);

                //Added this to make it less complicated of finding ID number of a role per server
                //Roles to Remove
                const roleRemove = catRoleId
                    .map(name => interaction.guild.roles.cache.find(r => r.name === name))
                    .filter(role => role !== undefined);
                //Roles to Add
                const roleAdd = selectionChoice
                    .map(name => interaction.guild.roles.cache.find(r => r.name === name))
                    .filter(role => role !== undefined);

                //Refreshes all roles of the user by removing and addin
                if(roleRemove.length > 0){
                    await interaction.member.roles.remove(roleRemove);
                }
                if(roleAdd.length > 0){
                    await interaction.member.roles.add(roleAdd);
                }
                
                await interaction.reply({
                content: `${roleConfig.embedTitle} Updated!`,
                flags: MessageFlags.Ephemeral
                });
                //Incase something breaks with the embed title
            } else{

                await interaction.reply({
                content: 'Roles Updated!',
                flags: MessageFlags.Ephemeral
                });

            }



        }
    }
};