# Cổng tra cứu địa danh xã phường Nghệ An

Dự án mới của NATA: **CỔNG TRA CỨU ĐỊA DANH XÃ PHƯỜNG NGHỆ AN**.

## Thông tin dự án

- Đơn vị xây dựng & phát triển: NATA
- Admin: `tinnhanhonline247@gmail.com`
- Hotline: `0914 58 75 75`
- Mục tiêu: tra cứu 130 xã/phường Nghệ An sau sắp xếp hành chính năm 2025, gồm bản đồ toàn tỉnh, trang con từng địa danh, nguồn tham khảo và trang quản trị nội dung.

## Công nghệ

- React + Vite
- Leaflet bản đồ 2D / 3D vệ tinh / Quy hoạch tham khảo
- Supabase Auth + Database + Storage
- Vercel deploy
- GitHub quản lý mã nguồn

## Chạy trên máy

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy Vercel

1. Tạo repo GitHub mới, ví dụ `cong-tra-cuu-dia-danh-nghe-an`
2. Push code lên GitHub
3. Vào Vercel → Import Git Repository
4. Framework: Vite
5. Build command: `npm run build`
6. Output directory: `dist`

## Supabase

1. Tạo Supabase project mới
2. Vào SQL Editor chạy:
   - `supabase/schema.sql`
   - `supabase/seed_places.sql`
3. Tạo tài khoản Auth cho admin:
   - Email: `tinnhanhonline247@gmail.com`
4. Copy `.env.example` thành `.env.local` và điền:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Trang chính

- `/` Trang chủ
- `/dia-danh/:slug` Trang con từng xã/phường
- `/admin-login` Đăng nhập admin
- `/admin` Quản trị bài viết

## Ghi chú nội dung

Các bài giới thiệu ban đầu được viết ngắn gọn, không nêu dự án cụ thể, không đưa thông tin nội bộ. Admin sẽ tiếp tục mở website chính thức từng xã/phường `.nghean.gov.vn` để kiểm chứng, biên tập và xuất bản.
