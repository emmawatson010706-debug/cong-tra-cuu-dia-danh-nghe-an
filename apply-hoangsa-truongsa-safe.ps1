# Bản vá an toàn: chỉ thêm nhãn Hoàng Sa, Trường Sa, Biển Đông lên khối bản đồ hiện có.
# Không sửa HomePage, không sửa Hero, không sửa dữ liệu địa danh, không sửa Supabase.

$ErrorActionPreference = "Stop"

$root = Get-Location
$mapFile = Join-Path $root "src\components\MapVisual.jsx"
$cssFile = Join-Path $root "src\styles\global.css"
$componentDir = Join-Path $root "src\components"
$componentFile = Join-Path $componentDir "SovereigntyLabels.jsx"

if (!(Test-Path $mapFile)) {
  Write-Host "KHONG TIM THAY: src\components\MapVisual.jsx" -ForegroundColor Red
  Write-Host "DUNG LAI DE KHONG PHA WEB. Hay gui anh thu muc src/components cho em." -ForegroundColor Yellow
  exit 1
}
if (!(Test-Path $cssFile)) {
  Write-Host "KHONG TIM THAY: src\styles\global.css" -ForegroundColor Red
  Write-Host "DUNG LAI DE KHONG PHA WEB. Hay gui anh thu muc src/styles cho em." -ForegroundColor Yellow
  exit 1
}

# Backup
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Copy-Item $mapFile "$mapFile.bak-$timestamp"
Copy-Item $cssFile "$cssFile.bak-$timestamp"
Write-Host "Da tao backup:" -ForegroundColor Green
Write-Host "  $mapFile.bak-$timestamp"
Write-Host "  $cssFile.bak-$timestamp"

# Tao component moi
$componentContent = @'
import React from 'react';

/**
 * Overlay nhãn chủ quyền lên khu vực Biển Đông trên bản đồ.
 * Component này chỉ thêm chữ hiển thị, không thay đổi tile map, dữ liệu ranh giới,
 * routing, tìm kiếm, Supabase hay các chức năng khác của website.
 */
export function SovereigntyLabels() {
  return (
    <div className="sovereignty-labels" aria-hidden="true">
      <div className="sovereignty-label sovereignty-label--hoang-sa">
        <span>quần đảo</span>
        <strong>Hoàng Sa</strong>
      </div>
      <div className="sovereignty-label sovereignty-label--truong-sa">
        <span>quần đảo</span>
        <strong>Trường Sa</strong>
      </div>
      <div className="sovereignty-sea-label">BIỂN ĐÔNG</div>
    </div>
  );
}
'@
Set-Content -Path $componentFile -Value $componentContent -Encoding UTF8
Write-Host "Da tao: src\components\SovereigntyLabels.jsx" -ForegroundColor Green

# Sua MapVisual.jsx cuc nho
$map = Get-Content $mapFile -Raw

if ($map -notmatch "SovereigntyLabels") {
  # Them import sau dong import React dau tien hoac sau cac import hien co
  $map = $map -replace "(import React[^;]*;\s*)", "`$1`r`nimport { SovereigntyLabels } from './SovereigntyLabels.jsx';`r`n"
}

if ($map -notmatch "<SovereigntyLabels") {
  if ($map -match '<div className="map-grid"></div>') {
    $map = $map -replace '<div className="map-grid"></div>', '<div className="map-grid"></div>`r`n        <SovereigntyLabels />'
  } elseif ($map -match '<div className=\{`map-stage') {
    Write-Host "Tim thay map-stage nhung khong tim thay map-grid. Dung lai de tranh chen sai vi tri." -ForegroundColor Red
    Write-Host "Backup da duoc tao, chua ghi MapVisual." -ForegroundColor Yellow
    exit 1
  } else {
    Write-Host "Khong tim thay vi tri an toan de chen nhan trong MapVisual." -ForegroundColor Red
    Write-Host "Backup da duoc tao, chua ghi MapVisual." -ForegroundColor Yellow
    exit 1
  }
}
Set-Content -Path $mapFile -Value $map -Encoding UTF8
Write-Host "Da chen <SovereigntyLabels /> vao MapVisual.jsx" -ForegroundColor Green

# Chen CSS vao cuoi global.css, khong doi CSS cu
$css = Get-Content $cssFile -Raw
if ($css -notmatch "HOANG-SA-TRUONG-SA-SAFE-PATCH") {
$patchCss = @'

/* HOANG-SA-TRUONG-SA-SAFE-PATCH
   Chỉ thêm nhãn hiển thị trên bản đồ; không thay đổi bản đồ nền, dữ liệu, chức năng. */
.map-stage {
  position: relative;
}

.sovereignty-labels {
  position: absolute;
  inset: 0;
  z-index: 8;
  pointer-events: none;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.sovereignty-label,
.sovereignty-sea-label {
  position: absolute;
  text-align: center;
  font-weight: 900;
  line-height: 1.12;
  text-shadow:
    0 2px 0 rgba(255,255,255,.95),
    0 -1px 0 rgba(255,255,255,.95),
    1px 0 0 rgba(255,255,255,.95),
    -1px 0 0 rgba(255,255,255,.95),
    0 4px 10px rgba(0,0,0,.18);
  user-select: none;
}

.sovereignty-label {
  color: #d61f1f;
  letter-spacing: .01em;
  min-width: 108px;
  padding: 5px 7px;
  border-radius: 10px;
  background: rgba(255,255,255,.18);
}

.sovereignty-label span,
.sovereignty-label strong {
  display: block;
}

.sovereignty-label span {
  font-size: clamp(10px, 2.2vw, 13px);
  text-transform: lowercase;
}

.sovereignty-label strong {
  font-size: clamp(13px, 3vw, 18px);
}

.sovereignty-label--hoang-sa {
  right: 9%;
  top: 23%;
}

.sovereignty-label--truong-sa {
  right: 11%;
  top: 62%;
}

.sovereignty-sea-label {
  right: 30%;
  top: 48%;
  color: #0d6fb8;
  font-size: clamp(14px, 3.2vw, 22px);
  letter-spacing: .08em;
}

.map-card--fullscreen .sovereignty-label--hoang-sa {
  right: 15%;
  top: 21%;
}

.map-card--fullscreen .sovereignty-label--truong-sa {
  right: 17%;
  top: 62%;
}

.map-card--fullscreen .sovereignty-sea-label {
  right: 31%;
  top: 47%;
}

@media (max-width: 800px) {
  .sovereignty-label {
    min-width: 76px;
    padding: 4px 5px;
  }
  .sovereignty-label--hoang-sa {
    right: 5%;
    top: 19%;
  }
  .sovereignty-label--truong-sa {
    right: 6%;
    top: 64%;
  }
  .sovereignty-sea-label {
    right: 20%;
    top: 47%;
  }
}
'@
  Add-Content -Path $cssFile -Value $patchCss -Encoding UTF8
  Write-Host "Da them CSS nhan Hoang Sa / Truong Sa vao global.css" -ForegroundColor Green
} else {
  Write-Host "CSS patch da ton tai, khong them lai." -ForegroundColor Yellow
}

Write-Host "HOAN TAT BAN VA AN TOAN." -ForegroundColor Green
Write-Host "Hay chay: npm run dev" -ForegroundColor Cyan
Write-Host "Neu ok thi chay tiep: npm run build" -ForegroundColor Cyan
