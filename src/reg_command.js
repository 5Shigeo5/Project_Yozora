require('dotenv').config();
const {REST, Routes} = require('index.js');

const commands = [
    {
        name: 'setup',
        description: 'Setup the welcome channel bot'

    },
    {
        name: 'bday',
        description: 'bday message'

    },
]

(async () => {
    try{
      await rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),{
        body: [
          new SlashCommandBuilder().setName('setup')
          .setDescription('Setup the welcome channel bot')
          .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
          .addChannelOption((option) => 
            option
          .setName('channel')
        .setDescription('The cahnnel to send message to')
      .addChannelTypes(ChannelType.GuildText)
    ),
        ],
      })
    } catch(err){
      console.log(err);
    }
  })();