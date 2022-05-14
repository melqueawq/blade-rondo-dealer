// dotenv
require('dotenv').config();

// log4js
const log4js = require('log4js')
log4js.configure({
  appenders:{
    stdout: { type: 'stdout' },
    file:   { type: 'file', filename: 'app.log'}
  },
  categories:{
    default:{appenders:['stdout', 'file'], level: 'debug'}
  }
})
global.logger = log4js.getLogger();

// fs
const fs = require('fs');

// 必要クラス読み込み
const { Client, Collection, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');

// インスタンス作成
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// コマンド読み込み
client.commands = new Collection(); //新しいインスタンスを作成します

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// ./commands/ 内のデータをclient.commandsに登録
for (const file of commandFiles) {
  const command = require(`./commands/${file}`); 
  // コレクションに新しいアイテムを設定
  client.commands.set(command.data.name, command);
}

// bot起動時の動作
client.once('ready', () => {
	global.logger.info('bot is ready!');
  client.user.setActivity('Blade Rondo');

  // パン情報初期化
  global.breads = {};
});

// コマンドに対する応答
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'errored', ephemeral: true});
  }
});

// .envにトークンが未定義なら終了
if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	global.logger.fatal('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}
client.login(process.env.DISCORD_BOT_TOKEN);