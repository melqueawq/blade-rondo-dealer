const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data:
    // コマンド設定
    new SlashCommandBuilder()
      .setName('bake') 
      .setDescription('パンを焼きます')
      .addStringOption(option =>
        option.setName('オプション')
          .setDescription('init: /newgameしなくてもパン情報を初期化します。')
          .addChoices(
            { name: 'init', value: 'init' },
          )
      )
      ,
  
    // コマンド実行時処理
    async execute(interaction) {
      const channelId = interaction.channelId;

      // パン情報の初期化
      if (global.breads[channelId] === undefined || interaction.options.getString('オプション') == 'init') {
        global.breads[channelId] = ["パンゴーレム", "ブリオッシュ", "マフィン", "カレーパン", "サンドイッチ", "チョココロネ", "ベーグル", "アンパン"];
        await interaction.reply('パン情報を初期化しました。パンを焼くには`/bake`を実行してください。');
        return;
      }

      if (global.breads[channelId].length == 0) {
        await interaction.reply('焼けるパンがもうありません！初期化するには`/bake init`を実行するか、Bread Rondoで新しいゲームを始めてください。');
        return;
      }

      const rndNo = Math.floor(Math.random() * global.breads[channelId].length);
      let breadName = global.breads[channelId].splice(rndNo, 1)[0];

      await interaction.reply(`:bread:${breadName}が焼けた！`); //返答
    },
};