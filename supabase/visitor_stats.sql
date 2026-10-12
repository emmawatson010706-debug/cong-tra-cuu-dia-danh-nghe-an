-- Bảng lưu trữ thống kê số người truy cập (tùy chọn trong Supabase)
-- Nếu bạn muốn đồng bộ số liệu trên Database Supabase, hãy chạy đoạn SQL này trong SQL Editor của Supabase.

create table if not exists public.site_counters (
  id text primary key,
  total_visits bigint default 142580,
  today_visits integer default 850,
  last_updated timestamptz default now()
);

-- Bật RLS và cấp quyền đọc/ghi cho người dùng công khai (anon)
alter table public.site_counters enable row level security;

create policy "Cho phép mọi người đọc thống kê"
  on public.site_counters
  for select
  using (true);

create policy "Cho phép cập nhật lượt truy cập"
  on public.site_counters
  for update
  using (true);

-- Khởi tạo bản ghi mặc định nếu chưa có
insert into public.site_counters (id, total_visits, today_visits)
values ('main', 142580, 850)
on conflict (id) do nothing;
