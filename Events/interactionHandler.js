const AdminCommand = ['dj', 'mode', 'settings']
const djCommand = ['join', 'leave']
const Discord = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, bot, config) {
    let pass, ephemeral = 'test';
    if (interaction.isCommand()) {
      const cmd = bot.slashCommands.get(interaction.commandName);
      const req = bot.db.prepare('SELECT * FROM guild WHERE guildId = ?').get(interaction.guild.id);
         
      const args = [];

      for (let option of interaction.options.data) {
          if (option.type === 1) {
              if (option.name) args.push(option.name);
              option.options?.forEach((x) => {
                  if (x.value) args.push(x.value);
              });
          } else if (option.value) args.push(option.value);
      }
      if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) && djCommand.includes(interaction.commandName)) {   
        JSON.parse(req.dj).forEach(role => {
            if(interaction.member.roles.cache.has(role)) pass = true
        })
        if(req.djEphemeral == 'on') ephemeral = true
      } else if(AdminCommand.includes(interaction.commandName)) {
        if(interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) pass = true
        if(req.adminEphemeral == 'on') ephemeral = true
      } else {
            pass = true 
            if(req.otherEphemeral == 'on') ephemeral = true 
    }
    console.log(ephemeral)
      if(pass == true) cmd.run(bot, interaction, args, config, ephemeral);
      else return interaction.reply({ content: `Vous ne pouvez pas utiliser cette commande`, ephemeral: true })
  }
  }}
