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
> \`/newgame BladeRondo\`
のように入力してください。

:bread: パンを焼く
\`@Blade_Rondo_dealer bake\`
Bread Rondoで遊んでいる場合、上記コマンドでパンを焼くことができます。
パンの山札は対戦ルールでBread Rondoを指定し直すたびにリセットされます。

:question: このヘルプを表示
\`/help\`

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
        await interaction.reply(message); //返答
    },
};