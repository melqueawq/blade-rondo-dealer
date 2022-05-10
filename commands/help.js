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
:crossed_swords: 対戦を行う場合
\`/newgame [対戦したいフォーマット]\`
例えば、MariaとSonyaでBlade Rondo(無印)の対戦を行う場合は
> \`/newgame BladeRondo @Maria @Sonya\`
のように入力してください。

:bread: パンを焼く
\`/bake\`
Bread Rondoで遊んでいる場合、上記コマンドでパンを焼くことができます。
パンの山札は対戦ルールでBread Rondoを指定し直すたびにリセットされます。

:question: このヘルプを表示
\`/help\`

__**ルールの指定方法**__
botの提示する候補を選択してください。
対応フォーマット一覧:
> ・Blade Rondo
> ・Night Theater
> ・Grim Garden
> ・Frost Veil
> ・Lost Dream
> ・Bread Rondo
> ・ブレイドシュトローム(BR, NT混成プレイ)
`;
        await interaction.reply(message); //返答
    },
};