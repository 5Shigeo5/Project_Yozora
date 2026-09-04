import 'dotenv/config'

export async function getAccessToken(){
    const tokenUrl = 'https://id.twitch.tv/oath2/token';

    try{
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-ww-form-urlencoded'
            },

            //OAuth instead of JSON
            body: new URLSearchParams({
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                grant_type: 'client_credentials'
            })
        });

        if (!response.ok){
            throw new Error(`Twitch Auth Failed: ${response.statusText} ${response.status}`);
        }

        const data = await response.json();

        console.log('Access Token Granted');

        return{
            token:data.access_token,
            expiresIn: data.expires_in
        };
    }catch(error){
        console.error('Error on fetching token', error);
        return null;
    }
}