-- Run this once in Supabase → SQL Editor → New query → Run.
-- It creates ONE shared table for the whole team. Every signed-in teammate
-- reads and writes the same data, so proposals live in one common list.

create table if not exists public.kv (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now()
);

alter table public.kv enable row level security;

-- Any authenticated (signed-in) user may read/write everything = shared team data.
-- (Anonymous visitors get nothing, because the app requires sign-in.)
drop policy if exists "team can read"   on public.kv;
drop policy if exists "team can insert" on public.kv;
drop policy if exists "team can update" on public.kv;
drop policy if exists "team can delete" on public.kv;

create policy "team can read"   on public.kv for select to authenticated using (true);
create policy "team can insert" on public.kv for insert to authenticated with check (true);
create policy "team can update" on public.kv for update to authenticated using (true) with check (true);
create policy "team can delete" on public.kv for delete to authenticated using (true);
