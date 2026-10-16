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
  Bot,
  FileText,
  Hammer,
  Video,
  ClipboardCheck,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Header } from "@/components/ache-obra/header";

import { CtaButton } from "@/components/ache-obra/cta-button";

import { siteContentQuery } from "@/lib/site-content";


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

            src="/images/ache-obra-mockup.png"

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
// RECURSOS DO APLICATIVO
/* ------------------------------------------------------------------ */
function ProductFeaturesSection() {
  const features = [
    {
      icon: <ImageIcon className="h-6 w-6" />,
      title: "Perfis com portfólio visual",
      description:
        "Profissionais podem apresentar fotos e vídeos de trabalhos realizados, além de informar especialidades, serviços e localização.",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Chat para conversar e combinar detalhes",
      description:
        "Cliente e profissional podem conversar pelo aplicativo e compartilhar informações para alinhar o serviço antes de fechar o trabalho.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Elaboração de orçamentos",
      description:
        "Organize dados do profissional, do cliente e da obra para preparar um orçamento mais claro e profissional.",
    },
    {
      icon: <ClipboardCheck className="h-6 w-6" />,
      title: "Lista de materiais e pedidos",
      description:
        "Monte listas de materiais, informe quantidades, adicione observações e gere um PDF para facilitar a organização da compra.",
    },
    {
      icon: <BadgeCheck className="h-6 w-6" />,
      title: "Avaliações e verificação de perfil",
      description:
        "Consulte avaliações e informações apresentadas nos perfis para ajudar na escolha de quem contratar. O selo de verificação identifica perfis aprovados no processo do app.",
    },
    {
      icon: <Hammer className="h-6 w-6" />,
      title: "Ferramentas para o dia a dia da obra",
      description:
        "Acesse recursos que ajudam a organizar serviços, materiais e informações relacionadas à execução da obra.",
    },
  ];

  return (
    <section id="recursos" className="border-y border-border bg-brand-surface/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange">
            Muito além de encontrar profissionais
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ferramentas que acompanham sua obra
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            O Ache Obra reúne divulgação de serviços, comunicação e recursos práticos para ajudar clientes e profissionais a organizar melhor cada etapa.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-xl hover:shadow-black/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-card-foreground">{feature.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-brand-orange/25 bg-card p-6 sm:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
              <Video className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-card-foreground">Mostre o seu trabalho de verdade</h3>
              <p className="mt-2 text-muted-foreground">
                Fotos, vídeos, descrição dos serviços e avaliações ajudam o cliente a conhecer melhor o profissional. Para quem procura trabalho, o perfil funciona como uma vitrine para apresentar experiência e especialidades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// JISA — INTELIGÊNCIA ARTIFICIAL DO ACHE OBRA
/* ------------------------------------------------------------------ */
function JisaSection() {
  return (
    <section id="jisa" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-2 text-sm font-semibold text-brand-orange">
              <Sparkles className="h-4 w-4" />
              Inteligência artificial do Ache Obra
            </div>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Conheça a <span className="text-brand-orange">Jisa</span>, sua assistente de IA para o universo da construção
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              A Jisa é a inteligência artificial do Ache Obra, pensada para aproximar tecnologia e construção civil. Ela foi concebida para ajudar usuários a encontrar orientação, organizar ideias e lidar com dúvidas relacionadas ao dia a dia de uma obra.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Seja você cliente, profissional, arquiteto ou engenheiro, a proposta é tornar a experiência digital mais simples e prática, reunindo recursos do aplicativo em um só lugar.
            </p>
            <a
              href="#download"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 font-bold text-white shadow-lg shadow-brand-orange/20 transition hover:-translate-y-0.5 hover:brightness-105"
            >
              <Bot className="h-5 w-5" />
              Conheça o Ache Obra
            </a>
          </div>

          <div className="relative">
            <div className="absolute inset-8 rounded-full bg-brand-orange/10 blur-3xl" />
            <div className="relative rounded-3xl border border-border bg-card p-7 shadow-2xl shadow-black/10 sm:p-9">
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange text-white shadow-lg shadow-brand-orange/20">
                  <Bot className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xl font-bold text-card-foreground">Jisa</p>
                  <p className="text-sm text-muted-foreground">IA do Ache Obra</p>
                </div>
                <span className="ml-auto rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">Construção civil</span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-brand-surface p-4 text-sm leading-relaxed text-foreground">
                  Olá! Sou a Jisa. Vamos organizar sua próxima etapa da obra?
                </div>
                <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-brand-orange p-4 text-sm leading-relaxed text-white">
                  Preciso planejar os materiais e preparar um orçamento.
                </div>
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-brand-surface p-4 text-sm leading-relaxed text-foreground">
                  Posso ajudar você a estruturar as informações e pensar nos próximos passos. Confira sempre medidas, preços e orientações técnicas com profissionais responsáveis.
                </div>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                Exemplo ilustrativo de experiência. A disponibilidade e as funções da Jisa dependem dos recursos habilitados no aplicativo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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

        <div id="download" className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

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
  const isGoogle = store === "google";

  return (
    <a
      href={isGoogle ? "https://play.google.com/store/apps/details?id=br.com.acheobra.app" : undefined}
      target={isGoogle ? "_blank" : undefined}
      rel={isGoogle ? "noopener noreferrer" : undefined}
      aria-label={isGoogle ? "Baixar Ache Obra na Google Play" : "iOS em breve"}
      onClick={isGoogle ? undefined : (event) => event.preventDefault()}
      className={`inline-flex min-h-14 items-center gap-3 rounded-xl border border-border bg-card px-5 transition-all ${isGoogle ? "hover:border-brand-orange/50 hover:bg-card/80" : "cursor-default opacity-90"}`}
    >
      {isGoogle ? (
        <svg className="h-7 w-7 text-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.807 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
        </svg>
      ) : (
        <Smartphone className="h-7 w-7 text-brand-orange" aria-hidden="true" />
      )}
      <div className="text-left">
        <p className="text-[10px] leading-none text-muted-foreground">
          {isGoogle ? "Baixe agora na" : "Disponibilidade"}
        </p>
        <p className="text-base font-bold leading-tight text-foreground">
          {isGoogle ? "Google Play" : "iOS em breve"}
        </p>
      </div>
    </a>
  );
}
