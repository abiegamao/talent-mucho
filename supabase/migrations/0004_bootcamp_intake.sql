create table if not exists public.bootcamp_intake (
  id                  uuid primary key default gen_random_uuid(),
  email               text unique not null,
  first_name          text not null,
  business_oneliner   text,
  first_focus         text,
  voice_owner         text,
  ai_employee_role    text,
  ai_employee_custom  text,
  dashboard_metrics   text[],
  dashboard_custom    text,
  os                  text,
  timezone            text,
  peak_time           text,
  one_thing           text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create unique index if not exists bootcamp_intake_email_idx on public.bootcamp_intake (lower(email));

alter table public.bootcamp_intake enable row level security;

drop policy if exists "service role only" on public.bootcamp_intake;
create policy "service role only" on public.bootcamp_intake for all using (false);
