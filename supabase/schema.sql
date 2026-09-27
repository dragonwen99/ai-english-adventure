-- Run once in Supabase SQL Editor. Never expose service_role keys in the browser.
create table if not exists public.vocabulary_lists (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null check (char_length(name) between 1 and 120),
 words jsonb not null default '[]'::jsonb check (jsonb_typeof(words) = 'array'),
 created_at timestamptz not null default now()
);
create index if not exists vocabulary_lists_user_id_idx on public.vocabulary_lists(user_id);
alter table public.vocabulary_lists enable row level security;
revoke all on public.vocabulary_lists from anon;
grant select,insert,update,delete on public.vocabulary_lists to authenticated;
drop policy if exists "Own lists select" on public.vocabulary_lists;
drop policy if exists "Own lists insert" on public.vocabulary_lists;
drop policy if exists "Own lists update" on public.vocabulary_lists;
drop policy if exists "Own lists delete" on public.vocabulary_lists;
create policy "Own lists select" on public.vocabulary_lists for select to authenticated using ((select auth.uid())=user_id);
create policy "Own lists insert" on public.vocabulary_lists for insert to authenticated with check ((select auth.uid())=user_id);
create policy "Own lists update" on public.vocabulary_lists for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "Own lists delete" on public.vocabulary_lists for delete to authenticated using ((select auth.uid())=user_id);
