# 錄影素材索引

本次準備階段只錄了官方起始 Demo。以下全部是 **baseline**，沒有 skill 改善後成果，也沒有 Codex 生成過程錄影。4 段 WebM 都是無聲捲動素材，搭配 8 張 PNG；完整生成過程請於後續正式測試時另開螢幕錄影。

| 案例 | 尺寸 | 影片 | 首屏 | 全頁 | 紀錄 |
|---|---|---|---|---|---|
| lumina / baseline | 1440×900 | [WebM](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-12-56-985Z-lumina-baseline-desktop-8bc5be8d/clip.webm) | [PNG](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-12-56-985Z-lumina-baseline-desktop-8bc5be8d/viewport.png) | [PNG](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-12-56-985Z-lumina-baseline-desktop-8bc5be8d/full-page.png) | [metadata](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-12-56-985Z-lumina-baseline-desktop-8bc5be8d/capture.json) |
| lumina-classic / baseline | 1440×900 | [WebM](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-12-56-985Z-lumina-classic-baseline-desktop-302d705d/clip.webm) | [PNG](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-12-56-985Z-lumina-classic-baseline-desktop-302d705d/viewport.png) | [PNG](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-12-56-985Z-lumina-classic-baseline-desktop-302d705d/full-page.png) | [metadata](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-12-56-985Z-lumina-classic-baseline-desktop-302d705d/capture.json) |
| lumina-classic / baseline | 390×844 | [WebM](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-13-55-535Z-lumina-classic-baseline-mobile-e189cf7a/clip.webm) | [PNG](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-13-55-535Z-lumina-classic-baseline-mobile-e189cf7a/viewport.png) | [PNG](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-13-55-535Z-lumina-classic-baseline-mobile-e189cf7a/full-page.png) | [metadata](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-13-55-535Z-lumina-classic-baseline-mobile-e189cf7a/capture.json) |
| lumina / baseline | 390×844 | [WebM](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-13-55-555Z-lumina-baseline-mobile-5d785c16/clip.webm) | [PNG](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-13-55-555Z-lumina-baseline-mobile-5d785c16/viewport.png) | [PNG](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-13-55-555Z-lumina-baseline-mobile-5d785c16/full-page.png) | [metadata](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/captures/2026-10-31T15-13-55-555Z-lumina-baseline-mobile-5d785c16/capture.json) |

影片開頭可能包含載入幀，裁切可參考 capture.json 的 contentStartMs。影片使用 reduced-motion；不能用來評價完整動畫。手機橫向溢出是官方原始頁既有問題，保留作為後續 adapt 的測試素材。

## 快照（不是執行紀錄）

| 案例 | 階段 | Prompt | 原始碼與 metadata |
|---|---|---|---|
| lumina | imported | [精確 Prompt](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/runs/2026-10-31T15-12-13-626Z-lumina-imported-867d7afc/prompt.txt) | [run.json](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/runs/2026-10-31T15-12-13-626Z-lumina-imported-867d7afc/run.json) |
| lumina-classic | imported | [精確 Prompt](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/runs/2026-10-31T15-12-14-187Z-lumina-classic-imported-3de9b2c7/prompt.txt) | [run.json](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/runs/2026-10-31T15-12-14-187Z-lumina-classic-imported-3de9b2c7/run.json) |
| festival | planned | [精確 Prompt](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/runs/2026-10-31T15-15-44-891Z-festival-planned-d9fd70d2/prompt.txt) | [run.json](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/runs/2026-10-31T15-15-44-891Z-festival-planned-d9fd70d2/run.json) |
| wallet | planned | [精確 Prompt](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/runs/2026-10-31T15-15-44-941Z-wallet-planned-047017d3/prompt.txt) | [run.json](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/runs/2026-10-31T15-15-44-941Z-wallet-planned-047017d3/run.json) |
| tea | planned | [精確 Prompt](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/runs/2026-10-31T15-15-44-969Z-tea-planned-0100190b/prompt.txt) | [run.json](/Users/tsengmingchun/Documents/LAB/impeccable/recordings/runs/2026-10-31T15-15-44-969Z-tea-planned-0100190b/run.json) |

`imported` 是官方頁匯入；`planned` 是未生成題目的預留起點。模型記為 unknown，沒有虛構測試分數。

所有錄影與快照只保存在本機，recordings/captures 與 recordings/runs 已 gitignore。剪輯前請備份這兩個資料夾。
