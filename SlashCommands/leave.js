const Discord = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice')

module.exports = {
    name: 'leave',
    description: 'Me fait quitter mon salon actuel',
    dm_permission: false,
    run: async (bot, interaction, args, config, ephemeral) => {
        const connection = getVoiceConnection(interaction.guild.id)
        if(!connection) return interaction.reply({ content: "Je ne suis connecté à aucun salon vocal", ephemeral: ephemeral })
        connection.destroy()
        interaction.reply({content: "Je quitte voc", ephemeral: ephemeral})
    }
}