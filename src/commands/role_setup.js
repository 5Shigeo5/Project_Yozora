import { 
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
    Embed,
} from "discord.js";

import { roleMenu } from "../utils/role_config.js";
import { embedBuild } from "../utils/menuBuilder.js"
//ACTUAL SLASH COMMAND
//IF OVER 5 EMBEDS ADJUST LOOP

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
        console.log('Emebed', embed);
        finalEmbed.push(embed);
        finalRow.push(row);
        }

        await interaction.channel.send({
            embeds: finalEmbed,
            components: finalRow
        })
    }

}