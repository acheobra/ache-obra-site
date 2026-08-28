create type public.app_role as enum ('admin','user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users can read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.handle_new_user_role()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'user');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_role
after insert on auth.users
for each row execute function public.handle_new_user_role();

create table public.site_content (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon;
grant select on public.site_content to authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "Anyone can read site content" on public.site_content for select to anon, authenticated using (true);
create policy "Admins can insert site content" on public.site_content for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "Admins can update site content" on public.site_content for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "Admins can delete site content" on public.site_content for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create trigger site_content_updated_at before update on public.site_content
for each row execute function public.set_updated_at();

insert into public.site_content (key, value) values
  ('hero_title', 'Conecte sua obra aos melhores profissionais da sua região.'),
  ('hero_subtitle', 'Publique seu serviço gratuitamente ou encontre pedreiros, arquitetos e engenheiros verificados em poucos cliques.'),
  ('hero_cta_primary', 'Baixar o App Grátis'),
  ('hero_cta_secondary', 'Falar com o suporte'),
  ('clients_title', 'Encontre quem faz com segurança.'),
  ('pros_title', 'Conquiste mais clientes todos os dias.'),
  ('trust_title', 'Selo de Verificação Ache Obra'),
  ('footer_title', 'Sua obra merece a escolha certa. Baixe o Ache Obra agora mesmo!'),
  ('contact_title', 'Fale com o nosso atendimento'),
  ('contact_subtitle', 'Estamos prontos para ajudar clientes e profissionais.'),
  ('whatsapp_number', '(42) 99826-6021'),
  ('whatsapp_link', 'https://wa.me/5542998266021'),
  ('support_email', 'suporte@acheobra.com.br'),
  ('site_url', 'acheobra.com.br');