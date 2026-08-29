import { 
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
    Embed,
} from "discord.js";

import { roleMenu } from "../utils/role_config.js";
import { embedBuild } from "../utils/menu_builder.js"

//Used for setting up self roles on the specified channel
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
        for (const blueprint of blueprints){
        const {embed, row} = embedBuild(blueprint);
        
        await interaction.channel.send({
            embeds: [embed],
            components: [row]
            })
        
        }

    }

}