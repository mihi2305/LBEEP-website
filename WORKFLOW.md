# LBEEP Website 共同編集手順

このフォルダは、GitHubリポジトリ `mihi2305/LBEEP-website` の共同編集用cloneです。
今後の編集は、バックアップとして残している旧フォルダではなく、このフォルダで行います。

## 作業を始める前

PowerShellでこのフォルダへ移動し、GitHub上の最新版を取得します。

```powershell
cd "C:\Users\Programmer\Documents\LBEEP-website-github"
git pull origin main
```

`git pull`でエラーや競合が表示された場合は、そのまま編集を続けず、共同編集者に確認してください。

## 編集時のルール

- HTMLは `index.html` を編集します。
- デザインは `styles.css` を編集します。
- 動きや操作は `script.js` を編集します。
- 画像は必ず `assets/` フォルダ内に置きます。
- `index.html` から参照しているCSS・JavaScript・画像のパスを不用意に変更しません。
- 旧ローカル開発フォルダはバックアップとして残し、通常の編集には使いません。

## 編集後

変更内容を確認してから、GitHubへ反映します。

```powershell
git status
git add .
git commit -m "変更内容"
git push origin main
```

コミットメッセージの例：

```powershell
git commit -m "時間割セクションを更新"
git commit -m "スマホ表示のレイアウトを調整"
git commit -m "学生インタビュー画像を追加"
```

## 公開前の確認

1. `index.html` をブラウザで開きます。
2. 写真、色、レイアウト、スクロール演出を確認します。
3. スマートフォン幅でも表示を確認します。
4. 問題がなければ上記の手順でpushします。

## 禁止事項

- `git push --force` は使用しません。
- GitHub上やローカルのファイルを、確認なく削除しません。
- 旧ローカル開発フォルダへcloneを上書きしません。
