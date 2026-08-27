import { 
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
    Embed,
} from "discord.js";

import { roleMenu } from "../utils/role_config.js";
import { embedBuild } from "../utils/menuBuilder.js"
export default {

    data: new SlashCommandBuilder()
    .setName('setup_role')
    .setDescription('Deploy Server Roles')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction){

        await interaction.reply({

            content: 'Roles Deployed',
            flags: MessageFlags.Ephemeral
            
        })

        const blueprints = Object.values(roleMenu);
        const finalEmbed = [];
        const finalRow = [];
        for (const blueprint of blueprints){
        const {embed, row} = embedBuild(blueprint);
        
        await interaction.channel.send({
            embeds: [embed],
            components: [row]
            })
        
        }

    }

}