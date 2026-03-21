import supabase from './supabase';

const TABLE_NAME = 'test';

export async function get() {
  return await supabase.from(TABLE_NAME).select();
}

export async function insert(text: string) {
  return await supabase.from(TABLE_NAME).insert({ text });
}

export async function remove(text: string) {
  return await supabase.from(TABLE_NAME).delete().eq('text', text);
}
