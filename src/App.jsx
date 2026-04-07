import { useState, useEffect, useRef } from "react";

const LINKEDIN = "https://www.linkedin.com/in/thiagospabc/";
const GITHUB = "https://github.com/Thiago-spba";
const EMAIL = "thiagofernando_sp@yahoo.com.br";
const ALURA = "https://cursos.alura.com.br/user/thiagofernando-sp";
const OLLO = "https://olloapp.com.br";

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Outfit:wght@300;400;500;600;700;800&display=swap');

:root {
  --navy: #07111f;
  --navy2: #0b1929;
  --navy3: #0f2040;
  --blue: #1a6cff;
  --blue2: #4d8fff;
  --amber: #f5a623;
  --amber2: #ffd166;
  --text: #e2eaf5;
  --text2: #8099b8;
  --border: rgba(26,108,255,0.12);
  --border2: rgba(26,108,255,0.28);
}

* { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }

body {
  background: var(--navy);
  color: var(--text);
  font-family: 'Outfit', sans-serif;
  overflow-x: hidden;
}

body::before {
  content:'';
  position:fixed; top:0; left:0; right:0; bottom:0;
  background-image:
    linear-gradient(rgba(26,108,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26,108,255,0.04) 1px, transparent 1px),
    linear-gradient(rgba(26,108,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26,108,255,0.015) 1px, transparent 1px);
  background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
  pointer-events:none; z-index:0;
}

/* ── SCROLL REVEAL ── */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-left {
  opacity: 0;
  transform: translateX(-32px);
  transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
}
.reveal-left.visible { opacity:1; transform:translateX(0); }
.reveal-right {
  opacity: 0;
  transform: translateX(32px);
  transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
}
.reveal-right.visible { opacity:1; transform:translateX(0); }

/* NAV */
nav {
  position:fixed; top:0; left:0; right:0; z-index:200;
  background:rgba(7,17,31,0.92);
  backdrop-filter:blur(16px);
  border-bottom:1px solid var(--border2);
  display:flex; align-items:center; justify-content:space-between;
  padding:0 clamp(1.5rem,5vw,4rem); height:64px;
  transition: box-shadow .3s;
}
nav.scrolled { box-shadow: 0 4px 32px rgba(26,108,255,0.08); }
.logo {
  font-family:'DM Mono',monospace;
  font-size:1rem; color:var(--text); text-decoration:none; letter-spacing:1px;
}
.logo em { color:var(--amber); font-style:normal; }
nav ul { list-style:none; display:flex; gap:2rem; }
nav ul li a {
  font-size:.85rem; font-weight:500; color:var(--text2);
  text-decoration:none; transition:color .2s; letter-spacing:.3px;
  position: relative; padding-bottom: 2px;
}
nav ul li a::after {
  content:''; position:absolute; bottom:0; left:0; right:0;
  height:1px; background:var(--amber);
  transform:scaleX(0); transition:transform .25s;
}
nav ul li a:hover { color:var(--amber); }
nav ul li a:hover::after { transform:scaleX(1); }

.nav-cta {
  font-family:'DM Mono',monospace; font-size:.72rem; letter-spacing:1px;
  padding:.5rem 1.2rem; background:var(--blue); color:#fff;
  border:none; text-decoration:none; transition:all .25s; cursor:pointer;
}
.nav-cta:hover { background:var(--blue2); box-shadow: 0 0 20px rgba(26,108,255,.4); }

/* HERO */
.hero {
  position:relative; z-index:1;
  min-height:100vh; display:grid;
  grid-template-columns:1.1fr 1fr;
  align-items:center; gap:4rem;
  padding:100px clamp(1.5rem,5vw,4rem) 60px;
  max-width:1140px; margin:0 auto;
}
.hero-label {
  font-family:'DM Mono',monospace; font-size:.72rem;
  color:var(--amber); letter-spacing:3px; text-transform:uppercase;
  margin-bottom:1.2rem;
  display:flex; align-items:center; gap:.8rem;
  opacity:0; animation:fadeUp .6s forwards .1s;
}
.hero-label::before { content:''; display:block; width:28px; height:1px; background:var(--amber); }

/* HERO NAME */
.hero-name {
  font-size:clamp(2.8rem,6vw,5.5rem);
  font-weight:800; line-height:1.05;
  color:var(--text); margin-bottom:1.2rem;
  opacity:0; animation:fadeUp .7s forwards .2s;
}
.hero-name span { color:var(--blue2); }

.hero-sub {
  font-size:1.05rem; font-weight:400; color:var(--text2);
  line-height:1.8; max-width:500px; margin-bottom:1rem;
  opacity:0; animation:fadeUp .7s forwards .35s;
}
.hero-sub strong { color:var(--text); font-weight:600; }
.hero-stack {
  font-family:'DM Mono',monospace; font-size:.75rem;
  color:var(--blue2); letter-spacing:1.5px; margin-bottom:2rem;
  opacity:0; animation:fadeUp .7s forwards .45s;
}
.hero-btns {
  display:flex; gap:1rem; flex-wrap:wrap;
  opacity:0; animation:fadeUp .7s forwards .55s;
}

.btn-primary {
  font-family:'DM Mono',monospace; font-size:.78rem; letter-spacing:1px;
  padding:.85rem 1.8rem; background:var(--blue); color:#fff;
  border:none; cursor:pointer; text-decoration:none;
  transition:all .25s; position:relative; overflow:hidden;
}
.btn-primary::before {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
  transform:translateX(-100%); transition:transform .4s;
}
.btn-primary:hover::before { transform:translateX(100%); }
.btn-primary:hover { background:var(--blue2); transform:translateY(-2px); box-shadow:0 8px 24px rgba(26,108,255,.4); }

.btn-outline {
  font-family:'DM Mono',monospace; font-size:.78rem; letter-spacing:1px;
  padding:.85rem 1.8rem; background:transparent; color:var(--text2);
  border:1px solid var(--border2); cursor:pointer; text-decoration:none; transition:all .25s;
}
.btn-outline:hover { border-color:var(--amber); color:var(--amber); transform:translateY(-2px); }

/* PHOTO */
.hero-photo {
  display:flex; justify-content:center; align-items:center;
  opacity:0; animation:fadeIn .9s forwards .5s;
}
.photo-frame {
  position:relative; width:clamp(220px,26vw,320px); aspect-ratio:1;
}
.photo-frame img {
  width:100%; height:100%; object-fit:cover;
  clip-path:polygon(10% 0%,100% 0%,100% 90%,90% 100%,0% 100%,0% 10%);
  display:block; filter:grayscale(15%);
  transition: filter .3s;
}
.photo-frame:hover img { filter:grayscale(0%); }
.photo-frame::before {
  content:''; position:absolute;
  top:14px; left:14px; right:-14px; bottom:-14px;
  border:1px solid var(--blue);
  clip-path:polygon(10% 0%,100% 0%,100% 90%,90% 100%,0% 100%,0% 10%);
  z-index:-1; opacity:.4;
  transition: opacity .3s;
}
.photo-frame:hover::before { opacity:.8; }
.photo-frame::after {
  content:''; position:absolute;
  top:-8px; left:-8px; right:8px; bottom:8px;
  border:1px solid var(--amber);
  clip-path:polygon(10% 0%,100% 0%,100% 90%,90% 100%,0% 100%,0% 10%);
  z-index:-1; opacity:.25;
  transition: opacity .3s;
}
.photo-frame:hover::after { opacity:.6; }
.photo-badge {
  position:absolute; bottom:-1rem; right:-1rem;
  background:var(--amber); color:var(--navy);
  font-family:'DM Mono',monospace; font-size:.62rem;
  padding:.45rem 1rem; letter-spacing:1px; font-weight:600;
  animation: pulse 2.5s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(245,166,35,.4); }
  50% { box-shadow: 0 0 0 8px rgba(245,166,35,0); }
}
.photo-placeholder {
  width:100%; height:100%;
  clip-path:polygon(10% 0%,100% 0%,100% 90%,90% 100%,0% 100%,0% 10%);
  background:var(--navy3);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.5rem;
  border:1px solid var(--border2);
}
.photo-placeholder span { font-family:'DM Mono',monospace; font-size:.65rem; color:var(--text2); letter-spacing:1px; text-align:center; padding:0 1rem; }

/* STATS BAR */
.stats-bar {
  position:relative; z-index:1;
  background:var(--navy2); border-top:1px solid var(--border2); border-bottom:1px solid var(--border2);
  padding:1.5rem clamp(1.5rem,5vw,4rem);
}
.stats-inner {
  max-width:1140px; margin:0 auto;
  display:flex; justify-content:space-around; flex-wrap:wrap; gap:1.5rem;
}
.stat { text-align:center; }
.stat-num {
  font-family:'DM Mono',monospace; font-size:1.6rem; font-weight:500;
  color:var(--amber); display:block; letter-spacing:1px;
}
.stat-label { font-size:.78rem; color:var(--text2); letter-spacing:.5px; }

/* SECTIONS */
section {
  position:relative; z-index:1;
  padding:90px clamp(1.5rem,5vw,4rem);
  max-width:1140px; margin:0 auto;
}
.sec-eyebrow {
  font-family:'DM Mono',monospace; font-size:.68rem;
  color:var(--amber); letter-spacing:3px; text-transform:uppercase;
  display:flex; align-items:center; gap:.8rem; margin-bottom:.6rem;
}
.sec-eyebrow::before { content:''; display:block; width:24px; height:1px; background:var(--amber); }
.sec-heading {
  font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:700;
  color:var(--text); margin-bottom:2.5rem; line-height:1.1;
}
.sec-heading em { color:var(--blue2); font-style:normal; }

/* ABOUT */
.about-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:4rem; align-items:start; }
.about-text p { color:var(--text2); line-height:1.85; font-size:1rem; margin-bottom:1rem; }
.about-text strong { color:var(--text); }

.journey {
  background:var(--navy2); border:1px solid var(--border); padding:1.8rem;
}
.journey h4 {
  font-family:'DM Mono',monospace; font-size:.65rem;
  color:var(--amber); letter-spacing:2px; margin-bottom:1.2rem;
}
.jstep {
  display:flex; gap:1rem; align-items:flex-start; margin-bottom:1rem;
  transition: transform .2s;
}
.jstep:hover { transform: translateX(4px); }
.jnum {
  font-family:'DM Mono',monospace; font-size:.62rem;
  background:var(--amber); color:var(--navy);
  padding:.2rem .5rem; min-width:28px; text-align:center; flex-shrink:0; font-weight:600;
}
.jtext { font-size:.9rem; color:var(--text2); line-height:1.55; }
.jtext strong { color:var(--text); }

/* SKILLS */
.skills-grid {
  display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1.2rem; margin-top:3rem;
}
.skill-block {
  background:var(--navy2); border:1px solid var(--border); padding:1.3rem;
  transition:border-color .2s, transform .2s, box-shadow .2s;
}
.skill-block:hover {
  border-color:var(--border2);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(26,108,255,.1);
}
.skill-block h4 {
  font-family:'DM Mono',monospace; font-size:.62rem;
  color:var(--amber); letter-spacing:2px; margin-bottom:.9rem;
}
.tag {
  display:inline-block; font-size:.78rem; font-weight:500;
  padding:.28rem .7rem; margin:.2rem;
  background:rgba(26,108,255,.08); border:1px solid var(--border2);
  color:var(--text2); transition:all .2s;
}
.tag:hover { color:var(--text); border-color:var(--blue2); background:rgba(26,108,255,.15); transform:scale(1.05); }

/* FORMATION */
.form-list { display:flex; flex-direction:column; gap:.9rem; }
.form-item {
  display:grid; grid-template-columns:1fr auto; align-items:center; gap:1rem;
  padding:1.2rem 1.5rem;
  background:var(--navy2); border:1px solid var(--border);
  border-left:3px solid var(--blue); transition:all .3s;
}
.form-item:hover { border-left-color:var(--amber); border-color:var(--border2); transform:translateX(4px); }
.form-deg { font-size:1rem; font-weight:600; color:var(--text); }
.form-inst { font-family:'DM Mono',monospace; font-size:.62rem; color:var(--text2); margin-top:.25rem; letter-spacing:.4px; }
.fbadge {
  font-family:'DM Mono',monospace; font-size:.6rem;
  padding:.3rem .75rem; border:1px solid; white-space:nowrap;
}
.fbadge.on { border-color:var(--blue); color:var(--blue); background:rgba(26,108,255,.08); }
.fbadge.off { border-color:var(--border2); color:var(--text2); }

/* PROJECTS */
.proj-tabs {
  display:flex; gap:.6rem; flex-wrap:wrap; margin-bottom:2rem;
}
.ptab {
  font-family:'DM Mono',monospace; font-size:.68rem; letter-spacing:1px;
  padding:.5rem 1.1rem; border:1px solid var(--border2);
  background:transparent; color:var(--text2); cursor:pointer; transition:all .2s;
}
.ptab.on { background:var(--blue); border-color:var(--blue); color:#fff; }
.ptab:hover:not(.on) { border-color:var(--amber); color:var(--amber); }

.proj-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:1.5rem; }
.proj-card {
  background:var(--navy2); border:1px solid var(--border);
  padding:1.8rem; display:flex; flex-direction:column; gap:1rem;
  transition:all .35s cubic-bezier(.22,1,.36,1); position:relative; overflow:hidden;
  cursor: default;
}
.proj-card::before {
  content:''; position:absolute; top:0; left:0; right:0; bottom:0;
  background:radial-gradient(circle at 50% 0%, rgba(26,108,255,.06), transparent 70%);
  opacity:0; transition:opacity .35s;
}
.proj-card::after {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg,var(--blue),var(--amber));
  transform:scaleX(0); transform-origin:left; transition:transform .35s;
}
.proj-card:hover { transform:translateY(-6px); border-color:var(--border2); box-shadow:0 16px 40px rgba(7,17,31,.8); }
.proj-card:hover::after { transform:scaleX(1); }
.proj-card:hover::before { opacity:1; }
.proj-tag {
  display:inline-block; font-family:'DM Mono',monospace; font-size:.62rem;
  letter-spacing:1px; padding:.25rem .65rem;
  background:rgba(245,166,35,.1); border:1px solid rgba(245,166,35,.3); color:var(--amber);
}
.proj-card h3 { font-size:1.1rem; font-weight:700; color:var(--text); }
.proj-card p { font-size:.92rem; color:var(--text2); line-height:1.7; flex:1; }
.proj-stack { display:flex; flex-wrap:wrap; gap:.4rem; }
.stag {
  font-family:'DM Mono',monospace; font-size:.62rem;
  padding:.2rem .55rem; background:rgba(26,108,255,.1);
  border:1px solid var(--border2); color:var(--blue2);
  transition: all .2s;
}
.stag:hover { background:rgba(26,108,255,.2); color:var(--text); }
.proj-links { display:flex; gap:.5rem; }
.plink {
  font-family:'DM Mono',monospace; font-size:.65rem;
  color:var(--text2); text-decoration:none;
  border:1px solid var(--border2); padding:.3rem .7rem; transition:all .2s;
}
.plink:hover { color:var(--amber); border-color:var(--amber); transform:translateY(-1px); }
.plink-private {
  font-family:'DM Mono',monospace; font-size:.65rem;
  color:var(--text2); border:1px solid var(--border); padding:.3rem .7rem;
  cursor:default; opacity:.6;
}

/* CERTIFICATES */
.cert-bar { display:flex; gap:.8rem; flex-wrap:wrap; margin-bottom:1.5rem; align-items:center; }
.cert-input {
  font-family:'DM Mono',monospace; font-size:.78rem;
  background:var(--navy2); border:1px solid var(--border2);
  color:var(--text); padding:.65rem 1rem; outline:none; flex:1; min-width:200px; transition:border-color .2s;
}
.cert-input:focus { border-color:var(--amber); }
.cert-input::placeholder { color:var(--text2); }
.cfilt {
  font-family:'DM Mono',monospace; font-size:.62rem;
  padding:.5rem 1rem; border:1px solid var(--border);
  background:transparent; color:var(--text2); cursor:pointer; transition:all .2s; letter-spacing:.4px;
}
.cfilt.on { border-color:var(--amber); color:var(--amber); background:rgba(245,166,35,.07); }
.cfilt:hover { border-color:var(--amber); color:var(--amber); }
.cert-count { font-family:'DM Mono',monospace; font-size:.68rem; color:var(--text2); white-space:nowrap; }
.cert-count b { color:var(--amber); }
.cert-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:1rem; }
.ccard {
  background:var(--navy2); border:1px solid var(--border);
  padding:1.2rem 1.2rem 1.2rem 1.4rem;
  border-left:2px solid transparent; transition:all .25s;
}
.ccard:hover { border-left-color:var(--blue2); border-color:var(--border2); transform:translateX(4px); }
.ccat { font-family:'DM Mono',monospace; font-size:.58rem; color:var(--blue2); letter-spacing:2px; margin-bottom:.35rem; }
.ccard h4 { font-size:.9rem; font-weight:600; color:var(--text); line-height:1.3; margin-bottom:.35rem; }
.cmeta { font-family:'DM Mono',monospace; font-size:.6rem; color:var(--text2); }

/* CONTACT */
.contact-layout { display:grid; grid-template-columns:1fr 1fr; gap:4rem; }
.contact-text h3 { font-size:1.6rem; font-weight:700; margin-bottom:1rem; color:var(--text); }
.contact-text p { color:var(--text2); line-height:1.85; font-size:1rem; margin-bottom:2rem; }
.clinks { display:flex; flex-direction:column; gap:.7rem; }
.clink {
  display:flex; align-items:center; gap:1.1rem;
  padding:.9rem 1.2rem; background:var(--navy2); border:1px solid var(--border);
  color:var(--text2); text-decoration:none; font-size:.88rem; transition:all .25s;
}
.clink:hover { border-color:var(--amber); color:var(--amber2); transform:translateX(4px); }
.ci { width:20px; text-align:center; font-size:1rem; }

.why-box {
  background:var(--navy2); border:1px solid var(--border);
  padding:2rem; border-top:3px solid var(--amber);
}
.why-box h4 { font-family:'DM Mono',monospace; font-size:.65rem; color:var(--amber); letter-spacing:2px; margin-bottom:1.5rem; }
.wi { display:flex; gap:1rem; margin-bottom:1.3rem; align-items:flex-start; transition:transform .2s; }
.wi:hover { transform:translateX(4px); }
.wn { font-family:'DM Mono',monospace; font-size:.62rem; background:var(--amber); color:var(--navy); padding:.2rem .5rem; flex-shrink:0; font-weight:600; }
.wt h5 { font-weight:600; font-size:.95rem; margin-bottom:.2rem; color:var(--text); }
.wt p { font-size:.85rem; color:var(--text2); line-height:1.55; margin:0; }

footer {
  position:relative; z-index:1; text-align:center; padding:2.5rem;
  border-top:1px solid var(--border);
  font-family:'DM Mono',monospace; font-size:.65rem; color:var(--text2); letter-spacing:1.5px;
}
footer span { color:var(--amber); }

/* Cursor dot */
.cursor-dot {
  width:6px; height:6px; background:var(--amber);
  border-radius:50%; position:fixed; pointer-events:none;
  z-index:9999; transform:translate(-50%,-50%);
  transition:width .2s, height .2s, opacity .2s;
}
.cursor-ring {
  width:32px; height:32px;
  border:1px solid rgba(245,166,35,.4);
  border-radius:50%; position:fixed; pointer-events:none;
  z-index:9998; transform:translate(-50%,-50%);
  transition:width .3s, height .3s, border-color .3s;
}

@keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }

@media(max-width:768px){
  .hero { grid-template-columns:1fr; gap:2.5rem; }
  .hero-photo { order:-1; }
  .about-grid, .contact-layout { grid-template-columns:1fr; }
  nav ul { display:none; }
  .nav-cta { display:none; }
  .cursor-dot, .cursor-ring { display:none; }
}
`;

const formation = [
  {
    deg: "Engenharia da Computação",
    inst: "Centro Universitário Celso Lisboa",
    s: "on",
    l: "Cursando · 5º Semestre",
  },
  {
    deg: "Licenciatura em Matemática",
    inst: "Centro Universitário Ítalo Brasileiro",
    s: "off",
    l: "Concluída · 2025",
  },
  {
    deg: "Licenciatura em História",
    inst: "Centro Universitário Anhanguera Pitágoras AMPLI",
    s: "off",
    l: "Concluída · 2024",
  },
  {
    deg: "Pós-Graduação em Metodologia de Ensino de História",
    inst: "Faculdade Focus",
    s: "off",
    l: "Concluída · 2024",
  },
];

const skills = {
  "Front-End": [
    "React.js",
    "Vite",
    "JavaScript ES6+",
    "HTML5 Semântico",
    "CSS3",
    "Tailwind CSS",
    "Styled Components",
  ],
  "Back-End": [
    "Java",
    "Spring Boot",
    "Spring Security",
    "Node.js",
    "Firebase",
    "REST APIs",
  ],
  "Banco de Dados": ["SQL / MySQL", "MongoDB", "Firestore", "JDBC"],
  "DevOps & Cloud": ["Git", "GitHub", "AWS", "Oracle Cloud", "Linux", "CI/CD"],
  Outros: ["Figma", "Acessibilidade WCAG", "SEO", "PWA", "Cibersegurança"],
};

const allProjects = [
  {
    cat: "front-end",
    tag: "FULL-STACK · EM PRODUÇÃO",
    name: "OLLO — Marketplace Social com Afiliados",
    desc: "App real em produção com usuários ativos, desenvolvido solo nos fins de semana. Marketplace social com curadoria de produtos Shopee, autenticação completa, banco NoSQL em tempo real e push notifications com VAPID/FCM.",
    stack: ["React", "Vite", "Tailwind CSS", "Firebase", "Firestore", "PWA"],
    demo: OLLO,
    repo: null,
    repoLabel: "PRIVADO",
  },
  {
    cat: "front-end",
    tag: "FRONT-END · IA",
    name: "Dashboard Tisanaria — BI com IA",
    desc: "Sistema de Business Intelligence para negócio real. Dashboard interativo com React, Tailwind CSS e integração com IA via Gemini API para relatórios e recomendações dinâmicas.",
    stack: ["React", "Tailwind CSS", "Gemini API", "BI"],
    demo: "https://github.com/Thiago-spba/dashboard-tisanaria-react",
    repo: "https://github.com/Thiago-spba/dashboard-tisanaria-react",
  },
  {
    cat: "front-end",
    tag: "FRONT-END · PWA",
    name: "OlloApp Engineering Lab — Portal Educacional",
    desc: "Portal educacional interativo do ecossistema OLLO, com módulos de Eletrônica Digital, Circuitos Elétricos e Redes de Computadores. Conteúdo gratuito, sem cadastro, com quizzes e linha do tempo histórica.",
    stack: ["HTML5", "Tailwind CSS", "JavaScript", "Firebase", "PWA"],
    demo: "https://edu.olloapp.com.br",
    repo: "https://github.com/Thiago-spba/App-OLLO",
  },
  {
    cat: "front-end",
    tag: "EXTENSÃO UNIVERSITÁRIA",
    name: "Calculadora de Tempo de Tela",
    desc: "Projeto de Extensão Universitária para conscientização sobre saúde digital. Calcula e visualiza o uso de dispositivos eletrônicos com foco em educação preventiva e acessibilidade.",
    stack: ["HTML5", "CSS3", "JavaScript", "UX"],
    demo: "https://github.com/Thiago-spba/calculadora-tempo-tela",
    repo: "https://github.com/Thiago-spba/calculadora-tempo-tela",
  },
  {
    cat: "front-end",
    tag: "FRONT-END · WCAG",
    name: "EcoConecta — Portal de Sustentabilidade",
    desc: "Portal com foco em Acessibilidade WCAG, HTML semântico e SEO. Demonstra capacidade de construir interfaces inclusivas e performáticas.",
    stack: ["HTML5 Semântico", "CSS3", "JavaScript", "WCAG", "SEO"],
    demo: "https://eco-conecta-sigma.vercel.app/",
    repo: "https://github.com/Thiago-spba/EcoConecta",
  },
  {
    cat: "front-end",
    tag: "FRONT-END · p5.js",
    name: "Jogo Geométrico Interativo",
    desc: "Jogo web interativo com gráficos gerados pela biblioteca p5.js. Demonstra criatividade técnica e uso de bibliotecas JavaScript além do básico.",
    stack: ["JavaScript", "p5.js", "HTML5 Canvas", "CSS3"],
    demo: "https://github.com/Thiago-spba/Jogo-Geom-trico",
    repo: "https://github.com/Thiago-spba/Jogo-Geom-trico",
  },
  {
    cat: "back-end",
    tag: "BACK-END · JAVA",
    name: "OlloApp Board Manager — Kanban",
    desc: "Sistema de gerenciamento de quadros Kanban em Java. Boards, colunas e cards com foco em Clean Code e organização de fluxos de trabalho.",
    stack: ["Java", "OOP", "Kanban", "Clean Code"],
    demo: null,
    repo: "https://github.com/Thiago-spba/olloapp-board-manager",
  },
  {
    cat: "back-end",
    tag: "BACK-END · JAVA",
    name: "Sudoku em Java — Git Flow & Clean Code",
    desc: "Implementação do Sudoku com foco em boas práticas: Git Flow, Clean Code e Javadoc. Demonstra maturidade no processo de desenvolvimento.",
    stack: ["Java", "Git Flow", "Clean Code", "Javadoc"],
    demo: null,
    repo: "https://github.com/Thiago-spba/sudoku",
  },
  {
    cat: "back-end",
    tag: "BACK-END · JAVA",
    name: "Design Patterns — Strategy em Java",
    desc: "Padrão Strategy para cálculo de fretes. Desafio do Bootcamp DIO com foco em padrões de projeto GoF.",
    stack: ["Java", "Design Patterns", "Strategy", "GoF"],
    demo: null,
    repo: "https://github.com/Thiago-spba/lab-padroes-projeto-java",
  },
  {
    cat: "back-end",
    tag: "BACK-END · JAVA · POO",
    name: "Abstraindo um Bootcamp com POO",
    desc: "Abstração de um Bootcamp usando os 4 pilares de OOP: Abstração, Encapsulamento, Herança e Polimorfismo.",
    stack: ["Java", "OOP", "Herança", "Polimorfismo", "Abstração"],
    demo: null,
    repo: "https://github.com/Thiago-spba/desafio-poo-dio",
  },
];

const PROJ_CATS = [
  { id: "todos", label: "TODOS" },
  { id: "front-end", label: "FRONT-END" },
  { id: "back-end", label: "BACK-END · JAVA" },
];

const certs = [
  {
    n: "Fundamentos da Linguagem Java",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Sintaxe Básica com Java",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Estruturas de Controle em Java",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Programação Orientada a Objetos em Java",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Herança e Polimorfismo em Java",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Interfaces e Lambda em Java",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Coleções e Stream API em Java",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Debugging e Tratamento de Exceções em Java",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Gerenciando Dependências com Maven e Gradle",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Introdução ao Spring Boot",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "API REST com Spring Web e Swagger",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Spring Security: Segurança em APIs REST",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Design Patterns com Java e Spring (GoF)",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Board de Tarefas com Java",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Criando um Jogo do Sudoku em Java",
    c: "JAVA · BACK-END",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "JDBC: Persistência de Dados com Java",
    c: "BANCO DE DADOS",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Introdução a Banco de Dados Relacionais (SQL)",
    c: "BANCO DE DADOS",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Introdução ao MongoDB e NoSQL",
    c: "BANCO DE DADOS",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Integração Java com Banco de Dados",
    c: "BANCO DE DADOS",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "SQL com MySQL: Manipular e Consultar Dados",
    c: "BANCO DE DADOS",
    s: "Alura / Oracle ONE",
    y: "2025",
  },
  {
    n: "SQL Avançado: Procedures e Administração",
    c: "BANCO DE DADOS",
    s: "Alura / Oracle ONE",
    y: "2025",
  },
  {
    n: "Introdução ao Conceito de Cloud (AWS)",
    c: "AWS · CLOUD",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Infraestrutura Global AWS",
    c: "AWS · CLOUD",
    s: "DIO / Santander",
    y: "2026",
  },
  { n: "Computação em AWS", c: "AWS · CLOUD", s: "DIO / Santander", y: "2026" },
  { n: "Redes em AWS", c: "AWS · CLOUD", s: "DIO / Santander", y: "2026" },
  {
    n: "Armazenamento e Banco de Dados AWS",
    c: "AWS · CLOUD",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Oracle Cloud Infrastructure: Deploy na Nuvem",
    c: "AWS · CLOUD",
    s: "Alura / Oracle ONE",
    y: "2025",
  },
  {
    n: "Fundamentos de Cibersegurança",
    c: "CIBERSEGURANÇA",
    s: "DIO / Santander",
    y: "2025",
  },
  {
    n: "Fundamentos de Pentest",
    c: "CIBERSEGURANÇA",
    s: "DIO / Santander",
    y: "2025",
  },
  {
    n: "Técnicas de Varredura de Rede",
    c: "CIBERSEGURANÇA",
    s: "DIO / Santander",
    y: "2025",
  },
  {
    n: "Exploração de Vulnerabilidades",
    c: "CIBERSEGURANÇA",
    s: "DIO / Santander",
    y: "2025",
  },
  {
    n: "Man in the Middle: Ataques e Mitigações",
    c: "CIBERSEGURANÇA",
    s: "DIO / Santander",
    y: "2025",
  },
  {
    n: "Fundamentos de Redes de Computadores",
    c: "CIBERSEGURANÇA",
    s: "DIO / Santander",
    y: "2025",
  },
  {
    n: "Lógica de Programação com JavaScript",
    c: "FRONT-END · REACT",
    s: "Alura / Oracle ONE",
    y: "2024",
  },
  {
    n: "HTML e CSS: Fundamentos e Responsividade",
    c: "FRONT-END · REACT",
    s: "Alura / Oracle ONE",
    y: "2024",
  },
  {
    n: "JavaScript para Web: Páginas Dinâmicas",
    c: "FRONT-END · REACT",
    s: "Alura / Oracle ONE",
    y: "2024",
  },
  {
    n: "JavaScript: Consumindo APIs",
    c: "FRONT-END · REACT",
    s: "Alura / Oracle ONE",
    y: "2024",
  },
  {
    n: "React: Componentes, Hooks e Router",
    c: "FRONT-END · REACT",
    s: "Alura / Oracle ONE",
    y: "2024",
  },
  {
    n: "React: Context API e Estados Globais",
    c: "FRONT-END · REACT",
    s: "Alura / Oracle ONE",
    y: "2024",
  },
  {
    n: "Git e GitHub: Colaborando em Projetos",
    c: "FRONT-END · REACT",
    s: "Alura / Oracle ONE",
    y: "2024",
  },
  {
    n: "Contribuindo em Projetos Open Source",
    c: "FRONT-END · REACT",
    s: "DIO / Santander",
    y: "2026",
  },
  {
    n: "Linux: Gerenciamento de Arquivos e Processos",
    c: "DEVOPS · LINUX",
    s: "Alura / Oracle ONE",
    y: "2025",
  },
  {
    n: "Linux: Scripts de Monitoramento",
    c: "DEVOPS · LINUX",
    s: "Alura / Oracle ONE",
    y: "2025",
  },
  {
    n: "DevOps: Conceitos e Scripts no Linux CLI",
    c: "DEVOPS · LINUX",
    s: "Alura / Oracle ONE",
    y: "2025",
  },
  {
    n: "Redes: Conceitos e Projetos com VLANs",
    c: "DEVOPS · LINUX",
    s: "Alura / Oracle ONE",
    y: "2025",
  },
  {
    n: "Python para Dados: Primeiros Passos",
    c: "IA · PYTHON",
    s: "Alura / Oracle ONE",
    y: "2025",
  },
  {
    n: "Análise de Dados com Python e ChatGPT",
    c: "IA · PYTHON",
    s: "Alura / Oracle ONE",
    y: "2025",
  },
  {
    n: "GPT e Python: Criando Ferramentas com a API",
    c: "IA · PYTHON",
    s: "Alura / Oracle ONE",
    y: "2025",
  },
  {
    n: "Inteligência Artificial e UX",
    c: "IA · PYTHON",
    s: "Alura / Oracle ONE",
    y: "2025",
  },
];

const CERT_CATS = [
  "TODOS",
  "JAVA · BACK-END",
  "BANCO DE DADOS",
  "AWS · CLOUD",
  "CIBERSEGURANÇA",
  "FRONT-END · REACT",
  "DEVOPS · LINUX",
  "IA · PYTHON",
];

// Hook para scroll reveal
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", dir = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const cls =
    dir === "left"
      ? "reveal-left"
      : dir === "right"
        ? "reveal-right"
        : "reveal";
  return (
    <div
      ref={ref}
      className={`${cls} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : {}}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [projCat, setProjCat] = useState("todos");
  const [certCat, setCertCat] = useState("TODOS");
  const [certQ, setCertQ] = useState("");
  const [imgError, setImgError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorRing, setCursorRing] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let rafId;
    let ringX = 0,
      ringY = 0;
    const onMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        ringX += (e.clientX - ringX) * 0.12;
        ringY += (e.clientY - ringY) * 0.12;
        setCursorRing({ x: ringX, y: ringY });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const filteredProjects = allProjects.filter(
    (p) => projCat === "todos" || p.cat === projCat,
  );
  const filteredCerts = certs.filter((c) => {
    const mc = certCat === "TODOS" || c.c === certCat;
    const mq =
      c.n.toLowerCase().includes(certQ.toLowerCase()) ||
      c.c.toLowerCase().includes(certQ.toLowerCase()) ||
      c.s.toLowerCase().includes(certQ.toLowerCase());
    return mc && mq;
  });

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{css}</style>

      {/* Custom cursor */}
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} />
      <div
        className="cursor-ring"
        style={{ left: cursorRing.x, top: cursorRing.y }}
      />

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#hero" className="logo">
          Thiago<em>.dev</em>
        </a>
        <ul>
          {[
            { id: "sobre", label: "Sobre" },
            { id: "formacao", label: "Formação" },
            { id: "projetos", label: "Projetos" },
            { id: "certificados", label: "Certificados" },
            { id: "contato", label: "Contato" },
          ].map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(id);
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${EMAIL}`} className="nav-cta">
          Contratar
        </a>
      </nav>

      {/* HERO */}
      <div id="hero" className="hero">
        <div>
          <div className="hero-label">
            Desenvolvedor Front-End Júnior · São Paulo, SP
          </div>
          <h1 className="hero-name">
            Thiago
            <br />
            <span>Fernando.</span>
          </h1>
          <p className="hero-sub">
            Engenharia da Computação em andamento.{" "}
            <strong>App real em produção</strong> — construído solo com React,
            Firebase e PWA. Mais de <strong>1.000h de formação prática</strong>{" "}
            e 49 certificados.
          </p>
          <div className="hero-stack">
            React · Firebase · JavaScript · Java · AWS · SQL
          </div>
          <div className="hero-btns">
            <button
              className="btn-primary"
              onClick={() => scrollTo("projetos")}
            >
              Ver Projetos
            </button>
            <button className="btn-outline" onClick={() => scrollTo("contato")}>
              Entre em Contato
            </button>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="hero-photo">
          <div className="photo-frame">
            {!imgError ? (
              <img
                src="/thiago-fernando.webp"
                alt="Thiago Fernando"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="photo-placeholder">
                <span style={{ fontSize: "2rem" }}>👤</span>
                <span>
                  Adicione sua foto em
                  <br />
                  public/thiago-fernando.webp
                </span>
              </div>
            )}
            <div className="photo-badge">Front-End Júnior</div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stats-inner">
          {[
            ["10+", "Projetos no GitHub"],
            ["1.000h+", "Horas de Formação"],
            [certs.length + "", "Certificados"],
            ["4", "Formações Acadêmicas"],
          ].map(([n, l]) => (
            <div key={l} className="stat">
              <span className="stat-num">{n}</span>
              <span className="stat-label">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SOBRE */}
      <section id="sobre">
        <Reveal>
          <div className="sec-eyebrow">01. Sobre Mim</div>
          <h2 className="sec-heading">
            Uma trajetória <em>diferente</em>
          </h2>
        </Reveal>
        <div className="about-grid">
          <Reveal dir="left">
            <div className="about-text">
              <p>
                Sou Thiago, cursando <strong>Engenharia da Computação</strong>{" "}
                no 5º semestre. Desenvolvo com <strong>React e Firebase</strong>{" "}
                e tenho o <strong>OLLO</strong> — um marketplace social com
                usuários reais — como prova do que consigo entregar na prática.
              </p>
              <p>
                Antes de programar, fui professor. Isso me deu{" "}
                <strong>comunicação clara</strong>, raciocínio lógico e a
                capacidade de aprender com profundidade — habilidades que aplico
                diretamente no desenvolvimento de software.
              </p>
              <p>
                Concluí o <strong>Oracle ONE (Alura)</strong> e o{" "}
                <strong>Bootcamp Santander DIO</strong>, acumulando mais de
                1.000h de formação prática em front-end, Java, AWS, SQL e
                cibersegurança. Estou buscando minha primeira vaga como{" "}
                <strong>dev front-end</strong>.
              </p>
            </div>
          </Reveal>
          <Reveal dir="right">
            <div className="journey">
              <h4>// MINHA JORNADA</h4>
              {[
                [
                  "01",
                  "Professor de Matemática e História",
                  "Aprendi a simplificar o complexo e comunicar com clareza.",
                ],
                [
                  "02",
                  "Oracle ONE + Bootcamp Santander",
                  "1.000h+ de formação: React, Java, AWS, SQL, Cibersegurança.",
                ],
                [
                  "03",
                  "Engenharia da Computação",
                  "Base teórica em sistemas, algoritmos e arquitetura.",
                ],
                [
                  "04",
                  "OLLO — app real em produção",
                  "Marketplace social com afiliados Shopee. olloapp.com.br",
                ],
                [
                  "05",
                  "Próximo passo",
                  "Primeira vaga como Dev Front-End Júnior ou Estagiário.",
                ],
              ].map(([n, t, d]) => (
                <div key={n} className="jstep">
                  <span className="jnum">{n}</span>
                  <span className="jtext">
                    <strong>{t}</strong> — {d}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="skills-grid">
          {Object.entries(skills).map(([cat, items], i) => (
            <Reveal key={cat} delay={i * 0.07}>
              <div className="skill-block">
                <h4>// {cat.toUpperCase()}</h4>
                {items.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORMAÇÃO */}
      <section id="formacao">
        <Reveal>
          <div className="sec-eyebrow">02. Formação Acadêmica</div>
          <h2 className="sec-heading">
            Base <em>sólida e diversa</em>
          </h2>
        </Reveal>
        <div className="form-list">
          {formation.map((f, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="form-item">
                <div>
                  <div className="form-deg">{f.deg}</div>
                  <div className="form-inst">{f.inst}</div>
                </div>
                <span className={`fbadge ${f.s}`}>{f.l}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos">
        <Reveal>
          <div className="sec-eyebrow">03. Projetos</div>
          <h2 className="sec-heading">
            Construindo na <em>prática</em>
          </h2>
          <div className="proj-tabs">
            {PROJ_CATS.map((c) => (
              <button
                key={c.id}
                className={`ptab ${projCat === c.id ? "on" : ""}`}
                onClick={() => setProjCat(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="proj-grid">
          {filteredProjects.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="proj-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="proj-tag">{p.tag}</span>
                  <div className="proj-links">
                    {p.repo ? (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="plink"
                      >
                        CÓDIGO
                      </a>
                    ) : (
                      <span className="plink-private">
                        {p.repoLabel || "PRIVADO"}
                      </span>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="plink"
                      >
                        DEMO ↗
                      </a>
                    )}
                  </div>
                </div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="proj-stack">
                  {p.stack.map((t) => (
                    <span key={t} className="stag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CERTIFICADOS */}
      <section id="certificados">
        <Reveal>
          <div className="sec-eyebrow">04. Certificados</div>
          <h2 className="sec-heading">
            <em>{certs.length}</em> certificações obtidas
          </h2>
          <div className="cert-bar">
            <input
              className="cert-input"
              placeholder="Buscar certificado..."
              value={certQ}
              onChange={(e) => setCertQ(e.target.value)}
            />
            <span className="cert-count">
              mostrando <b>{filteredCerts.length}</b> de {certs.length}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: ".5rem",
              marginBottom: "1.5rem",
            }}
          >
            {CERT_CATS.map((c) => (
              <button
                key={c}
                className={`cfilt ${certCat === c ? "on" : ""}`}
                onClick={() => setCertCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="cert-grid">
          {filteredCerts.map((c, i) => (
            <Reveal key={i} delay={(i % 8) * 0.04}>
              <div className="ccard">
                <div className="ccat">{c.c}</div>
                <h4>{c.n}</h4>
                <div className="cmeta">
                  {c.s} · {c.y}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato">
        <Reveal>
          <div className="sec-eyebrow">05. Contato</div>
          <h2 className="sec-heading">
            Vamos <em>conversar?</em>
          </h2>
        </Reveal>
        <div className="contact-layout">
          <Reveal dir="left">
            <div className="contact-text">
              <h3>Entre em contato.</h3>
              <div className="clinks">
                <a href={`mailto:${EMAIL}`} className="clink">
                  <span className="ci">✉</span>
                  {EMAIL}
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className="clink"
                >
                  <span className="ci">in</span>LinkedIn · Thiago Fernando
                </a>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="clink"
                >
                  <span className="ci">⌥</span>github.com/Thiago-spba
                </a>
                <a
                  href={OLLO}
                  target="_blank"
                  rel="noreferrer"
                  className="clink"
                >
                  <span className="ci">🚀</span>olloapp.com.br
                </a>
                <a
                  href={ALURA}
                  target="_blank"
                  rel="noreferrer"
                  className="clink"
                >
                  <span className="ci">◉</span>Perfil Alura / Oracle ONE
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal dir="right">
            <div className="why-box">
              <h4>// POR QUE ME CONTRATAR?</h4>
              {[
                [
                  "App real entregue",
                  "O OLLO está em produção com usuários reais — não é só curso.",
                ],
                [
                  "Aprendo rápido",
                  "1.000h de formação em menos de 2 anos, sempre com projeto prático.",
                ],
                [
                  "Me comunico bem",
                  "Comunicação clara, documentação cuidadosa e facilidade para trabalhar em equipe.",
                ],
                [
                  "Entrego na prática",
                  "React, Firebase, Java, AWS, SQL — com projeto real em produção para comprovar.",
                ],
              ].map(([t, d], i) => (
                <div key={i} className="wi">
                  <span className="wn">0{i + 1}</span>
                  <div className="wt">
                    <h5>{t}</h5>
                    <p>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <footer>
        <span>THIAGO FERNANDO</span> · Desenvolvedor Front-End Júnior · SÃO
        PAULO · {new Date().getFullYear()}
      </footer>
    </>
  );
}
