param(
  [string]$ProjectRoot = "."
)

$ErrorActionPreference = "Stop"

$mapPath = Join-Path $ProjectRoot "src\components\MapPanel.jsx"
if (!(Test-Path $mapPath)) {
  throw "Khong tim thay file: $mapPath. Hay chay script o thu muc goc du an."
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Copy-Item $mapPath "$mapPath.bak-fix-vietnamese-label-font-$timestamp"

$map = Get-Content $mapPath -Raw -Encoding UTF8

# Dung chuoi Unicode escape ASCII de tranh loi ma hoa tieng Viet trong PowerShell/VS Code.
$labelHoangSa = "qu\u1ea7n \u0111\u1ea3o Ho\u00e0ng Sa"
$labelTruongSa = "qu\u1ea7n \u0111\u1ea3o Tr\u01b0\u1eddng Sa"
$labelBienDong = "BI\u1ec2N \u0110\u00d4NG"

# Sua truc tiep cac loi mojibake neu dang co trong file.
$map = $map -replace "qu.*?n.*?Ho.*?ng Sa", $labelHoangSa
$map = $map -replace "qu.*?n.*?Tr.*?ng Sa", $labelTruongSa
$map = $map -replace "BI.*?N.*?NG", $labelBienDong

# Neu file co cac Marker nhan Hoang Sa / Truong Sa / Bien Dong trong createIslandLabelIcon, chot lai cho dung.
$map = [regex]::Replace($map, "createIslandLabelIcon\('([^']*Ho[^']*Sa)'\)", "createIslandLabelIcon('$labelHoangSa')")
$map = [regex]::Replace($map, "createIslandLabelIcon\('([^']*Tr[^']*Sa)'\)", "createIslandLabelIcon('$labelTruongSa')")
$map = [regex]::Replace($map, "createIslandLabelIcon\('([^']*(BI|Bi|bien|Bien|DONG|Dong|NG)[^']*)',\s*'sea'\)", "createIslandLabelIcon('$labelBienDong', 'sea')")

Set-Content $mapPath $map -Encoding UTF8

Write-Host "Da sua loi font/ma hoa tieng Viet cho nhan Hoang Sa - Truong Sa - Bien Dong." -ForegroundColor Green
Write-Host "Da tao backup: $mapPath.bak-fix-vietnamese-label-font-$timestamp" -ForegroundColor Yellow
Write-Host "Chay: npm run dev, mo local va Ctrl+F5 de kiem tra." -ForegroundColor Cyan
