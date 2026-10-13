---
agent: agent
---

## 目的

- `${workspaceFolder}/docs/spec.md` の要求を「最小限で確実に動く形」で実装し、必要なドキュメントを追加する。
- 実装はワークスペース配下で完結させる（コード・README・ブランチを含む）。

## 前提（必ず最初に行う）

1. 最初に `${workspaceFolder}/docs/spec.md` を全文読むこと。
2. 仕様に曖昧点がある場合は、最大2件まで `${workspaceFolder}/implement-questions.md` に質問を書いて一旦停止する（質問フォーマットは下記参照）。

## 最終出力物（必須）

出力はワークスペースのルート配下に行うこと。

- 実装コード（既存の `index.html` / `main.js` を最小変更。必要なら `styles.css` や `src/` を追加）
- 更新した `README.md`（実行手順と簡単な仕様対応表を含む）
- 変更を含む新しいブランチ（ブランチ名フォーマット例は下記）

## 受け入れ基準（短縮）

- `${workspaceFolder}/docs/spec.md` の主要機能が動作すること（README の手順で検証可能）
- README に実行手順が記載されていること

## 最小実装フロー（Copilot が実行しやすい手順）

1. 仕様確認
	- `docs/spec.md` を読み、重要箇所を箇条でメモ（内部メモ）
2. 不明点があれば `implement-questions.md` に最大2件まで質問を記載して停止（必須）
3. 新ブランチ作成
	- 例: `feat/implement-spec-YYYYMMDD`（YYYYMMDD を当日の日付に置換）
4. 実装（最小変更）
	- 既存ファイルをなるべく再利用。`index.html` / `main.js` を最小限で変更
	- UI がない場合は最小の UI（`index.html`）とロジック（`main.js`）を追加
	- スタイルは必要最低限の `styles.css` を追加
5. ドキュメント更新
	- `README.md` にインストール／実行手順、簡潔な仕様対応表を追加
6. コミット分割
	- UI 変更、ロジック変更、ドキュメント変更をそれぞれ別コミットにする
7. （任意）PR 作成
	- タイトル例: `feat: implement minimal spec — YYYY-MM-DD`

## 停止条件（必ず停止するケース）

- `implement-questions.md` に質問を書いたとき（その場で作業を中断）
- 外部依存やビルドの致命的なブロックを検出したとき（実行不能なら停止して報告）

## Acceptance checklist（マージ前セルフチェック）

- [ ] `docs/spec.md` の主要機能を簡単に検証する手順を `README.md` に書いたか
- [ ] `implement-questions.md` が存在する場合、質問は2件以下でフォーマット通りか
- [ ] コミットを UI/ロジック/ドキュメントで分割したか
- [ ] 新ブランチで作業したか

## コミットメッセージの推奨ルール（簡潔）

- feat: implement minimal spec — UI
- feat: implement minimal spec — logic
- docs: update README for running spec implementation

## 実装上のヒント（Copilot に指示しやすい形）

- まずは「画面にボタンと結果表示だけ」を作る。複雑な状態管理は不要。
- 出力はブラウザで動くこと（`index.html` を開くだけで確認できること）。
- 追加ファイルは最小に留める（例: `main.js`, `styles.css`）。
- 仕様のあいまいな点は必ず `implement-questions.md` に記載して停止する。

## 出力例（README の短い追加セクション例）

- 動作確認:
  1. `index.html` をブラウザで開く
  2. ボタンを押す
  3. 結果が表示される
- 依存: なし（ブラウザで動作）
