提出用チェックリストとローカル起動手順

このファイルは評価者向けのチェックリストと、開発者が提出前に確認するための短い手順をまとめたものです。

---

## 前提

- Node.js と pnpm/npm/yarn のいずれかがインストールされている
- リポジトリのルートで作業している

## 環境変数（ローカル）

本プロジェクトは microCMS を利用しています。ローカルで動かす場合はルートに `.env.local` を作成し、以下を設定してください。

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

ワークフローで microCMS のキーを渡していない場合はダミー値を入れて確認できます（ただし実データは取得できません）。

## すぐ使えるコマンド（zsh）

```bash
# 依存インストール
pnpm install

# 開発サーバ起動
pnpm dev

# ビルド
pnpm build
pnpm start

# Lint
pnpm lint
```

（npm/yarn を使う場合は `pnpm` を `npm`/`yarn` に置き換えてください）

## 評価者向けチェックリスト（必須チェック）

- [ ] ルート `/` にアクセスできる
- [ ] 主要ページが表示される: `/`, `/Profile`, `/blog`, `/contact`
- [ ] Contact フォームの送信が可能（成功・失敗メッセージが出る）
- [ ] レスポンシブ（スマホ）でレイアウトが崩れていない
- [ ] 各ページに `title` と `description` が設定されている
- [ ] OGP が設定されている（トップページに `/ogp.png`）
- [ ] 主要画像に `alt` が付いている
- [ ] キーボードでナビゲーション可能（Tab 操作）
- [ ] Resume のダウンロードができる、または経歴が明記されている

## 開発者向け短期チェック（提出前に必ず）

1. README に提出用チェックリスト（このファイル）を含める
2. Contact のバリデーションを実装（フロント＆サーバー）
3. OGP をトップページに設定（`public/ogp.png` を確認）
4. レスポンシブ確認（主要ページ）
5. `app/layout.tsx` の `metadataBase` を本番ドメインに更新（デプロイ時）

## 備考 / 推奨改善（あると差が出る）

- Twitter Card のメタを追加すると Twitter 表示が改善します（`twitter:card`, `twitter:image`）
- 画像を `next/image` に差し替え、WebP/AVIF を用意すると LCP が改善します
- Contact 送信のスパム対策として honeypot または reCAPTCHA を導入
- ブログやプロジェクトページで動的 OGP（ページタイトルを埋めた画像）を用意

---

何か追加したいチェック項目があれば教えてください。必要ならこの内容を `README.md` に統合します。
