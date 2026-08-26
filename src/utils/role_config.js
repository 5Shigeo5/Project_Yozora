/*
Main Roles
- Gender -  Multiple
- Region -  Single
- Pings - Multiple
- Misc Roles - Multiple

PARAMETERS
-customId - used for role paramater checking
-placeholder - default select row
-embedTitle - Title
-embedDesc - Description
-color - color of embed
-minSel - least amount of selected roles
-maxSel - max amount fo selected roles
-options - The entire list for dropdown
    -label - selection title
    -value - role name
    -desc - subtext for each role selection (not always required)
    -emoji - emoji to be used
*/ 

//Edit here if theres things to change or add
export const roleMenu = {
    gender:{
        customId: 'genderMenu',
        placeholder:'Select pronouns',
        embedTitle:'Pronouns',
        embedDesc:'What pronouns do you go by?',
        color:'#ffffff',
        minSel:0,
        maxSel:4,
        options:[
            {label: 'She/Her', value:'She/Her', emoji:'🔴'},
            {label: 'He/Him', value:'He/Him', emoji:'🔵'},
            {label: 'They/Them', value:'They/Them', emoji:'🟡'},
            {label: 'Non-Binary/Other', value:'Non-Binary/Other', emoji:'🟢'}
        ]
    },
    region:{
        customId: 'regionMenu',
        placeholder:'🌐 Select region',
        embedTitle:'Region',
        embedDesc:'Where are you from',
        color:'#000000',
        minSel:0,
        maxSel:1,
        options:[
            {label: 'North America', value:'North America', emoji:'🌎'},
            {label: 'South America', value:'South America', emoji:'🌎'},
            {label: 'Europe', value:'Europe', emoji:'🌍'},
            {label: 'Asia', value:'Asia', emoji:'🌏'},
            {label: 'Africa', value:'Africa', emoji:'🌍'},
            {label: 'Oceania', value:'Oceania', emoji:'🌏'},
            {label: 'Antarctica', value:'Antarctica', emoji:'❄'}
        ]
    },
    ping:{
        customId: 'pingMenu',
        placeholder:'Select notifs',
        embedTitle:'Announcement Pings',
        embedDesc:'Choose what kind of announcements do you want to be notified by',
        color:'#0084ff',
        minSel:0,
        maxSel:2,
        options:[
            {label:'Node Status', value:'Node Pings', emoji:'🔊', desc:'Notifies you for any server announcements including stream schedules'},
            {label:'Stream Status', value:'Stream Pings', emoji:'📺', desc:'Notifies you when Im streaming!'},
        ]
    },
    misc:{
        customId: 'miscMenu',
        placeholder:'Extra Roles',
        embedTitle:'Self Roles',
        embedDesc:'What fits your fancy?',
        color:'#00ff2a',
        minSel:0,
        maxSel:3,
        options:[
            {label:'Artist', value:'Artist', emoji:'🎨'},
            {label:'Streamer', value:'Streamer', emoji:'💻'},
            {label:'Gamer', value:'CPG', emoji:'🎮'},
        ]
    }
};
