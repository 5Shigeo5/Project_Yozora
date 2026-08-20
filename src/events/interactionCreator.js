import { Events, MessageFlags } from "discord.js";

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
            
            //#####Button ID List#######
            /*
            Update this everytime
            1. verifyMember - Verification Button for the Rules and Verification
            */
            switch (interaction.customId){

                case 'verifyMember': {

                    const role = interaction.guild.roles.cache.find(r => r.name == 'Pixelite');

                    if(!role){
                        return interaction.reply({
                            content: 'Error: Role Doesnt Exist, Doublecheck the Role Name and Edit',
                            flags: MessageFlags.Ephemeral
                        });
                    }

                    //Checks if a member is verified
                    try{
                        if(interaction.member.roles.cache.has(role.id)){
                            return interaction.reply({
                                content: 'User is already verified',
                                flags: MessageFlags.Ephemeral
                            });
                        }

                        await interaction.member.roles.add(role);
                        
                        await interaction.reply({
                            content: 'Thank you for your cooperation, welcome to Node 0101!',
                            flags: MessageFlags.Ephemeral
                        });

                    }catch (err){
                        console.error('Verification Failed, Error Code: ', err);
                        await interaction.reply({
                            content: 'Something went wrong please ping Shigeo or the mods',
                            flags: MessageFlags.Ephemeral  
                        });
                    }

                    break;
                }

                case 'Button Place Holder':{
                    //Feature for next time
                    break;
                }

                default: {
                    console.log(`[WARNING] Unhandled button interaction at ID ${interaction.customId}`);
                    await interaction.reply({content: 'Feature Pending'});
                    break;
                }

            }

        }

    }
};