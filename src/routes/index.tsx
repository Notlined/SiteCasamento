import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroCouple from "@/assets/hero-couple.jpg";
import lavenderSprig from "@/assets/lavender-sprig.jpg";
import lavenderTexture from "@/assets/lavender-texture.jpg";
import { submitRsvp } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  component: Index,
});

/* -------- Editable content (troque aqui as fotos e o PIX) -------- */
const HERO_IMAGE = heroCouple; // troque por outra importação para mudar a foto de fundo
const PIX_KEY = "denilton.emilly@exemplo.com"; // substituir pela chave PIX real
const QR_CODE_URL = ""; // cole aqui a URL da imagem do QR Code quando disponível
/* ---------------------------------------------------------------- */

function Monogram({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
        <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="30" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth="0.3" />
        <text x="30" y="37" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="18" fontStyle="italic" fill="currentColor">D&amp;E</text>
      </svg>
    </div>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill="currentColor" />
    </svg>
  );
}

function Nav() {
  return (
    <nav className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <div className="flex items-center gap-3 text-cream">
          <Monogram className="h-10 w-10" />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-eyebrow text-cream/80">Save the date</span>
            <span className="text-italic-serif text-sm text-cream/80">23 · 08 · 2026</span>
          </div>
        </div>
        <ul className="hidden items-center gap-10 md:flex">
          {[
            { label: "Convite", href: "#convite" },
            { label: "Cerimônia", href: "#cerimonia" },
            { label: "Presente", href: "#presente" },
            { label: "RSVP", href: "#rsvp" },
          ].map((item) => (
            <li key={item.label}>
              <a href={item.href} className="text-eyebrow text-cream/85 transition-colors hover:text-cream">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#rsvp"
          className="group inline-flex items-center gap-2 rounded-full border border-cream/60 px-5 py-2.5 text-eyebrow text-cream transition-all hover:border-cream hover:bg-cream hover:text-lavender-deep"
        >
          Confirmar
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="convite" className="relative min-h-screen w-full overflow-hidden bg-ink">
      <Nav />
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Denilton e Emilly em um campo de lavandas"
          width={1600}
          height={1808}
          className="h-full w-full object-cover object-[center_25%]"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-ink/30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-between px-6 pt-32 pb-14 md:px-12 md:pt-40">
        <div className="max-w-2xl">
          <div className="mb-8 flex items-center gap-4 text-cream">
            <Sparkle className="h-3 w-3" />
            <span className="text-eyebrow">Convite · Pacajus / CE</span>
          </div>

          <h1 className="text-display text-6xl leading-[0.92] text-cream sm:text-7xl md:text-[8rem]">
            Denilton
            <span className="block text-italic-serif text-lavender-soft">&amp; Emilly</span>
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-cream/85 md:text-lg">
            Com o coração cheio, convidamos você para celebrar o dia em que os nossos caminhos se tornam um só.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#rsvp"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-cream px-8 py-4 text-eyebrow text-lavender-deep transition-all hover:shadow-[var(--shadow-glow)]"
            >
              Aceitar convite
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#cerimonia"
              className="inline-flex items-center gap-3 rounded-full border border-cream/40 px-8 py-4 text-eyebrow text-cream transition-colors hover:border-cream"
            >
              Ver detalhes
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-cream/25 pt-8 md:grid-cols-4 md:gap-10">
          {[
            { k: "Data", v: "23 · Ago · 26" },
            { k: "Horário", v: "15h30" },
            { k: "Local", v: "Sabor Brilhante" },
            { k: "Traje", v: "Esporte fino" },
          ].map((d) => (
            <div key={d.k} className="min-w-0">
              <div className="text-eyebrow text-cream/80">{d.k}</div>
              <div className="mt-2 text-display text-2xl text-cream md:text-3xl">{d.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatCountdown(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return "00d 00h 00m 00s";
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(days).padStart(2, "0")}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
}

function Cerimonia() {
  const [countdown, setCountdown] = useState("00d 00h 00m 00s");

  useEffect(() => {
    const targetDate = new Date(2026, 7, 23, 0, 0, 0);

    const updateCountdown = () => {
      setCountdown(formatCountdown(targetDate));
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section id="cerimonia" className="relative overflow-hidden bg-cream py-24 md:py-36">
      <div className="pointer-events-none absolute -right-24 top-0 hidden w-[480px] opacity-70 lg:block">
        <img src={lavenderTexture} alt="" width={1600} height={900} loading="lazy" className="h-full w-full object-cover" />
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-6 md:px-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="flex items-center gap-3 text-lavender-deep">
            <Sparkle className="h-3 w-3" />
            <span className="text-eyebrow">Capítulo 01</span>
          </div>
          <h2 className="mt-6 text-display text-5xl leading-[0.95] text-ink md:text-6xl">
            A cerimônia,
            <span className="block text-italic-serif lavender-text">entre lavandas.</span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Uma tarde tranquila em Pacajus, cercada pelas pessoas que fizeram parte da nossa história. Chegue antes das 15h30 para não perder a entrada.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
            {[
              ["Data", "23 · Agosto · 2026"],
              ["Horário", "15h30"],
              ["Local", "Sabor Brilhante Buriti"],
              ["Cidade", "Pacajus / CE"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-eyebrow text-lavender-deep">{k}</dt>
                <dd className="mt-2 text-italic-serif text-xl text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 rounded-sm border border-lavender/30 bg-lavender-soft/40 p-6">
            <div className="text-eyebrow text-lavender-deep">Traje</div>
            <p className="mt-3 text-italic-serif text-2xl text-ink">Esporte fino</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Pedimos, com carinho, que evitem o <strong className="text-ink">branco</strong> (reservado à noiva) e o
              <strong className="text-ink"> lavanda</strong> (cor das madrinhas).
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-editorial)]">
            <img
              src={lavenderSprig}
              alt="Ramo de lavanda"
              width={1200}
              height={1500}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-4 w-60 rounded-sm border border-lavender/30 bg-cream p-6 shadow-[var(--shadow-editorial)] md:-left-10 md:w-72">
            <div className="text-eyebrow text-lavender-deep">Contagem</div>
            <div className="mt-3 text-display text-3xl text-ink md:text-4xl">{countdown}</div>
            <div className="mt-1 text-italic-serif text-muted-foreground">Falta até 23 de agosto de 2026</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Presente() {
  const [copied, setCopied] = useState(false);

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* noop */
    }
  };

  return (
    <section id="presente" className="relative overflow-hidden bg-lavender-soft/40 py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-3 text-lavender-deep">
            <Sparkle className="h-3 w-3" />
            <span className="text-eyebrow">Capítulo 02 · Presente</span>
          </div>
          <h2 className="mt-6 text-display text-5xl leading-[0.95] text-ink md:text-6xl">
            A sua presença
            <span className="block text-italic-serif lavender-text">já é o nosso presente.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Se desejar, pode nos abençoar por PIX — escaneie o QR Code ou copie a chave abaixo.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-sm border border-lavender/30 bg-cream p-10 shadow-[var(--shadow-editorial)]">
            <div className="text-eyebrow text-lavender-deep">QR Code</div>
            <div className="mt-6 flex aspect-square w-56 items-center justify-center rounded-sm border border-dashed border-lavender/50 bg-lavender-soft/30">
              {QR_CODE_URL ? (
                <img src={QR_CODE_URL} alt="QR Code PIX Denilton e Emilly" className="h-full w-full object-contain p-3" />
              ) : (
                <div className="px-6 text-center text-xs text-muted-foreground">
                  <div className="text-italic-serif text-lg text-ink">Em breve</div>
                  <div className="mt-1">QR Code será inserido aqui</div>
                </div>
              )}
            </div>
            <p className="mt-6 text-center text-italic-serif text-lg text-ink">Aponte a câmera do celular</p>
          </div>

          <div className="flex flex-col justify-center rounded-sm border border-lavender/30 bg-cream p-10 shadow-[var(--shadow-editorial)]">
            <div className="text-eyebrow text-lavender-deep">PIX Copia e Cola</div>
            <div className="mt-6 rounded-sm border border-lavender/25 bg-lavender-soft/25 p-4">
              <p className="break-all text-sm leading-relaxed text-ink">{PIX_KEY}</p>
            </div>
            <button
              type="button"
              onClick={copyPix}
              className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-lavender-deep px-8 py-4 text-eyebrow text-cream transition-all hover:shadow-[var(--shadow-glow)]"
            >
              {copied ? "Chave copiada ✓" : "Copiar chave PIX"}
            </button>
            <p className="mt-4 text-center text-italic-serif text-sm text-muted-foreground">
              Chave a ser confirmada pelos noivos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RSVP() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.email.trim() || !form.telefone.trim()) return;

    setLoading(true);
    setError(null);
    try {
      await submitRsvp({
        nome: form.nome.trim(),
        email: form.email.trim(),
        telefone: form.telefone.trim(),
        mensagem: form.mensagem.trim() || null,
      });
      setSent(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(
        `Não conseguimos registrar sua confirmação agora. Erro: ${message}`,
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <img src={lavenderTexture} alt="" width={1600} height={900} loading="lazy" className="h-full w-full object-cover" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 text-center md:px-12">
        <Monogram className="mx-auto h-14 w-14 text-lavender-soft" />
        <div className="mt-8 flex items-center justify-center gap-3 text-lavender-soft">
          <div className="h-px w-10 bg-lavender-soft/50" />
          <span className="text-eyebrow">Confirme sua presença</span>
          <div className="h-px w-10 bg-lavender-soft/50" />
        </div>
        <h2 className="mt-6 text-display text-5xl leading-[0.95] text-cream md:text-6xl">
          Preencha o convite
          <span className="block text-italic-serif text-lavender-soft">até 09 de agosto.</span>
        </h2>

        {sent ? (
          <div className="mx-auto mt-12 max-w-md rounded-sm border border-lavender-soft/40 bg-cream/10 p-10 text-center backdrop-blur">
            <div className="text-italic-serif text-3xl text-cream">Obrigado, {form.nome.split(" ")[0]}!</div>
            <p className="mt-4 text-sm leading-relaxed text-cream/80">
              Sua confirmação foi registrada. Nos vemos em 23 de agosto de 2026.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-4 text-left">
            <label className="block">
              <span className="text-eyebrow text-lavender-soft">Nome completo *</span>
              <input
                required
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="mt-2 w-full rounded-sm border border-lavender-soft/30 bg-cream/5 px-5 py-3.5 text-sm text-cream placeholder:text-cream/40 backdrop-blur focus:border-lavender-soft focus:outline-none"
                placeholder="Como você assinaria"
              />
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-eyebrow text-lavender-soft">E-mail *</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 w-full rounded-sm border border-lavender-soft/30 bg-cream/5 px-5 py-3.5 text-sm text-cream placeholder:text-cream/40 backdrop-blur focus:border-lavender-soft focus:outline-none"
                  placeholder="voce@email.com"
                />
              </label>
              <label className="block">
                <span className="text-eyebrow text-lavender-soft">Telefone *</span>
                <input
                  required
                  type="tel"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  className="mt-2 w-full rounded-sm border border-lavender-soft/30 bg-cream/5 px-5 py-3.5 text-sm text-cream placeholder:text-cream/40 backdrop-blur focus:border-lavender-soft focus:outline-none"
                  placeholder="(85) 9 0000-0000"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-eyebrow text-lavender-soft">Mensagem (opcional)</span>
              <textarea
                rows={4}
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                className="mt-2 w-full resize-none rounded-sm border border-lavender-soft/30 bg-cream/5 px-5 py-3.5 text-sm text-cream placeholder:text-cream/40 backdrop-blur focus:border-lavender-soft focus:outline-none"
                placeholder="Um recado carinhoso para os noivos"
              />
            </label>

            {error && (
              <p className="text-sm text-red-300" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 inline-flex items-center justify-center gap-3 rounded-full bg-cream px-8 py-4 text-eyebrow text-lavender-deep transition-all hover:shadow-[var(--shadow-glow)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Confirmar presença →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-lavender/20 bg-cream py-14">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-3 md:px-12">
        <div className="flex items-center gap-3 text-lavender-deep">
          <Monogram className="h-12 w-12" />
          <div>
            <div className="text-display text-2xl text-ink">Denilton &amp; Emilly</div>
            <div className="text-italic-serif text-sm text-muted-foreground">23 · Agosto · 2026</div>
          </div>
        </div>
        <p className="text-center text-italic-serif text-xl text-muted-foreground md:text-2xl">
          "Entre lavandas, um sim."
        </p>
        <div className="flex items-center justify-start gap-6 text-eyebrow text-muted-foreground md:justify-end">
          <a href="#convite" className="transition-colors hover:text-lavender-deep">Convite</a>
          <a href="#presente" className="transition-colors hover:text-lavender-deep">Presente</a>
          <a href="#rsvp" className="transition-colors hover:text-lavender-deep">RSVP</a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1200px] px-6 md:px-12">
        <div className="hairline" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground md:flex-row">
          <span>© 2026 · Feito com carinho para nossos convidados</span>
          <span className="text-eyebrow">Pacajus / Ceará</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-cream">
      <Hero />
      <Cerimonia />
      <Presente />
      <RSVP />
      <Footer />
    </main>
  );
}
