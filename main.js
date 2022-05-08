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

// カードリスト、カードセット読み込み
const cardlist = require("./cardlist.json");
const cardsets = require("./cardsets.json");

// パンオブジェクト初期化
var breads = {};

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

// メッセージ受信
/*
client.on('message', async message =>
{
  // 非botなら返信する
  if (message.author.id === client.user.id) {
    return;
  }
  
  // 引数を分割
  const args = message.content.split(/\s/);
  
  // 第一引数に自身のIDがなければリプライではないとみなして処理
  if(!args[0].includes(client.user.id.toString())){
    return;
  }
  logger.info('reply received!');
  logger.debug('channel id: ' + message.channel.id + ', message: ' + message.content);

  switch(args.length){
    case 2:
      // パン焼き
      if(args[1] === "bake"){bakeBread(message.channel);}
      break;
    case 4:
      sendHand(message.channel, args);
      break;
      
    default:
      sendHelp(message.channel);   
  }
  
});

*/

// .envにトークンが未定義なら終了
if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	logger.fatal('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}
client.login(process.env.DISCORD_BOT_TOKEN);

// ヘルプ
function sendHelp(channel){
  let message = `
__**Blade Rondo Dealerの使い方**__
:crossed_swords: 対戦を行う場合
\`@Blade_Rondo_dealer [ルール] [対戦者1] [対戦者2]\`
例えば、MariaとSonyaでBlade Rondo(無印)の対戦を行う場合は
> \`@Blade_Rondo_dealer# BladeRondo @Maria @Sonya\`
のように入力してください。

:bread: パンを焼く
\`@Blade_Rondo_dealer bake\`
Bread Rondoで遊んでいる場合、上記コマンドでパンを焼くことができます。
パンの山札は対戦ルールでBread Rondoを指定し直すたびにリセットされます。

:question: このヘルプを表示
\`@Blade_Rondo_dealer\`

__**ルールの指定方法**__
適用したいルールに応じて[ルール]の部分を置き換えてください。(大文字小文字は問いません)
> ・Blade Rondo(無印) -> \` BR \` または \` BladeRondo \`
> ・Night Theater -> \` NT \` または \` NightTheater \`
> ・Grim Garden -> \` GG \` または \` GrimGarden \`
> ・Frost Veil -> \` FV \` または \` FrostVeil \`
> ・Lost Dream -> \` LD \` または \` LostDream \`
> ・Bread Rondo -> \` Bread \` または \` BreadRondo \`
> ・ブレイドシュトローム(BR,NT混成プレイ) -> \` BS \` または \` BladeStrom \`
`;
  channel.send(message)
  .catch(logger.error);
}

// 初期配布カードを送信する
function sendHand(channel, args){
  let rule = args[1];
  let player = [args[2].match(/\d+/)[0], args[3].match(/\d+/)[0]];
  
  let cardset = [];
  let cardsetName = "";
  let deck = [];
  
  // カードセット選択
  switch(rule.toLowerCase()){
    case 'br':
    case 'bladerondo':
      cardset = cardsets['bladeRondo'];
      cardsetName = "Blade Rondo";
      break;
    case 'nt':
    case 'nighttheater':
      cardset = cardsets['nightTheater'];
      cardsetName = "Night Theater";
      break;
    case 'gg':
    case 'grimgarden':
      cardset = cardsets['grimGarden'];
      cardsetName = "Grim Garden";
      break;
    case 'fv':
    case 'frostveil':
      cardset = cardsets['frostVeil'];
      cardsetName = "Frost Veil";
      break;
    case 'ld':
    case 'lostdream':
      cardset = cardsets['lostDream'];
      cardsetName = "Lost Dream";
      break;
    case 'bs':
    case 'bladestrom':
      cardset = cardsets['bladestrom'];
      cardsetName = "ブレイドシュトローム";
      break;
    case 'bread':
    case 'breadrondo':
      cardset = cardsets['breadrondo'];
      cardsetName = "Bread Rondo";
      
      // bakeBread()で使用するパンをチャンネル別に初期化
      breads[channel.id] = cardsets["breads"].slice();    
      break;
    default:
      sendHelp(channel);
      return;
  }
  
  // カードリストからデッキ取得
  cardset.forEach(name => {
    let index = cardlist.findIndex(data => data.name === name);
    deck.push(cardlist[index]);
  });
  
  
  // シャッフル
  for(let i = deck.length - 1; i > 0; i--){
      let r = Math.floor(Math.random() * (i + 1));
      let tmp = deck[i];
      deck[i] = deck[r];
      deck[r] = tmp;
  }
  
  // 2プレイヤー分繰り返す
  for (let i = 0; i < 2; i++){
    // 手札の配布
    let hand = [];
    
    if(cardsetName === "Bread Rondo"){
      // bread rondoは10枚のみ
      hand = deck.splice(0,10).sort((a,b)=>{return a.number < b.number ? -1 : 1});
    }else{
      hand = deck.splice(0,15).sort((a,b)=>{return a.number < b.number ? -1 : 1});
    }
    
    // 送信するテキストを生成
    let message = "対戦ルール：" + cardsetName + "\n";
    hand.forEach(e =>{
      // アイコン, カード番号, カード名, 改行コード
      if(cardsetName === "Bread Rondo"){
        // bread rondoはカード番号なし
        message += typeIcon(e.type) + "  " + e.name + "\n"
      }else{
        message += typeIcon(e.type) + 'No.' + ("000" + e.number).slice(-3) + "  " + e.name + "\n"
      }
      
    });
    
    // メッセージ送信
    client.users.fetch(player[i])
        .then(user => {
          user.send(message)
              .catch(logger.error);
        })
        .catch(logger.error);
  }
}

// アイコン取得
function typeIcon(type){
  switch(type){
    case "physical":
      return ":crossed_swords:";
    case "magical":
      return ":mage:";
    case "support":
      return ":pill:";
    case "composite":
      return ":tools:";
    case "response":
      return ":mouse_trap:";
    default:
      return "";
  }
}

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