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
        };
        Insert: {
          id?: string;
          ip?: string | null;
          user_agent?: string | null;
          page?: string;
          created_at?: string;
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
