# Blade Rondo Dealer
『Blade Rondo』シリーズのリモート対戦用DiscordBot

## 招待する
https://discord.com/api/oauth2/authorize?client_id=829716768661438496&permissions=3072&scope=bot%20applications.commands

上記リンクをクリックしてサーバーに招待して使用してください。

`/help`コマンドを実行してヘルプメッセージを返したらbotが稼働していて利用可能な状態です。

## これは何？
[Domina Games](https://www.dominagames.com/)様から大好評販売中の2人対戦ボードゲームシリーズである
『Blade Rondo』シリーズの対戦をDiscordを通じて行うためのbotです。

『Blade Rondo』シリーズは1つの山札を各プレイヤーに分け合う都合上リモート対戦はそのままでは不可能ですが、
15枚をランダムに配るbotによってオンライン対戦を実現することができます。


## つかいかた
1. botをサーバーに招待する
1. 対戦を行うユーザー2人が同一の『Blade Rondo』シリーズ製品を用意する
1. botをサーバーに招待する
1. コマンドをテキストチャンネルに書き込む
1. 各ユーザーのDMに初期手札が送信される

## 対戦の始め方
```
/newgame [ルール] [ユーザー1] [ユーザー2]
```

入力例：マリアとソーニャでBlade Rondo(無印)の対戦を行う場合  
```
/newgame [Blade Rondo] [@Maria] [@Sonya]
```  

スラッシュコマンド入力時にルールやユーザー名は候補表示が行われるため、それを利用して選択してください。

### ルール
対戦を行うルールを指定できます。

対応フォーマット: 
- Blade Rondo(無印)  
- Night Theater  
- Grim Garden  
- Frost Veil  
- Lost Dream  
- Bread Rondo  
- ブレイドシュトローム(無印、Night Theater混成ルール)  

入力候補による補完を利用して入力してください。
    
### ユーザー名1、ユーザー名2
対戦を行うユーザーを上記の入力例のように指定してください。
入力候補による補完を利用して入力することをおすすめします。

## パンを焼く
```
/bake
```
対戦ルールでBread Rondoを指定した場合、上記コマンドでランダムなパンを取得することができます。
```
:bread:ブリオッシュが焼けた！
```
パンの山札は対戦ルールでBread Rondoを指定し直すたびにリセットされます。
また、`/bake init`を実行することでも山札を初期化できます。

パンの山札の内容はチャンネルごとに保持されます。同じチャンネル内で複数のゲームで同時にパンを焼くことはできません。

## 問い合わせ
ルール追加や導入、機能などに関する相談は[@tolt_santyoku](https://twitter.com/tolt_santyoku)にお問い合わせください。