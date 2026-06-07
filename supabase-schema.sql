-- Supabase Database Schema SQL Migrations
-- Copy and run this inside the SQL Editor of your Supabase dashboard.

-- 1. Create Profiles Table (extends Auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  company text,
  email text not null,
  phone text,
  address text,
  country text,
  state text,
  postal_code text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Profiles
alter table public.profiles enable row level security;

create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Trigger to automatically create a profile row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, company)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', 'New Client'),
    new.email,
    new.raw_user_meta_data->>'company'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Create Settings Table
create table public.settings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  payment_reminders boolean default false not null,
  late_fees boolean default false not null,
  currency text default 'USD' not null,
  invoice_attachments boolean default false not null,
  theme text default 'light' not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Settings
alter table public.settings enable row level security;

create policy "Users can view their own settings" on public.settings
  for select using (auth.uid() = user_id);

create policy "Users can update their own settings" on public.settings
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Trigger to create default settings for new profiles
create or replace function public.handle_new_profile_settings()
returns trigger as $$
begin
  insert into public.settings (user_id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_profile_settings();


-- 3. Create Orders Table
create table public.orders (
  id text primary key,
  client_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  type text not null,
  status text default 'submitted' not null,
  priority text default 'normal' not null,
  word_count integer not null,
  price numeric(10, 2) not null,
  deadline date not null,
  brief text not null,
  keywords text[] default '{}'::text[] not null,
  feedback text,
  rating integer default 0 not null,
  delivered_content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Orders
alter table public.orders enable row level security;

create policy "Clients can view their own orders" on public.orders
  for select using (auth.uid() = client_id);

create policy "Clients can insert their own orders" on public.orders
  for insert with check (auth.uid() = client_id);

create policy "Clients can update their own orders" on public.orders
  for update using (auth.uid() = client_id) with check (auth.uid() = client_id);
