const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data:
    // コマンド設定
    new SlashCommandBuilder()
      .setName('help') 
      .setDescription('ヘルプを表示します。')
      ,
  
    // コマンド実行時処理
  async execute(interaction) {
      let message = `
__**Blade Rondo Dealerの使い方**__
:crossed_swords: 通常プレイを行う場合
\`/newgame normal [対戦したいフォーマット] [プレイヤー1] [プレイヤー2]\`
例えば、MariaとSonyaでBlade Rondo(無印)の対戦を行う場合は
> \`/newgame normal BladeRondo @Maria @Sonya\`
のように入力してください。

:crossed_swords: 混成プレイを行う場合
\`/newgame hybrid [対戦したいフォーマット] [プレイヤー1] [プレイヤー2]\`
例えば、MariaとSonyaでBlade Rondo(無印)とGrim Gardenの混成デッキによる対戦を行う場合は
> \`/newgame hybrid BR/GG混成 @Maria @Sonya\`
のように入力してください。

:bread: パンを焼く
\`/bake\`
Bread Rondoで遊んでいる場合、上記コマンドでパンを焼くことができます。
パンの山札は対戦ルールでBread Rondoを指定し直すたびにリセットされます。

:question: このヘルプを表示
\`/help\`

__**ルールの指定方法**__
botの提示する候補を選択してください。
通常プレイ 対応フォーマット一覧:
> ・Blade Rondo
> ・Night Theater
> ・Grim Garden
> ・Frost Veil
> ・Lost Dream
> ・Bread Rondo

混成プレイ 対応フォーマット一覧:
> ・ブレイドシュトローム(BR, NTの特殊混成デッキ)
> ・Bread Rondoを除く5作品のうち2作品の40種40枚を使用した混成プレイ
`;
        await interaction.reply(message); //返答
    },
};