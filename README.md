# メモアプリ

## ローカル環境構築
```
$ git clone git@github.com:ckym02/spa-react-memo-app.git
$ cd spa-react-memo-app
$ npm install
$ npm start
```

## そのほか
- ディレクトリ構成について
  - 参考にした記事
    https://zenn.dev/sakito/articles/af87061a5016e6
    https://hello.shelfy.co.jp/76c13c6e85564653b335ec954d17da09
  ```
  |--src
  | |--App.test.js
  | |--features # 機能に依存するComponentや関数など
  | | |--memo # メモ機能に依存するComponentや関数など
  | | | |--components
  | | | | |--memoForm.js
  | | | |--functions
  | | | | |--memoOperations.js
  | | | |--index.js # componentsを組み合わせる
  | | | |--memo.css
  | |--functions # 機能に依存しない関数
  | | |--localStorage.js
  | |--index.css
  | |--index.js # featuresにある機能を組み合わせる
  ```
