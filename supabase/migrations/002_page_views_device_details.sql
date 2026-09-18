-- Enrich page_views with device / UA / client-hint columns
alter table public.page_views
  add column if not exists browser_name text,
  add column if not exists browser_version text,
  add column if not exists os_name text,
  add column if not exists os_version text,
  add column if not exists device_type text,
  add column if not exists device_vendor text,
  add column if not exists device_model text,
  add column if not exists engine_name text,
  add column if not exists engine_version text,
  add column if not exists is_bot boolean default false,

  add column if not exists ch_ua text,
  add column if not exists ch_ua_mobile text,
  add column if not exists ch_ua_platform text,
  add column if not exists ch_ua_platform_version text,
  add column if not exists ch_ua_model text,
  add column if not exists ch_ua_arch text,
  add column if not exists ch_ua_bitness text,
  add column if not exists ch_ua_full_version_list text,

  add column if not exists referer text,
  add column if not exists accept_language text,
  add column if not exists accept_encoding text,

  add column if not exists screen_width integer,
  add column if not exists screen_height integer,
  add column if not exists viewport_width integer,
  add column if not exists viewport_height integer,
  add column if not exists device_pixel_ratio numeric,
  add column if not exists timezone text,
  add column if not exists language text,
  add column if not exists languages jsonb,
  add column if not exists platform text,
  add column if not exists hardware_concurrency integer,
  add column if not exists device_memory numeric,
  add column if not exists connection_type text,
  add column if not exists connection_downlink numeric,
  add column if not exists connection_rtt integer,
  add column if not exists touch_support boolean,
  add column if not exists color_scheme text;

create index if not exists page_views_device_type_idx on public.page_views (device_type);
create index if not exists page_views_browser_name_idx on public.page_views (browser_name);
create index if not exists page_views_is_bot_idx on public.page_views (is_bot);
