# portfolio

個人開発の出荷台帳を1枚にまとめた静的ページ。

- Vanilla HTML / CSS / JavaScript のみ。ビルドもフレームワークもサーバー関数も無し。
- カードの中身は `index.html` に直書き（JS でレンダーしない＝JS 無効でもクローラでも中身が残る）。
- 背景は `main.js` のパーティクルのみ。**面の光（radial などの塗り）を追加しないこと** — カードの `backdrop-filter` が面を取り込んでパネル形に四角く滲む（orbis で2回踏んだ罠）。オーロラは `.hero` の `overflow: hidden` の中に閉じ込めてある。
- `vercel.json` は置かない。`builds` を書くと列挙したファイルしか配信されなくなるため。

## ローカル確認

```
python -m http.server 8765
```

## 更新するとき

数字（コミット数・行数・日数）の出どころは Obsidian `Projects/s1-shipping-ledger.md`。
出荷物が増えたら台帳に1行足してから、このページのカードを足す。
