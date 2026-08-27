import { Events, MessageFlags } from "discord.js";
    //#####Button ID List#######
    /*
    Update this everytime
    1. verifyMember - Verification Button for the Rules and Verification
    */

export const buttonHandler = {

    'verifyMember': async (interaction) =>{
        
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
    }

}