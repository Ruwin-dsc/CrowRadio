module.exports = {
  name: 'ready',
  async execute(bot) {
    await bot.application.commands.set(bot.arrayOfSlashCommands);
    await bot.user.setPresence({ activities: [{ name: 'NRJ.', type: 2 }], status: 'online' });
    setInterval(() => {
      bot.guilds.cache.forEach(guild => {
        if(!bot.db.prepare('SELECT guildId FROM guild WHERE guildId = ?').get(guild.id)) bot.db.exec(`INSERT INTO guild (guildId) VALUES ('${guild.id}')`), console.log(`[!] Ajout ${guild.name} à la base de donnée !`);
      })
    }, 10000)
  },
};