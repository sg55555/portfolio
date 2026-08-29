スクリーンショット置き場。
各カードの <h3 class="card-title"> の直後に <img class="card-shot" src="shots/<name>.webp" alt="..." loading="lazy"> を足して使う。
形式＝1200x750（16:10・上端固定）の WebP q82。PNG で撮ったら Pillow で resize→WebP に変換して置く。
未撮影（本人の手が要る）: hortus / live-translate（app-control はダミー PAT を localStorage 'control.pat' に入れて headless で撮影済）
本人撮影分（kakeibo / smart-mail / task-dashboard / nexus）は 2880x1800 の PNG を Pillow で機微箇所を GaussianBlur(28) してから 1200x750 WebP に（2026-08-29）。
