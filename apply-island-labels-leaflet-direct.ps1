param(
  [string]$ProjectRoot = "."
)

$ErrorActionPreference = "Stop"

$mapPath = Join-Path $ProjectRoot "src\components\MapPanel.jsx"
$cssPath = Join-Path $ProjectRoot "src\styles\global.css"

if (!(Test-Path $mapPath)) {
  throw "Không tìm thấy file: $mapPath. Hãy chạy script ở thư mục gốc dự án."
}
if (!(Test-Path $cssPath)) {
  throw "Không tìm thấy file: $cssPath. Hãy kiểm tra đường dẫn CSS."
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Copy-Item $mapPath "$mapPath.bak-island-labels-$timestamp"
Copy-Item $cssPath "$cssPath.bak-island-labels-$timestamp"

$map = Get-Content $mapPath -Raw -Encoding UTF8

# 1) Thêm ref quản lý marker group nếu chưa có
if ($map -notmatch "islandLabelsLayer") {
  $map = $map -replace "const tileLayer = useRef\(null\);", "const tileLayer = useRef(null);`r`n  const islandLabelsLayer = useRef(null);"
}

# 2) Thêm hàm tạo nhãn nếu chưa có
if ($map -notmatch "createIslandLabelIcon") {
  $helper = @'

const createIslandLabelIcon = (label, type = 'island') =>
  L.divIcon({
    className: `vn-map-label vn-map-label--${type}`,
    html: `<span>${label}</span>`,
    iconSize: type === 'sea' ? [130, 28] : [150, 44],
    iconAnchor: type === 'sea' ? [65, 14] : [75, 22],
  });

const addVietnamSeaLabels = (mapInstance, labelsLayerRef) => {
  if (!mapInstance || labelsLayerRef.current) return;

  const group = L.layerGroup([
    L.marker([16.55, 112.25], {
      icon: createIslandLabelIcon('quần đảo Hoàng Sa'),
      interactive: false,
      keyboard: false,
    }),
    L.marker([9.75, 114.15], {
      icon: createIslandLabelIcon('quần đảo Trường Sa'),
      interactive: false,
      keyboard: false,
    }),
    L.marker([13.2, 112.6], {
      icon: createIslandLabelIcon('BIỂN ĐÔNG', 'sea'),
      interactive: false,
      keyboard: false,
    }),
  ]);

  group.addTo(mapInstance);
  labelsLayerRef.current = group;
};

'@
  $map = $map -replace "const modeTiles = \{", "$helper`r`nconst modeTiles = {"
}

# 3) Gọi hàm sau khi tileLayer đầu tiên addTo(map.current)
if ($map -notmatch "addVietnamSeaLabels\(map\.current, islandLabelsLayer\)") {
  $pattern = "tileLayer\.current = L\.tileLayer\(modeTiles\['2D'\]\.url, \{ attribution: modeTiles\['2D'\]\.attribution, maxZoom: 18 \}\)\.addTo\(map\.current\);"
  if ($map -match $pattern) {
    $map = $map -replace $pattern, "tileLayer.current = L.tileLayer(modeTiles['2D'].url, { attribution: modeTiles['2D'].attribution, maxZoom: 18 }).addTo(map.current);`r`n    addVietnamSeaLabels(map.current, islandLabelsLayer);"
  } else {
    throw "Không tìm thấy dòng tileLayer 2D để chèn nhãn. Hãy gửi ảnh đoạn code MapPanel.jsx cho ChatGPT."
  }
}

Set-Content $mapPath $map -Encoding UTF8

$css = Get-Content $cssPath -Raw -Encoding UTF8
if ($css -notmatch "vn-map-label") {
  $cssAdd = @'

/* Vietnamese sovereignty labels on Leaflet map: Hoàng Sa, Trường Sa, Biển Đông */
.vn-map-label {
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  pointer-events: none !important;
}

.vn-map-label span {
  display: inline-block;
  color: #d21f1f;
  font-weight: 900;
  font-size: 14px;
  line-height: 1.18;
  text-align: center;
  letter-spacing: -0.01em;
  white-space: normal;
  text-shadow:
    0 1px 0 #ffffff,
    1px 0 0 #ffffff,
    0 -1px 0 #ffffff,
    -1px 0 0 #ffffff,
    0 2px 7px rgba(255, 255, 255, 0.95);
}

.vn-map-label--sea span {
  color: #126ac8;
  font-size: 15px;
  letter-spacing: 0.05em;
}

@media (max-width: 520px) {
  .vn-map-label span {
    font-size: 12px;
  }

  .vn-map-label--sea span {
    font-size: 13px;
  }
}

'@
  $css = $css + $cssAdd
  Set-Content $cssPath $css -Encoding UTF8
}

Write-Host "Đã chèn nhãn Hoàng Sa, Trường Sa, Biển Đông vào MapPanel.jsx." -ForegroundColor Green
Write-Host "Đã tạo backup:" -ForegroundColor Yellow
Write-Host " - $mapPath.bak-island-labels-$timestamp"
Write-Host " - $cssPath.bak-island-labels-$timestamp"
Write-Host "Bây giờ chạy: npm run dev, mở local và Ctrl+F5 để kiểm tra." -ForegroundColor Cyan
