import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  ImageIcon,
  MessageSquare,
  ShoppingCart,
  Briefcase,
  BadgeCheck,
  Crown,
  ClipboardList,
  Download,
  Smartphone,
  Search,
  Handshake,
  ShieldCheck,
  Users,
  Star,
  Mail,
} from "lucide-react";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Header } from "@/components/ache-obra/header";
import { CtaButton } from "@/components/ache-obra/cta-button";
import { siteContentQuery } from "@/lib/site-content";
import mockupImg from "../../public/images/ache-obra-mockup.png";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Ache Obra — A plataforma que une clientes aos melhores profissionais da construção da sua região" },
      {
        name: "description",
        content:
          "A plataforma que une clientes aos melhores profissionais da construção na sua região. Baixe o Ache Obra agora.",
      },
      { property: "og:title", content: "Ache Obra — Conecte sua obra aos melhores profissionais da sua região" },
      {
        property: "og:description",
        content:
          "Publique seu serviço gratuitamente ou encontre profissionais verificados para sua reforma ou construção.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function useContent() {
  return useSuspenseQuery(siteContentQuery).data;
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <SolutionsSection />
        <HowItWorksSection />
        <TrustSection />
        <FooterCtaSection />
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
// HERO
/* ------------------------------------------------------------------ */
function HeroSection() {
  const content = useContent();
  return (
    <section
      id="#"
      className="relative overflow-hidden gradient-hero pb-20 pt-32 md:pt-40"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-brand-blue/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-medium text-brand-blue">
            <BadgeCheck className="h-3.5 w-3.5" />
            Profissionais verificados na sua região
          </div>

          <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {content.hero_title}
          </h1>

          <p className="mt-6 text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {content.hero_subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaButton size="lg" asChild>
              <a href="#download" className="gap-2">
                <Download className="h-5 w-5" />
                {content.hero_cta_primary}
              </a>
            </CtaButton>
            <CtaButton variant="secondary" size="lg" asChild>
              <a href="#contato" className="gap-2">
                <MessageSquare className="h-5 w-5" />
                {content.hero_cta_secondary}
              </a>
            </CtaButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-blue" />
              <span>Perfil verificado</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-brand-orange" />
              <span>Avaliações reais</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-blue" />
              <span>Busca por cidade</span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex max-w-md items-center justify-center lg:max-w-none">
          <div className="absolute inset-0 rounded-full bg-brand-orange/10 blur-3xl" />
          <img
            src={mockupImg}
            alt="Mockup do aplicativo Ache Obra mostrando o feed de profissionais verificados"
            width={560}
            height={560}
            className="relative z-10 drop-shadow-2xl"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// SOLUÇÕES — PÚBLICO DUPLO
/* ------------------------------------------------------------------ */
function SolutionsSection() {
  const content = useContent();
  return (
    <section id="solucoes" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Para quem é o Ache Obra?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Uma plataforma completa que conecta quem precisa fazer obra a quem entende do assunto.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <SolutionCard
            audience="Para Clientes e Proprietários"
            title={content.clients_title}
            description="Pesquise por cidade, veja portfólio com fotos e vídeos reais dos profissionais e converse diretamente pelo app."
            icon={<Users className="h-6 w-6" />}
            features={[
              { icon: <MapPin className="h-5 w-5" />, text: "Busca por cidade e região" },
              { icon: <ImageIcon className="h-5 w-5" />, text: "Portfólio com fotos e vídeos reais" },
              { icon: <MessageSquare className="h-5 w-5" />, text: "Chat direto com o profissional" },
              { icon: <ShoppingCart className="h-5 w-5" />, text: "Criador de lista de compras de materiais" },
            ]}
          />

          <SolutionCard
            audience="Para Profissionais e Especialistas"
            title={content.pros_title}
            description="Publique seus trabalhos, conquiste o Selo de Verificação, ative o Plano Pró e receba orçamentos da sua região."
            icon={<Briefcase className="h-6 w-6" />}
            features={[
              { icon: <ClipboardList className="h-5 w-5" />, text: "Publicação de trabalhos realizados" },
              { icon: <BadgeCheck className="h-5 w-5" />, text: "Selo de Verificação de Perfil" },
              { icon: <Crown className="h-5 w-5" />, text: "Planos Pró para mais visibilidade" },
              { icon: <Search className="h-5 w-5" />, text: "Acesso direto aos orçamentos da região" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function SolutionCard({
  audience,
  title,
  description,
  icon,
  features,
}: {
  audience: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: { icon: React.ReactNode; text: string }[];
}) {
  return (
    <div className="group relative rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:border-brand-blue/30 hover:bg-card/80 hover:shadow-xl hover:shadow-black/10">
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-brand-orange to-brand-blue opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-surface text-brand-orange">
        {icon}
      </div>
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">{audience}</p>
      <h3 className="mt-2 text-2xl font-bold text-card-foreground">{title}</h3>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <ul className="mt-6 space-y-4">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="mt-0.5 text-brand-orange">{feature.icon}</span>
            <span className="text-foreground">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
// COMO FUNCIONA
/* ------------------------------------------------------------------ */
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: <Download className="h-6 w-6" />,
      title: "Baixe o aplicativo e crie seu perfil",
      description:
        "Escolha entre Cliente, Profissional, Arquiteto ou Engenheiro e complete seu cadastro em poucos minutos.",
    },
    {
      number: "02",
      icon: <Smartphone className="h-6 w-6" />,
      title: "Publique ou navegue pelos serviços",
      description:
        "Cliente publica a necessidade da obra; profissionais encontram serviços disponíveis na sua cidade.",
    },
    {
      number: "03",
      icon: <Handshake className="h-6 w-6" />,
      title: "Combine e feche o negócio pelo chat",
      description:
        "Converse, tire dúvidas, envie documentos e feche o negócio dentro do chat interno seguro do Ache Obra.",
    },
  ];

  return (
    <section id="como-funciona" className="relative border-y border-border bg-brand-surface/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Como funciona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Três passos simples para transformar sua obra ou sua carreira.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-3xl border border-border bg-card p-8 text-center"
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-brand-orange px-4 py-1 text-sm font-bold text-primary-foreground">
                {step.number}
              </span>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-surface text-brand-blue">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-card-foreground">{step.title}</h3>
              <p className="mt-3 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// SEGURANÇA E CREDIBILIDADE
/* ------------------------------------------------------------------ */
function TrustSection() {
  const content = useContent();
  return (
    <section id="seguranca" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-brand-blue/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-medium text-brand-blue">
              <ShieldCheck className="h-3.5 w-3.5" />
              Segurança em primeiro lugar
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {content.trust_title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tranquilidade para quem contrata. Transparência para quem trabalha. Nosso Selo de
              Verificação garante que o perfil passou por uma checagem rigorosa de identidade e
              histórico profissional.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Checagem de dados e documentos do profissional",
                "Avaliações reais de clientes anteriores",
                "Portfólio validado com fotos e vídeos",
                "Chat interno criptografado para sua proteção",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-brand-blue" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative rounded-3xl border border-border bg-card p-10 text-center shadow-2xl shadow-black/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-blue p-3 shadow-lg glow-blue">
                <BadgeCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-8 text-2xl font-bold text-card-foreground">Perfil Verificado</h3>
              <p className="mt-3 text-muted-foreground">
                Profissionais com o selo azul passaram por análise de identidade e comprovação de
                trabalhos.
              </p>
              <div className="mt-6 flex items-center justify-center gap-1 text-brand-orange">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Nota média 4.9 entre usuários</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// RODAPÉ DE CONVERSÃO
/* ------------------------------------------------------------------ */
function FooterCtaSection() {
  const content = useContent();
  return (
    <footer id="contato" className="relative overflow-hidden border-t border-border bg-brand-surface/40 pb-12 pt-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-orange/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {content.footer_title}
        </h2>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <StoreBadge store="google" />
          <StoreBadge store="apple" />
        </div>

        <div className="mt-14 border-t border-border pt-10">
          <h3 className="text-xl font-bold text-foreground">{content.contact_title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {content.contact_subtitle}
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton variant="outline" size="lg" asChild>
              <a href={`mailto:${content.support_email}`} className="gap-2">
                <Mail className="h-5 w-5" />
                {content.support_email}
              </a>
            </CtaButton>
          </div>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ache Obra. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

function StoreBadge({ store }: { store: "google" | "apple" }) {
  return (
    <a
      href="#download"
      className="inline-flex h-14 items-center gap-3 rounded-xl border border-border bg-card px-5 transition-all hover:border-brand-blue/40 hover:bg-card/80"
    >
      {store === "google" ? (
        <svg className="h-7 w-7 text-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.807 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
        </svg>
      ) : (
        <svg className="h-7 w-7 text-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      )}
      <div className="text-left">
        <p className="text-[10px] leading-none text-muted-foreground">
          {store === "google" ? "Disponível na" : "Baixar na"}
        </p>
        <p className="text-base font-bold leading-tight text-foreground">
          {store === "google" ? "Google Play" : "App Store"}
        </p>
      </div>
    </a>
  );
}