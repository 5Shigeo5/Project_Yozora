

//Embed Builder for Roles, to D.R.Y
/*
Parameters:
- Title - Embed Header
- Description - message embed content
- Color - Emebed Color (in hex)
- Menu ID - custom ID used for the switchcase later
- optionsArr - roles to put into dropdown
 */

import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from "discord.js";

function embedBuild (title, descrption, color, menuId, optionsArr){
    const embedBase = new EmbedBuilder()
                .setTitle(title)
                .setDescription(descrption)
                .setColor(color)
    
    //Selection Option Generation and parsing
    const generateOptions = optionsArr.map(item => {
        return new StringSelectMenuOptionBuilder()
            .setLabel(item.label) //Header of Selection
            .setValue(item.roleName) //customID for each
            .setDescription(item.desc) //description, usually a subtext
            .setEmoji(item.emoji) //
    })
    //Dropdown
    const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(menuId)
                .setPlaceholder('Select a role')
                .addOptions(generateOptions)
    
    const row = new ActionRowBuilder().addComponents(selectMenu);

    return {embedBase, row}
}