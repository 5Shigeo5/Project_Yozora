import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName('ping').setDescription('Ping Pong and Latency'),

    async execute(interaction){
        const sent = await interaction.reply({content: 'Pinging', fetchReply: true});
        const latency = sent.createdTimestamp - interaction.createdTimestamp;

        await interaction.editReply(`Pong \nLatency: ${latency}ms | API Latency: ${Math.round(interaction.client.ws.ping)}ms`);
    }
}