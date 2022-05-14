const { SlashCommandBuilder } = require('@discordjs/builders');

const cardList = require("../data/cardlist.json");
const cardSets = require("../data/cardsets.json");

module.exports = {
  data:
    // コマンド設定
    new SlashCommandBuilder()
      .setName('newgame') 
      .setDescription('Blade Rondoの新しいゲームを作成します。')
      .addStringOption(option =>
        option.setName('フォーマット')
          .setDescription('利用するフォーマットを指定してください。')
          .setRequired(true)
          .addChoices(
            { name: 'Blade Rondo', value: 'bladeRondo' },
            { name: 'Night Theater', value: 'nightTheater' },
            { name: 'Grim Garden', value: 'grimGarden' },
            { name: 'Frost Veil', value: 'frostVeil' },
            { name: 'Lost Dream', value: 'lostDream' },
            { name: 'Bread Rondo', value: 'breadRondo' },
            { name: 'ブレイドシュトローム', value: 'bladeStrom' },
          )
      )
      .addUserOption(option =>
        option.setName('プレイヤー1')
          .setDescription('対戦する1人目のユーザーを指定。')
          .setRequired(true)
      )
      .addUserOption(option =>
        option.setName('プレイヤー2')
          .setDescription('対戦する2人目のユーザーを指定。')
          .setRequired(true)
      ),
  
  
    // コマンド実行時処理
    async execute(interaction) {

      sendHands(interaction);

      const firstPlayer = Math.floor(Math.random() * 2) + 1;

      let message = 
`
初期手札を配布しました。
${interaction.options.getUser(`プレイヤー${firstPlayer}`)}さんが先攻後攻を決定してください。
`

      if (interaction.options.getString('フォーマット') === 'breadRondo') {
        message += 'パン情報を初期化しました。パンを焼くには`/bake`を実行してください。';
      }

      global.logger.info(`${interaction.channelId} : ${interaction.options.getString('フォーマット')}, ${interaction.options.getUser('プレイヤー1')}, ${interaction.options.getUser('プレイヤー2')}`);
      await interaction.reply(message); //返答
    },
};

function sendHands(interaction) {
  const format = interaction.options.getString('フォーマット');
  const players = [interaction.options.getUser('プレイヤー1'), interaction.options.getUser('プレイヤー2')];
  let deck = [];

  const cardSet = cardSets[format];

  // カードリストから山札情報を取得
  cardSet.cards.forEach(name => {
    let index = cardList.findIndex(data => data.name === name);
    deck.push(cardList[index]);
  });

  // 山札のシャッフル
  for (let i = deck.length - 1; i > 0; i--){
    let r = Math.floor(Math.random() * (i + 1));
    let tmp = deck[i];
    deck[i] = deck[r];
    deck[r] = tmp;
  }

  // 2プレイヤー分繰り返す
  for (let i = 0; i < 2; i++){
    // 手札の配布
    let hand = [];
    
    if(cardSet.name === "Bread Rondo"){
      // bread rondoは10枚のみ
      hand = deck.splice(0, 10).sort((a, b) => { return a.number < b.number ? -1 : 1 });
      
      // パン情報初期化もする
      global.breads[interaction.channelId] = ["パンゴーレム", "ブリオッシュ", "マフィン", "カレーパン", "サンドイッチ", "チョココロネ", "ベーグル", "アンパン"];

    }else{
      hand = deck.splice(0,15).sort((a,b)=>{return a.number < b.number ? -1 : 1});
    }
    
    // 送信するテキストを生成
    let message = "対戦ルール：" + cardSet.name + "\n";
    hand.forEach(e => {
      // アイコン, カード番号, カード名, 改行コード
      if(cardSet.name === "Bread Rondo"){
        // bread rondoはカード番号なし
        message += typeIcon(e.type) + "  " + e.name + "\n"
      }else{
        message += typeIcon(e.type) + 'No.' + ("000" + e.number).slice(-3) + "  " + e.name + "\n"
      }
      
    });
    
    // テキスト送信
    players[i].send(message);
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