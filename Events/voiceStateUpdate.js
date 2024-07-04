const { getVoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice')
const config = require('../config.json')
let connectedChannel
module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, bot) {
        if (newState){
            if(newState.bot) return
            if(!newState.channel) return
            const voice = getVoiceConnection(oldState.guild.id)
            if(!voice) {
                const req = bot.db.prepare('SELECT * FROM guild WHERE guildId = ?').get(newState.guild.id);
                
                const channel = await newState.guild.channels.cache.get(req.channelAutomatic)
                if (!channel) return;
                if (newState.channel.id !== channel.id) return;
                if(connectedChannel) return
        
                const VoiceConnection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: newState.guild.id,
                    adapterCreator: newState.guild.voiceAdapterCreator
                });
        
                const mp3 = createAudioResource(config.flux, { inlineVolume: true, }); 
                mp3.volume.setVolume(0.015)
                const player = createAudioPlayer()
                VoiceConnection.subscribe(player)
                await player.play(mp3)
                connectedChannel = true
            }
        }        
    }
}
