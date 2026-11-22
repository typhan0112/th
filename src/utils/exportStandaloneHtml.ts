import {
  BRANCHES,
  COMPANY_INFO,
  CONSULTATION_OUTCOMES,
  CONSULTATION_TOPICS,
  FAQ_ITEMS,
  HERO_CHECKLIST,
  LEGAL_REFERENCES,
  MEDIA_ASSETS,
  POLICIES,
  PROCESS_STEPS,
  SELF_REGISTRATION_STEPS,
  TAX_FIRST_YEAR_STEPS,
  TAX_OBLIGATIONS,
} from '../data/vanXuanData';

function esc(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function buildStandaloneHtml(): string {
  const year = new Date().getFullYear();

  const topicsJson = JSON.stringify(CONSULTATION_TOPICS);
  const policiesJson = JSON.stringify(POLICIES);
  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  });

  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tư vấn trước khi thành lập công ty tại TP.HCM | ${esc(COMPANY_INFO.shortName)}</title>
<meta name="description" content="Kế toán Vạn Xuân tư vấn trước khi thành lập công ty: loại hình, tên, địa chỉ, ngành nghề, vốn điều lệ. Nội dung và phí tư vấn được thống nhất trước khi thực hiện.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${COMPANY_INFO.website}">
<link rel="icon" href="${COMPANY_INFO.logoUrl}">
<meta name="theme-color" content="#072b42">
<meta property="og:type" content="website">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="${esc(COMPANY_INFO.shortName)}">
<meta property="og:title" content="Tư vấn trước khi thành lập công ty | ${esc(COMPANY_INFO.shortName)}">
<meta property="og:description" content="Phân tích từng lựa chọn, rà soát điều kiện và làm rõ trách nhiệm trước khi bạn quyết định.">
<meta property="og:url" content="${COMPANY_INFO.website}">
<meta property="og:image" content="${MEDIA_ASSETS.team}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<script type="application/ld+json">${faqSchema}</script>
<style>
:root{--navy:#072b42;--navy-2:#0b3c5c;--navy-deep:#051d2e;--brand:#0f8ec4;--brand-dark:#0a709c;--sky:#e7f4fb;--sky-soft:#f4f9fc;--gold:#f4be44;--gold-dark:#b57c08;--ink:#102536;--muted:#4c6477;--line:#d9e6ef;--radius:16px}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:84px}
body{font-family:'Be Vietnam Pro',system-ui,-apple-system,sans-serif;color:var(--ink);background:#fff;line-height:1.65;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:'Plus Jakarta Sans',system-ui,sans-serif;color:var(--navy);line-height:1.2;letter-spacing:-.02em;text-wrap:balance}
a{color:inherit;text-decoration:none}ul,ol{list-style:none}img,video{max-width:100%;display:block}
button{font:inherit;cursor:pointer;border:0;background:none}
.container{width:min(1180px,92%);margin-inline:auto}
.tabular{font-variant-numeric:tabular-nums}
.section{padding:88px 0}.section-soft{background:var(--sky-soft)}.section-dark{background:linear-gradient(155deg,var(--navy),var(--navy-2));color:#fff}
.section-dark h2,.section-dark h3{color:#fff}
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:700;color:var(--brand-dark);margin-bottom:14px}
.eyebrow::before{content:"";width:24px;height:2px;background:var(--gold-dark)}
.section-dark .eyebrow{color:#8fdcfb}.section-dark .eyebrow::before{background:var(--gold)}
h2{font-size:clamp(28px,3.4vw,40px);font-weight:800;margin-bottom:14px}
.lead{color:var(--muted);font-size:16px;max-width:660px}.section-dark .lead{color:rgba(255,255,255,.8)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 24px;border-radius:10px;font-weight:700;font-size:14.5px;white-space:nowrap;transition:background .18s,color .18s,border-color .18s,transform .18s}
.btn-primary{background:var(--brand);color:#fff}.btn-primary:hover{background:var(--brand-dark);transform:translateY(-1px)}
.btn-ghost{border:1px solid rgba(255,255,255,.35);color:#fff}.btn-ghost:hover{background:#fff;color:var(--navy)}
.btn-outline{border:1px solid var(--brand);color:var(--brand-dark);background:#fff}.btn-outline:hover{background:var(--brand);color:#fff}
/* Header */
.header{position:fixed;inset:0 0 auto 0;z-index:50;padding:16px 0;transition:background .2s,border-color .2s,padding .2s}
.header.scrolled{background:rgba(255,255,255,.96);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);padding:12px 0}
.header .container{display:flex;align-items:center;justify-content:space-between;gap:32px}
.brand{display:inline-flex;align-items:center;gap:10px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:18px;color:#fff;white-space:nowrap}
.brand img{height:34px;width:34px;border-radius:8px;background:#fff;padding:3px;object-fit:contain}
.header.scrolled .brand{color:var(--navy)}
.nav{display:flex;align-items:center;gap:24px;font-size:14px;font-weight:600;color:rgba(255,255,255,.88)}
.header.scrolled .nav{color:var(--ink)}
.nav a{padding:4px 0;white-space:nowrap;border-bottom:2px solid transparent;transition:border-color .18s,color .18s}
.nav a:hover{border-color:var(--gold)}
@media(max-width:1024px){.nav{display:none}}
/* Hero */
.hero{background:linear-gradient(155deg,var(--navy),var(--navy-2) 68%,#0e4f73);color:#fff;padding:124px 0 72px}
.hero-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:48px;align-items:stretch}
.hero h1{color:#fff;font-size:clamp(32px,3.8vw,50px);font-weight:800;margin:14px 0 18px}
.hero h1 em{font-style:normal;color:#8fdcfb}
.hero-sub{display:block;font-size:.48em;font-weight:600;color:rgba(255,255,255,.82);margin-top:10px;letter-spacing:0}
.fee-row{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;margin:20px 0;padding:14px 0;border-top:1px solid rgba(255,255,255,.15);border-bottom:1px solid rgba(255,255,255,.15)}
.fee-row b{font-family:'Plus Jakarta Sans',sans-serif;font-size:30px;font-weight:800;color:var(--gold)}
.fee-row span{font-size:14px;color:rgba(255,255,255,.8)}
.hero p{color:rgba(255,255,255,.86);font-size:15.5px;margin-bottom:12px}
.hero-cta{display:flex;flex-wrap:wrap;gap:12px;margin:26px 0 22px}
.hero-points{display:flex;flex-wrap:wrap;gap:10px 16px;font-size:13.5px;font-weight:600;color:rgba(255,255,255,.86)}
.hero-frame{position:relative;height:100%;min-height:360px;border-radius:var(--radius);overflow:hidden;border:1px solid rgba(255,255,255,.16);background:#093552}
.hero-frame img{width:100%;height:100%;object-fit:cover;object-position:center 32%}
.hero-cap{font-size:12.5px;color:rgba(255,255,255,.72);margin-top:12px;line-height:1.55}
.check-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:44px;padding-top:28px;border-top:1px solid rgba(255,255,255,.14)}
.check-item{text-align:left;padding:16px 18px;border-radius:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:#fff;transition:background .18s,border-color .18s}
.check-item:hover{background:rgba(255,255,255,.13);border-color:rgba(143,220,251,.45)}
.check-item strong{display:block;font-size:15px;margin-top:4px}
.check-item span{display:block;font-size:13px;color:rgba(255,255,255,.75);margin-top:2px}
.check-item small{font-size:12px;font-weight:700;color:var(--gold)}
@media(max-width:960px){.hero-grid{grid-template-columns:1fr}.check-strip{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.check-strip{grid-template-columns:1fr}}
/* Tabs */
.tabs{display:grid;grid-template-columns:300px minmax(0,1fr);gap:24px;margin-top:40px}
.tab-list{display:flex;flex-direction:column;gap:8px}
.tab-btn{display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:12px;text-align:left;background:#fff;border:1px solid var(--line);font-weight:600;font-size:14.5px;color:var(--ink);transition:border-color .18s,background .18s,color .18s}
.tab-btn span{font-size:12px;font-weight:700;color:var(--brand-dark);width:24px}
.tab-btn:hover{border-color:var(--brand)}
.tab-btn.active{background:var(--navy);color:#fff;border-color:var(--navy)}.tab-btn.active span{color:var(--gold)}
.tab-panel{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:36px}
.panel-meta{display:flex;justify-content:space-between;font-size:13px;font-weight:600;color:var(--muted);padding-bottom:16px;border-bottom:1px solid var(--line);margin-bottom:22px}
.tab-panel h3{font-size:clamp(22px,2.4vw,28px);font-weight:800;margin-bottom:10px}
.tab-panel>p{color:var(--muted);margin-bottom:22px}
.tab-panel ul{display:grid;gap:12px;margin-bottom:24px}
.tab-panel li{position:relative;padding-left:24px;font-size:15px}
.tab-panel li::before{content:"✓";position:absolute;left:0;color:var(--brand-dark);font-weight:800}
.result-box{padding:18px 20px;border-radius:12px;background:var(--sky-soft);border:1px solid var(--line);margin-bottom:24px}
.result-box small{display:block;font-size:12px;font-weight:700;color:var(--brand-dark);margin-bottom:4px}
.result-box p{font-weight:600;color:var(--navy)}
@media(max-width:900px){.tabs{grid-template-columns:1fr}.tab-list{flex-direction:row;overflow-x:auto;padding-bottom:6px}.tab-btn{flex:none;white-space:nowrap}.tab-panel{padding:24px}}
/* Grids */
.grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:36px}
.grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:24px}
.card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:26px}
.num{font-size:13px;font-weight:800;color:var(--brand-dark);margin-bottom:10px}
.card h3{font-size:18px;font-weight:700;margin-bottom:8px}
.card .meta{font-size:13px;font-weight:600;color:var(--brand-dark);margin-bottom:8px}
.card p{font-size:14.5px;color:var(--muted)}
.step-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:var(--radius);padding:28px}
.step-card .num{color:var(--gold)}
.step-card p{color:rgba(255,255,255,.8);font-size:14.5px}
.media-grid{display:grid;grid-template-columns:1.25fr .85fr 1.1fr;gap:18px;margin-top:36px}
.media-tile{position:relative;height:420px;border-radius:var(--radius);overflow:hidden;border:1px solid var(--line);background:#062337}
.media-tile img,.media-tile video{width:100%;height:100%;object-fit:cover}
.media-tile video{object-fit:contain;background:#000}
.media-tile figcaption{position:absolute;inset:auto 0 0 0;padding:36px 16px 14px;background:linear-gradient(transparent,rgba(5,29,46,.88));color:#fff;font-size:13px}
.wrap{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:48px;align-items:start}
.timeline{display:grid;gap:14px}
.tl{display:flex;gap:16px;padding:20px;border-radius:14px;border:1px solid var(--line);background:#fff}
.tl b{flex:none;width:42px;height:42px;border-radius:10px;background:var(--navy);color:#fff;display:grid;place-items:center;font-size:13px}
.tl h3{font-size:17px;margin-bottom:4px}.tl p{font-size:14.5px;color:var(--muted)}
.note-box{margin-top:24px;padding:18px 20px;border-radius:12px;border:1px solid #ead8a8;background:#fffbf0;font-size:14px;color:#5c4514}
.notice-banner{margin:26px 0;padding:20px 24px;border-radius:14px;background:var(--navy);color:#fff;font-size:15px}
.refs{margin-top:28px;padding:24px;border-radius:14px;border:1px solid var(--line);background:#fff}
.refs h4{font-size:14px;color:var(--brand-dark);margin-bottom:12px}
.refs ul{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;font-size:14px;color:var(--muted)}
.faq-list{max-width:840px;margin:36px auto 0;display:grid;gap:12px}
.faq{border:1px solid var(--line);border-radius:14px;background:#fff}
.faq summary{padding:18px 22px;font-weight:700;font-size:16px;color:var(--navy);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";font-size:20px;color:var(--brand-dark)}
.faq[open] summary::after{content:"−"}
.faq p{padding:0 22px 20px;font-size:15px;color:var(--muted)}
/* Form */
.info-list li{padding:14px 0;border-bottom:1px solid rgba(255,255,255,.12);font-size:14.5px;color:rgba(255,255,255,.86)}
.info-list b{color:#fff}
.form-card{background:#fff;color:var(--ink);border-radius:var(--radius);padding:32px}
.form-card h3{color:var(--navy);font-size:22px;margin-bottom:6px}
.form-card>p{font-size:14px;color:var(--muted);margin-bottom:20px}
.field{margin-bottom:14px}
.field label{display:block;font-size:13.5px;font-weight:600;margin-bottom:6px}
.field input,.field select,.field textarea{width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:10px;font:inherit;font-size:15px;background:var(--sky-soft)}
.field :focus{outline:2px solid var(--brand);border-color:var(--brand);background:#fff}
.consent{display:flex;gap:10px;font-size:13px;color:var(--muted);margin:10px 0 18px}
.consent a{color:var(--brand-dark);text-decoration:underline}
.form-msg{display:none;margin-top:14px;padding:12px 14px;border-radius:10px;font-size:14px;font-weight:600}
footer{background:var(--navy-deep);color:rgba(255,255,255,.74);padding:56px 0 80px;font-size:14px}
footer h4{color:#fff;font-size:15px;margin-bottom:14px}
footer li{margin-bottom:8px}
footer a:hover,footer button:hover{color:#fff;text-decoration:underline}
.legal{margin-top:36px;padding-top:24px;border-top:1px solid rgba(255,255,255,.12);display:grid;gap:10px;font-size:13px}
.modal{position:fixed;inset:0;z-index:100;background:rgba(5,29,46,.78);display:none;align-items:center;justify-content:center;padding:20px}
.modal.show{display:flex}
.modal-box{background:#fff;border-radius:18px;max-width:680px;width:100%;max-height:86vh;overflow:auto;padding:32px;position:relative}
.modal-close{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;background:var(--sky-soft);font-size:20px}
@media(max-width:900px){.grid-3,.grid-2,.media-grid,.wrap,.refs ul{grid-template-columns:1fr}.media-tile{height:auto}.section{padding:64px 0}}
</style>
</head>
<body>
<header class="header" id="header">
  <div class="container">
    <a href="#top" class="brand">
      <img src="${COMPANY_INFO.logoUrl}" alt="Logo ${esc(COMPANY_INFO.shortName)}" onerror="this.style.display='none'">
      <span>${esc(COMPANY_INFO.shortName)}</span>
    </a>
    <nav class="nav" aria-label="Điều hướng chính">
      <a href="#noi-dung">Nội dung tư vấn</a>
      <a href="#hinh-anh">Hoạt động thực tế</a>
      <a href="#quy-trinh">Quy trình</a>
      <a href="#khai-thue">Khai thuế năm đầu</a>
      <a href="#faq">Hỏi đáp</a>
    </nav>
    <a href="#lien-he" class="btn btn-primary">Nhận tư vấn</a>
  </div>
</header>

<main>
<section class="hero" id="top">
  <div class="container">
    <div class="hero-grid">
      <div>
        <span class="eyebrow">Dành cho người chuẩn bị kinh doanh · TP. Hồ Chí Minh</span>
        <h1>Tư vấn trước khi <em>thành lập công ty</em><span class="hero-sub">Cùng ${esc(COMPANY_INFO.shortName)}</span></h1>
        <div class="fee-row">
          <span>Phí tư vấn trọn gói</span>
          <b class="tabular">${COMPANY_INFO.advisoryPrice}</b>
          <span>Thống nhất phạm vi trước khi thực hiện</span>
        </div>
        <p>Bạn cần có tên công ty không trùng hoặc gây nhầm lẫn, ngành nghề đăng ký đúng nhu cầu kinh doanh, vốn điều lệ phù hợp và lựa chọn đúng loại hình doanh nghiệp.</p>
        <p>Vạn Xuân phân tích từng lựa chọn, rà soát điều kiện và làm rõ trách nhiệm trước khi bạn quyết định.</p>
        <div class="hero-cta">
          <a href="#lien-he" class="btn btn-primary">Nhận tư vấn trước khi thành lập</a>
          <a href="#noi-dung" class="btn btn-ghost">Xem 7 nội dung tư vấn</a>
        </div>
        <div class="hero-points">
          <span>Đúng nhu cầu</span><span>·</span><span>Rõ điều kiện</span><span>·</span><span>Hiểu trách nhiệm</span>
        </div>
      </div>
      <div>
        <div class="hero-frame">
          <img src="${MEDIA_ASSETS.team}" alt="Đội ngũ ${esc(COMPANY_INFO.legalName)} tại văn phòng công ty">
        </div>
        <p class="hero-cap">Đội ngũ Vạn Xuân tại văn phòng công ty. Vạn Xuân là đơn vị tư vấn pháp lý tư nhân, không phải là cơ quan nhà nước hay cổng dịch vụ công của chính phủ.</p>
      </div>
    </div>
    <div class="check-strip">
      ${HERO_CHECKLIST.map(
        (item, idx) => `<button type="button" class="check-item" data-jump-topic="${item.topicIndex}"><small class="tabular">0${idx + 1}</small><strong>${esc(item.label)}</strong><span>${esc(item.detail)}</span></button>`
      ).join('')}
    </div>
  </div>
</section>

<section class="section section-soft" id="noi-dung">
  <div class="container">
    <span class="eyebrow">01. Tư vấn trước khi thành lập</span>
    <h2>Nội dung chúng tôi tư vấn cho bạn</h2>
    <p class="lead">Hãy chọn đúng từ đầu, hạn chế việc hồ sơ phải sửa đi sửa lại. Chọn nội dung bên dưới để xem Vạn Xuân tư vấn những gì.</p>
    <div class="tabs">
      <div class="tab-list" id="tabList" role="tablist"></div>
      <article class="tab-panel" id="tabPanel" role="tabpanel"></article>
    </div>
  </div>
</section>

<section class="section" id="ket-qua">
  <div class="container">
    <span class="eyebrow">Kết quả của buổi tư vấn</span>
    <h2>Sau tư vấn, bạn cần rõ những gì?</h2>
    <div class="grid-3">
      ${CONSULTATION_OUTCOMES.map(
        (c) => `<div class="card"><div class="num tabular">${c.index}</div><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p></div>`
      ).join('')}
    </div>
  </div>
</section>

<section class="section section-soft" id="hinh-anh">
  <div class="container">
    <span class="eyebrow">Hình ảnh thực tế</span>
    <h2>Vạn Xuân – Người bạn đồng hành của Doanh nghiệp</h2>
    <p class="lead">Ở Vạn Xuân, chúng tôi chọn cách lắng nghe trước khi giải pháp được đưa ra, chọn sự tận tâm trước mọi con số.</p>
    <div class="media-grid">
      <figure class="media-tile"><video src="${MEDIA_ASSETS.video}#t=0.1" controls playsinline preload="metadata"></video><figcaption>Video do Vạn Xuân ghi lại</figcaption></figure>
      <figure class="media-tile"><img src="${MEDIA_ASSETS.photo1}" loading="lazy" alt="Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm tại một quán đồ uống"><figcaption>Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm tại một quán đồ uống</figcaption></figure>
      <figure class="media-tile"><img src="${MEDIA_ASSETS.photo2}" loading="lazy" alt="Hình chụp cùng hồ sơ tại một tiệm bánh và tráng miệng"><figcaption>Hình chụp cùng hồ sơ tại một tiệm bánh &amp; tráng miệng</figcaption></figure>
    </div>
    <p style="margin-top:16px;font-size:13.5px;color:var(--muted)">Ngoài tư vấn trước khi thành lập, Vạn Xuân còn có dịch vụ về an toàn thực phẩm. Hình ảnh ghi lại hoạt động thực tế; kết quả từng hồ sơ do cơ quan có thẩm quyền xem xét, quyết định.</p>
  </div>
</section>

<section class="section section-dark" id="quy-trinh">
  <div class="container">
    <span class="eyebrow">02. Quy trình tư vấn</span>
    <h2>Vạn Xuân tư vấn theo 3 bước</h2>
    <p class="lead">Nội dung và phí tư vấn được thống nhất trước khi thực hiện.</p>
    <div class="grid-3">
      ${PROCESS_STEPS.map(
        (s) => `<div class="step-card"><div class="num tabular">Bước ${s.index}</div><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p></div>`
      ).join('')}
    </div>
  </div>
</section>

<section class="section" id="tu-dang-ky">
  <div class="container wrap">
    <div>
      <span class="eyebrow">03. Thông tin tham khảo</span>
      <h2>Tự đăng ký doanh nghiệp bắt đầu từ đâu?</h2>
      <p class="lead">Sau khi chọn phương án, bạn có thể tự xem thủ tục, chuẩn bị hồ sơ và thực hiện trên hệ thống chính thức.</p>
      <div style="margin-top:24px"><a class="btn btn-outline" href="${COMPANY_INFO.portalUrl}" target="_blank" rel="noopener nofollow">Xem hướng dẫn chính thức</a><p style="margin-top:10px;font-size:13.5px;color:var(--muted)">Liên kết đến Cổng thông tin quốc gia về đăng ký doanh nghiệp.</p></div>
    </div>
    <div>
      <div class="timeline">
        ${SELF_REGISTRATION_STEPS.map(
          (s) => `<div class="tl"><b class="tabular">${s.index}</b><div><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p></div></div>`
        ).join('')}
      </div>
      <p class="note-box">Thành phần hồ sơ và yêu cầu cụ thể phụ thuộc loại hình, người tham gia và quy định tại thời điểm thực hiện. Cơ quan đăng ký kinh doanh tiếp nhận, xem xét và quyết định kết quả.</p>
    </div>
  </div>
</section>

<section class="section section-soft" id="khai-thue">
  <div class="container">
    <span class="eyebrow">04. Khai thuế trong năm đầu</span>
    <h2>Dịch vụ khai thuế dành cho doanh nghiệp mới thành lập</h2>
    <p class="lead">Bạn cần biết phải khai những loại thuế nào, theo kỳ nào và ai theo dõi việc thực hiện. Vạn Xuân xác định nghĩa vụ, chuẩn bị hồ sơ và theo dõi từng kỳ theo phạm vi đã thống nhất.</p>
    <div class="grid-2">
      ${TAX_OBLIGATIONS.map(
        (t) => `<div class="card"><h3>${esc(t.title)}</h3><div class="meta">${esc(t.cadence)}</div><p>${esc(t.description)}</p></div>`
      ).join('')}
    </div>
    <p class="notice-banner"><strong>Từ năm 2026:</strong> không phải khai, nộp lệ phí môn bài cho năm 2026 và các năm tiếp theo. Các nghĩa vụ thuế khác được rà soát theo hoạt động phát sinh.</p>
    <h3 style="font-size:22px;margin-top:36px">Tư vấn khai thuế năm đầu</h3>
    <ol class="grid-3">
      ${TAX_FIRST_YEAR_STEPS.map(
        (s) => `<li class="card"><div class="num tabular">${s.index}</div><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p></li>`
      ).join('')}
    </ol>
    <p class="note-box">Bạn cung cấp chứng từ và xác nhận số liệu. Vạn Xuân thực hiện công việc theo hợp đồng; việc ký, nộp hồ sơ theo thẩm quyền hợp lệ. Phạm vi và phí được thống nhất trước khi thực hiện.</p>
    <div class="refs">
      <h4>Căn cứ tham khảo · cập nhật 11/11/2026</h4>
      <ul>${LEGAL_REFERENCES.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section" id="faq">
  <div class="container">
    <span class="eyebrow">Giải đáp trước khi liên hệ</span>
    <h2>Câu hỏi thường gặp</h2>
    <p class="lead">Giải đáp về tư vấn trước khi thành lập và khai thuế trong năm đầu hoạt động.</p>
    <div class="faq-list">
      ${FAQ_ITEMS.map(
        (f) => `<details class="faq"><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`
      ).join('')}
    </div>
  </div>
</section>

<section class="section section-dark" id="lien-he">
  <div class="container wrap">
    <div>
      <span class="eyebrow">Liên hệ</span>
      <h2>Nhận tư vấn trước khi thành lập</h2>
      <p class="lead" style="margin-bottom:20px">Bạn chỉ cần cung cấp tên, số liên hệ và nhu cầu. Vạn Xuân sẽ hướng dẫn hồ sơ cần thiết sau khi trao đổi.</p>
      <ul class="info-list">
        <li><b>${esc(COMPANY_INFO.legalName)}</b></li>
        ${BRANCHES.map((b) => `<li><b>${esc(b.label)}:</b> ${esc(b.address)}</li>`).join('')}
        <li><b>Hotline:</b> <a href="tel:${COMPANY_INFO.hotlineTel}" class="tabular">${COMPANY_INFO.hotlineDisplay}</a> · <b>Email:</b> <a href="mailto:${COMPANY_INFO.email}">${COMPANY_INFO.email}</a></li>
        <li><b>Giờ làm việc:</b> ${esc(COMPANY_INFO.workingHours)}</li>
      </ul>
    </div>
    <form class="form-card" id="leadForm" novalidate>
      <h3>Đăng ký nhận tư vấn</h3>
      <p>Nội dung và phí tư vấn được thống nhất trước khi thực hiện.</p>
      <div class="field"><label for="fName">Họ và tên *</label><input id="fName" name="name" required placeholder="Nguyễn Văn A"></div>
      <div class="field"><label for="fPhone">Số điện thoại *</label><input id="fPhone" name="phone" required pattern="^(0|\\+84)[0-9]{9,10}$" placeholder="09xx xxx xxx"></div>
      <div class="field"><label for="fNeed">Nhu cầu</label><select id="fNeed" name="need"><option>Tư vấn trước khi thành lập</option><option>Tư vấn khai thuế năm đầu</option><option>Nội dung khác</option></select></div>
      <div class="field"><label for="fNote">Nội dung cần trao đổi</label><textarea id="fNote" name="note" rows="3" placeholder="Hoạt động dự kiến, số người góp vốn, điều bạn còn phân vân…"></textarea></div>
      <label class="consent"><input type="checkbox" required><span>Tôi đồng ý để Vạn Xuân sử dụng thông tin trên nhằm liên hệ tư vấn theo <a href="#" data-policy="privacy">Chính sách bảo mật</a>.</span></label>
      <button type="submit" class="btn btn-primary" style="width:100%">Gửi yêu cầu tư vấn</button>
      <div class="form-msg" id="formMsg" role="status"></div>
      <p style="font-size:12.5px;color:var(--muted);margin-top:12px;text-align:center">Không gửi giấy tờ định danh, mật khẩu hoặc thông tin đăng nhập qua biểu mẫu này.</p>
    </form>
  </div>
</section>
</main>

<footer>
  <div class="container">
    <div class="grid-3" style="margin-top:0">
      <div>
        <h4>${esc(COMPANY_INFO.legalName)}</h4>
        <ul>
          <li>Trụ sở: ${esc(BRANCHES[0].address)}</li>
          <li>Hotline: <a href="tel:${COMPANY_INFO.hotlineTel}">${COMPANY_INFO.hotlineDisplay}</a> · Email: <a href="mailto:${COMPANY_INFO.email}">${COMPANY_INFO.email}</a></li>
          <li>Website: <a href="${COMPANY_INFO.website}">ketoanvanxuan.vn</a></li>
        </ul>
      </div>
      <div>
        <h4>Nội dung</h4>
        <ul>
          <li><a href="#noi-dung">Tư vấn trước khi thành lập</a></li>
          <li><a href="#quy-trinh">Quy trình tư vấn</a></li>
          <li><a href="#tu-dang-ky">Tự đăng ký doanh nghiệp</a></li>
          <li><a href="#khai-thue">Khai thuế trong năm đầu</a></li>
        </ul>
      </div>
      <div>
        <h4>Chính sách</h4>
        <ul>
          <li><button type="button" data-policy="privacy">Chính sách bảo mật</button></li>
          <li><button type="button" data-policy="terms">Điều khoản sử dụng</button></li>
          <li><button type="button" data-policy="fee">Chính sách phí &amp; hoàn phí</button></li>
          <li><a href="${COMPANY_INFO.portalUrl}" target="_blank" rel="noopener nofollow">Cổng thông tin quốc gia về đăng ký doanh nghiệp</a></li>
        </ul>
      </div>
    </div>
    <div class="legal">
      <p><strong>Tuyên bố miễn trừ:</strong> Vạn Xuân là đơn vị tư vấn pháp lý tư nhân, không phải là cơ quan nhà nước hay cổng dịch vụ công của chính phủ. Phí trên trang là phí dịch vụ tư vấn của Vạn Xuân, không phải lệ phí nhà nước. Bạn có thể tự thực hiện thủ tục trực tiếp trên hệ thống chính thức của cơ quan đăng ký kinh doanh.</p>
      <p>Cơ quan đăng ký kinh doanh xem xét, quyết định kết quả; tư vấn không đồng nghĩa với bảo đảm hồ sơ được chấp thuận.</p>
      <p>© ${year} ${esc(COMPANY_INFO.shortName)}. ${esc(COMPANY_INFO.slogan)}.</p>
    </div>
  </div>
</footer>

<div class="modal" id="modal" role="dialog" aria-modal="true"><div class="modal-box"><button type="button" class="modal-close" aria-label="Đóng">×</button><div id="modalBody"></div></div></div>
<script>
const TOPICS=${topicsJson};
const POLICIES=${policiesJson};
const tabList=document.getElementById('tabList'),tabPanel=document.getElementById('tabPanel');
function renderTopic(i){
  const t=TOPICS[i];
  [...tabList.children].forEach((b,k)=>b.classList.toggle('active',k===i));
  tabPanel.innerHTML='<div class="panel-meta"><span>'+t.title+'</span><span class="tabular">'+t.index+' / 0'+TOPICS.length+'</span></div><h3>'+t.question+'</h3><p>'+t.summary+'</p><ul>'+t.points.map(p=>'<li>'+p+'</li>').join('')+'</ul><div class="result-box"><small>Điều bạn nhận được</small><p>'+t.outcome+'</p></div><a href="#lien-he" class="btn btn-primary" data-pick-topic="'+t.title+'">'+t.ctaLabel+'</a>';
}
TOPICS.forEach((t,i)=>{
  const b=document.createElement('button');b.type='button';b.className='tab-btn';b.innerHTML='<span class="tabular">'+t.index+'</span>'+t.title;b.onclick=()=>renderTopic(i);tabList.appendChild(b);
});
renderTopic(0);
const header=document.getElementById('header');
const onScroll=()=>header.classList.toggle('scrolled',scrollY>24);
addEventListener('scroll',onScroll,{passive:true});onScroll();
const modal=document.getElementById('modal'),modalBody=document.getElementById('modalBody');
document.addEventListener('click',e=>{
  const jump=e.target.closest('[data-jump-topic]');
  if(jump){renderTopic(Number(jump.dataset.jumpTopic));document.getElementById('noi-dung').scrollIntoView({behavior:'smooth'});return;}
  const pick=e.target.closest('[data-pick-topic]');
  if(pick){document.getElementById('fNote').value='Tôi cần trao đổi về: '+pick.dataset.pickTopic;return;}
  const pol=e.target.closest('[data-policy]');
  if(pol){e.preventDefault();const p=POLICIES[pol.dataset.policy];modalBody.innerHTML='<h3 style="margin-bottom:16px">'+p.title+'</h3>'+p.sections.map(s=>'<h4 style="margin:16px 0 6px">'+s.heading+'</h4><p style="color:#4c6477;font-size:14.5px">'+s.body+'</p>').join('');modal.classList.add('show');return;}
  if(e.target===modal||e.target.closest('.modal-close'))modal.classList.remove('show');
});
addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('show')});
const form=document.getElementById('leadForm'),msg=document.getElementById('formMsg');
form.addEventListener('submit',e=>{
  e.preventDefault();
  if(!form.checkValidity()){form.reportValidity();return;}
  const d=Object.fromEntries(new FormData(form));
  const body='Họ tên: '+d.name+'\\nSố điện thoại: '+d.phone+'\\nNhu cầu: '+d.need+'\\nNội dung: '+(d.note||'');
  location.href='mailto:${COMPANY_INFO.email}?subject='+encodeURIComponent('Yêu cầu tư vấn trước khi thành lập')+'&body='+encodeURIComponent(body);
  msg.style.display='block';msg.style.background='#e8f8ef';msg.style.color='#136c3c';msg.textContent='Ứng dụng email đang mở để bạn gửi yêu cầu. Bạn cũng có thể gọi ${COMPANY_INFO.hotlineDisplay}.';
});
</script>
</body>
</html>`;
}
