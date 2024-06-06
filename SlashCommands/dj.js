const Discord = require('discord.js');

module.exports = {
    name: 'dj',
    description: 'DJ commandes.',
    dm_permission: false,
    perm: 'None',
    category: 'Utils',
    options: [
        {
            type: 1,
            name: 'add',
            description: 'Ajoute un rôle DJ',
            options: [
                {
                    type: 8,
                    name: 'role',
                    description: 'le rôle à ajouter',
                    required: true,
                    autocomplete: true
                }
            ],
        }, {
            type: 1,
            name: 'del',
            description: 'Supprime un rôle DJ',
            options: [
                {
                    type: 8,
                    name: 'role',
                    description: 'le rôle à supprimer',
                    required: true,
                    autocomplete: true
                }
            ],
        }
    ],
    run: async (bot, interaction, args, config, ephemeral) => { 
        const type = interaction.options.getSubcommand()
        const role = interaction.options.getRole('role')
        const req = bot.db.prepare('SELECT * FROM guild WHERE guildId = ?').get(interaction.guild.id);
        let array = JSON.parse(req.dj)

        if(type == 'add') {
            if(array.includes(role.id)) return interaction.reply({ content: `Le rôle ${role} était déjà un rôle DJ`, ephemeral: ephemeral })
            else {
                array.push(role.id)
                await bot.db.prepare(`UPDATE guild SET dj = @dj WHERE guildId = @id`).run({
                    dj: JSON.stringify(array),
                    id: interaction.guild.id
                })
                interaction.reply({ content: `Le rôle ${role} est maintenant un rôle DJ`, ephemeral: ephemeral })
            }
        } else if(type == 'del') {
            if(!array.includes(role.id)) return interaction.reply({ content: `Le rôle ${role} n'était pas un rôle DJ`, ephemeral: ephemeral })
            else {
                array = array.filter(id => id !== role.id)
                await bot.db.prepare(`UPDATE guild SET dj = @dj WHERE guildId = @id`).run({
                    dj: JSON.stringify(array),
                    id: interaction.guild.id
                })
                interaction.reply({ content: `Le rôle ${role} n'est plus un rôle DJ`, ephemeral: ephemeral })
            }
        }
    }
}