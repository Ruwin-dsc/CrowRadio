const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Affiche les commandes du bot',
    dm_permission: false,
    run: async (bot, interaction, args, config, ephemeral) => {
        let admin, dj;
        const req = bot.db.prepare('SELECT * FROM guild WHERE guildId = ?').get(interaction.guild.id);

        const embed = new Discord.EmbedBuilder()
        .setTitle(`Liste des commandes disponibles`)
        .setFooter({ text: 'ζ͜͡Crow Bots'})
        .setColor(config.color)

        if(interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) admin = true
        JSON.parse(req.dj).forEach(role => {
            if(interaction.member.roles.cache.has(role)) dj = true
        })

        if(admin || dj) {
            embed.addFields(
                { name: "`/join [salon]`", value: "Me fait rejoindre un salon" },
                { name: "`/leave`", value: "Me fait quitter mon salon actuel" },
                { name: "`/mode <automatic/manual>`", value: "En mode automatique, je rejoins automatiquement quand quelqu'un va dans mon salon, en mode manuel je ne rejoins que quand quelqu'un utilise la commande `/join`" },
                { name: "`/ephemeral <admin/dj/other> <on/off>`", value: "Configure les messages invisibles pour certains membres du serveur" },
                { name: "`/dj <add/del> <role>`", value: "Ajoute ou supprime un rôle DJ" },
                { name: "`/settings`", value: "Affiche les paramètres du bot" }
            )
        }

        embed.addFields({ name: "`/crowbots`", value: "Affiche une invitation pour rejoindre le serveur de support du bot" })
        return interaction.reply({ embeds: [embed], ephemeral: ephemeral });
    }
}