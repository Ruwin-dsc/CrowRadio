const Discord = require('discord.js');

module.exports = {
    name: 'crowbots',
    description: 'Affiche une invitation pour rejoindre le serveur de support du bot.',
    dm_permission: false,
    run: async (bot, interaction, args, config, ephemeral) => {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`[Cliquez pour rejoindre le support ζ͜͡Crow Bots](https://discord.gg/jWCC5YnGNw)`)
        .setColor(config.color)
        return interaction.reply({ embeds: [embed], ephemeral: ephemeral });
    }
}