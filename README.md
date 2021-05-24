# Blade Rondo Dealer
『Blade Rondo』シリーズのリモート対戦用DiscordBot

## これは何？
[Domina Games](https://www.dominagames.com/)様から大好評販売中の2人対戦ボードゲームシリーズである
『Blade Rondo』シリーズの対戦をDiscordを通じて行うためのbotです。

『Blade Rondo』シリーズは1つの山札を各プレイヤーに分け合う都合上リモート対戦はそのままでは不可能ですが、
15枚をランダムに配るbotによってオンライン対戦を実現することができます。


## つかいかた
1. 対戦を行うユーザー2人が同一の『Blade Rondo』シリーズ製品を用意する
1. botをサーバーに招待する
1. コマンドをテキストチャンネルに書き込む
1. 各ユーザーのDMに初期手札が送信される

## 対戦の始め方
```
@Blade_Rondo_Dealer [ルール] [ユーザー1] [ユーザー2]
```

入力例：マリアとソーニャでBlade Rondo(無印)の対戦を行う場合  
```
@Blade_Rondo_Dealer BladeRondo @Maria @Sonya
```  


### ルール名
対戦を行うルール名を指定できます。
- Blade Rondo(無印)  
  `BR` または `BladeRondo`
- Night Theater  
  `NT` または `NightTheater`
- Grim Garden  
  `GG` または `GrimGarden`
- Frost Veil  
  `FV` または `FrostVail`
- Lost Dream  
  `LD` または `LostDream`
- Bread Rondo  
  `Bread` または `BreadRondo`
- ブレイドシュトローム(無印、Night Theater混成ルール)  
  `BS` または `BladeStrom`

  
大文字小文字は問いませんが、単語間に空白を入れないようご注意ください。
    
### ユーザー名1、ユーザー名2
対戦を行うユーザーを上記の入力例のように指定してください。

## パンを焼く
```
@Blade_Rondo_Dealer bake
```
対戦ルールでBread Rondoを指定した場合、上記コマンドでランダムなパンを取得することができます。
```
:bread:ブリオッシュが焼けた！
```
パンの山札は対戦ルールでBread Rondoを指定し直すたびにリセットされます。
パンの山札の内容はチャンネルごとに保持されます。