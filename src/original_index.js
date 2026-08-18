
// // //==========================================================================================
// // //Initial Configuration

// import {} from "dotenv/config"
// import axios from 'axios';
// import { ActionRowBuilder, 
//     ButtonBuilder,
//     ButtonStyle, 
//     Collection,
//     ChannelType,
//     Client,
//     EmbedBuilder, 
//   GatewayIntentBits,
//   GuildMember, 
//   PermissionFlagsBits, 
//   REST, Routes, SlashCommandBuilder 
// } from 'discord.js';

// const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
// const TWITCH_CLIENT_SECRET = process.env.TWITCH_SECRET;
// const TWITCH_STREAMER_NAME = process.env.STREAMER_NAME;
// const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
// const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
// const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;

// const config = {
//   prefix: "!", // - !help aka command trigger
//   //Put a .inv usually instead of the token itself
//   token: process.env.DISCORD_BOT_TOKEN
// };

// const client = new Client({ 
//   intents: [
//     GatewayIntentBits.Guilds, 
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent,
//     GatewayIntentBits.GuildMembers
//   ] 
// });

// const rest =new REST({version:'10'}).setToken(config.token);

// let accessToken = null;
// let tokenExpiryTime = null;
// let checkInterval;
// let isOnline = false;

// //Connect to mongoDB
// // mongoose.connect(mongoURI,{
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   useFindAndModify: false,
// //   useCreateIndex: true,
// // });

// //Discords works like a HTTP request through events
// //Ready - an event if the bot is started
// client.on('ready', () => {
//     console.log("Yozora Online");
// })

// //Discord Bot login
// client.login(config.token);

// //More Advance Discord bot
// /*client.commands = new Collection();

// mongoose.connect(mongoURI).then(()=>{
//   console.log("Connection to MongoDB Established");
// }).catch((err) =>{
//   console.error(err);
// });

// //load commands folder
// const commandFolders = fs.readdirSync('./commands');
// for (const folder of commandFolders){
//   const commandFiles = fs.readdirSync(`./commands/${folder}`.filter(file=>file.endsWith('.js')));
//   for (const files of commandFiles){
//     const command  = requrie(`./commands/${folder}/${file}`);
//     client.commands.set(command.name, command);
//   }
// }

// //load events form events folder
// const eventFiles = fs.readdirSynce('./events').filter(file => file.endsWith('.js'));
// for (const file of eventFiles){
//   const event = require(`./events/${file}`);
//   if (event.once){
//     client.once(event.name, (...args) => event.execute(...args,client));
//   }else {
//     client.on(event.name, (...args) => event.execute(...args, client));
//   }
// }
// */

// //=================================================================

// //=================================================================

// /* COMMAND LINE START*/
// //Command Lines


// //MessageCreate event - reads the messages sent to a discord server
// client.on('messageCreate', async message => {
//     if(message.author.bot) return; // Skips bots messages
//     if(message.channel.type === "dm") return; //Disbales DMs

//     // - command Processor
//     // - open CCPROG3 ge=False
//     let messageArray = message.content.split(" ");
//     let cmd = messageArray[0];  //saves !open to cmd
//     let args = messageArray.slice(1); // removes "!open"

//     if(!cmd.startsWith(config.prefix)) return;
//     // Discord Role check
//     // if(message.author.<insert object keys>)

//     // Some code over here
//     if(cmd === "!ping") //check if the command sent by the user is !ping
//        message.channel.send("pong!");
    
//     if(cmd === "!live_Shigeo"){
//         // Start checking the streamer's status
//         startCheckingStreamerStatus();

//     }

// });

//  /* COMMAND LINE END */

// //===================================================================

// //===================================================================
// //Verification System
// client.on('interactionCreate', (interaction)=>{
//     if(interaction.isChatInputCommand()){
//         switch(interaction.commandName){
//             case 'setup': {
//                 const channel = interaction.options.getChannel('channel');

//                 channel.send({ embeds: [
//                      new EmbedBuilder()
//                     .setTitle("Node 0101 Verification System")
//                     .setDescription("**Welcome to Node 0101**\nWelcome to the lounge! Please read the following guidelines and click the check mark to gain access to the whole server!\n \n__DA RULES__\n\n```\nBe Kind\n```\n```\nNo political/religion/ or anything similar talk\n```\n```\nNo Trauma Dumping\n```\n```\nDont Be Toxic\n```\n```\nNo Bullying\n```\n```\nDont Spam ping\n```\n```\nNO NSFW IN PUBLIC CHATS AND VCs!\n```\n```\nNo Self Promo Unless in the Self Promo chat\n```\n```\nBe fun, be supportive, be the best you can be\n```")
//                     .setColor("#11e39f")
//                     .setFooter({
//                         text: "Note Rules Maybe Updated With Notice. By Agreeing to the rules you  hereby accept that you also accept any changes to the rules. Any complaints of criticism will be accepted and reviewed. After verifying please go to the roles section of the welcome mat thank you!",
//                         })
//                     ],
//                     components: [
//                         new ActionRowBuilder().setComponents(
//                             new ButtonBuilder().setCustomId('verifyMember').setLabel('Verify')
//                             .setStyle(ButtonStyle.Primary)
//                             .setEmoji('✅')
//                         ),
//                     ]
//                 });
//                 break;
//             }

//         }
//     } else if(interaction.isButton()){
//         switch(interaction.customId){
//             case 'verifyMember': {
//                 console.log("Verifying Member...");
//                 const role_exist = interaction.guild?.roles.cache
//                 .get('1257354931287883878');
//                 if(!role_exist){
//                     console.log('Error does not exist');
//                     return;
//                 }
//                 const member = interaction.member;
//                 member.roles.add(role_exist).then((m) => 
//                     interaction.reply({
//                     content: 'Thank you for your cooperation, welcome to Node 0101!',
//                     ephemeral:true
//                     })
//                 ).catch((err)=>
//                     interaction.reply({
//                         content: 'Something went wrong please ping Shigeo',
//                         ephemeral:true
//                         })
//                 );
//                 break;
//             }
//         }
//     }
// });

// (async () => {
//   try{
//     await rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),{
//       body: [
//         new SlashCommandBuilder().setName('setup')
//         .setDescription('Setup the welcome channel bot')
//         .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
//         .addChannelOption((option) => 
//           option
//         .setName('channel')
//       .setDescription('The cahnnel to send message to')
//     .addChannelTypes(ChannelType.GuildText)

    
//       ),
//       new SlashCommandBuilder().setName('bday')
//             .setDescription('Bday Message')
//             .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
//             .addChannelOption((option) => 
//               option
//             .setName('channel')
//           .setDescription('The channel to send message to')
//         .addChannelTypes(ChannelType.GuildText)
//       ),

//       new SlashCommandBuilder().setName('hiatus')
//         .setDescription('Setup the welcome channel bot')
//         .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
//         .addChannelOption((option) => 
//           option
//         .setName('channel')
//       .setDescription('The channel to send message to')
//     .addChannelTypes(ChannelType.GuildText)
//       ),

//       new SlashCommandBuilder().setName('test')
//         .setDescription('Test Stream Embed')
//         .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
//         .addChannelOption((option) => 
//           option
//         .setName('channel')
//       .setDescription('The channel to send message to')
//     .addChannelTypes(ChannelType.GuildText)
//     ),
//       ],
//     })
//   } catch(err){
//     console.log(err);
//   }
// })();


// //===================================================================

// //===================================================================

// //Welcome Message
// client.on("guildMemberAdd", member => {

//   const welcome_channelID = '1254447254220308583';
//   console.log(member);

//   //Welcome Message

//   const welcome_channel = member.guild.channels.cache.get(welcome_channelID);
//     welcome_channel.send({ embeds: [
//       new EmbedBuilder()
//     .setTitle("Welcome to Node 0101")
//     .setDescription(`A new guest has entered the node!\n\n**Welcome to Node 0101 Bar and Cafe ${member.user.globalName}**\n\n**Please Head to the Rules And Verification to gain full access to the server**`)
//     .setColor("#a6ffd2")
//     .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
//     ],
//     });

//     const dmMessage = `Welcome to the server! I am Yozora, Shigeo's System Deamon! Please do follow the rules and have fun!`;
//     member.send(dmMessage).catch(err =>{
//         return;
//     })
// });

// //===================================================================


// //===================================================================
// /* Streamer Live Nofitification */

// // Function to get Twitch Access Token
// async function getTwitchAccessToken() {
//   try {
//     const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
//       params: {
//         client_id: TWITCH_CLIENT_ID,
//         client_secret: TWITCH_CLIENT_SECRET,
//         grant_type: 'client_credentials'
//       }
//     });
//     accessToken = response.data.access_token;
//     tokenExpiryTime = Date.now() + (response.data.expires_in * 1000);
//     console.log('Access token retrieved successfully');
//     console.log(accessToken);
//   } catch (error) {
//     console.error('Error fetching Twitch access token:', error.response.data);
//   }
// }

// // Function to check if the token is expired
// function isTokenExpired() {
//   return Date.now() >= tokenExpiryTime;
// }

// // === Function to check streamer's status on Twitch ===
// async function checkStreamerStatus() {
//   if (!accessToken || isTokenExpired()) await getTwitchAccessToken();
  
//   try {
//     // First get the user ID (needed for offline data)
//     const userResponse = await axios.get(`https://api.twitch.tv/helix/users?login=${TWITCH_STREAMER_NAME}`, {
//       headers: {
//         'Client-ID': TWITCH_CLIENT_ID,
//         'Authorization': `Bearer ${accessToken}`
//       }
//     });

//     if (userResponse.data.data.length === 0) {
//       throw new Error('Streamer not found');
//     }

//     const userId = userResponse.data.data[0].id;
//     let result = {
//       online: false,
//       name: userResponse.data.data[0].display_name,
//       logo: userResponse.data.data[0].profile_image_url
//     };

//     // Check if currently streaming
//     const streamResponse = await axios.get(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
//       headers: {
//         'Client-ID': TWITCH_CLIENT_ID,
//         'Authorization': `Bearer ${accessToken}`
//       }
//     });

//     if (streamResponse.data.data.length > 0) {
//       // Stream is live - get current info
//       const streamData = streamResponse.data.data[0];
//       result = {
//         ...result,
//         online: true,
//         title: streamData.title,
//         gameId: streamData.game_id,
//         gameName: await getGameName(streamData.game_id),
//         thumbnail: streamData.thumbnail_url.replace('{width}', '1280').replace('{height}', '720'),
//         startedAt: streamData.started_at,
//         viewers: streamData.viewer_count
//       };
//     }

//     console.log('Streamer Info:', result);
//     return result;

//   } catch (error) {
//     console.error('Error getting streamer info:', error.response?.data || error.message);
//     return { error: 'Failed to get streamer info' };
//   }

// }

// // === Function to get Game Name by ID ===
// async function getGameName(gameId) {
//   if (!gameId) return 'Unknown Game';
//   try {
//     const response = await axios.get(`https://api.twitch.tv/helix/games?id=${gameId}`, {
//       headers: {
//         'Client-ID': TWITCH_CLIENT_ID,
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return response.data.data.length > 0 ? response.data.data[0].name : 'Unknown Game';
//   } catch (error) {
//     console.error('Error fetching game name:', error.response.data);
//     return 'Unknown Game';
//   }
// }


// // === Function to send Discord Embed Notification ===
// async function notifyDiscord(streamData) {
//   try {
//     // const channel = await client.channels.fetch(DISCORD_CHANNEL_ID);
//     const channel = await client.channels.fetch(1255484312372121632n);
//     const gameName = await getGameName(streamData.gameId);
//     const embed = new EmbedBuilder()
//       .setAuthor({
//         name: "Shigeo",
//         iconURL: "https://i.imgur.com/rC2zk3r.png",
//       })
//       .setTitle("Hello World Systems Online.")
//       .setDescription(`[**${streamData.title}**](https://www.twitch.tv/5_shigeo_5)\n\nＳｃｕｆｆ Ｓｔｒｅａｍ Ｓｔａｒｔｉｎｇ！`)
//       .addFields(
//         {
//           name: "Game",
//           value: gameName,
//           inline: true
//         },
//       )
//       .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${TWITCH_STREAMER_NAME}-1280x720.jpg`)
//       .setColor(streamData.online === true ? 0x00FF00 : 0xFF0000)
//       .setFooter({
//         text: "Node 0101",
//       })
//       .setTimestamp();

//     await channel.send({ content: `<@&${1277887756315656222n}> ${TWITCH_STREAMER_NAME} is now live on Twitch!`, embeds: [embed] });

//     console.log(`Notification sent for ${TWITCH_STREAMER_NAME} going live.`);
//   } catch (error) {
//     console.error('Error sending message to Discord:', error);
//   }
// }


// // Main logic to check streamer's status periodically
// async function startCheckingStreamerStatus() {
//   checkInterval = setInterval(async () => {
//     const streamData = await checkStreamerStatus();
//     if (streamData.online && !isOnline) {
//       await notifyDiscord(streamData);
//       isOnline = true;
//     }
//   }, 300000); // 60 seconds
// }
