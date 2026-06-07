-- Supabase Database Schema SQL Migrations V3
-- Copy and run this inside the SQL Editor of your Supabase dashboard to add the revisions table.

create table public.revisions (
  id text primary key,
  order_id text references public.orders(id) on delete cascade not null,
  notes text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.revisions enable row level security;

-- To secure revisions, we need to ensure the user owns the related order.
-- Since the `revisions` table doesn't have a `client_id`, we join with `orders` table.
create policy "Clients can view their own revisions" on public.revisions
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = revisions.order_id and orders.client_id = auth.uid()
    )
  );

create policy "Clients can insert their own revisions" on public.revisions
  for insert with check (
    exists (
      select 1 from public.orders
      where orders.id = order_id and orders.client_id = auth.uid()
    )
  );

create policy "Clients can update their own revisions" on public.revisions
  for update using (
    exists (
      select 1 from public.orders
      where orders.id = revisions.order_id and orders.client_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.orders
      where orders.id = order_id and orders.client_id = auth.uid()
    )
  );

create policy "Clients can delete their own revisions" on public.revisions
  for delete using (
    exists (
      select 1 from public.orders
      where orders.id = revisions.order_id and orders.client_id = auth.uid()
    )
  );
