import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const CONTENT_FIELDS = [
  { key: "hero_title", label: "Título principal (Hero)", multiline: true },
  { key: "hero_subtitle", label: "Subtítulo (Hero)", multiline: true },
  { key: "hero_cta_primary", label: "Botão principal do Hero", multiline: false },
  { key: "hero_cta_secondary", label: "Botão secundário do Hero", multiline: false },
  { key: "clients_title", label: "Título do bloco Clientes", multiline: false },
  { key: "pros_title", label: "Título do bloco Profissionais", multiline: false },
  { key: "trust_title", label: "Título do bloco de Segurança", multiline: false },
  { key: "footer_title", label: "Chamada final do rodapé", multiline: true },
  { key: "contact_title", label: "Título do atendimento", multiline: false },
  { key: "contact_subtitle", label: "Subtítulo do atendimento", multiline: true },
  { key: "support_email", label: "E-mail de suporte", multiline: false },
] as const;

export type ContentKey = (typeof CONTENT_FIELDS)[number]["key"];
export type SiteContent = Record<ContentKey, string>;

export const DEFAULT_CONTENT: SiteContent = {
  hero_title: "Conecte sua obra aos melhores profissionais da sua região.",
  hero_subtitle:
    "Publique seu serviço gratuitamente ou encontre pedreiros, arquitetos e engenheiros verificados em poucos cliques.",
  hero_cta_primary: "Baixar o App Grátis",
  hero_cta_secondary: "Falar com o suporte",
  clients_title: "Encontre quem faz com segurança.",
  pros_title: "Conquiste mais clientes todos os dias.",
  trust_title: "Selo de Verificação Ache Obra",
  footer_title: "Sua obra merece a escolha certa. Baixe o Ache Obra agora mesmo!",
  contact_title: "Fale com o nosso atendimento",
  contact_subtitle: "Estamos prontos para ajudar clientes e profissionais.",
  support_email: "suporte@acheobra.com.br",
};

export async function fetchSiteContent(): Promise<SiteContent> {
  const { data, error } = await supabase.from("site_content").select("key, value");
  if (error || !data) return DEFAULT_CONTENT;

  const merged = { ...DEFAULT_CONTENT };
  for (const row of data) {
    if (row.key in merged && typeof row.value === "string" && row.value.trim() !== "") {
      merged[row.key as ContentKey] = row.value;
    }
  }
  return merged;
}

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: fetchSiteContent,
  staleTime: 60_000,
});