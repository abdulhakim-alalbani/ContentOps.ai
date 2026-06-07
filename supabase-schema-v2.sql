-- Supabase Database Schema SQL Migrations V2
-- Copy and run this inside the SQL Editor of your Supabase dashboard to add the new tables.

-- 1. Fix Profile Insert Policy
create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- 2. Create Messages Table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references auth.users not null,
  sender text not null,
  subject text not null,
  content text,
  time text,
  avatar text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.messages enable row level security;
create policy "Users can view their own messages" on public.messages for select using (auth.uid() = client_id);
create policy "Users can insert their own messages" on public.messages for insert with check (auth.uid() = client_id);
create policy "Users can update their own messages" on public.messages for update using (auth.uid() = client_id) with check (auth.uid() = client_id);
create policy "Users can delete their own messages" on public.messages for delete using (auth.uid() = client_id);

-- 3. Create Notifications Table
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references auth.users not null,
  title text not null,
  message text,
  is_read boolean default false,
  link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;
create policy "Users can view their own notifications" on public.notifications for select using (auth.uid() = client_id);
create policy "Users can insert their own notifications" on public.notifications for insert with check (auth.uid() = client_id);
create policy "Users can update their own notifications" on public.notifications for update using (auth.uid() = client_id) with check (auth.uid() = client_id);
create policy "Users can delete their own notifications" on public.notifications for delete using (auth.uid() = client_id);

-- 4. Create Events Table
create table public.events (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references auth.users not null,
  title text not null,
  date text not null,
  time text,
  type text,
  attendees text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.events enable row level security;
create policy "Users can view their own events" on public.events for select using (auth.uid() = client_id);
create policy "Users can insert their own events" on public.events for insert with check (auth.uid() = client_id);
create policy "Users can update their own events" on public.events for update using (auth.uid() = client_id) with check (auth.uid() = client_id);
create policy "Users can delete their own events" on public.events for delete using (auth.uid() = client_id);

-- 5. Create Projects Table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references auth.users not null,
  name text not null,
  category text,
  status text default 'Active',
  progress int default 0,
  image text,
  members int[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.projects enable row level security;
create policy "Users can view their own projects" on public.projects for select using (auth.uid() = client_id);
create policy "Users can insert their own projects" on public.projects for insert with check (auth.uid() = client_id);
create policy "Users can update their own projects" on public.projects for update using (auth.uid() = client_id) with check (auth.uid() = client_id);
create policy "Users can delete their own projects" on public.projects for delete using (auth.uid() = client_id);
