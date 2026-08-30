const mineflayer = require('mineflayer');
const http = require('http');

// Create a dummy web server so Render doesn't shut the bot down
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is awake!\n');
});
server.listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'CGS_SMP.aternos.me', // <-- CHANGE THIS TO YOUR ATERNOS IP
        port: 25565,
        username: 'AFK_Bot',
        version: false
    });

    bot.on('spawn', () => {
        console.log('Bot successfully joined the server.');
    });

    bot.on('end', () => {
        console.log('Bot disconnected. Reconnecting in 15 seconds...');
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        console.log('Error: ', err);
    });
}

createBot();
