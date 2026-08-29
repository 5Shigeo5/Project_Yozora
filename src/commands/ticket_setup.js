import {
    EmbedBuilder, 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageFlags, 
    SlashCommandBuilder 
} from "discord.js";


//A one time command to set up the support ticket at the current channel
export default{
    
    data: new SlashCommandBuilder()
        .setName('setup_ticket')
        .setDescription('Initialitizes the ticket embed at the current channel'),
        
        async execute(interaction){

            const ticketEmbed = new EmbedBuilder()
                .setTitle("Node 0101 Ticket System")
                .setDescription(
                    '**Welcome to the Node 0101 Ticket System**' +
                    '\n If you have any concerns about members role assignments' +
                    ' or anything similar please feel free to make a ticket and ' +
                    'a staff will be with you in a timely manner' +

                    '\n\n **Important Note** \n' +
                    'The ticketing system is  for important issues that require staff' +
                    ' intervention, abusing this ticket system will lead to potential kicks' +
                    ' and at worse **BANS**'
                )
                .setColor("#11e39f")
            
            const openTicketButton = new ButtonBuilder()
                .setCustomId('openTicket')
                .setLabel('Open a Ticket')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🎫')
            
            const row = new ActionRowBuilder().addComponents(openTicketButton);

            //Send to channel
            await interaction.channel.send({
                embeds:[ticketEmbed],
                components:[row]
            });

            await interaction.reply({
                content:'Ticket System Launched',
                flags: MessageFlags.Ephemeral
            });

        }

}