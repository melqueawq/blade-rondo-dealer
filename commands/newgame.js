const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data:
    // コマンド設定
    new SlashCommandBuilder()
        .setName('newgame') 
        .setDescription('Blade Rondoの新しいゲームを作成します。'),
  
    // コマンド実行時処理
    async execute(interaction) {
        await interaction.reply('Pong!'); //返答
    },
};