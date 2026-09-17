-- Contact form submissions from the portfolio site.
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 2 and 100),
  email       text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message     text not null check (char_length(message) between 10 and 5000),
  created_at  timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

-- Lock it down: RLS on, and the public roles get INSERT on the three user
-- columns only. No SELECT/UPDATE/DELETE — submissions are write-only from the
-- site and readable only from the dashboard / service role.
alter table public.contact_messages enable row level security;

revoke all on table public.contact_messages from anon, authenticated;
grant insert (name, email, message) on table public.contact_messages to anon;

create policy "Site can submit contact messages"
  on public.contact_messages
  for insert
  to anon
  with check (true);
