const Discord = require('discord.js');
//merci o5plgm6
module.exports = {
    name: 'help',
    description: 'Affiche les commandes du bot',
    dm_permission: false,
    run: async (bot, interaction, args, config, ephemeral) => {
        const { guild, member } = interaction;

        const { dj } = bot.db.prepare('SELECT * FROM guild WHERE guildId = ?').get(guild.id);
        const memberRoles = [...member.roles.cache.values()];
        let bypass = member.permissions.has(Discord.PermissionFlagsBits.Administrator) || Array.from(JSON.parse(dj), roleId => memberRoles.includes(roleId)).find(Boolean);
        
        const embeds = [{
            title: 'Liste des commandes disponibles',
            footer: {
                text: 'ζ͜͡Crow Bots'
            },
            color: parseInt(config.color.replace('#', ''), 16),
            fields: [
                ...bypass ? [
                    { name: "`/join [salon]`", value: "Me fait rejoindre un salon" },
                    { name: "`/leave`", value: "Me fait quitter mon salon actuel" },
                    { name: "`/mode <automatic/manual>`", value: "En mode automatique, je rejoins automatiquement quand quelqu'un va dans mon salon, en mode manuel je ne rejoins que quand quelqu'un utilise la commande `/join`" },
                    { name: "`/ephemeral <admin/dj/other> <on/off>`", value: "Configure les messages invisibles pour certains membres du serveur" },
                    { name: "`/dj <add/del> <role>`", value: "Ajoute ou supprime un rôle DJ" },
                    { name: "`/settings`", value: "Affiche les paramètres du bot" }
                ] : [],
                { name: "`/crowbots`", value: "Affiche une invitation pour rejoindre le serveur de support du bot" },
            ]
        }];
        
        interaction.reply({ embeds, ephemeral });
    }
}