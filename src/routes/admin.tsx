import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTENT_FIELDS, DEFAULT_CONTENT, fetchSiteContent, type ContentKey, type SiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel de conteúdo — Ache Obra" },
      { name: "description", content: "Edite os textos, o WhatsApp e o e-mail de suporte exibidos no site Ache Obra." },
      { property: "og:title", content: "Painel de conteúdo — Ache Obra" },
      { property: "og:description", content: "Área de administração do conteúdo do site Ache Obra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!active) return;
      if (!session) {
        navigate({ to: "/auth" });
        return;
      }
      setUserEmail(session.user.email ?? null);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      if (!active) return;
      setIsAdmin(Boolean(roles?.some((r) => r.role === "admin")));
      setChecking(false);
    })();
    return () => {
      active = false;
    };
  }, [navigate]);

  if (checking) {
    return <CenteredMessage>Carregando painel...</CenteredMessage>;
  }

  if (!isAdmin) {
    return (
      <CenteredMessage>
        <p>Sua conta ({userEmail}) não tem permissão de administrador.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
        >
          Sair
        </Button>
      </CenteredMessage>
    );
  }

  return <ContentEditor userEmail={userEmail} />;
}

function CenteredMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-muted-foreground">
      {children}
    </div>
  );
}

function ContentEditor({ userEmail }: { userEmail: string | null }) {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["site-content", "admin"],
    queryFn: fetchSiteContent,
  });
  const [values, setValues] = useState<SiteContent>(DEFAULT_CONTENT);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setValues(data);
  }, [data]);

  async function handleSave() {
    setSaving(true);
    try {
      const rows = CONTENT_FIELDS.map((field) => ({
        key: field.key,
        value: (values[field.key as ContentKey] ?? "").slice(0, 2000),
      }));
      const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
      if (error) throw error;
      toast.success("Conteúdo do site atualizado!");
      await refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Painel de conteúdo</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Editando como {userEmail}. As alterações aparecem no site imediatamente.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/">Ver site</Link>
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
            >
              Sair
            </Button>
          </div>
        </div>

        {isLoading ? (
          <p className="mt-10 text-muted-foreground">Carregando conteúdo...</p>
        ) : (
          <div className="mt-10 space-y-6 rounded-2xl border border-border bg-brand-surface/40 p-6">
            {CONTENT_FIELDS.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.multiline ? (
                  <Textarea
                    id={field.key}
                    rows={3}
                    maxLength={2000}
                    value={values[field.key as ContentKey] ?? ""}
                    onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  />
                ) : (
                  <Input
                    id={field.key}
                    maxLength={500}
                    value={values[field.key as ContentKey] ?? ""}
                    onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  />
                )}
              </div>
            ))}

            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
