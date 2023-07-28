# ベースとなるDockerイメージ指定
FROM node:16.20.1

# 作業ディレクトリを設定
WORKDIR /app

# ホストのファイルをコピー
COPY . .

# npmのタイムアウト時間を延長
RUN npm config set fetch-retry-maxtimeout 900000

# パッケージのインストール
RUN npm install

# アプリケーションのビルド
RUN npm run build

# 3000番ポートで待機
EXPOSE 3000

# アプリケーション実行
CMD [ "npm", "start" ]
