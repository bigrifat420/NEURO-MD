const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZVBiQlhYbU5LUW5YMkh1cU1tRE9tUXFFTmdoSjlsWnpnMTg0ZUx3OWEzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWkFJb3RsL2g4MUFJaWNWTFhWbU9rT2VvTlREdFdxL3BETEtNVWhRL2R5ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2T0hlcnRjbkFpN0VvM3ZWYy9kdTNidUJjb3BlMURYWXBHeWkzWHFHelYwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYS3pPU0R0RlJFc1NFMUR5dThLU0EvNnVVbFJ6MTVoSHhhbWhJeEFobVVzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhCZ1JwbmtoWlNPdEcydmt1YnYxVUc4KzJ0WGJkUWp4MlYxejFxYVJPSEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFlZi9xU1VjUHBZWkN5TW8ydlVUdmJHRGxEVWEvcTExUjhLeXkxc1p1bGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOENqMTFrVmh6TTRmU25XLys0ei9DWTlvWFVXK2c1cm1kWlFOZVo4cG5uTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVE9SVW5oZkVWZU1nSEFkU0hUSEFoS3lkSjVxUE84QXFvamNUV3NNR3ZGQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVDUVR2bXpwUExFSVpqdnE5dHVmV3N3aXhMTW02UkZ1VndKZVUxK2ZKQlo5NHc2aXlWazY1VDd2L0FWKzhmL0c3QXNDNFdUT1Q1dG9KTk92dzRVS0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMyLCJhZHZTZWNyZXRLZXkiOiJCRW9vUk9yVkt3OTBScWhBRlFIK3UyZEVPcEh4WUMyL2ZLNXNSTWgzQjdzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijg4MDE3NDU0NTQ1ODZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMkNDQ0E0RUIwNzcwNUI4RjE5MzNFMTEwRkRDQjZERjAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjAwNjQ5OX0seyJrZXkiOnsicmVtb3RlSmlkIjoiODgwMTc0NTQ1NDU4NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJERTNBMkQyMTY3NTYwM0VDMjk5MjVGOUEwODQxNUZFQiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyMDA2NDk5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxMjNMT1RVUyIsIm1lIjp7ImlkIjoiODgwMTc0NTQ1NDU4Njo3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IsSUxbQnxZQgw5/FkMWaxZrjg4QiLCJsaWQiOiIxODgwNDI5MTI1MTAxMzE6N0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ096M3hmMEhFTlArdGNNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjJrMXp5NzY3S3lKMjlpL1JQMURnRU13bzJORXdyWlYxUEoxUlVCMXZNem89IiwiYWNjb3VudFNpZ25hdHVyZSI6IklJUUREdExuRTJ5YURKRXlNQ3BPeVVvRVFhUFJtR2pvZnlKVGVZWnpyRW81cTZOWVlYMlhlc1pBWElpMWt3SVhsSGx2Qmw4ZHd1aHc5b0hOQndzRENBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJnN29rMW5oc0ZIWGdUUTExNnlkak03dVY0dHdTU2ZncVFGbE9CeEJXUzdyWTNRNWE4bjE2UERQRW13ejhYVkRtVGM5RDgzV0NUaDBWUnpIZzltajJBdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijg4MDE3NDU0NTQ1ODY6N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkcE5jOHUrdXlzaWR2WXYwVDlRNEJETUtOalJNSzJWZFR5ZFVWQWRiek02In19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTIwMDY0OTYsImxhc3RQcm9wSGFzaCI6IjFLNGhINCIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRmNHIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ALLAMANO",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "NEURO-MD",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEURO-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/grlqyj.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

