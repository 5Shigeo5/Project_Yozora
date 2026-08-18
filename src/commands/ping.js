import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping Pong and Latency'),

    async execute(interaction){
        await interaction.reply({content: 'Pinging'});
        
        const sent = await interaction.fetchReply();

        const latency = sent.createdTimestamp - interaction.createdTimestamp;

        await interaction.editReply(`Pong \nLatency: ${latency}ms | API Latency: ${Math.round(interaction.client.ws.ping)}ms`);
    }
}