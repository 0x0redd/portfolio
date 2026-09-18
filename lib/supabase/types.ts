export type Database = {
  public: {
    Tables: {
      images: {
        Row: {
          id: string;
          path: string;
          album: string;
          filename: string;
          content_type: string | null;
          sort_order: number;
          published: boolean;
          featured: boolean;
          width: number | null;
          height: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          path: string;
          album: string;
          filename: string;
          content_type?: string | null;
          sort_order?: number;
          published?: boolean;
          featured?: boolean;
          width?: number | null;
          height?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["images"]["Insert"]>;
      };
      stats: {
        Row: {
          key: string;
          value: number;
          label: string | null;
          hint: string | null;
          meta: Record<string, unknown>;
          updated_at: string;
        };
        Insert: {
          key: string;
          value?: number;
          label?: string | null;
          hint?: string | null;
          meta?: Record<string, unknown>;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["stats"]["Insert"]>;
      };
      comments: {
        Row: {
          id: string;
          name: string;
          comment: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          comment: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["comments"]["Insert"]>;
      };
      page_views: {
        Row: {
          id: string;
          ip: string | null;
          user_agent: string | null;
          page: string;
          created_at: string;
          browser_name: string | null;
          browser_version: string | null;
          os_name: string | null;
          os_version: string | null;
          device_type: string | null;
          device_vendor: string | null;
          device_model: string | null;
          engine_name: string | null;
          engine_version: string | null;
          is_bot: boolean | null;
          ch_ua: string | null;
          ch_ua_mobile: string | null;
          ch_ua_platform: string | null;
          ch_ua_platform_version: string | null;
          ch_ua_model: string | null;
          ch_ua_arch: string | null;
          ch_ua_bitness: string | null;
          ch_ua_full_version_list: string | null;
          referer: string | null;
          accept_language: string | null;
          accept_encoding: string | null;
          screen_width: number | null;
          screen_height: number | null;
          viewport_width: number | null;
          viewport_height: number | null;
          device_pixel_ratio: number | null;
          timezone: string | null;
          language: string | null;
          languages: string[] | null;
          platform: string | null;
          hardware_concurrency: number | null;
          device_memory: number | null;
          connection_type: string | null;
          connection_downlink: number | null;
          connection_rtt: number | null;
          touch_support: boolean | null;
          color_scheme: string | null;
        };
        Insert: {
          id?: string;
          ip?: string | null;
          user_agent?: string | null;
          page?: string;
          created_at?: string;
          browser_name?: string | null;
          browser_version?: string | null;
          os_name?: string | null;
          os_version?: string | null;
          device_type?: string | null;
          device_vendor?: string | null;
          device_model?: string | null;
          engine_name?: string | null;
          engine_version?: string | null;
          is_bot?: boolean | null;
          ch_ua?: string | null;
          ch_ua_mobile?: string | null;
          ch_ua_platform?: string | null;
          ch_ua_platform_version?: string | null;
          ch_ua_model?: string | null;
          ch_ua_arch?: string | null;
          ch_ua_bitness?: string | null;
          ch_ua_full_version_list?: string | null;
          referer?: string | null;
          accept_language?: string | null;
          accept_encoding?: string | null;
          screen_width?: number | null;
          screen_height?: number | null;
          viewport_width?: number | null;
          viewport_height?: number | null;
          device_pixel_ratio?: number | null;
          timezone?: string | null;
          language?: string | null;
          languages?: string[] | null;
          platform?: string | null;
          hardware_concurrency?: number | null;
          device_memory?: number | null;
          connection_type?: string | null;
          connection_downlink?: number | null;
          connection_rtt?: number | null;
          touch_support?: boolean | null;
          color_scheme?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["page_views"]["Insert"]>;
      };
    };
  };
};

export type ImageRow = Database["public"]["Tables"]["images"]["Row"];
export type CommentRow = Database["public"]["Tables"]["comments"]["Row"];
export type StatRow = Database["public"]["Tables"]["stats"]["Row"];
export type PageViewRow = Database["public"]["Tables"]["page_views"]["Row"];
