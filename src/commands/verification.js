import { 
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle 
} from "discord.js";


export default{
    data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Deploy Server Rules and Verification')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction){

        //Discord Embed of the Rules
        const rulesEmbed = new EmbedBuilder()
                    .setTitle("Node 0101 Verification System")
                    .setDescription(
                        '**Welcome to Node 0101' +
                        '\nWelcome to the lounge! Please read the following guidelines and click the check mark to gain access to the whole server!\n' +
                        '\n__DA RULES__\n'+
                        '\n```\nBe Kind\n```\n' +
                        '```\nNo political/religion/ or anything similar talk\n```' + 
                        '\n```\nNo Trauma Dumping\n```' + 
                        '\n```\nDont Be Toxic\n```' + 
                        '\n```\nNo Bullying\n```' + 
                        '\n```\nDont Spam ping\n```' +
                        '\n```\nNO NSFW IN PUBLIC CHATS AND VCs!\n```' +
                        '\n```\nNo Self Promo Unless in the Self Promo chat\n```' + 
                        '\n```\nBe fun, be supportive, be the best you can be\n```')
                    .setColor("#11e39f")
                    .setFooter({
                        text: 'Note Rules Maybe Updated With Notice.' + 
                        ' By Agreeing to the rules you  hereby accept that you also accept any changes to the rules. ' +
                        'Any complaints of criticism will be accepted and reviewed.' + 
                        ' After verifying please go to the roles section of the welcome mat thank you!'
                        })
        
        //Verification Button
        const verifyMemberButton =  new ButtonBuilder()
                            .setCustomId('verifyMember')
                            .setLabel('Verify')
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji('✅')
        
        const row = new ActionRowBuilder().addComponents(verifyMemberButton);

        //Send to channel
        await interaction.channel.send({
            embeds: [rulesEmbed],
            components: [row]
        });

        //Flavor Text that it got deployed
        await interaction.reply({
            content: 'Rules Deployed and Updated',
            ephemeral:true
        });

    }
}