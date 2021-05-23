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

## コマンドと引数
```
@Blade_Rondo_Dealer [作品名] [ユーザー1] [ユーザー2]
```

入力例：マリアとソーニャでBlade Rondo(無印)の対戦を行う場合  
```
@Blade_Rondo_Dealer BladeRondo @Maria @Sonya
```  


### 作品名
対戦を行う作品名を指定できます。
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
  
大文字小文字は問いませんが、作品名全体を入力する際は単語間に空白を入れないようご注意ください。
    
### ユーザー名1、ユーザー名2
対戦を行うユーザーを上記の入力例のように指定してください。

