import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import "./styles.css";


const ASSET_BASE = `${import.meta.env.BASE_URL}assets/`;
const asset = (fileName) => `${ASSET_BASE}${fileName}`;

const WHATSAPP_MAIN = "https://wa.me/50370876214?text=Hola%20Maricela%2C%20me%20gustar%C3%ADa%20agendar%20mi%20experiencia%20personalizada%20Mary%20Kay.";
    const WHATSAPP_OPPORTUNITY = "https://wa.me/50370876214?text=Hola%20Maricela%2C%20me%20gustar%C3%ADa%20conocer%20la%20oportunidad%20Mary%20Kay.%20%C2%BFMe%20puedes%20contar%20m%C3%A1s%3F";
    const HERO_IMAGE = asset("mpdo9hna-ChatGPT-Image-20-may-2026_-12_13_08-a.m.-_3_.webp");
    const EXPERIENCE_IMAGE = asset("mpdo98nr-ChatGPT-Image-20-may-2026_-12_03_44-a.m.-_1_.webp");
    const CONSULTATION_IMAGE = asset("mpdo8scb-ChatGPT-Image-18-may-2026_-10_35_51-p.m..webp");
    const MARICELA_IMAGE = asset("mpkgftko-ChatGPT-Image-20-may-2026_-12_03_44-a.m.-_1_.webp");
    const BEAUTY_DETAIL_IMAGE = asset("mpdo91gn-ChatGPT-Image-19-may-2026_-11_37_37-p.m.-_1_.webp");
    const OPPORTUNITY_IMAGE = asset("mpkgappv-ChatGPT-Image-18-may-2026_-10_26_23-p.m.-_10_.webp");
    const AGENDA_IMAGE = asset("mpkgz26m-ChatGPT-Image-19-may-2026_-11_47_01-p.m.-_7_.webp");

    function ArrowUpRight({ className = "h-5 w-5" }) {
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }

    function WhatsAppIcon({ className = "h-5 w-5" }) {
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.05 4.91A9.82 9.82 0 0 0 3.62 16.67L2.25 21.7l5.15-1.35A9.8 9.8 0 0 0 12.09 21h.01a9.83 9.83 0 0 0 6.95-16.09Zm-6.95 14.42h-.01a8.12 8.12 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-2.98-.2-.31A8.14 8.14 0 1 1 12.1 19.33Zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.19-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49l.36-.42c.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      );
    }

    function PlayIcon({ className = "h-4 w-4" }) {
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="6 4 20 12 6 20 6 4" />
        </svg>
      );
    }

    function SparkleIcon() {
      return (
        <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3l1.6 5.1L19 10l-5.4 1.9L12 17l-1.6-5.1L5 10l5.4-1.9L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M18.5 15l.8 2.4 2.2.8-2.2.8-.8 2.4-.8-2.4-2.2-.8 2.2-.8.8-2.4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    }

    function HeartIcon() {
      return (
        <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 20s-7.2-4.5-8.8-9.2C2.1 7.6 4.2 5 7.2 5c1.8 0 3.2 1 4.1 2.2C12.2 6 13.7 5 15.5 5c3 0 5.1 2.6 4 5.8C17.8 15.5 12 20 12 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    }

    function SoftCrossfadeImage({ images, label }) {
      const imageRefs = useRef([]);
      const rafRef = useRef(null);
      const indexRef = useRef(0);

      useEffect(() => {
        const FADE_MS = 900;
        const HOLD_MS = 6200;
        let timeoutId;

        const setOpacity = (index, value) => {
          const node = imageRefs.current[index];
          if (node) node.style.opacity = String(value);
        };

        const fadePair = (from, to) => {
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / FADE_MS, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setOpacity(from, 1 - eased);
            setOpacity(to, eased);
            if (progress < 1) {
              rafRef.current = requestAnimationFrame(tick);
            }
          };

          rafRef.current = requestAnimationFrame(tick);
        };

        imageRefs.current.forEach((_, index) => setOpacity(index, index === 0 ? 1 : 0));

        const cycle = () => {
          const from = indexRef.current;
          const to = (from + 1) % images.length;
          indexRef.current = to;
          fadePair(from, to);
          timeoutId = window.setTimeout(cycle, HOLD_MS);
        };

        timeoutId = window.setTimeout(cycle, HOLD_MS);

        return () => {
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          window.clearTimeout(timeoutId);
        };
      }, [images.length]);

      return (
        <div className="cinematic-bg" aria-label={label}>
          {images.map((src, index) => (
            <img
              key={src}
              ref={(node) => { imageRefs.current[index] = node; }}
              className="bg-photo"
              src={src}
              alt=""
              aria-hidden="true"
            />
          ))}
        </div>
      );
    }

    function BlurText({ text, className = "" }) {
      const ref = useRef(null);
      const isInView = useInView(ref, { amount: 0.1, once: true });
      const words = text.split(" ");

      return (
        <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: "0.06em" }}>
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
              animate={isInView ? {
                filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                opacity: [0, 0.5, 1],
                y: [50, -5, 0]
              } : undefined}
              transition={{
                duration: 0.7,
                times: [0, 0.5, 1],
                ease: "easeOut",
                delay: (index * 80) / 1000
              }}
              style={{ display: "inline-block", marginRight: "0.24em" }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      );
    }

const entrance = {
      hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
      show: (delay = 0) => ({
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", delay }
      })
    };

    function fadeIn(delay = 0) {
      return {
        initial: { filter: "blur(10px)", opacity: 0, y: 24 },
        whileInView: { filter: "blur(0px)", opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.75, ease: "easeOut", delay }
      };
    }

    function scrollToSection(event, href) {
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      const navOffset = window.innerWidth < 1280 ? 82 : 96;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.history.pushState(null, "", href);
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }

    function Navbar() {
      const [onLight, setOnLight] = useState(false);
      const [menuOpen, setMenuOpen] = useState(false);
      const links = [
        ["Inicio", "#inicio"],
        ["Experiencia", "#experiencia"],
        ["Opciones", "#opciones"],
        ["Maricela", "#maricela"],
        ["Oportunidad", "#oportunidad"],
        ["Testimonios", "#testimonios"],
        ["Agenda", "#agenda"]
      ];

      useEffect(() => {
        const updateTheme = () => {
          const navProbeY = 120;
          const lightSections = ["maricela"]
            .map((id) => document.getElementById(id))
            .filter(Boolean);
          setOnLight(lightSections.some((section) => {
            const rect = section.getBoundingClientRect();
            return rect.top <= navProbeY && rect.bottom > navProbeY;
          }));
        };

        updateTheme();
        window.addEventListener("scroll", updateTheme, { passive: true });
        window.addEventListener("resize", updateTheme);
        return () => {
          window.removeEventListener("scroll", updateTheme);
          window.removeEventListener("resize", updateTheme);
        };
      }, []);

      useEffect(() => {
        const closeOnDesktop = () => {
          if (window.innerWidth >= 1024) setMenuOpen(false);
        };
        const closeOnEscape = (event) => {
          if (event.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("resize", closeOnDesktop);
        window.addEventListener("keydown", closeOnEscape);
        return () => {
          window.removeEventListener("resize", closeOnDesktop);
          window.removeEventListener("keydown", closeOnEscape);
        };
      }, []);

      const navigate = (event, href) => {
        setMenuOpen(false);
        scrollToSection(event, href);
      };

      return (
        <nav className={`fixed left-0 right-0 top-4 z-[9999] px-4 lg:px-6 xl:px-16 ${onLight ? "nav-on-light" : ""}`} aria-label="Navegación principal">
          <div className="relative mx-auto flex max-w-7xl items-center justify-between">
            <a href="#inicio" onClick={(event) => navigate(event, "#inicio")} className="nav-brand liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white" aria-label="Volver al inicio">
              <span className="glass-content">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3.5 11.2 12 4l8.5 7.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.5 10.2V20h11v-9.8M10 20v-5.2h4V20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>

            <div className="liquid-glass hidden items-center gap-1 rounded-full px-1.5 py-1.5 lg:flex">
              <div className="glass-content flex items-center gap-1">
                {links.map(([label, href]) => (
                  <a key={label} href={href} onClick={(event) => navigate(event, href)} className="nav-link px-2 py-2 font-body text-[12px] font-medium text-white/90 xl:px-3 xl:text-sm">
                    {label}
                  </a>
                ))}
                <a href={WHATSAPP_MAIN} target="_blank" rel="noopener noreferrer" className="ml-1 flex items-center gap-2 rounded-full bg-gradient-to-br from-mary-pink to-mary-vivid px-3 py-2 font-body text-xs font-semibold text-white shadow-[0_14px_34px_rgba(232,62,157,0.35)] whitespace-nowrap xl:px-4 xl:text-sm">
                  Agendar por WhatsApp
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <span className="hidden h-12 w-12 lg:block" aria-hidden="true" />
            <button
              type="button"
              className="nav-icon liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white lg:hidden"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="glass-content">
                {menuOpen ? (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                )}
              </span>
            </button>

            {menuOpen && (
              <div id="mobile-navigation" className="mobile-menu-panel absolute left-0 right-0 top-16 p-2 lg:hidden">
                <div className="glass-content flex flex-col">
                  {links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={(event) => navigate(event, href)}
                      className="nav-link mobile-menu-link px-4 py-3.5 font-body text-base font-medium text-white/90"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      );
    }

    function StatCard({ icon, value, label }) {
      return (
        <div className="trust-card liquid-glass w-full rounded-[1.25rem] sm:w-[264px]">
          <div className="glass-content trust-card-inner">
            <span className="trust-icon">{icon}</span>
            <div>
              <div className="trust-value font-heading italic leading-none text-white">{value}</div>
              <div className="trust-label mt-2 font-body text-xs font-normal">{label}</div>
            </div>
          </div>
        </div>
      );
    }

    function Hero() {
      return (
        <section id="inicio" className="viewport-fill hero-shell relative flex overflow-hidden bg-dark-rose">
          <SoftCrossfadeImage images={[HERO_IMAGE, EXPERIENCE_IMAGE]} label="Maricela Monchez y experiencia personalizada Mary Kay" />

          <div className="relative z-10 flex w-full flex-col">
            <main className="hero-main flex flex-col items-center justify-center px-4 text-center">
              <motion.div variants={entrance} initial="hidden" animate="show" custom={0.3} className="liquid-glass rounded-full">
                <div className="glass-content flex flex-wrap items-center justify-center gap-2 px-2 py-1.5">
                  <span className="rounded-full bg-white px-3 py-1 font-body text-xs font-semibold text-mary-ink">Maricela Monchez</span>
                  <span className="pr-3 font-body text-sm text-white/90">Consultora de Belleza Independiente · Futura directora</span>
                </div>
              </motion.div>

              <BlurText
                text="Descubre una rutina de belleza pensada para tu piel, tu tiempo y tu estilo."
                className="hero-title mt-6 max-w-[62rem] justify-center font-heading text-[3.35rem] italic leading-[0.92] tracking-[-0.04em] text-white md:text-[4.45rem] lg:text-[5.25rem]"
              />

              <motion.p variants={entrance} initial="hidden" animate="show" custom={0.8} className="hero-copy mt-5 max-w-[46rem] font-body text-base font-normal leading-snug text-white/90 md:text-lg">
                Agenda tu experiencia conmigo y recibe orientación clara para cuidar tu piel y resaltar tu belleza natural, sin presión de compra.
              </motion.p>

              <motion.div variants={entrance} initial="hidden" animate="show" custom={1.05} className="hero-actions mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <a href={WHATSAPP_MAIN} target="_blank" rel="noopener noreferrer" className="liquid-glass-strong rounded-full px-5 py-2.5 font-body text-sm font-medium text-white">
                  <span className="glass-content flex items-center gap-2">
                    Agendar por WhatsApp
                    <ArrowUpRight />
                  </span>
                </a>
                <a href="#experiencia" onClick={(event) => scrollToSection(event, "#experiencia")} className="cta-secondary rounded-full px-5 py-2.5 font-body text-sm font-semibold">
                  Conocer experiencias
                  <PlayIcon />
                </a>
              </motion.div>

              <motion.div variants={entrance} initial="hidden" animate="show" custom={1.25} className="hero-stat-grid mx-auto mt-8 grid w-full max-w-[544px] grid-cols-1 justify-items-center gap-4 sm:grid-cols-2">
                <StatCard icon={<SparkleIcon />} value="1 a 1" label="Diagnóstico y rutina personalizada" />
                <StatCard icon={<HeartIcon />} value="Sin presión" label="Acompañamiento claro y cercano" />
              </motion.div>

              <motion.div variants={entrance} initial="hidden" animate="show" custom={1.4} className="hero-endcap mt-8 flex w-full flex-col items-center gap-4 px-4 md:mt-10">
              <div className="liquid-glass rounded-full px-3.5 py-1">
                <span className="glass-content font-body text-xs font-medium text-white">Atención personalizada · Cuidado constante · Belleza con confianza</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 font-heading text-2xl italic tracking-tight text-white md:gap-x-14 md:text-3xl">
                <span>Piel</span>
                <span>Maquillaje</span>
                <span>Autocuidado</span>
                <span>Confianza</span>
                <span>Liderazgo</span>
              </div>
              </motion.div>
            </main>
          </div>
        </section>
      );
    }

    const experienceCards = [
      {
        title: "Diagnóstico facial",
        body: "Juntas identificamos cómo se siente tu piel, qué rutina llevas hoy y qué puedes simplificar para cuidarte con constancia.",
        tags: ["Escucha real", "Tipo de piel", "Rutina simple", "Seguimiento"]
      },
      {
        title: "Manos de Seda",
        body: "Un momento sensorial para probar texturas, sentir suavidad y descubrir una forma práctica de regalarte cuidado.",
        tags: ["Sensorial", "Suavidad", "Autocuidado", "Uso diario"]
      },
      {
        title: "Maquillaje express",
        body: "Elegimos tonos, acabados y pasos sencillos para resaltar tu belleza natural sin sentirte recargada ni disfrazada.",
        tags: ["Tonos", "Look natural", "Tips claros", "Seguridad"]
      }
    ];

    const experienceIncludes = [
      ["Orientación sobre tu rutina actual", "Conversamos sobre lo que usas, lo que te preocupa y lo que deseas mejorar."],
      ["Recomendación según tu tipo de piel", "Te oriento con una guía clara para cuidar tu piel de forma sencilla."],
      ["Prueba de texturas y productos", "Te muestro opciones Mary Kay con calma y sin presión."],
      ["Maquillaje natural o express", "Si lo deseas, te ayudo a descubrir tonos y acabados que resalten tu belleza."],
      ["Seguimiento por WhatsApp", "Puedo acompañarte después para resolver dudas y ayudarte a mantener tu rutina."]
    ];

    const processCards = [
      ["Escríbeme por WhatsApp", "Haz clic, envíame el mensaje y coordinamos el mejor espacio para ti."],
      ["Conversamos sobre tu piel", "Te haré preguntas sencillas para entender tu rutina, necesidades y expectativas."],
      ["Vives tu experiencia", "Pruebas, resuelves dudas y sales con una guía clara para cuidar tu piel con constancia."]
    ];

    function FeatureCard({ card, index }) {
      return (
        <motion.article
          className="liquid-glass flex min-h-[290px] flex-col rounded-[1.25rem] p-6"
          initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 * index }}
        >
          <div className="glass-content flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="liquid-glass flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.75rem]">
                <span className="glass-content">{index === 1 ? <HeartIcon /> : <SparkleIcon />}</span>
              </div>
              <div className="flex max-w-[72%] flex-wrap justify-end gap-1.5">
                {card.tags.map((tag) => (
                  <span key={tag} className="liquid-glass rounded-full px-3 py-1 font-body text-[11px] text-white/90 whitespace-nowrap">
                    <span className="glass-content">{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-1" />

            <div className="mt-6">
              <h3 className="font-body text-2xl font-semibold leading-tight text-white md:text-3xl">{card.title}</h3>
              <p className="mt-3 max-w-[34ch] font-body text-[15px] font-normal leading-relaxed text-white/90">{card.body}</p>
            </div>
          </div>
        </motion.article>
      );
    }

    function ProcessTabs() {
      const [active, setActive] = useState(0);

      return (
        <div id="proceso" className="liquid-glass rounded-[1.75rem] p-4 md:p-5">
          <div className="glass-content">
            <div className="grid gap-2 md:grid-cols-3">
              {processCards.map(([title], index) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`rounded-full px-4 py-3 text-left font-body text-sm font-medium ${active === index ? "bg-white text-mary-ink" : "text-white/80"}`}
                >
                  0{index + 1} · {title}
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-[1.25rem] bg-white/10 p-5">
              <p className="font-body text-2xl font-semibold leading-tight text-white">{processCards[active][0]}</p>
              <p className="mt-3 max-w-2xl font-body text-[15px] font-normal leading-relaxed text-white/90">{processCards[active][1]}</p>
            </div>
          </div>
        </div>
      );
    }

    function Details() {
      return (
        <section id="experiencia" className="viewport-fill relative overflow-hidden bg-dark-rose">
          <SoftCrossfadeImage images={[EXPERIENCE_IMAGE, CONSULTATION_IMAGE, BEAUTY_DETAIL_IMAGE]} label="Asesoría personalizada de belleza y piel" />

          <div className="relative z-10 px-5 py-24 md:px-16 md:py-28 lg:px-20 lg:py-32">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.52fr] lg:items-end">
                <motion.header
                  className="max-w-5xl"
                  initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <p className="mb-5 font-body text-sm font-medium text-white/80">// La experiencia</p>
                  <h2 className="font-heading max-w-[15ch] text-5xl italic leading-[0.92] tracking-[-2px] text-white md:text-6xl lg:text-[4.7rem]">
                    ¿Qué puedes vivir en tu experiencia personalizada?
                  </h2>
                  <p className="mt-6 max-w-2xl font-body text-base font-normal leading-relaxed text-white/90 md:text-lg">
                    Cada experiencia la adapto a ti. Te escucho, entiendo tu rutina actual y te ayudo a elegir con más claridad.
                  </p>
                </motion.header>

                <motion.aside
                  className="liquid-glass rounded-[1.5rem] p-5 md:p-6"
                  initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
                >
                  <div className="glass-content">
                    <p className="font-body text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Sin presión de compra</p>
                    <p className="mt-4 font-body text-2xl font-semibold leading-tight text-white">Escucha, prueba y decide con confianza.</p>
                    <p className="mt-3 font-body text-sm font-normal leading-relaxed text-white/90">Te acompaño en una sesión cercana para resolver dudas y encontrar pasos realistas para cuidarte.</p>
                  </div>
                </motion.aside>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {experienceIncludes.map(([title, body], index) => (
                  <motion.article
                    key={title}
                    className="liquid-glass rounded-[1.25rem] p-5"
                    initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
                    whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.07 * index }}
                  >
                    <div className="glass-content">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 font-body text-xs font-semibold text-white/90">0{index + 1}</span>
                      <h3 className="mt-5 font-body text-base font-semibold leading-snug text-white">{title}</h3>
                      <p className="mt-3 font-body text-[15px] font-normal leading-relaxed text-white/90">{body}</p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <a href={WHATSAPP_MAIN} target="_blank" rel="noopener noreferrer" className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-body text-sm font-semibold text-white">
                  <span className="glass-content">Agendar mi experiencia por WhatsApp</span>
                  <ArrowUpRight className="glass-content h-4 w-4" />
                </a>
              </div>

              <div id="opciones" className="mt-14">
                <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="font-body text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Opciones de experiencia</p>
                    <h3 className="mt-3 font-heading text-4xl italic leading-tight text-white md:text-5xl">Elige cómo quieres comenzar.</h3>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {experienceCards.map((card, index) => (
                  <FeatureCard key={card.title} card={card} index={index} />
                ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    function Story() {
      return (
        <section id="maricela" className="viewport-fill soft-section-transition bg-soft-blush px-5 pb-16 pt-16 text-mary-ink md:px-16 md:pb-20 md:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="overflow-hidden rounded-[2rem] bg-white shadow-[0_28px_80px_rgba(232,62,157,0.18)]"
            >
              <img className="h-full min-h-[420px] w-full object-cover" src={MARICELA_IMAGE} alt="Maricela Monchez preparando una asesoría personalizada de belleza" />
            </motion.div>

            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
            >
              <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-mary-pink">Hola, soy Maricela Monchez</p>
              <h2 className="mt-4 max-w-3xl font-heading text-5xl italic leading-[0.9] tracking-[-2px] text-mary-ink md:text-7xl">
                Te acompaño a mirar tu reflejo con más amor y seguridad.
              </h2>
              <p className="mt-6 max-w-2xl font-body text-lg font-normal leading-snug text-mary-muted">
                Soy Consultora de Belleza Independiente Mary Kay y futura directora. Mi propósito es ayudar a mujeres a reconectar con su belleza, su confianza y su amor propio a través de experiencias personalizadas de cuidado de la piel y maquillaje.
              </p>
              <p className="mt-4 max-w-2xl font-body text-base font-normal leading-snug text-mary-muted">
                Más que vender productos, me encanta escuchar, orientar y acompañar a cada mujer para que encuentre una rutina que se adapte a su piel, su tiempo y su estilo de vida.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Consultora de Belleza Independiente Mary Kay", "Futura directora", "WhatsApp 7087-6214", "Usulután / El Salvador"].map((fact) => (
                  <div key={fact} className="rounded-[1.25rem] border border-[rgba(232,62,157,0.18)] bg-white/80 px-4 py-3 font-body text-sm text-mary-ink shadow-[0_14px_34px_rgba(74,18,58,0.08)]">
                    {fact}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      );
    }

    function Opportunity() {
      const pillars = [
        {
          title: "Aprende con acompañamiento",
          text: "No empiezas sola. Te comparto mi experiencia y te explico el camino con cercanía."
        },
        {
          title: "Comparte desde tu historia",
          text: "La oportunidad se vuelve más natural cuando nace de lo que ya vives y amas."
        },
        {
          title: "Construye a tu ritmo",
          text: "Puedes conocer el proceso, resolver dudas y decidir con calma si esto conecta contigo."
        }
      ];

      return (
        <section id="oportunidad" className="viewport-fill relative overflow-hidden bg-dark-rose px-5 py-20 text-white md:px-16 md:py-24 lg:px-20 lg:py-28">
          <img
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.42]"
            src={OPPORTUNITY_IMAGE}
            alt="Maricela Monchez compartiendo reconocimiento en una reunión Mary Kay"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(255,79,174,0.24),transparent_36%),linear-gradient(135deg,rgba(42,11,36,0.95),rgba(74,18,58,0.90)_54%,rgba(100,22,78,0.82))]" />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:gap-14">
            <motion.div {...fadeIn(0.05)}>
              <p className="mb-5 font-body text-sm font-semibold uppercase tracking-[0.18em] text-mary-soft">// Oportunidad Mary Kay</p>
              <h2 className="max-w-[620px] font-heading text-[3.15rem] italic leading-[0.94] tracking-[-2px] text-white sm:text-6xl md:text-[4.35rem] lg:text-[4.6rem]">
                Crecer también puede sentirse femenino, claro y posible.
              </h2>
              <p className="mt-6 max-w-[560px] font-body text-base font-normal leading-relaxed text-white/90">
                Si además de cuidarte te interesa aprender, compartir belleza y construir algo propio, puedo contarte cómo funciona esta oportunidad con honestidad, claridad y sin presión.
              </p>
              <div className="mt-8 flex max-w-xl flex-wrap gap-3">
                {["Ingresos extra", "Crecimiento personal", "Comunidad y liderazgo"].map((item) => (
                  <div key={item} className="liquid-glass rounded-full px-4 py-2.5">
                    <span className="glass-content block whitespace-nowrap font-body text-sm font-medium text-white/95">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={WHATSAPP_OPPORTUNITY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-mary-pink to-mary-vivid px-5 py-3 font-body text-sm font-semibold text-white shadow-[0_18px_45px_rgba(232,62,157,0.35)]">
                  Conocer la oportunidad <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
                <a href={WHATSAPP_MAIN} target="_blank" rel="noopener noreferrer" className="liquid-glass inline-flex items-center justify-center rounded-full px-5 py-3 font-body text-sm font-semibold text-white">
                  Primero quiero mi experiencia
                </a>
              </div>
            </motion.div>

            <motion.div {...fadeIn(0.18)} className="liquid-glass rounded-[2rem] p-6 md:p-8 lg:p-9">
              <div className="glass-content">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-mary-soft">Una ruta para crecer</p>
                <h3 className="mt-4 font-body text-2xl font-semibold leading-tight text-white md:text-[2rem]">
                  ¿Qué puedes encontrar aquí?
                </h3>
                <div className="mt-7 divide-y divide-white/15">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="py-5 first:pt-0 last:pb-0">
                    <h4 className="font-body text-base font-semibold text-white">{pillar.title}</h4>
                    <p className="mt-2 max-w-[48ch] font-body text-[15px] font-normal leading-relaxed text-white/90">{pillar.text}</p>
                  </div>
                ))}
                </div>
                <p className="mt-7 border-t border-white/15 pt-6 font-body text-sm font-medium leading-relaxed text-white/90">
                  La primera conversación no es para convencerte. Es para ayudarte a entender si este camino tiene sentido para ti.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      );
    }

    function Testimonials() {
      const testimonials = [
        {
          name: "Ana Rivera",
          image: asset("mpkg0ezu-ChatGPT-Image-24-may-2026_-05_47_19-p.m.-_2_.webp"),
          focus: "center 48%",
          modalFocus: "center 48%",
          quote: "Me ayudó a entender mejor mi piel y a crear una rutina mucho más sencilla.",
          title: "Ahora entiendo mejor lo que mi piel necesita",
          fullQuote: "Llegué con muchas dudas porque no sabía qué productos usar ni cómo ordenar mi rutina. Maricela me escuchó con paciencia, me explicó cada paso y me ayudó a encontrar una forma más sencilla de cuidar mi piel sin sentirme presionada. Me gustó poder decidir con calma."
        },
        {
          name: "Claudia Morales",
          image: asset("mpkg0f6q-ChatGPT-Image-24-may-2026_-05_47_20-p.m.-_5_.webp"),
          focus: "center 44%",
          modalFocus: "center 47%",
          quote: "Me sentí escuchada y acompañada, sin presión para decidir.",
          title: "Una asesoría donde pude sentirme tranquila",
          fullQuote: "Desde el primer momento sentí que la conversación era sobre mí y no sobre venderme algo. Hablamos de mis hábitos, de lo que quería mejorar en apariencia y de las opciones que podía conocer. La atención de Maricela me dio confianza para elegir a mi ritmo."
        },
        {
          name: "Verónica Pérez",
          image: asset("mpkg0fea-ChatGPT-Image-24-may-2026_-05_47_19-p.m.-_1_.webp"),
          focus: "center 39%",
          modalFocus: "center 47%",
          quote: "Aprendí qué pasos puedo mantener cada día sin complicarme.",
          title: "Una rutina posible para mis días reales",
          fullQuote: "Quería cuidarme mejor, pero me abrumaban las rutinas largas. Maricela me mostró pasos sencillos que puedo integrar a mi día y me orientó con claridad sobre qué probar. Me fui con una rutina comprensible y con ganas de ser constante."
        },
        {
          name: "Karla Hernández",
          image: asset("mpkg8nl6-ChatGPT-Image-24-may-2026_-06_01_14-p.m.-_1_.webp"),
          focus: "center 38%",
          modalFocus: "center 46%",
          quote: "La experiencia fue delicada y cercana. Salí sintiéndome más segura.",
          title: "Un momento para reconectar conmigo",
          fullQuote: "La sesión se sintió como un espacio bonito para cuidarme y volver a mirarme con cariño. Maricela fue muy cercana, explicó cada recomendación sin prisa y me ayudó a sentirme segura con lo que elegí probar. Fue una experiencia cálida y especial."
        },
        {
          name: "Silvia Romero",
          image: asset("mpkg11vk-ChatGPT-Image-24-may-2026_-05_47_20-p.m.-_3_.webp"),
          focus: "center 48%",
          modalFocus: "center 47%",
          quote: "Descubrí opciones de maquillaje natural que se sienten muy yo.",
          title: "Maquillaje natural, pero con intención",
          fullQuote: "Me gusta maquillarme, pero buscaba algo más natural y fácil de repetir. Maricela me ayudó a descubrir tonos y acabados que resaltan mis rasgos sin sentirme disfrazada. Lo mejor fue aprender pequeños detalles que puedo aplicar yo misma."
        },
        {
          name: "Patricia López",
          image: asset("mpkg1m9w-ChatGPT-Image-24-may-2026_-06_01_17-p.m.-_6_.webp"),
          focus: "center 36%",
          modalFocus: "center 45%",
          quote: "Maricela explicó cada opción con calma y mucha honestidad.",
          title: "Elegí con información y sin prisa",
          fullQuote: "Agradecí mucho que Maricela me hablara con honestidad sobre cada opción y respondiera todas mis preguntas. No sentí presión; sentí guía. Eso hizo que la experiencia fuera agradable y que pudiera pensar con claridad en lo que realmente se adapta a mí."
        }
      ];

      const [selectedIndex, setSelectedIndex] = useState(null);
      const [isClosing, setIsClosing] = useState(false);
      const [direction, setDirection] = useState(0);
      const closeButtonRef = useRef(null);
      const lastFocusRef = useRef(null);
      const closeTimerRef = useRef(null);
      const activeTestimonial = selectedIndex === null ? null : testimonials[selectedIndex];

      const openTestimonial = (index) => {
        lastFocusRef.current = document.activeElement;
        setDirection(0);
        setIsClosing(false);
        setSelectedIndex(index);
      };

      const closeTestimonial = () => {
        if (selectedIndex === null || isClosing) return;
        setIsClosing(true);
        if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = window.setTimeout(() => {
          setSelectedIndex(null);
          setIsClosing(false);
          if (lastFocusRef.current) lastFocusRef.current.focus();
        }, 240);
      };

      const changeTestimonial = (step) => {
        setSelectedIndex((currentIndex) => {
          if (currentIndex === null) return currentIndex;
          const nextIndex = currentIndex + step;
          if (nextIndex < 0 || nextIndex >= testimonials.length) return currentIndex;
          setDirection(step);
          return nextIndex;
        });
      };

      useEffect(() => {
        if (selectedIndex === null) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.setTimeout(() => closeButtonRef.current && closeButtonRef.current.focus(), 0);

        const handleKeyDown = (event) => {
          if (event.key === "Escape") {
            closeTestimonial();
          } else if (event.key === "ArrowRight") {
            changeTestimonial(1);
          } else if (event.key === "ArrowLeft") {
            changeTestimonial(-1);
          }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
          document.body.style.overflow = previousOverflow;
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [selectedIndex !== null]);

      useEffect(() => () => {
        if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      }, []);

      return (
        <>
          <section id="testimonios" className="viewport-fill relative overflow-hidden bg-dark-rose px-5 pb-16 pt-16 text-white md:px-16 md:pb-20 md:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
            <img
              className="testimonials-photo"
              src={asset("mpkgdnpi-ChatGPT-Image-19-may-2026_-11_37_26-p.m.-_1_.webp")}
              alt=""
              aria-hidden="true"
            />
            <div className="testimonials-veil" aria-hidden="true"></div>
            <div className="relative z-10 mx-auto max-w-7xl">
              <motion.div {...fadeIn(0)} className="max-w-3xl">
                <p className="mb-5 font-body text-sm font-medium text-white/80">// Confianza real</p>
                <h2 className="font-heading text-5xl italic leading-[0.95] tracking-[-2px] text-white md:text-7xl">
                  Mujeres que ya vivieron su experiencia
                </h2>
                <p className="mt-6 max-w-2xl font-body text-base font-normal leading-relaxed text-white/90 md:text-lg">
                  La confianza empieza cuando te sientes escuchada, orientada y libre de decidir con calma.
                </p>
              </motion.div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <motion.button
                    key={testimonial.name}
                    type="button"
                    onClick={() => openTestimonial(index)}
                    aria-haspopup="dialog"
                    aria-label={`Leer testimonio completo de ${testimonial.name}`}
                    {...fadeIn(0.1 + (index * 0.08))}
                    className="testimonial-card liquid-glass group flex flex-col rounded-[1.5rem] p-2"
                  >
                    <div className="glass-content flex h-full flex-col">
                      <div className="relative overflow-hidden rounded-[1.1rem]">
                        <img
                          src={testimonial.image}
                          alt={`${testimonial.name} durante una experiencia personalizada junto a Maricela Monchez`}
                          className="aspect-[5/4] w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:aspect-[4/3]"
                          style={{ objectPosition: testimonial.focus }}
                          loading="lazy"
                        />
                        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 font-heading text-4xl italic leading-none text-mary-pink shadow-sm" aria-hidden="true">“</span>
                      </div>
                      <p className="flex-1 px-5 pb-0 pt-5 font-body text-[15px] font-normal leading-relaxed text-white md:text-base">
                        {testimonial.quote}
                      </p>
                      <div className="mx-5 mb-5 mt-5 border-t border-white/10 pt-4 font-body">
                        <p className="text-base font-semibold text-white">{testimonial.name}</p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-white/70">Clienta de Maricela</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {activeTestimonial && (
            <div
              className={`testimonial-overlay${isClosing ? " is-closing" : ""}`}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeTestimonial();
              }}
            >
              <div
                className="testimonial-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="testimonial-dialog-title"
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="testimonial-modal-close"
                  onClick={closeTestimonial}
                  aria-label="Cerrar testimonio"
                >
                  <span aria-hidden="true">&times;</span>
                </button>

                <div
                  key={`${activeTestimonial.name}-${direction}`}
                  className={`testimonial-story${direction === 1 ? " is-next" : direction === -1 ? " is-prev" : ""}`}
                >
                  <div className="testimonial-modal-grid">
                    <figure className="testimonial-modal-photo">
                      <img
                        src={activeTestimonial.image}
                        alt={`${activeTestimonial.name} junto a Maricela Monchez durante su experiencia personalizada`}
                        style={{ objectPosition: activeTestimonial.modalFocus }}
                      />
                    </figure>
                    <div className="testimonial-modal-copy text-white">
                      <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-mary-gold">Clienta de Maricela</p>
                      <h3 id="testimonial-dialog-title" className="mt-4 max-w-[15ch] font-heading text-4xl italic leading-[0.94] tracking-[-1px] text-white sm:text-5xl">
                        {activeTestimonial.title}
                      </h3>
                      <p className="mt-5 font-body text-base font-semibold text-white">{activeTestimonial.name}</p>
                      <p className="mt-5 max-w-[46ch] font-body text-base font-normal leading-relaxed text-white/90 md:text-lg">
                        {activeTestimonial.fullQuote}
                      </p>
                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          className="testimonial-nav-button"
                          onClick={() => changeTestimonial(-1)}
                          disabled={selectedIndex === 0}
                          aria-label="Testimonio anterior"
                        >
                          <span aria-hidden="true">&larr;</span> Anterior
                        </button>
                        <button
                          type="button"
                          className="testimonial-nav-button"
                          onClick={() => changeTestimonial(1)}
                          disabled={selectedIndex === testimonials.length - 1}
                          aria-label="Siguiente testimonio"
                        >
                          Siguiente <span aria-hidden="true">&rarr;</span>
                        </button>
                        <p className="ml-auto font-body text-sm text-white/60">
                          {selectedIndex + 1} / {testimonials.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }

    function Conversion() {
      return (
        <section id="agenda" className="viewport-fill bg-dark-rose px-5 pb-28 pt-14 text-white md:px-16 md:pb-32 md:pt-16 lg:px-20 lg:pb-36 lg:pt-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <img
              className="h-full w-full object-cover object-center opacity-55"
              src={AGENDA_IMAGE}
              alt=""
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(248,182,216,0.16),transparent_32%),linear-gradient(110deg,rgba(100,22,78,0.86)_0%,rgba(74,18,58,0.82)_45%,rgba(42,11,36,0.92)_100%)]" />
          </div>
          <div className="relative z-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-6 font-body text-sm font-medium text-white/80">// Agenda en 3 pasos</p>
              <h2 className="font-heading text-6xl italic leading-[0.9] tracking-[-3px] text-white md:text-7xl">
                Sin presión.<br />Con claridad.
              </h2>
              <p className="mt-6 max-w-xl font-body text-base font-normal leading-snug text-white/90">
                No necesitas saber tu tipo de piel ni tener una rutina perfecta. Empezamos conversando y terminas con una guía más clara para cuidarte.
              </p>
            </div>
            <ProcessTabs />
          </div>

          <div className="mx-auto mt-14 grid max-w-7xl gap-8 lg:mt-16 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="liquid-glass rounded-[1.75rem] p-7">
              <div className="glass-content">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Antes de escribir</p>
                <h3 className="mt-4 font-heading text-5xl italic leading-[0.9] text-white">Puedes llegar con dudas.</h3>
                <p className="mt-5 font-body text-[15px] font-normal leading-relaxed text-white/90">
                  No necesitas saber qué producto elegir ni qué rutina seguir. El primer paso es contarme qué te preocupa, qué deseas mejorar en apariencia y cuánto tiempo real tienes para cuidarte.
                </p>
                <a href={WHATSAPP_MAIN} target="_blank" rel="noopener noreferrer" className="liquid-glass-strong mt-7 inline-flex rounded-full px-5 py-2.5 font-body text-sm font-medium text-white">
                  <span className="glass-content flex items-center gap-2">Agendar por WhatsApp <ArrowUpRight /></span>
                </a>
              </div>
            </div>

            <div className="liquid-glass rounded-[1.75rem] p-7">
              <div className="glass-content">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Preguntas frecuentes</p>
                <div className="mt-4 space-y-4">
                  <details className="rounded-[1.1rem] bg-white/10 p-4" open>
                    <summary className="cursor-pointer font-body text-sm font-semibold text-white">¿Me vas a vender productos durante la sesión?</summary>
                    <p className="mt-2 font-body text-[15px] font-normal leading-relaxed text-white/90">La experiencia está pensada para orientarte. Puedo mostrarte productos y darte recomendaciones, pero la decisión siempre es tuya y sin presión.</p>
                  </details>
                  <details className="rounded-[1.1rem] bg-white/10 p-4">
                    <summary className="cursor-pointer font-body text-sm font-semibold text-white">¿Qué pasa si no sé mi tipo de piel?</summary>
                    <p className="mt-2 font-body text-[15px] font-normal leading-relaxed text-white/90">No necesitas saberlo. Conversaremos sobre tu piel, hábitos y necesidades para que pueda guiarte mejor.</p>
                  </details>
                  <details className="rounded-[1.1rem] bg-white/10 p-4">
                    <summary className="cursor-pointer font-body text-sm font-semibold text-white">¿Hay precios públicos?</summary>
                    <p className="mt-2 font-body text-[15px] font-normal leading-relaxed text-white/90">No aquí. Te recomiendo de forma personalizada para evitar compras impulsivas o productos que no se adapten a tu rutina.</p>
                  </details>
                </div>
              </div>
            </div>
          </div>

          <footer className="mx-auto mt-16 grid max-w-7xl gap-8 lg:mt-20 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-14" aria-label="Contacto de Maricela Monchez">
            <div className="max-w-xl">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-mary-soft">Maricela Monchez</p>
              <h3 className="mt-4 font-heading text-5xl italic leading-[0.94] tracking-[-2px] text-white sm:text-6xl">
                Belleza con guía,<br className="hidden sm:block" /> cuidado y confianza.
              </h3>
              <p className="mt-5 max-w-lg font-body text-base font-normal leading-relaxed text-white/90">
                Belleza, cuidado y acompañamiento personalizado para mujeres que desean sentirse más seguras y cuidar su piel con claridad.
              </p>
              <a href={WHATSAPP_MAIN} target="_blank" rel="noopener noreferrer" className="liquid-glass-strong mt-7 inline-flex rounded-full px-5 py-2.5 font-body text-sm font-medium text-white">
                <span className="glass-content flex items-center gap-2">Agendar por WhatsApp <ArrowUpRight /></span>
              </a>
            </div>

            <div className="liquid-glass w-full rounded-[1.5rem] p-5 sm:p-6 lg:w-[390px]">
              <div className="glass-content">
                  <p className="font-body text-sm font-semibold text-white">Maricela Monchez</p>
                  <p className="mt-1 font-body text-sm font-normal text-white/75">Consultora de Belleza Independiente Mary Kay</p>
                  <dl className="mt-6 space-y-4 border-t border-white/15 pt-5 font-body text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-white/60">Instagram</dt>
                      <dd className="font-medium text-white">@maricelamonchez</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-white/60">WhatsApp</dt>
                      <dd className="font-medium text-white">7087-6214</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-white/60">Ubicación</dt>
                      <dd className="text-right font-medium text-white">Usulután, El Salvador</dd>
                    </div>
                  </dl>
              </div>
            </div>
          </footer>
          </div>
        </section>
      );
    }

    function AuthorCredit() {
      return (
        <div className="bg-mary-deep px-5 pb-16 pt-3 sm:pb-14" aria-label="Autoría del sitio">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 border-t border-white/10 pt-4">
            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-white/20 sm:block" aria-hidden="true"></span>
            <a
              href="https://elevium.sv"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-1.5 text-white transition-colors duration-300 hover:text-mary-pink focus-visible:text-mary-pink focus-visible:outline-none"
            >
              <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em]">Landing page by</span>
              <span className="font-heading text-lg italic tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-mary-pink group-focus-visible:text-mary-pink">Elevium</span>
              <span className="font-body text-[11px] font-medium tracking-[0.16em]">© 2026</span>
            </a>
            <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-white/20 sm:block" aria-hidden="true"></span>
          </div>
        </div>
      );
    }

    function App() {
      return (
        <>
          <Navbar />
          <Hero />
          <Details />
          <Story />
          <Opportunity />
          <Testimonials />
          <Conversion />
          <AuthorCredit />
          <a
            href={WHATSAPP_MAIN}
            className="whatsapp-float"
            aria-label="Agendar por WhatsApp con Maricela"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="whatsapp-float-icon"><WhatsAppIcon /></span>
            <span>Agendar</span>
          </a>
        </>
      );
    }


export default App;



