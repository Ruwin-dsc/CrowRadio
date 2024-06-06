const Discord = require('discord.js');

module.exports = {
    name: 'ephemeral',
    description: 'ephemeral commandes.',
    dm_permission: false,
    perm: 'None',
    category: 'Utils',
    options: [
        {
            type: 1,
            name: 'admin',
            description: 'Modifier la visibilité des commandes admins',
            options: [
                {
                    type: 3,
                    name: 'valeur',
                    description: 'on ou off',
                    required: true,
                    choices: ['on', 'off'].map(i => ({ name: i, value: i }))
                }
            ],
        }, {
            type: 1,
            name: 'dj',
            description: 'Modifier la visibilité des commandes DJs',
            options: [
                {
                    type: 3,
                    name: 'valeur',
                    description: 'on ou off',
                    required: true,
                    choices: ['on', 'off'].map(i => ({ name: i, value: i }))
                }
            ],
        }, {
            type: 1,
            name: 'other',
            description: 'Modifier la visibilité des autres membres',
            options: [
                {
                    type: 3,
                    name: 'valeur',
                    description: 'on ou off',
                    required: true,
                    choices: ['on', 'off'].map(i => ({ name: i, value: i }))
                }
            ],
        }
    ],
    run: async (bot, interaction, args, config, ephemeral) => { 
        const type = interaction.options.getSubcommand()
        const statut = interaction.options.getString('valeur')
        await bot.db.prepare(`UPDATE guild SET ${type}Ephemeral = @statut WHERE guildId = @id`).run({
            statut: statut,
            id: interaction.guild.id
        })

        interaction.reply({ content: `Les commandes des ${type == "other" ? "autres membres" : type} seront maintenant ${statut == 'on' ? 'visible' : 'invisible'}`, ephemeral: ephemeral })
    }
}