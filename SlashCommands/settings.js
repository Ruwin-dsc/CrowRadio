const Discord = require('discord.js');
const ephemeral = require('./ephemeral');

module.exports = {
    name: 'settings',
    description: 'Affiche les paramètres du bot',
    dm_permission: false,
    run: async (bot, interaction, args, config, ephemeral) => {
        const req = bot.db.prepare('SELECT * FROM guild WHERE guildId = ?').get(interaction.guild.id);
        const roleArray = JSON.parse(req.dj).filter(r => interaction.guild.roles.cache.get(r))
        const embed = new Discord.EmbedBuilder()
        .setTitle(`Paramètres du serveur`)
        .setFooter({ text: 'ζ͜͡Crow Bots'})
        .setColor(config.color)
        .addFields({ name: 'Mode', value: req.mode == 'automatic' ? 'Automatique' : 'Manuel', inline: true })

        if(req.mode == 'automatic') embed.addFields({ name: 'Salon', value: interaction.guild.channels.cache.get(req.channelAutomatic) ? `<#${interaction.guild.channels.cache.get(req.channelAutomatic).id}>` : 'Aucun', inline: true })
        embed.addFields({ name: `Ephemeral`, value: `DJ : ${req.djEphemeral == 'on' ? '✅' : '❌'}\nAdmin : ${req.adminEphemeral == true ? '✅' : '❌'}\nAutres : ${req.otherEphemeral == true ? '✅' : '❌'}`, inline: true })
        embed.addFields({ name: `Rôles DJ`, value: roleArray.length == 0 ? 'Aucun' : roleArray.map(r => `<@&${r}>`), inline: true })

        return interaction.reply({ embeds: [embed], ephemeral: ephemeral })

    }
}