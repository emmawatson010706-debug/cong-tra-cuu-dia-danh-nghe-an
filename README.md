# Cổng tra cứu địa danh xã phường Nghệ An - UI v2

Bản này làm lại giao diện public theo hướng sáng, hiện đại, mobile-first, bỏ topbar Hotline/Email, bỏ dòng “Xây dựng & phát triển”, bỏ upload ảnh/tài liệu trong form góp ý.

## Cài đặt

```powershell
npm install --legacy-peer-deps --no-audit --no-fund
npm run dev
```

## Build kiểm tra

```powershell
npm run build
```

Đã test build thành công trong môi trường tạo file.

## Biến môi trường

Tạo file `.env.local` từ `.env.example`:

```env
VITE_SUPABASE_URL=https://ytaipjsxkumltlqbmywk.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key
VITE_ADMIN_EMAIL=sallacompany@gmail.com
```

Lưu ý: `VITE_SUPABASE_URL` không được có `/rest/v1` và không có dấu `/` ở cuối.

## Những file/thư mục không đưa lên GitHub

Đã cấu hình trong `.gitignore`:

- node_modules/
- dist/
- .env
- .env.local
- .env.production
