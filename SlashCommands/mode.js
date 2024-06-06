const Discord = require('discord.js');

module.exports = {
    name: 'mode',
    description: "Modifie mon mode de fonctionnement",
    dm_permission: false,
    options: [
        {
            type: 3,
            name: 'mode',
            description: 'Le nouveau mode',
            required: true,
            choices: ['automatic', 'manual'].map(i => ({ name: i, value: i }))
        }
    ],
    run: async (bot, interaction, args, config, ephemeral) => {
        const mode = interaction.options.getString('mode')
        await bot.db.prepare(`UPDATE guild SET mode = @mode WHERE guildId = @id`).run({
            mode: mode,
            id: interaction.guild.id
        })
        return interaction.reply({ content: mode == 'automatic' ? 'Vous pouvez maintenant configurer un salon que je rejoindrait automatiquement quand des membres iront dedans' : 'Je ne rejoindrait plus les salons automatiquement', ephemeral: ephemeral })
    }
}