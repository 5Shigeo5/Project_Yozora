import {
    EmbedBuilder
} from 'discord.js';

export default{

    name: 'guildMemberAdd',

    async execute(member){

        const welcomeChannelId = process.env.DISCORD_WELCOME_CHANNEL_ID;
        const channel = member.guild.channels.cache.get(welcomeChannelId);

        if(!channel) return;

        const embed = new EmbedBuilder()
            .setTitle("Welcome to Node 0101")
            .setDescription(`A new guest has entered the node!\n\n**Welcome to Node 0101 Bar and Cafe <@${member.id}>**\n\n**Please Head to the Rules And Verification to gain full access to the server**`)
            .setColor("#a6ffd2")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        try{
            await channel.send({
                embeds: [embed]
            });
        }catch (error){
            console.error('Failed to send welcome message: ', error);
        }
    }

}