import { ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags } from 'discord.js';
import fs from 'node:fs/promises'

export const modalHandler = {
    'ticketModal': async (interaction) => {

        await interaction.deferReply({
            flag: MessageFlags.Ephemeral
        });

        const subject = interaction.fields.getTextInputValue('subjectInput');
        const desc = interaction.fields.getTextInputValue('descInput');

        const closeButton = new ButtonBuilder()
            .setCustomId('closeTicket')
            .setLabel('✖ Close Ticket')
            .setStyle(ButtonStyle.Danger);
        
        const buttonRow = new ActionRowBuilder().addComponents(closeButton);

        try{
            const jsData = await fs.readFile('../ticket_cnt.json', 'utf8');
            const data = JSON.parse(jsDataData);
            
            const ticketCount = data.count || 1;

            const ticketThread = await interaction.channel.threads.create({

                name: `Ticket #${currentTicketCount} | ${interaction.user.username}`,
                autoArchiveDuration: 1440,
                type: ChannelType.PrivateThread,
                reason: 'Open Support Ticket'

            });

            await ticketThread.members.add(interaction.user.id);
            data.count = ticketCount + 1;
            await fs.writeFile('../ticket_cnt.json', JSON.stringify(data, null, 4));

            const embed = new EmbedBuilder()
                .setTitle(`New Ticket ${subject}`)
                .setDescription(desc)
                .setColor('Aqua')
                .setAuthor({
                    name: interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL()
                });
            
            await ticketThread.send({
                content: `<@$interaction.user.id>, ticket has been sent, support will be with you soon`,
                embeds: [embed],
                components: [buttonRow]
            });

            await interaction.editReply(`Ticket has been sent, please head over to ${ticketThread}`)

        } catch (error) {
            console.error('Error with ticket creation: ', error);
            await interaction.editReply("There was an error please DM the mods or admin");
        }

    }
}