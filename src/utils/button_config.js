import { 
    LabelBuilder,
    MessageFlags, 
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
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
    },

    'openTicket': async (interaction) => {

        //Modal creation
        const modal = new ModalBuilder()
            .setCustomId('ticketModal')
            .setTitle('Open a Support Ticket');
        
        //subject
        const subjectInput  = new TextInputBuilder()
            .setCustomId('subjectInput')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Rule breaking");

        const subjectLabel = new LabelBuilder()
            .setLabel("Subject/Problem")
            .setTextInputComponent(subjectInput);
        
            modal.addLabelComponents(subjectLabel);
    
        //Description
        const descInput = new TextInputBuilder()
            .setCustomId('descInput')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Details of your concern');
        
        const descLabel = new LabelBuilder()
            .setLabel("Description")
            .setTextInputComponent(descInput);
        
        modal.addLabelComponents(descLabel);

        await interaction.showModal(modal);
    },

    'closeTicket': async (interaction) => {
        
        if(!interaction.channel.isThread()) {
            return interaction.reply({
                content:"Close Button should only be in a thread, if found elsewere contact mods",
                flags: MessageFlags.Ephemeral
            });
        }

        try {

            await interaction.reply({
                content: `Ticket closed by <@${interaction.user.id}>`
            });

            await interaction.channel.edit({
                locked: true,
                archived: true,
                reason: `Ticket closed by ${interaction.user.tag}`
            })

        } catch (error) {
            console.error('Failed to close ticker: ', error);

            //Keep trying to send this if there is an error
            if(!interaction.replied){
                await interaction.reply({
                    content: "There was error closing the ticket: ",
                    flags: MessageFlags.Ephemeral
                })
            } else {
                    await interaction.followUp({
                    content: "There was error closing the ticket: ",
                    flags: MessageFlags.Ephemeral
                })
            }
        }
    }
}