const Database = require('better-sqlite3');
const db = new Database('./Utils/DataBase/database.db');

module.exports = () => {
    db.exec(`CREATE TABLE IF NOT EXISTS guild (
        guildId TEXT DEFAULT NULL,
        dj TEXT DEFAULT '[]',
        adminEphemeral TEXT DEFAULT 'on',
        djEphemeral TEXT DEFAULT 'on',
        otherEphemeral TEXT DEFAULT 'on',
        mode TEXT DEFAULT 'automatic',
        channelAutomatic TEXT DEFAULT NULL
    )`);
    return db;
}