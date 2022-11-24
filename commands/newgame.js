const { SlashCommandBuilder } = require('@discordjs/builders');

const cardList = require("../data/cardlist.json");
const cardSets = require("../data/cardsets.json");
const stellaMonolith = require("../data/stellaMonolith.json")

module.exports = {
  data:
    // コマンド設定
    new SlashCommandBuilder()
      .setName('newgame') 
      .setDescription('Blade Rondoの新しいゲームを作成します。')
      .addSubcommand(subcommand =>
        subcommand
          .setName('normal')
          .setDescription('Blade Rondo通常プレイの新しいゲームを作成します。')
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
          ))
      
      .addSubcommand(subcommand =>
        subcommand
          .setName('hybrid')
          .setDescription('Blade Rondo混成プレイの新しいゲームを作成します。')
          .addStringOption(option =>
            option.setName('フォーマット')
              .setDescription('利用するフォーマットを指定してください。')
              .setRequired(true)
              .addChoices(
                { name: 'ブレイドシュトローム', value: 'bladeStrom' },
                { name: 'BR/NT混成', value: 'br_nt' },
                { name: 'BR/GG混成', value: 'br_gg' },
                { name: 'BR/FV混成', value: 'br_fv' },
                { name: 'BR/LD混成', value: 'br_ld' },
                { name: 'NT/GG混成', value: 'nt_gg' },
                { name: 'NT/FV混成', value: 'nt_fv' },
                { name: 'NT/LD混成', value: 'nt_ld' },
                { name: 'GG/FV混成', value: 'gg_fv' },
                { name: 'GG/LD混成', value: 'gg_ld' },
                { name: 'FV/LD混成', value: 'fv_ld' },
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
        ))
      .addSubcommand(subcommand =>
        subcommand
          .setName('stellamonolith')
          .setDescription('Stella Monolithの新しいゲームを作成します。')
          .addUserOption(option =>
            option.setName('プレイヤー1')
              .setDescription('対戦する1人目のユーザーを指定。')
              .setRequired(true)
          )
          .addUserOption(option =>
            option.setName('プレイヤー2')
              .setDescription('対戦する2人目のユーザーを指定。')
              .setRequired(true)
          )),
  
  
    // コマンド実行時処理
    async execute(interaction) {
      // コマンド詳細表示
      global.logger.info(`${interaction.channelId} : /newgame [${interaction.options.getSubcommand()}] [${interaction.options.getString('フォーマット')}] [${interaction.options.getUser('プレイヤー1').tag}] [${interaction.options.getUser('プレイヤー2').tag}]`);
      
      try {
        interaction.options.getSubcommand()
      } catch (error) {
        await interaction.reply(`
エラー: サブコマンドが指定されていません。
/newgameの後にサブコマンドを指定して実行してください。詳細については/helpをご参照ください。
            `);
        global.logger.error(error);
        return;
      }


      // 初手送信
      const hands = createHands(interaction);
      try {
        await Promise.all(hands.map(async hand => await hand.player.send(hand.message)))
          .catch(async e => {
            await interaction.reply(`
エラー: 指定されたプレイヤーへのDM送信が行えませんでした。
DMが拒否設定になっているか、無効なユーザーが指定されている可能性があります。
            `);
            throw e;
          });
      } catch (error) {
        global.logger.error(error);
        return;
      }

      // 先攻プレイヤー決定
      const firstPlayer = Math.floor(Math.random() * 2) + 1;
      let message = `
初期手札を配布しました。
${interaction.options.getUser(`プレイヤー${firstPlayer}`)}さんが先攻後攻を決定してください。
      `;

      if (interaction.options.getString('フォーマット') === 'breadRondo') {
        message += 'パン情報を初期化しました。パンを焼くには`/bake`を実行してください。';
      }

      await interaction.reply(message); //返答
    },
};

function createHands(interaction) {
  const format = interaction.options.getString('フォーマット');
  const players = [interaction.options.getUser('プレイヤー1'), interaction.options.getUser('プレイヤー2')];
  let deck = [];
  let return_array = [];

  let cardSet;
  
  // カードリストから山札情報を取得
  if (interaction.options.getSubcommand() == "stellamonolith") {
    // stella Monolithは別処理
    deck = deck.concat(stellaMonolith["cardList"]);
    cardSet = stellaMonolith["rule"];
  } else {
    cardSet = cardSets[format];
    cardSet.cards.forEach(name => {
      let index = cardList.findIndex(data => data.name === name);
      deck.push(cardList[index]);
    });
  }


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
      // パン情報を初期化する
      global.breads[interaction.channelId] = ["パンゴーレム", "ブリオッシュ", "マフィン", "カレーパン", "サンドイッチ", "チョココロネ", "ベーグル", "アンパン"];
    }
    
    hand = deck.splice(0, cardSet.hand).sort((a,b)=>{return a.number < b.number ? -1 : 1});
    
    // 送信するテキストを生成
    let message = "対戦ルール：" + cardSet.name + "\n";
    hand.forEach(e => {
      // アイコン, カード番号, カード名, 改行コード
      if(cardSet.name === "Bread Rondo" || cardSet.name === "Stella Monolith"){
        // bread rondoはカード番号なし
        message += typeIcon(e.type) + "  " + e.name + "\n"
      }else{
        message += typeIcon(e.type) + 'No.' + ("000" + e.number).slice(-3) + "  " + e.name + "\n"
      }
      
    });
    

    return_array.push({ 'player': players[i], 'message': message });
  }

  return return_array;
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