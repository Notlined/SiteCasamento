import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env.local",
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

export type RsvpInsert = {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string | null;
};

export async function submitRsvp(data: RsvpInsert) {
  const { error } = await supabase.from("rsvps").insert({
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    mensagem: data.mensagem || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}
