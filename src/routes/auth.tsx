import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso ao painel — Ache Obra" },
      { name: "description", content: "Entre no painel administrativo do Ache Obra para editar os textos do site." },
      { property: "og:title", content: "Acesso ao painel — Ache Obra" },
      { property: "og:description", content: "Área restrita de administração do site Ache Obra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().trim().email({ message: "E-mail inválido" }).max(255),
  password: z.string().min(6, { message: "A senha precisa ter ao menos 6 caracteres" }).max(72),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword(parsed.data);
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          ...parsed.data,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Conta criada! Você já pode entrar.");
        setMode("login");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível concluir");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-brand-surface/40 p-8">
        <h1 className="text-2xl font-extrabold text-foreground">
          {mode === "login" ? "Entrar no painel" : "Criar acesso"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Área restrita para editar os textos e contatos do site Ache Obra.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={72}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-6 w-full text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {mode === "login" ? "Não tenho acesso ainda — criar conta" : "Já tenho conta — entrar"}
        </button>

        <Link to="/" className="mt-4 block text-center text-sm text-muted-foreground hover:text-foreground">
          Voltar ao site
        </Link>
      </div>
    </div>
  );
}
