const { getVoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice')
const config = require('../config.json')
module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, bot) {
        if (newState){
            if(!newState.channel) return
            const req = bot.db.prepare('SELECT * FROM guild WHERE guildId = ?').get(newState.guild.id);
            
            const channel = await newState.guild.channels.fetch(req.channelAutomatic)
            if (!channel) return;
            if (newState.channel.id !== channel.id) return;
      
            const VoiceConnection = joinVoiceChannel({
                channelId: channel.id,
                guildId: newState.guild.id,
                adapterCreator: newState.guild.voiceAdapterCreator
            });
    
            const mp3 = createAudioResource(config.flux); 
            const player = createAudioPlayer()
            VoiceConnection.subscribe(player)
            player.play(mp3)
        }        
    }
}