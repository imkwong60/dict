# 倉頡字典 PWA

手機優先、完全離線的倉頡五代拆碼工具。無 CDN、無外部請求。

## 部署（一次性準備）
1. 在有網絡的電腦執行 `./fetch-dict.sh`（或手動下載
   https://raw.githubusercontent.com/Jackchows/Cangjie5/master/Cangjie5_special.txt
   並改名為 `dict.txt`）。
2. 將以下檔案放在同一目錄並部署（HTTPS，如 GitHub Pages）：
   `index.html` `manifest.json` `sw.js` `icon.svg` `dict.txt`

## 離線機制
- Service Worker 安裝時預先快取全部檔案（含 dict.txt），之後同源請求一律「快取優先」，斷網也能開啟。
- 字庫解析後建立 IndexedDB 索引，下次啟動直接讀取。
- 程式不會連接任何外部網絡。
- 備援：若找不到 dict.txt，可在「資料」→「匯入字庫檔」手動選擇 dict.txt，匯入後同樣保存在本機。

## 更新字庫
替換 `dict.txt`，並把 `sw.js` 的 `CACHE` 版本號加一（如 v4）；必要時把 `index.html` 的 `DICT_VER` 加一，使本機索引重建。

## 首次安裝
首次必須在有網絡下用瀏覽器開啟一次（讓 Service Worker 完成快取，iOS 建議再「加入主畫面」）。之後可完全斷網使用。
