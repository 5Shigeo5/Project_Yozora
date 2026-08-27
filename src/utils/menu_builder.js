

//Embed Builder for Roles, to D.R.Y


import { 
    ActionRowBuilder,
    EmbedBuilder, 
    StringSelectMenuBuilder, 
    StringSelectMenuOptionBuilder
} from "discord.js";

const padding = '⠀'.repeat(40.5);

export function embedBuild (config){
    const embedBase = new EmbedBuilder()
                .setTitle(config.embedTitle)
                .setDescription(`${config.embedDesc}\n${padding}`)
                .setColor(config.color)

    
    //Selection Option Generation and parsing
    const generateOptions = config.options.map(item => {
        const option = new StringSelectMenuOptionBuilder()
            .setLabel(item.label) //Header of Selection
            .setValue(item.value); //customID for each
            
            if(item.desc){
            
                option.setDescription(item.desc)
            
            }

            if(item.emoji){

                option.setEmoji(item.emoji)

            }
        
            return option;

    })
    //Dropdown
    const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(config.customId)
                .setPlaceholder(config.placeholder)
                .addOptions(generateOptions)
                .setMinValues(config.minSel)
                .setMaxValues(config.maxSel)
    
    const row = new ActionRowBuilder().addComponents(selectMenu);

    return {embed: embedBase, row};
}