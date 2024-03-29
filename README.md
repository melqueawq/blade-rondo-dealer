# Blade Rondo Dealer
『Blade Rondo』シリーズのリモート対戦用DiscordBot

## 招待する
https://discord.com/api/oauth2/authorize?client_id=829716768661438496&permissions=3072&scope=bot%20applications.commands

上記リンクをクリックしてサーバーに招待して使用してください。

`/help`コマンドを実行してヘルプメッセージを返したらbotが稼働していて利用可能な状態です。

## これは何？
[Domina Games](https://www.dominagames.com/)様から大好評販売中の2人対戦ボードゲームシリーズである
『Blade Rondo』シリーズ及びいくつかのゲームの対戦をDiscordを通じて行うためのbotです。

『Blade Rondo』シリーズは1つの山札を各プレイヤーに分け合う都合上リモート対戦はそのままでは不可能ですが、
15枚をランダムに配るbotによってオンライン対戦を実現することができます。

## 対応ゲーム
リンクはすべて公式サイトに遷移します。

- Blade Rondoシリーズ
  - [Blade Rondo](https://www.dominagames.com/blade-rondo)
  - [Blade Rondo Night Theater](https://www.dominagames.com/nighttheater)
  - [Blade Rondo Grim Garden](https://www.dominagames.com/grimgarden)
  - [Blade Rondo Frost Veil](https://www.dominagames.com/frostveil)
  - [Blade Rondo Lost Dream](https://www.dominagames.com/lostdream)
- [Bread Rondo](https://www.dominagames.com/bread-rondo-sp/)
- [Stella Monolith](https://www.dominagames.com/stellamonolith)
- [DarkOne](https://www.dominagames.com/darkone)

## つかいかた
1. botをサーバーに招待する
1. 対戦を行うユーザー2人が同一の『Blade Rondo』シリーズ製品を用意する
1. botをサーバーに招待する
1. コマンドをテキストチャンネルに書き込む
1. 各ユーザーのDMに初期手札が送信される

## 対戦の始め方
通常プレイと混成プレイでコマンドが異なります。

- 通常プレイの場合
  ```
  /newgame normal [フォーマット] [ユーザー1] [ユーザー2]
  ```
- 混成プレイの場合
  ```
  /newgame hybrid [フォーマット] [ユーザー1] [ユーザー2]
  ```
- Stella Monolith
  ```
  /newgame stellamonolith [ユーザー1] [ユーザー2]
  ```

入力例1：マリアとソーニャでBlade Rondo(無印)の対戦を行う場合  
```
/newgame normal [Blade Rondo] [@Maria] [@Sonya]
```  
入力例2：マリアとソーニャでNight TheaterとFrost Veilの混成デッキによる対戦を行う場合  
```
/newgame hybrid [NT/FV混成] [@Maria] [@Sonya]
```  
スラッシュコマンド入力時にフォーマットやユーザー名は候補表示が行われるため、それを利用して選択してください。

### フォーマット
対戦を行うフォーマットを指定できます。

対応フォーマット: 
- 通常プレイ
  - Blade Rondo(無印)  
  - Night Theater  
  - Grim Garden  
  - Frost Veil  
  - Lost Dream  
  - Bread Rondo  
- 混成プレイ(詳細は[こちら](#混成プレイのカードプールについて))
  - ブレイドシュトローム(公式の無印、Night Theater混成フォーマット)  
  - 2作品全カード混成プレイ
- Stella Monolith王女カード配布
- DarkOne遺物カード配布

フォーマット入力の際は入力候補による補完を利用して入力してください。
    
### ユーザー名1、ユーザー名2
対戦を行うユーザーを上記の入力例のように指定してください。
入力候補による補完を利用して入力することをおすすめします。

## パンを焼く
```
/bake
```
対戦フォーマットでBread Rondoを指定した場合、上記コマンドでランダムなパンを取得することができます。
```
:bread:ブリオッシュが焼けた！
```
パンの山札は対戦フォーマットでBread Rondoを指定し直すたびにリセットされます。
また、`/bake init`を実行することでも山札を初期化できます。

パンの山札の内容はチャンネルごとに保持されます。同じチャンネル内で複数のゲームで同時にパンを焼くことはできません。

## ヘルプ
```
/help
```
Discordチャンネル内にヘルプを表示できます。

## 混成プレイのカードプールについて
現在サポートしている混成プレイのフォーマットは[こちら](#フォーマット)
### ブレイドシュトローム
- Blade Rondo(無印)とNight Theaterを使用した、公式の混成フォーマットです。
- 以下の20種のカードを2枚ずつ使用します。
  - Blade Rondo
      《斬撃剣》《舞踏剣》《闇黒剣》《お気の毒の刃》《意思砕きの鉈》《絶対剣》
      《燐灯るエチュード》《陽光導くカンタータ》
      《月光のルチル》《封厄のアゲート》
  - Night Theater
      《夜想剣》《黒の剣》《牙城崩しの槍》《指揮剣》《逢魔刻の大斧》
      《高揚するカノン》《窓辺立つミュージカル》《切り刻むエキストラ》
      《身代わりのトルマリン》《静寂のクリスタル》
- Night Theaterの説明書にカードプールが記載されています。

### 2作品全カード混成プレイ
- Bread Rondoを除く5作品のうち任意の2作品を使用した40種40枚の混成プレイ
  - BR/NT、BR/GG、BR/FV、BR/LD、NT/GG、NT/FV、NT/LD、GG/FV、GG/LD、FV/LDの10種
  - Bread Rondoはゲーム性が根本から異なるため混ぜられません
- 混成プレイフォーマットの各作品の略称として以下を使用しています。
  - BR: Blade Rondo(無印)
  - NT: Night Theater
  - GG: Grim Garden
  - FV: Frost Veil
  - LD: Lost Dream
- 例として、`BR/NT混成`を選択した場合、Blade Rondo(無印)とNight Theaterの全カードを1枚ずつ使用するデッキを用います。


## 非対応機能
- 残光ルール
  - そのうち導入したさはある
- ドラフトルール、公式のグリムガーデン混成プレイ(BR、GG)
  - お互いにカードをやり取りするものや複数回カード配布の必要があるものは難しいです。
## 問い合わせ
フォーマット追加や導入、機能などに関する相談は[@tolt_santyoku](https://twitter.com/tolt_santyoku)にお問い合わせください。