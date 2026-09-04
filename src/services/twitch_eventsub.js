import WebSocket from "ws";
import 'dotenv/config';
import {getAccessToken} from './twitch_auth.js';
import { embedBuild } from "../utils/menu_builder.js";

// Wbe socket without connection for now
let activeSocket = null;

export async function twitchConnect() {
    
    //gets the auth token
    const authData = await getAccessToken();

    if(!authData) {
        return console.error('No Access Token Found');
    }

    const token = authData.token;

    //Twitch eventsub web socket server
    const ws = new WebSocket('wss://eventsub.wss.twitch.tv/ws');

    ws.on('open', () =>{
        console.log('WebSocket connection to Twitch establsihed')
    });

    //Event listener
    ws.on('message', async(data)=>{
       const message = JSON.parse(data);
       const messageType = message.metadata.message_type;

       if(messageType == 'session_welcome'){
        
        const sessionId = message.payload.session.id;
        console.log(`Session ID: ${sessionId}`);
        await subStream(sessionId, token);

       }

       if(messageType == 'notification'){
        const eventType = message.payload.subscription.type;

        if(eventType=='stream.online'){
            const streamData = message.payload.event;
            console.log(`${streamData.broadcaster_user_name} online`);

            const response  = await fetch(`https://api.twitch.tv/helix/streams?user_id=${process.env.STREAMER_ID}`, {
                method: 'GET',
                headers:{
                   'Client-Id': process.env.TWITCH_CLIENT_ID,
                   'Authorization': `Bearer ${getAccessToken}`  
                }

            });
            
            const json = await response.json();
            console.log(json.data);
            const data = JSON.parse(json);

            //Create the config
            const embedData = {
                user_name: data.user_name,
                game_name: data.game_name,
                title: data.title,
                started_at: data,started_at,
                thumbnail_url: data.thumbnail_url,
                embedType: "NOTIF"
            }
            //Discord Embed Wip call embedBuilder set type to notif
            const {embed} = embedBuild(embedData)
            await InteractionCallback.channel.send({
                embeds: [embed]
            })
        }
       }

    });

    //Reconnection attempt if websocket gets terminated
    ws.on('close', () =>{
        console.log('Connection interrupted, reconnecting');
        setTimeout(twitchConnect, 5000);
    });

    activeSocket = ws;

}

//subcription function
/*
Parameters:
sessionId - websocket session
token - the authData token, obtained when connecting to twitch
*/
async function subStream (sessionId, token){
    const subUrl = 'htpps://api.twitch.tv/helix/eventsub/subscriptions';

    const payload = {
        type: 'stream.online',
        version: '1',
        condition:{
            broadcaster_user_id: process.env.STREAMER_ID
        },
        transport:{
            method: 'websocket',
            session_id: sessionId
        }
    };

    try{
        const response = await fetch(subUrl, {
            method: 'POST',
            headers:{
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if(response.ok){

            console.log('EventSub for stream online subscribed');

        }else{

            const errorText = await response.text();
            console.error(`Failed to subscribe: ${response.status} - ${errorText}`);

        }
    } catch (error){
        console.error('Subscription Error: ', error);
    }
}