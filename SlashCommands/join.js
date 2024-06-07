const Discord = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice')

module.exports = {
    name: 'join',
    description: "Me fait rejoindre un salon",
    dm_permission: false,
    options: [
        {
            type: 7,
            name: 'channel',
            description: 'Le salon à rejoindre',
            required: false,
            channel_types: [Discord.ChannelType.GuildVoice]
        }
    ],
    run: async (bot, interaction, args, config, ephemeral) => {
        const channel = interaction.options.getChannel("channel") || interaction.member.voice.channel
        if (!channel) return interaction.reply({ content: "Veuillez spécifier un salon vocal ou en rejoindre un", ephemeral: ephemeral })
        if (!channel.viewable) return interaction.reply({ content: "Je n'ai pas la permission de voir ce salon", ephemeral: ephemeral })
        if (!channel.joinable) return interaction.reply({content: "Je n'ai pas les permissions de me connecter dans ce salon", ephemeral: ephemeral})
        
        await interaction.reply({ content: `Connexion à ${channel.name}` })

        const VoiceConnection = joinVoiceChannel({
            channelId: channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        const mp3 = createAudioResource(config.flux); 
        const player = createAudioPlayer()
        VoiceConnection.subscribe(player)
        player.play(mp3)

        const req = await bot.db.prepare(`UPDATE guild SET channelAutomatic = @channel WHERE guildId = @id`).run({
            channel: channel.id,
            id: interaction.guild.id
        })
        console.log(req)
    }
}