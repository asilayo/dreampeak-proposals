import { supabase } from "./supabaseClient";

// The app reads/writes through window.storage (the same interface it used in the
// preview). Here we back it with a single shared Supabase table called "kv", so
// every signed-in teammate sees ONE common list of proposals. Values are JSON
// strings (the app stringifies/parses them itself), so the column is plain text.

const TABLE = "kv";

export function installStorage() {
  window.storage = {
    async get(key) {
      const { data, error } = await supabase
        .from(TABLE)
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (error) throw error;
      return data ? { key, value: data.value } : null;
    },

    async set(key, value) {
      const { error } = await supabase
        .from(TABLE)
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
      if (error) throw error;
      return { key, value };
    },

    async delete(key) {
      const { error } = await supabase.from(TABLE).delete().eq("key", key);
      if (error) throw error;
      return { key, deleted: true };
    },

    async list(prefix = "") {
      const { data, error } = await supabase
        .from(TABLE)
        .select("key")
        .like("key", `${prefix}%`);
      if (error) throw error;
      return { keys: (data || []).map((r) => r.key) };
    },
  };
}
