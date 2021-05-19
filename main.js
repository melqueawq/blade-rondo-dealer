// Response for Uptime Robot
const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Discord bot is active now \n');
}).listen(3000);

// Discord bot implements
const discord = require('discord.js');
const client = new discord.Client();

const cardlist = require("./cardlist.json");

const cardsets = {
  bladeRondo:[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20],
  nightTheater:[21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,36,36,37,37,38,38,39,39,40,40],
  grimGarden:[41,41,42,42,43,43,44,44,45,45,46,46,47,47,48,48,49,49,50,50,51,51,52,52,53,53,54,54,55,55,56,56,57,57,58,58,59,59,60,60],
  frostVeil:[61,61,62,62,63,63,64,64,65,65,66,66,67,67,68,68,69,69,70,70,71,71,72,72,73,73,74,74,75,75,76,76,77,77,78,78,79,79,80,80],
  lostDream:[81,81,82,82,83,83,84,84,85,85,86,86,87,87,88,88,89,89,90,90,91,91,92,92,93,93,94,94,95,95,96,96,97,97,98,98,99,99,100,100]
};

// bot起動時の動作
client.on('ready', message =>
{
  client.user.setPresence({ activity: { name: 'Blade Rondo' }, status: 'online' })
  .catch(console.error);
	console.log('bot is ready!');
});

// メッセージ受信
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
  console.log('reply received!');
  
  if(args.length === 4){
    sendHand(args)
  }else{
    sendHelp(message.channel);       
  }
  
});


if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );

// ヘルプ
function sendHelp(channel){
  let message = `
__**Blade Rondo Dealerの使い方**__
:crossed_swords: 対戦を行う場合
\`@Blade_Rondo_dealer#6661 [ルール] [対戦者1] [対戦者2]\`
例えば、MariaとSonyaでBlade Rondo(無印)の対戦を行う場合は
> \`@Blade_Rondo_dealer#6661 BladeRondo @Maria @Sonya\`
のように入力してください。

:question: このヘルプを表示
\`@Blade_Rondo_dealer#6661\`

__**ルールの指定方法**__
適用したいルールに応じて[ルール]の部分を置き換えてください。
> ・Blade Rondo(無印) -> \` BR \` または \` BladeRondo \`
> ・Night Theater -> \` NT \` または \` NightTheater \`
> ・Grim Garden -> \` GG \` または \` GrimGarden \`
> ・Frost Veil -> \` FV \` または \` FrostVeil \`
> ・Lost Dream -> \` LD \` または \` LostDream \`
`;
  channel.send(message)
  .catch(console.error);
}

// 初期配布カードを送信する
function sendHand(args){
  let rule = args[1];
  let player1 = args[2].match(/\d+/)[0];
  let player2 = args[3].match(/\d+/)[0];
  
  let cardset = [];
  let deck = [];
  
  // カードセット選択
  switch(rule){
    case 'BR':
    case 'BladeRondo':
      cardset = cardsets['bladeRondo'];
      break;
    case 'NT':
    case 'NightTheater':
      cardset = cardsets['nightTheater'];
      break;
    case 'GG':
    case 'GrimGarden':
      cardset = cardsets['grimGarden'];
      break;
    case 'FV':
    case 'FrostVeil':
      cardset = cardsets['frostVeil'];
      break;
    case 'LD':
    case 'LostDream':
      cardset = cardsets['lostDream'];
      break;
    default:
      break;
  }
  
  // カードリストからデッキ取得
  cardset.forEach(number => deck.push(cardlist[number]));
  
  // シャッフル
  for(let i = deck.length - 1; i > 0; i--){
      let r = Math.floor(Math.random() * (i + 1));
      let tmp = deck[i];
      deck[i] = deck[r];
      deck[r] = tmp;
  }
  
  // 15枚ずつ配布
  let p1Hand = deck.splice(0,15).sort((a,b)=>{return a.number < b.number ? -1 : 1});
  let p2Hand = deck.splice(0,15).sort((a,b)=>{return a.number < b.number ? -1 : 1});
  
  // debug
  console.log(p1Hand);
  console.log(p2Hand);
  
  // 送信するテキストを生成
  let p1HandText = "";
  let p2HandText = "";
  p1Hand.forEach(e =>{
    // アイコン, カード番号, カード名, 改行コード
    p1HandText += typeIcon(e.type) + 'No.' + ("000" + e.number).slice(-3) + "  " + e.name + "\n"
  });
  p2Hand.forEach(e =>{
    p2HandText += typeIcon(e.type) + 'No.' + ("000" + e.number).slice(-3) + "  " + e.name + "\n"
  });
  
  // メッセージ送信
  client.users.fetch(player1)
        .then(user => {
          user.send(p1HandText)
              .then(console.log)
              .catch(console.error);
        })
        .catch(console.error);
  
  client.users.fetch(player2)
        .then(user => {
          user.send(p2HandText)
              .then(console.log)
              .catch(console.error);
        })
        .catch(console.error);
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