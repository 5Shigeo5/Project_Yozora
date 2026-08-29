import { 
    ActionRowBuilder,
    ButtonBuilder, 
    ButtonStyle, 
    EmbedBuilder, 
    MessageFlags,
    ChannelType } from 'discord.js';
import fs from 'node:fs/promises'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ticketCntPath = path.join(__dirname, '..', '..', 'ticket_cnt.json')

export const modalHandler = {
    'ticketModal': async (interaction) => {

        await interaction.deferReply({
            flags: MessageFlags.Ephemeral
        });

        const subject = interaction.fields.getTextInputValue('subjectInput');
        const desc = interaction.fields.getTextInputValue('descInput');

        const closeButton = new ButtonBuilder()
            .setCustomId('closeTicket')
            .setLabel('✖ Close Ticket')
            .setStyle(ButtonStyle.Danger);
        
        const buttonRow = new ActionRowBuilder().addComponents(closeButton);

        try{
            const jsData = await fs.readFile(ticketCntPath, 'utf8');
            const data = JSON.parse(jsData);
            
            const ticketCount = data.count || 1;

            const ticketThread = await interaction.channel.threads.create({

                name: `Ticket #${ticketCount} | ${interaction.user.username}`,
                autoArchiveDuration: 1440,
                type: ChannelType.PrivateThread,
                reason: 'Open Support Ticket'

            });

            await ticketThread.members.add(interaction.user.id);
            data.count = ticketCount + 1;
            await fs.writeFile(ticketCntPath, JSON.stringify(data, null, 4));

            const embed = new EmbedBuilder()
                .setTitle(`New Ticket ${subject}`)
                .setDescription(desc)
                .setColor('Aqua')
                .setAuthor({
                    name: interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL()
                });
            
            const startMessage = await ticketThread.send({
                content: `<@${interaction.user.id}>, ticket has been sent, support will be with you soon`,
                embeds: [embed],
                components: [buttonRow]
            });

            await startMessage.pin();

            await interaction.editReply(`Ticket has been sent, please head over to ${ticketThread}`)

        } catch (error) {
            console.error('Error with ticket creation: ', error);
            await interaction.editReply({
                content: "There was an error please DM the mods or admin",
            });
        }

    }
}