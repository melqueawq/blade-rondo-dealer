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
const logger = log4js.getLogger();

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
	logger.info('bot is ready!');
  client.user.setActivity('Blade Rondo');
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
	logger.fatal('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}
client.login(process.env.DISCORD_BOT_TOKEN);

/*
// パンを焼く
function bakeBread(channel){
  // そのチャンネルでパンが用意されているかチェック
  if(typeof breads[channel.id] === "undefined" || breads[channel.id].length == 0){
    channel.send("パンの山札が空か、Bread Rondoでまだ遊んでいません！")
    .catch(logger.error);
    return;
  }
  
  // パンの名称取得
  let rndNo = Math.floor(Math.random() * breads[channel.id].length);
  let breadName = breads[channel.id].splice(rndNo, 1)[0];

  // 送信
  channel.send(":bread:" + breadName + "が焼けた！").catch(logger.error);
}
*/